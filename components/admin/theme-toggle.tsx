"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";

export function SidebarThemeToggle() {
  const { setTheme, theme } = useTheme();
  // State untuk menghindari hydration mismatch
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <SidebarMenuItem>
        <SidebarMenuButton>
          <span className="size-4" />
          <span className="opacity-0">Theme</span>
        </SidebarMenuButton>
      </SidebarMenuItem>
    );
  }

  const isDark = theme === "dark";

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        onClick={() => setTheme(isDark ? "light" : "dark")}
        tooltip="Toggle Theme"
      >
        {isDark ? <Moon /> : <Sun />}
        <span>{isDark ? "Dark Mode" : "Light Mode"}</span>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}