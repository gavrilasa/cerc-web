"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowUpDown } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

export function SortControl() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentSort = searchParams.get("sort") || "desc";

  const handleSort = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", value);
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-muted-foreground font-medium hidden sm:inline-block">Sort by:</span>
      <Select value={currentSort} onValueChange={handleSort}>
        <SelectTrigger className="w-[130px] h-9 text-xs bg-background border-input">
          <ArrowUpDown className="mr-2 h-3.5 w-3.5 text-muted-foreground" />
          <SelectValue placeholder="Sort" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="desc">Latest</SelectItem>
          <SelectItem value="asc">Oldest</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}