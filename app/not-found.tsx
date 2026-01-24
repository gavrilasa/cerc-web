import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MoveLeft, Terminal, AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-background text-foreground p-4 font-mono">
      <div className="max-w-md w-full text-center space-y-8 animate-in fade-in zoom-in duration-500">
        
        {/* Decorative Icon Ring */}
        <div className="relative mx-auto w-32 h-32">
          <div className="absolute inset-0 rounded-full border-2 border-dashed border-muted animate-[spin_10s_linear_infinite]" />
          <div className="absolute inset-0 flex items-center justify-center">
             <div className="w-24 h-24 bg-muted/30 rounded-full flex items-center justify-center backdrop-blur-sm">
                <Terminal className="w-10 h-10 text-primary" />
             </div>
          </div>
        </div>

        {/* Glitchy/Bold Title */}
        <div className="space-y-2">
            <h1 className="text-8xl font-black tracking-tighter text-foreground/90">
              404
            </h1>
            <div className="flex items-center justify-center gap-2 text-destructive font-bold uppercase tracking-widest text-sm">
                <AlertCircle size={14} />
                <span>System Error</span>
            </div>
        </div>
        
        {/* Descriptive Message */}
        <div className="space-y-2 max-w-[300px] mx-auto">
            <h2 className="text-xl font-bold">Page Not Found</h2>
            <p className="text-muted-foreground text-xs leading-relaxed">
                The path you are trying to access does not exist in the current directory structure.
            </p>
        </div>

        {/* Navigation Action */}
        <div className="pt-4">
            <Button asChild className="rounded-full px-8 h-12 font-bold" size="lg">
                <Link href="/">
                    <MoveLeft className="mr-2 h-4 w-4" /> cd /home
                </Link>
            </Button>
        </div>
      </div>
    </div>
  );
}