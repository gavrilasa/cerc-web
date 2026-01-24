import { prisma } from "@/lib/db";
import { TechStackClient } from "@/components/admin/tech-stack-client";

export default async function AdminTechStackPage() {
  const techStacks = await prisma.techStack.findMany({
    orderBy: { createdAt: 'desc' },
    include: { division: true }
  });

  const divisions = await prisma.division.findMany({ orderBy: { title: 'asc' } });

  return <TechStackClient techStacks={techStacks} divisions={divisions} />;
}