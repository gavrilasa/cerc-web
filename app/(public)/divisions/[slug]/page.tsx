import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import LogoLoop from "@/components/LogoLoop";
import { SiReact, SiNextdotjs, SiTypescript, SiTailwindcss } from 'react-icons/si';
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
  AppWindow,
  Network,
  Clapperboard,
  Globe,
  LucideIcon
} from "lucide-react";

// --- Icon Mapping Helper ---
const IconMap: Record<string, LucideIcon> = {
  AppWindow, Cpu, Network, Clapperboard, Globe
};

// --- Static Data for Visuals ---
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

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const division = await prisma.division.findUnique({ where: { slug }, select: { title: true } });
  return {
    title: `${division?.title || "Division"} | CERC`,
  };
}

export default async function DivisionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  // 1. Fetch Data
  const division = await prisma.division.findUnique({
    where: { slug },
    include: {
      _count: {
        select: { projects: true, members: true, achievements: true }
      }
    }
  });

  if (!division) return notFound();

  // 2. Prepare Dynamic Assets
  const Icon = IconMap[division.iconName] || FolderKanban;
  
  // Convert "text-blue-600" -> "bg-blue-600" for the bento cards
  // Fallback to blue if colorClass is missing
  const baseColor = division.colorClass || "text-blue-600";
  const bgColorClass = baseColor.replace("text-", "bg-");
  const textColorClass = baseColor; // e.g. "text-blue-600"

  // Dynamic Stats from DB Counts
  const stats = [
    { label: "Active Projects", value: division._count.projects.toString() },
    { label: "Researchers", value: division._count.members.toString() },
    { label: "Awards Won", value: division._count.achievements.toString() },
  ];

  return (
    <div className="min-h-screen w-full bg-background px-4 py-2 md:py-4 space-y-8 pb-20">
      <main className="container mx-auto max-w-6xl">
        
        {/* Breadcrumb */}
        <div className="mb-4 flex items-center gap-2 text-xs font-mono text-muted-foreground uppercase tracking-wider">
          <Link href="/" className="hover:text-foreground transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3 h-3" />
          <span>Divisions</span>
          <ChevronRight className="w-3 h-3" />
          <span className={cn("font-bold", textColorClass)}>{division.title}</span>
        </div>

        {/* 1. Hero Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          
          {/* Title & Description Card */}
          <div className="lg:col-span-2 bg-neutral-900 dark:bg-neutral-100 rounded-[2.5rem] p-8 md:p-10 flex flex-col justify-between relative overflow-hidden text-neutral-100 dark:text-neutral-900 shadow-lg group">
            <div className="relative z-10">
               <div className="inline-flex p-3 rounded-2xl mb-6 backdrop-blur-sm bg-white/10 dark:bg-black/10 border border-white/10 dark:border-black/5">
                <Icon className="w-8 h-8 text-white dark:text-black" />
              </div>
              <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-[0.9] mb-4">
                {division.title}
              </h1>
              <p className="text-neutral-300 dark:text-neutral-700 text-base md:text-lg leading-relaxed max-w-xl">
                {division.description}
              </p>
            </div>
            
            {/* Background Icon Decor */}
            <Icon className="absolute -right-12 -bottom-12 w-64 h-64 opacity-5 rotate-12 pointer-events-none text-white dark:text-black transition-transform duration-700 group-hover:scale-110 group-hover:-rotate-12" />
          </div>

          {/* Stats Column (Dynamic) */}
          <div className="flex flex-col gap-6">
            {stats.map((stat, i) => (
              <div 
                key={i} 
                className={cn(
                  "flex-1 rounded-[2.5rem] p-8 flex flex-col justify-center border border-transparent relative overflow-hidden group",
                  bgColorClass // Dynamic Background Color
                )}
              >
                 {/* Decorative Blob */}
                 <div className="absolute top-0 right-0 p-20 blur-3xl opacity-20 bg-white rounded-full translate-x-1/2 -translate-y-1/2 transition-transform duration-700 group-hover:scale-150" />
                
                <span className="text-5xl font-black tracking-tighter relative z-10 text-white">{stat.value}</span>
                <span className="text-sm font-bold text-white/80 uppercase tracking-widest mt-2 relative z-10">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 2. Focus Areas */}
        <div className="my-12">
           <h2 className="text-xl font-bold uppercase tracking-tight mb-6 flex items-center gap-3">
              <Target className={cn("w-5 h-5", textColorClass)} />
              Our Key Focus Areas
           </h2>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {focusAreasDummy.map((item, i) => (
                 <div key={i} className="bg-card border border-border rounded-2xl p-6 flex items-start gap-4 hover:border-primary/50 transition-colors">
                    <div className={cn("p-2 rounded-lg shrink-0 bg-opacity-10", textColorClass)}>
                       <item.icon className="w-5 h-5" />
                    </div>
                    <div>
                       <h3 className="font-bold mb-1">{item.title}</h3>
                       <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                    </div>
                 </div>
              ))}
           </div>
        </div>
        
        {/* 3. Tech Stack */}
        <div className="my-12">
            <h2 className="text-xl font-bold uppercase tracking-tight mb-6 flex items-center gap-3">
                <Cpu className={cn("w-5 h-5", textColorClass)} />
                Technology Stack
            </h2>
            <div className="h-[72px] relative overflow-hidden flex items-center">
                <LogoLoop
                    logos={techLogos}
                    speed={40}
                    direction="left"
                    logoHeight={32}
                    gap={40}
                    hoverSpeed={0}
                    scaleOnHover
                    fadeOut
                    fadeOutColor=""
                    ariaLabel="Technology partners"
                />
            </div>
        </div>

        <Separator className="my-12" />

        {/* 4. Navigation Links (The 3 Big Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          
          {/* Projects Link */}
          <Link
            href={`/divisions/${slug}/projects`}
            className="group bg-linear-to-br from-neutral-900 to-neutral-800 dark:from-neutral-100 dark:to-neutral-200 rounded-[2.5rem] p-8 relative overflow-hidden flex flex-col justify-between min-h-60 hover:shadow-xl transition-all cursor-pointer"
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
              "group rounded-[2.5rem] p-8 relative overflow-hidden flex flex-col justify-between min-h-60 hover:shadow-xl transition-all cursor-pointer",
              bgColorClass // Dynamic Background
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
            {/* Subtle Noise Texture */}
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay pointer-events-none" />
          </Link>

          {/* Achievements Link */}
          <Link
             href={`/divisions/${slug}/achievements`}
            className={cn(
               "group rounded-[2.5rem] p-8 relative overflow-hidden flex flex-col justify-between min-h-60 hover:shadow-xl transition-all cursor-pointer",
               bgColorClass // Dynamic Background
            )}
          >
            <div className="flex justify-between items-start z-10">
                <div className="bg-black/20 p-3 rounded-full backdrop-blur-sm">
                  <Trophy className="w-8 h-8 text-white" />
                </div>
                <ArrowRight className="w-6 h-6 text-white -rotate-45 group-hover:rotate-0 group-hover:scale-110 transition-all duration-300" />
            </div>
            <div className="z-10 mt-auto">
              <h3 className="text-2xl font-black text-white uppercase tracking-tight">Achievements</h3>
              <p className="text-white/80 mt-2 text-sm">Our members awards &rarr;</p>
            </div>
             <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay pointer-events-none" />
          </Link>
        </div>

      </main>
    </div>
  );
}