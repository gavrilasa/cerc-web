import { AppWindow, Network, Cpu, Clapperboard, LucideIcon, HelpCircle } from "lucide-react";

const icons: Record<string, LucideIcon> = {
    AppWindow, Network, Cpu, Clapperboard
};

export const getIconByName = (name: string) => icons[name] || HelpCircle;