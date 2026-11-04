"use client";

import { useState } from "react";
import { siteConfig } from "@/content/site";
import { Reveal } from "./Reveal";

const whoamiOutput = [
  { key: "name", value: siteConfig.name },
  { key: "role", value: siteConfig.jobTitle },
  { key: "experience", value: `${siteConfig.yearsExperience}+ years professional` },
  { key: "location", value: `${siteConfig.location.city}, ${siteConfig.location.country}` },
  { key: "education", value: `${siteConfig.education.degree} (CGPA: ${siteConfig.education.cgpa})` },
  { key: "phone", value: siteConfig.phone },
  { key: "stack", value: siteConfig.knowsAbout.slice(0, 7).join(", ") + "..." },
];

export function About() {
  const [revealed, setRevealed] = useState(false);

  return (
    <section id="about" className="relative px-6 py-24 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="font-mono text-xs tracking-widest text-[var(--accent)] uppercase">
            01 — About
          </p>
          <h2 className="mt-4 font-display text-3xl font-bold sm:text-4xl lg:text-5xl">
            Building products, not just pages
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-12 lg:grid-cols-2">
          <Reveal delay={1}>
            <p className="text-lg leading-relaxed text-[var(--fg-muted)]">
              I&apos;m a{" "}
              <strong className="text-[var(--fg)]">{siteConfig.jobTitle}</strong> with{" "}
              <strong className="text-[var(--accent)]">
                {siteConfig.yearsExperience}+ years of experience
              </strong>{" "}
              designing and scaling web applications, enterprise multi-tenant SaaS platforms, and
              high-throughput RESTful architectures using React.js, Next.js, TypeScript, Node.js, and NestJS.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-[var(--fg-muted)]">
              Based in {siteConfig.location.city}, India, I specialize in relational &amp; NoSQL database modeling
              (PostgreSQL, Prisma ORM, MongoDB), reactive state management (TanStack Query, Zustand),
              and establishing production-grade CI/CD pipelines via GitHub Actions, Docker containerization,
              and GCP cloud deployment.
            </p>
          </Reveal>

          <Reveal delay={2}>
            <div className="terminal-border bg-[var(--bg-card)] p-6">
              <button
                type="button"
                onClick={() => setRevealed(true)}
                className="mb-4 font-mono text-sm text-[var(--accent)] transition-opacity hover:opacity-80"
              >
                $ whoami{revealed ? "" : " --click to run"}
              </button>
              <div className="space-y-2 font-mono text-sm">
                {whoamiOutput.map((line, i) => (
                  <div
                    key={line.key}
                    className={`transition-all duration-500 ${
                      revealed ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0"
                    }`}
                    style={{ transitionDelay: revealed ? `${i * 80}ms` : "0ms" }}
                  >
                    <span className="text-[var(--fg-muted)]">{line.key}:</span>{" "}
                    <span className="text-[var(--fg)]">{line.value}</span>
                  </div>
                ))}
                {revealed && (
                  <p className="pt-2 text-[var(--accent)]">
                    <span className="blink">▊</span>
                  </p>
                )}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
