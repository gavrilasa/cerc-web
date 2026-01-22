import { prisma } from "@/lib/db";
import { LandingPage } from "@/components/home/landing-page";

export const dynamic = "force-dynamic";

export default async function Page() {
  // Fetch divisions with counts for the Bento Grid
  const divisions = await prisma.division.findMany({
    orderBy: [{ order: 'asc' }, { title: 'asc' }],
    include: {
        _count: { select: { projects: true, members: true } }
    }
  });

  // Fetch some members for the preview card
  const members = await prisma.member.findMany({
    take: 4,
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      name: true,
      role: true,
      imageUrl: true,
    }
  });

  return <LandingPage divisions={divisions} members={members} />;
}