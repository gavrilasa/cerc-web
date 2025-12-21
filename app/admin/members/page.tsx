import { prisma } from "@/lib/db";
import { MemberCard } from "@/components/divisions-card";
import { MemberDialog } from "@/components/admin/dialogs";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { deleteMember } from "@/app/actions/cms";

export default async function AdminMembersPage() {
  const members = await prisma.member.findMany({
    orderBy: { createdAt: 'desc' },
    include: { division: true }
  });

  const divisions = await prisma.division.findMany();

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Members</h1>
        <MemberDialog divisions={divisions} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {members.map((member) => (
          <MemberCard 
            key={member.id} 
            {...member} 
            divisionName={member.division.title} // Add this prop to MemberCard if not exists
            actionSlot={
              <div className="flex justify-end gap-2 mt-2">
                  <MemberDialog divisions={divisions} data={member} />
                  <form action={deleteMember.bind(null, member.id)}>
                      <Button variant="destructive" size="icon" className="h-8 w-8"><Trash2 size={14}/></Button>
                  </form>
              </div>
            }
          />
        ))}
        {members.length === 0 && <div className="col-span-full text-center py-10 text-muted-foreground border-2 border-dashed rounded-xl">No members found.</div>}
      </div>
    </div>
  );
}