import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set");
}

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
});

const skillGroups = [ 
  {
    title: "Languages",
    skills: [
      "Python",
      "JavaScript",
      "TypeScript",
      "Java",
      "C++",
      "SQL",
    ],
  },
  {
    title: "Frontend",
    skills: [
      "React",
      "HTML",
      "CSS",
      "Tailwind CSS",
      "Responsive Design",
    ],
  },
  {
    title: "Backend & Data",
    skills: [
      "Node.js",
      "Express",
      "MongoDB",
      "Firebase",
      "REST APIs",
      "SQL",
    ],
  },
  {
    title: "AI & Machine Learning",
    skills: [
      "PyTorch",
      "LSTM",
      "Attention",
      "Minimax",
      "Gemini API",
      "Model Evaluation",
    ],
  },
  {
    title: "Tools",
    skills: [
      "Git",
      "GitHub",
      "VS Code",
      "Figma",
    ],
  },
];

async function main() {
  console.log("Importing skills...");

  for (
    let groupIndex = 0;
    groupIndex < skillGroups.length;
    groupIndex++
  ) {
    const groupData = skillGroups[groupIndex];

    const existingGroup =
      await prisma.skillGroup.findFirst({
        where: {
          title: groupData.title,
        },
      });

    let group;

    if (existingGroup) {
      group = await prisma.skillGroup.update({
        where: {
          id: existingGroup.id,
        },
        data: {
          displayOrder: groupIndex + 1,
        },
      });

      console.log(
        `Using existing group: ${group.title}`
      );
    } else {
      group = await prisma.skillGroup.create({
        data: {
          title: groupData.title,
          displayOrder: groupIndex + 1,
        },
      });

      console.log(
        `Created group: ${group.title}`
      );
    }

    for (
      let skillIndex = 0;
      skillIndex < groupData.skills.length;
      skillIndex++
    ) {
      const skillName =
        groupData.skills[skillIndex];

      await prisma.skill.upsert({
        where: {
          groupId_name: {
            groupId: group.id,
            name: skillName,
          },
        },

        update: {
          displayOrder: skillIndex + 1,
        },

        create: {
          name: skillName,
          groupId: group.id,
          displayOrder: skillIndex + 1,
        },
      });
    }
  }

  console.log("Skills imported successfully!");
}

main()
  .catch((error) => {
    console.error(
      "SKILLS IMPORT ERROR:",
      error
    );

    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });