import { cn } from "@/lib/utils";

export const SectionHeader = ({ 
  title, 
  highlight, 
  description, 
  className 
}: { 
  title: string; 
  highlight?: string; 
  description?: string;
  className?: string;
}) => {
  const isCentered = className?.includes("text-center");
  
  return (
    <div className={cn("mb-6 md:mb-8", className)}>
      <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-foreground">
        {title}
        {highlight && <span className="text-[#C6A675] ml-2">{highlight}</span>}
      </h2>
      {description && (
        <p className={cn(
          "text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed",
          isCentered && "mx-auto"
        )}>
          {description}
        </p>
      )}
    </div>
  );
};