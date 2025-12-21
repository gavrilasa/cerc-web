import { prisma } from "@/lib/db";
import { TechStackDialog } from "@/components/admin/dialogs";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { deleteTechStack } from "@/app/actions/cms";
import Image from "next/image";

export default async function AdminTechStackPage() {
  const techStacks = await prisma.techStack.findMany({
    orderBy: { createdAt: 'desc' },
    include: { division: true }
  });

  const divisions = await prisma.division.findMany();

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Tech Stack</h1>
        <TechStackDialog divisions={divisions} />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {techStacks.map((t) => (
          <div key={t.id} className="relative group flex flex-col items-center justify-center p-6 bg-card border rounded-xl hover:border-primary transition-all">
            <div className="w-12 h-12 relative mb-3">
                <Image src={t.imageUrl} alt={t.name} fill className="object-contain" />
            </div>
            <span className="font-bold text-sm text-center">{t.name}</span>
            <span className="text-[10px] text-muted-foreground uppercase mt-1 bg-muted px-2 py-0.5 rounded-full">{t.division.title}</span>
            
            <form action={deleteTechStack.bind(null, t.id)} className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button variant="destructive" size="icon" className="h-6 w-6"><Trash2 size={10}/></Button>
            </form>
          </div>
        ))}
        {techStacks.length === 0 && <div className="col-span-full text-center py-10 text-muted-foreground border-2 border-dashed rounded-xl">No tech stack items found.</div>}
      </div>
    </div>
  );
}