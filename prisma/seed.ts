import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting seed...");

  // 1. Clean up database
  await prisma.achievement.deleteMany();
  await prisma.member.deleteMany();
  await prisma.project.deleteMany();
  await prisma.division.deleteMany();

  console.log("🧹 Database cleaned.");

  // 2. Define Divisions with Colors
  const divisions = [
    {
      title: "Software Engineering",
      slug: "software",
      description: "Focus on web development, mobile apps, and software architecture.",
      iconName: "AppWindow",
      colorClass: "text-blue-600", // Unique Color
    },
    {
      title: "Embedded Systems",
      slug: "embedded",
      description: "Exploring IoT, microcontrollers, and hardware-software integration.",
      iconName: "Cpu",
      colorClass: "text-orange-600", // Unique Color
    },
    {
      title: "Computer Networks",
      slug: "network",
      description: "Studying network infrastructure, security, and cloud computing.",
      iconName: "Network",
      colorClass: "text-emerald-600", // Unique Color
    },
    {
      title: "Multimedia",
      slug: "multimedia",
      description: "Creative design, UI/UX, and digital media production.",
      iconName: "Clapperboard",
      colorClass: "text-purple-600", // Unique Color
    },
  ];

  // 3. Seed Data
  for (const divData of divisions) {
    const division = await prisma.division.create({
      data: {
        ...divData,
        projects: {
          create: [
            {
              title: `${divData.title} Core System`,
              description: `A flagship project for the ${divData.title} division focusing on scalability and performance.`,
              imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000",
              tags: ["Innovation", "Tech", "2024"],
              demoUrl: "https://example.com",
              githubUrl: "https://github.com",
            },
            {
              title: "Future Tech Initiative",
              description: "Researching the next generation of technology standards.",
              imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1000",
              tags: ["Research", "Development"],
            },
          ],
        },
        members: {
          create: [
            {
              name: "Alex Johnson",
              role: `Head of ${divData.slug.charAt(0).toUpperCase() + divData.slug.slice(1)}`,
              imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1000",
              github: "https://github.com",
              linkedin: "https://linkedin.com",
            },
            {
              name: "Sarah Chen",
              role: "Senior Staff",
              imageUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1000",
            },
          ],
        },
        achievements: {
          create: [
            {
              title: "National Tech Champion",
              date: "Nov 2024",
              issuer: "Ministry of Education",
              winner: "Team Alpha",
              description: "First place in the national technology innovation summit.",
              imageUrl: "https://images.unsplash.com/photo-1531545514256-b1400bc00f31?q=80&w=1000",
            },
          ],
        },
      },
    });

    console.log(`✅ Created division: ${division.title}`);
  }

  console.log("🚀 Seeding completed successfully.");
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });