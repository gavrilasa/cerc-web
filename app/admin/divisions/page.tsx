import { prisma } from "@/lib/db";
import { DivisionsClient } from "@/components/admin/divisions-client";

export default async function AdminDivisionsPage() {
  const divisions = await prisma.division.findMany({
    orderBy: { title: 'asc' },
    include: {
        _count: { select: { projects: true, members: true, achievements: true } }
    }
  });

  return <DivisionsClient divisions={divisions} />;
}