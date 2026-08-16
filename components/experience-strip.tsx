"use client";

import { useEffect, useRef, useState } from "react";

import type { ExperienceEntry } from "@/data/experience";

import { CtaLink } from "./cta-link";
import { SectionLabel } from "./section-label";
import { TemporalSection, useTemporal } from "./temporal-archive";

type ExperienceStripProps = {
  experience: ExperienceEntry[];
  cvHref: string;
  cvAvailable: boolean;
};

export function ExperienceStrip({ experience, cvHref, cvAvailable }: ExperienceStripProps) {
  const { recoverFragment } = useTemporal();
  const [activeIndex, setActiveIndex] = useState(-1);
  const rowRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const rows = rowRefs.current.filter((row): row is HTMLElement => Boolean(row));
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visibleEntry) return;
        const index = Number((visibleEntry.target as HTMLElement).dataset.experienceIndex);
        setActiveIndex(index);
        recoverFragment(3);
      },
      { rootMargin: "-20% 0px -30%", threshold: [0.25, 0.55, 0.8] },
    );

    rows.forEach((row) => observer.observe(row));
    return () => observer.disconnect();
  }, [recoverFragment]);

  return (
    <TemporalSection id="experience" className="section-anchor py-18 sm:py-24">
      <div className="container-grid">
        <SectionLabel
          index="03"
          title="Places I've Been Useful"
          intro="A record of teams I joined, responsibilities I picked up, and things that made it out the door."
        />
        <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_auto]">
          <div className="experience-branch system-record grid gap-0 p-3">
            {experience.map((item, index) => (
              <article
                key={`${item.organization}-${item.year}`}
                ref={(node) => {
                  rowRefs.current[index] = node;
                }}
                data-experience-index={index}
                className={`experience-entry grid gap-3 border-b border-[rgba(145,105,66,0.22)] p-4 last:border-b-0 md:grid-cols-[5rem_minmax(12rem,0.55fr)_minmax(0,1fr)] ${
                  activeIndex === index ? "experience-entry--active" : ""
                } ${item.emphasis ? "bg-[rgba(224,120,45,0.035)]" : ""}`}
              >
                <p className="experience-year meta-label text-[10px] text-[var(--accent)]">
                  <span className="experience-node" aria-hidden="true" />
                  {item.year}
                </p>
                <div>
                  <h3 className="text-xl font-semibold tracking-[-0.04em]">{item.organization}</h3>
                  <p className="meta-label mt-2 text-[10px] text-[var(--muted)]">Role / {item.role}</p>
                </div>
                <p className="text-sm leading-7 text-[var(--muted)]">{item.summary}</p>
              </article>
            ))}
          </div>
          <div className="flex items-start xl:justify-end">
            {cvAvailable ? (
              <CtaLink href={cvHref} label="View full CV" emphasis="primary" />
            ) : (
              <span className="console-button inline-flex min-h-11 items-center px-4 py-2 text-sm text-[var(--muted)] opacity-70">
                CV PDF // PLACEHOLDER
              </span>
            )}
          </div>
        </div>
      </div>
    </TemporalSection>
  );
}
