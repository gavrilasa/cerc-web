import { prisma } from "@/lib/db";
import Image from "next/image";
import { Code, Cpu, Network, Clapperboard, FolderKanban } from "lucide-react";

const iconMap: Record<string, any> = {
    AppWindow: Code, Network: Network, Cpu: Cpu, Clapperboard: Clapperboard, FolderKanban: FolderKanban
};

export const dynamic = "force-dynamic";

export default async function TechStackPage() {
  const divisions = await prisma.division.findMany({
    include: { techStacks: true },
    orderBy: { title: "asc" }
  });

  return (
    <div className="min-h-screen pt-32 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6">Our Tech Stack</h1>
          <p className="text-lg text-neutral-500 max-w-2xl mx-auto font-medium">
            The languages, frameworks, tools, and hardware that power our research.
          </p>
        </div>

        <div className="space-y-12">
            {divisions.map((div) => {
                const Icon = iconMap[div.iconName] || FolderKanban;
                if (div.techStacks.length === 0) return null;

                return (
                    <div key={div.id} className="bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-[2.5rem] p-10 md:p-12">
                        <div className="flex items-center gap-4 mb-10">
                            <div className="p-3 rounded-xl bg-white dark:bg-black border border-neutral-200 dark:border-neutral-800">
                                <Icon className="w-6 h-6" />
                            </div>
                            <h2 className="text-3xl font-black uppercase tracking-tight">
                                {div.title}
                            </h2>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                            {div.techStacks.map((t) => (
                                <a key={t.id} href={t.websiteUrl || "#"} target="_blank" className="group flex flex-col items-center justify-center p-6 rounded-3xl bg-white dark:bg-black border border-transparent hover:border-neutral-200 dark:hover:border-neutral-700 hover:shadow-lg transition-all aspect-square">
                                    <div className="relative w-12 h-12 mb-4 filter grayscale group-hover:grayscale-0 transition-all duration-300">
                                        <Image src={t.imageUrl} alt={t.name} fill className="object-contain" />
                                    </div>
                                    <span className="font-bold text-sm text-neutral-500 group-hover:text-black dark:group-hover:text-white transition-colors">{t.name}</span>
                                </a>
                            ))}
                        </div>
                    </div>
                )
            })}
        </div>
      </div>
    </div>
  );
}