import { prisma } from "@/lib/db";
import { ProjectCard } from "@/components/divisions-card"; // Reusing your card component

export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: "desc" },
    include: { division: true },
  });

  return (
    <div className="min-h-screen pt-32 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6">All Projects</h1>
            <p className="text-lg text-neutral-500 max-w-2xl font-medium">
            Explore the complete portfolio of applications, systems, and research built by our divisions.
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.length > 0 ? (
            projects.map((project) => (
              <ProjectCard
                key={project.id}
                {...project}
                divisionName={project.division.title}
              />
            ))
          ) : (
            <div className="col-span-full py-32 text-center rounded-[3rem] border-2 border-dashed border-neutral-200 dark:border-neutral-800">
               <p className="text-neutral-500 font-bold text-xl">No projects in the archive yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}