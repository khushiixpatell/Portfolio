export const projects = [
  {
    id: "gdg-command-hub",
    title: "GDG Command Hub",
    shortTitle: "Command Hub",
    route: "/projects/gdg-command-hub",

    categories: ["full-stack", "ai"],
    categoryLabel: "Full-Stack • AI",

    type: "Individual Project",
    contribution: null,

    description:
      "An internal operations platform built to streamline event planning, team coordination, and repetitive workflows for GDG on Campus Laurier.",

    technologies: [
      "React",
      "TypeScript",
      "Node.js",
      "Firebase",
      "Gemini",
    ],

    status: "In Development",
    featured: true,
    order: 1,
  },

  {
    id: "gec-ai",
    title: "Grammatical Error Correction AI",
    shortTitle: "GEC AI",
    route: "/projects/gec-ai",

    categories: ["ai"],
    categoryLabel: "AI • Machine Learning",

    type: "Team Project",
    contribution: "Preprocessing, training, and evaluation",

    description:
       "A grammatical error correction experiment comparing an attention-based Seq2Seq model, an ablation without attention, and Gemini LLM baselines.",
    technologies: [
      "Python",
      "PyTorch",
      "BiLSTM",
      "Attention",
      "Gemini",
    ],

    status: "Completed",
    featured: true,
    order: 2,
  },

  {
    id: "connect-four-ai",
    title: "Connect Four AI",
    shortTitle: "Connect Four",
    route: "/projects/connect-four-ai",

    categories: ["ai"],
    categoryLabel: "AI • Algorithms",

    type: "Team Project",
    contribution: "Testing, evaluation, and project analysis",

    description:
      "An experimental Connect Four environment comparing random, rule-based, and Minimax agents through reproducible AI-vs-AI evaluation.",

    technologies: [
      "Python",
      "Minimax",
      "Game Trees",
      "Heuristic Search",
    ],

    status: "Interactive Extension In Development",
    featured: true,
    order: 3,
  },

  {
    id: "bitewise",
    title: "BiteWise",
    shortTitle: "BiteWise",
    route: "/projects/bitewise",

    categories: ["full-stack", "frontend"],
    categoryLabel: "Full-Stack • Frontend",

    type: "5-Person Team Project",
    contribution: "Application development and backend integration",

    description:
      "An inclusive food discovery application designed to help users with complex dietary restrictions discover suitable meals and restaurants.",

    technologies: [
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "REST APIs",
    ],

    status: "Completed",
    featured: true,
    order: 4,
  },

  {
    id: "zeuty",
    title: "Zeuty",
    shortTitle: "Zeuty",
    route: "/projects/zeuty",

    categories: ["frontend"],
    categoryLabel: "Frontend • Product Design",

    type: "Internship Work",
    contribution: "Interface and product design",

    description:
      "Frontend and product interface concepts designed during an internship with an early-stage startup.",

    technologies: [
      "UI Design",
      "Frontend Development",
      "Responsive Design",
      "Figma",
    ],

    status: "Completed",
    featured: true,
    order: 5,
  },
];

export const projectCategories = [
  {
    id: "all",
    label: "All",
  },
  {
    id: "full-stack",
    label: "Full-Stack",
  },
  {
    id: "frontend",
    label: "Frontend",
  },
  {
    id: "ai",
    label: "AI",
  },
];