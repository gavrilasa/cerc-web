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
} from "lucide-react";
import { gsap } from "gsap";
import Image from "next/image";

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

import { Globe } from "lucide-react";

const USER_IMAGES = [1, 2, 3, 4].map((i) => ({
    id: i,
    src: `https://randomuser.me/api/portraits/thumb/men/${20 + i}.jpg`,
}));

export function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                ".bento-card",
                { y: 20, opacity: 0, scale: 0.9 },
                {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 0.6,
                    stagger: 0.1,
                    ease: "power2.out",
                }
            );
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="w-full">
            <div className="container mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
                    {/* Top Left Card - Intro */}
                    <div className="group bento-card lg:col-span-3 bg-neutral-900 dark:bg-neutral-100 rounded-[2.5rem] p-8 md:p-12 flex flex-col justify-between relative overflow-hidden text-neutral-100 dark:text-neutral-900 shadow-sm">
                        <div className="flex items-center gap-4 mb-2">
                            <Image
                                src={
                                    "https://res.cloudinary.com/dah2v3xbg/image/upload/v1764013541/Logo-CERC-presspadding_r027nm.png"
                                }
                                alt="CERC Logo"
                                width={56}
                                height={45}
                                className="object-cover"
                            />
                            <span className="text-xs font-bold tracking-widest uppercase text-neutral-500">
                                Who Are We?
                            </span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-none uppercase z-10">
                            Computer
                            <Image
                                src={
                                    "https://res.cloudinary.com/dah2v3xbg/image/upload/v1764017206/computer-icon-3d_yeqnwy.webp"
                                }
                                alt="computer mini icon 3d"
                                height={90}
                                width={90}
                                className="hidden md:inline-block ml-2 -mt-8 rotate-6 group-hover:rotate-1 transition-all"
                            />
                            <br />
                            Engineering <br />
                            Research Club
                        </h1>

                        <div className="flex flex-row gap-6 items-center mt-8 z-10">
                            <Button className="rounded-full h-14 px-8 text-base bg-neutral-100 text-neutral-900 dark:bg-neutral-900 dark:text-white transition-transform active:scale-95 hover:bg-neutral-200 dark:hover:bg-neutral-800">
                                Learn More
                            </Button>

                            <div className="flex items-center gap-1 md:gap-3">
                                <div className="w-10 h-10 rounded-full border-2 border-neutral-100 dark:border-neutral-900 flex items-center justify-center">
                                    <Activity className="w-5 h-5" />
                                </div>
                                <p className="text-xs font-semibold leading-tight opacity-80">
                                    THINK PRECISELY, <br /> BUILD WISELY
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Top Right Card - 3D Visual */}
                    <div className="bento-card lg:col-span-2 bg-[#1c1c1e] rounded-[2.5rem] relative overflow-hidden min-h-[400px] shadow-sm group border border-neutral-800">
                        <Image
                            src="https://res.cloudinary.com/dah2v3xbg/image/upload/v1764013090/img_-_boxxy_lnhu7h.svg"
                            fill
                            priority
                            sizes="(max-width: 1024px) 100vw, 40vw"
                            alt="3d computer illustration"
                            className="object-cover object-bottom transition-transform duration-700 group-hover:scale-105"
                        />

                        <div className="absolute top-8 right-8">
                            <div className="w-3 h-3 rounded-full bg-neutral-500 animate-pulse" />
                        </div>
                        <div className="absolute bottom-8 right-8">
                            <p className="text-neutral-200 text-md font-mono">
                                System Status: <span className="text-blue-500">Online</span>
                            </p>
                        </div>
                    </div>

                    {/* Bottom Left Card - Stats & Tags */}
                    <div className="bento-card lg:col-span-2 bg-[#3d3d42] rounded-[2.5rem] p-8 flex flex-col justify-between shadow-sm text-neutral-100">
                        <div className="flex justify-between items-start">
                            <div>
                                <h2 className="text-7xl font-black tracking-tighter text-white">
                                    10+
                                </h2>
                                <p className="text-sm font-bold text-white pl-1 mt-1 uppercase tracking-wide">
                                    Research Subjects
                                </p>
                            </div>
                            <div className="flex -space-x-3">
                                {USER_IMAGES.map((user) => (
                                    <div
                                        key={user.id}
                                        className="relative w-12 h-12 rounded-full border-2 border-white overflow-hidden"
                                    >
                                        <Image
                                            src={user.src}
                                            alt="Member"
                                            fill
                                            sizes="48px"
                                            className="object-cover"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-2 mt-8">
                            {RESEARCH_TAGS.map((tag, i) => (
                                <span
                                    key={i}
                                    className="inline-flex items-center gap-1 px-3 py-2 rounded-full border border-white text-white text-[10px] font-bold uppercase transition-colors cursor-default backdrop-blur-sm"
                                >
                                    {tag.icon && <tag.icon className="w-3 h-3" />}
                                    {tag.label}
                                </span>
                            ))}
                            <span className="inline-flex items-center gap-1 px-3 py-2 rounded-full text-sm font-bold uppercase text-white">
                                And many more
                            </span>
                        </div>
                    </div>

                    {/* Bottom Right Card - Collaboration (Updated Styling to Match Top Left) */}
                    <div className="bento-card lg:col-span-3 bg-neutral-900 dark:bg-neutral-100 rounded-[2.5rem] p-6 md:p-8 flex flex-col md:flex-row gap-6 items-center shadow-sm relative overflow-hidden text-neutral-100 dark:text-neutral-900">
                        <div className="w-full md:w-1/3 aspect-square md:aspect-auto md:h-full rounded-2xl overflow-hidden relative min-h-[200px]">
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
                                <div className="bg-white/10 dark:bg-black/10 p-2 rounded-full backdrop-blur-sm">
                                    <PieChart className="w-5 h-5 text-neutral-100 dark:text-neutral-900" />
                                </div>
                                <span className="text-xs font-medium uppercase tracking-wider opacity-80 text-neutral-400 dark:text-neutral-600">
                                    Research & Budget
                                </span>
                            </div>

                            <h3 className="text-3xl md:text-5xl font-extrabold leading-none tracking-tighter font-mono max-w-lg">
                                OPEN TO COLLAB <br /> AND PARTNERSHIP
                            </h3>

                            <div className="pt-4">
                                <button className="text-xs font-bold uppercase tracking-widest border-b border-neutral-100/40 dark:border-neutral-900/40 pb-1 hover:border-neutral-100 dark:hover:border-neutral-900 transition-colors">
                                    Explore Our Member & Projects
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}