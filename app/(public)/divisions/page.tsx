import { prisma } from "@/lib/db";
import { DivisionsTabs } from "@/components/public/divisions-tabs";

export const dynamic = "force-dynamic";

export default async function DivisionsPage() {
  const divisions = await prisma.division.findMany({
    orderBy: { title: 'asc' },
    include: {
      projects: { orderBy: { createdAt: "desc" } },
      members: { orderBy: { createdAt: "asc" } },
      _count: { select: { projects: true, members: true } }
    },
  });

  return (
    <div className="min-h-screen pt-32 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6">Our Divisions</h1>
          <p className="text-lg text-neutral-500 max-w-2xl mx-auto font-medium">
            Specialized research groups pushing the boundaries of computer engineering fields.
          </p>
        </div>
        <DivisionsTabs divisions={divisions} />
      </div>
    </div>
  );
}