"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

// --- SYSTEM INITIALIZATION (Fixes the Build Error) ---
export async function initializeSystem() {
  const divisions = [
    { 
      title: "Software Engineering", 
      slug: "software", 
      description: "Web, Mobile, and AI development.", 
      iconName: "AppWindow", 
      colorClass: "text-blue-600" 
    },
    { 
      title: "Computer Networks", 
      slug: "network", 
      description: "Cloud, Security, and Infrastructure.", 
      iconName: "Network", 
      colorClass: "text-emerald-600" 
    },
    { 
      title: "Embedded Systems", 
      slug: "embedded", 
      description: "IoT, Robotics, and Hardware.", 
      iconName: "Cpu", 
      colorClass: "text-orange-600" 
    },
    { 
      title: "Multimedia", 
      slug: "multimedia", 
      description: "UI/UX, Game Dev, and Creative Tech.", 
      iconName: "Clapperboard", 
      colorClass: "text-purple-600" 
    },
  ];

  for (const div of divisions) {
    await prisma.division.upsert({
      where: { slug: div.slug },
      update: {}, // Do nothing if exists
      create: div,
    });
  }

  revalidatePath("/admin");
}

// --- DIVISIONS (Create/Update/Delete) ---
export async function createDivision(formData: FormData) {
  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string;
  const description = formData.get("description") as string;
  const iconName = (formData.get("iconName") as string) || "FolderKanban";

  await prisma.division.create({
    data: { title, slug, description, iconName },
  });
  revalidatePath("/admin/divisions");
}

export async function updateDivision(formData: FormData) {
  const id = formData.get("id") as string;
  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string;
  const description = formData.get("description") as string;
  const iconName = (formData.get("iconName") as string) || "FolderKanban";

  await prisma.division.update({
    where: { id },
    data: { title, slug, description, iconName },
  });
  revalidatePath("/admin/divisions");
}

export async function deleteDivision(id: string) {
  await prisma.division.delete({ where: { id } });
  revalidatePath("/admin/divisions");
}

// --- PROJECTS ---
export async function createProject(formData: FormData) {
  const divisionId = formData.get("divisionId") as string;
  
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
  revalidatePath("/admin/projects");
}

export async function updateProject(formData: FormData) {
  const id = formData.get("id") as string;

  await prisma.project.update({
    where: { id },
    data: {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      imageUrl: formData.get("imageUrl") as string,
      tags: (formData.get("tags") as string).split(",").map((t) => t.trim()),
      demoUrl: (formData.get("demoUrl") as string) || null,
      githubUrl: (formData.get("githubUrl") as string) || null,
      divisionId: formData.get("divisionId") as string,
    },
  });
  revalidatePath("/admin/projects");
}

export async function deleteProject(id: string) {
  await prisma.project.delete({ where: { id } });
  revalidatePath("/admin/projects");
}

// --- MEMBERS ---
export async function createMember(formData: FormData) {
  const divisionId = formData.get("divisionId") as string;

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
  revalidatePath("/admin/members");
}

export async function updateMember(formData: FormData) {
  const id = formData.get("id") as string;

  await prisma.member.update({
    where: { id },
    data: {
      name: formData.get("name") as string,
      role: formData.get("role") as string,
      imageUrl: formData.get("imageUrl") as string,
      github: (formData.get("github") as string) || null,
      linkedin: (formData.get("linkedin") as string) || null,
      divisionId: formData.get("divisionId") as string, // Allow changing division
    },
  });
  revalidatePath("/admin/members");
}

export async function deleteMember(id: string) {
  await prisma.member.delete({ where: { id } });
  revalidatePath("/admin/members");
}

// --- ACHIEVEMENTS ---
export async function createAchievement(formData: FormData) {
  const divisionId = formData.get("divisionId") as string;

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
  revalidatePath("/admin/achievements");
}

export async function updateAchievement(formData: FormData) {
  const id = formData.get("id") as string;

  await prisma.achievement.update({
    where: { id },
    data: {
      title: formData.get("title") as string,
      date: formData.get("date") as string,
      description: formData.get("description") as string,
      issuer: formData.get("issuer") as string,
      winner: formData.get("winner") as string,
      imageUrl: formData.get("imageUrl") as string,
      divisionId: formData.get("divisionId") as string,
    },
  });
  revalidatePath("/admin/achievements");
}

export async function deleteAchievement(id: string) {
  await prisma.achievement.delete({ where: { id } });
  revalidatePath("/admin/achievements");
}

// --- TECH STACK ---
export async function createTechStack(formData: FormData) {
  const divisionId = formData.get("divisionId") as string;

  await prisma.techStack.create({
    data: {
      name: formData.get("name") as string,
      imageUrl: formData.get("imageUrl") as string,
      websiteUrl: (formData.get("websiteUrl") as string) || null,
      divisionId,
    },
  });
  revalidatePath("/admin/tech-stack");
}

export async function deleteTechStack(id: string) {
  await prisma.techStack.delete({ where: { id } });
  revalidatePath("/admin/tech-stack");
}