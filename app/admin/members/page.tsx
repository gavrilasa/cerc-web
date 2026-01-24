import { prisma } from "@/lib/db";
import { MembersClient } from "@/components/admin/members-client";

export default async function AdminMembersPage() {
  const members = await prisma.member.findMany({
    orderBy: { createdAt: 'desc' },
    include: { division: true }
  });

  const divisions = await prisma.division.findMany({ orderBy: { title: 'asc' } });

  return <MembersClient members={members} divisions={divisions} />;
}