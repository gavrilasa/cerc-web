"use client";

import { useState } from "react";
import { ImageUploader } from "@/components/ui/image-uploader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";
import { 
  createProject, 
  createMember, 
  createAchievement, 
  createDivision,
  updateDivision 
} from "@/app/actions/cms";
import { toast } from "sonner";

// Define Data Interface
interface DivisionData {
  id: string;
  title: string;
  slug: string;
  description: string;
  iconName: string;
}

// --- Division Form (Create & Edit) ---
export function DivisionForm({ 
  onSuccess, 
  data 
}: { 
  onSuccess?: () => void, 
  data?: DivisionData // Optional: If present, we are in "Edit Mode"
}) {
  const isEditing = !!data;

  const handleSubmit = async (formData: FormData) => {
    const title = formData.get("title");
    const slug = formData.get("slug");
    
    if (!title || !slug) {
      toast.error("Title and Slug are required.");
      return;
    }

    if (isEditing) {
      await updateDivision(formData);
      toast.success("Division updated!");
    } else {
      await createDivision(formData);
      toast.success("Division created!");
    }
    
    if (onSuccess) onSuccess();
  };

  return (
    <form action={handleSubmit} className="flex flex-col gap-4">
      {isEditing && <input type="hidden" name="id" value={data.id} />}

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Title</label>
          <Input 
            name="title" 
            placeholder="e.g. Software Engineering" 
            defaultValue={data?.title} 
            required 
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Slug (URL)</label>
          <Input 
            name="slug" 
            placeholder="e.g. software" 
            defaultValue={data?.slug} 
            required 
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <label className="text-sm font-medium">Icon Name</label>
        <Input 
          name="iconName" 
          placeholder="e.g. Cpu, Network, AppWindow" 
          defaultValue={data?.iconName} 
        />
        <p className="text-[10px] text-muted-foreground">
          Options: AppWindow, Cpu, Network, Clapperboard, FolderKanban
        </p>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Description</label>
        <Textarea 
          name="description" 
          placeholder="Short description..." 
          defaultValue={data?.description} 
          required 
        />
      </div>

      <Button type="submit" className="w-full">
        <Plus className="mr-2 h-4 w-4" /> 
        {isEditing ? "Save Changes" : "Create Division"}
      </Button>
    </form>
  );
}

// --- Project Form ---
export function ProjectForm({ divisionId, divisionSlug }: { divisionId: string, divisionSlug: string }) {
  const [imageUrl, setImageUrl] = useState("");

  const handleSubmit = async (formData: FormData) => {
    if (!imageUrl) {
      toast.error("Please upload an image");
      return; 
    }
    formData.set("imageUrl", imageUrl);
    
    await createProject(formData);
    toast.success("Project added!");
    setImageUrl(""); 
  };

  return (
    <form action={handleSubmit} className="flex flex-col gap-4">
      <input type="hidden" name="divisionId" value={divisionId} />
      <input type="hidden" name="divisionSlug" value={divisionSlug} />
      
      <div className="grid gap-2">
        <label className="text-sm font-medium">Cover Image</label>
        <ImageUploader 
            value={imageUrl} 
            onChange={setImageUrl} 
            className="h-48 w-full max-w-md aspect-video" 
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Input name="title" placeholder="Project Title" required />
        <Input name="tags" placeholder="Tags (React, AI)" required />
      </div>
      <Textarea name="description" placeholder="Description" required />
      
      <Button type="submit" className="w-fit"><Plus className="mr-2 h-4 w-4" /> Create Project</Button>
    </form>
  );
}

// --- Member Form ---
export function MemberForm({ divisionId, divisionSlug }: { divisionId: string, divisionSlug: string }) {
  const [imageUrl, setImageUrl] = useState("");

  const handleSubmit = async (formData: FormData) => {
    if (!imageUrl) {
      toast.error("Please upload a photo");
      return;
    }
    formData.set("imageUrl", imageUrl);
    
    await createMember(formData);
    toast.success("Member added!");
    setImageUrl("");
  };

  return (
    <form action={handleSubmit} className="flex flex-col gap-4">
      <input type="hidden" name="divisionId" value={divisionId} />
      <input type="hidden" name="divisionSlug" value={divisionSlug} />
      
      <div className="flex gap-6 items-start">
         <div className="shrink-0">
            <label className="text-sm font-medium mb-2 block">Photo</label>
            <ImageUploader 
                value={imageUrl} 
                onChange={setImageUrl} 
                className="h-32 w-32" 
            />
         </div>
         
         <div className="flex-1 space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <Input name="name" placeholder="Full Name" required />
                <Input name="role" placeholder="Role" required />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <Input name="github" placeholder="GitHub URL" />
                <Input name="linkedin" placeholder="LinkedIn URL" />
            </div>
         </div>
      </div>
      <Button type="submit" className="w-fit self-end"><Plus className="mr-2 h-4 w-4" /> Add Member</Button>
    </form>
  );
}

// --- Achievement Form ---
export function AchievementForm({ divisionId, divisionSlug }: { divisionId: string, divisionSlug: string }) {
  const [imageUrl, setImageUrl] = useState("");

  const handleSubmit = async (formData: FormData) => {
    if (!imageUrl) {
      toast.error("Please upload an image");
      return;
    }
    formData.set("imageUrl", imageUrl);
    
    await createAchievement(formData);
    toast.success("Achievement added!");
    setImageUrl("");
  };

  return (
    <form action={handleSubmit} className="flex flex-col gap-4">
      <input type="hidden" name="divisionId" value={divisionId} />
      <input type="hidden" name="divisionSlug" value={divisionSlug} />
      
      <div className="grid gap-2">
        <label className="text-sm font-medium">Documentation</label>
        <ImageUploader 
            value={imageUrl} 
            onChange={setImageUrl} 
            className="h-40 w-full max-w-md" 
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
          <Input name="title" placeholder="Title" required />
          <Input name="date" placeholder="Date" required />
      </div>
      <div className="grid grid-cols-2 gap-4">
          <Input name="issuer" placeholder="Issuer" required />
          <Input name="winner" placeholder="Winner" required />
      </div>
      <Textarea name="description" placeholder="Description" required />
      
      <Button type="submit" className="w-fit"><Plus className="mr-2 h-4 w-4" /> Add Achievement</Button>
    </form>
  );
}