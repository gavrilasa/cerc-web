import { prisma } from "@/lib/db";
import { SectionHeader } from "@/components/public/section-header";
import { DivisionTabs } from "@/components/public/division-filter-tabs";
import { MemberCard } from "@/components/divisions-card";
import { Pagination } from "@/components/public/pagination";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

const ITEMS_PER_PAGE = 18;

interface MembersPageProps {
  searchParams: Promise<{ division?: string; page?: string }>;
}

async function MembersContent({ divisionFilter, page }: { divisionFilter?: string; page: number }) {
  const skip = (page - 1) * ITEMS_PER_PAGE;
  
  const [members, totalCount] = await Promise.all([
    prisma.member.findMany({
      where: divisionFilter ? { division: { slug: divisionFilter } } : undefined,
      orderBy: [{ order: 'asc' }, { createdAt: "asc" }],
      include: { division: true },
      skip,
      take: ITEMS_PER_PAGE,
    }),
    prisma.member.count({
      where: divisionFilter ? { division: { slug: divisionFilter } } : undefined,
    }),
  ]);

  if (members.length === 0) {
    return (
      <div className="py-16 text-center rounded-2xl border-2 border-dashed border-border bg-muted/50">
        <p className="text-muted-foreground font-medium">No members found.</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {members.map((member) => (
          <MemberCard
            key={member.id}
            name={member.name}
            role={member.role}
            imageUrl={member.imageUrl}
            github={member.github}
            linkedin={member.linkedin}
            divisionName={member.division.title}
          />
        ))}
      </div>
      
      <Suspense fallback={null}>
        <Pagination totalItems={totalCount} itemsPerPage={ITEMS_PER_PAGE} className="mt-8" />
      </Suspense>
    </>
  );
}

export default async function MembersPage({ searchParams }: MembersPageProps) {
  const { division, page } = await searchParams;
  const currentPage = parseInt(page || "1", 10);
  
  const divisions = await prisma.division.findMany({
    orderBy: [{ order: 'asc' }, { title: "asc" }],
    select: { id: true, slug: true, title: true },
  });

  return (
    <div className="container mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-10 lg:py-12 space-y-6">
      <SectionHeader 
        title="Our Members"
        description="Meet the talented individuals driving innovation across our research divisions."
        className="text-center"
      />

      <Suspense fallback={<div className="h-10 w-64 mx-auto bg-muted/50 rounded-full animate-pulse" />}>
        <DivisionTabs divisions={divisions} />
      </Suspense>

      <Suspense fallback={
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="h-52 bg-muted rounded-2xl animate-pulse" />
          ))}
        </div>
      }>
        <MembersContent divisionFilter={division} page={currentPage} />
      </Suspense>
    </div>
  );
}
