import React from "react";
import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default async function ProjectsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  // 1. Fetch data from DB
  const division = await prisma.division.findUnique({
    where: { slug },
    include: {
      projects: {
        orderBy: { createdAt: "desc" }
      }
    }
  });

  if (!division) return notFound();

  return (
    <div className="min-h-screen w-full px-4 py-2 md:py-4 space-y-8 bg-background">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b pb-6">
          <div>
            <Link
              href={`/divisions/${slug}`}
              className="text-sm font-mono text-muted-foreground hover:text-foreground transition-colors mb-2 block"
            >
              ← Back to {division.title}
            </Link>
            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter">
              Projects
            </h1>
            <p className="text-muted-foreground mt-2 max-w-lg">
              Showcase of applications, research, and experiments by the {division.title} division.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {division.projects.length > 0 ? (
            division.projects.map((project) => (
              <div
                key={project.id}
                className="group relative flex flex-col overflow-hidden rounded-3xl bg-neutral-100 dark:bg-neutral-900 border border-transparent hover:border-neutral-200 dark:hover:border-neutral-800 transition-all duration-300"
              >
                <div className="aspect-video w-full overflow-hidden relative bg-neutral-200">
                  <Image
                    src={project.imageUrl}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-bold uppercase tracking-tight">
                      {project.title}
                    </h3>
                    {/* If you have a demoUrl, you can wrap this in a Link */}
                    {project.demoUrl ? (
                        <Link href={project.demoUrl} target="_blank">
                             <ArrowUpRight className="w-5 h-5 opacity-0 -translate-y-2 translate-x-2 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all cursor-pointer" />
                        </Link>
                    ) : (
                        <ArrowUpRight className="w-5 h-5 opacity-0 -translate-y-2 translate-x-2 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                    )}
                  </div>
                  <p className="text-muted-foreground text-sm mb-6 flex-1">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md bg-background border"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-20 text-center border-2 border-dashed rounded-3xl">
              <p className="text-muted-foreground">No projects listed yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}