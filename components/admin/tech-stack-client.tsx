"use client";

import { useState } from "react";
import { TechStackDialog } from "@/components/admin/dialogs";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { deleteTechStack, reorderTechStack } from "@/app/actions/cms";
import { SortableList } from "@/components/admin/sortable-list";
import { toast } from "sonner";
import Image from "next/image";

interface TechStack {
  id: string;
  name: string;
  imageUrl: string;
  websiteUrl: string | null;
  order?: number;
  division: { id: string; title: string };
}

interface Division {
  id: string;
  title: string;
}

export function TechStackClient({ techStacks: initialTechStacks, divisions }: { techStacks: TechStack[], divisions: Division[] }) {
  const [techStacks, setTechStacks] = useState(initialTechStacks);

  const handleReorder = async (newItems: TechStack[]) => {
    setTechStacks(newItems);
    
    const orderData = newItems.map((item, index) => ({
      id: item.id,
      order: index,
    }));
    
    try {
      await reorderTechStack(orderData);
      toast.success("Order saved");
    } catch {
      toast.error("Failed to save order");
      setTechStacks(initialTechStacks);
    }
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Tech Stack</h1>
          <p className="text-sm text-muted-foreground">Manage your technologies • Drag to reorder</p>
        </div>
        <TechStackDialog divisions={divisions} />
      </div>

      <SortableList
        items={techStacks}
        onReorder={handleReorder}
        getId={(t) => t.id}
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4"
        layout="grid"
        renderItem={(t) => (
          <div className="relative group flex flex-col items-center justify-between p-6 bg-card border border-border rounded-2xl hover:border-primary/50 hover:shadow-md transition-all min-h-[180px]">
            {/* Content */}
            <div className="flex flex-col items-center">
              {/* Logo */}
              <div className="w-14 h-14 relative mb-3 p-2 bg-muted/50 rounded-xl">
                <Image src={t.imageUrl} alt={t.name} fill className="object-contain p-1" />
              </div>
              
              {/* Name */}
              <span className="font-semibold text-sm text-center line-clamp-1">{t.name}</span>
              
              {/* Division Badge */}
              <span className="text-[10px] text-muted-foreground uppercase mt-2 bg-muted px-2.5 py-1 rounded-full font-medium">
                {t.division.title}
              </span>
            </div>
            
            {/* Action Buttons - Bottom */}
            <div className="flex justify-center gap-1 mt-3 pt-3 border-t border-border w-full">
              <TechStackDialog divisions={divisions} data={t} />
              <form action={deleteTechStack.bind(null, t.id)}>
                <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive hover:text-destructive hover:bg-destructive/10">
                  <Trash2 size={12}/>
                </Button>
              </form>
            </div>
          </div>
        )}
      />

      {techStacks.length === 0 && (
        <div className="col-span-full text-center py-10 text-muted-foreground border-2 border-dashed rounded-xl">
          No tech stack items found.
        </div>
      )}
    </div>
  );
}
