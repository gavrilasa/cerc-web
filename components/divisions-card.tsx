import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Github, Linkedin, ExternalLink, Calendar, Award, Layers, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

// --- Types ---
interface ProjectCardProps {
  title: string;
  description: string;
  imageUrl: string;
  tags: string[];
  createdAt: Date;
  githubUrl?: string | null;
  demoUrl?: string | null;
  divisionName?: string; // Added divisionName
  // Slot for Admin Actions (Edit/Delete)
  actionSlot?: React.ReactNode; 
}

interface MemberCardProps {
  name: string;
  role: string;
  imageUrl: string;
  github?: string | null;
  linkedin?: string | null;
  divisionName?: string; // Added divisionName
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
  linkUrl?: string | null; // Optional external link
  colorClass?: string; // e.g. "bg-blue-600"
  divisionName?: string; // Added divisionName
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
  divisionName,
  actionSlot,
}: ProjectCardProps) {
  return (
    <div className="group flex flex-col bg-card border border-border rounded-2xl overflow-hidden hover:shadow-lg hover:-translate-y-0.5 hover:border-primary/20 transition-all duration-300 h-full">
      {/* Image Section */}
      <div className="relative aspect-video w-full bg-muted overflow-hidden">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Division Badge Overlay */}
        {divisionName && (
          <div className="absolute top-3 left-3">
            <Badge variant="secondary" className="bg-background/80 backdrop-blur-md text-[10px] font-semibold uppercase tracking-wide border-none font-mono">
              {divisionName}
            </Badge>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="flex-1 flex flex-col p-5 gap-3">
        <div className="flex justify-between items-start gap-3">
          <h3 className="font-semibold text-lg leading-tight text-foreground line-clamp-2">
            {title}
          </h3>

          {/* Actions: Admin Slot OR Public Links */}
          <div className="flex gap-1.5 shrink-0">
            {actionSlot ? (
              actionSlot
            ) : (
              <>
                {githubUrl && (
                  <Button variant="ghost" size="icon" asChild className="h-8 w-8 rounded-full hover:bg-muted">
                    <Link href={githubUrl} target="_blank" title="View Source">
                      <Github size={14} />
                    </Link>
                  </Button>
                )}
                {demoUrl && (
                  <Button variant="ghost" size="icon" asChild className="h-8 w-8 rounded-full hover:bg-muted hover:text-blue-600">
                    <Link href={demoUrl} target="_blank" title="Live Demo">
                      <ExternalLink size={14} />
                    </Link>
                  </Button>
                )}
              </>
            )}
          </div>
        </div>

        <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">
          {description}
        </p>

        <div className="mt-auto pt-4 flex flex-col gap-3">
          {/* Tags */}
          <div className="flex flex-wrap gap-1.5">
            {tags.slice(0, 4).map((t) => (
              <span
                key={t}
                className="px-2 py-0.5 rounded-full bg-muted text-[10px] font-medium text-muted-foreground font-mono"
              >
                {t}
              </span>
            ))}
          </div>

          {/* Date Footer */}
          <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground pt-3 border-t border-border font-mono">
            <Calendar size={11} />
            <span>{new Date(createdAt).toLocaleDateString()}</span>
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
  divisionName,
  actionSlot,
}: MemberCardProps) {
  return (
    <div className="group relative flex flex-col items-center bg-card border border-border rounded-2xl p-5 pt-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 hover:border-primary/20 h-full">

      {/* Avatar */}
      <div className="relative mb-3">
        <div className="relative h-16 w-16 rounded-full overflow-hidden border-2 border-border shadow-sm group-hover:scale-105 transition-transform duration-300">
          <Image src={imageUrl} alt={name} fill className="object-cover" />
        </div>
      </div>

      {/* Name & Role */}
      <div className="text-center space-y-0.5 mb-2 flex-1">
        <h3 className="text-sm font-semibold text-foreground leading-tight truncate max-w-full">{name}</h3>
        <p className="text-xs text-muted-foreground truncate max-w-full">{role}</p>
      </div>
      
      {/* Division Badge - Below name */}
      {divisionName && (
        <Badge variant="outline" className="text-[9px] uppercase font-medium text-muted-foreground border-border/50 px-2 py-0.5 mb-3 font-mono">
          {divisionName}
        </Badge>
      )}

      {/* Footer: Admin Actions OR Social Links */}
      <div className="flex items-center gap-2 w-full justify-center pt-4 border-t border-border">
        {actionSlot ? (
          actionSlot
        ) : (
          <>
            {github ? (
              <Button
                variant="ghost"
                size="icon"
                asChild
                className="rounded-full h-8 w-8 hover:bg-muted"
              >
                <Link href={github} target="_blank" aria-label={`${name}'s GitHub`}>
                  <Github size={14} />
                </Link>
              </Button>
            ) : (
              <Button variant="ghost" size="icon" disabled className="rounded-full h-8 w-8 opacity-30">
                <Github size={14} />
              </Button>
            )}

            {linkedin ? (
              <Button
                variant="ghost"
                size="icon"
                asChild
                className="rounded-full h-8 w-8 hover:bg-muted hover:text-[#0077b5]"
              >
                <Link href={linkedin} target="_blank" aria-label={`${name}'s LinkedIn`}>
                  <Linkedin size={14} />
                </Link>
              </Button>
            ) : (
              <Button variant="ghost" size="icon" disabled className="rounded-full h-8 w-8 opacity-30">
                <Linkedin size={14} />
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
  linkUrl,
  colorClass = "bg-blue-600",
  divisionName,
  actionSlot,
}: AchievementCardProps) {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl bg-card border border-border hover:border-primary/20 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 h-full">
      {/* Image Section */}
      <div className="relative aspect-4/3 w-full bg-muted overflow-hidden">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Division Badge */}
        {divisionName && (
          <div className="absolute top-3 right-3">
             <Badge className="bg-black/70 text-white border-none text-[9px] uppercase font-semibold tracking-wide backdrop-blur-sm font-mono">
                {divisionName}
             </Badge>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="flex-1 p-5 flex flex-col">
        {/* Metadata Header */}
        <div className="flex items-center gap-2 mb-3">
          <span className="px-2 py-0.5 rounded-full text-[9px] font-semibold uppercase tracking-wide text-muted-foreground bg-muted font-mono">
            {issuer}
          </span>
          <div className="flex items-center gap-1 text-[11px] text-muted-foreground font-mono">
            <Calendar size={10} />
            <span>{date}</span>
          </div>
        </div>

        {/* Title & Actions */}
        <div className="flex justify-between items-start gap-3 mb-2">
          <h3 className="text-base font-semibold leading-tight line-clamp-2">
            {title}
          </h3>
          
          {/* Actions: Admin Slot OR Link Button */}
          <div className="flex gap-1.5 shrink-0">
            {actionSlot ? (
              actionSlot
            ) : (
              linkUrl && (
                <Button variant="ghost" size="icon" asChild className="h-8 w-8 rounded-full hover:bg-muted hover:text-blue-600">
                  <Link href={linkUrl} target="_blank" title="View Details">
                    <ExternalLink size={14} />
                  </Link>
                </Button>
              )
            )}
          </div>
        </div>
        
        <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2 mb-4">
          {description}
        </p>

        {/* Winner Footer */}
        <div className="mt-auto flex items-center gap-2.5 pt-3 border-t border-border">
          <div className="p-1.5 rounded-full bg-muted">
            <Award size={12} />
          </div>
          <div className="min-w-0">
            <p className="text-[9px] text-muted-foreground uppercase tracking-wide font-medium font-mono">Winner</p>
            <p className="font-medium text-foreground text-sm truncate">{winner}</p>
          </div>
        </div>
      </div>
    </div>
  );
}