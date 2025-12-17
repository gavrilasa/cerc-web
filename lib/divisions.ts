import {
    AppWindow,
    Cpu,
    Globe,
    Network,
    Clapperboard,
    ShieldCheck,
    Brain,
    Wifi,
    LucideIcon,
    Trophy,
    Award,
  } from "lucide-react";
  
  export interface Project {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    tags: string[];
  }
  
  export interface Member {
    id: string;
    name: string;
    role: string;
    imageUrl: string;
    github?: string;
    linkedin?: string;
  }

  export interface Achievement {
    id: string;
    title: string;
    date: string;
    description: string;
    issuer: string;
    winner: string; // New: Winner name
    imageUrl: string; // Made required for better UI, or handle fallback
  }
  
  export interface DivisionData {
    slug: string;
    title: string;
    icon: LucideIcon;
    description: string;
    longDescription: string;
    colorClass: string; // Tailwind color class for accents
    stats: { label: string; value: string }[];
    technologies: string[];
    projects: Project[];
    members: Member[];
    achievements: Achievement[];
  }