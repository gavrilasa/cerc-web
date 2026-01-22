import { prisma } from "@/lib/db";
import { ProjectCard } from "@/components/divisions-card"; 
import { SectionHeader } from "@/components/public/section-header";
import { DivisionTabs } from "@/components/public/division-filter-tabs";
import { Pagination } from "@/components/public/pagination";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

const ITEMS_PER_PAGE = 9;

interface ProjectsPageProps {
  searchParams: Promise<{ division?: string; page?: string }>;
}

async function ProjectsContent({ divisionFilter, page }: { divisionFilter?: string; page: number }) {
  const skip = (page - 1) * ITEMS_PER_PAGE;
  
  const [projects, totalCount] = await Promise.all([
    prisma.project.findMany({
      where: divisionFilter ? { division: { slug: divisionFilter } } : undefined,
      orderBy: [{ order: 'asc' }, { createdAt: "desc" }],
      include: { division: true },
      skip,
      take: ITEMS_PER_PAGE,
    }),
    prisma.project.count({
      where: divisionFilter ? { division: { slug: divisionFilter } } : undefined,
    }),
  ]);

  if (projects.length === 0) {
    return (
      <div className="py-16 text-center rounded-2xl border-2 border-dashed border-border bg-muted/50">
        <p className="text-muted-foreground font-medium">No projects found.</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            {...project}
            divisionName={project.division.title}
          />
        ))}
      </div>
      
      <Suspense fallback={null}>
        <Pagination totalItems={totalCount} itemsPerPage={ITEMS_PER_PAGE} className="mt-8" />
      </Suspense>
    </>
  );
}

export default async function ProjectsPage({ searchParams }: ProjectsPageProps) {
  const { division, page } = await searchParams;
  const currentPage = parseInt(page || "1", 10);
  
  const divisions = await prisma.division.findMany({
    orderBy: [{ order: 'asc' }, { title: "asc" }],
    select: { id: true, slug: true, title: true },
  });

  return (
    <div className="container mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-10 lg:py-12 space-y-6">
      <SectionHeader 
        title="All Projects"
        description="Explore the complete portfolio of applications, systems, and research built by our divisions."
        className="text-center"
      />

      <Suspense fallback={<div className="h-10 w-64 mx-auto bg-muted/50 rounded-full animate-pulse" />}>
        <DivisionTabs divisions={divisions} />
      </Suspense>

      <Suspense fallback={
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-64 bg-muted rounded-2xl animate-pulse" />
          ))}
        </div>
      }>
        <ProjectsContent divisionFilter={division} page={currentPage} />
      </Suspense>
    </div>
  );
}