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
};

export const projects: Project[] = [
  {
    slug: "stone-management-saas",
    title: "Stone Management SaaS Platform",
    tagline: "Industrial multi-tenant ERP digitizing stone lifecycle & volumetric CFT billing",
    role: "Full Stack Architect & Developer",
    duration: "8 months",
    outcome: "12 domain modules · 90+ REST endpoints · Zero CFT billing drift",
    description:
      "A multi-tenant industrial SaaS platform engineered with NestJS, PostgreSQL (Prisma), and React/Vite that digitizes the complete lifecycle of architectural stone — from CAD planning and procurement through dispatch, site receiving, CNC processing, installation, and on-the-fly CFT billing.",
    problem:
      "Architectural stone fabrication and monumental installation projects historically relied on fragmented spreadsheets, phone calls, and handwritten challans across suppliers, cutting yards, and job sites. Tracking thousands of unique custom-dimension stones caused frequent transit losses, high defect rates, and recurring volumetric (Cubic Feet / CFT) calculation discrepancies that tied up payments in prolonged disputes.",
    approach:
      "I architected a modular monorepo containing a NestJS REST API with Prisma ORM and PostgreSQL on the backend, alongside a high-performance React 18 + Vite frontend with Tailwind CSS and Ant Design 5. Multi-tenancy was built from the ground up with shared DB / shared schema isolation using tenantId scoping and 7-tier granular RBAC. I implemented a strict finite state machine governing stones through 11 lifecycle stages (PLANNED → ORDERED → CUTTING_COMPLETED → IN_TRANSIT → RECEIVED → PROCESSING → READY_FOR_INSTALL → INSTALLED) with dynamic capability bypasses when client modules are disabled. Crucially, I engineered an on-the-fly volumetric CFT calculation engine computed dynamically from millimetre dimensions at query time, guaranteeing mathematical precision without stored redundant totals. The solution includes digital gate passes, delivery challan verification, salvage issue management with automated replacement code generation, and executive Recharts analytics.",
    stack: [
      "NestJS",
      "PostgreSQL",
      "Prisma ORM",
      "React.js",
      "Vite",
      "TypeScript",
      "Tailwind CSS",
      "Ant Design",
      "Zustand",
      "TanStack Query",
    ],
    result:
      "Delivered 12 production domain modules covering 90+ REST endpoints. Replaced error-prone paper workflows with real-time digital tracking, reduced volumetric billing disputes to zero through verified dynamic CFT rollups, and gave project managers instant visibility into fabrication milestones, yard inventory, and installation progress across multiple project sites.",
    lessons:
      "In industrial supply chains, never store derived volumetric aggregates like CFT in database columns; computing on the fly from verified base dimensions eliminates reconciliation drift across revisions. Furthermore, decoupling lifecycle status from physical facility location enabled clean, auditable transfer workflows across complex multi-facility supply chains.",
    keywords: [
      "NestJS",
      "React",
      "PostgreSQL",
      "Prisma",
      "SaaS",
      "ERP",
      "TypeScript",
      "Multi-Tenancy",
      "Enterprise",
    ],
    datePublished: "2024-10-15",
    featured: true,
    gradient: "from-sky-500/20 to-indigo-500/20",
  },
  {
    slug: "handwriting-analysis-portal",
    title: "Handwriting Analysis Portal",
    tagline: "Handwriting analysis platform with payments & monorepo architecture",
    role: "Full Stack Developer",
    duration: "15 months",
    outcome: "99.9% uptime · Scalable architecture",
    description:
      "A full-stack platform enabling graphologists to evaluate handwriting samples and auto-generate personalised PDF/Word reports for end users.",
    problem:
      "Graphologists needed a scalable platform to deliver handwriting analysis as a paid service — with user accounts, secure payments, analysis history, and admin tooling. The existing prototype couldn't handle growth or maintain code quality across teams.",
    approach:
      "I architected an NX monorepo separating the React frontend, NestJS API, and shared libraries. State management used Zustand for UI state and TanStack Query for server state with optimistic updates. MongoDB handled flexible document storage for analysis results. Razorpay integration covered subscriptions and one-time payments with webhook-driven fulfillment. Developed an admin panel managing users, graphologists, and trait combinations.",
    stack: ["React.js", "NestJS", "Zustand", "TanStack Query", "MongoDB", "Razorpay", "NX Monorepo"],
    result:
      "Delivered a production-ready platform with 99.9% uptime. The monorepo reduced duplicate code by 60% and enabled parallel frontend/backend development. Payment conversion improved 25% after checkout flow optimization.",
    lessons:
      "Monorepo tooling pays off early when types are shared across boundaries. Investing in TanStack Query's cache invalidation strategy upfront prevented countless stale-data bugs in production.",
    keywords: ["React", "NestJS", "MongoDB", "Full Stack"],
    datePublished: "2024-06-01",
    featured: true,
    gradient: "from-emerald-500/20 to-cyan-500/20",
  },
  {
    slug: "patient-mentoring-platform",
    title: "Patient Mentoring Platform",
    tagline: "Healthcare SaaS platform with real-time mentorship",
    role: "Full Stack Developer",
    duration: "10 months",
    outcome: "500+ mentor sessions · 70% cost reduction",
    description:
      "A Next.js SaaS platform integrating real-time chat, video calling, and profile-based mentor matching for surgery patients.",
    problem:
      "Healthcare mentors needed a reliable platform to schedule sessions, track patient progress, and manage communications — without the overhead of always-on servers. Data privacy requirements demanded careful architecture.",
    approach:
      "Integrated real-time chat, video calling, and profile-based mentor matching into an existing production platform used by surgery patients. Deployed serverless AWS Lambda backend integration and optimised frontend bundle size, improving load performance for mobile users. PostgreSQL for relational data — designed for scalability and cost efficiency.",
    stack: ["Next.js", "AWS Lambda", "PostgreSQL", "REST APIs", "TypeScript"],
    result:
      "Facilitated 500+ mentor sessions in the first quarter. Serverless architecture reduced infrastructure costs by 70% compared to EC2 estimates. Platform maintained 99.5% availability during peak usage.",
    lessons:
      "Lambda cold starts are manageable with provisioned concurrency for critical paths. Designing PostgreSQL schemas with healthcare audit trails from the start saved weeks of retrofitting.",
    keywords: ["Next.js", "AWS Lambda", "PostgreSQL", "Healthcare", "Serverless"],
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
