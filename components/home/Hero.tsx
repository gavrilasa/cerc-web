"use client";

import React, { useRef, useLayoutEffect } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
    AppWindow,
    Cpu,
    Network,
    Clapperboard,
    ArrowUpRight,
    FolderKanban,
    LucideIcon,
} from "lucide-react";
import { gsap } from "gsap";
import Image from "next/image";
import Link from "next/link";

// Icon and color map for divisions
const divisionConfig: Record<string, { icon: LucideIcon; bgColor: string; textColor: string; borderColor: string }> = {
    software: { icon: AppWindow, bgColor: "bg-blue-500/20", textColor: "text-blue-400", borderColor: "hover:border-blue-500/50" },
    networking: { icon: Network, bgColor: "bg-green-500/20", textColor: "text-green-400", borderColor: "hover:border-green-500/50" },
    network: { icon: Network, bgColor: "bg-green-500/20", textColor: "text-green-400", borderColor: "hover:border-green-500/50" },
    multimedia: { icon: Clapperboard, bgColor: "bg-pink-500/20", textColor: "text-pink-400", borderColor: "hover:border-pink-500/50" },
    embedded: { icon: Cpu, bgColor: "bg-orange-500/20", textColor: "text-orange-400", borderColor: "hover:border-orange-500/50" },
};

const defaultConfig = { icon: FolderKanban, bgColor: "bg-slate-500/20", textColor: "text-slate-400", borderColor: "hover:border-slate-500/50" };

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
    slug: string;
    projects: Project[];
    members: Member[];
    _count: {
        projects: number;
        members: number;
    };
}

interface HeroProps {
    members?: Member[];
    divisions?: Division[];
}

export function Hero({ members = [], divisions = [] }: HeroProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                ".animate-hero",
                { y: 30, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.6,
                    stagger: 0.1,
                    ease: "power2.out",
                }
            );
        }, containerRef);

        return () => ctx.revert();
    }, []);

    // Get config for a division based on slug/title
    const getConfig = (division: Division) => {
        const key = division.slug?.toLowerCase() || division.title?.toLowerCase() || "";
        return divisionConfig[key] || defaultConfig;
    };

    return (
        <div ref={containerRef} className="w-full space-y-2 md:space-y-4 pt-12">
            {/* ========== HERO SECTION (Atomize Style) ========== */}
            <section className="container mx-auto px-4 text-center max-w-5xl">
                {/* Main Title */}
                <div className="inline-flex items-center gap-2 bg-muted border border-border px-3 py-1 rounded-full mb-6 shadow-sm">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                        COMPUTER ENGINEERING RESEARCH CLUB
                    </span>
                </div>
                <h1 className="animate-hero text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-foreground mb-6 leading-[1.05]">
                    The most advanced <br className="hidden md:block" />
                    <span className="relative">
                        Research Club
                        <Image
                            src="https://res.cloudinary.com/dah2v3xbg/image/upload/v1764017206/computer-icon-3d_yeqnwy.webp"
                            alt="3d icon"
                            height={60}
                            width={60}
                            className="hidden lg:inline-block absolute -right-16 top-0 rotate-12 hover:rotate-0 transition-transform duration-500"
                        />
                    </span>{" "}
                    for Creators
                </h1>

                {/* Sub-headline */}
                <p className="animate-hero text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
                    Pixel-perfect engineering and multi-disciplinary innovation mastering software, hardware, and networking.
                </p>

                {/* CTA Buttons */}
                <div className="animate-hero flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 md:mb-24">
                    <Button
                        variant="outline"
                        className="rounded-full h-14 px-8 border-border bg-background text-base font-semibold shadow-sm hover:bg-accent w-full sm:w-auto flex items-center gap-2"
                        asChild
                    >
                        <Link href="/divisions">
                            Explore Divisions <ArrowUpRight className="w-4 h-4 opacity-50" />
                        </Link>
                    </Button>
                    <Button
                        className="rounded-full h-14 px-10 bg-foreground text-background text-base font-semibold hover:opacity-90 w-full sm:w-auto"
                        asChild
                    >
                        <Link href="https://cerc-lms.vercel.app/dashboard">Join Our Community!</Link>
                    </Button>
                </div>
            </section>

            {/* ========== CORE DIVISIONS & INTERACTIVE PROJECTS ========== */}
            <section className="container mx-auto px-4 md:px-6 lg:px-8 pb-24">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 bg-[#0F0F0F] p-6 md:p-12 rounded-[3rem] md:rounded-[4rem] shadow-2xl border border-white/5">

                    {divisions.length > 0 ? (
                        // Render real divisions from database
                        divisions.slice(0, 4).map((division) => {
                            const config = getConfig(division);
                            const Icon = config.icon;

                            return (
                                <div
                                    key={division.id}
                                    className="animate-hero bg-white/[0.03] rounded-[2.5rem] p-8 md:p-10 border border-white/10 flex flex-col justify-between min-h-[480px] lg:min-h-[560px] group hover:bg-white/[0.06] transition-all duration-500"
                                >
                                    <div>
                                        <div className={`p-4 ${config.bgColor} rounded-2xl ${config.textColor} w-fit mb-6 group-hover:scale-110 transition-transform`}>
                                            <Icon size={32} />
                                        </div>
                                        <h3 className="text-3xl font-bold text-white leading-tight">{division.title}</h3>

                                        <div className="mt-8">
                                            <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-4">Latest Projects</p>
                                            <div className="space-y-3">
                                                {division.projects.length > 0 ? (
                                                    division.projects.map((project) => (
                                                        <Link
                                                            key={project.id}
                                                            href="/projects"
                                                            className={`flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 ${config.borderColor} transition-all group/item`}
                                                        >
                                                            <span className="text-sm text-white/60 group-hover/item:text-white transition-colors truncate mr-2">{project.title}</span>
                                                            <ArrowUpRight size={14} className={`text-white/20 group-hover/item:${config.textColor} group-hover/item:translate-x-0.5 group-hover/item:-translate-y-0.5 transition-all shrink-0`} />
                                                        </Link>
                                                    ))
                                                ) : (
                                                    <p className="text-sm text-white/30 italic">No projects yet</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-8 pt-6 border-t border-white/5 space-y-3">
                                        <div className="flex items-center justify-between">
                                            <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Members</p>
                                            <span className={`text-[10px] font-bold ${config.textColor} uppercase tracking-widest`}>
                                                {division._count.members} total
                                            </span>
                                        </div>
                                        <Link
                                            href="/members"
                                            className="flex items-center gap-1"
                                        >
                                            {division.members.length > 0 ? (
                                                <div className="flex -space-x-2">
                                                    {division.members.slice(0, 4).map((member, i) => (
                                                        <div
                                                            key={member.id}
                                                            className="relative w-8 h-8 rounded-full overflow-hidden bg-muted shrink-0 border-2 border-[#0F0F0F] hover:scale-110 transition-transform"
                                                            style={{ zIndex: 4 - i }}
                                                        >
                                                            {member.imageUrl ? (
                                                                <Image src={member.imageUrl} alt={member.name} fill sizes="32px" className="object-cover" />
                                                            ) : (
                                                                <div className={`w-full h-full ${config.bgColor} flex items-center justify-center ${config.textColor} font-bold text-xs`}>
                                                                    {member.name.charAt(0)}
                                                                </div>
                                                            )}
                                                        </div>
                                                    ))}
                                                    {division._count.members > 4 && (
                                                        <div className="relative w-8 h-8 rounded-full bg-white/10 shrink-0 border-2 border-[#0F0F0F] flex items-center justify-center">
                                                            <span className="text-[10px] text-white/60 font-bold">+{division._count.members - 4}</span>
                                                        </div>
                                                    )}
                                                </div>
                                            ) : (
                                                <p className="text-sm text-white/30 italic">No members yet</p>
                                            )}
                                        </Link>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        // Fallback: show placeholder cards if no divisions
                        <div className="col-span-full text-center py-12">
                            <p className="text-white/40">Loading divisions...</p>
                        </div>
                    )}

                </div>
            </section>
        </div>
    );
}