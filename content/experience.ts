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
    period: "Feb 2023 — Aug 2026",
    role: "MERN Stack Developer",
    company: "Agile Infoways",
    location: "Ahmedabad, Gujarat",
    description:
      "Engineered responsive, high-performance web applications and enterprise SaaS platforms in Agile/Scrum sprints — delivering reusable UI component libraries, high-throughput RESTful APIs, and automated CI/CD pipelines.",
    highlights: [
      "Engineered responsive, high-performance web applications using React.js, Next.js, and TypeScript, reducing page load times by 40% via code-splitting, route lazy loading, and asset optimization",
      "Delivered scalable, reusable UI component libraries and integrated complex RESTful APIs across 5+ client projects within Agile/Scrum sprints, cutting subsequent development turnaround by 20%",
      "Implemented automated CI/CD workflows with GitHub Actions for typecheck, linting, and build verification, accelerating release cycles while maintaining zero critical regressions",
      "Collaborated with UI/UX designers and backend engineers to build pixel-perfect, accessible, and standards-compliant user interfaces aligned with product specifications",
    ],
    technologies: [
      "React.js",
      "Next.js",
      "TypeScript",
      "Node.js",
      "NestJS",
      "TanStack Query",
      "Zustand",
      "GitHub Actions",
      "Docker",
      "Tailwind CSS",
    ],
  },
  {
    id: "exp-2",
    period: "2019 — 2023",
    role: "Bachelor of Engineering — Computer Engineering",
    company: "Gujarat Technological University",
    location: "Ahmedabad, Gujarat",
    description:
      "Graduated with CGPA 8.12 / 10. Built foundational mastery in computer science fundamentals, data structures, algorithms, relational database systems, and full-stack software engineering.",
    highlights: [
      "Graduated with 8.12 / 10 CGPA in Computer Engineering",
      "Specialized in Software Engineering, Relational Database Systems, and Web Technologies",
      "Designed and developed full-stack academic projects and capstone software applications",
    ],
    technologies: ["JavaScript", "SQL", "Database Systems", "Data Structures", "Algorithms", "Web Technologies"],
  },
];
