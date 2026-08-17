import type { Project } from "@/data/projects";

import { CtaLink } from "./cta-link";
import { ProjectCard } from "./project-card";
import { SectionLabel } from "./section-label";
import { TemporalSection } from "./temporal-archive";

type ProjectShowcaseProps = {
  projects: Project[];
};

export function ProjectShowcase({ projects }: ProjectShowcaseProps) {
  return (
    <TemporalSection id="work" className="section-anchor py-18 sm:py-24">
      <div className="container-grid">
        <SectionLabel
          index="02"
          title="From the Workbench"
          intro="Selected projects involving research, interfaces, experiments, and the occasional battle with production code."
        />
        <div className="space-y-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </div>
        <div className="mt-8 flex justify-end">
          <CtaLink
            href="/projects"
            label="ACCESS FULL ARCHIVE"
            cursorLabel="ACCESS"
            openInNewTab={false}
          />
        </div>
      </div>
    </TemporalSection>
  );
}
