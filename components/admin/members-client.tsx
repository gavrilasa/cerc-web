"use client";

import { useState } from "react";
import { MemberCard } from "@/components/divisions-card";
import { MemberDialog } from "@/components/admin/dialogs";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { deleteMember, reorderMembers } from "@/app/actions/cms";
import { SortableList } from "@/components/admin/sortable-list";
import { toast } from "sonner";

interface Member {
  id: string;
  name: string;
  role: string;
  imageUrl: string;
  github: string | null;
  linkedin: string | null;
  order?: number;
  division: { id: string; title: string };
}

interface Division {
  id: string;
  title: string;
}

export function MembersClient({ members: initialMembers, divisions }: { members: Member[], divisions: Division[] }) {
  const [members, setMembers] = useState(initialMembers);

  const handleReorder = async (newItems: Member[]) => {
    setMembers(newItems);
    
    const orderData = newItems.map((item, index) => ({
      id: item.id,
      order: index,
    }));
    
    try {
      await reorderMembers(orderData);
      toast.success("Order saved");
    } catch {
      toast.error("Failed to save order");
      setMembers(initialMembers);
    }
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Members</h1>
          <p className="text-sm text-muted-foreground">Manage your team members • Drag to reorder</p>
        </div>
        <MemberDialog divisions={divisions} />
      </div>

      <SortableList
        items={members}
        onReorder={handleReorder}
        getId={(m) => m.id}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        layout="grid"
        renderItem={(member) => (
          <MemberCard 
            {...member} 
            divisionName={member.division.title}
            actionSlot={
              <div className="flex justify-end gap-2 mt-2">
                <MemberDialog divisions={divisions} data={member} />
                <form action={deleteMember.bind(null, member.id)}>
                  <Button variant="destructive" size="icon" className="h-8 w-8"><Trash2 size={14}/></Button>
                </form>
              </div>
            }
          />
        )}
      />

      {members.length === 0 && (
        <div className="col-span-full text-center py-10 text-muted-foreground border-2 border-dashed rounded-xl">
          No members found.
        </div>
      )}
    </div>
  );
}
