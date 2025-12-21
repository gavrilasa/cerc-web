import { prisma } from "@/lib/db";
import { LandingPage } from "@/components/home/landing-page";

export const dynamic = "force-dynamic";

export default async function Page() {
  const divisions = await prisma.division.findMany({
    orderBy: { title: 'asc' },
    include: {
        _count: { select: { projects: true, members: true } }
    }
  });

  return <LandingPage divisions={divisions} />;
}