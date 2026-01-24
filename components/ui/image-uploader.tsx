"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload, X, Link, Image as ImageIcon } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface ImageUploaderProps {
  onUploadComplete: (url: string) => void;
  defaultValue?: string;
}

type UploadMode = "file" | "url";

export function ImageUploader({ onUploadComplete, defaultValue = "" }: ImageUploaderProps) {
  const [preview, setPreview] = useState(defaultValue);
  const [isUploading, setIsUploading] = useState(false);
  const [mode, setMode] = useState<UploadMode>("file");
  const [urlInput, setUrlInput] = useState("");

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    // 1. Create local preview
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
    setIsUploading(true);

    try {
      // 2. Upload to API
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed");

      const data = await res.json();
      
      // 3. Pass URL back to parent form
      onUploadComplete(data.url);
      toast.success("Image uploaded!");
    } catch (error) {
      console.error(error);
      toast.error("Upload failed");
      setPreview(""); // Reset on error
    } finally {
      setIsUploading(false);
    }
  }

  function handleUrlSubmit() {
    if (!urlInput.trim()) {
      toast.error("Please enter a valid URL");
      return;
    }
    
    // Basic URL validation
    try {
      new URL(urlInput);
    } catch {
      toast.error("Invalid URL format");
      return;
    }
    
    setPreview(urlInput);
    onUploadComplete(urlInput);
    toast.success("Image URL added!");
  }

  function handleRemove() {
    setPreview("");
    setUrlInput("");
    onUploadComplete("");
  }

  if (preview) {
    return (
      <div className="relative w-full h-40 rounded-lg overflow-hidden border border-border group bg-muted">
        <Image src={preview} alt="Preview" fill className="object-cover" />
        <button
          type="button"
          onClick={handleRemove}
          className="absolute top-2 right-2 p-1.5 bg-destructive text-destructive-foreground rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <X size={14} />
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* Mode Tabs */}
      <div className="flex gap-1 p-1 bg-muted rounded-lg">
        <button
          type="button"
          onClick={() => setMode("file")}
          className={cn(
            "flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-md text-xs font-medium transition-all",
            mode === "file" 
              ? "bg-background text-foreground shadow-sm" 
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <Upload size={12} />
          Upload File
        </button>
        <button
          type="button"
          onClick={() => setMode("url")}
          className={cn(
            "flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-md text-xs font-medium transition-all",
            mode === "url" 
              ? "bg-background text-foreground shadow-sm" 
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <Link size={12} />
          Paste URL
        </button>
      </div>

      {/* File Upload */}
      {mode === "file" && (
        <label className="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
          <div className="flex flex-col items-center justify-center py-4">
            <ImageIcon className="w-6 h-6 mb-1.5 text-muted-foreground" />
            <p className="text-xs text-muted-foreground">
              {isUploading ? "Uploading..." : "Click to upload or drag & drop"}
            </p>
            <p className="text-[10px] text-muted-foreground/70 mt-0.5">PNG, JPG up to 5MB</p>
          </div>
          <input 
            type="file" 
            className="hidden" 
            accept="image/*"
            onChange={handleFileChange}
            disabled={isUploading}
          />
        </label>
      )}

      {/* URL Input */}
      {mode === "url" && (
        <div className="flex gap-2">
          <Input
            type="url"
            placeholder="https://example.com/image.jpg"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            className="flex-1 h-9 text-sm"
          />
          <Button 
            type="button" 
            size="sm"
            onClick={handleUrlSubmit}
            className="h-9"
          >
            Add
          </Button>
        </div>
      )}
    </div>
  );
}