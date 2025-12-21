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
  return (
    <div className={cn("mb-16", className)}>
      <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-[0.9] mb-6 dark:text-white text-neutral-900">
        {title} <br />
        {highlight && <span className="text-[#C6A675]">{highlight}</span>}
      </h2>
      {description && (
        <p className="text-lg text-neutral-500 dark:text-neutral-400 max-w-xl leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
};