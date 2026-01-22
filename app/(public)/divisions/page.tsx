import { prisma } from "@/lib/db";
import { SectionHeader } from "@/components/public/section-header";
import Link from "next/link";
import { AppWindow, Network, Cpu, Clapperboard, FolderKanban, ArrowRight, LucideIcon } from "lucide-react";

export const dynamic = "force-dynamic";

const iconMap: Record<string, LucideIcon> = {
  AppWindow, Network, Cpu, Clapperboard, FolderKanban
};

export default async function DivisionsPage() {
  const divisions = await prisma.division.findMany({
    orderBy: [{ order: 'asc' }, { title: 'asc' }],
    include: {
      _count: { select: { projects: true, members: true } }
    },
  });

  return (
    <div className="container mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-10 lg:py-12 space-y-8">
      <SectionHeader 
        title="Our Divisions"
        description="Specialized research groups pushing the boundaries of computer engineering fields."
        className="text-center"
      />
      
      {/* Divisions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {divisions.map((division) => {
          const Icon = iconMap[division.iconName] || FolderKanban;
          
          return (
            <Link 
              key={division.id}
              href={`/divisions/${division.slug}`}
              className="group relative bg-card border border-border rounded-2xl p-6 md:p-8 hover:border-primary/30 hover:shadow-lg transition-all duration-300"
            >
              {/* Icon */}
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <Icon className="w-6 h-6 md:w-7 md:h-7 text-primary" />
              </div>
              
              {/* Title */}
              <h2 className="text-xl md:text-2xl font-bold font-mono text-foreground mb-2 group-hover:text-primary transition-colors">
                {division.title}
              </h2>
              
              {/* Description */}
              <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-6 line-clamp-2">
                {division.description || `Specialized research group focused on ${division.title.toLowerCase()}.`}
              </p>
              
              {/* Stats */}
              <div className="flex items-center gap-4 text-sm text-muted-foreground font-mono">
                <span className="flex items-center gap-1.5">
                  <span className="font-semibold text-foreground">{division._count.projects}</span> projects
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="font-semibold text-foreground">{division._count.members}</span> members
                </span>
              </div>
              
              {/* Arrow */}
              <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowRight className="w-5 h-5 text-primary" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}