"use client";

import React, { use } from "react";
import { divisions } from "@/lib/divisions";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Github, Linkedin } from "lucide-react";
import { cn } from "@/lib/utils";

export default function MembersPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const data = divisions[slug];

  if (!data) return notFound();

  return (
    <div className="min-h-screen w-full px-4 py-2 md:py-4 space-y-8 bg-background">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-12 border-b pb-6">
          <Link
            href={`/divisions/${slug}`}
            className="text-sm font-mono text-muted-foreground hover:text-foreground transition-colors mb-2 block"
          >
            ← Back to {data.title}
          </Link>
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter">
            Members
          </h1>
          <p className="text-muted-foreground mt-2">
            The brilliant minds behind the {data.title} division.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {data.members.length > 0 ? (
            data.members.map((member) => (
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
                <p className={cn("text-xs font-mono uppercase tracking-widest mt-1 mb-4 opacity-70", data.colorClass.replace('bg-', 'text-'))}>
                  {member.role}
                </p>
                
                <div className="flex gap-3 mt-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                   {member.github && (
                       <Link href={member.github} className="hover:text-black dark:hover:text-white transition-colors">
                           <Github className="w-4 h-4" />
                       </Link>
                   )}
                   {member.linkedin && (
                       <Link href={member.linkedin} className="hover:text-blue-600 transition-colors">
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