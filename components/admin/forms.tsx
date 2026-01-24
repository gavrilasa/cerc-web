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
  updateTechStack,
  createDivision, 
  updateDivision 
} from "@/app/actions/cms";
import { toast } from "sonner";

// Helper component for optional label
function OptionalLabel({ children, optional = false }: { children: React.ReactNode; optional?: boolean }) {
  return (
    <Label className="flex items-center gap-2">
      {children}
      {optional && <span className="text-[10px] text-muted-foreground font-normal">(Optional)</span>}
    </Label>
  );
}

// Icon options for divisions
import { AppWindow, Network, Cpu, Clapperboard, FolderKanban, Gamepad2, Database, Globe, Shield, Smartphone, Code, Server, Layers, Palette, Camera, Music, Video, Zap, Brain, Bot, type LucideIcon } from "lucide-react";

const DIVISION_ICONS: { name: string; icon: LucideIcon; label: string }[] = [
  { name: "FolderKanban", icon: FolderKanban, label: "Folder" },
  { name: "AppWindow", icon: AppWindow, label: "Software" },
  { name: "Network", icon: Network, label: "Network" },
  { name: "Cpu", icon: Cpu, label: "Hardware" },
  { name: "Clapperboard", icon: Clapperboard, label: "Multimedia" },
  { name: "Gamepad2", icon: Gamepad2, label: "Gaming" },
  { name: "Database", icon: Database, label: "Database" },
  { name: "Globe", icon: Globe, label: "Web" },
  { name: "Shield", icon: Shield, label: "Security" },
  { name: "Smartphone", icon: Smartphone, label: "Mobile" },
  { name: "Code", icon: Code, label: "Coding" },
  { name: "Server", icon: Server, label: "Server" },
  { name: "Layers", icon: Layers, label: "Design" },
  { name: "Palette", icon: Palette, label: "Art" },
  { name: "Camera", icon: Camera, label: "Photo" },
  { name: "Music", icon: Music, label: "Audio" },
  { name: "Video", icon: Video, label: "Video" },
  { name: "Zap", icon: Zap, label: "Power" },
  { name: "Brain", icon: Brain, label: "AI" },
  { name: "Video", icon: Video, label: "Video" },
  { name: "Zap", icon: Zap, label: "Power" },
  { name: "Brain", icon: Brain, label: "AI" },
  { name: "Bot", icon: Bot, label: "Robotics" },
];

interface FormDataLike {
  id?: string;
  title?: string;
  slug?: string;
  iconName?: string;
  description?: string;
  divisionId?: string;
  imageUrl?: string;
  tags?: string[];
  githubUrl?: string;
  demoUrl?: string;
  name?: string;
  role?: string;
  github?: string;
  linkedin?: string;
  date?: string;
  issuer?: string;
  winner?: string;
  linkUrl?: string;
  websiteUrl?: string;
  [key: string]: unknown;
}

// --- DIVISION FORM ---
export function DivisionForm({ onSuccess, data }: { onSuccess?: () => void, data?: unknown }) {
  const isEditing = !!data;

  async function handleSubmit(formData: FormData) {
    if (isEditing) {
        formData.append("id", (data as FormDataLike).id || "");
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
                <OptionalLabel>Title</OptionalLabel>
                <Input name="title" placeholder="e.g. Software Engineering" defaultValue={(data as FormDataLike)?.title} required />
            </div>
            <div className="space-y-2">
                <OptionalLabel>Slug</OptionalLabel>
                <Input name="slug" placeholder="e.g. software" defaultValue={(data as FormDataLike)?.slug} required />
            </div>
        </div>
        
        <div className="space-y-2">
            <OptionalLabel>Icon</OptionalLabel>
            <Select name="iconName" defaultValue={(data as FormDataLike)?.iconName || "FolderKanban"}>
                <SelectTrigger>
                  <SelectValue placeholder="Select an icon" />
                </SelectTrigger>
                <SelectContent>
                    {DIVISION_ICONS.map((item) => {
                      const IconComp = item.icon;
                      return (
                        <SelectItem key={item.name} value={item.name}>
                          <div className="flex items-center gap-2">
                            <IconComp size={16} />
                            <span>{item.label}</span>
                          </div>
                        </SelectItem>
                      );
                    })}
                </SelectContent>
            </Select>
        </div>

        <div className="space-y-2">
            <OptionalLabel>Description</OptionalLabel>
            <Textarea name="description" placeholder="Brief description of the division..." defaultValue={(data as FormDataLike)?.description} required />
        </div>

        <Button type="submit" className="w-full">{isEditing ? "Save Changes" : "Create Division"}</Button>
    </form>
  );
}

// --- PROJECT FORM ---
export function ProjectForm({ divisions, closeDialog, data }: { divisions: { id: string; title: string }[], closeDialog: () => void, data?: unknown }) {
  const [imageUrl, setImageUrl] = useState((data as FormDataLike)?.imageUrl || "");
  const isEditing = !!data;

  async function handleSubmit(formData: FormData) {
    if (!imageUrl) { toast.error("Image required"); return; }
    formData.append("imageUrl", imageUrl);
    
    if (isEditing) {
        formData.append("id", (data as FormDataLike).id || "");
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
        <OptionalLabel>Division</OptionalLabel>
        <Select name="divisionId" defaultValue={(data as FormDataLike)?.divisionId} required>
            <SelectTrigger><SelectValue placeholder="Select a division" /></SelectTrigger>
            <SelectContent>
                {divisions.map((d: { id: string; title: string }) => (
                    <SelectItem key={d.id} value={d.id}>{d.title}</SelectItem>
                ))}
            </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <OptionalLabel>Cover Image</OptionalLabel>
        <ImageUploader onUploadComplete={setImageUrl} defaultValue={imageUrl} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
            <OptionalLabel>Title</OptionalLabel>
            <Input name="title" placeholder="e.g. Smart Home App" defaultValue={(data as FormDataLike)?.title} required />
        </div>
        <div className="space-y-2">
            <OptionalLabel>Tags</OptionalLabel>
            <Input name="tags" defaultValue={(data as FormDataLike)?.tags?.join(", ")} placeholder="e.g. React, Node.js, AI" required />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
            <OptionalLabel optional>GitHub URL</OptionalLabel>
            <Input name="githubUrl" defaultValue={(data as FormDataLike)?.githubUrl} placeholder="https://github.com/..." />
        </div>
        <div className="space-y-2">
            <OptionalLabel optional>Demo URL</OptionalLabel>
            <Input name="demoUrl" defaultValue={(data as FormDataLike)?.demoUrl} placeholder="https://demo.example.com" />
        </div>
      </div>

      <div className="space-y-2">
        <OptionalLabel>Description</OptionalLabel>
        <Textarea name="description" placeholder="Describe the project, its features, and technologies used..." defaultValue={(data as FormDataLike)?.description} required />
      </div>

      <Button type="submit" className="w-full">{isEditing ? "Save Changes" : "Create Project"}</Button>
    </form>
  );
}

// --- MEMBER FORM ---
export function MemberForm({ divisions, closeDialog, data }: { divisions: { id: string; title: string }[], closeDialog: () => void, data?: unknown }) {
  const [imageUrl, setImageUrl] = useState((data as FormDataLike)?.imageUrl || "");
  const isEditing = !!data;
  
  async function handleSubmit(formData: FormData) {
    if (!imageUrl) { toast.error("Image required"); return; }
    formData.append("imageUrl", imageUrl);

    if (isEditing) {
        formData.append("id", (data as FormDataLike).id || "");
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
      <div className="space-y-2">
        <OptionalLabel>Photo</OptionalLabel>
        <ImageUploader onUploadComplete={setImageUrl} defaultValue={imageUrl} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <OptionalLabel>Division</OptionalLabel>
          <Select name="divisionId" defaultValue={(data as FormDataLike)?.divisionId} required>
              <SelectTrigger><SelectValue placeholder="Select a division" /></SelectTrigger>
              <SelectContent>
                  {divisions.map((d: { id: string; title: string }) => (
                      <SelectItem key={d.id} value={d.id}>{d.title}</SelectItem>
                  ))}
              </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
           <OptionalLabel>Full Name</OptionalLabel>
           <Input name="name" placeholder="e.g. John Doe" defaultValue={(data as FormDataLike)?.name} required />
        </div>
      </div>

      <div className="space-y-2">
          <OptionalLabel>Role</OptionalLabel>
          <Input name="role" defaultValue={(data as FormDataLike)?.role} placeholder="e.g. Head of Division, Member" required />
      </div>

      <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <OptionalLabel optional>GitHub Username</OptionalLabel>
            <Input name="github" defaultValue={(data as FormDataLike)?.github} placeholder="https://github.com/username" />
          </div>
          <div className="space-y-2">
            <OptionalLabel optional>LinkedIn Profile</OptionalLabel>
            <Input name="linkedin" defaultValue={(data as FormDataLike)?.linkedin} placeholder="https://linkedin.com/in/..." />
          </div>
      </div>

      <Button type="submit" className="w-full">{isEditing ? "Save Changes" : "Add Member"}</Button>
    </form>
  );
}

// --- ACHIEVEMENT FORM ---
export function AchievementForm({ divisions, closeDialog, data }: { divisions: { id: string; title: string }[], closeDialog: () => void, data?: unknown }) {
  const [imageUrl, setImageUrl] = useState((data as FormDataLike)?.imageUrl || "");
  const isEditing = !!data;
  
  async function handleSubmit(formData: FormData) {
    if (!imageUrl) { toast.error("Image required"); return; }
    formData.append("imageUrl", imageUrl);

    if (isEditing) {
        formData.append("id", (data as FormDataLike).id || "");
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
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <OptionalLabel>Division</OptionalLabel>
          <Select name="divisionId" defaultValue={(data as FormDataLike)?.divisionId} required>
              <SelectTrigger><SelectValue placeholder="Select a division" /></SelectTrigger>
              <SelectContent>
                  {divisions.map((d: { id: string; title: string }) => (
                      <SelectItem key={d.id} value={d.id}>{d.title}</SelectItem>
                  ))}
              </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <OptionalLabel>Date</OptionalLabel>
          <Input name="date" defaultValue={(data as FormDataLike)?.date} placeholder="e.g. Nov 2024" required />
        </div>
      </div>

      <div className="space-y-2">
        <OptionalLabel>Evidence Image</OptionalLabel>
        <ImageUploader onUploadComplete={setImageUrl} defaultValue={imageUrl} />
      </div>

      <div className="space-y-2">
        <OptionalLabel>Title</OptionalLabel>
        <Input name="title" placeholder="e.g. 1st Place at Hackathon XYZ" defaultValue={(data as FormDataLike)?.title} required />
      </div>

      <div className="grid grid-cols-2 gap-4">
         <div className="space-y-2">
            <OptionalLabel>Issuer / Competition</OptionalLabel>
            <Input name="issuer" defaultValue={(data as FormDataLike)?.issuer} placeholder="e.g. Google, IEEE" required />
         </div>
         <div className="space-y-2">
            <OptionalLabel>Winner (Team/Person)</OptionalLabel>
            <Input name="winner" defaultValue={(data as FormDataLike)?.winner} placeholder="e.g. Team Alpha, John Doe" required />
         </div>
      </div>

      <div className="space-y-2">
        <OptionalLabel>Description</OptionalLabel>
        <Textarea name="description" placeholder="Describe the achievement, what was built, the competition..." defaultValue={(data as FormDataLike)?.description} required />
      </div>
      
      <div className="space-y-2">
        <OptionalLabel optional>Link URL</OptionalLabel>
        <Input name="linkUrl" defaultValue={(data as FormDataLike)?.linkUrl} placeholder="https://certificate.example.com" />
      </div>

      <Button type="submit" className="w-full">{isEditing ? "Save Changes" : "Add Achievement"}</Button>
    </form>
  );
}

// --- TECH STACK FORM ---
export function TechStackForm({ divisions, closeDialog, data }: { divisions: { id: string; title: string }[], closeDialog: () => void, data?: unknown }) {
  const [imageUrl, setImageUrl] = useState((data as FormDataLike)?.imageUrl || "");
  const isEditing = !!data;

  async function handleSubmit(formData: FormData) {
    if (!imageUrl) { toast.error("Logo required"); return; }
    formData.append("imageUrl", imageUrl);
    
    if (isEditing) {
      formData.append("id", (data as FormDataLike).id || "");
      await updateTechStack(formData);
      toast.success("Tech updated");
    } else {
      await createTechStack(formData);
      toast.success("Tech added");
    }
    closeDialog();
  }

  return (
    <form action={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <OptionalLabel>Division</OptionalLabel>
        <Select name="divisionId" defaultValue={(data as FormDataLike)?.divisionId} required>
            <SelectTrigger><SelectValue placeholder="Select a division" /></SelectTrigger>
            <SelectContent>
                {divisions.map((d: { id: string; title: string }) => (
                    <SelectItem key={d.id} value={d.id}>{d.title}</SelectItem>
                ))}
            </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
         <OptionalLabel>Logo</OptionalLabel>
         <ImageUploader onUploadComplete={setImageUrl} defaultValue={imageUrl} />
      </div>
      
      <div className="space-y-2">
         <OptionalLabel>Technology Name</OptionalLabel>
         <Input name="name" defaultValue={(data as FormDataLike)?.name} placeholder="e.g. React, Python, Docker" required />
      </div>
      
      <div className="space-y-2">
         <OptionalLabel optional>Website URL</OptionalLabel>
         <Input name="websiteUrl" defaultValue={(data as FormDataLike)?.websiteUrl} placeholder="https://reactjs.org" />
      </div>

      <Button type="submit" className="w-full">{isEditing ? "Save Changes" : "Add Technology"}</Button>
    </form>
  );
}