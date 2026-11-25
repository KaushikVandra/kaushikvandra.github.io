"use client";

import { useState } from "react";
import Link from "next/link";
import { projects } from "@/content/projects";
import { Reveal } from "./Reveal";

type SkillDetail = {
  category: string;
  usage: string;
  pattern: string;
  projectSlugs: string[];
  related: string[];
};

const skillDetails: Record<string, SkillDetail> = {
  "JavaScript (ES6+)": {
    category: "Languages",
    usage:
      "Core language across 3+ years of full-stack MERN development—powering modular UI components, async API integrations, and Node.js services.",
    pattern: "Async/await data flows, ES module splitting, and browser bundle optimization.",
    projectSlugs: ["stone-management-platform", "handwriting-analysis-portal", "patient-mentoring-platform"],
    related: ["TypeScript", "React.js", "Node.js"],
  },
  TypeScript: {
    category: "Languages",
    usage:
      "Enforced strict end-to-end type safety across React/Next.js frontends, NestJS APIs, and shared NX monorepo validation schemas.",
    pattern: "Shared DTOs and type contracts across client and server boundaries.",
    projectSlugs: ["stone-management-platform", "handwriting-analysis-portal", "patient-mentoring-platform"],
    related: ["NestJS", "React.js", "Prisma ORM"],
  },
  HTML5: {
    category: "Languages",
    usage:
      "Authored semantic, accessible document structures aligned with product specifications across 5+ client web applications.",
    pattern: "Semantic landmarks, keyboard navigation, and accessible form controls.",
    projectSlugs: ["stone-management-platform", "handwriting-analysis-portal", "patient-mentoring-platform"],
    related: ["CSS3 / SCSS", "Tailwind CSS", "React.js"],
  },
  "CSS3 / SCSS": {
    category: "Languages",
    usage:
      "Built responsive layouts and custom component styling across multi-device enterprise portals and client-facing applications.",
    pattern: "Responsive grid/flex architecture and custom design tokens.",
    projectSlugs: ["stone-management-platform", "handwriting-analysis-portal"],
    related: ["Tailwind CSS", "Ant Design 5", "HTML5"],
  },
  SQL: {
    category: "Languages",
    usage:
      "Designed relational schemas and query-time volumetric (CFT) computations in PostgreSQL, guaranteeing zero derived-data drift across tenants.",
    pattern: "Query-time mathematical aggregation and relational indexing.",
    projectSlugs: ["stone-management-platform", "patient-mentoring-platform"],
    related: ["PostgreSQL", "Prisma ORM", "Multi-Tenant Architecture"],
  },
  "React.js": {
    category: "Frameworks & Libraries",
    usage:
      "Architected modular React 18 interfaces, reusable UI component libraries (cutting development turnaround by 20%), and multi-role SaaS dashboards.",
    pattern: "Route lazy loading, code-splitting, and optimistic cache updates.",
    projectSlugs: ["stone-management-platform", "handwriting-analysis-portal", "patient-mentoring-platform"],
    related: ["Next.js", "TanStack Query", "Zustand"],
  },
  "Next.js": {
    category: "Frameworks & Libraries",
    usage:
      "Built and performance-tuned production healthcare and web applications with route-level code-splitting and asset optimization (up to 40% faster load times).",
    pattern: "Route-level splitting, static/SSR rendering, and mobile bundle optimization.",
    projectSlugs: ["patient-mentoring-platform"],
    related: ["React.js", "TypeScript", "Tailwind CSS"],
  },
  "Node.js": {
    category: "Frameworks & Libraries",
    usage:
      "Engineered high-throughput RESTful backends, webhook handlers, and automated PDF/Word diagnostic report generation pipelines.",
    pattern: "Modular service layers, webhook verification, and async document workflows.",
    projectSlugs: ["stone-management-platform", "handwriting-analysis-portal"],
    related: ["NestJS", "Express.js", "REST APIs"],
  },
  NestJS: {
    category: "Frameworks & Libraries",
    usage:
      "Architected enterprise multi-tenant backends enforcing 7-role RBAC policies, finite-state machine lifecycle rules, and Razorpay webhook integrations.",
    pattern: "Modular DI architecture, RBAC guards, and FSM state transition enforcement.",
    projectSlugs: ["stone-management-platform", "handwriting-analysis-portal"],
    related: ["TypeScript", "PostgreSQL", "RBAC"],
  },
  "Express.js": {
    category: "Frameworks & Libraries",
    usage:
      "Built lightweight RESTful APIs and backend services across client projects in Agile/Scrum sprints.",
    pattern: "Middleware-driven auth, validation, and REST endpoint routing.",
    projectSlugs: ["patient-mentoring-platform"],
    related: ["Node.js", "MongoDB", "REST APIs"],
  },
  "TanStack Query": {
    category: "Frameworks & Libraries",
    usage:
      "Managed server state caching, pagination, background revalidation, and optimistic UI updates across real-time operational dashboards.",
    pattern: "Separating cached server state from transient client UI state.",
    projectSlugs: ["stone-management-platform", "handwriting-analysis-portal"],
    related: ["Zustand", "React.js", "REST APIs"],
  },
  Zustand: {
    category: "Frameworks & Libraries",
    usage:
      "Handled lightweight client UI state alongside TanStack Query server caching inside an NX monorepo graphology portal.",
    pattern: "Minimalist store slices dedicated strictly to client-side UI state.",
    projectSlugs: ["handwriting-analysis-portal"],
    related: ["TanStack Query", "React.js", "TypeScript"],
  },
  "Tailwind CSS": {
    category: "Frameworks & Libraries",
    usage:
      "Delivered consistent, responsive utility-first interfaces across SaaS operational tools and mobile-focused healthcare experiences.",
    pattern: "Composable utility tokens paired with component library primitives.",
    projectSlugs: ["stone-management-platform", "patient-mentoring-platform"],
    related: ["Ant Design 5", "Next.js", "React.js"],
  },
  "Ant Design 5": {
    category: "Frameworks & Libraries",
    usage:
      "Built data-dense enterprise tables, multi-step quarry/dispatch workflows, and role-gated admin portals for construction stone operations.",
    pattern: "Enterprise form/table primitives customized with Tailwind CSS.",
    projectSlugs: ["stone-management-platform"],
    related: ["React.js", "Tailwind CSS", "TanStack Query"],
  },
  PostgreSQL: {
    category: "Databases & ORM",
    usage:
      "Primary relational store for multi-tenant SaaS operations and patient mentoring—enforcing tenant isolation and query-time volumetric calculations.",
    pattern: "Strict relational integrity with zero persisted derived state.",
    projectSlugs: ["stone-management-platform", "patient-mentoring-platform"],
    related: ["Prisma ORM", "SQL", "Multi-Tenant Architecture"],
  },
  MongoDB: {
    category: "Databases & ORM",
    usage:
      "Stored flexible handwriting trait combinations, evaluation records, and diagnostic report metadata in the Handwriting Analysis Portal.",
    pattern: "Document modeling for dynamic evaluation criteria and nested trait trees.",
    projectSlugs: ["handwriting-analysis-portal"],
    related: ["Mongoose", "NestJS", "Node.js"],
  },
  "Prisma ORM": {
    category: "Databases & ORM",
    usage:
      "Type-safe PostgreSQL modeling and automated schema generation integrated directly into GitHub Actions CI verification pipelines.",
    pattern: "Generated TypeScript client + CI-verified migrations and tenant scoping.",
    projectSlugs: ["stone-management-platform"],
    related: ["PostgreSQL", "NestJS", "GitHub Actions (CI/CD)"],
  },
  Mongoose: {
    category: "Databases & ORM",
    usage:
      "Schema validation, indexing, and query abstraction over MongoDB collections for Node.js/NestJS APIs.",
    pattern: "Typed document schemas and middleware hooks for audit consistency.",
    projectSlugs: ["handwriting-analysis-portal"],
    related: ["MongoDB", "Node.js", "TypeScript"],
  },
  "GitHub Actions (CI/CD)": {
    category: "DevOps & Cloud",
    usage:
      "Automated typecheck, ESLint, Prisma client generation, unit tests, and build verification on every push—maintaining zero critical regressions.",
    pattern: "Automated PR quality gates before containerized deployment.",
    projectSlugs: ["stone-management-platform"],
    related: ["Docker", "CI/CD Pipelines", "GCP (Compute Engine)"],
  },
  Docker: {
    category: "DevOps & Cloud",
    usage:
      "Containerized full-stack React, NestJS, and PostgreSQL workloads for reproducible staging and production deployments.",
    pattern: "Multi-stage container builds paired with Docker Compose & Nginx.",
    projectSlugs: ["stone-management-platform"],
    related: ["Docker Compose", "Nginx", "GCP (Compute Engine)"],
  },
  "Docker Compose": {
    category: "DevOps & Cloud",
    usage:
      "Orchestrated multi-service application, database, and Nginx reverse-proxy containers on cloud VMs.",
    pattern: "Declarative multi-container networking and environment isolation.",
    projectSlugs: ["stone-management-platform"],
    related: ["Docker", "Nginx", "Linux"],
  },
  "GCP (Compute Engine)": {
    category: "DevOps & Cloud",
    usage:
      "Deployed and operated the containerized Stone Management SaaS stack in production on Google Cloud Compute Engine.",
    pattern: "Docker Compose + Nginx reverse proxy running on GCP Compute Engine.",
    projectSlugs: ["stone-management-platform"],
    related: ["Docker", "Nginx", "GitHub Actions (CI/CD)"],
  },
  Nginx: {
    category: "DevOps & Cloud",
    usage:
      "Configured reverse proxying, SSL termination, and static/API traffic routing in front of containerized React and NestJS services.",
    pattern: "Edge reverse proxy routing client assets and API traffic cleanly.",
    projectSlugs: ["stone-management-platform"],
    related: ["Docker Compose", "GCP (Compute Engine)", "Linux"],
  },
  Git: {
    category: "DevOps & Cloud",
    usage:
      "Daily feature-branch workflows, clean PR documentation, and release coordination across distributed engineering teams.",
    pattern: "Structured PR reviews integrated with automated GitHub Actions checks.",
    projectSlugs: ["stone-management-platform", "handwriting-analysis-portal", "patient-mentoring-platform"],
    related: ["GitHub Actions (CI/CD)", "Agile / Scrum"],
  },
  Linux: {
    category: "DevOps & Cloud",
    usage:
      "Managed cloud VM environments, Docker runtime setup, process monitoring, and Nginx server administration.",
    pattern: "Shell-driven server provisioning and container log diagnostics.",
    projectSlugs: ["stone-management-platform"],
    related: ["Docker", "Nginx", "GCP (Compute Engine)"],
  },
  "CI/CD Pipelines": {
    category: "Practices & Architecture",
    usage:
      "Established automated build, lint, typecheck, and test pipelines that accelerated release cycles with zero critical regressions.",
    pattern: "Fast fail checks in GitHub Actions prior to production rollout.",
    projectSlugs: ["stone-management-platform"],
    related: ["GitHub Actions (CI/CD)", "Docker"],
  },
  "Multi-Tenant Architecture": {
    category: "Practices & Architecture",
    usage:
      "Architected strict tenant data isolation across quarries, processing yards, and installation sites within a single shared SaaS platform.",
    pattern: "Tenant-scoped queries, RBAC enforcement, and zero cross-tenant leakage.",
    projectSlugs: ["stone-management-platform"],
    related: ["RBAC", "PostgreSQL", "Finite State Machines"],
  },
  "Finite State Machines": {
    category: "Practices & Architecture",
    usage:
      "Modeled and enforced strict stone lifecycle transitions—from quarry block extraction and cutting to QC inspection, dispatch, and installation.",
    pattern: "Deterministic transition guards preventing invalid operational states.",
    projectSlugs: ["stone-management-platform"],
    related: ["NestJS", "RBAC", "Multi-Tenant Architecture"],
  },
  RBAC: {
    category: "Practices & Architecture",
    usage:
      "Implemented 7 discrete role-based access control policies governing permissions across multi-facility stone operations and admin portals.",
    pattern: "Declarative role guards enforced at both API and UI route boundaries.",
    projectSlugs: ["stone-management-platform", "handwriting-analysis-portal"],
    related: ["NestJS", "Multi-Tenant Architecture", "Finite State Machines"],
  },
  "REST APIs": {
    category: "Practices & Architecture",
    usage:
      "Designed and integrated high-throughput RESTful architectures, paginated endpoints, and verified webhook receivers across 5+ client projects.",
    pattern: "Typed request/response contracts, status semantics, and query caching.",
    projectSlugs: ["stone-management-platform", "handwriting-analysis-portal", "patient-mentoring-platform"],
    related: ["NestJS", "TanStack Query", "TypeScript"],
  },
  "Agile / Scrum": {
    category: "Practices & Architecture",
    usage:
      "Collaborated with UI/UX designers and backend engineers across 3+ years of Agile/Scrum sprints—delivering features predictably across time zones.",
    pattern: "Async-friendly PR docs, sprint planning, and incremental delivery.",
    projectSlugs: ["stone-management-platform", "handwriting-analysis-portal", "patient-mentoring-platform"],
    related: ["Git", "CI/CD Pipelines"],
  },
};

const skillGroups = [
  {
    category: "Languages",
    skills: ["JavaScript (ES6+)", "TypeScript", "HTML5", "CSS3 / SCSS", "SQL"],
  },
  {
    category: "Frameworks & Libraries",
    skills: [
      "React.js",
      "Next.js",
      "Node.js",
      "NestJS",
      "Express.js",
      "TanStack Query",
      "Zustand",
      "Tailwind CSS",
      "Ant Design 5",
    ],
  },
  {
    category: "Databases & ORM",
    skills: ["PostgreSQL", "MongoDB", "Prisma ORM", "Mongoose"],
  },
  {
    category: "DevOps & Cloud",
    skills: [
      "GitHub Actions (CI/CD)",
      "Docker",
      "Docker Compose",
      "GCP (Compute Engine)",
      "Nginx",
      "Git",
      "Linux",
    ],
  },
  {
    category: "Practices & Architecture",
    skills: [
      "CI/CD Pipelines",
      "Multi-Tenant Architecture",
      "Finite State Machines",
      "RBAC",
      "REST APIs",
      "Agile / Scrum",
    ],
  },
] as const;

export function SkillsVisualization() {
  const [selectedSkill, setSelectedSkill] = useState<string>("NestJS");
  const detail = skillDetails[selectedSkill] ?? skillDetails["NestJS"];
  const shippedProjects = projects.filter((p) => detail.projectSlugs.includes(p.slug));

  return (
    <section id="skills" className="relative px-6 py-24 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="font-mono text-xs tracking-widest text-[var(--accent)] uppercase">
            04 — Skills & Stack
          </p>
          <h2 className="mt-4 font-display text-3xl font-bold sm:text-4xl lg:text-5xl">
            Full-stack toolkit
          </h2>
          <p className="mt-3 font-mono text-xs text-[var(--fg-muted)]">
            Select any skill to inspect how it was used in production.
          </p>
        </Reveal>

        <div className="mt-12 grid items-start gap-12 lg:grid-cols-12">
          <div className="space-y-8 lg:col-span-7">
            {skillGroups.map((group, gi) => (
              <Reveal key={group.category} delay={gi}>
                <div>
                  <h3 className="font-mono text-sm text-[var(--accent)]">{group.category}</h3>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {group.skills.map((skill, si) => {
                      const active = selectedSkill === skill;
                      return (
                        <button
                          key={skill}
                          type="button"
                          aria-pressed={active}
                          onClick={() => setSelectedSkill(skill)}
                          className={`terminal-border cursor-pointer px-3 py-1.5 font-mono text-xs transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] ${
                            active
                              ? "border-[var(--accent)] bg-[var(--accent-dim)] text-[var(--accent)]"
                              : "bg-[var(--bg-card)] text-[var(--fg)] hover:border-[var(--accent)] hover:text-[var(--accent)]"
                          }`}
                          style={{ transitionDelay: `${si * 20}ms` }}
                        >
                          {skill}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="lg:sticky lg:top-28 lg:col-span-5">
            <Reveal delay={2}>
              <div
                className="terminal-border bg-[var(--bg-card)] p-6 sm:p-8"
                aria-live="polite"
              >
                <div className="flex items-center justify-between gap-2 border-b border-[var(--border)] pb-4">
                  <span className="font-mono text-xs text-[var(--accent)]">
                    skill.inspect(&quot;{selectedSkill}&quot;)
                  </span>
                  <span className="border border-[var(--border)] px-2 py-0.5 font-mono text-[10px] text-[var(--fg-muted)]">
                    {detail.category}
                  </span>
                </div>

                <h3 className="mt-5 font-display text-2xl font-bold text-[var(--fg)]">
                  {selectedSkill}
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-[var(--fg-muted)]">
                  {detail.usage}
                </p>

                <div className="mt-5 border-l-2 border-[var(--accent)] bg-[var(--bg)]/60 px-4 py-3">
                  <p className="font-mono text-[10px] tracking-wider text-[var(--accent)] uppercase">
                    Key Pattern
                  </p>
                  <p className="mt-1 font-mono text-xs text-[var(--fg)]">{detail.pattern}</p>
                </div>

                <div className="mt-6">
                  <p className="font-mono text-[10px] tracking-wider text-[var(--fg-muted)] uppercase">
                    Shipped In ({shippedProjects.length})
                  </p>
                  <ul className="mt-2.5 space-y-2">
                    {shippedProjects.map((project) => (
                      <li
                        key={project.slug}
                        className="flex items-center justify-between gap-3 border border-[var(--border)] bg-[var(--bg)]/50 px-3 py-2"
                      >
                        <Link
                          href={`/work/${project.slug}`}
                          className="font-mono text-xs text-[var(--fg)] transition-colors hover:text-[var(--accent)]"
                        >
                          {project.title} →
                        </Link>
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="shrink-0 font-mono text-[11px] text-[var(--accent)] hover:opacity-80"
                          >
                            live() ↗
                          </a>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 border-t border-[var(--border)] pt-4">
                  <p className="font-mono text-[10px] tracking-wider text-[var(--fg-muted)] uppercase">
                    Paired With
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {detail.related.map((rel) => (
                      <button
                        key={rel}
                        type="button"
                        onClick={() => setSelectedSkill(rel)}
                        className="cursor-pointer border border-[var(--border)] px-2.5 py-1 font-mono text-[11px] text-[var(--fg-muted)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
                      >
                        {rel}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
