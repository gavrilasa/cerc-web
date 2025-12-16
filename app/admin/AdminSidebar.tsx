import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarHeader,
    SidebarFooter,
    SidebarRail,
  } from "@/components/ui/sidebar";
  import { 
    LayoutDashboard, 
    FolderKanban, 
    LogOut, 
    AppWindow,
    Cpu,
    Network,
    Clapperboard,
    LucideIcon,
    Globe
  } from "lucide-react";
  import Link from "next/link";
  import { prisma } from "@/lib/db";
  import { handleSignOut } from "@/app/actions/auth"; // Pastikan import action ini ada
  
  // Helper to map icon strings to components
  const iconMap: Record<string, LucideIcon> = {
    AppWindow, Network, Cpu, Clapperboard
  };
  
  export async function AdminSidebar() {
    // 1. Fetch Divisions for the Menu
    const divisions = await prisma.division.findMany({
      orderBy: { title: 'asc' },
      select: { title: true, slug: true, iconName: true }
    });
  
    return (
      <Sidebar collapsible="icon">
        <SidebarHeader>
          <div className="flex items-center gap-2 py-2">
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-neutral-900 text-white">
                <FolderKanban className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">CERC Admin</span>
                <span className="truncate text-xs">Content Manager</span>
              </div>
          </div>
        </SidebarHeader>
  
        <SidebarContent>
          {/* General Group */}
          <SidebarGroup>
            <SidebarGroupLabel>Platform</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild tooltip="Dashboard">
                    <Link href="/admin">
                      <LayoutDashboard />
                      <span>Overview</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild tooltip="View Live Site">
                    <Link href="/" target="_blank">
                      <Globe />
                      <span>View Website</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
  
          {/* Divisions Group - Dynamic */}
          <SidebarGroup>
            <SidebarGroupLabel>Divisions</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {divisions.map((div) => {
                  const Icon = iconMap[div.iconName] || FolderKanban;
                  return (
                    <SidebarMenuItem key={div.slug}>
                      <SidebarMenuButton asChild tooltip={div.title}>
                        <Link href={`/admin/divisions/${div.slug}`}>
                          <Icon />
                          <span>{div.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
  
        {/* --- TOMBOL SIGN OUT DI FOOTER --- */}
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <form action={handleSignOut} className="w-full">
                <SidebarMenuButton 
                  type="submit" 
                  tooltip="Sign Out"
                  className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/50"
                >
                  <LogOut />
                  <span>Sign Out</span>
                </SidebarMenuButton>
              </form>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
    );
  }