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
  Layers,
  Cpu,
  Trophy,
  Users,
  Globe,
  Settings
} from "lucide-react";
import Link from "next/link";
import { handleSignOut } from "@/app/actions/auth";
import { SidebarThemeToggle } from "@/components/admin/theme-toggle";

export async function AdminSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <div className="flex items-center gap-2 py-2">
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-neutral-900 text-white">
            <Settings className="size-4" />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">CERC Admin</span>
            <span className="truncate text-xs">Content Manager</span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        {/* Dashboard Group */}
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

        {/* Management Group */}
        <SidebarGroup>
          <SidebarGroupLabel>Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Divisions">
                  <Link href="/admin/divisions">
                    <FolderKanban />
                    <span>Divisions</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Projects">
                  <Link href="/admin/projects">
                    <Layers />
                    <span>Projects</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Tech Stack">
                  <Link href="/admin/tech-stack">
                    <Cpu />
                    <span>Tech Stack</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Achievements">
                  <Link href="/admin/achievements">
                    <Trophy />
                    <span>Achievements</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Members">
                  <Link href="/admin/members">
                    <Users />
                    <span>Members</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarThemeToggle />
          <SidebarMenuItem>
            <form action={handleSignOut} className="w-full py-2">
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