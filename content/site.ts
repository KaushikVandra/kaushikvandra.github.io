export const siteConfig = {
  name: "Kaushik Vandra",
  title: "Kaushik Vandra — Full-Stack / MERN Developer",
  titleTemplate: "%s | Kaushik Vandra",
  description:
    "Full-Stack / MERN Developer with 3+ years of experience designing and scaling web applications, enterprise SaaS platforms, and high-throughput RESTful architectures. React.js, Next.js, Node.js, NestJS, TypeScript — open to remote roles worldwide.",
  url: "https://kaushikvandra.github.io",
  ogImage: "/og-image.svg",
  locale: "en_IN",
  location: {
    city: "Ahmedabad",
    region: "Gujarat",
    country: "India",
  },
  jobTitle: "Full-Stack / MERN Developer",
  yearsExperience: 3,
  phone: "+91 9537366874",
  email: "vandrakaushik2002@gmail.com",
  social: {
    github: "https://github.com/KaushikVandra",
    linkedin: "https://linkedin.com/in/kaushik-vandra",
  },
  knowsAbout: [
    "JavaScript (ES6+)",
    "TypeScript",
    "React.js",
    "Next.js",
    "Node.js",
    "NestJS",
    "Express.js",
    "PostgreSQL",
    "Prisma ORM",
    "MongoDB",
    "Mongoose",
    "TanStack Query",
    "Zustand",
    "Tailwind CSS",
    "Ant Design 5",
    "GitHub Actions",
    "Docker",
    "Docker Compose",
    "GCP (Compute Engine)",
    "Nginx",
    "REST APIs",
    "CI/CD Pipelines",
    "Multi-Tenant Architecture",
    "Finite State Machines",
    "RBAC",
  ],
  education: {
    degree: "Bachelor of Engineering — Computer Engineering",
    university: "Gujarat Technological University, Ahmedabad",
    period: "2019 – 2023",
    cgpa: "8.12 / 10",
  },
  availability: "Open to remote opportunities",
} as const;

export const navLinks = [
  { href: "/#about", label: "About" },
  { href: "/#experience", label: "Experience" },
  { href: "/#work", label: "Work" },
  { href: "/#skills", label: "Skills" },
  { href: "/#contact", label: "Contact" },
] as const;

export const faqs = [
  {
    question: "What types of roles and contract arrangements are you looking for?",
    answer:
      "I am actively open to full-time remote roles, long-term contract positions, and select high-impact freelance projects. I specialize in Full-Stack and MERN development, enterprise multi-tenant SaaS architectures, and backend API engineering using React.js, Next.js, Node.js, and NestJS.",
  },
  {
    question: "How do you handle remote collaboration across different time zones?",
    answer:
      "Based in India (UTC+5:30), I have extensive experience collaborating asynchronously and synchronously with distributed engineering teams across US, European, and APAC time zones. I emphasize clear PR documentation, proactive status updates, task tracking in Jira, and dedicated overlap hours for real-time standups and architecture reviews.",
  },
  {
    question: "What is your architectural philosophy when building enterprise web applications?",
    answer:
      "I prioritize strict type safety, clean separation of concerns, and query-time data integrity. In production systems like the multi-tenant Stone Management Platform, I utilize finite-state machines (FSMs) to enforce safe lifecycle transitions, calculate derived business metrics (like CFT volumetric rollups) dynamically at query time to prevent reconciliation drift, and isolate tenant data with discrete RBAC policies in PostgreSQL and Prisma ORM.",
  },
  {
    question: "How do you approach frontend performance and state management?",
    answer:
      "I separate transient client UI state from cached server state by pairing Zustand with TanStack Query. To maximize Core Web Vitals and user responsiveness, I implement route lazy loading, dynamic imports, and aggressive asset optimization — reducing page load times by up to 40% across client-facing applications.",
  },
  {
    question: "How quickly can you join, and what is your notice period?",
    answer:
      "I have flexible availability and can onboard quickly for high-priority remote roles. Feel free to reach out directly via email at vandrakaushik2002@gmail.com or phone at +91 9537366874 to discuss timelines and team alignment.",
  },
] as const;
