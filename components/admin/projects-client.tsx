"use client";

import { useState } from "react";
import { ProjectCard } from "@/components/divisions-card";
import { ProjectDialog } from "@/components/admin/dialogs";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { deleteProject, reorderProjects } from "@/app/actions/cms";
import { SortableList } from "@/components/admin/sortable-list";
import { toast } from "sonner";

interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  tags: string[];
  demoUrl: string | null;
  githubUrl: string | null;
  order?: number;
  division: { id: string; title: string };
}

interface Division {
  id: string;
  title: string;
}

export function ProjectsClient({ projects: initialProjects, divisions }: { projects: Project[], divisions: Division[] }) {
  const [projects, setProjects] = useState(initialProjects);

  const handleReorder = async (newItems: Project[]) => {
    setProjects(newItems);
    
    const orderData = newItems.map((item, index) => ({
      id: item.id,
      order: index,
    }));
    
    try {
      await reorderProjects(orderData);
      toast.success("Order saved");
    } catch {
      toast.error("Failed to save order");
      setProjects(initialProjects);
    }
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Projects</h1>
          <p className="text-sm text-muted-foreground">Manage your projects • Drag to reorder</p>
        </div>
        <ProjectDialog divisions={divisions} />
      </div>

      <SortableList
        items={projects}
        onReorder={handleReorder}
        getId={(p) => p.id}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        layout="grid"
        renderItem={(project) => (
          <ProjectCard 
            {...project} 
            divisionName={project.division.title}
            actionSlot={
              <div className="flex gap-2">
                <ProjectDialog divisions={divisions} data={project} />
                <form action={deleteProject.bind(null, project.id)}>
                  <Button variant="destructive" size="icon" className="h-8 w-8"><Trash2 size={14}/></Button>
                </form>
              </div>
            }
          />
        )}
      />

      {projects.length === 0 && (
        <div className="col-span-full text-center py-10 text-muted-foreground border-2 border-dashed rounded-xl">
          No projects found.
        </div>
      )}
    </div>
  );
}
