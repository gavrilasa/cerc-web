"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { AppWindow, Network, Cpu, Clapperboard, FolderKanban, Gamepad2, Database, Globe, Shield, Smartphone, Code, Server, Layers, Palette, Camera, Music, Video, Zap, Brain, Bot, Edit, Trash2, Plus, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DivisionForm } from "@/components/admin/forms";
import { deleteDivision, reorderDivisions } from "@/app/actions/cms";
import { Badge } from "@/components/ui/badge";
import { SortableList } from "@/components/admin/sortable-list";
import { toast } from "sonner";

// Icon map for dynamic icon rendering
const iconMap: Record<string, LucideIcon> = {
  AppWindow, Network, Cpu, Clapperboard, FolderKanban, Gamepad2, Database, Globe, Shield, Smartphone, Code, Server, Layers, Palette, Camera, Music, Video, Zap, Brain, Bot
};

interface Division {
  id: string;
  title: string;
  slug: string;
  iconName: string;
  description: string | null;
  order?: number;
  _count: {
    projects: number;
    members: number;
    achievements: number;
  };
}

export function DivisionsClient({ divisions: initialDivisions }: { divisions: Division[] }) {
  const [divisions, setDivisions] = useState(initialDivisions);
  const [createOpen, setCreateOpen] = useState(false);
  const [editOpen, setEditOpen] = useState<string | null>(null);

  const handleReorder = async (newItems: Division[]) => {
    setDivisions(newItems);
    
    // Save new order to database
    const orderData = newItems.map((item, index) => ({
      id: item.id,
      order: index,
    }));
    
    try {
      await reorderDivisions(orderData);
      toast.success("Order saved");
    } catch {
      toast.error("Failed to save order");
      // Revert on error
      setDivisions(initialDivisions);
    }
  };

  const DivisionCard = ({ div }: { div: Division }) => {
    const Icon = iconMap[div.iconName] || FolderKanban;
    
    return (
      <Card className="group hover:shadow-md transition-shadow">
        <CardContent className="p-5 pl-10">
          {/* Header with Icon and Actions */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-primary/10">
                <Icon size={20} className="text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-base leading-tight">{div.title}</h3>
                <Badge variant="outline" className="mt-1 text-[10px] font-normal px-1.5">
                  /{div.slug}
                </Badge>
              </div>
            </div>
            <div className="flex gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
              <Dialog open={editOpen === div.id} onOpenChange={(open) => setEditOpen(open ? div.id : null)}>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-7 w-7">
                    <Edit size={12} />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader><DialogTitle>Edit Division</DialogTitle></DialogHeader>
                  <DivisionForm data={div} onSuccess={() => setEditOpen(null)} />
                </DialogContent>
              </Dialog>
              <form action={deleteDivision.bind(null, div.id)}>
                <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive hover:text-destructive">
                  <Trash2 size={12} />
                </Button>
              </form>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
            {div.description}
          </p>

          {/* Stats */}
          <div className="flex items-center gap-4 text-xs text-muted-foreground pt-3 border-t border-border">
            <div className="flex items-center gap-1">
              <span className="font-medium text-foreground">{div._count.projects}</span>
              <span>Projects</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="font-medium text-foreground">{div._count.members}</span>
              <span>Members</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="font-medium text-foreground">{div._count.achievements}</span>
              <span>Awards</span>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Divisions</h1>
          <p className="text-sm text-muted-foreground">Manage your research divisions • Drag to reorder</p>
        </div>
        <Dialog open={createOpen} onOpenChange={setCreateOpen}>
          <DialogTrigger asChild>
            <Button size="sm">
              <Plus size={14} className="mr-1.5" />
              Add Division
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Create Division</DialogTitle></DialogHeader>
            <DivisionForm onSuccess={() => setCreateOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      <SortableList
        items={divisions}
        onReorder={handleReorder}
        getId={(div) => div.id}
        className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
        layout="grid"
        renderItem={(div) => <DivisionCard div={div} />}
      />
        
      {divisions.length === 0 && (
        <div className="col-span-full text-center py-12 text-muted-foreground border-2 border-dashed rounded-xl">
          No divisions found. Create your first division!
        </div>
      )}
    </div>
  );
}
