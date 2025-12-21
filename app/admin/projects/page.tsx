import { prisma } from "@/lib/db";
import { ProjectCard } from "@/components/divisions-card";
import { ProjectDialog } from "@/components/admin/dialogs";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { deleteProject } from "@/app/actions/cms";

export default async function AdminProjectsPage() {
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: 'desc' },
    include: { division: true }
  });

  const divisions = await prisma.division.findMany();

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
        <ProjectDialog divisions={divisions} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <ProjectCard 
            key={project.id} 
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
        ))}
        {projects.length === 0 && <div className="col-span-full text-center py-10 text-muted-foreground border-2 border-dashed rounded-xl">No projects found.</div>}
      </div>
    </div>
  );
}