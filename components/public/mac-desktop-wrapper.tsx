"use client";

import { ReactNode } from "react";
import { Folder, LayoutGrid, List, ChevronRight, ChevronLeft, ChevronsRight, Search, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface MacDesktopWrapperProps {
  children: ReactNode;
  title?: string;
  icon?: LucideIcon;
  breadcrumbs?: { label: string; href?: string }[];
  prevLink?: { href: string; title?: string } | null;
  nextLink?: { href: string; title?: string } | null;
  statusText?: string;
  className?: string;
}

export function MacDesktopWrapper({ 
  children, 
  title = "Divisions",
  icon: Icon = Folder,
  breadcrumbs = [{ label: "CERC" }, { label: "Divisions" }],
  prevLink,
  nextLink,
  statusText,
  className 
}: MacDesktopWrapperProps) {
  return (
    <div className={cn("w-full", className)}>
      {/* macOS Window */}
      <div className="relative bg-card border border-border rounded-xl md:rounded-2xl shadow-2xl shadow-black/10 dark:shadow-black/30 overflow-hidden">
        
        {/* Title Bar */}
        <div className="relative h-12 md:h-14 bg-neutral-100 dark:bg-neutral-800 border-b border-border flex items-center px-4">
          {/* Traffic Light Buttons */}
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors cursor-default" />
            <div className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors cursor-default" />
            <div className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 transition-colors cursor-default" />
          </div>
          
          {/* Navigation Arrows (if provided) */}
          {(prevLink !== undefined || nextLink !== undefined) && (
            <div className="flex items-center ml-4 gap-0.5">
              {prevLink ? (
                <Link 
                  href={prevLink.href}
                  className="p-1 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors"
                  title={prevLink.title}
                >
                  <ChevronLeft className="w-5 h-5" strokeWidth={2.5} />
                </Link>
              ) : (
                <span className="p-1 text-neutral-300 dark:text-neutral-600"><ChevronLeft className="w-5 h-5" strokeWidth={2.5} /></span>
              )}
              {nextLink ? (
                <Link 
                  href={nextLink.href}
                  className="p-1 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors"
                  title={nextLink.title}
                >
                  <ChevronRight className="w-5 h-5" strokeWidth={2.5} />
                </Link>
              ) : (
                <span className="p-1 text-neutral-300 dark:text-neutral-600"><ChevronRight className="w-5 h-5" strokeWidth={2.5} /></span>
              )}
            </div>
          )}
          
          {/* Center Title with Icon */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="flex items-center gap-2">
              <Icon className="w-4 h-4 text-blue-500" />
              <span className="text-sm font-semibold text-foreground">{title}</span>
            </div>
          </div>
          
          {/* Right side - View Toggle */}
          <div className="ml-auto hidden md:flex items-center gap-2 text-neutral-400">
            <ChevronsRight className="w-4 h-4" />
            <Search className="w-4 h-4" />
          </div>
        </div>
        
        {/* Toolbar / Breadcrumb */}
        <div className="h-9 md:h-10 bg-neutral-50 dark:bg-neutral-900 border-b border-border flex items-center px-4 gap-1">
          {breadcrumbs.map((crumb, i) => (
            <div key={i} className="flex items-center gap-1">
              {i > 0 && <ChevronRight className="w-3 h-3 text-muted-foreground" />}
              {crumb.href ? (
                <Link 
                  href={crumb.href} 
                  className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  {crumb.label}
                </Link>
              ) : (
                <span className={cn(
                  "text-xs font-medium",
                  i === breadcrumbs.length - 1 
                    ? "text-foreground" 
                    : "text-muted-foreground"
                )}>
                  {crumb.label}
                </span>
              )}
            </div>
          ))}
        </div>
        
        {/* Desktop Content Area */}
        <div className="relative bg-linear-to-br from-blue-600/5 via-background to-purple-600/5 dark:bg-[#0a0a0a] dark:from-[#0a0a0a] dark:via-[#0a0a0a] dark:to-[#0a0a0a] min-h-[400px] md:min-h-[500px] p-6 md:p-10">
          {/* Content */}
          <div className="relative z-10">
            {children}
          </div>
        </div>
        
        {/* Status Bar */}
        {statusText && (
          <div className="h-6 md:h-7 bg-neutral-50 dark:bg-neutral-900 border-t border-border flex items-center justify-center px-4">
            <span className="text-[10px] text-muted-foreground font-mono">
              {statusText}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
