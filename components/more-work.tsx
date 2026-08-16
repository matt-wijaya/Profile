"use client";

import type { Project } from "@/data/projects";
import { formatStatus } from "@/lib/utils";

import { CtaLink } from "./cta-link";
import { SectionLabel } from "./section-label";
import { TemporalSection, useTemporal } from "./temporal-archive";

type MoreWorkProps = {
  projects: Project[];
};

export function MoreWork({ projects }: MoreWorkProps) {
  const { recoverFragment } = useTemporal();

  return (
    <TemporalSection id="others" className="section-anchor py-18 sm:py-24">
      <div className="container-grid">
        <SectionLabel
          index="04"
          title="Off the Record"
          intro="Not everything I design becomes a product. Here’s the rest — graphics, mascots, merchandise, and visual identities."
        />
        <div className="system-record p-3 sm:p-4">
          <div className="mb-3 grid grid-cols-[1fr_auto] gap-3 border-b border-[rgba(224,120,45,0.15)] px-3 pb-3 text-[10px] uppercase tracking-[0.18em] text-[var(--muted)] max-sm:hidden">
            <span className="mono-font">Directory Entry</span>
            <span className="mono-font">Status</span>
          </div>
          <div className="grid gap-2">
            {projects.map((project) => (
              <article
                key={project.slug}
                className="group grid gap-4 border border-[rgba(128,101,74,0.3)] bg-[rgba(16,12,9,0.58)] p-3 transition duration-300 hover:translate-x-1 hover:border-[rgba(224,120,45,0.32)] hover:bg-[rgba(38,28,18,0.72)] md:grid-cols-[minmax(0,1fr)_auto] md:items-center"
              >
                <div className="min-w-0">
                  <p className="meta-label text-[10px] text-[var(--muted)]">{project.categories.join(" / ")} / {project.year}</p>
                  <h3 className="mt-2 text-2xl font-semibold tracking-[-0.04em]">{project.title}</h3>
                  <p className="mt-2 max-w-3xl text-sm leading-7 text-[var(--muted)]">{project.description}</p>
                </div>
                <div className="flex items-center gap-3 md:justify-end">
                  <span className="mono-font hidden border border-[rgba(224,120,45,0.16)] px-3 py-2 text-[10px] uppercase tracking-[0.18em] text-[var(--muted)] sm:inline-flex">
                    {formatStatus(project.status)}
                  </span>
                  <CtaLink
                    href={project.links[0]?.href ?? ""}
                    label={project.links[0]?.label ?? "Link pending"}
                    onActivate={() => recoverFragment(2)}
                  />
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </TemporalSection>
  );
}
