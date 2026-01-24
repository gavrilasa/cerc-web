"use client";

import { FolderCardGrid } from "@/components/folder-card";

// Re-export the FolderCardGrid as DivisionsTabs for backward compatibility
export function DivisionsTabs({ divisions }: { divisions: any[] }) {
  return <FolderCardGrid divisions={divisions} />;
}

// Also export as DivisionsFolderCards for flexibility
export const DivisionsFolderCards = DivisionsTabs;