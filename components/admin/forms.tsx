"use client";

import { useState } from "react";
import { ImageUploader } from "@/components/ui/image-uploader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  createProject, 
  updateProject, 
  createMember, 
  updateMember, 
  createAchievement, 
  updateAchievement, 
  createTechStack, 
  createDivision, 
  updateDivision 
} from "@/app/actions/cms";
import { toast } from "sonner";

// --- DIVISION FORM ---
export function DivisionForm({ onSuccess, data }: { onSuccess?: () => void, data?: any }) {
  const isEditing = !!data;

  async function handleSubmit(formData: FormData) {
    if (isEditing) {
        formData.append("id", data.id);
        await updateDivision(formData);
        toast.success("Division updated");
    } else {
        await createDivision(formData);
        toast.success("Division created");
    }
    if (onSuccess) onSuccess();
  }

  return (
    <form action={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
                <Label>Title</Label>
                <Input name="title" placeholder="Software Engineering" defaultValue={data?.title} required />
            </div>
            <div className="space-y-2">
                <Label>Slug</Label>
                <Input name="slug" placeholder="software" defaultValue={data?.slug} required />
            </div>
        </div>
        
        <div className="space-y-2">
            <Label>Icon Name</Label>
            <Input name="iconName" placeholder="AppWindow, Network, Cpu..." defaultValue={data?.iconName} />
            <p className="text-[10px] text-muted-foreground">Matches Lucide React icon names</p>
        </div>

        <div className="space-y-2">
            <Label>Description</Label>
            <Textarea name="description" placeholder="Short description..." defaultValue={data?.description} required />
        </div>

        <Button type="submit" className="w-full">{isEditing ? "Save Changes" : "Create Division"}</Button>
    </form>
  );
}

// --- PROJECT FORM ---
export function ProjectForm({ divisions, closeDialog, data }: { divisions: any[], closeDialog: () => void, data?: any }) {
  const [imageUrl, setImageUrl] = useState(data?.imageUrl || "");
  const isEditing = !!data;

  async function handleSubmit(formData: FormData) {
    if (!imageUrl) { toast.error("Image required"); return; }
    formData.append("imageUrl", imageUrl);
    
    if (isEditing) {
        formData.append("id", data.id);
        await updateProject(formData);
        toast.success("Project updated");
    } else {
        await createProject(formData);
        toast.success("Project created");
    }
    closeDialog();
  }

  return (
    <form action={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label>Division</Label>
        <Select name="divisionId" defaultValue={data?.divisionId} required>
            <SelectTrigger><SelectValue placeholder="Select Division" /></SelectTrigger>
            <SelectContent>
                {divisions.map((d: any) => (
                    <SelectItem key={d.id} value={d.id}>{d.title}</SelectItem>
                ))}
            </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Cover Image</Label>
        {/* Fix: Removed 'value' prop, only using 'defaultValue' and 'onUploadComplete' */}
        <ImageUploader onUploadComplete={setImageUrl} defaultValue={imageUrl} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
            <Label>Title</Label>
            <Input name="title" defaultValue={data?.title} required />
        </div>
        <div className="space-y-2">
            <Label>Tags</Label>
            <Input name="tags" defaultValue={data?.tags?.join(", ")} placeholder="React, AI, IoT" required />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
            <Label>GitHub URL</Label>
            <Input name="githubUrl" defaultValue={data?.githubUrl} placeholder="https://github.com/..." />
        </div>
        <div className="space-y-2">
            <Label>Demo URL</Label>
            <Input name="demoUrl" defaultValue={data?.demoUrl} placeholder="https://..." />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Description</Label>
        <Textarea name="description" defaultValue={data?.description} required />
      </div>

      <Button type="submit" className="w-full">{isEditing ? "Save Changes" : "Create Project"}</Button>
    </form>
  );
}

// --- MEMBER FORM ---
export function MemberForm({ divisions, closeDialog, data }: { divisions: any[], closeDialog: () => void, data?: any }) {
  const [imageUrl, setImageUrl] = useState(data?.imageUrl || "");
  const isEditing = !!data;
  
  async function handleSubmit(formData: FormData) {
    if (!imageUrl) { toast.error("Image required"); return; }
    formData.append("imageUrl", imageUrl);

    if (isEditing) {
        formData.append("id", data.id);
        await updateMember(formData);
        toast.success("Member updated");
    } else {
        await createMember(formData);
        toast.success("Member added");
    }
    closeDialog();
  }

  return (
    <form action={handleSubmit} className="space-y-4">
      <div className="flex gap-4">
          <div className="w-1/3 space-y-2">
             <Label>Photo</Label>
             <ImageUploader onUploadComplete={setImageUrl} defaultValue={imageUrl} />
          </div>
          <div className="w-2/3 space-y-4">
             <div className="space-y-2">
                <Label>Division</Label>
                <Select name="divisionId" defaultValue={data?.divisionId} required>
                    <SelectTrigger><SelectValue placeholder="Select Division" /></SelectTrigger>
                    <SelectContent>
                        {divisions.map((d: any) => (
                            <SelectItem key={d.id} value={d.id}>{d.title}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
             </div>
             <div className="space-y-2">
                <Label>Full Name</Label>
                <Input name="name" defaultValue={data?.name} required />
             </div>
          </div>
      </div>

      <div className="space-y-2">
          <Label>Role</Label>
          <Input name="role" defaultValue={data?.role} placeholder="e.g. Head of Division" required />
      </div>

      <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>GitHub</Label>
            <Input name="github" defaultValue={data?.github} />
          </div>
          <div className="space-y-2">
            <Label>LinkedIn</Label>
            <Input name="linkedin" defaultValue={data?.linkedin} />
          </div>
      </div>

      <Button type="submit" className="w-full">{isEditing ? "Save Changes" : "Add Member"}</Button>
    </form>
  );
}

// --- ACHIEVEMENT FORM ---
export function AchievementForm({ divisions, closeDialog, data }: { divisions: any[], closeDialog: () => void, data?: any }) {
  const [imageUrl, setImageUrl] = useState(data?.imageUrl || "");
  const isEditing = !!data;
  
  async function handleSubmit(formData: FormData) {
    if (!imageUrl) { toast.error("Image required"); return; }
    formData.append("imageUrl", imageUrl);

    if (isEditing) {
        formData.append("id", data.id);
        await updateAchievement(formData);
        toast.success("Achievement updated");
    } else {
        await createAchievement(formData);
        toast.success("Achievement added");
    }
    closeDialog();
  }

  return (
    <form action={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label>Division</Label>
        <Select name="divisionId" defaultValue={data?.divisionId} required>
            <SelectTrigger><SelectValue placeholder="Select Division" /></SelectTrigger>
            <SelectContent>
                {divisions.map((d: any) => (
                    <SelectItem key={d.id} value={d.id}>{d.title}</SelectItem>
                ))}
            </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Evidence Image</Label>
        <ImageUploader onUploadComplete={setImageUrl} defaultValue={imageUrl} />
      </div>

      <div className="space-y-2">
        <Label>Title</Label>
        <Input name="title" defaultValue={data?.title} required />
      </div>

      <div className="space-y-2">
        <Label>Description</Label>
        <Textarea name="description" defaultValue={data?.description} required />
      </div>

      <div className="grid grid-cols-2 gap-4">
         <div className="space-y-2">
            <Label>Date</Label>
            <Input name="date" defaultValue={data?.date} placeholder="Nov 2024" required />
         </div>
         <div className="space-y-2">
            <Label>Issuer</Label>
            <Input name="issuer" defaultValue={data?.issuer} placeholder="e.g. Google" required />
         </div>
      </div>

      <div className="space-y-2">
        <Label>Winner (Team/Person)</Label>
        <Input name="winner" defaultValue={data?.winner} required />
      </div>

      <Button type="submit" className="w-full">{isEditing ? "Save Changes" : "Add Achievement"}</Button>
    </form>
  );
}

// --- TECH STACK FORM ---
export function TechStackForm({ divisions, closeDialog, data }: { divisions: any[], closeDialog: () => void, data?: any }) {
  const [imageUrl, setImageUrl] = useState(data?.imageUrl || "");
  
  // TechStack is mostly create/delete, so we ignore updating for now to simplify
  // If you need update, you can uncomment and use 'isEditing' logic similar to above.

  async function handleSubmit(formData: FormData) {
    if (!imageUrl) { toast.error("Logo required"); return; }
    formData.append("imageUrl", imageUrl);
    
    await createTechStack(formData);
    toast.success("Tech added");
    closeDialog();
  }

  return (
    <form action={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label>Division</Label>
        <Select name="divisionId" defaultValue={data?.divisionId} required>
            <SelectTrigger><SelectValue placeholder="Select Division" /></SelectTrigger>
            <SelectContent>
                {divisions.map((d: any) => (
                    <SelectItem key={d.id} value={d.id}>{d.title}</SelectItem>
                ))}
            </SelectContent>
        </Select>
      </div>

      <div className="flex gap-4 items-start">
          <div className="w-1/3 space-y-2">
             <Label>Logo</Label>
             <ImageUploader onUploadComplete={setImageUrl} defaultValue={imageUrl} />
          </div>
          <div className="w-2/3 space-y-4">
             <div className="space-y-2">
                <Label>Technology Name</Label>
                <Input name="name" defaultValue={data?.name} placeholder="e.g. React" required />
             </div>
             <div className="space-y-2">
                <Label>Website URL</Label>
                <Input name="websiteUrl" defaultValue={data?.websiteUrl} placeholder="https://..." />
             </div>
          </div>
      </div>

      <Button type="submit" className="w-full">Add Technology</Button>
    </form>
  );
}