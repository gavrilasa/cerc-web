"use client";

import { useState, useRef } from "react";
import { UploadCloud, X, Loader2 } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface ImageUploaderProps {
  value?: string;
  onChange: (url: string) => void;
  disabled?: boolean;
  className?: string;
}

export function ImageUploader({ value, onChange, disabled, className }: ImageUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File is too large (max 5MB)");
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Upload failed");
      }
      
      const data = await res.json();
      onChange(data.url);
      toast.success("Image uploaded successfully");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to upload image");
    } finally {
      setIsUploading(false);
    }
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = () => setIsDragging(false);

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files?.[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleButtonClick = (e: React.MouseEvent) => {
    e.preventDefault();
    inputRef.current?.click();
  };

  const wrapperClass = cn(
    "relative flex flex-col items-center justify-center overflow-hidden rounded-lg border-2 border-dashed transition-all duration-200",
    "h-48 w-full",
    // Neutral styling for drag state (NO BLUE)
    isDragging 
      ? "border-neutral-900 bg-neutral-50 dark:border-neutral-100 dark:bg-neutral-800" 
      : "border-neutral-200 bg-neutral-50/50 dark:border-neutral-800 dark:bg-neutral-900/50",
    (disabled || isUploading) && "opacity-50 pointer-events-none",
    className 
  );

  if (value) {
    return (
      <div className={cn("relative h-48 w-full overflow-hidden rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-100", className)}>
        <Image src={value} alt="Preview" fill className="object-cover" />
        <Button
          type="button"
          variant="destructive"
          size="icon"
          className="absolute top-2 right-2 h-7 w-7 rounded-full shadow-md z-10"
          onClick={() => onChange("")}
          disabled={disabled || isUploading}
        >
          <X className="h-3 w-3" />
        </Button>
      </div>
    );
  }

  return (
    <div
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      className={wrapperClass}
    >
      {isUploading ? (
        <Loader2 className="h-8 w-8 animate-spin text-neutral-400" />
      ) : (
        <>
          <div className="flex flex-col items-center gap-2 text-center p-4">
            <div className="rounded-full bg-white dark:bg-neutral-900 p-2 shadow-sm border border-neutral-200 dark:border-neutral-800">
               <UploadCloud className="h-5 w-5 text-neutral-400" />
            </div>
            <div className="text-center space-y-1">
              <p className="text-xs font-medium text-neutral-500">Drag image here</p>
            </div>
          </div>
          
          <Button 
            type="button" 
            variant="secondary" 
            size="sm" 
            onClick={handleButtonClick}
            className="h-8 text-xs bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 shadow-sm hover:bg-neutral-100"
          >
            Select Image
          </Button>

          <input
            ref={inputRef}
            type="file"
            className="hidden" 
            accept="image/*"
            onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
            disabled={disabled || isUploading}
          />
        </>
      )}
    </div>
  );
}