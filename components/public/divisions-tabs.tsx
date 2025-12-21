"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { AppWindow, Network, Cpu, Clapperboard, LucideIcon, FolderKanban, Code, ArrowRight } from "lucide-react";
import Link from "next/link";

const iconMap: Record<string, LucideIcon> = {
  AppWindow, Network, Cpu, Clapperboard, FolderKanban
};

export function DivisionsTabs({ divisions }: { divisions: any[] }) {
  const [activeTab, setActiveTab] = useState(divisions[0]?.slug || "");
  const activeData = divisions.find((d) => d.slug === activeTab) || divisions[0];
  const HeroIcon = iconMap[activeData?.iconName] || FolderKanban;

  return (
    <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Tab Navigation */}
      <div className="flex flex-wrap justify-center gap-2 mb-12 p-2 bg-neutral-100 dark:bg-neutral-900 rounded-full w-fit mx-auto">
        {divisions.map((div) => {
          const isActive = activeTab === div.slug;
          const Icon = iconMap[div.iconName] || FolderKanban;
          return (
            <button
              key={div.id}
              onClick={() => setActiveTab(div.slug)}
              className={cn(
                "px-6 py-3 rounded-full flex items-center gap-2 text-sm font-bold transition-all duration-300",
                isActive 
                  ? "bg-white dark:bg-neutral-800 text-black dark:text-white shadow-lg" 
                  : "text-neutral-500 hover:text-black dark:hover:text-white"
              )}
            >
              <Icon size={16} />
              {div.title}
            </button>
          );
        })}
      </div>

      {/* Content Area */}
      <div className="bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-[2.5rem] p-8 md:p-12 min-h-[500px]">
         <div className="grid md:grid-cols-3 gap-12">
            {/* Info Column */}
            <div className="md:col-span-1 space-y-8">
                <div>
                    <div className="w-16 h-16 rounded-2xl bg-white dark:bg-black border border-neutral-200 dark:border-neutral-800 flex items-center justify-center mb-6 shadow-sm text-primary">
                        <HeroIcon size={32} />
                    </div>
                    <h2 className="text-4xl font-black uppercase tracking-tighter mb-4">{activeData.title}</h2>
                    <p className="text-neutral-500 dark:text-neutral-400 leading-relaxed font-medium">{activeData.description}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-white dark:bg-black border border-neutral-200 dark:border-neutral-800">
                        <span className="block text-3xl font-black">{activeData._count.projects}</span>
                        <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">Projects</span>
                    </div>
                    <div className="p-4 rounded-xl bg-white dark:bg-black border border-neutral-200 dark:border-neutral-800">
                        <span className="block text-3xl font-black">{activeData._count.members}</span>
                        <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">Members</span>
                    </div>
                </div>
            </div>

            {/* Content Column */}
            <div className="md:col-span-2">
                 <div className="flex justify-between items-center mb-6 border-b border-dashed border-neutral-200 dark:border-neutral-800 pb-4">
                    <h3 className="font-bold text-lg flex items-center gap-2">
                        <Code size={18} /> Latest Work
                    </h3>
                    <Link href="/projects" className="text-xs font-bold uppercase tracking-wider hover:underline">View All Projects</Link>
                 </div>
                 
                 <div className="grid sm:grid-cols-2 gap-4">
                    {activeData.projects.length > 0 ? activeData.projects.slice(0, 4).map((p: any) => (
                        <Link href={p.githubUrl || "#"} key={p.id} target="_blank" className="group bg-white dark:bg-black border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 hover:border-primary/50 transition-all hover:shadow-md">
                            <h4 className="font-bold mb-2 truncate group-hover:text-primary transition-colors">{p.title}</h4>
                            <p className="text-sm text-neutral-500 line-clamp-2 mb-4">{p.description}</p>
                            <div className="flex items-center text-xs font-bold text-neutral-400 group-hover:translate-x-2 transition-transform">
                                View Details <ArrowRight size={12} className="ml-1" />
                            </div>
                        </Link>
                    )) : (
                        <div className="col-span-2 py-12 text-center border-2 border-dashed border-neutral-200 dark:border-neutral-800 rounded-2xl text-neutral-400">
                            No projects listed yet.
                        </div>
                    )}
                 </div>
            </div>
         </div>
      </div>
    </div>
  );
}