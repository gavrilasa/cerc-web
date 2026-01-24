"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

interface PaginationControlProps {
  totalCount: number;
  pageSize: number;
  paramName?: string;
}

export function PaginationControl({ 
  totalCount, 
  pageSize, 
  paramName = "page" 
}: PaginationControlProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const currentPage = Number(searchParams.get(paramName)) || 1;
  const totalPages = Math.ceil(totalCount / pageSize);

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(paramName, newPage.toString());
    router.push(`?${params.toString()}`);
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 py-4">
      <div className="text-xs text-muted-foreground font-medium">
        Showing page <span className="text-foreground">{currentPage}</span> of <span className="text-foreground">{totalPages}</span>
      </div>
      
      <div className="flex items-center gap-1">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          disabled={currentPage <= 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Previous Page</span>
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          disabled={currentPage >= totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          <ChevronRight className="h-4 w-4" />
          <span className="sr-only">Next Page</span>
        </Button>
      </div>
    </div>
  );
}