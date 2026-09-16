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

const projects = [
  {
    slug: "gdg-command-hub",
    title: "GDG Command Hub",
    shortTitle: "Command Hub",

    description:
      "An internal operations platform built for GDG on Campus Laurier to centralize event planning, team coordination, and AI-assisted administrative workflows.",

    categories: ["full-stack", "ai"],
    categoryLabel: "Full-Stack • AI",

    type: "Individual Project",
    contribution: "Designed and developed independently",

    technologies: [
      "React",
      "TypeScript",
      "Node.js",
      "Express",
      "Firebase",
      "Gemini API",
    ],

    status: "In Development",

    featured: true,
    visible: true,
    displayOrder: 1,

    githubUrl: "https://github.com/khushiixpatell/GDG-command-hub",
  },

  {
    slug: "gec-ai",
    title: "Grammatical Error Correction AI",
    shortTitle: "GEC AI",

    description:
      "A grammatical error correction experiment comparing an attention-based Seq2Seq model, an ablation without attention, and Gemini LLM baselines.",

    categories: ["ai"],
    categoryLabel: "AI • Machine Learning • NLP",

    type: "3-Person Team Project",
    contribution: "Preprocessing, training, and evaluation",

    technologies: [
      "Python",
      "PyTorch",
      "BiLSTM",
      "Seq2Seq",
      "Bahdanau Attention",
      "Gemini",
    ],

    status: "Completed",

    featured: true,
    visible: true,
    displayOrder: 2,

    githubUrl: "https://github.com/jessicamisek23-ctrl/CP468-Project",
  },

  {
    slug: "connect-four-ai",
    title: "Connect Four AI",
    shortTitle: "Connect Four",

    description:
      "A controlled experiment comparing random, rule-based, and Minimax agents through repeated Connect Four competition.",

    categories: ["ai"],
    categoryLabel: "AI • Algorithms",

    type: "Team Project",
    contribution: "Testing, evaluation, and analysis",

    technologies: [
      "Python",
      "Minimax",
      "Game Trees",
      "Heuristic Evaluation",
    ],

    status: "Completed",

    featured: true,
    visible: true,
    displayOrder: 3,

    githubUrl:
      "https://github.com/vanessapopa/CP468-Connect-Four-AI",
  },

  {
    slug: "bitewise",
    title: "BiteWise",
    shortTitle: "BiteWise",

    description:
      "An inclusive food discovery application combining a React interface, backend services, persistent data, and external recipe APIs.",

    categories: ["full-stack", "frontend"],
    categoryLabel: "Full-Stack • Frontend",

    type: "5-Person Team Project",
    contribution: "Application development and backend integration",

    technologies: [
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "REST APIs",
    ],

    status: "Completed",

    featured: true,
    visible: true,
    displayOrder: 4,
  },

  {
    slug: "zeuty",
    title: "Zeuty",
    shortTitle: "Zeuty",

    description:
      "Frontend and product interface work created for an early-stage startup, translating evolving product ideas into usable digital experiences.",

    categories: ["frontend"],
    categoryLabel: "Frontend • Product Design",

    type: "Internship Work",
    contribution: "Interface and product design",

    technologies: [
      "Frontend Development",
      "UI/UX",
      "Responsive Design",
      "Figma",
    ],

    status: "Completed",

    featured: true,
    visible: true,
    displayOrder: 5,
  },
];

async function main() {
  console.log("Seeding portfolio database...");

  for (const project of projects) {
    await prisma.project.upsert({
      where: {
        slug: project.slug,
      },

      update: project,

      create: project,
    });

    console.log(`✓ ${project.title}`);
  }

  console.log("Database seeded successfully.");
}

main()
  .catch((error) => {
    console.error("Seed failed:");
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });