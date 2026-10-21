export type ExperienceEntry = {
  id: string;
  period: string;
  role: string;
  company: string;
  location: string;
  description: string;
  highlights: string[];
  technologies: string[];
};

export const experience: ExperienceEntry[] = [
  {
    id: "exp-1",
    period: "2025 — Present",
    role: "Full Stack Developer",
    company: "Agile Infoways",
    location: "Ahmedabad, India",
    description:
      "Leading full-stack development on production SaaS products — owning features from API design through React UI to cloud deployment.",
    highlights: [
      "Architected multi-tenant Stone Management SaaS platform managing 12 lifecycle modules with NestJS & Prisma",
      "Architected monorepo with shared libraries across React and NestJS applications",
      "Integrated Razorpay payments and subscription billing for users",
      "Reduced API response times by 40% through query optimization and caching",
      "Built patient mentoring platform on Next.js with AWS Lambda and PostgreSQL",
    ],
    technologies: ["React.js", "NestJS", "PostgreSQL", "Prisma", "MongoDB", "Zustand", "TanStack Query", "NX"],
  },
  {
    id: "exp-2",
    period: "2024 — 2025",
    role: "Software Developer",
    company: "Agile Infoways",
    location: "Ahmedabad, India",
    description:
      "Delivered client-facing platforms and high-performance web applications with modern JAMstack and serverless architectures.",
    highlights: [
      "Engineered high-performance web platforms with headless CMS solutions via GraphQL",
      "Achieved 95+ Lighthouse scores across performance, accessibility, and SEO",
      "Implemented CI/CD pipelines cutting deployment time from hours to minutes",
    ],
    technologies: ["Next.js", "Gatsby.js", "GraphQL", "AWS Lambda", "PostgreSQL"],
  },
  {
    id: "exp-3",
    period: "2023 — 2024",
    role: "Junior Software Developer",
    company: "Agile Infoways",
    location: "Ahmedabad, India",
    description:
      "Started professional journey building MVPs and internal tools — rapidly growing from feature implementation to end-to-end ownership.",
    highlights: [
      "Shipped 4 client MVPs from wireframe to production within tight deadlines",
      "Built responsive React interfaces with component-driven architecture",
      "Established testing practices with Jest and integration test coverage",
    ],
    technologies: ["React.js", "Node.js", "PostgreSQL", "TypeScript", "REST APIs"],
  },
];
