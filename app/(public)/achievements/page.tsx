import { prisma } from "@/lib/db";
import { AchievementCard } from "@/components/divisions-card";
import { SectionHeader } from "@/components/public/section-header";
import { DivisionTabs } from "@/components/public/division-filter-tabs";
import { Pagination } from "@/components/public/pagination";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

const ITEMS_PER_PAGE = 9;

interface AchievementsPageProps {
  searchParams: Promise<{ division?: string; page?: string }>;
}

async function AchievementsContent({ divisionFilter, page }: { divisionFilter?: string; page: number }) {
  const skip = (page - 1) * ITEMS_PER_PAGE;
  
  const [achievements, totalCount] = await Promise.all([
    prisma.achievement.findMany({
      where: divisionFilter ? { division: { slug: divisionFilter } } : undefined,
      orderBy: [{ order: 'asc' }, { createdAt: "desc" }],
      include: { division: true },
      skip,
      take: ITEMS_PER_PAGE,
    }),
    prisma.achievement.count({
      where: divisionFilter ? { division: { slug: divisionFilter } } : undefined,
    }),
  ]);

  if (achievements.length === 0) {
    return (
      <div className="py-16 text-center rounded-2xl border-2 border-dashed border-border bg-muted/50">
        <p className="text-muted-foreground font-medium">No achievements found.</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {achievements.map((item) => (
          <AchievementCard 
            key={item.id} 
            {...item} 
            divisionName={item.division.title}
          />
        ))}
      </div>
      
      <Suspense fallback={null}>
        <Pagination totalItems={totalCount} itemsPerPage={ITEMS_PER_PAGE} className="mt-8" />
      </Suspense>
    </>
  );
}

export default async function AchievementsPage({ searchParams }: AchievementsPageProps) {
  const { division, page } = await searchParams;
  const currentPage = parseInt(page || "1", 10);
  
  const divisions = await prisma.division.findMany({
    orderBy: [{ order: 'asc' }, { title: "asc" }],
    select: { id: true, slug: true, title: true },
  });

  return (
    <div className="container mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-10 lg:py-12 space-y-6">
      <SectionHeader 
        title="Achievements"
        description="Celebrating the victories, milestones, and recognition earned by our dedicated research teams."
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
        <AchievementsContent divisionFilter={division} page={currentPage} />
      </Suspense>
    </div>
  );
}