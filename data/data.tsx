import React from "react";
import {
  Globe, Server, Database, Shield, Terminal, Route, Cpu, Wifi,
  Layers, Box, Layout, Clapperboard, LucideIcon, AppWindow,
  ShieldCheck, Brain, Trophy, Award, Network
} from "lucide-react";
import {
  SiReact, SiNextdotjs, SiTypescript, SiNodedotjs, SiPostgresql,
  SiDocker, SiPython, SiCisco, SiWireshark, SiLinux, SiAnsible,
  SiC, SiCplusplus, SiArduino, SiRaspberrypi, SiStmicroelectronics,
  SiFigma, SiBlender, SiAdobecreativecloud, SiUnity, SiUnrealengine
} from "react-icons/si";

// --- EXISTING TYPES ---
export type FocusAreaItem = {
  icon: LucideIcon;
  title: string;
  desc: string;
};

export type TechLogoItem = {
  node: React.ReactNode;
  title: string;
  href: string;
};

export type DivisionDataProps = {
  focusAreas: FocusAreaItem[];
  techLogos: TechLogoItem[];
};

// --- NEW TYPES (Moved from lib/divisions.ts) ---
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
  winner: string;
  imageUrl: string;
}

export interface DivisionData {
  slug: string;
  title: string;
  icon: LucideIcon;
  description: string;
  longDescription: string;
  colorClass: string;
  stats: { label: string; value: string }[];
  technologies: string[];
  projects: Project[];
  members: Member[];
  achievements: Achievement[];
}

// --- EXISTING DATA (Focus Areas & Tech Logos) ---
const softwareData: DivisionDataProps = {
  focusAreas: [
    { icon: Globe, title: "Full-Stack Web", desc: "Building scalable web apps with Next.js and React." },
    { icon: Server, title: "Microservices", desc: "Designing resilient, distributed backend systems." },
    { icon: Database, title: "Data Engineering", desc: "Optimizing schemas and high-performance data flows." },
  ],
  techLogos: [
    { node: <SiReact className="text-[#61DAFB]" />, title: "React", href: "https://react.dev" },
    { node: <SiNextdotjs className="text-black dark:text-white" />, title: "Next.js", href: "https://nextjs.org" },
    { node: <SiTypescript className="text-[#3178C6]" />, title: "TypeScript", href: "https://www.typescriptlang.org" },
    { node: <SiNodedotjs className="text-[#339933]" />, title: "Node.js", href: "https://nodejs.org" },
    { node: <SiPostgresql className="text-[#4169E1]" />, title: "PostgreSQL", href: "https://www.postgresql.org" },
    { node: <SiDocker className="text-[#2496ED]" />, title: "Docker", href: "https://www.docker.com" },
  ],
};

const networkData: DivisionDataProps = {
  focusAreas: [
    { icon: Route, title: "Network Topology", desc: "Designing robust LAN/WAN infrastructures using OSPF & BGP." },
    { icon: Shield, title: "Cybersecurity", desc: "Implementing firewalls, VPNs, and intrusion detection." },
    { icon: Terminal, title: "Automation", desc: "Automating device config with Python and Ansible." },
  ],
  techLogos: [
    { node: <SiCisco className="text-[#1BA0D7]" />, title: "Cisco", href: "https://www.cisco.com" },
    { node: <SiPython className="text-[#3776AB]" />, title: "Python", href: "https://www.python.org" },
    { node: <SiWireshark className="text-[#1679A7]" />, title: "Wireshark", href: "https://www.wireshark.org" },
    { node: <SiLinux className="text-black dark:text-white" />, title: "Linux", href: "https://www.linux.org" },
    { node: <SiAnsible className="text-[#EE0000]" />, title: "Ansible", href: "https://www.ansible.com" },
  ],
};

const embeddedData: DivisionDataProps = {
  focusAreas: [
    { icon: Cpu, title: "Firmware Dev", desc: "Low-level coding for microcontrollers and RTOS." },
    { icon: Wifi, title: "IoT Solutions", desc: "Integrating sensors and wireless protocols (MQTT)." },
    { icon: Layers, title: "PCB Design", desc: "Creating custom schematics and hardware boards." },
  ],
  techLogos: [
    { node: <SiC className="text-[#A8B9CC]" />, title: "C", href: "https://en.cppreference.com/w/c" },
    { node: <SiCplusplus className="text-[#00599C]" />, title: "C++", href: "https://isocpp.org" },
    { node: <SiArduino className="text-[#00979D]" />, title: "Arduino", href: "https://www.arduino.cc" },
    { node: <SiStmicroelectronics className="text-[#03234B]" />, title: "STM32", href: "https://www.st.com" },
    { node: <SiRaspberrypi className="text-[#C51A4A]" />, title: "Raspberry Pi", href: "https://www.raspberrypi.org" },
  ],
};

const multimediaData: DivisionDataProps = {
  focusAreas: [
    { icon: Box, title: "3D Modeling", desc: "High-fidelity assets for games and simulations." },
    { icon: Layout, title: "UI/UX Design", desc: "Prototyping intuitive interfaces and user research." },
    { icon: Clapperboard, title: "Motion Graphics", desc: "Visual effects and interactive media installations." },
  ],
  techLogos: [
    { node: <SiFigma className="text-[#F24E1E]" />, title: "Figma", href: "https://www.figma.com" },
    { node: <SiBlender className="text-[#E87D0D]" />, title: "Blender", href: "https://www.blender.org" },
    { node: <SiAdobecreativecloud className="text-[#DA1F26]" />, title: "Adobe CC", href: "https://www.adobe.com" },
    { node: <SiUnity className="text-black dark:text-white" />, title: "Unity", href: "https://unity.com" },
    { node: <SiUnrealengine className="text-black dark:text-white" />, title: "Unreal", href: "https://www.unrealengine.com" },
  ],
};

// --- NEW DATA (Moved from lib/divisions.ts) ---
export const divisions: Record<string, DivisionData> = {
  software: {
    slug: "software",
    title: "Software",
    icon: AppWindow,
    description: "Building robust applications and systems.",
    longDescription:
      "Our Software Engineering division focuses on the full development lifecycle, from algorithmic problem solving to building scalable web and mobile applications. We explore modern stacks, cloud computing, and software architecture.",
    colorClass: "bg-blue-600",
    stats: [
      { label: "Active Projects", value: "12+" },
      { label: "Workshops", value: "8" },
    ],
    technologies: ["React", "Next.js", "TypeScript", "Docker", "PostgreSQL", "Flutter", "Go"],
    projects: [
      {
        id: "1",
        title: "CERC Web Portal",
        description: "The official landing page and portal for the club.",
        imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop",
        tags: ["Next.js", "React", "Tailwind"],
      },
    ],
    members: [
      {
        id: "1",
        name: "Alex Johnson",
        role: "Head of Software",
        imageUrl: "https://randomuser.me/api/portraits/men/32.jpg",
      },
    ],
    achievements: [
      {
        id: "1",
        title: "1st Place Hackfest 2024",
        date: "Nov 2024",
        description: "Winner of the national hackathon category for Fintech Innovation.",
        issuer: "GDG Indonesia",
        winner: "Team CERC-Flow",
        imageUrl: "https://images.unsplash.com/photo-1569429760207-e3d5006bd14d?q=80&w=3200&auto=format&fit=crop"
      },
      {
        id: "2",
        title: "Finalist Gemastik XVI",
        date: "Oct 2023",
        description: "Top 10 finalist in Software Development category.",
        issuer: "Puspresnas",
        winner: "Team CodeWizards",
        imageUrl: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=2370&auto=format&fit=crop"
      }
    ]
  },
  network: {
    slug: "network",
    title: "Network & Security",
    icon: Network,
    description: "Securing connections and managing infrastructure.",
    longDescription:
      "The Network division dives deep into infrastructure, cybersecurity, and cloud networking. We conduct penetration testing workshops, setup server infrastructures, and study modern communication protocols.",
    colorClass: "bg-emerald-600",
    stats: [
      { label: "CTF Wins", value: "5" },
      { label: "Servers Managed", value: "20+" },
    ],
    technologies: ["Cisco Packet Tracer", "Wireshark", "Linux", "Python", "Ansible", "Burp Suite", "Docker"],
    projects: [],
    members: [],
    achievements: [
      {
        id: "1",
        title: "Capture The Flag Winner",
        date: "Aug 2024",
        description: "Secured 1st place in the regional Cyber Defense competition.",
        issuer: "CyberAlliance",
        winner: "Sarah & Team",
        imageUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2670&auto=format&fit=crop"
      }
    ]
  },
  embedded: {
    slug: "embedded",
    title: "Embedded",
    icon: Cpu,
    description: "Bridging hardware and software.",
    longDescription:
      "From microcontrollers to complex IoT ecosystems, we build systems that interact with the physical world. Our focus ranges from Arduino/ESP32 projects to FPGA programming and robotics.",
    colorClass: "bg-orange-600",
    stats: [
      { label: "Robots Built", value: "7" },
      { label: "Hardware Hackathons", value: "3" },
    ],
    technologies: ["Arduino", "ESP32", "Raspberry Pi", "C++", "Python", "Altium", "ROS"],
    projects: [],
    members: [],
    achievements: [
      {
        id: "1",
        title: "Best Hardware Solution",
        date: "Dec 2023",
        description: "Awarded for the Smart Agriculture IoT system.",
        issuer: "IoT Makers Fair",
        winner: "Project GreenHouse",
        imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2370&auto=format&fit=crop"
      }
    ]
  },
  multimedia: {
    slug: "multimedia",
    title: "Multimedia",
    icon: Clapperboard,
    description: "Visualizing ideas and creating experiences.",
    longDescription:
      "The Multimedia team handles Game development assets and Content creation. We blend technology with art to create compelling user experiences and visual identities.",
    colorClass: "bg-purple-600",
    stats: [
      { label: "Designs Shipped", value: "50+" },
      { label: "Game Assets", value: "100+" },
    ],
    technologies: ["Figma", "Adobe After Effects", "Blender", "Unity", "DaVinci Resolve", "Spline"],
    projects: [],
    members: [],
    achievements: []
  },
};

// --- EXPORT WITH ALIASES ---
export const divisionSpecificData: Record<string, DivisionDataProps> = {
  // Software
  "software-engineering": softwareData,
  "software": softwareData,
  
  // Network
  "network-engineering": networkData,
  "network": networkData,
  
  // Embedded
  "embedded-systems": embeddedData,
  "embedded": embeddedData,
  
  // Multimedia
  "multimedia-creative": multimediaData,
  "multimedia": multimediaData,
  "creative": multimediaData,
};