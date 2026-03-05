"use client";

import { useState, useLayoutEffect } from "react";
import Intro from "@/components/Intro";
import { Hero } from "@/components/home/Hero";
import { CoreIdentity } from "@/components/home/CoreIdentity";
import { LMSSection } from "@/components/home/LMSSection";
import { CTASection } from "@/components/home/CTASection";
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

interface Project {
  id: string;
  title: string;
  demoUrl: string | null;
  githubUrl: string | null;
}

interface Division {
  id: string;
  title: string;
  description: string;
  iconName: string;
  slug: string;
  projects: Project[];
  members: Member[];
  _count: {
    projects: number;
    members: number;
  };
}

// DivisionCard component moved outside LandingPage to prevent re-creation on every render
function DivisionCard({ item }: { item: Division }) {
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


  return (
    <div className="w-full min-h-screen bg-background flex flex-col">
      {showSplash ? (
        <Intro onFinish={handleFinish} />
      ) : (
        <main className="flex-1 w-full animate-in fade-in duration-1000 slide-in-from-bottom-4">

          {/* ========== 1. HERO + TRUST SECTIONS ========== */}
          <Hero members={members} divisions={divisions} />

          {/* ========== 2. CORE IDENTITY SECTION ========== */}
          <CoreIdentity />

          {/* ========== 3. LMS SECTION ========== */}
          <LMSSection />

          {/* ========== 4. CTA SECTION ========== */}
          <CTASection />

        </main>
      )}
    </div>
  );
}