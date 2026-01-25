"use client";

import { useState, useLayoutEffect } from "react";
import Intro from "@/components/Intro";
import { Hero } from "@/components/home/Hero";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ExternalLink, AppWindow, Network, Cpu, Clapperboard, FolderKanban, LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

// Icon Map
const iconMap: Record<string, LucideIcon> = {
  AppWindow, Network, Cpu, Clapperboard, FolderKanban
};

interface Member {
  id: string;
  name: string;
  role: string | null;
  imageUrl: string | null;
}

interface Division {
  id: string;
  title: string;
  description: string;
  iconName: string;
  _count: {
    projects: number;
    members: number;
  };
  [key: string]: unknown;
}

export function LandingPage({ divisions, members = [] }: { divisions: Division[]; members?: Member[] }) {
  const [showSplash, setShowSplash] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  // useLayoutEffect prevents flash. Using setTimeout to avoid set-state-in-effect warning.
  useLayoutEffect(() => {
    // Check session storage to see if user has visited before in this session
    const hasSeenSplash = sessionStorage.getItem("hasSeenSplashSession");
    
    // Only show splash if they haven't seen it
    if (!hasSeenSplash) {
      setTimeout(() => {
        setShowSplash(true);
        setIsChecking(false);
      }, 0);
    } else {
      setTimeout(() => {
        setIsChecking(false);
      }, 0);
    }
  }, []);
  
  const handleFinish = () => {
    setShowSplash(false);
    sessionStorage.setItem("hasSeenSplashSession", "true");
  };

  if (isChecking) return <div className="min-h-screen bg-background" />;

  const DivisionCard = ({ item }: { item: Division }) => {
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
      </Link>
    );
  };

  return (
    <div className="w-full min-h-screen bg-background flex flex-col overflow-hidden">
      {showSplash ? (
        <Intro onFinish={handleFinish} />
      ) : (
        <main className="flex-1 w-full animate-in fade-in duration-1000 slide-in-from-bottom-4 py-6 md:py-10 lg:py-4 space-y-8 md:space-y-8">
          {/* 1. HERO SECTION */}
          <Hero members={members} />

          {/* 2. CORE PILLARS SECTION (Divisions Only) */}
          <section className="container mx-auto px-4 md:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-auto lg:h-[700px]"> 
               {/* Left Column - 2 Divisions */}
               <div className="flex flex-col gap-4 h-full order-2 lg:order-1 font-mono">
                 {divisions.slice(0, 2).map((item) => (
                   <DivisionCard key={item.id} item={item} />
                 ))}
               </div>

               {/* Middle Column */}
               <div className="lg:col-span-1 order-1 lg:order-2 h-full bg-neutral-900 dark:bg-neutral-100 rounded-[2.5rem] p-8 md:p-12 flex flex-col items-center justify-center text-center text-neutral-100 dark:text-neutral-900 shadow-sm border border-transparent hover:border-neutral-700 dark:hover:border-neutral-300 transition-all duration-300 hover:shadow-lg">
                 <div className="w-20 h-20 bg-white/10 dark:bg-black/5 rounded-3xl flex items-center justify-center mb-8 backdrop-blur-sm">
                   <FolderKanban className="w-10 h-10" />
                 </div>
                 <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-none mb-6">
                   Our Core <br /> Divisions
                 </h2>
                 <p className="text-lg text-neutral-400 dark:text-neutral-600 font-medium leading-relaxed max-w-[280px] mb-8">
                   {divisions.length} specialized divisions mastering the foundations of modern computing.
                 </p>
                 <div className="inline-flex flex-col items-center gap-2 mt-2 pt-8 border-t border-white/20 dark:border-black/20">
                   <span className="text-md font-mono uppercase tracking-widest opacity-70">Our Motto</span>
                   <span className="font-bold text-sm tracking-wider">THINK PRECISELY, BUILD WISELY.</span>
                 </div>
               </div>

               {/* Right Column - 2 Divisions */}
               <div className="flex flex-col gap-4 h-full order-3 font-mono">
                 {divisions.slice(2, 4).map((item) => (
                   <DivisionCard key={item.id} item={item} />
                 ))}
               </div>
            </div>
          </section>

          {/* 3. CTA */}
          <section className="container mx-auto px-4 md:px-6 lg:px-8 pb-12">
            <div className="relative bg-neutral-900 dark:bg-neutral-100 rounded-[2.5rem] overflow-hidden group text-white dark:text-neutral-900 shadow-sm">
               <div className="flex flex-col lg:flex-row min-h-[360px]">
                 {/* Left Content */}
                 <div className="flex-1 p-8 md:p-12 flex flex-col justify-center">
                   <div className="max-w-xl space-y-6">
                     <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">
                       Ready to Innovate?
                     </h2>
                     <p className="text-lg text-neutral-300 dark:text-neutral-600 leading-relaxed font-medium">
                       Explore our projects or see the technologies we use to build the future.
                     </p>
                     <div className="flex flex-wrap gap-4 pt-2">
                       <Link href="/projects">
                          <Button variant="outline" size="lg" className="rounded-full h-14 px-8 font-bold text-base bg-transparent border-white/30 dark:border-neutral-900/30 hover:bg-white dark:hover:bg-black hover:scale-105 active:scale-95 transition-all">
                              View Projects <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                          </Button>
                       </Link>
                       <Link href="/tech-stack">
                          <Button variant="outline" size="lg" className="rounded-full h-14 px-8 font-bold text-base bg-transparent border-white/30 dark:border-neutral-900/30 hover:bg-white dark:hover:bg-black hover:scale-105 active:scale-95 transition-all">
                              Our Tech Stack <ExternalLink className="ml-2 w-4 h-4" />
                          </Button>
                       </Link>
                     </div>
                   </div>
                 </div>
                 
                 {/* Right Mockup */}
                 <div className="relative w-full lg:w-[45%] h-64 lg:h-auto">
                   <Image
                     src="/mockup.png"
                     alt="Project Mockup"
                     fill
                     className="object-contain object-center lg:object-right p-4 lg:p-8 group-hover:scale-105 transition-transform duration-500"
                   />
                 </div>
               </div>
            </div>
          </section>
        </main>
      )}
    </div>
  );
}