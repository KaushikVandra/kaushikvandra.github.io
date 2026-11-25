"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { projects } from "@/content/projects";
import { navLinks } from "@/content/site";

type OutputEntry = {
  id: number;
  command?: string;
  lines: Array<
    | { type: "text"; text: string; tone?: "muted" | "accent" | "error" | "default" }
    | { type: "link"; label: string; href: string; external?: boolean; meta?: string }
  >;
};

const QUICK_COMMANDS = ["help", "live", "projects", "grep NestJS", "theme", "clear"] as const;
const AVAILABLE_COMMANDS = ["help", "live", "projects", "ls", "grep", "goto", "cd", "theme", "ping", "clear"];

const INITIAL_ENTRIES: OutputEntry[] = [
  {
    id: 0,
    lines: [
      { type: "text", text: "portfolio-shell v1.0 · interactive workspace", tone: "accent" },
      { type: "text", text: "Type 'help' or click a command below to explore.", tone: "muted" },
    ],
  },
];

export function HeroTerminal() {
  const [entries, setEntries] = useState<OutputEntry[]>(INITIAL_ENTRIES);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const nextIdRef = useRef(1);
  const outputRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [entries]);

  const runCommand = (raw: string) => {
    const trimmed = raw.trim();
    if (!trimmed) return;

    const parts = trimmed.split(/\s+/);
    const cmd = parts[0].toLowerCase();
    const arg = parts.slice(1).join(" ");

    setHistory((prev) => [trimmed, ...prev.slice(0, 19)]);
    setHistoryIndex(-1);
    setInput("");

    if (cmd === "clear" || cmd === "cls") {
      setEntries([]);
      return;
    }

    const lines: OutputEntry["lines"] = [];

    switch (cmd) {
      case "help":
        lines.push(
          { type: "text", text: "Available commands:", tone: "accent" },
          { type: "text", text: "  projects / ls     List portfolio case studies" },
          { type: "text", text: "  live              Open live production deployments" },
          { type: "text", text: "  grep <tech>       Filter projects by stack (e.g. grep NestJS)" },
          { type: "text", text: "  goto <section>    Jump to section (about, work, skills, contact)" },
          { type: "text", text: "  theme             Toggle dark / light theme" },
          { type: "text", text: "  ping              Check live deployment status" },
          { type: "text", text: "  clear             Reset terminal output" }
        );
        break;

      case "projects":
      case "ls":
        lines.push({ type: "text", text: `Found ${projects.length} production case studies:`, tone: "accent" });
        for (const p of projects) {
          lines.push({
            type: "link",
            label: p.title,
            href: `/work/${p.slug}`,
            meta: p.liveUrl ? "[live]" : "[case-study]",
          });
        }
        break;

      case "live": {
        const liveProjects = projects.filter((p) => p.liveUrl);
        if (liveProjects.length === 0) {
          lines.push({ type: "text", text: "No live URLs configured yet.", tone: "muted" });
        } else {
          lines.push({ type: "text", text: "Live production deployments:", tone: "accent" });
          for (const p of liveProjects) {
            lines.push({
              type: "link",
              label: `${p.title} (${p.liveUrl})`,
              href: p.liveUrl!,
              external: true,
              meta: "↗",
            });
          }
        }
        break;
      }

      case "grep": {
        if (!arg) {
          lines.push({ type: "text", text: "Usage: grep <keyword> (e.g. grep NestJS)", tone: "error" });
          break;
        }
        const q = arg.toLowerCase();
        const matches = projects.filter(
          (p) =>
            p.title.toLowerCase().includes(q) ||
            p.stack.some((s) => s.toLowerCase().includes(q)) ||
            p.keywords.some((k) => k.toLowerCase().includes(q))
        );
        if (matches.length === 0) {
          lines.push({ type: "text", text: `No projects matched "${arg}".`, tone: "muted" });
        } else {
          lines.push({
            type: "text",
            text: `${matches.length} match${matches.length > 1 ? "es" : ""} for "${arg}":`,
            tone: "accent",
          });
          for (const p of matches) {
            lines.push({
              type: "link",
              label: p.title,
              href: `/work/${p.slug}`,
              meta: p.stack.slice(0, 3).join(" · "),
            });
          }
        }
        break;
      }

      case "goto":
      case "cd": {
        const target = arg.replace(/^#/, "").toLowerCase();
        const validSections = navLinks.map((l) => l.href.replace("/#", ""));
        if (!target || !validSections.includes(target)) {
          lines.push({
            type: "text",
            text: `Sections: ${validSections.join(", ")}`,
            tone: "muted",
          });
          break;
        }
        const el = document.getElementById(target);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
          lines.push({ type: "text", text: `Navigating to #${target}...`, tone: "accent" });
        } else {
          lines.push({ type: "text", text: `Section #${target} not found on this page.`, tone: "error" });
        }
        break;
      }

      case "theme": {
        const root = document.documentElement;
        const isLight = root.getAttribute("data-theme") === "light";
        if (isLight) {
          root.removeAttribute("data-theme");
          lines.push({ type: "text", text: "Theme switched to dark (terminal green).", tone: "accent" });
        } else {
          root.setAttribute("data-theme", "light");
          lines.push({ type: "text", text: "Theme switched to light.", tone: "accent" });
        }
        break;
      }

      case "ping":
        lines.push(
          { type: "text", text: "PING kenashatech.com — HTTP 200 OK", tone: "accent" },
          { type: "text", text: "Stack: React 18 · NestJS · PostgreSQL · GCP", tone: "muted" }
        );
        break;

      default:
        lines.push({
          type: "text",
          text: `command not found: ${cmd}. Type 'help' for options.`,
          tone: "error",
        });
    }

    const id = nextIdRef.current++;
    setEntries((prev) => [...prev, { id, command: trimmed, lines }]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length === 0) return;
      const nextIdx = Math.min(historyIndex + 1, history.length - 1);
      setHistoryIndex(nextIdx);
      setInput(history[nextIdx]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex <= 0) {
        setHistoryIndex(-1);
        setInput("");
      } else {
        const nextIdx = historyIndex - 1;
        setHistoryIndex(nextIdx);
        setInput(history[nextIdx]);
      }
    } else if (e.key === "Tab") {
      const val = input.trim().toLowerCase();
      if (!val || val.includes(" ")) return;
      const match = AVAILABLE_COMMANDS.find((c) => c.startsWith(val));
      if (match) {
        e.preventDefault();
        setInput(match === "grep" || match === "goto" ? `${match} ` : match);
      }
    }
  };

  const toneClass = (tone?: "muted" | "accent" | "error" | "default") => {
    switch (tone) {
      case "accent":
        return "text-[var(--accent)]";
      case "muted":
        return "text-[var(--fg-muted)]";
      case "error":
        return "text-rose-400";
      default:
        return "text-[var(--fg)]";
    }
  };

  return (
    <div
      className="terminal-border flex flex-col bg-[var(--bg-card)]/90 backdrop-blur-sm"
      onClick={() => {
        if (window.getSelection()?.toString()) return;
        inputRef.current?.focus();
      }}
    >
      <div className="flex items-center justify-between border-b border-[var(--border)] px-4 py-2.5">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-rose-500/70" aria-hidden="true" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" aria-hidden="true" />
          <span className="h-2.5 w-2.5 rounded-full bg-[var(--accent)]/80" aria-hidden="true" />
          <span className="ml-2 font-mono text-[11px] text-[var(--fg-muted)]">
            kaushik@portfolio:~
          </span>
        </div>
        <span className="font-mono text-[10px] text-[var(--accent)]">interactive</span>
      </div>

      <div
        ref={outputRef}
        className="h-64 space-y-3 overflow-y-auto p-4 font-mono text-xs leading-relaxed sm:h-72"
        aria-live="polite"
      >
        {entries.map((entry) => (
          <div key={entry.id} className="space-y-1">
            {entry.command && (
              <p className="text-[var(--fg)]">
                <span className="text-[var(--accent)]">$</span> {entry.command}
              </p>
            )}
            {entry.lines.map((line, i) =>
              line.type === "link" ? (
                <div key={i} className="flex flex-wrap items-baseline justify-between gap-2 pl-2">
                  {line.external ? (
                    <a
                      href={line.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="text-[var(--accent)] underline decoration-[var(--accent)]/40 underline-offset-4 hover:opacity-80"
                    >
                      {line.label}
                    </a>
                  ) : (
                    <Link
                      href={line.href}
                      onClick={(e) => e.stopPropagation()}
                      className="text-[var(--fg)] underline decoration-[var(--border)] underline-offset-4 hover:text-[var(--accent)]"
                    >
                      {line.label}
                    </Link>
                  )}
                  {line.meta && (
                    <span className="text-[10px] text-[var(--fg-muted)]">{line.meta}</span>
                  )}
                </div>
              ) : (
                <p key={i} className={`whitespace-pre-wrap ${toneClass(line.tone)}`}>
                  {line.text}
                </p>
              )
            )}
          </div>
        ))}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          runCommand(input);
        }}
        className="flex items-center gap-2 border-t border-[var(--border)] px-4 py-2.5 font-mono text-xs"
      >
        <span className="text-[var(--accent)]" aria-hidden="true">
          $
        </span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="type 'help'..."
          aria-label="Terminal command input"
          autoComplete="off"
          spellCheck={false}
          className="w-full bg-transparent text-[var(--fg)] placeholder:text-[var(--fg-muted)]/60 focus:outline-none"
        />
      </form>

      <div className="flex flex-wrap gap-1.5 border-t border-[var(--border)] bg-[var(--bg)]/50 px-4 py-2.5">
        {QUICK_COMMANDS.map((cmd) => (
          <button
            key={cmd}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              runCommand(cmd);
            }}
            className="border border-[var(--border)] px-2 py-0.5 font-mono text-[10px] text-[var(--fg-muted)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
          >
            {cmd}
          </button>
        ))}
      </div>
    </div>
  );
}
