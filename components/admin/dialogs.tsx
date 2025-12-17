"use client";

import { useState } from "react";
import { ImageUploader } from "@/components/ui/image-uploader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Pencil, Github, Globe, Linkedin } from "lucide-react";
import { createProject, updateProject, createMember, updateMember, createAchievement, updateAchievement } from "@/app/actions/cms";
import { toast } from "sonner";

// --- PROJECT DIALOG ---
export function ProjectDialog({ divisionId, divisionSlug, data }: { divisionId?: string, divisionSlug: string, data?: any }) {
  const [open, setOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState(data?.imageUrl || "");
  const isEdit = !!data;

  const handleSubmit = async (formData: FormData) => {
    if (!imageUrl) {
        toast.error("Please upload an image");
        return;
    }
    formData.set("imageUrl", imageUrl);
    formData.set("divisionSlug", divisionSlug);
    
    if (isEdit) {
      formData.set("id", data.id);
      await updateProject(formData);
      toast.success("Project updated!");
    } else {
      formData.set("divisionId", divisionId!);
      await createProject(formData);
      toast.success("Project created!");
    }
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {isEdit ? (
          <Button variant="outline" size="icon" className="h-8 w-8"><Pencil className="h-4 w-4" /></Button>
        ) : (
          <Button><Plus className="mr-2 h-4 w-4" /> Add Project</Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit Project" : "Add New Project"}</DialogTitle>
        </DialogHeader>
        <form action={handleSubmit} className="flex flex-col gap-4 mt-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Cover Image</label>
            <ImageUploader value={imageUrl} onChange={setImageUrl} className="h-40" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input name="title" placeholder="Project Title" defaultValue={data?.title} required />
            <Input name="tags" placeholder="Tags (React, AI)" defaultValue={data?.tags?.join(", ")} required />
          </div>

          {/* New Optional Fields */}
          <div className="grid grid-cols-2 gap-4">
            <div className="relative">
                <Globe className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input name="demoUrl" placeholder="Demo URL (Optional)" defaultValue={data?.demoUrl || ""} className="pl-9" />
            </div>
            <div className="relative">
                <Github className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input name="githubUrl" placeholder="GitHub Repo (Optional)" defaultValue={data?.githubUrl || ""} className="pl-9" />
            </div>
          </div>

          <Textarea name="description" placeholder="Description" defaultValue={data?.description} required className="h-24" />
          <Button type="submit" className="w-full">{isEdit ? "Save Changes" : "Create Project"}</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// --- MEMBER DIALOG ---
export function MemberDialog({ divisionId, divisionSlug, data }: { divisionId?: string, divisionSlug: string, data?: any }) {
  const [open, setOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState(data?.imageUrl || "");
  const isEdit = !!data;

  const handleSubmit = async (formData: FormData) => {
    if (!imageUrl) {
        toast.error("Please upload a photo");
        return;
    }
    formData.set("imageUrl", imageUrl);
    formData.set("divisionSlug", divisionSlug);

    if (isEdit) {
      formData.set("id", data.id);
      await updateMember(formData);
      toast.success("Member updated!");
    } else {
      formData.set("divisionId", divisionId!);
      await createMember(formData);
      toast.success("Member added!");
    }
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {isEdit ? (
          <Button variant="ghost" size="sm" className="w-full justify-start font-normal text-sm px-2">Edit Details</Button>
        ) : (
          <Button><Plus className="mr-2 h-4 w-4" /> Add Member</Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit Member" : "Add New Member"}</DialogTitle>
        </DialogHeader>
        <form action={handleSubmit} className="flex flex-col gap-4 mt-4">
          <div className="flex justify-center">
             <div className="w-48">
                <ImageUploader value={imageUrl} onChange={setImageUrl} className="h-48 w-48 rounded-xl" />
             </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input name="name" placeholder="Full Name" defaultValue={data?.name} required />
            <Input name="role" placeholder="Role" defaultValue={data?.role} required />
          </div>
          
          <div className="space-y-3">
             <div className="relative">
                <Github className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input name="github" placeholder="GitHub URL (Optional)" defaultValue={data?.github || ""} className="pl-9" />
             </div>
             <div className="relative">
                <Linkedin className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input name="linkedin" placeholder="LinkedIn URL (Optional)" defaultValue={data?.linkedin || ""} className="pl-9" />
             </div>
          </div>
          
          <Button type="submit" className="w-full">{isEdit ? "Save Changes" : "Add Member"}</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// --- ACHIEVEMENT DIALOG ---
export function AchievementDialog({ divisionId, divisionSlug, data }: { divisionId?: string, divisionSlug: string, data?: any }) {
  const [open, setOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState(data?.imageUrl || "");
  const isEdit = !!data;

  const handleSubmit = async (formData: FormData) => {
    if (!imageUrl) {
        toast.error("Please upload an image");
        return;
    }
    formData.set("imageUrl", imageUrl);
    formData.set("divisionSlug", divisionSlug);

    if (isEdit) {
      formData.set("id", data.id);
      await updateAchievement(formData);
      toast.success("Achievement updated!");
    } else {
      formData.set("divisionId", divisionId!);
      await createAchievement(formData);
      toast.success("Achievement added!");
    }
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {isEdit ? (
          <Button variant="outline" size="icon" className="h-8 w-8"><Pencil className="h-4 w-4" /></Button>
        ) : (
          <Button><Plus className="mr-2 h-4 w-4" /> Add Achievement</Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit Achievement" : "Add Achievement"}</DialogTitle>
        </DialogHeader>
        <form action={handleSubmit} className="flex flex-col gap-4 mt-4">
          <ImageUploader value={imageUrl} onChange={setImageUrl} className="h-40" />
          <div className="grid grid-cols-2 gap-4">
            <Input name="title" placeholder="Title" defaultValue={data?.title} required />
            <Input name="date" placeholder="Date" defaultValue={data?.date} required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input name="issuer" placeholder="Issuer" defaultValue={data?.issuer} required />
            <Input name="winner" placeholder="Winner" defaultValue={data?.winner} required />
          </div>
          <Textarea name="description" placeholder="Description" defaultValue={data?.description} required />
          <Button type="submit" className="w-full">{isEdit ? "Save Changes" : "Add Achievement"}</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}