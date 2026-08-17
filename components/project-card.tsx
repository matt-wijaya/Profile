"use client";

import type { Project } from "@/data/projects";
import { formatStatus, statusTone } from "@/lib/utils";

import { CtaLink } from "./cta-link";
import { ProjectMedia } from "./project-media";
import { ScanOverlay, useTemporal } from "./temporal-archive";

type ProjectCardProps = {
  project: Project;
  index: number;
  headingLevel?: "h2" | "h3";
};

export function ProjectCard({ project, index, headingLevel = "h3" }: ProjectCardProps) {
  const { recoverFragment } = useTemporal();
  const topLink = project.links[0];
  const secondLink = project.links[1];
  const caseNumber = (index + 1).toString().padStart(2, "0");
  const openProject = () => recoverFragment(2);
  const Heading = headingLevel;

  return (
    <article
      className="case-file group surface-card overflow-hidden p-3 transition duration-300 hover:border-[rgba(224,120,45,0.26)] hover:bg-[var(--surface-hover)] sm:p-4"
    >
      <ScanOverlay />
      <div className="mb-3 grid gap-2 border-b border-[rgba(224,120,45,0.14)] pb-3 text-[10px] uppercase tracking-[0.18em] text-[var(--muted)] sm:grid-cols-[1fr_auto]">
        <span className="mono-font text-[var(--accent)]">CASE {caseNumber} / {project.year ?? "UN-DATED"}</span>
        <span className="mono-font">ARCHIVE STATUS: ACCESSIBLE</span>
      </div>
      <div className="grid gap-5 xl:grid-cols-[minmax(0,1.1fr)_minmax(20rem,0.9fr)]">
        <div className="overflow-hidden border border-[rgba(145,105,66,0.24)] bg-[rgba(12,9,7,0.48)]">
          <div className="transition duration-300 group-hover:scale-[1.02]">
            <ProjectMedia project={project} />
          </div>
        </div>
        <div className="flex flex-col justify-between gap-6 p-1">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className={`border px-3 py-1 text-xs font-medium uppercase tracking-[0.16em] ${statusTone(project.status)}`}>
                {formatStatus(project.status)}
              </span>
              {project.award ? <span className="border border-[rgba(224,120,45,0.18)] px-3 py-1 text-xs">{project.award}</span> : null}
              {project.role || project.builtByMatthew === false ? (
                <span className="border border-[rgba(224,120,45,0.18)] px-3 py-1 text-xs text-[var(--muted)] uppercase tracking-[0.16em]">
                  role / {project.role ?? "design"}
                </span>
              ) : null}
            </div>
            <div>
              <p className="meta-label text-[10px] text-[var(--accent)]">{project.categories.join(" / ")}</p>
              <Heading className="display-font mt-3 text-[clamp(2rem,4vw,3.2rem)] leading-[0.95] tracking-[-0.05em]">
                {project.title}
              </Heading>
              {project.subtitle ? <p className="mt-3 max-w-lg text-base leading-7 text-[var(--muted)]">{project.subtitle}</p> : null}
            </div>
            <p className="max-w-xl text-sm leading-7 text-[var(--muted)] sm:text-base">{project.description}</p>
            {project.stack?.length ? (
              <ul className="flex flex-wrap gap-2">
                {project.stack.map((item) => (
                  <li key={item} className="border border-[rgba(224,120,45,0.14)] px-3 py-1 text-xs text-[var(--muted)]">
                    {item}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
          <div className="flex flex-wrap gap-3">
            {topLink ? <CtaLink href={topLink.href} label={topLink.label} emphasis="primary" onActivate={openProject} /> : null}
            {secondLink ? <CtaLink href={secondLink.href} label={secondLink.label} onActivate={openProject} /> : null}
          </div>
        </div>
      </div>
    </article>
  );
}
