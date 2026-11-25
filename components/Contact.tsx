"use client";

import { useState } from "react";
import { siteConfig } from "@/content/site";
import { Reveal } from "./Reveal";

const inquiryTypes = ["Remote Full-Time", "Contract", "Freelance Project"] as const;
type InquiryType = (typeof inquiryTypes)[number];

export function Contact() {
  const [inquiryType, setInquiryType] = useState<InquiryType>("Remote Full-Time");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedDraft, setCopiedDraft] = useState(false);

  const buildDraft = () => {
    const sender = name.trim() || "there";
    const subject = `[${inquiryType}] Inquiry from ${sender}`;
    const bodyLines = [
      `Hi ${siteConfig.name.split(" ")[0]},`,
      "",
      message.trim() || `I'm reaching out regarding a ${inquiryType.toLowerCase()} opportunity.`,
      "",
      name.trim() ? `— ${name.trim()}` : "",
    ].filter((line, idx, arr) => !(line === "" && idx === arr.length - 1));

    return { subject, body: bodyLines.join("\n") };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { subject, body } = buildDraft();
    window.location.href = `mailto:${siteConfig.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(siteConfig.email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } catch {
      // Clipboard API may be unavailable in restricted contexts
    }
  };

  const handleCopyDraft = async () => {
    const { subject, body } = buildDraft();
    const formatted = `To: ${siteConfig.email}\nSubject: ${subject}\n\n${body}`;
    try {
      await navigator.clipboard.writeText(formatted);
      setCopiedDraft(true);
      setTimeout(() => setCopiedDraft(false), 2000);
    } catch {
      // Clipboard API may be unavailable in restricted contexts
    }
  };

  return (
    <section id="contact" className="relative px-6 py-24 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="font-mono text-xs tracking-widest text-[var(--accent)] uppercase">
            05 — Contact
          </p>
          <h2 className="mt-4 font-display text-3xl font-bold sm:text-4xl lg:text-5xl">
            Let&apos;s build something
          </h2>
        </Reveal>

        <Reveal delay={1}>
          <div className="terminal-border mt-12 grid gap-10 bg-[var(--bg-card)] p-6 sm:p-8 lg:grid-cols-12 lg:gap-12 lg:p-12">
            <div className="flex flex-col justify-between gap-8 lg:col-span-6">
              <div>
                <div className="flex items-center gap-3">
                  <span className="relative flex h-3 w-3">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--accent)] opacity-40" />
                    <span className="relative inline-flex h-3 w-3 rounded-full bg-[var(--accent)]" />
                  </span>
                  <span className="font-mono text-sm text-[var(--accent)]">
                    {siteConfig.availability}
                  </span>
                </div>

                <p className="mt-6 text-lg leading-relaxed text-[var(--fg-muted)]">
                  Looking for a {siteConfig.jobTitle} with {siteConfig.yearsExperience}+ years of
                  experience in React.js, Next.js, Node.js, and NestJS? Send a quick inquiry or
                  reach out directly.
                </p>
              </div>

              <div className="space-y-3 border-t border-[var(--border)] pt-6">
                <div className="flex flex-wrap items-center justify-between gap-2 border border-[var(--border)] bg-[var(--bg)]/50 px-4 py-3">
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="font-mono text-xs text-[var(--fg)] transition-colors hover:text-[var(--accent)] sm:text-sm"
                  >
                    {siteConfig.email}
                  </a>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="cursor-pointer font-mono text-[11px] text-[var(--accent)] transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
                  >
                    {copiedEmail ? "copied ✓" : "copy()"}
                  </button>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
                  <a
                    href={`tel:${siteConfig.phone.replace(/\s+/g, "")}`}
                    className="font-mono text-xs text-[var(--fg-muted)] transition-colors hover:text-[var(--accent)]"
                  >
                    {siteConfig.phone}
                  </a>

                  <div className="flex gap-5">
                    {Object.entries(siteConfig.social).map(([key, url]) => (
                      <a
                        key={key}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-xs text-[var(--fg-muted)] uppercase transition-colors hover:text-[var(--accent)]"
                        aria-label={key}
                      >
                        {key} ↗
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-5 border-t border-[var(--border)] pt-8 lg:col-span-6 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-12"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-[var(--accent)]">
                  compose_message()
                </span>
                <span className="font-mono text-[10px] text-[var(--fg-muted)]">
                  opens email draft
                </span>
              </div>

              <div>
                <p className="mb-2 font-mono text-[11px] text-[var(--fg-muted)]">
                  Inquiry Type
                </p>
                <div className="flex flex-wrap gap-2">
                  {inquiryTypes.map((type) => {
                    const active = inquiryType === type;
                    return (
                      <button
                        key={type}
                        type="button"
                        aria-pressed={active}
                        onClick={() => setInquiryType(type)}
                        className={`cursor-pointer border px-3 py-1.5 font-mono text-xs transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] ${
                          active
                            ? "border-[var(--accent)] bg-[var(--accent-dim)] text-[var(--accent)]"
                            : "border-[var(--border)] bg-[var(--bg)]/50 text-[var(--fg-muted)] hover:border-[var(--accent)] hover:text-[var(--fg)]"
                        }`}
                      >
                        {type}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label
                  htmlFor="contact-name"
                  className="mb-1.5 block font-mono text-[11px] text-[var(--fg-muted)]"
                >
                  Your Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Alex Morgan"
                  className="w-full border border-[var(--border)] bg-[var(--bg)]/60 px-3.5 py-2.5 font-mono text-xs text-[var(--fg)] placeholder:text-[var(--fg-muted)]/50 focus:border-[var(--accent)] focus:outline-none"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="mb-1.5 block font-mono text-[11px] text-[var(--fg-muted)]"
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Share role details, timeline, or project scope..."
                  className="w-full resize-none border border-[var(--border)] bg-[var(--bg)]/60 px-3.5 py-2.5 font-mono text-xs text-[var(--fg)] placeholder:text-[var(--fg-muted)]/50 focus:border-[var(--accent)] focus:outline-none"
                />
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-1">
                <button
                  type="submit"
                  className="cursor-pointer border border-[var(--accent)] bg-[var(--accent)] px-6 py-3 font-mono text-xs font-medium text-[var(--bg)] transition-shadow hover:shadow-[0_0_24px_var(--accent-dim)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
                >
                  send_email() →
                </button>
                <button
                  type="button"
                  onClick={handleCopyDraft}
                  className="cursor-pointer border border-[var(--border)] px-4 py-3 font-mono text-xs text-[var(--fg-muted)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
                >
                  {copiedDraft ? "draft copied ✓" : "copy_draft()"}
                </button>
              </div>
            </form>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
