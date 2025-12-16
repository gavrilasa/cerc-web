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
      technologies: ["Figma", "Adobe After Effects", "Blender", "Unity", "DaVinci Resolve", "Spline"],
      projects: [],
      members: [],
      achievements: []
    },
  };