import type { Profile } from "@/data/profile";

import { SectionLabel } from "./section-label";

type AboutProps = {
  profile: Profile;
};

export function About({ profile }: AboutProps) {
  const meta = [
    ["Name", profile.name],
    ["Field", profile.degree],
    ["Institute", profile.university],
    ["Location", profile.location],
    ["Active", profile.studyPeriod],
    ["GPA", profile.gpa],
  ] as const;

  return (
    <section id="about" className="section-anchor py-18 sm:py-24">
      <div className="container-grid">
        <SectionLabel index="04" title="About" />
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(18rem,0.55fr)]">
          <div className="system-record p-5 sm:p-7">
            <p className="display-font text-balance text-[clamp(2rem,4vw,3.25rem)] leading-[1.02] tracking-[-0.05em]">
              I&apos;m Matthew, a Computer Science student at Universitas Indonesia who enjoys working somewhere
              between deciding how a digital product should work and figuring out how to actually build it.
            </p>
            <p className="mt-6 max-w-2xl text-base leading-8 text-[var(--muted)]">
              My work spans product design, UI/UX, visual systems, web interfaces, and software development. I
              like projects where design decisions and technical decisions have to meet somewhere in the middle.
            </p>
          </div>
          <aside className="system-record p-5 sm:p-7">
            <p className="meta-label text-[10px] text-[var(--accent)]">Personnel Record</p>
            <div className="archive-rule mt-4" />
            <div className="record-table mt-5">
              {meta.map(([label, value]) => (
                <div key={label} className="record-row">
                  <span>{label}</span>
                  <strong>{value}</strong>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
