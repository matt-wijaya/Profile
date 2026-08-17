import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import type { Profile } from "@/data/profile";
import { isPlaceholderLink } from "@/lib/utils";

import { HeroVisual } from "./hero-visual";
import { TemporalSection } from "./temporal-archive";

type HeroProps = {
  profile: Profile;
};

export function Hero({ profile }: HeroProps) {
  const hasGithub = !isPlaceholderLink(profile.github);

  return (
    <TemporalSection id="about" className="section-anchor relative overflow-hidden pt-32 sm:pt-36">
      <div className="container-grid grid min-h-[78vh] items-center gap-12 pb-16 lg:grid-cols-[minmax(0,1fr)_minmax(22rem,31rem)] lg:pb-24">
        <div className="space-y-8">
          <div className="space-y-5">
            <h1 className="hero-nameplate">{profile.name}</h1>
            <div className="flex items-center gap-3">
              <div className="archive-rule hidden h-px flex-1 md:block" />
            </div>
            <h2 className="display-font text-balance max-w-[12ch] text-[clamp(3.35rem,8vw,6.9rem)] font-extrabold leading-[0.92] tracking-[-0.075em]">
              {profile.headline}
            </h2>
            <p className="max-w-2xl text-balance text-lg leading-8 text-[var(--muted)] sm:text-xl">
              {profile.supportingCopy}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="#work"
              className="console-button group inline-flex min-h-11 items-center gap-2 bg-[linear-gradient(180deg,#e9974e,#b95b25)] px-5 py-3 text-sm font-semibold text-[#1d130d] transition hover:brightness-105 active:translate-y-px"
              data-cursor-label="ACCESS"
            >
              OPEN WORK FILES
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            {hasGithub ? (
              <Link
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="console-button group inline-flex min-h-11 items-center gap-2 border-[rgba(145,105,66,0.54)] bg-[linear-gradient(180deg,rgba(53,40,28,0.96),rgba(30,22,16,0.96))] px-5 py-3 text-sm font-medium transition hover:border-[rgba(255,127,24,0.58)] hover:text-[#f5c08d] active:translate-y-px"
                data-cursor-label="EXIT ARCHIVE ↗"
              >
                Source Archive
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            ) : (
              <span className="console-button inline-flex min-h-11 items-center gap-2 border-[rgba(145,105,66,0.54)] bg-[linear-gradient(180deg,rgba(53,40,28,0.96),rgba(30,22,16,0.96))] px-5 py-3 text-sm font-medium text-[var(--muted)]">
                GitHub
                <span className="meta-label text-[10px]">placeholder</span>
              </span>
            )}
          </div>
        </div>

        <HeroVisual />
      </div>
    </TemporalSection>
  );
}
