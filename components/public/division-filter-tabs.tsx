"use client";

import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

interface Division {
  id: string;
  slug: string;
  title: string;
}

interface DivisionTabsProps {
  divisions: Division[];
  className?: string;
}

export function DivisionTabs({ divisions, className }: DivisionTabsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentDivision = searchParams.get("division") || "all";

  const handleTabClick = useCallback((slug: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (slug === "all") {
      params.delete("division");
    } else {
      params.set("division", slug);
    }
    router.push(`?${params.toString()}`, { scroll: false });
  }, [router, searchParams]);

  return (
    <div className={cn("w-full flex justify-center overflow-x-auto", className)}>
      <div className="inline-flex items-center gap-2 p-1 bg-muted/50 rounded-full mb-4">
        {/* All Tab */}
        <button
          onClick={() => handleTabClick("all")}
          className={cn(
            "px-4 py-2 rounded-full text-sm font-medium transition-all font-mono",
            currentDivision === "all"
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          All
        </button>
        
        {/* Division Tabs */}
        {divisions.map((division) => (
          <button
            key={division.id}
            onClick={() => handleTabClick(division.slug)}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap font-mono",
              currentDivision === division.slug
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {division.title}
          </button>
        ))}
      </div>
    </div>
  );
}
