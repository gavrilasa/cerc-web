"use client";

import { useState } from "react";
import { AchievementCard } from "@/components/divisions-card";
import { AchievementDialog } from "@/components/admin/dialogs";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { deleteAchievement, reorderAchievements } from "@/app/actions/cms";
import { SortableList } from "@/components/admin/sortable-list";
import { toast } from "sonner";

interface Achievement {
  id: string;
  title: string;
  date: string;
  issuer: string;
  winner: string;
  description: string;
  imageUrl: string;
  linkUrl: string | null;
  order?: number;
  division: { id: string; title: string };
}

interface Division {
  id: string;
  title: string;
}

export function AchievementsClient({ achievements: initialAchievements, divisions }: { achievements: Achievement[], divisions: Division[] }) {
  const [achievements, setAchievements] = useState(initialAchievements);

  const handleReorder = async (newItems: Achievement[]) => {
    setAchievements(newItems);
    
    const orderData = newItems.map((item, index) => ({
      id: item.id,
      order: index,
    }));
    
    try {
      await reorderAchievements(orderData);
      toast.success("Order saved");
    } catch {
      toast.error("Failed to save order");
      setAchievements(initialAchievements);
    }
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Achievements</h1>
          <p className="text-sm text-muted-foreground">Manage your achievements • Drag to reorder</p>
        </div>
        <AchievementDialog divisions={divisions} />
      </div>

      <SortableList
        items={achievements}
        onReorder={handleReorder}
        getId={(a) => a.id}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        layout="grid"
        renderItem={(achievement) => (
          <AchievementCard 
            {...achievement} 
            divisionName={achievement.division.title}
            colorClass="text-blue-600"
            actionSlot={
              <div className="flex gap-2">
                <AchievementDialog divisions={divisions} data={achievement} />
                <form action={deleteAchievement.bind(null, achievement.id)}>
                  <Button variant="destructive" size="icon" className="h-8 w-8"><Trash2 size={14}/></Button>
                </form>
              </div>
            }
          />
        )}
      />

      {achievements.length === 0 && (
        <div className="col-span-full text-center py-10 text-muted-foreground border-2 border-dashed rounded-xl">
          No achievements found.
        </div>
      )}
    </div>
  );
}
