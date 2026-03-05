"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Map, Send, BarChart3, Trophy, Laptop, CheckCircle2 } from "lucide-react";

/**
 * Data fitur disesuaikan dengan fungsi utama sistem CERC LMS.
 */
const features = [
    {
        title: "Integrated Roadmap",
        desc: "Follow a structured, step-by-step curriculum to unlock and master new technologies.",
        points: ["Structured Learning Path", "Module-based Progress", "Certification Ready"],
        icon: <Map className="text-blue-500" />,
        image: "/images/rmap.png",
        gridClass: "md:col-span-2 md:row-span-2",
        glowColor: "rgba(59, 130, 246, 0.4)",
    },
    {
        title: "Project Submissions",
        desc: "Submit your tasks or independent projects for points and validation.",
        icon: <Send className="text-green-500" />,
        image: "/images/submission.png",
        gridClass: "md:col-span-2",
        glowColor: "rgba(34, 197, 94, 0.4)",
    },
    {
        title: "Progress Tracking",
        desc: "Monitor points and learning stats in one centralized dashboard.",
        icon: <BarChart3 className="text-orange-500" />,
        image: "/images/dsb.png",
        gridClass: "md:col-span-1",
        glowColor: "rgba(249, 115, 22, 0.4)",
    },
    {
        title: "Global Leaderboard",
        desc: "Compete and climb the global ranks.",
        icon: <Trophy className="text-pink-500" />,
        image: "/images/ldb.png",
        gridClass: "md:col-span-1",
        glowColor: "rgba(236, 72, 153, 0.4)",
    },
];

export function LMSSection() {
    return (
        <section className="py-16 md:py-20 bg-background relative">
            <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">

                {/* ========== CENTERED HEADLINE (cohesive but distinct from CoreIdentity) ========== */}
                <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 bg-primary/10 dark:bg-primary/20 border border-primary/20 px-4 py-1.5 rounded-full mb-6">
                        <span className="text-xs font-bold uppercase tracking-widest text-primary">
                            Our Product
                        </span>
                    </div>

                    {/* Main Title */}
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] text-neutral-900 dark:text-white mb-4">
                        The CERC <span className="text-primary">LMS</span> Ecosystem
                    </h2>

                    {/* Subtitle */}
                    <p className="text-lg md:text-xl text-neutral-500 dark:text-neutral-400 leading-relaxed max-w-2xl mx-auto">
                        A custom-built platform to guide members through structured learning paths, project submissions, and competitive growth.
                    </p>
                </div>

                {/* ========== BENTO PRODUCT SHOWCASE GRID ========== */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[340px] md:auto-rows-[400px]">
                    {features.map((item, idx) => (
                        <div
                            key={idx}
                            // FORCED DARK STYLES: bg-zinc-950 and border-white/10
                            className={`relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-zinc-950 group transition-all duration-500 ${item.gridClass}`}
                            style={{ '--glow': item.glowColor } as React.CSSProperties}
                        >
                            {/* === GRADIENT BACKGROUND (Behind Image) === */}
                            <div
                                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-0"
                                style={{
                                    background: `radial-gradient(circle at 50% 100%, ${item.glowColor} 0%, transparent 75%)`
                                }}
                            />

                            <div className="p-8 md:p-10 h-full flex flex-col relative z-20">
                                {/* Aligned Header - Forced White and Zinc text colors */}
                                <div className="flex flex-col items-start gap-4">
                                    <div className="p-3 bg-white/5 rounded-2xl border border-white/10 group-hover:scale-110 transition-transform duration-500 shadow-sm">
                                        {item.icon}
                                    </div>
                                    <div className="space-y-1">
                                        <h3 className="text-2xl font-bold text-white tracking-tight">{item.title}</h3>
                                        <p className="text-sm font-medium text-zinc-400 leading-relaxed max-w-[260px]">
                                            {item.desc}
                                        </p>
                                    </div>

                                    {item.points && (
                                        <div className="hidden md:flex flex-col gap-2 pt-4">
                                            {item.points.map(p => (
                                                <div key={p} className="flex items-center gap-2 text-[10px] text-zinc-500 font-bold uppercase tracking-wider">
                                                    <CheckCircle2 size={12} className="text-primary/50" />
                                                    {p}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* 3D Image Area: Perspective & Aligned bottom */}
                                <div className="absolute -bottom-6 left-0 right-0 h-[45%] md:h-[50%] w-full translate-y-8 group-hover:translate-y-2 transition-transform duration-700 ease-out z-10">
                                    <div className="relative w-[90%] mx-auto h-full rounded-t-3xl overflow-hidden border border-white/10 border-b-0 shadow-2xl bg-black/40 [transform:perspective(1200px)_rotateX(8deg)] group-hover:[transform:perspective(1200px)_rotateX(2deg)] transition-all duration-700">
                                        <Image
                                            src={item.image}
                                            alt={item.title}
                                            fill
                                            className="object-cover object-top opacity-70 group-hover:opacity-100 transition-opacity duration-700"
                                            onError={(e) => (e.currentTarget.style.display = 'none')}
                                        />
                                        {/* Masking gradient internal to blend with dark card base */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent z-10" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* ========== ACTION FOOTER ==========
                <div className="mt-16 text-center">
                    <Button size="lg" className="rounded-full h-14 px-10 font-bold shadow-xl transition-all hover:scale-105" asChild>
                        <Link href="https://cerc-lms.vercel.app" target="_blank">
                            Get Started <ArrowUpRight size={20} className="ml-2" />
                        </Link>
                    </Button>
                </div> */}
            </div>
        </section>
    );
}