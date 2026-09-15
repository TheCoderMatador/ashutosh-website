// Single source of truth for site copy.
// Anything wrapped as "TODO: ..." is a placeholder — replace with real content.

export const site = {
  name: "Ashutosh Khuntia",
  role: "Product × Technology × Business",
  tagline:
    "I build products, solve complex problems, and explore how technology can create meaningful business impact.",
  email: "TODO: add public contact email",
  linkedin: "TODO: add LinkedIn URL",
  github: "TODO: add GitHub URL",
  resumeUrl: "/resume.pdf", // TODO: drop your resume PDF into /public/resume.pdf
};

export const heroWords = ["PRODUCT", "TECHNOLOGY", "BUSINESS", "AI"];

export const currentlyItems = [
  "Pursuing an MBA at IIM Udaipur",
  "Exploring AI-native product development",
  "TODO: add another current focus area",
  "TODO: add another current focus area",
];

export const selectedWork = [
  {
    index: "01",
    title: "TODO: Project name",
    description:
      "TODO: one or two lines on the problem this project solves and the approach taken.",
    tags: ["TODO", "Tags"],
    href: "#",
  },
  {
    index: "02",
    title: "TODO: Project name",
    description:
      "TODO: one or two lines on the problem this project solves and the approach taken.",
    tags: ["TODO", "Tags"],
    href: "#",
  },
  {
    index: "03",
    title: "TODO: Project name",
    description:
      "TODO: one or two lines on the problem this project solves and the approach taken.",
    tags: ["TODO", "Tags"],
    href: "#",
  },
];

export type JourneyEntry = {
  year: string;
  org: string;
  role: string;
  detail: string;
};

export const journey: JourneyEntry[] = [
  {
    year: "2024 — 2026",
    org: "IIM Udaipur",
    role: "MBA",
    detail:
      "TODO: add specifics — specializations, clubs, notable coursework or projects.",
  },
  {
    year: "TODO: years",
    org: "Cognizant",
    role: "Product / Technology",
    detail:
      "TODO: add specifics — team, scope, what you owned or shipped.",
  },
  {
    year: "TODO: years",
    org: "TODO: earlier education or role",
    role: "TODO: role or degree",
    detail: "TODO: add details.",
  },
];

export const about = {
  paragraphs: [
    "TODO: who you are — a couple of sentences that ground the rest of the page in your actual voice.",
    "TODO: what you care about — the thread that connects product, technology, and business for you.",
    "TODO: how you work — the way you approach problems, teams, or ambiguity.",
  ],
};
