"use server";
import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// --- DIVISIONS ---
export async function createDivision(formData: FormData) {
  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string;
  const description = formData.get("description") as string;
  const iconName = (formData.get("iconName") as string) || "FolderKanban";

  await prisma.division.create({
    data: {
      title,
      slug,
      description,
      iconName,
      colorClass: "text-slate-900", // Default
    },
  });

  revalidatePath("/admin", "layout");
}

export async function updateDivision(formData: FormData) {
  const id = formData.get("id") as string;
  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string;
  const description = formData.get("description") as string;
  const iconName = (formData.get("iconName") as string) || "FolderKanban";

  await prisma.division.update({
    where: { id },
    data: {
      title,
      slug,
      description,
      iconName,
    },
  });

  revalidatePath("/admin", "layout");
  revalidatePath(`/admin/divisions/${slug}`);
}

export async function deleteDivision(id: string) {
  await prisma.division.delete({ where: { id } });
  revalidatePath("/admin", "layout");
  redirect("/admin");
}

// --- PROJECTS ---
export async function createProject(formData: FormData) {
  const divisionId = formData.get("divisionId") as string;
  const divisionSlug = formData.get("divisionSlug") as string;

  await prisma.project.create({
    data: {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      imageUrl: formData.get("imageUrl") as string,
      tags: (formData.get("tags") as string).split(",").map((t) => t.trim()),
      demoUrl: (formData.get("demoUrl") as string) || null,
      githubUrl: (formData.get("githubUrl") as string) || null,
      divisionId,
    },
  });
  revalidatePath(`/admin/divisions/${divisionSlug}`);
}

export async function updateProject(formData: FormData) {
  const id = formData.get("id") as string;
  const divisionSlug = formData.get("divisionSlug") as string;

  await prisma.project.update({
    where: { id },
    data: {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      imageUrl: formData.get("imageUrl") as string,
      tags: (formData.get("tags") as string).split(",").map((t) => t.trim()),
      demoUrl: (formData.get("demoUrl") as string) || null,
      githubUrl: (formData.get("githubUrl") as string) || null,
    },
  });
  revalidatePath(`/admin/divisions/${divisionSlug}`);
}

export async function deleteProject(id: string, divisionSlug: string) {
  await prisma.project.delete({ where: { id } });
  revalidatePath(`/admin/divisions/${divisionSlug}`);
}

// --- MEMBERS ---
export async function createMember(formData: FormData) {
  const divisionId = formData.get("divisionId") as string;
  const divisionSlug = formData.get("divisionSlug") as string;

  await prisma.member.create({
    data: {
      name: formData.get("name") as string,
      role: formData.get("role") as string,
      imageUrl: formData.get("imageUrl") as string,
      github: (formData.get("github") as string) || null,
      linkedin: (formData.get("linkedin") as string) || null,
      divisionId,
    },
  });
  revalidatePath(`/admin/divisions/${divisionSlug}`);
}

export async function updateMember(formData: FormData) {
  const id = formData.get("id") as string;
  const divisionSlug = formData.get("divisionSlug") as string;

  await prisma.member.update({
    where: { id },
    data: {
      name: formData.get("name") as string,
      role: formData.get("role") as string,
      imageUrl: formData.get("imageUrl") as string,
      github: (formData.get("github") as string) || null,
      linkedin: (formData.get("linkedin") as string) || null,
    },
  });
  revalidatePath(`/admin/divisions/${divisionSlug}`);
}

export async function deleteMember(id: string, divisionSlug: string) {
  await prisma.member.delete({ where: { id } });
  revalidatePath(`/admin/divisions/${divisionSlug}`);
}

// --- ACHIEVEMENTS ---
export async function createAchievement(formData: FormData) {
  const divisionId = formData.get("divisionId") as string;
  const divisionSlug = formData.get("divisionSlug") as string;

  await prisma.achievement.create({
    data: {
      title: formData.get("title") as string,
      date: formData.get("date") as string,
      description: formData.get("description") as string,
      issuer: formData.get("issuer") as string,
      winner: formData.get("winner") as string,
      imageUrl: formData.get("imageUrl") as string,
      divisionId,
    },
  });
  revalidatePath(`/admin/divisions/${divisionSlug}`);
}

export async function updateAchievement(formData: FormData) {
  const id = formData.get("id") as string;
  const divisionSlug = formData.get("divisionSlug") as string;

  await prisma.achievement.update({
    where: { id },
    data: {
      title: formData.get("title") as string,
      date: formData.get("date") as string,
      description: formData.get("description") as string,
      issuer: formData.get("issuer") as string,
      winner: formData.get("winner") as string,
      imageUrl: formData.get("imageUrl") as string,
    },
  });
  revalidatePath(`/admin/divisions/${divisionSlug}`);
}

export async function deleteAchievement(id: string, divisionSlug: string) {
  await prisma.achievement.delete({ where: { id } });
  revalidatePath(`/admin/divisions/${divisionSlug}`);
}