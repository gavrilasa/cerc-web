import React from "react";
import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MemberCard } from "@/components/divisions-card";

export default async function MembersPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const division = await prisma.division.findUnique({
    where: { slug },
    include: { members: { orderBy: { createdAt: "asc" } } },
  });

  if (!division) return notFound();

  return (
    <div className="min-h-screen w-full px-4 py-8 md:py-12 bg-background space-y-12">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-12 border-b pb-6">
          <Link href={`/divisions/${slug}`} className="text-sm font-mono text-muted-foreground hover:text-foreground transition-colors mb-2 block">
            ← Back to {division.title}
          </Link>
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter">Members</h1>
          <p className="text-muted-foreground mt-2 max-w-xl">
            The brilliant minds behind the {division.title} division.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {division.members.length > 0 ? (
            division.members.map((m) => (
              <MemberCard key={m.id} {...m} />
            ))
          ) : (
            <div className="col-span-full py-24 text-center border-2 border-dashed border-muted rounded-4xl bg-muted/30">
              <p className="text-muted-foreground font-medium text-lg">No members found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}