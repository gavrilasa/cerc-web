import { prisma } from "@/lib/db";
import Image from "next/image";
import { Code, Cpu, Network, Clapperboard, FolderKanban } from "lucide-react";
import { SectionHeader } from "@/components/public/section-header";

const iconMap: Record<string, any> = {
    AppWindow: Code, Network: Network, Cpu: Cpu, Clapperboard: Clapperboard, FolderKanban: FolderKanban
};

export const dynamic = "force-dynamic";

export default async function TechStackPage() {
  const divisions = await prisma.division.findMany({
    include: { 
      techStacks: {
        orderBy: [{ order: 'asc' }, { name: 'asc' }]
      } 
    },
    orderBy: [{ order: 'asc' }, { title: "asc" }]
  });

  return (
    <div className="container mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-10 lg:py-12 space-y-6">
      <SectionHeader
         title="Our Tech Stack"
         description="The languages, frameworks, tools, and hardware that power our research."
         className="text-center"
      />

      <div className="space-y-6">
        {divisions.map((div) => {
          const Icon = iconMap[div.iconName] || FolderKanban;
          if (div.techStacks.length === 0) return null;

          return (
            <div key={div.id} className="bg-card border border-border rounded-2xl p-5 md:p-6">
              <div className="flex items-center gap-3 mb-5">
                <div className="p-2.5 rounded-xl bg-background border border-border">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-foreground">
                  {div.title}
                </h2>
              </div>

              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
                {div.techStacks.map((t) => (
                  <a 
                    key={t.id} 
                    href={t.websiteUrl || "#"} 
                    target="_blank" 
                    className="group flex flex-col items-center justify-center p-3 md:p-4 rounded-xl bg-background hover:shadow-md transition-all"
                  >
                    <div className="relative w-8 h-8 md:w-10 md:h-10 mb-2 filter grayscale group-hover:grayscale-0 transition-all duration-300">
                      <Image src={t.imageUrl} alt={t.name} fill className="object-contain" />
                    </div>
                    <span className="font-medium text-[11px] md:text-xs text-muted-foreground group-hover:text-foreground transition-colors text-center truncate max-w-full font-mono">
                      {t.name}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
}