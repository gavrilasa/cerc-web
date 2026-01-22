import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { 
  AppWindow, Network, Cpu, Clapperboard, FolderKanban, 
  ArrowLeft, ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProjectCard, MemberCard, AchievementCard } from "@/components/divisions-card";

export const dynamic = "force-dynamic";

const iconMap: Record<string, any> = {
  AppWindow, Network, Cpu, Clapperboard, FolderKanban
};

export default async function DivisionDetailPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params;
  
  const division = await prisma.division.findUnique({
    where: { slug },
    include: {
      projects: { orderBy: [{ order: 'asc' }, { createdAt: "desc" }], take: 3 },
      members: { orderBy: [{ order: 'asc' }, { createdAt: "asc" }], take: 6 },
      achievements: { orderBy: [{ order: 'asc' }, { createdAt: "desc" }], take: 3 },
      techStacks: { orderBy: [{ order: 'asc' }, { name: 'asc' }] },
      _count: { select: { projects: true, members: true, achievements: true, techStacks: true } }
    },
  });

  if (!division) {
    notFound();
  }

  const Icon = iconMap[division.iconName] || FolderKanban;

  return (
    <div className="container mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-10 lg:py-12 animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8">
      
      {/* Back Link */}
      <Link 
        href="/divisions" 
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Divisions
      </Link>
      
      {/* Main Card Container */}
      <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
        
        {/* Header */}
        <div className="bg-muted/30 border-b border-border p-6 md:p-8">
          <div className="flex items-start gap-4 md:gap-6">
            <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <Icon className="w-7 h-7 md:w-8 md:h-8 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">{division.title}</h1>
              <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                {division.description || `Specialized research group focused on ${division.title.toLowerCase()}.`}
              </p>
              <div className="flex flex-wrap gap-4 mt-3 text-sm text-muted-foreground">
                <span><strong className="text-foreground">{division._count.projects}</strong> projects</span>
                <span><strong className="text-foreground">{division._count.members}</strong> members</span>
                <span><strong className="text-foreground">{division._count.achievements}</strong> achievements</span>
              </div>
            </div>
          </div>
          
          {/* Tech Stack */}
          {division.techStacks && division.techStacks.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-6 pl-20">
              {division.techStacks.map((tech) => (
                <a 
                  key={tech.id}
                  href={tech.websiteUrl || "#"}
                  target="_blank"
                  className="inline-flex items-center gap-2 px-3 py-1.5 border border-border hover:border-primary/30 rounded-lg text-sm font-medium transition-colors"
                >
                  {tech.imageUrl && (
                    <div className="relative w-4 h-4">
                      <Image src={tech.imageUrl} alt={tech.name} fill className="object-contain" />
                    </div>
                  )}
                  {tech.name}
                </a>
              ))}
            </div>
          )}
        </div>
        
        {/* Content Sections */}
        <div className="p-6 md:p-8 space-y-10">
          
          {/* Projects Section */}
          {division.projects.length > 0 && (
            <section>
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg font-semibold text-foreground">Projects</h2>
                <Link href={`/projects?division=${slug}`}>
                  <Button variant="ghost" size="sm" className="gap-1.5 font-mono text-xs">
                    View All <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {division.projects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    title={project.title}
                    description={project.description}
                    imageUrl={project.imageUrl}
                    tags={project.tags}
                    createdAt={project.createdAt}
                    githubUrl={project.githubUrl}
                    demoUrl={project.demoUrl}
                  />
                ))}
              </div>
            </section>
          )}
          
          {/* Members Section */}
          {division.members.length > 0 && (
            <section>
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg font-semibold text-foreground">Team Members</h2>
                <Link href={`/members?division=${slug}`}>
                  <Button variant="ghost" size="sm" className="gap-1.5 font-mono text-xs">
                    View All <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {division.members.map((member) => (
                  <MemberCard
                    key={member.id}
                    name={member.name}
                    role={member.role}
                    imageUrl={member.imageUrl || "/placeholder-avatar.png"}
                    github={member.github}
                    linkedin={member.linkedin}
                  />
                ))}
              </div>
            </section>
          )}
          
          {/* Achievements Section */}
          {division.achievements && division.achievements.length > 0 && (
            <section>
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg font-semibold text-foreground">Achievements</h2>
                <Link href={`/achievements?division=${slug}`}>
                  <Button variant="ghost" size="sm" className="gap-1.5 font-mono text-xs">
                    View All <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {division.achievements.map((achievement) => (
                  <AchievementCard
                    key={achievement.id}
                    title={achievement.title}
                    description={achievement.description}
                    imageUrl={achievement.imageUrl}
                    date={achievement.date}
                    issuer={achievement.issuer}
                    winner={achievement.winner}
                    linkUrl={achievement.linkUrl}
                  />
                ))}
              </div>
            </section>
          )}
          
          {/* Empty State */}
          {division.projects.length === 0 && division.members.length === 0 && (!division.achievements || division.achievements.length === 0) && (
            <div className="text-center py-12 text-muted-foreground">
              <FolderKanban className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p className="font-medium">No content yet</p>
              <p className="text-sm">Projects, members, and achievements will appear here.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
