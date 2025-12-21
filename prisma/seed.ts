import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting seed...");

  // 1. Clean up database
  await prisma.techStack.deleteMany();
  await prisma.achievement.deleteMany();
  await prisma.member.deleteMany();
  await prisma.project.deleteMany();
  await prisma.division.deleteMany();

  console.log("🧹 Database cleaned.");

  // 2. Define Divisions with Techs
  const divisions = [
    {
      title: "Software Engineering",
      slug: "software",
      description: "Focus on web development, mobile apps, and software architecture.",
      iconName: "AppWindow",
      colorClass: "text-blue-600",
      techs: [
        { name: "React", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
        { name: "Next.js", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
        { name: "TypeScript", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
      ]
    },
    {
      title: "Embedded Systems",
      slug: "embedded",
      description: "Exploring IoT, microcontrollers, and hardware-software integration.",
      iconName: "Cpu",
      colorClass: "text-orange-600",
      techs: [
        { name: "Arduino", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/arduino/arduino-original.svg" },
        { name: "Raspberry Pi", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/raspberrypi/raspberrypi-original.svg" },
      ]
    },
    {
      title: "Computer Networks",
      slug: "network",
      description: "Studying network infrastructure, security, and cloud computing.",
      iconName: "Network",
      colorClass: "text-emerald-600",
      techs: [
         { name: "Python", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
         { name: "Linux", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" },
         { name: "Docker", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" }
      ]
    },
    {
      title: "Multimedia",
      slug: "multimedia",
      description: "Creative design, UI/UX, and digital media production.",
      iconName: "Clapperboard",
      colorClass: "text-purple-600",
       techs: [
        { name: "Figma", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
        { name: "Blender", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/blender/blender-original.svg" }
      ]
    },
  ];

  // 3. Seed Data
  for (const divData of divisions) {
    const { techs, ...divInfo } = divData;
    
    const division = await prisma.division.create({
      data: {
        ...divInfo,
        techStacks: {
            create: techs.map(t => ({
                name: t.name,
                imageUrl: t.url,
                websiteUrl: "https://google.com"
            }))
        },
        projects: {
          create: [
            {
              title: `${divData.title} Core System`,
              description: `A flagship project for the ${divData.title} division.`,
              imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000",
              tags: ["Innovation", "Tech"],
            },
          ],
        },
        members: {
          create: [
            {
              name: "Alex Johnson",
              role: `Head of ${divData.slug}`,
              imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1000",
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