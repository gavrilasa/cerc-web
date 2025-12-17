import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Github, Linkedin, ExternalLink, Calendar, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// --- Types ---
interface ProjectCardProps {
  title: string;
  description: string;
  imageUrl: string;
  tags: string[];
  createdAt: Date;
  githubUrl?: string | null;
  demoUrl?: string | null;
  // Slot for Admin Actions (Edit/Delete)
  actionSlot?: React.ReactNode; 
}

interface MemberCardProps {
  name: string;
  role: string;
  imageUrl: string;
  github?: string | null;
  linkedin?: string | null;
  // Slot for Admin Actions
  actionSlot?: React.ReactNode;
}

interface AchievementCardProps {
  title: string;
  description: string;
  imageUrl: string;
  date: string;
  issuer: string;
  winner: string;
  colorClass?: string; // e.g. "bg-blue-600"
  // Slot for Admin Actions
  actionSlot?: React.ReactNode;
}

// --- 1. PROJECT CARD ---
export function ProjectCard({
  title,
  description,
  imageUrl,
  tags,
  createdAt,
  githubUrl,
  demoUrl,
  actionSlot,
}: ProjectCardProps) {
  return (
    <div className="group flex flex-col bg-card border border-border rounded-4xl overflow-hidden hover:shadow-xl hover:-translate-y-1 hover:border-primary/20 transition-all duration-300 h-full">
      {/* Image Section */}
      <div className="relative aspect-video w-full bg-muted overflow-hidden">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content Section */}
      <div className="flex-1 flex flex-col p-6 sm:p-8 gap-4">
        <div className="flex justify-between items-start gap-4">
          <h3 className="font-bold text-xl sm:text-2xl leading-tight text-foreground group-hover:text-primary transition-colors line-clamp-2">
            {title}
          </h3>

          {/* Actions: Admin Slot OR Public Links */}
          <div className="flex gap-2 shrink-0">
            {actionSlot ? (
              actionSlot
            ) : (
              <>
                {githubUrl && (
                  <Button variant="secondary" size="icon" asChild className="h-9 w-9 rounded-full bg-muted hover:bg-foreground hover:text-background transition-colors">
                    <Link href={githubUrl} target="_blank" title="View Source">
                      <Github size={16} />
                    </Link>
                  </Button>
                )}
                {demoUrl && (
                  <Button variant="secondary" size="icon" asChild className="h-9 w-9 rounded-full bg-muted hover:bg-blue-600 hover:text-white transition-colors">
                    <Link href={demoUrl} target="_blank" title="Live Demo">
                      <ExternalLink size={16} />
                    </Link>
                  </Button>
                )}
              </>
            )}
          </div>
        </div>

        <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
          {description}
        </p>

        <div className="mt-auto pt-6 flex flex-col gap-4">
          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {tags.map((t) => (
              <span
                key={t}
                className="px-3 py-1 rounded-full bg-secondary/50 border border-secondary text-[10px] font-bold uppercase tracking-wider text-muted-foreground"
              >
                {t}
              </span>
            ))}
          </div>

          {/* Date Footer */}
          <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground pt-4 border-t border-dashed border-border">
            <Calendar size={12} />
            <span>Added on {new Date(createdAt).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- 2. MEMBER CARD ---
export function MemberCard({
  name,
  role,
  imageUrl,
  github,
  linkedin,
  actionSlot,
}: MemberCardProps) {
  return (
    <div className="group relative flex flex-col items-center bg-card border border-border rounded-4xl p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-primary/20 h-full">
      {/* Avatar with Ring */}
      <div className="relative mb-6">
        <div className="relative h-32 w-32 rounded-xl overflow-hidden shadow-lg group-hover:scale-105 transition-transform duration-500">
          <Image src={imageUrl} alt={name} fill className="object-cover" />
        </div>
        <div className="absolute inset-0 rounded-full bg-primary/10 blur-2xl -z-10 scale-0 group-hover:scale-150 transition-transform duration-500" />
      </div>

      {/* Name & Role */}
      <div className="text-center space-y-2 mb-6 flex-1">
        <h3 className="text-xl font-bold text-foreground leading-tight">{name}</h3>
        <div className="inline-block px-3 py-1 rounded-full bg-secondary/50 border border-secondary text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
          {role}
        </div>
      </div>

      {/* Footer: Admin Actions OR Social Links */}
      <div className="flex items-center gap-3 w-full justify-center pt-6 border-t border-dashed border-border">
        {actionSlot ? (
          actionSlot
        ) : (
          <>
            {github ? (
              <Button
                variant="outline"
                size="icon"
                asChild
                className="rounded-full h-10 w-10 hover:bg-foreground hover:text-background dark:hover:bg-transparent dark:hover:text-foreground dark:hover:border-foreground transition-colors"
              >
                <Link href={github} target="_blank" aria-label={`${name}'s GitHub`}>
                  <Github size={18} />
                </Link>
              </Button>
            ) : (
              <Button variant="outline" size="icon" disabled className="rounded-full h-10 w-10 opacity-20">
                <Github size={18} />
              </Button>
            )}

            {linkedin ? (
              <Button
                variant="outline"
                size="icon"
                asChild
                className="rounded-full h-10 w-10 hover:bg-[#0077b5] hover:text-white hover:border-[#0077b5] dark:hover:bg-transparent dark:hover:text-[#0077b5] dark:hover:border-[#0077b5] transition-colors"
              >
                <Link href={linkedin} target="_blank" aria-label={`${name}'s LinkedIn`}>
                  <Linkedin size={18} />
                </Link>
              </Button>
            ) : (
              <Button variant="outline" size="icon" disabled className="rounded-full h-10 w-10 opacity-20">
                <Linkedin size={18} />
              </Button>
            )}
          </>
        )}
      </div>
    </div>
  );
}

// --- 3. ACHIEVEMENT CARD ---
export function AchievementCard({
  title,
  description,
  imageUrl,
  date,
  issuer,
  winner,
  colorClass = "bg-blue-600",
  actionSlot,
}: AchievementCardProps) {
  const textColorClass = colorClass.replace("bg-", "text-");

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-4xl bg-card border border-border hover:border-primary/20 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full">
      {/* Image Section */}
      <div className="relative aspect-4/3 w-full bg-muted overflow-hidden">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className={cn("absolute inset-0 opacity-10 mix-blend-multiply group-hover:opacity-0 transition-opacity", colorClass)} />
      </div>

      {/* Content Section */}
      <div className="flex-1 p-6 flex flex-col">
        {/* Metadata Header */}
        <div className="flex items-center gap-3 mb-4">
          <span className={cn(
            "px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-sm", 
            "text-black dark:text-white" // Force text-white to ensure visibility in dark mode (overriding any potential dark text from colorClass)
          )}>
            {issuer}
          </span>
          <div className="flex items-center gap-1.5 text-xs font-mono text-muted-foreground">
            <Calendar size={12} />
            <span>{date}</span>
          </div>
        </div>

        {/* Title & Desc */}
        <h3 className="text-xl font-black uppercase tracking-tight mb-3 leading-tight line-clamp-2">
          {title}
        </h3>
        <div className="flex justify-between items-start gap-2 mb-6">
           <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 flex-1">
             {description}
           </p>
           {actionSlot && <div className="shrink-0">{actionSlot}</div>}
        </div>

        {/* Winner Footer */}
        <div className="mt-auto flex items-center gap-3 pt-4 border-t border-dashed border-border">
          <div className="p-2 rounded-full bg-background border shadow-sm">
            <Award size={16} />
          </div>
          <div className="min-w-0">
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-bold mb-0.5">Winner</p>
            <p className="font-bold text-foreground text-sm truncate">{winner}</p>
          </div>
        </div>
      </div>
    </div>
  );
}