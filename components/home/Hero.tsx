"use client";

import React, { useRef, useLayoutEffect } from "react";
import { Button } from "@/components/ui/button";
import {
    PieChart,
    Activity,
    AppWindow,
    Cpu,
    Wifi,
    Network,
    ShieldCheck,
    Clapperboard,
    Brain,
    Globe,
} from "lucide-react";
import { gsap } from "gsap";
import Image from "next/image";
import Link from "next/link";

const RESEARCH_TAGS = [
    { label: "SOFTWARE", icon: AppWindow },
    { label: "WEBSITE", icon: Globe },
    { label: "HARDWARE", icon: Cpu },
    { label: "IoT", icon: Wifi },
    { label: "NETWORK", icon: Network },
    { label: "SECURITY", icon: ShieldCheck },
    { label: "MULTIMEDIA", icon: Clapperboard },
    { label: "ARTIFICIAL INTELLIGENCE", icon: Brain },
] as const;

interface Member {
    id: string;
    name: string;
    role: string | null;
    imageUrl: string | null;
}

interface HeroProps {
    members?: Member[];
}

export function Hero({ members = [] }: HeroProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                ".bento-card",
                { y: 20, opacity: 0, scale: 0.95 },
                {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 0.5,
                    stagger: 0.08,
                    ease: "power2.out",
                }
            );
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="w-full">
            <div className="container mx-auto px-4 md:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
                    
                    {/* Top Left Card - Intro */}
                    <div className="group bento-card lg:col-span-3 bg-foreground dark:bg-foreground rounded-3xl p-6 md:p-8 lg:p-10 flex flex-col justify-between relative overflow-hidden text-background shadow-sm min-h-[360px] md:min-h-[400px]">
                        <div className="flex items-center gap-3 mb-4">
                            <Image
                                src="https://res.cloudinary.com/dah2v3xbg/image/upload/v1764013541/Logo-CERC-presspadding_r027nm.png"
                                alt="CERC Logo"
                                width={48}
                                height={48}
                                className="object-cover"
                            />
                            <span className="text-xs font-bold tracking-widest uppercase text-background/60 font-mono">
                                Who Are We?
                            </span>
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[0.95] uppercase z-10">
                            Computer
                            <Image
                                src="https://res.cloudinary.com/dah2v3xbg/image/upload/v1764017206/computer-icon-3d_yeqnwy.webp"
                                alt="computer mini icon 3d"
                                height={70}
                                width={70}
                                className="hidden md:inline-block ml-2 -mt-6 rotate-6 group-hover:rotate-1 transition-all"
                            />
                            <br />
                            Engineering <br />
                            Research Club
                        </h1>

                        <div className="flex flex-row gap-4 md:gap-6 items-center mt-6 z-10">
                            <Button 
                                className="rounded-full h-12 px-6 text-sm font-bold bg-background text-foreground hover:bg-background/90 transition-transform active:scale-95"
                                asChild
                            >
                                <Link href="/divisions">Learn More</Link>
                            </Button>

                            <div className="flex items-center gap-2">
                                <div className="w-9 h-9 rounded-full border-2 border-background/40 flex items-center justify-center">
                                    <Activity className="w-4 h-4" />
                                </div>
                                <p className="text-[10px] md:text-xs font-semibold leading-tight opacity-80">
                                    THINK PRECISELY, <br /> BUILD WISELY
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Top Right Card - 3D Visual */}
                    <div className="bento-card lg:col-span-2 bg-muted rounded-3xl relative overflow-hidden min-h-[280px] md:min-h-[400px] shadow-sm group border border-border">
                        {/* Light theme image */}
                        <Image
                            src="https://res.cloudinary.com/imagehandlers/image/upload/v1769092929/wmremove-transformed_2_1_nav6tz.png"
                            fill
                            priority
                            sizes="(max-width: 1024px) 100vw, 40vw"
                            alt="3d computer illustration"
                            className="object-contain object-center transition-transform duration-700 group-hover:scale-105 dark:hidden"
                        />
                        {/* Dark theme image */}
                        <Image
                            src="https://res.cloudinary.com/imagehandlers/image/upload/v1769092941/wmremove-transformed_2_2_aenkzo.png"
                            fill
                            priority
                            sizes="(max-width: 1024px) 100vw, 40vw"
                            alt="3d computer illustration"
                            className="object-contain object-center transition-transform duration-700 group-hover:scale-105 hidden dark:block"
                        />
                        <div className="absolute bottom-6 right-6">
                            <p className="text-foreground text-sm font-mono bg-background/80 backdrop-blur-sm px-3 py-1.5 rounded-full">
                                System Status: <span className="text-primary font-bold">Online</span>
                            </p>
                        </div>
                    </div>

                    {/* Bottom Left Card - Members Preview */}
                    <div className="bento-card lg:col-span-2 bg-muted rounded-3xl p-6 md:p-8 flex flex-col justify-between shadow-sm border border-border min-h-[280px]">
                        <div className="flex justify-between items-start gap-4">
                            <div>
                                <h2 className="text-5xl md:text-6xl font-black tracking-tighter text-foreground font-mono">
                                    {members.length > 0 ? `${members.length}+` : '10+'}
                                </h2>
                                <p className="text-xs font-bold text-muted-foreground mt-1 uppercase tracking-wide font-mono">
                                    Team Members
                                </p>
                            </div>
                            {/* Member Avatars */}
                            <div className="flex -space-x-2">
                                {members.slice(0, 4).map((member, i) => (
                                    <div
                                        key={member.id}
                                        className="relative w-10 h-10 rounded-full border-2 border-background overflow-hidden bg-muted"
                                        style={{ zIndex: 4 - i }}
                                    >
                                        {member.imageUrl ? (
                                            <Image
                                                src={member.imageUrl}
                                                alt={member.name}
                                                fill
                                                sizes="40px"
                                                className="object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">
                                                {member.name.charAt(0)}
                                            </div>
                                        )}
                                    </div>
                                ))}
                                {members.length === 0 && (
                                    // Fallback when no members
                                    [1, 2, 3, 4].map((i) => (
                                        <div
                                            key={i}
                                            className="relative w-10 h-10 rounded-full border-2 border-background overflow-hidden bg-primary/10"
                                            style={{ zIndex: 4 - i }}
                                        >
                                            <div className="w-full h-full flex items-center justify-center text-primary font-bold text-sm">
                                                ?
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>

                        {/* Member Cards Grid */}
                        {members.length > 0 ? (
                            <div className="grid grid-cols-2 gap-2 mt-6">
                                {members.slice(0, 4).map((member) => (
                                    <Link
                                        key={member.id}
                                        href="/members"
                                        className="flex items-center gap-2 p-2 rounded-xl bg-background/50 hover:bg-background border border-transparent hover:border-border transition-colors group"
                                    >
                                        <div className="relative w-8 h-8 rounded-full overflow-hidden bg-muted shrink-0">
                                            {member.imageUrl ? (
                                                <Image
                                                    src={member.imageUrl}
                                                    alt={member.name}
                                                    fill
                                                    sizes="32px"
                                                    className="object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xs">
                                                    {member.name.charAt(0)}
                                                </div>
                                            )}
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <p className="text-xs font-semibold text-foreground truncate group-hover:text-primary transition-colors">
                                                {member.name}
                                            </p>
                                            {member.role && (
                                                <p className="text-[10px] text-muted-foreground truncate">
                                                    {member.role}
                                                </p>
                                            )}
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-wrap gap-2 mt-6">
                                {RESEARCH_TAGS.slice(0, 6).map((tag, i) => (
                                    <span
                                        key={i}
                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border bg-background/50 text-foreground text-[10px] font-bold uppercase transition-colors cursor-default hover:bg-primary/10 hover:border-primary/30 font-mono"
                                    >
                                        {tag.icon && <tag.icon className="w-3 h-3" />}
                                        {tag.label}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Bottom Right Card - Collaboration */}
                    <div className="bento-card lg:col-span-3 bg-foreground dark:bg-foreground rounded-3xl p-6 md:p-8 flex flex-col md:flex-row gap-6 items-center shadow-sm relative overflow-hidden text-background min-h-[280px]">
                        <div className="w-full md:w-1/3 aspect-square md:aspect-auto md:h-full rounded-2xl overflow-hidden relative min-h-[160px] md:min-h-[200px]">
                            <Image
                                src="https://res.cloudinary.com/dah2v3xbg/image/upload/v1764014879/LoneWolfImage_xoy6v5.png"
                                alt="Collaboration"
                                className="object-cover"
                                fill
                                sizes="(max-width: 768px) 100vw, 33vw"
                            />
                        </div>

                        <div className="flex-1 flex flex-col justify-between h-full space-y-4 py-2">
                            <div className="flex items-center w-full gap-2">
                                <div className="bg-background/10 p-2 rounded-full backdrop-blur-sm">
                                    <PieChart className="w-4 h-4" />
                                </div>
                                <span className="text-xs font-medium uppercase tracking-wider text-background/60 font-mono">
                                    Research & Innovation
                                </span>
                            </div>

                            <h3 className="text-2xl md:text-4xl font-extrabold leading-none tracking-tighter font-mono max-w-lg">
                                OPEN TO COLLAB <br /> AND PARTNERSHIP
                            </h3>

                            <div className="pt-2">
                                <Link 
                                    href="/projects"
                                    className="text-xs font-bold uppercase tracking-widest border-b border-background/40 pb-1 hover:border-background transition-colors inline-block"
                                >
                                    Explore Our Projects
                                </Link>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        </section>
    );
}