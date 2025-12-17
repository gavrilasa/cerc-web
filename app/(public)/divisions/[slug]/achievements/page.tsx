import React from "react";
import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Trophy } from "lucide-react";
import { AchievementCard } from "@/components/divisions-card";

export default async function AchievementsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const division = await prisma.division.findUnique({
    where: { slug },
    include: { achievements: { orderBy: { date: "desc" } } },
  });

  if (!division) return notFound();

  const baseColor = division.colorClass || "bg-blue-600";

  return (
    <div className="min-h-screen w-full px-4 py-8 md:py-12 bg-background space-y-12">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-12 border-b pb-6">
          <Link href={`/divisions/${slug}`} className="text-sm font-mono text-muted-foreground hover:text-foreground transition-colors mb-2 block">
            ← Back to {division.title}
          </Link>
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter">Achievements</h1>
          <p className="text-muted-foreground mt-2 max-w-xl">
            Celebrating the milestones, awards, and recognitions earned by the {division.title} team.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {division.achievements.length > 0 ? (
            division.achievements.map((a) => (
              <AchievementCard key={a.id} {...a} colorClass={baseColor} />
            ))
          ) : (
            <div className="col-span-full py-24 text-center border-2 border-dashed border-muted rounded-[2.5rem] bg-muted/30">
               <div className="inline-flex p-4 rounded-full bg-muted mb-4">
                 <Trophy className="w-8 h-8 text-muted-foreground/50" />
               </div>
               <p className="text-muted-foreground font-medium text-lg">No achievements listed yet.</p>
               <p className="text-sm text-muted-foreground/60 mt-1">Greatness takes time!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}