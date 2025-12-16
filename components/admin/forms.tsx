"use client";

import { useState } from "react";
import { ImageUploader } from "@/components/ui/image-uploader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";
import { createProject, createMember, createAchievement } from "@/app/actions/cms";
import { toast } from "sonner";

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
    setImageUrl(""); // Reset image
  };

  return (
    <form action={handleSubmit} className="flex flex-col gap-4">
      <input type="hidden" name="divisionId" value={divisionId} />
      <input type="hidden" name="divisionSlug" value={divisionSlug} />
      
      <div className="grid gap-2">
        <label className="text-sm font-medium">Cover Image</label>
        {/* Constrained height for projects */}
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
         {/* Square, smaller uploader for profiles */}
         <div className="shrink-0">
            <label className="text-sm font-medium mb-2 block">Photo</label>
            <ImageUploader 
                value={imageUrl} 
                onChange={setImageUrl} 
                className="h-32 w-32 rounded-full" 
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