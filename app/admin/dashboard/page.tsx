import { prisma } from "@/lib/db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FolderKanban, Users, Trophy, Layers } from "lucide-react";

export default async function DashboardOverview() {
  const divisionsCount = await prisma.division.count();
  const projectsCount = await prisma.project.count();
  const membersCount = await prisma.member.count();
  const achievementsCount = await prisma.achievement.count();

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight">Dashboard Overview</h2>
      
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