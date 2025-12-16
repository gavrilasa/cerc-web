import { prisma } from "@/lib/db";
import { 
  createProject, 
  deleteProject, 
  createMember, 
  deleteMember, 
  createAchievement, 
  deleteAchievement 
} from "@/app/actions/cms";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Trash2, FolderKanban, Users, Trophy } from "lucide-react";

export default async function DivisionEditor({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  const division = await prisma.division.findUnique({
    where: { slug },
    include: { 
      projects: { orderBy: { createdAt: 'desc' } }, 
      members: { orderBy: { createdAt: 'desc' } }, 
      achievements: { orderBy: { createdAt: 'desc' } } 
    }
  });

  if (!division) return notFound();

  return (
    <div className="space-y-12 pb-20 max-w-5xl mx-auto">
      <div className="flex items-center justify-between border-b pb-6">
        <div>
          <h1 className="text-3xl font-black text-slate-800 uppercase tracking-tight">{division.title}</h1>
          <p className="text-slate-500 mt-1">Manage content for the {division.slug} division</p>
        </div>
        <span className={`px-4 py-2 rounded-full text-white font-bold shadow-sm ${division.colorClass.replace("bg-", "bg-")}`}>
          {slug.toUpperCase()}
        </span>
      </div>

      {/* --- PROJECTS SECTION --- */}
      <section className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
            <FolderKanban className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800">Projects</h2>
        </div>
        
        {/* List Existing */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {division.projects.length > 0 ? (
              division.projects.map(p => (
                <div key={p.id} className="flex gap-4 border border-slate-200 p-4 rounded-2xl hover:border-blue-300 transition-colors bg-slate-50/50">
                    <div className="w-24 h-24 bg-slate-200 relative shrink-0 rounded-xl overflow-hidden shadow-inner">
                         <Image src={p.imageUrl} alt={p.title} fill className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0 flex flex-col justify-center">
                        <h3 className="font-bold text-slate-900 truncate">{p.title}</h3>
                        <p className="text-xs text-slate-500 line-clamp-2 mt-1 mb-2">{p.description}</p>
                        <div className="flex flex-wrap gap-1">
                          {p.tags.map(t => <span key={t} className="text-[10px] bg-white border px-1.5 py-0.5 rounded-md font-medium text-slate-600">{t}</span>)}
                        </div>
                    </div>
                    <form action={deleteProject.bind(null, p.id, slug)}>
                        <button className="text-slate-400 hover:text-red-600 hover:bg-red-50 p-2 rounded-lg transition-all"><Trash2 size={18}/></button>
                    </form>
                </div>
              ))
            ) : (
              <p className="col-span-full text-center py-8 text-slate-400 italic">No projects yet.</p>
            )}
        </div>

        {/* Add New */}
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
            <h3 className="font-bold text-sm mb-4 uppercase text-slate-500 tracking-wider">Add New Project</h3>
            <form action={createProject} className="space-y-4">
                <input type="hidden" name="divisionId" value={division.id} />
                <input type="hidden" name="divisionSlug" value={division.slug} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input name="title" placeholder="Project Title" required className="p-3 border rounded-xl w-full focus:outline-blue-500" />
                    <input name="imageUrl" placeholder="Image URL (Unsplash, etc)" required className="p-3 border rounded-xl w-full focus:outline-blue-500" />
                </div>
                <input name="tags" placeholder="Tags (comma separated: React, Next.js)" required className="w-full p-3 border rounded-xl focus:outline-blue-500" />
                <textarea name="description" placeholder="Project Description" required className="w-full p-3 border rounded-xl h-24 focus:outline-blue-500 resize-none"></textarea>
                <div className="flex justify-end">
                   <button className="px-6 py-3 bg-slate-900 text-white rounded-xl hover:bg-slate-800 font-bold transition-all shadow-lg hover:shadow-xl">Add Project</button>
                </div>
            </form>
        </div>
      </section>

      {/* --- MEMBERS SECTION --- */}
      <section className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
            <Users className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800">Members</h2>
        </div>
        
         <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-8">
            {division.members.map(m => (
                <div key={m.id} className="border border-slate-200 p-4 rounded-2xl text-center relative group hover:shadow-md transition-all bg-white">
                    <div className="w-20 h-20 bg-slate-200 mx-auto mb-3 aspect-square overflow-hidden relative shadow-sm border-2 border-white">
                         <Image src={m.imageUrl} alt={m.name} fill className="object-cover" />
                    </div>
                    <h3 className="font-bold text-slate-900 text-sm leading-tight mb-1">{m.name}</h3>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">{m.role}</p>
                    <form action={deleteMember.bind(null, m.id, slug)} className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                         <button className="text-red-500 bg-white shadow-md p-1.5 rounded-full hover:bg-red-50"><Trash2 size={12}/></button>
                    </form>
                </div>
            ))}
        </div>

        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
            <h3 className="font-bold text-sm mb-4 uppercase text-slate-500 tracking-wider">Add New Member</h3>
            <form action={createMember} className="space-y-4">
                <input type="hidden" name="divisionId" value={division.id} />
                <input type="hidden" name="divisionSlug" value={division.slug} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input name="name" placeholder="Full Name" required className="p-3 border rounded-xl w-full focus:outline-emerald-500" />
                    <input name="role" placeholder="Role (e.g. Head of Software)" required className="p-3 border rounded-xl w-full focus:outline-emerald-500" />
                </div>
                <input name="imageUrl" placeholder="Profile Photo URL" required className="w-full p-3 border rounded-xl focus:outline-emerald-500" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input name="github" placeholder="Github URL (Optional)" className="p-3 border rounded-xl w-full focus:outline-emerald-500" />
                    <input name="linkedin" placeholder="LinkedIn URL (Optional)" className="p-3 border rounded-xl w-full focus:outline-emerald-500" />
                </div>
                <div className="flex justify-end">
                  <button className="px-6 py-3 bg-slate-900 text-white rounded-xl hover:bg-slate-800 font-bold transition-all shadow-lg hover:shadow-xl">Add Member</button>
                </div>
            </form>
        </div>
      </section>

      {/* --- ACHIEVEMENTS SECTION (NEW) --- */}
      <section className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-amber-50 text-amber-600 rounded-lg">
            <Trophy className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800">Achievements</h2>
        </div>

        {/* List Achievements */}
        <div className="space-y-4 mb-8">
            {division.achievements.length > 0 ? (
                division.achievements.map(a => (
                    <div key={a.id} className="flex flex-col md:flex-row gap-5 border border-slate-200 p-4 rounded-2xl hover:border-amber-300 transition-colors bg-slate-50/50 items-center">
                        <div className="w-full md:w-48 h-32 bg-slate-200 relative shrink-0 rounded-xl overflow-hidden shadow-inner">
                            <Image src={a.imageUrl} alt={a.title} fill className="object-cover" />
                        </div>
                        <div className="flex-1 w-full text-center md:text-left">
                            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-2">
                                <span className="bg-slate-900 text-white text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider">{a.issuer}</span>
                                <span className="text-xs text-slate-500 font-mono">{a.date}</span>
                            </div>
                            <h3 className="font-bold text-lg text-slate-900 leading-tight">{a.title}</h3>
                            <p className="text-sm text-slate-600 mt-1 mb-2">{a.description}</p>
                            <div className="flex items-center justify-center md:justify-start gap-2 text-sm">
                                <Trophy size={14} className="text-amber-500" />
                                <span className="font-bold text-slate-800">Winner: {a.winner}</span>
                            </div>
                        </div>
                        <form action={deleteAchievement.bind(null, a.id, slug)}>
                            <button className="text-slate-400 hover:text-red-600 hover:bg-red-50 p-2 rounded-lg transition-all"><Trash2 size={18}/></button>
                        </form>
                    </div>
                ))
            ) : (
                <p className="text-center py-8 text-slate-400 italic">No achievements listed yet.</p>
            )}
        </div>

        {/* Add New Achievement */}
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
            <h3 className="font-bold text-sm mb-4 uppercase text-slate-500 tracking-wider">Add New Achievement</h3>
            <form action={createAchievement} className="space-y-4">
                <input type="hidden" name="divisionId" value={division.id} />
                <input type="hidden" name="divisionSlug" value={division.slug} />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input name="title" placeholder="Achievement Title" required className="p-3 border rounded-xl w-full focus:outline-amber-500" />
                    <input name="date" placeholder="Date (e.g. Nov 2024)" required className="p-3 border rounded-xl w-full focus:outline-amber-500" />
                </div>
                
                <textarea name="description" placeholder="Description of the award" required className="w-full p-3 border rounded-xl h-20 focus:outline-amber-500 resize-none"></textarea>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input name="issuer" placeholder="Issuer (e.g. GDG Indonesia)" required className="p-3 border rounded-xl w-full focus:outline-amber-500" />
                    <input name="winner" placeholder="Winner Name (Team or Individual)" required className="p-3 border rounded-xl w-full focus:outline-amber-500" />
                </div>
                
                <input name="imageUrl" placeholder="Documentation Image URL" required className="w-full p-3 border rounded-xl focus:outline-amber-500" />

                <div className="flex justify-end">
                   <button className="px-6 py-3 bg-slate-900 text-white rounded-xl hover:bg-slate-800 font-bold transition-all shadow-lg hover:shadow-xl">Add Achievement</button>
                </div>
            </form>
        </div>
      </section>

    </div>
  );
}