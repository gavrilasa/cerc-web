"use client";

import { MoreHorizontal, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MemberDialog } from "@/components/admin/dialogs";
import { deleteMember } from "@/app/actions/cms";

interface MemberCardActionsProps {
  member: any;
  divisionSlug: string;
}

export function MemberCardActions({ member, divisionSlug }: MemberCardActionsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:bg-muted">
          <MoreHorizontal size={16} />
          <span className="sr-only">Actions</span>
        </Button>
      </DropdownMenuTrigger>
      
      {/* Event propagation stop must happen in a Client Component */}
      <DropdownMenuContent align="end" onClick={(e) => e.stopPropagation()}>
        <div className="flex flex-col gap-1 p-1 min-w-[120px]">
           <div className="w-full">
              <MemberDialog divisionSlug={divisionSlug} data={member} /> 
           </div>
           
           <form action={deleteMember.bind(null, member.id, divisionSlug)}>
              <button className="w-full flex items-center gap-2 px-2 py-1.5 text-sm text-red-600 hover:bg-red-50 rounded-sm transition-colors">
                <Trash2 size={14}/> Delete
              </button>
           </form>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}