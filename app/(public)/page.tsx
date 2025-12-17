"use client";

import { useState, useEffect } from "react";
import { Hero } from "@/components/home/Hero";
import Intro from "@/components/Intro";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ExternalLink } from "lucide-react";
import { divisions } from "@/data/data"; // Updated import path

export default function HomePage() {
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

  if (isChecking) return null;

  // Convert the divisions object into an array for mapping
  const allDivisions = Object.values(divisions);
  
  // Split data for left and right columns
  const leftColumnDivisions = allDivisions.slice(0, 2);
  const rightColumnDivisions = allDivisions.slice(2, 4);

  // Updated DivisionCard to use the dynamic data structure from data.tsx
  const DivisionCard = ({ item }: { item: (typeof allDivisions)[0] }) => (
    <Link
      href={`/divisions/${item.slug}`}
      className="group flex-1 bg-neutral-100 dark:bg-neutral-900 border border-transparent hover:border-border rounded-[2.5rem] p-8 flex flex-col justify-between transition-all hover:shadow-lg hover:-translate-y-1 relative overflow-hidden"
    >
      <div className="relative z-10 flex flex-col h-full">
        {/* Header: Title and Icon */}
        <div className="flex justify-between items-start mb-4 gap-4">
           <h3 className="text-2xl font-black uppercase tracking-tight leading-none group-hover:underline decoration-2 underline-offset-4">
            {item.title}
          </h3>
          <item.icon className="w-8 h-8 text-neutral-300 dark:text-neutral-700 group-hover:text-foreground dark:group-hover:text-white transition-colors shrink-0" />
        </div>
       
        {/* Description */}
        <p className="text-muted-foreground font-medium leading-relaxed mb-8 line-clamp-3">
          {item.description}
        </p>

        <div className="mt-auto space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-3">
                {item.stats.map((stat, idx) => (
                    <div key={idx} className="bg-background/40 dark:bg-black/20 rounded-xl p-3 border border-transparent group-hover:border-border/50 transition-colors">
                        <p className="text-2xl font-bold leading-none mb-1 text-foreground">{stat.value}</p>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{stat.label}</p>
                    </div>
                ))}
            </div>

            {/* Tech Tags */}
            <div className="flex flex-wrap gap-2">
                {item.technologies.slice(0, 3).map(tech => (
                    <span key={tech} className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-white dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 border border-neutral-100 dark:border-neutral-700">
                        {tech}
                    </span>
                ))}
                {item.technologies.length > 3 && (
                    <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-transparent text-muted-foreground border border-transparent">
                        +{item.technologies.length - 3} more
                    </span>
                )}
            </div>
        </div>
      </div>
      
      {/* Hover Arrow Effect */}
      <div className="absolute bottom-8 right-8 flex justify-end opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
        <ArrowRight className="w-6 h-6 text-foreground" />
      </div>
    </Link>
  );

  return (
    <div className="w-full min-h-screen bg-background flex flex-col overflow-hidden">
      {showSplash ? (
        <Intro onFinish={handleFinish} />
      ) : (
        <>
          <main className="flex-1 w-full animate-in fade-in duration-1000 slide-in-from-bottom-4 px-4 py-2 md:py-4 space-y-12">
            {/* 1. HERO SECTION */}
            <Hero />

            {/* 2. CORE PILLARS SECTION (Bento Grid) */}
            <section className="container mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-auto lg:h-[700px]"> 
                
                {/* Left Column */}
                <div className="flex flex-col gap-4 h-full order-2 lg:order-1 font-mono">
                  {leftColumnDivisions.map((item) => (
                    <DivisionCard key={item.slug} item={item} />
                  ))}
                </div>

                {/* Middle Column - Main Statement */}
                <div className="lg:col-span-1 order-1 lg:order-2 h-full bg-neutral-900 dark:bg-neutral-100 rounded-[2.5rem] p-8 md:p-12 flex flex-col items-center justify-center text-center text-neutral-100 dark:text-neutral-900 shadow-sm border border-transparent hover:border-neutral-700 dark:hover:border-neutral-300 transition-all duration-300 hover:shadow-lg">
                  {/* Logo */}
                  <div className="w-20 h-20 bg-white/10 dark:bg-black/5 rounded-3xl flex items-center justify-center mb-8 backdrop-blur-sm">
                    <Image
                      src="https://res.cloudinary.com/dah2v3xbg/image/upload/v1764013541/Logo-CERC-presspadding_r027nm.png"
                      alt="CERC Logo"
                      width={40}
                      height={40}
                      className="object-contain"
                    />
                  </div>

                  {/* Title */}
                  <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-none mb-6">
                    Our Core <br /> Pillars
                  </h2>

                  {/* Desc */}
                  <p className="text-lg text-neutral-400 dark:text-neutral-600 font-medium leading-relaxed max-w-[280px] mb-8">
                    Four specialized divisions mastering the foundations of
                    modern computing.
                  </p>

                  {/* Footer Motto */}
                  <div className="inline-flex flex-col items-center gap-2 mt-2 pt-8 border-t border-white/20 dark:border-black/20">
                    <span className="text-md font-mono uppercase tracking-widest opacity-70">
                      Our Motto
                    </span>
                    <span className="font-bold text-sm tracking-wider">
                      THINK PRECISELY, BUILD WISELY.
                    </span>
                  </div>
                </div>

                {/* Right Column */}
                <div className="flex flex-col gap-4 h-full order-3 font-mono">
                  {rightColumnDivisions.map((item) => (
                    <DivisionCard key={item.slug} item={item} />
                  ))}
                </div>
              </div>
            </section>

            {/* 3. FEATURED PROJECT */}
            <section className="container mx-auto mt-8">
              <div className="relative bg-neutral-900 dark:bg-neutral-100 rounded-[2.5rem] p-8 md:p-12 overflow-hidden group text-white dark:text-neutral-900 shadow-sm">
                {/* Background Image Effect */}
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=2400&auto=format&fit=crop')] bg-cover bg-center opacity-30 group-hover:opacity-40 transition-opacity scale-105 group-hover:scale-100 duration-1000" />
                <div className="absolute inset-0 bg-linear-to-r from-black via-black/90 to-transparent dark:from-white dark:via-white/90" />

                <div className="relative z-10 flex flex-col lg:flex-row gap-12 items-center justify-between h-full">
                  <div className="max-w-2xl space-y-6">
                    <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">
                      Learning Management System (LMS) CERC
                    </h2>
                    <p className="text-lg md:text-xl text-neutral-300 dark:text-neutral-600 leading-relaxed font-medium">
                      An open-source initiative creating a unified dashboard for
                      Learning Management System for Computer Engineering Students
                      to learn for their specialization of choice.
                    </p>
                    <div className="flex flex-wrap gap-4 pt-4">
                      <Link href={""}>
                      <Button
                        size="lg"
                        className="rounded-full h-14 px-8 font-bold text-base bg-white text-black hover:bg-neutral-200 dark:bg-black dark:text-white"
                      >
                        View Case Study <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                      </Link>
                      <Link href={"https://github.com/gavrilasa/cerc-lms"}>
                      <Button
                        variant="outline"
                        size="lg"
                        className="rounded-full h-14 px-8 font-bold text-base bg-transparent border-white/20 text-white hover:bg-white/10 dark:border-black/20 dark:text-black dark:hover:bg-black/10"
                      >
                        GitHub Repo <ExternalLink className="ml-2 w-4 h-4" />
                      </Button>
                      </Link>
                    </div>
                  </div>

                  {/* Floating Mockup */}
                  <div className="hidden lg:block flex-1 relative w-full max-w-md aspect-square">
                    <div className="absolute inset-0 bg-linear-to-tr from-gray-500 to-blue-500 rounded-3xl rotate-6 opacity-50 blur-2xl animate-pulse" />
                    <Image
                      src="/mockup.png"
                      alt="Dashboard Mockup"
                      fill
                      className="object-contain relative z-10"
                    />
                  </div>
                </div>
              </div>
            </section>
          </main>
        </>
      )}
    </div>
  );
}