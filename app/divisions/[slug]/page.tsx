"use client";

import React, { use, useLayoutEffect, useRef } from "react";
import { divisions } from "@/lib/divisions";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Users,
  FolderKanban,
  Calendar,
  Target,
  Zap,
  BookOpen,
  ChevronRight,
  Trophy,
  Cpu,
} from "lucide-react";
import { gsap } from "gsap";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import LogoLoop from "@/components/LogoLoop";
import { SiReact, SiNextdotjs, SiTypescript, SiTailwindcss } from 'react-icons/si';

const techLogos = [
  { node: <SiReact />, title: "React", href: "https://react.dev" },
  { node: <SiNextdotjs />, title: "Next.js", href: "https://nextjs.org" },
  { node: <SiTypescript />, title: "TypeScript", href: "https://www.typescriptlang.org" },
  { node: <SiTailwindcss />, title: "Tailwind CSS", href: "https://tailwindcss.com" },
];

// Data dummy untuk "Focus Areas" agar halaman terlihat penuh
const focusAreasDummy = [
  { icon: Target, title: "Core Fundamentals", desc: "Mastering the essential theory and principles." },
  { icon: Zap, title: "Rapid Prototyping", desc: "Building MVPs and proof-of-concepts quickly." },
  { icon: BookOpen, title: "Research & Publication", desc: "Documenting findings and contributing to knowledge." },
];

export default function DivisionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const data = divisions[slug];
  const containerRef = useRef<HTMLDivElement>(null);

  if (!data) return notFound();

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".bento-anim",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const Icon = data.icon;
  // Mendapatkan warna teks dasar dari kelas background (misal: bg-blue-600 -> text-blue-600)
  const textColorClass = data.colorClass.replace("bg-", "text-");

  return (
    <div className="min-h-screen w-full bg-background px-4 py-2 md:py-4 space-y-8">
      <main ref={containerRef} className="container mx-auto max-w-6xl">
        {/* Breadcrumb Compact */}
        <div className="mb-4 flex items-center gap-2 text-xs font-mono text-muted-foreground uppercase tracking-wider">
          <Link href="/" className="hover:text-foreground transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3 h-3" />
          <span>Divisions</span>
          <ChevronRight className="w-3 h-3" />
          <span className={cn("font-bold", textColorClass)}>{data.title}</span>
        </div>

        {/* 1. Redesigned Hero Section (Lebih Padat) */}
        <div className="bento-anim grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Title & Description Card */}
          <div className="lg:col-span-2 bg-neutral-900 dark:bg-neutral-100 rounded-4xl p-8 md:p-10 flex flex-col justify-between relative overflow-hidden text-neutral-100 dark:text-neutral-900 shadow-lg">
            <div className="relative z-10">
               <div className="inline-flex p-3 rounded-2xl mb-6 backdrop-blur-sm bg-white/10 dark:bg-black/10">
                <Icon className="w-8 h-8 text-white dark:text-black" />
              </div>
              <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-[0.9] mb-4">
                {data.title}
              </h1>
              <p className="text-neutral-300 dark:text-neutral-700 text-base md:text-lg leading-relaxed max-w-xl">
                {data.longDescription}
              </p>
            </div>
            {/* Decorative Icon Background */}
            <Icon className={cn("absolute -right-12 -bottom-12 w-64 h-64 opacity-10 rotate-12 pointer-events-none text-white dark:text-black")} />
          </div>

          {/* Stats Column */}
          <div className="flex flex-col gap-6">
            {data.stats.map((stat, i) => (
              <div 
                key={i} 
                className={cn(
                  "flex-1 rounded-4xl p-8 flex flex-col justify-center border border-transparent relative overflow-hidden",
                  // Menggunakan warna background divisi dengan opacity rendah (tinted)
                  data.colorClass 
                )}
              >
                 {/* Decorative blob dengan warna divisi */}
                 <div className={cn("absolute top-0 right-0 p-20 blur-3xl opacity-20 rounded-full translate-x-1/2 -translate-y-1/2", data.colorClass)} />
                
                {/* Angka menggunakan warna teks divisi */}
                <span className={"text-5xl font-black tracking-tighter relative z-10 text-white"}>{stat.value}</span>
                
                <span className="text-sm font-bold text-white uppercase tracking-wider mt-2 relative z-10">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 2. NEW Section: Focus Areas (Menambah Isi Halaman) */}
        <div className="bento-anim my-12">
           <h2 className="text-xl font-bold uppercase tracking-tight mb-6 flex items-center gap-3">
              <Target className={cn("w-5 h-5", textColorClass)} />
              Our Key Focus Areas
           </h2>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {focusAreasDummy.map((item, i) => (
                 <div key={i} className="bg-background border border-border rounded-2xl p-6 flex items-start gap-4 hover:border-primary/50 transition-colors">
                    <div className={cn("p-2 rounded-lg shrink-0", data.colorClass + "/10", textColorClass)}>
                       <item.icon className="w-5 h-5" />
                    </div>
                    <div>
                       <h3 className="font-bold mb-1">{item.title}</h3>
                       <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                 </div>
              ))}
           </div>
        </div>
        
        {/* 3. NEW Section: Technology Stack */}
        <div className="bento-anim my-12 mx-4">
            <h2 className="text-xl font-bold uppercase tracking-tight mb-6 flex items-center gap-3">
                <Cpu className={cn("w-5 h-5", textColorClass)} />
                Technology Stack
            </h2>
            <div style={{ height: '72px', position: 'relative', overflow: 'hidden'}}>
            {/* Basic horizontal loop */}
            <LogoLoop
                logos={techLogos}
                speed={40}
                direction="left"
                logoHeight={48}
                gap={40}
                hoverSpeed={0}
                scaleOnHover
                fadeOut
                fadeOutColor=""
                ariaLabel="Technology partners"
            />
            </div>
        </div>

        <Separator className="my-12 bento-anim" />

        {/* 4. Navigation Links (Updated to 3 columns) */}
        <div className="bento-anim grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Projects Link */}
          <Link
            href={`/divisions/${slug}/projects`}
            className="group bg-linear-to-br from-neutral-900 to-neutral-800 dark:from-neutral-100 dark:to-neutral-200 rounded-4xl p-8 relative overflow-hidden flex flex-col justify-between min-h-60 hover:shadow-xl transition-all cursor-pointer"
          >
            <div className="flex justify-between items-start z-10">
               <div className="bg-white/10 dark:bg-black/10 p-3 rounded-full backdrop-blur-sm">
                  <FolderKanban className="w-8 h-8 text-white dark:text-black" />
               </div>
               <ArrowRight className="w-6 h-6 text-white dark:text-black -rotate-45 group-hover:rotate-0 group-hover:scale-110 transition-all duration-300" />
            </div>
            <div className="z-10 mt-auto">
              <h3 className="text-2xl font-black text-white dark:text-black uppercase tracking-tight">Projects</h3>
              <p className="text-neutral-300 dark:text-neutral-700 mt-2 text-sm">Explore our portfolio &rarr;</p>
            </div>
             <div className="absolute inset-0 bg-black/20 dark:bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
          </Link>

          {/* Members Link */}
          <Link
             href={`/divisions/${slug}/members`}
            className={cn(
              "group rounded-4xl p-8 relative overflow-hidden flex flex-col justify-between min-h-60 hover:shadow-xl transition-all cursor-pointer",
              data.colorClass
            )}
          >
            <div className="flex justify-between items-start z-10">
                <div className="bg-black/20 p-3 rounded-full backdrop-blur-sm">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <ArrowRight className="w-6 h-6 text-white -rotate-45 group-hover:rotate-0 group-hover:scale-110 transition-all duration-300" />
            </div>
            <div className="z-10 mt-auto">
              <h3 className="text-2xl font-black text-white uppercase tracking-tight">Members</h3>
              <p className="text-white/80 mt-2 text-sm">Meet the researchers &rarr;</p>
            </div>
            {/* Subtle Pattern */}
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay pointer-events-none" />
          </Link>

          {/* Achievements Link */}
          <Link
             href={`/divisions/${slug}/achievements`}
            className={cn(
               "group rounded-4xl p-8 relative overflow-hidden flex flex-col justify-between min-h-60 hover:shadow-xl transition-all cursor-pointer",
               data.colorClass
            )}
          >
            <div className="flex justify-between items-start z-10">
                <div className="bg-black/20 p-3 rounded-full backdrop-blur-sm">
                  <Trophy className="w-8 h-8 text-white" />
                </div>
                <ArrowRight className="w-6 h-6 text-white -rotate-45 group-hover:rotate-0 group-hover:scale-110 transition-all duration-300" />
            </div>
            <div className="z-10 mt-auto">
              <h3 className="text-2xl font-black text-white uppercase tracking-tight">Awards</h3>
              <p className="text-white/80 mt-2 text-sm">Hall of fame &rarr;</p>
            </div>
             {/* Subtle Pattern */}
             <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay pointer-events-none" />
          </Link>
        </div>

      </main>
    </div>
  );
}