"use client";

import Link from "next/link";
import { ArrowRight, Github, Linkedin, Instagram, Mail } from "lucide-react";

export function CTASection() {
    const currentYear = new Date().getFullYear();

    const navigation = [
        { label: "About", href: "/" },
        { label: "Divisions", href: "/divisions" },
        { label: "Projects", href: "/projects" },
    ];

    const services = [
        { label: "Web Development", href: "#" },
        { label: "Network Engineering", href: "#" },
        { label: "Hardware Projects", href: "#" },
    ];

    const socials = [
        { icon: Github, href: "https://github.com/cerc-undip", label: "GitHub" },
        { icon: Linkedin, href: "#", label: "LinkedIn" },
        { icon: Instagram, href: "https://instagram.com/cercundip", label: "Instagram" },
        { icon: Mail, href: "mailto:cerc@undip.ac.id", label: "Email" },
    ];

    return (
        <section className="bg-background">
            <div className="container mx-auto px-4 md:px-6 lg:px-8">
                <div className="bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white rounded-t-[2rem] md:rounded-t-[2.5rem] overflow-hidden">
                    <div className="px-6 md:px-12 lg:px-16">

                        {/* ========== CTA HERO ========== */}
                        <div className="py-16 md:py-20 lg:py-24 text-center">
                            {/* Headline - matching website bold style */}
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-4">
                                Let's Build
                            </h2>
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-8 text-neutral-400 dark:text-neutral-500">
                                Something Together
                            </h2>

                            {/* CTA Button */}
                            <Link
                                href="mailto:cerc@undip.ac.id"
                                className="inline-flex items-center gap-3 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 px-8 py-4 rounded-full font-bold text-sm hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-colors"
                            >
                                Get in Touch
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>

                        {/* ========== FOOTER GRID ========== */}
                        <div className="py-10 md:py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 border-b border-neutral-200 dark:border-white/10">

                            {/* Brand */}
                            <div>
                                <h3 className="text-lg font-bold mb-4">CERC</h3>
                                <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
                                    Building innovative solutions that solve real-world problems with precision and modern technology.
                                </p>
                            </div>

                            {/* Navigation */}
                            <div>
                                <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400 dark:text-neutral-500 mb-4">Navigation</h4>
                                <ul className="space-y-3">
                                    {navigation.map((link) => (
                                        <li key={link.href}>
                                            <Link
                                                href={link.href}
                                                className="text-sm text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition-colors"
                                            >
                                                {link.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Services */}
                            <div>
                                <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400 dark:text-neutral-500 mb-4">Divisions</h4>
                                <ul className="space-y-3">
                                    {services.map((link) => (
                                        <li key={link.label}>
                                            <Link
                                                href={link.href}
                                                className="text-sm text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition-colors"
                                            >
                                                {link.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Contact */}
                            <div>
                                <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400 dark:text-neutral-500 mb-4">Contact</h4>
                                <div className="space-y-3 text-sm text-neutral-600 dark:text-neutral-300">
                                    <p>cerc@undip.ac.id</p>
                                    <p>Semarang, Indonesia</p>
                                </div>
                            </div>
                        </div>

                        {/* ========== BOTTOM BAR ========== */}
                        <div className="py-5 flex flex-col md:flex-row justify-between items-center gap-4">
                            <p className="text-xs text-neutral-400 dark:text-neutral-500">
                                © {currentYear} CERC Undip. All rights reserved.
                            </p>
                            <div className="flex items-center gap-4">
                                {socials.map((social) => (
                                    <Link
                                        key={social.label}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-neutral-400 dark:text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors"
                                        aria-label={social.label}
                                    >
                                        <social.icon className="w-5 h-5" />
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
