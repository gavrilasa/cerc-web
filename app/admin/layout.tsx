import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AdminSidebar } from "./AdminSidebar";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth"; // Import server-side auth

export default async function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // Server-side auth check to protect the entire /admin route
  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (!session) {
    redirect("/login"); // Redirects if not logged in
  }

  return (
    <SidebarProvider>
      <AdminSidebar />
      <SidebarInset>
        <main className="flex-1 space-y-4 p-4 pt-6 md:p-8 overflow-y-auto bg-gray-50 dark:bg-neutral-900 h-full">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}