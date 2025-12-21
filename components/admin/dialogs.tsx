"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus, Edit } from "lucide-react";
import { ProjectForm, MemberForm, AchievementForm, TechStackForm } from "./forms";
import { useState } from "react";

// Project Dialog
export function ProjectDialog({ divisions, data }: { divisions: any[], data?: any }) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {data ? <Button variant="ghost" size="icon"><Edit size={14} /></Button> : <Button size="sm"><Plus className="mr-2 h-4 w-4" /> Add Project</Button>}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader><DialogTitle>{data ? "Edit" : "Add"} Project</DialogTitle></DialogHeader>
        <ProjectForm divisions={divisions} data={data} closeDialog={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}

// Member Dialog
export function MemberDialog({ divisions, data }: { divisions: any[], data?: any }) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
         {data ? <Button variant="ghost" size="icon"><Edit size={14} /></Button> : <Button size="sm"><Plus className="mr-2 h-4 w-4" /> Add Member</Button>}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader><DialogTitle>Add Member</DialogTitle></DialogHeader>
        <MemberForm divisions={divisions} data={data} closeDialog={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}

// Achievement Dialog
export function AchievementDialog({ divisions, data }: { divisions: any[], data?: any }) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {data ? <Button variant="ghost" size="icon"><Edit size={14} /></Button> : <Button size="sm"><Plus className="mr-2 h-4 w-4" /> Add Achievement</Button>}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader><DialogTitle>Add Achievement</DialogTitle></DialogHeader>
        <AchievementForm divisions={divisions} data={data} closeDialog={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}

// Tech Stack Dialog
export function TechStackDialog({ divisions, data }: { divisions: any[], data?: any }) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm"><Plus className="mr-2 h-4 w-4" /> Add Tech</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader><DialogTitle>Add Technology</DialogTitle></DialogHeader>
        <TechStackForm divisions={divisions} data={data} closeDialog={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}