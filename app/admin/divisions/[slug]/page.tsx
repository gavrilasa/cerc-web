import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import { deleteProject, deleteAchievement, deleteDivision } from "@/app/actions/cms";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trash2, FolderKanban, Users, Trophy, Edit } from "lucide-react";
import { ProjectDialog, MemberDialog, AchievementDialog } from "@/components/admin/dialogs";
import { SortControl } from "@/components/admin/sort-control";
import { PaginationControl } from "@/components/admin/pagination-control";
import { MemberCardActions } from "@/components/admin/member-card-actions";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DivisionForm } from "@/components/admin/forms";
import { ProjectCard, MemberCard, AchievementCard } from "@/components/divisions-card";

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
    <div className="col-span-full flex flex-col items-center justify-center py-24 text-center border-2 border-dashed border-muted rounded-4xl bg-muted/30">
      <p className="text-muted-foreground font-medium text-lg">{label}</p>
    </div>
  );

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-20 px-4 sm:px-6">
      {/* --- HEADER SECTION --- */}
      <div className="flex flex-col gap-4 border-b pb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold tracking-tight text-foreground uppercase">{division.title}</h1>
              <span className="w-fit px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-mono font-medium border">
                  {division.slug}
              </span>
            </div>

            {/* Admin Actions (Edit / Delete Division) */}
            <div className="flex items-center gap-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Edit className="mr-2 h-4 w-4" /> Edit Division
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Edit Division</DialogTitle>
                  </DialogHeader>
                  <DivisionForm data={division} />
                </DialogContent>
              </Dialog>

              <form action={deleteDivision.bind(null, division.id)}>
                <Button variant="destructive" size="sm">
                  <Trash2 className="mr-2 h-4 w-4" /> Delete
                </Button>
              </form>
            </div>
        </div>
        <p className="text-muted-foreground max-w-2xl">{division.description}</p>
      </div>

      <Tabs defaultValue="projects" className="space-y-8">
          <TabsList className="bg-muted/50 p-1 rounded-full">
            <TabsTrigger value="projects" className="rounded-full px-4 gap-2 text-xs sm:text-sm"><FolderKanban size={14}/> Projects</TabsTrigger>
            <TabsTrigger value="members" className="rounded-full px-4 gap-2 text-xs sm:text-sm"><Users size={14}/> Members</TabsTrigger>
            <TabsTrigger value="achievements" className="rounded-full px-4 gap-2 text-xs sm:text-sm"><Trophy size={14}/> Achievements</TabsTrigger>
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {division.projects.map((p) => (
              <ProjectCard 
                key={p.id} 
                {...p} 
                // Inject Admin Actions into the Card's actionSlot
                actionSlot={
                  <div className="flex gap-1">
                      <ProjectDialog divisionSlug={division.slug} data={p} />
                      <form action={deleteProject.bind(null, p.id, slug)}>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"><Trash2 size={14}/></Button>
                      </form>
                  </div>
                }
              />
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
             {division.members.map((m) => (
               <MemberCard 
                 key={m.id} 
                 {...m} 
                 // Inject Admin Actions into the Card's actionSlot
                 actionSlot={<MemberCardActions member={m} divisionSlug={slug} />}
               />
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
             {division.achievements.map((a) => (
               <AchievementCard 
                 key={a.id} 
                 {...a}
                 colorClass={division.colorClass}
                 // Inject Admin Actions into the Card's actionSlot
                 actionSlot={
                    <div className="flex gap-1">
                        <AchievementDialog divisionSlug={division.slug} data={a} />
                        <form action={deleteAchievement.bind(null, a.id, slug)}>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"><Trash2 size={14}/></Button>
                        </form>
                    </div>
                 }
               />
             ))}
             {division.achievements.length === 0 && <EmptyState label="No achievements found." />}
          </div>
          <div className="flex justify-center border-t pt-6"><PaginationControl totalCount={division._count.achievements} pageSize={PAGE_SIZE} paramName="achievementsPage" /></div>
        </TabsContent>
      </Tabs>
    </div>
  );
}