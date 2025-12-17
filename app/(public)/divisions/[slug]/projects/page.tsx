import React from "react";
import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ProjectCard } from "@/components/divisions-card";

export default async function ProjectsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const division = await prisma.division.findUnique({
    where: { slug },
    include: { projects: { orderBy: { createdAt: "desc" } } },
  });

  if (!division) return notFound();

  return (
    <div className="min-h-screen w-full px-4 py-8 md:py-12 bg-background space-y-12">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-12 border-b pb-6">
          <Link href={`/divisions/${slug}`} className="text-sm font-mono text-muted-foreground hover:text-foreground transition-colors mb-2 block">
            ← Back to {division.title}
          </Link>
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter">Projects</h1>
          <p className="text-muted-foreground mt-2 max-w-lg">
            Showcase of applications, research, and experiments by the {division.title} division.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {division.projects.length > 0 ? (
            division.projects.map((p) => (
              <ProjectCard key={p.id} {...p} />
            ))
          ) : (
            <div className="col-span-full py-24 text-center border-2 border-dashed border-muted rounded-4xl bg-muted/30">
              <p className="text-muted-foreground font-medium text-lg">No projects listed yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}