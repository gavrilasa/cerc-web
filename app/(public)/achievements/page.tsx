import { prisma } from "@/lib/db";
import { AchievementCard } from "@/components/divisions-card";

export const dynamic = "force-dynamic";

export default async function AchievementsPage() {
  const achievements = await prisma.achievement.findMany({
    orderBy: { createdAt: "desc" },
    include: { division: true },
  });

  return (
    <div className="min-h-screen pt-32 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 text-center">
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6">Hall of Fame</h1>
          <p className="text-lg text-neutral-500 max-w-2xl mx-auto font-medium">
            Celebrating the victories, milestones, and recognition earned by our dedicated research teams.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {achievements.length > 0 ? (
            achievements.map((item) => (
              <AchievementCard 
                key={item.id} 
                {...item} 
                divisionName={item.division.title}
              />
            ))
          ) : (
            <div className="col-span-full py-32 text-center rounded-[3rem] border-2 border-dashed border-neutral-200 dark:border-neutral-800">
               <p className="text-neutral-500 font-bold text-xl">No achievements recorded yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}