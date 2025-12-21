import { prisma } from "@/lib/db";
import { AchievementCard } from "@/components/divisions-card";
import { AchievementDialog } from "@/components/admin/dialogs";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { deleteAchievement } from "@/app/actions/cms";

export default async function AdminAchievementsPage() {
  const achievements = await prisma.achievement.findMany({
    orderBy: { createdAt: 'desc' },
    include: { division: true }
  });

  const divisions = await prisma.division.findMany();

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Achievements</h1>
        <AchievementDialog divisions={divisions} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {achievements.map((achievement) => (
          <AchievementCard 
            key={achievement.id} 
            {...achievement} 
            divisionName={achievement.division.title}
            colorClass="text-blue-600"
            actionSlot={
              <div className="flex gap-2">
                  <AchievementDialog divisions={divisions} data={achievement} />
                  <form action={deleteAchievement.bind(null, achievement.id)}>
                      <Button variant="destructive" size="icon" className="h-8 w-8"><Trash2 size={14}/></Button>
                  </form>
              </div>
            }
          />
        ))}
        {achievements.length === 0 && <div className="col-span-full text-center py-10 text-muted-foreground border-2 border-dashed rounded-xl">No achievements found.</div>}
      </div>
    </div>
  );
}