import { prisma } from "@/lib/db";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { FolderKanban, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DivisionForm } from "@/components/admin/forms";
import { deleteDivision } from "@/app/actions/cms";

export default async function AdminDivisionsPage() {
  const divisions = await prisma.division.findMany({
    orderBy: { title: 'asc' },
    include: {
        _count: { select: { projects: true, members: true, achievements: true } }
    }
  });

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Divisions</h1>
        {/* Optional: Manual Add Button */}
        <Dialog>
            <DialogTrigger asChild><Button>Add Division</Button></DialogTrigger>
            <DialogContent><DivisionForm /></DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {divisions.map((div) => (
          <Card key={div.id}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
                {div.slug}
              </CardTitle>
              <FolderKanban className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold mb-2">{div.title}</div>
              <p className="text-xs text-muted-foreground line-clamp-2 h-10">
                {div.description}
              </p>
              
              <div className="mt-4 flex items-center justify-between">
                 <div className="flex gap-3 text-xs text-muted-foreground">
                    <span>{div._count.projects} Proj</span>
                    <span>{div._count.members} Mem</span>
                 </div>
                 <div className="flex gap-1">
                    <Dialog>
                        <DialogTrigger asChild><Button variant="ghost" size="icon" className="h-8 w-8"><Edit size={14} /></Button></DialogTrigger>
                        <DialogContent>
                            <DialogHeader><DialogTitle>Edit Division</DialogTitle></DialogHeader>
                            <DivisionForm data={div} />
                        </DialogContent>
                    </Dialog>
                    <form action={deleteDivision.bind(null, div.id)}>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive"><Trash2 size={14} /></Button>
                    </form>
                 </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}