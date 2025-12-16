import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import Image from "next/image";
import { deleteProject, deleteAchievement } from "@/app/actions/cms";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trash2, FolderKanban, Users, Trophy, Calendar, Award, Github, ExternalLink, Linkedin } from "lucide-react";
import { ProjectDialog, MemberDialog, AchievementDialog } from "@/components/admin/dialogs";
import { SortControl } from "@/components/admin/sort-control";
import { PaginationControl } from "@/components/admin/pagination-control";
import { MemberCardActions } from "@/components/admin/member-card-actions";

const PAGE_SIZE = 9;

export default async function DivisionManager({ 
  params, 
  searchParams 
}: { 
  params: Promise<{ slug: string }>,
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const { slug } = await params;
  const query = await searchParams;

  const sort = (query.sort as string) === "asc" ? "asc" : "desc";
  const projectsPage = Number(query.projectsPage) || 1;
  const membersPage = Number(query.membersPage) || 1;
  const achievementsPage = Number(query.achievementsPage) || 1;

  const division = await prisma.division.findUnique({
    where: { slug },
    include: {
      _count: { select: { projects: true, members: true, achievements: true } },
      projects: { orderBy: { createdAt: sort }, skip: (projectsPage - 1) * PAGE_SIZE, take: PAGE_SIZE },
      members: { orderBy: { createdAt: sort }, skip: (membersPage - 1) * PAGE_SIZE, take: PAGE_SIZE },
      achievements: { orderBy: { createdAt: sort }, skip: (achievementsPage - 1) * PAGE_SIZE, take: PAGE_SIZE },
    },
  });

  if (!division) return notFound();

  const EmptyState = ({ label }: { label: string }) => (
    <div className="col-span-full flex flex-col items-center justify-center py-20 text-center border-2 border-dashed border-muted rounded-xl bg-muted/30">
      <p className="text-muted-foreground font-medium">{label}</p>
    </div>
  );

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-20 px-4 sm:px-6">
      <div className="flex flex-col gap-2 border-b pb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h1 className="text-3xl font-bold tracking-tight text-foreground uppercase">{division.title}</h1>
            <span className="w-fit px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-mono font-medium border">
                {division.slug}
            </span>
        </div>
        <p className="text-muted-foreground max-w-2xl">Manage content, team members, and awards.</p>
      </div>

      <Tabs defaultValue="projects" className="space-y-8">
          <TabsList>
            <TabsTrigger value="projects" className="gap-2 text-xs sm:text-sm"><FolderKanban size={14}/> Projects</TabsTrigger>
            <TabsTrigger value="members" className="gap-2 text-xs sm:text-sm"><Users size={14}/> Members</TabsTrigger>
            <TabsTrigger value="achievements" className="gap-2 text-xs sm:text-sm"><Trophy size={14}/> Achievements</TabsTrigger>
          </TabsList>

        {/* --- PROJECTS TAB --- */}
        <TabsContent value="projects" className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-card p-4 rounded-xl border shadow-sm">
             <div className="flex items-center gap-4">
                <SortControl />
                <span className="text-sm text-muted-foreground">Total: <span className="font-medium text-foreground">{division._count.projects}</span></span>
             </div>
             <ProjectDialog divisionId={division.id} divisionSlug={division.slug} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {division.projects.map((p) => (
              <Card key={p.id} className="overflow-hidden flex flex-col group border-border hover:border-primary/20 transition-all duration-300 hover:shadow-lg h-full">
                {/* Image Container: Removed any padding above/around this div by ensuring it's the first child of Card */}
                <div className="relative aspect-video w-full bg-muted overflow-hidden shrink-0">
                    <Image src={p.imageUrl} alt={p.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                
                {/* Content: Adjusted padding to be balanced */}
                <CardContent className=" flex-1 flex flex-col gap-3">
                    <div className="space-y-1">
                      <div className="flex justify-between items-start gap-2">
                          <h3 className="font-semibold text-lg leading-tight line-clamp-1 group-hover:text-primary transition-colors">{p.title}</h3>
                          
                          {/* OPTIONAL LINKS DISPLAY */}
                          <div className="flex gap-2 shrink-0 pt-0.5">
                            {p.githubUrl && (
                                <a href={p.githubUrl} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground transition-colors" title="GitHub Repo">
                                    <Github size={16} />
                                </a>
                            )}
                            {p.demoUrl && (
                                <a href={p.demoUrl} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground transition-colors" title="Live Demo">
                                    <ExternalLink size={16} />
                                </a>
                            )}
                          </div>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                          {p.tags.map(t => (
                            <span key={t} className="text-[10px] font-medium bg-secondary/50 px-2 py-0.5 rounded text-muted-foreground border">{t}</span>
                          ))}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">{p.description}</p>
                </CardContent>

                {/* Footer: Reduced vertical padding (py-3) to remove empty space below */}
                <CardFooter className="p-6 border-t bg-muted/20 mt-auto flex justify-between items-center">
                    <span className="text-[10px] text-muted-foreground font-mono">{new Date(p.createdAt).toLocaleDateString()}</span>
                    <div className="flex gap-1">
                      <ProjectDialog divisionSlug={division.slug} data={p} />
                      <form action={deleteProject.bind(null, p.id, slug)}>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"><Trash2 size={14}/></Button>
                      </form>
                    </div>
                </CardFooter>
              </Card>
            ))}
            {division.projects.length === 0 && <EmptyState label="No projects added yet." />}
          </div>
          <div className="flex justify-center border-t pt-6"><PaginationControl totalCount={division._count.projects} pageSize={PAGE_SIZE} paramName="projectsPage" /></div>
        </TabsContent>

        {/* --- MEMBERS TAB --- */}
        <TabsContent value="members" className="space-y-6">
           <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-card p-4 rounded-xl border shadow-sm">
             <div className="flex items-center gap-4">
                <SortControl />
                <span className="text-sm text-muted-foreground">Total: <span className="font-medium text-foreground">{division._count.members}</span></span>
             </div>
             <MemberDialog divisionId={division.id} divisionSlug={division.slug} />
          </div>

          {/* CLEAN HORIZONTAL MEMBER CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
             {division.members.map((m) => (
               <div key={m.id} className="flex items-center gap-4 p-4 rounded-xl border bg-card hover:border-primary/30 transition-all shadow-sm group relative overflow-hidden">
                  
                  {/* Image */}
                  <div className="relative h-16 w-16 shrink-0 rounded-full overflow-hidden border-2 border-background shadow-md">
                    <Image src={m.imageUrl} alt={m.name} fill className="object-cover" />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-sm truncate text-foreground">{m.name}</h4>
                    <p className="text-xs text-muted-foreground truncate uppercase font-medium tracking-wide mb-1.5">{m.role}</p>
                    
                    {/* Socials (Optional) */}
                    <div className="flex gap-2">
                        {m.github && (
                            <a href={m.github} target="_blank" className="text-muted-foreground hover:text-foreground transition-colors">
                                <Github size={14} />
                            </a>
                        )}
                        {m.linkedin && (
                            <a href={m.linkedin} target="_blank" className="text-muted-foreground hover:text-blue-600 transition-colors">
                                <Linkedin size={14} />
                            </a>
                        )}
                    </div>
                  </div>

                  {/* Actions (Separate Component) */}
                  <div className="ml-auto pl-2">
                     <MemberCardActions member={m} divisionSlug={slug} />
                  </div>
               </div>
             ))}
             {division.members.length === 0 && <EmptyState label="No members found." />}
          </div>
          <div className="flex justify-center border-t pt-6"><PaginationControl totalCount={division._count.members} pageSize={PAGE_SIZE} paramName="membersPage" /></div>
        </TabsContent>

        {/* --- ACHIEVEMENTS TAB --- */}
        <TabsContent value="achievements" className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-card p-4 rounded-xl border shadow-sm">
             <div className="flex items-center gap-4">
                <SortControl />
                <span className="text-sm text-muted-foreground">Total: <span className="font-medium text-foreground">{division._count.achievements}</span></span>
             </div>
             <AchievementDialog divisionId={division.id} divisionSlug={division.slug} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             {division.achievements.map((a) => (
               <Card key={a.id} className="flex flex-col sm:flex-row overflow-hidden group hover:border-primary/20 hover:shadow-md transition-all">
                  <div className="relative w-full sm:w-48 aspect-video sm:aspect-auto bg-muted shrink-0">
                     <Image src={a.imageUrl} alt={a.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="flex-1 p-6 flex flex-col justify-between min-w-0 gap-4">
                     <div className="space-y-2">
                        <div className="flex justify-between items-start gap-3">
                            <h4 className="font-bold text-base leading-tight line-clamp-1 text-foreground">{a.title}</h4>
                            <span className="flex items-center gap-1.5 text-[10px] bg-secondary px-2 py-1 rounded-md font-mono text-muted-foreground border shrink-0">
                                <Calendar size={10} /> {a.date}
                            </span>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2">{a.description}</p>
                     </div>
                     <div className="flex items-end justify-between pt-2 border-t border-dashed">
                        <div className="flex items-center gap-2 text-xs font-medium text-foreground/80">
                            <Award size={14} className="text-primary/70" />
                            <span className="truncate max-w-[150px]">{a.winner}</span>
                        </div>
                        <div className="flex gap-1">
                            <AchievementDialog divisionSlug={division.slug} data={a} />
                            <form action={deleteAchievement.bind(null, a.id, slug)}>
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"><Trash2 size={14}/></Button>
                            </form>
                        </div>
                     </div>
                  </div>
               </Card>
             ))}
             {division.achievements.length === 0 && <EmptyState label="No achievements found." />}
          </div>
          <div className="flex justify-center border-t pt-6"><PaginationControl totalCount={division._count.achievements} pageSize={PAGE_SIZE} paramName="achievementsPage" /></div>
        </TabsContent>
      </Tabs>
    </div>
  );
}