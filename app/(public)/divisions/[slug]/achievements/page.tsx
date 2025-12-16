import React from "react";
import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Trophy, Calendar, Crown } from "lucide-react";
import { cn } from "@/lib/utils";

export default async function AchievementsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const division = await prisma.division.findUnique({
    where: { slug },
    include: {
      achievements: {
        orderBy: { date: "desc" } // Assuming date is sortable or you might want createdAt
      }
    }
  });

  if (!division) return notFound();

  // Normalize colors from DB
  const baseColor = division.colorClass || "bg-blue-600";
  // Ensure we have bg- for backgrounds/overlays and text- for text
  const bgColorClass = baseColor.replace("text-", "bg-");
  const textColorClass = baseColor.replace("bg-", "text-");

  return (
    <div className="min-h-screen w-full px-4 py-2 md:py-4 space-y-8 bg-background">
      <div className="container mx-auto max-w-5xl">
        <div className="mb-12 border-b pb-6">
          <Link
            href={`/divisions/${slug}`}
            className="text-sm font-mono text-muted-foreground hover:text-foreground transition-colors mb-2 block"
          >
            ← Back to {division.title}
          </Link>
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter">
            Achievements
          </h1>
          <p className="text-muted-foreground mt-2 max-w-xl">
            Celebrating the milestones, awards, and recognitions earned by the {division.title} team.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8">
          {division.achievements.length > 0 ? (
            division.achievements.map((item) => (
              <div
                key={item.id}
                className="group relative flex flex-col md:flex-row overflow-hidden rounded-3xl bg-neutral-50 dark:bg-neutral-900 border hover:shadow-xl transition-all duration-300"
              >
                {/* Image Section */}
                <div className="relative w-full md:w-72 h-48 md:h-auto shrink-0">
                    <Image 
                        src={item.imageUrl} 
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {/* Overlay gradient using dynamic BG color */}
                    <div className={cn("absolute inset-0 opacity-20 mix-blend-multiply", bgColorClass)} />
                </div>

                {/* Content Section */}
                <div className="flex-1 p-6 md:p-8 flex flex-col justify-center">
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                         <span className={cn("px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-white", bgColorClass)}>
                            {item.issuer}
                         </span>
                         <div className="flex items-center gap-2 text-sm font-mono text-muted-foreground">
                            <Calendar className="w-3 h-3" />
                            {item.date}
                         </div>
                    </div>
                    
                    <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight mb-2">
                        {item.title}
                    </h3>

                    <p className="text-muted-foreground leading-relaxed mb-6">
                        {item.description}
                    </p>

                    {/* Winner Section */}
                    <div className="mt-auto flex items-center gap-3 pt-4 border-t border-dashed">
                        <div className={cn("p-2 rounded-full bg-background border", textColorClass)}>
                            <Crown className="w-4 h-4" />
                        </div>
                        <div>
                            <p className="text-xs text-muted-foreground uppercase tracking-wider font-bold">Winner</p>
                            <p className="font-bold text-foreground">{item.winner}</p>
                        </div>
                    </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-24 text-center border-2 border-dashed rounded-3xl bg-neutral-50/50 dark:bg-neutral-900/50">
              <div className="inline-flex p-4 rounded-full bg-neutral-200 dark:bg-neutral-800 mb-4">
                  <Trophy className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-bold text-muted-foreground">No achievements listed yet</h3>
              <p className="text-sm text-muted-foreground/70 mt-1">Greatness takes time.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}