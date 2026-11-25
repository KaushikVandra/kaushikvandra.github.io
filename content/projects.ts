export type Project = {
  slug: string;
  title: string;
  tagline: string;
  role: string;
  duration: string;
  outcome: string;
  description: string;
  problem: string;
  approach: string;
  stack: string[];
  result: string;
  lessons: string;
  keywords: string[];
  datePublished: string;
  featured: boolean;
  gradient: string;
  liveUrl?: string;
};

export const projects: Project[] = [
  {
    slug: "stone-management-platform",
    title: "Stone Management Platform",
    tagline: "Enterprise multi-tenant SaaS digitizing construction stone lifecycle & dynamic CFT billing",
    role: "Full-Stack Architect & Developer",
    duration: "Production SaaS",
    outcome: "7 RBAC Roles · FSM Lifecycle Engine · GCP Compute Engine",
    liveUrl: "https://kenashatech.com",
    description:
      "A multi-tenant enterprise SaaS platform architected with React 18, NestJS, TypeScript, PostgreSQL (Prisma ORM), Docker, and GCP that manages the full construction stone lifecycle — from quarry block extraction and slab cutting to QC inspection, dispatch, and site installation.",
    problem:
      "Construction stone operations historically struggled with manual paperwork, disjointed spreadsheets, and volumetric (cubic feet / CFT) calculation disputes across quarries, processing yards, and installation sites. Lack of tenant isolation and fragmented status tracking caused transit delays, inventory reconciliation failures, and billing disputes.",
    approach:
      "Architected a multi-tenant enterprise SaaS platform managing the full construction stone lifecycle with 7 discrete RBAC roles. Engineered a robust finite-state machine (FSM) enforcing lifecycle transitions and dynamic on-the-fly cubic feet (CFT) mathematical computation at query time, guaranteeing multi-tenant isolation and zero derived data in PostgreSQL. Built modular, responsive interfaces using React 18, Ant Design 5, Tailwind CSS, and TanStack Query for optimistic cache updates, pagination, and real-time operational status tracking. Configured automated CI/CD pipelines via GitHub Actions (typecheck, linting, Prisma generation, unit tests) and containerized the full stack with Docker Compose & Nginx, deploying to Google Cloud Platform (GCP Compute Engine).",
    stack: [
      "React 18",
      "NestJS",
      "TypeScript",
      "PostgreSQL",
      "Prisma ORM",
      "Docker",
      "GitHub Actions",
      "GCP (Compute Engine)",
      "Ant Design 5",
      "Tailwind CSS",
      "TanStack Query",
    ],
    result:
      "Delivered an enterprise-grade platform supporting 7 discrete RBAC roles. Automated multi-tenant isolation and eliminated derived data discrepancies with real-time query-time CFT calculations. Streamlined continuous deployment with automated GitHub Actions pipelines and containerized GCP hosting.",
    lessons:
      "Computing derived mathematical values (like CFT) at query time rather than persisting derived state eliminates reconciliation drift across multi-tenant updates. Enforcing strict FSM validation guarantees data consistency across complex multi-facility supply chains.",
    keywords: [
      "React 18",
      "NestJS",
      "TypeScript",
      "PostgreSQL",
      "Prisma ORM",
      "Docker",
      "GitHub Actions",
      "GCP",
      "Multi-Tenant",
      "FSM",
      "RBAC",
    ],
    datePublished: "2024-10-15",
    featured: true,
    gradient: "from-sky-500/20 to-indigo-500/20",
  },
  {
    slug: "handwriting-analysis-portal",
    title: "Handwriting Analysis Portal",
    tagline: "Full-stack evaluation platform with automated reporting & Razorpay payments",
    role: "Full-Stack Developer",
    duration: "Production Platform",
    outcome: "Personalized PDF/Word Reports · Razorpay Webhooks · NX Monorepo",
    liveUrl: "https://graphology.infumi.ai",
    description:
      "A full-stack platform built with React.js, NestJS, TypeScript, Zustand, TanStack Query, and MongoDB that enables certified graphologists to evaluate handwriting samples and automatically generate personalized, in-depth analytical PDF/Word reports for end users.",
    problem:
      "Certified graphologists required a centralized platform to intake client handwriting samples, manage trait criteria, collect payments securely, and generate comprehensive formatted diagnostic reports without tedious manual document compilation.",
    approach:
      "Built a full-stack platform enabling certified graphologists to evaluate handwriting samples and automatically generate personalized, in-depth analytical PDF/Word reports for end users. Developed an admin portal managing users, graphologists, and trait combinations. Integrated Razorpay webhooks for payment processing and leveraged Zustand for client UI state alongside TanStack Query for server state caching inside an NX monorepo setup.",
    stack: [
      "React.js",
      "NestJS",
      "TypeScript",
      "Zustand",
      "TanStack Query",
      "MongoDB",
      "Razorpay",
      "NX Monorepo",
      "Node.js",
    ],
    result:
      "Enabled end-to-end automated graphology workflows from client submission to report delivery. Streamlined admin control over trait evaluations and payment lifecycle with webhook confirmation, while NX monorepo tooling maintained high code reuse and type safety.",
    lessons:
      "Structuring full-stack projects in an NX monorepo allows seamless sharing of types and validation schemas across React and NestJS applications. Pairing Zustand with TanStack Query separates transient UI state from cached server data cleanly.",
    keywords: [
      "React.js",
      "NestJS",
      "TypeScript",
      "Zustand",
      "TanStack Query",
      "MongoDB",
      "Razorpay",
      "NX Monorepo",
    ],
    datePublished: "2024-06-01",
    featured: true,
    gradient: "from-emerald-500/20 to-cyan-500/20",
  },
  {
    slug: "patient-mentoring-platform",
    title: "How Did It Go — Patient Mentoring Platform",
    tagline: "Production healthcare mentorship platform with real-time chat, video calling & AWS Lambda",
    role: "Full-Stack Developer",
    duration: "Production Platform",
    outcome: "Real-time Chat & Video · Serverless AWS Lambda · Mobile Performance",
    liveUrl: "https://howdiditgo.com",
    description:
      "An active production healthcare platform built with Next.js, AWS Lambda, PostgreSQL, REST APIs, and Tailwind CSS, connecting surgery patients with verified mentors through real-time communication.",
    problem:
      "Surgery patients needed accessible, high-performance peer mentorship and counseling before and after procedures. The platform required low-latency real-time chat and video communication with minimal infrastructure maintenance overhead.",
    approach:
      "Integrated real-time chat, video calling, and profile-based mentor matching algorithms into an active production healthcare platform used by surgery patients. Integrated serverless AWS Lambda microservices and optimized frontend bundle size, significantly improving load performance and responsiveness for mobile users.",
    stack: [
      "Next.js",
      "AWS Lambda",
      "PostgreSQL",
      "REST APIs",
      "Tailwind CSS",
      "TypeScript",
      "React.js",
    ],
    result:
      "Empowered surgery patients with seamless mentor discovery, secure real-time chat, and video calling. Serverless AWS Lambda backend reduced operational overhead while frontend bundle optimizations delivered fast mobile performance.",
    lessons:
      "Offloading sporadic workloads to serverless AWS Lambda functions keeps infrastructure lean and cost-effective. Route-level code-splitting and asset optimization are vital for healthcare users accessing platforms from mobile devices.",
    keywords: [
      "Next.js",
      "AWS Lambda",
      "PostgreSQL",
      "REST APIs",
      "Tailwind CSS",
      "Healthcare",
      "Serverless",
    ],
    datePublished: "2024-01-20",
    featured: true,
    gradient: "from-amber-500/20 to-orange-500/20",
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}
