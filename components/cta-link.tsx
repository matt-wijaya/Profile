"use client";

import Link from "next/link";
import { ArrowUpRight, MoveRight } from "lucide-react";

import { isPlaceholderLink } from "@/lib/utils";

type CtaLinkProps = {
  href: string;
  label: string;
  emphasis?: "primary" | "secondary";
  className?: string;
  cursorLabel?: string;
  onActivate?: () => void;
  openInNewTab?: boolean;
};

function normalizeHref(href: string) {
  if (!href || href.startsWith("/") || href.startsWith("#") || /^[a-z][a-z\d+.-]*:/i.test(href)) {
    return href;
  }

  return `https://${href}`;
}

export function CtaLink({
  href,
  label,
  emphasis = "secondary",
  className = "",
  cursorLabel = "EXIT ARCHIVE ↗",
  onActivate,
  openInNewTab,
}: CtaLinkProps) {
  const placeholder = isPlaceholderLink(href);
  const normalizedHref = normalizeHref(href);
  const opensNewTab = openInNewTab ?? (normalizedHref.startsWith("http") || normalizedHref.startsWith("/"));
  const baseClass =
    emphasis === "primary"
      ? "console-button bg-[linear-gradient(180deg,#f09a46,#c95f23)] text-[#1d130d] hover:brightness-105"
      : "console-button border-[rgba(145,105,66,0.54)] bg-[linear-gradient(180deg,rgba(53,40,28,0.96),rgba(30,22,16,0.96))] text-[var(--text)] hover:border-[rgba(224,120,45,0.58)] hover:text-[#f5c08d]";

  if (placeholder) {
    return (
      <span
        className={`inline-flex min-h-11 items-center gap-2 px-4 py-2 text-sm font-medium transition active:translate-y-px ${baseClass} opacity-70 ${className}`}
        aria-label={`${label} placeholder pending replacement`}
      >
        {label}
        <MoveRight className="h-4 w-4" />
        <span className="meta-label text-[10px] text-current/70">placeholder</span>
      </span>
    );
  }

  return (
    <Link
      href={normalizedHref}
      target={opensNewTab ? "_blank" : undefined}
      rel={opensNewTab ? "noreferrer" : undefined}
      className={`group inline-flex min-h-11 items-center gap-2 px-4 py-2 text-sm font-medium transition active:translate-y-px ${baseClass} ${className}`}
      data-cursor-label={cursorLabel}
      onClick={onActivate}
    >
      <span>{label}</span>
      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
    </Link>
  );
}
