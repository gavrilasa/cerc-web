import React from "react";
import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Github, Linkedin } from "lucide-react";
import { cn } from "@/lib/utils";

export default async function MembersPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const division = await prisma.division.findUnique({
    where: { slug },
    include: {
      members: {
        orderBy: { createdAt: "asc" }
      }
    }
  });

  if (!division) return notFound();

  // Normalize colors from DB (handle "text-" vs "bg-")
  const baseColor = division.colorClass || "text-blue-600"; 
  // Ensure we have the text version for the role color
  const textColorClass = baseColor.replace("bg-", "text-");

  return (
    <div className="min-h-screen w-full px-4 py-2 md:py-4 space-y-8 bg-background">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-12 border-b pb-6">
          <Link
            href={`/divisions/${slug}`}
            className="text-sm font-mono text-muted-foreground hover:text-foreground transition-colors mb-2 block"
          >
            ← Back to {division.title}
          </Link>
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter">
            Members
          </h1>
          <p className="text-muted-foreground mt-2">
            The brilliant minds behind the {division.title} division.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {division.members.length > 0 ? (
            division.members.map((member) => (
              <div
                key={member.id}
                className="group relative flex flex-col items-center text-center p-6 rounded-3xl bg-neutral-50 dark:bg-neutral-900 border hover:shadow-lg transition-all duration-300"
              >
                <div className="relative w-24 h-24 mb-4 rounded-full overflow-hidden border-2 border-neutral-200 dark:border-neutral-700 group-hover:scale-110 transition-transform duration-300">
                  <Image
                    src={member.imageUrl}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="font-bold text-lg leading-tight">{member.name}</h3>
                <p className={cn("text-xs font-mono uppercase tracking-widest mt-1 mb-4 opacity-70", textColorClass)}>
                  {member.role}
                </p>
                
                <div className="flex gap-3 mt-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                   {member.github && (
                       <Link href={member.github} target="_blank" className="hover:text-black dark:hover:text-white transition-colors">
                           <Github className="w-4 h-4" />
                       </Link>
                   )}
                   {member.linkedin && (
                       <Link href={member.linkedin} target="_blank" className="hover:text-blue-600 transition-colors">
                           <Linkedin className="w-4 h-4" />
                       </Link>
                   )}
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-20 text-center border-2 border-dashed rounded-3xl">
              <p className="text-muted-foreground">No members listed yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}