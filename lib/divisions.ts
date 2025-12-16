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
  
  export interface DivisionData {
    slug: string;
    title: string;
    icon: LucideIcon;
    description: string;
    longDescription: string;
    colorClass: string; // Tailwind color class for accents
    stats: { label: string; value: string }[];
    projects: Project[];
    members: Member[];
  }
  
  export const divisions: Record<string, DivisionData> = {
    software: {
      slug: "software",
      title: "Software Engineering",
      icon: AppWindow,
      description: "Building robust applications and systems.",
      longDescription:
        "Our Software Engineering division focuses on the full development lifecycle, from algorithmic problem solving to building scalable web and mobile applications. We explore modern stacks, cloud computing, and software architecture.",
      colorClass: "bg-blue-600",
      stats: [
        { label: "Active Projects", value: "12+" },
        { label: "Workshops", value: "8" },
      ],
      projects: [
        {
          id: "1",
          title: "CERC Web Portal",
          description: "The official landing page and portal for the club.",
          imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop",
          tags: ["Next.js", "React", "Tailwind"],
        },
        // Add more projects...
      ],
      members: [
        {
          id: "1",
          name: "Alex Johnson",
          role: "Head of Software",
          imageUrl: "https://randomuser.me/api/portraits/men/32.jpg",
        },
         // Add more members...
      ],
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
      projects: [],
      members: [],
    },
    embedded: {
      slug: "embedded",
      title: "Embedded & IoT",
      icon: Cpu,
      description: "Bridging hardware and software.",
      longDescription:
        "From microcontrollers to complex IoT ecosystems, we build systems that interact with the physical world. Our focus ranges from Arduino/ESP32 projects to FPGA programming and robotics.",
      colorClass: "bg-orange-600",
      stats: [
        { label: "Robots Built", value: "7" },
        { label: "Hardware Hackathons", value: "3" },
      ],
      projects: [],
      members: [],
    },
    multimedia: {
      slug: "multimedia",
      title: "Multimedia & Design",
      icon: Clapperboard,
      description: "Visualizing ideas and creating experiences.",
      longDescription:
        "The Multimedia team handles UI/UX design, game development assets, and content creation. We blend technology with art to create compelling user experiences and visual identities.",
      colorClass: "bg-purple-600",
      stats: [
        { label: "Designs Shipped", value: "50+" },
        { label: "Game Assets", value: "100+" },
      ],
      projects: [],
      members: [],
    },
  };