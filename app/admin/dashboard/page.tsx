import { prisma } from "@/lib/db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FolderKanban, Users, Trophy, Layers, Plus } from "lucide-react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { DivisionForm } from "@/components/admin/forms";

export default async function DashboardOverview() {
  const divisionsCount = await prisma.division.count();
  const projectsCount = await prisma.project.count();
  const membersCount = await prisma.member.count();
  const achievementsCount = await prisma.achievement.count();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard Overview</h2>
        
        {/* --- ADD DIVISION BUTTON & DIALOG --- */}
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add Division
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Division</DialogTitle>
            </DialogHeader>
            <DivisionForm />
          </DialogContent>
        </Dialog>
        {/* ------------------------------------ */}
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard title="Divisions" value={divisionsCount} icon={Layers} />
        <StatsCard title="Projects" value={projectsCount} icon={FolderKanban} />
        <StatsCard title="Members" value={membersCount} icon={Users} />
        <StatsCard title="Achievements" value={achievementsCount} icon={Trophy} />
      </div>
    </div>
  );
}

function StatsCard({ title, value, icon: Icon }: { title: string, value: number, icon: any }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
  )
}