"use client";

import { useState, useEffect } from "react";
import Intro from "@/components/Intro";
import { Hero } from "@/components/home/Hero"; // Ensure you have this component or inline it
import Link from "next/link";
import { ArrowRight, ExternalLink, AppWindow, Network, Cpu, Clapperboard, FolderKanban, LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

// Icon Map
const iconMap: Record<string, LucideIcon> = {
  AppWindow, Network, Cpu, Clapperboard, FolderKanban
};

export function LandingPage({ divisions }: { divisions: any[] }) {
  const [showSplash, setShowSplash] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const hasSeenSplash = sessionStorage.getItem("hasSeenSplashSession");
    if (!hasSeenSplash) {
      setShowSplash(true);
    }
    setIsChecking(false);
  }, []);

  const handleFinish = () => {
    setShowSplash(false);
    sessionStorage.setItem("hasSeenSplashSession", "true");
  };

  if (isChecking) return <div className="min-h-screen bg-background" />;

  // Split divisions for the grid layout
  const leftColumnDivisions = divisions.slice(0, 2);
  const rightColumnDivisions = divisions.slice(2, 4);

  const DivisionCard = ({ item }: { item: any }) => {
    const Icon = iconMap[item.iconName] || FolderKanban;
    
    return (
      <Link
        href="/divisions"
        className="group flex-1 bg-neutral-100 dark:bg-neutral-900 border border-transparent hover:border-border rounded-[2.5rem] p-8 flex flex-col justify-between transition-all hover:shadow-lg hover:-translate-y-1 relative overflow-hidden"
      >
        <div className="relative z-10 flex flex-col h-full">
          <div className="flex justify-between items-start mb-4 gap-4">
             <h3 className="text-2xl font-black uppercase tracking-tight leading-none group-hover:underline decoration-2 underline-offset-4">
              {item.title}
            </h3>
            <Icon className="w-8 h-8 text-neutral-300 dark:text-neutral-700 group-hover:text-foreground dark:group-hover:text-white transition-colors shrink-0" />
          </div>
          
          <p className="text-muted-foreground font-medium leading-relaxed mb-8 line-clamp-3">
            {item.description}
          </p>
  
          <div className="mt-auto space-y-6">
             <div className="grid grid-cols-2 gap-3">
                 <div className="bg-background/40 dark:bg-black/20 rounded-xl p-3 border border-transparent group-hover:border-border/50 transition-colors">
                     <p className="text-2xl font-bold leading-none mb-1 text-foreground">{item._count.projects}</p>
                     <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Projects</p>
                 </div>
                 <div className="bg-background/40 dark:bg-black/20 rounded-xl p-3 border border-transparent group-hover:border-border/50 transition-colors">
                     <p className="text-2xl font-bold leading-none mb-1 text-foreground">{item._count.members}</p>
                     <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Members</p>
                 </div>
             </div>
          </div>
        </div>
        
        <div className="absolute bottom-8 right-8 flex justify-end opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
          <ArrowRight className="w-6 h-6 text-foreground" />
        </div>
      </Link>
    );
  };

  return (
    <div className="w-full min-h-screen bg-background flex flex-col overflow-hidden">
      {showSplash ? (
        <Intro onFinish={handleFinish} />
      ) : (
        <main className="flex-1 w-full animate-in fade-in duration-1000 slide-in-from-bottom-4 px-4 py-2 md:py-4 space-y-12">
          {/* 1. HERO SECTION */}
          <Hero />

          {/* 2. CORE PILLARS SECTION (CMS Integrated) */}
          <section className="container mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-auto lg:h-[700px]"> 
               {/* Left Column */}
               <div className="flex flex-col gap-4 h-full order-2 lg:order-1 font-mono">
                 {leftColumnDivisions.map((item) => (
                   <DivisionCard key={item.id} item={item} />
                 ))}
               </div>

               {/* Middle Column */}
               <div className="lg:col-span-1 order-1 lg:order-2 h-full bg-neutral-900 dark:bg-neutral-100 rounded-[2.5rem] p-8 md:p-12 flex flex-col items-center justify-center text-center text-neutral-100 dark:text-neutral-900 shadow-sm border border-transparent hover:border-neutral-700 dark:hover:border-neutral-300 transition-all duration-300 hover:shadow-lg">
                 <div className="w-20 h-20 bg-white/10 dark:bg-black/5 rounded-3xl flex items-center justify-center mb-8 backdrop-blur-sm">
                   <FolderKanban className="w-10 h-10" />
                 </div>
                 <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-none mb-6">
                   Our Core <br /> Pillars
                 </h2>
                 <p className="text-lg text-neutral-400 dark:text-neutral-600 font-medium leading-relaxed max-w-[280px] mb-8">
                   Four specialized divisions mastering the foundations of modern computing.
                 </p>
                 <div className="inline-flex flex-col items-center gap-2 mt-2 pt-8 border-t border-white/20 dark:border-black/20">
                   <span className="text-md font-mono uppercase tracking-widest opacity-70">Our Motto</span>
                   <span className="font-bold text-sm tracking-wider">THINK PRECISELY, BUILD WISELY.</span>
                 </div>
               </div>

               {/* Right Column */}
               <div className="flex flex-col gap-4 h-full order-3 font-mono">
                 {rightColumnDivisions.map((item) => (
                   <DivisionCard key={item.id} item={item} />
                 ))}
               </div>
            </div>
          </section>

          {/* 3. CTA */}
          <section className="container mx-auto mt-8 pb-20">
            <div className="relative bg-neutral-900 dark:bg-neutral-100 rounded-[2.5rem] p-8 md:p-12 overflow-hidden group text-white dark:text-neutral-900 shadow-sm">
               <div className="absolute inset-0 bg-linear-to-r from-black via-black/90 to-transparent dark:from-white dark:via-white/90" />
               <div className="relative z-10 flex flex-col lg:flex-row gap-12 items-center justify-between h-full">
                 <div className="max-w-2xl space-y-6">
                   <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">
                     Ready to Innovate?
                   </h2>
                   <p className="text-lg md:text-xl text-neutral-300 dark:text-neutral-600 leading-relaxed font-medium">
                     Explore our projects or see the technologies we use to build the future.
                   </p>
                   <div className="flex flex-wrap gap-4 pt-4">
                     <Link href="/projects">
                        <Button size="lg" className="rounded-full h-14 px-8 font-bold text-base">
                            View Projects <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                     </Link>
                     <Link href="/tech-stack">
                        <Button variant="outline" size="lg" className="rounded-full h-14 px-8 font-bold text-base bg-transparent">
                            Our Tech Stack <ExternalLink className="ml-2 w-4 h-4" />
                        </Button>
                     </Link>
                   </div>
                 </div>
               </div>
            </div>
          </section>
        </main>
      )}
    </div>
  );
}