import type { ProjectStatus } from "@/data/projects";

export function isPlaceholderLink(href: string) {
  return !href || href.includes("PLACEHOLDER") || href.endsWith("_URL") || href === "GITHUB_PROFILE_URL" || href === "LINKEDIN_PROFILE_URL";
}

export function formatStatus(status?: ProjectStatus) {
  switch (status) {
    case "case-study":
      return "case study";
    case "development":
      return "in development";
    default:
      return status ?? "draft";
  }
}

export function statusTone(status?: ProjectStatus) {
  switch (status) {
    case "live":
      return "border border-[rgba(224,120,45,0.35)] bg-[rgba(224,120,45,0.12)] text-[var(--accent)]";
    case "built":
      return "border border-[rgba(91,96,67,0.4)] bg-[rgba(91,96,67,0.16)] text-[#d7dfb3]";
    case "prototype":
      return "border border-[rgba(240,138,50,0.34)] bg-[rgba(240,138,50,0.14)] text-[#f3bb80]";
    case "development":
      return "border border-[rgba(128,101,74,0.36)] bg-[rgba(101,81,58,0.12)] text-[var(--text)]";
    default:
      return "border border-[rgba(128,101,74,0.36)] bg-[rgba(101,81,58,0.12)] text-[var(--text)]";
  }
}
