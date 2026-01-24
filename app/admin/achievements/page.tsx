import { prisma } from "@/lib/db";
import { AchievementsClient } from "@/components/admin/achievements-client";

export default async function AdminAchievementsPage() {
  const achievements = await prisma.achievement.findMany({
    orderBy: { createdAt: 'desc' },
    include: { division: true }
  });

  const divisions = await prisma.division.findMany({ orderBy: { title: 'asc' } });

  return <AchievementsClient achievements={achievements} divisions={divisions} />;
}