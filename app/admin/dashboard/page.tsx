import { prisma } from "@/lib/db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FolderKanban, Users, Trophy, Layers, Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { initializeSystem } from "@/app/actions/cms";

export default async function DashboardOverview() {
  const divisionsCount = await prisma.division.count();
  
  // --- INITIALIZATION CHECK ---
  if (divisionsCount === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6 text-center">
        <div className="bg-primary/10 p-6 rounded-full">
           <Wand2 className="w-12 h-12 text-primary" />
        </div>
        <div className="space-y-2">
            <h2 className="text-2xl font-bold">Welcome to CERC Admin</h2>
            <p className="text-muted-foreground max-w-md">
                Your database appears to be empty. Let's set up the core divisions (Software, Network, Embedded, Multimedia) to get started.
            </p>
        </div>
        <form action={initializeSystem}>
            <Button size="lg" className="font-bold">Initialize System</Button>
        </form>
      </div>
    );
  }

  // --- NORMAL DASHBOARD ---
  const projectsCount = await prisma.project.count();
  const membersCount = await prisma.member.count();
  const achievementsCount = await prisma.achievement.count();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard Overview</h2>
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
    <Card className="px-4 py-8">
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