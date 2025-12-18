"use client";

import React, { useLayoutEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Users,
  FolderKanban,
  Target,
  Zap,
  BookOpen,
  ChevronRight,
  Trophy,
  AppWindow,
  Cpu,
  Network,
  Clapperboard,
  Globe,
  MoreHorizontal,
  Calendar,
  CheckCircle2,
  Github,
  Linkedin,
  LucideIcon
} from "lucide-react";
import { gsap } from "gsap";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import LogoLoop from "@/components/LogoLoop";
import { SiReact, SiNextdotjs, SiTypescript, SiTailwindcss } from 'react-icons/si';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

// Icon Mapper
const IconMap: Record<string, LucideIcon> = {
  AppWindow, Cpu, Network, Clapperboard, Globe
};

// Tech Logos (Static for visual appeal)
const techLogos = [
  { node: <SiReact />, title: "React", href: "https://react.dev" },
  { node: <SiNextdotjs />, title: "Next.js", href: "https://nextjs.org" },
  { node: <SiTypescript />, title: "TypeScript", href: "https://www.typescriptlang.org" },
  { node: <SiTailwindcss />, title: "Tailwind CSS", href: "https://tailwindcss.com" },
];

const focusAreasDummy = [
  { icon: Target, title: "Core Fundamentals", desc: "Mastering the essential theory and principles." },
  { icon: Zap, title: "Rapid Prototyping", desc: "Building MVPs and proof-of-concepts quickly." },
  { icon: BookOpen, title: "Research & Publication", desc: "Documenting findings and contributing to knowledge." },
];

interface DivisionViewProps {
  data: any; // Full division object with relations
  stats: { label: string; value: string }[];
}

export default function DivisionView({ data, stats }: DivisionViewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Resolve Icon
  const Icon = IconMap[data.iconName] || FolderKanban;
  
  // Derive colors from the seed data (e.g. "text-blue-600" -> "bg-blue-600")
  // Fallback to blue if undefined
  const baseColor = data.colorClass || "text-blue-600";
  const bgColorClass = baseColor.replace("text-", "bg-");
  const textColorClass = baseColor;

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".bento-anim",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power3.out" }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen w-full bg-background px-4 py-6 md:py-12 space-y-8">
      <main ref={containerRef} className="container mx-auto max-w-6xl">
        
        {/* Breadcrumb */}
        <div className="mb-8 flex items-center gap-2 text-xs font-mono text-muted-foreground uppercase tracking-wider">
          <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <span>Divisions</span>
          <ChevronRight className="w-3 h-3" />
          <span className={cn("font-bold", textColorClass)}>{data.title}</span>
        </div>

        {/* 1. Hero Bento Grid */}
        <div className="bento-anim grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Main Title Card */}
          <div className="lg:col-span-2 bg-neutral-900 dark:bg-neutral-100 rounded-[2.5rem] p-8 md:p-12 flex flex-col justify-between relative overflow-hidden text-neutral-100 dark:text-neutral-900 shadow-sm">
            <div className="relative z-10">
               <div className="inline-flex p-3 rounded-2xl mb-6 backdrop-blur-sm bg-white/10 dark:bg-black/10 border border-white/10 dark:border-black/5">
                <Icon className="w-8 h-8 text-white dark:text-black" />
              </div>
              <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-[0.9] mb-6">
                {data.title}
              </h1>
              <p className="text-neutral-300 dark:text-neutral-600 text-base md:text-lg leading-relaxed max-w-xl">
                {data.description}
              </p>
            </div>
            {/* Background Decor */}
            <Icon className="absolute -right-12 -bottom-12 w-64 h-64 opacity-5 rotate-12 pointer-events-none text-white dark:text-black" />
          </div>

          {/* Stats Column */}
          <div className="flex flex-col gap-6">
            {stats.map((stat, i) => (
              <div key={i} className={cn("flex-1 rounded-[2.5rem] p-8 flex flex-col justify-center relative overflow-hidden", bgColorClass)}>
                 <div className="absolute top-0 right-0 p-20 blur-3xl opacity-20 bg-white rounded-full translate-x-1/2 -translate-y-1/2" />
                <span className="text-5xl font-black tracking-tighter relative z-10 text-white">{stat.value}</span>
                <span className="text-xs font-bold text-white/80 uppercase tracking-widest mt-2 relative z-10">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 2. Focus Areas */}
        <div className="bento-anim my-12">
           <h2 className="text-xl font-bold uppercase tracking-tight mb-6 flex items-center gap-3">
              <Target className={cn("w-5 h-5", textColorClass)} /> Our Focus
           </h2>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {focusAreasDummy.map((item, i) => (
                 <div key={i} className="bg-card border border-border rounded-2xl p-6 flex items-start gap-4 hover:border-primary/50 transition-colors">
                    <div className={cn("p-2 rounded-lg shrink-0 bg-opacity-10", bgColorClass, textColorClass)}>
                       <item.icon className="w-5 h-5" />
                    </div>
                    <div>
                       <h3 className="font-bold mb-1">{item.title}</h3>
                       <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                    </div>
                 </div>
              ))}
           </div>
        </div>
        
        {/* 3. Tech Stack */}
        <div className="bento-anim my-12">
            <div className="h-[72px] relative overflow-hidden rounded-2xl border border-dashed border-border bg-muted/30 flex items-center">
                <LogoLoop logos={techLogos} speed={40} direction="left" logoHeight={32} gap={40} />
            </div>
        </div>

        <Separator className="my-12 bento-anim" />

        {/* 4. Content Tabs (Projects, Members, Achievements) */}
        <div className="bento-anim" id="content-section">
            <Tabs defaultValue="projects" className="space-y-8">
                <div className="flex justify-center">
                    <TabsList className="bg-muted/50 p-1 rounded-full h-auto inline-flex">
                        <TabsTrigger value="projects" className="rounded-full px-6 py-2.5 data-[state=active]:bg-background data-[state=active]:shadow-sm">Projects</TabsTrigger>
                        <TabsTrigger value="members" className="rounded-full px-6 py-2.5 data-[state=active]:bg-background data-[state=active]:shadow-sm">Members</TabsTrigger>
                        <TabsTrigger value="achievements" className="rounded-full px-6 py-2.5 data-[state=active]:bg-background data-[state=active]:shadow-sm">Achievements</TabsTrigger>
                    </TabsList>
                </div>

                {/* --- PROJECTS --- */}
                <TabsContent value="projects" className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {data.projects.map((p: any) => (
                            <div key={p.id} className="group bg-card rounded-3xl border overflow-hidden hover:shadow-lg transition-all duration-300">
                                <div className="relative aspect-video bg-muted overflow-hidden">
                                    <Image src={p.imageUrl} alt={p.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                                </div>
                                <div className="p-6">
                                    <div className="flex justify-between items-start gap-4 mb-2">
                                        <h3 className="text-xl font-bold leading-tight">{p.title}</h3>
                                        <div className="flex gap-2">
                                            {p.githubUrl && <a href={p.githubUrl} target="_blank" className="text-muted-foreground hover:text-foreground"><Github size={18} /></a>}
                                            {p.demoUrl && <a href={p.demoUrl} target="_blank" className="text-muted-foreground hover:text-foreground"><Globe size={18} /></a>}
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {p.tags.map((t: string) => (
                                            <Badge key={t} variant="secondary" className="font-normal text-[10px]">{t}</Badge>
                                        ))}
                                    </div>
                                    <p className="text-sm text-muted-foreground line-clamp-2">{p.description}</p>
                                </div>
                            </div>
                        ))}
                        {data.projects.length === 0 && <p className="text-center text-muted-foreground col-span-full py-12">No projects yet.</p>}
                    </div>
                </TabsContent>

                {/* --- MEMBERS --- */}
                <TabsContent value="members" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {data.members.map((m: any) => (
                            <div key={m.id} className="flex items-center gap-4 p-4 rounded-2xl border bg-card hover:border-primary/20 transition-all">
                                <div className="relative w-14 h-14 rounded-full overflow-hidden border bg-muted shrink-0">
                                    <Image src={m.imageUrl} alt={m.name} fill className="object-cover" />
                                </div>
                                <div className="min-w-0">
                                    <h4 className="font-bold text-sm truncate">{m.name}</h4>
                                    <p className="text-xs text-muted-foreground truncate uppercase font-medium">{m.role}</p>
                                    <div className="flex gap-2 mt-1 opacity-60 hover:opacity-100 transition-opacity">
                                        {m.github && <a href={m.github} target="_blank"><Github size={12}/></a>}
                                        {m.linkedin && <a href={m.linkedin} target="_blank"><Linkedin size={12}/></a>}
                                    </div>
                                </div>
                            </div>
                        ))}
                         {data.members.length === 0 && <p className="text-center text-muted-foreground col-span-full py-12">No members found.</p>}
                    </div>
                </TabsContent>

                {/* --- ACHIEVEMENTS --- */}
                <TabsContent value="achievements" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {data.achievements.map((a: any) => (
                            <div key={a.id} className="flex gap-4 p-4 rounded-3xl border bg-card hover:shadow-md transition-all items-center">
                                <div className="relative w-24 h-24 rounded-2xl overflow-hidden bg-muted shrink-0">
                                    <Image src={a.imageUrl} alt={a.title} fill className="object-cover" />
                                </div>
                                <div>
                                    <span className="text-[10px] font-mono text-muted-foreground bg-muted px-2 py-0.5 rounded mb-2 inline-block">{a.date}</span>
                                    <h4 className="font-bold text-base leading-tight mb-1">{a.title}</h4>
                                    <p className="text-xs text-muted-foreground line-clamp-2 mb-2">{a.description}</p>
                                    <div className="flex items-center gap-1.5 text-xs font-medium">
                                        <Trophy size={12} className="text-amber-500" />
                                        <span>{a.winner}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                         {data.achievements.length === 0 && <p className="text-center text-muted-foreground col-span-full py-12">No achievements yet.</p>}
                    </div>
                </TabsContent>
            </Tabs>
        </div>

      </main>
    </div>
  );
}