import { prisma } from "@/lib/db";
import { ProjectsClient } from "@/components/admin/projects-client";

export default async function AdminProjectsPage() {
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: 'desc' },
    include: { division: true }
  });

  const divisions = await prisma.division.findMany({ orderBy: { title: 'asc' } });

  return <ProjectsClient projects={projects} divisions={divisions} />;
}