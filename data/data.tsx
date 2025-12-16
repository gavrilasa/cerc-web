import React from "react";
import {
  Globe, Server, Database, Shield, Terminal, Route, Cpu, Wifi,
  Layers, Box, Layout, Clapperboard, LucideIcon
} from "lucide-react";
import {
  SiReact, SiNextdotjs, SiTypescript, SiNodedotjs, SiPostgresql,
  SiDocker, SiPython, SiCisco, SiWireshark, SiLinux, SiAnsible,
  SiC, SiCplusplus, SiArduino, SiRaspberrypi, SiStmicroelectronics,
  SiFigma, SiBlender, SiAdobecreativecloud, SiUnity, SiUnrealengine
} from "react-icons/si";

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

// --- DATA DEFINITION ---
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

// --- EXPORT WITH ALIASES ---
// This ensures 'network', 'network-engineering', 'networkengineering' all work
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