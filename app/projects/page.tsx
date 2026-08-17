import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { ProjectCard } from "@/components/project-card";
import { allProjects } from "@/data/projects";
import { SITE_URL } from "@/lib/site-url";

const title = "Projects \u2014 Matthew Wijaya";
const description =
  "Explore software engineering, product design, interaction design, and web projects by Matthew Wijaya.";
const pageUrl = `${SITE_URL}/projects`;
const ogImageUrl = `${SITE_URL}/opengraph-image`;

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title,
    description,
    url: pageUrl,
    siteName: "Matthew Wijaya Portfolio",
    images: [
      {
        url: ogImageUrl,
        width: 1200,
        height: 630,
        alt: "Matthew Wijaya portfolio preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [{ url: ogImageUrl, alt: "Matthew Wijaya portfolio preview" }],
  },
};

function HomeLink({ label }: { label: string }) {
  return (
    <Link
      href="/"
      className="console-button inline-flex min-h-11 items-center gap-2 border-[rgba(145,105,66,0.54)] bg-[linear-gradient(180deg,rgba(53,40,28,0.96),rgba(30,22,16,0.96))] px-4 py-2 text-sm font-medium text-[var(--text)] transition hover:border-[rgba(224,120,45,0.58)] hover:text-[#f5c08d] active:translate-y-px"
      data-cursor-label="RETURN"
    >
      <ArrowLeft className="h-4 w-4" aria-hidden="true" />
      {label}
    </Link>
  );
}

export default function ProjectsPage() {
  return (
    <main className="min-h-screen pb-20 pt-32 sm:pb-28 sm:pt-40">
      <div className="container-grid">
        <header className="mb-10 border-b border-[rgba(224,120,45,0.14)] pb-8 md:mb-14">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
            <p className="meta-label text-xs text-[var(--accent)]">ARCHIVE DIRECTORY // COMPLETE</p>
            <HomeLink label="RETURN HOME" />
          </div>
          <p className="meta-label text-[10px] text-[var(--muted)]">archive index / all case files</p>
          <h1 className="display-font mt-3 text-balance text-[clamp(3rem,7vw,6.25rem)] leading-[0.92] tracking-[-0.06em] text-[#f0e3ca]">
            Project Archive
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-[var(--muted)] sm:text-lg">
            A complete record of software, product, interaction, web, and visual design work.
          </p>
        </header>

        <div className="space-y-8">
          {allProjects.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} headingLevel="h2" />
          ))}
        </div>

        <div className="mt-10 flex justify-end">
          <HomeLink label="RETURN TO PRIMARY ARCHIVE" />
        </div>
      </div>
    </main>
  );
}
