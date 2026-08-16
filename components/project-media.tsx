import Image from "next/image";

import type { Project } from "@/data/projects";

type ProjectMediaProps = {
  project: Project;
};

function ShellLabel({ left, right }: { left: string; right: string }) {
  return (
    <div className="mb-4 flex items-center justify-between gap-4 text-[10px] uppercase tracking-[0.18em] text-[var(--muted)]">
      <span className="mono-font">{left}</span>
      <span className="mono-font">{right}</span>
    </div>
  );
}

function ScreenFooter({ path }: { path: string }) {
  return (
    <div className="mt-4 flex items-center justify-between gap-4 text-[10px] text-[var(--muted)]">
      <span className="mono-font">replace with: {path.replace("/public/", "/")}</span>
      <span className="mono-font">asset pending</span>
    </div>
  );
}

function HciArtifact({ project }: { project: Project }) {
  return (
    <div className="hardware-shell selection-frame rounded-[var(--radius-lg)] p-4">
      <span className="frame-corner" aria-hidden="true" />
      <ShellLabel left="File 01 / Research" right="Case Study" />
      <div className="grid gap-4 lg:grid-cols-[0.48fr_0.52fr]">
        <div className="border border-[rgba(128,101,74,0.28)] bg-[rgba(19,14,10,0.74)] p-4">
          <p className="meta-label text-[10px] text-[var(--accent)]">Interview Notes</p>
          <div className="mt-4 grid gap-3">
            {["problem definition", "field interviews", "synthesis map", "prototype coverage"].map((item) => (
              <div key={item} className="border border-dashed border-[rgba(224,120,45,0.2)] px-3 py-2">
                <p className="mono-font text-[10px] uppercase tracking-[0.16em] text-[var(--muted)]">{item}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="crt-screen rounded-[8px] p-4">
          <div className="relative z-10">
            <p className="mono-font crt-copy text-[10px] uppercase tracking-[0.2em]">Prototype Screen</p>
            <div className="mt-4 grid gap-3">
              <div className="h-24 border border-[rgba(240,164,97,0.2)] bg-[rgba(240,164,97,0.05)]" />
              <div className="grid grid-cols-3 gap-3">
                <div className="h-12 border border-[rgba(240,164,97,0.2)]" />
                <div className="h-12 border border-[rgba(240,164,97,0.2)]" />
                <div className="h-12 border border-[rgba(240,164,97,0.2)]" />
              </div>
              <div className="h-20 border border-dashed border-[rgba(240,164,97,0.26)]" />
            </div>
          </div>
        </div>
      </div>
      <ScreenFooter path={project.image} />
    </div>
  );
}

function PpmbArtifact({ project }: { project: Project }) {
  return (
    <div className="hardware-shell selection-frame rounded-[var(--radius-lg)] p-4">
      <span className="frame-corner" aria-hidden="true" />
      <ShellLabel left="Status / Live" right="Operational Display" />
      <div className="rounded-[10px] border border-[rgba(128,101,74,0.36)] bg-[linear-gradient(180deg,rgba(21,15,11,0.88),rgba(13,10,8,0.98))] p-4">
        <div className="crt-screen rounded-[8px] p-4">
          <div className="relative z-10">
            <div className="mb-4 flex items-center justify-between gap-3">
              <span className="mono-font crt-copy text-[10px] uppercase tracking-[0.2em]">Access / Live Site</span>
              <span className="h-2 w-2 rounded-full bg-[rgba(240,164,97,0.82)]" />
            </div>
            <div className="grid gap-3">
              <div className="h-16 border border-[rgba(240,164,97,0.2)]" />
              <div className="grid grid-cols-[1.35fr_0.65fr] gap-3">
                <div className="h-32 border border-[rgba(240,164,97,0.2)] bg-[rgba(240,164,97,0.06)]" />
                <div className="grid gap-3">
                  <div className="h-14 border border-[rgba(240,164,97,0.2)]" />
                  <div className="h-[3.75rem] border border-[rgba(240,164,97,0.2)]" />
                  <div className="h-[3.75rem] border border-[rgba(240,164,97,0.2)]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ScreenFooter path={project.image} />
    </div>
  );
}

function AskmoArtifact({ project }: { project: Project }) {
  return (
    <div className="hardware-shell selection-frame rounded-[var(--radius-lg)] p-4">
      <span className="frame-corner" aria-hidden="true" />
      <ShellLabel left="Web / Mobile / Full Stack" right="System Build" />
      <div className="grid items-end gap-4 md:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-[10px] border border-[rgba(128,101,74,0.36)] bg-[linear-gradient(180deg,rgba(18,14,11,0.88),rgba(10,8,6,0.98))] p-3">
          <div className="crt-screen rounded-[8px] p-4">
            <div className="relative z-10 grid gap-3">
              <div className="flex items-center justify-between">
                <p className="mono-font crt-copy text-[10px] uppercase tracking-[0.2em]">Web Console</p>
                <p className="mono-font text-[10px] uppercase tracking-[0.18em] text-[#f0a461]">booking / review</p>
              </div>
              <div className="h-16 border border-[rgba(240,164,97,0.18)]" />
              <div className="grid grid-cols-[0.7fr_1.3fr] gap-3">
                <div className="space-y-3">
                  <div className="h-[4.5rem] border border-[rgba(240,164,97,0.18)]" />
                  <div className="h-[4.5rem] border border-[rgba(240,164,97,0.18)]" />
                </div>
                <div className="h-[9.75rem] border border-[rgba(240,164,97,0.2)] bg-[rgba(240,164,97,0.05)]" />
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <div className="hardware-shell rounded-[var(--radius-lg)] p-3">
            <div className="crt-screen rounded-[18px] p-3">
              <div className="relative z-10 grid gap-3">
                <p className="mono-font crt-copy text-[10px] uppercase tracking-[0.2em]">Mobile Unit</p>
                <div className="h-12 border border-[rgba(240,164,97,0.18)]" />
                <div className="h-28 border border-[rgba(240,164,97,0.2)] bg-[rgba(240,164,97,0.05)]" />
                <div className="grid grid-cols-2 gap-3">
                  <div className="h-10 border border-[rgba(240,164,97,0.18)]" />
                  <div className="h-10 border border-[rgba(240,164,97,0.18)]" />
                </div>
              </div>
            </div>
          </div>
          <div className="border border-dashed border-[rgba(224,120,45,0.24)] px-3 py-3">
            <div className="grid grid-cols-3 gap-3 text-[10px] text-[var(--muted)]">
              <span className="mono-font">AUTH</span>
              <span className="mono-font">SEARCH</span>
              <span className="mono-font">BOOKING</span>
            </div>
          </div>
        </div>
      </div>
      <ScreenFooter path={project.image} />
    </div>
  );
}

function LawArtifact({ project }: { project: Project }) {
  return (
    <div className="hardware-shell selection-frame rounded-[var(--radius-lg)] p-4">
      <span className="frame-corner" aria-hidden="true" />
      <ShellLabel left="Client Work / In Development" right="Archive Sleeve" />
      <div className="grid gap-4 lg:grid-cols-[0.28fr_0.72fr]">
        <div className="border border-[rgba(128,101,74,0.32)] bg-[rgba(250,239,214,0.06)] p-4">
          <p className="meta-label text-[10px] text-[var(--accent)]">Record</p>
          <div className="mt-4 space-y-3 text-sm text-[var(--muted)]">
            <p>clarity</p>
            <p>trust</p>
            <p>restraint</p>
            <p>hierarchy</p>
          </div>
        </div>
        <div className="border border-[rgba(128,101,74,0.32)] bg-[linear-gradient(180deg,rgba(242,232,207,0.06),rgba(25,20,15,0.34))] p-4">
          <div className="mx-auto max-w-[36rem] border border-[rgba(240,232,214,0.18)] bg-[rgba(252,246,232,0.04)] p-4">
            <div className="border-b border-[rgba(240,232,214,0.14)] pb-4">
              <p className="display-font text-3xl tracking-[-0.04em] text-[#f2e6d1]">Law Firm Website</p>
              <p className="mt-2 text-sm text-[var(--muted)]">Typography-led concept under active development.</p>
            </div>
            <div className="mt-4 grid gap-3">
              <div className="h-16 border border-[rgba(240,232,214,0.14)]" />
              <div className="h-28 border border-[rgba(240,232,214,0.14)]" />
              <div className="grid grid-cols-3 gap-3">
                <div className="h-12 border border-[rgba(240,232,214,0.14)]" />
                <div className="h-12 border border-[rgba(240,232,214,0.14)]" />
                <div className="h-12 border border-[rgba(240,232,214,0.14)]" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <ScreenFooter path={project.image} />
    </div>
  );
}

function TunasArtifact({ project }: { project: Project }) {
  return (
    <div className="hardware-shell selection-frame rounded-[var(--radius-lg)] p-4">
      <span className="frame-corner" aria-hidden="true" />
      <ShellLabel left="File 05 / Prototype" right="Runner-up Record" />
      <div className="grid gap-4 md:grid-cols-[0.78fr_0.22fr]">
        <div className="border border-[rgba(128,101,74,0.34)] p-4">
          <div className="grid gap-4 sm:grid-cols-[0.58fr_0.42fr]">
            <div className="hardware-shell rounded-[var(--radius-lg)] p-3">
              <div className="crt-screen rounded-[22px] p-3">
                <div className="relative z-10 grid gap-3">
                  <p className="mono-font crt-copy text-[10px] uppercase tracking-[0.2em]">Mobile Prototype</p>
                  <div className="h-10 border border-[rgba(240,164,97,0.18)]" />
                  <div className="h-32 border border-[rgba(240,164,97,0.2)] bg-[rgba(240,164,97,0.05)]" />
                  <div className="grid grid-cols-2 gap-3">
                    <div className="h-10 border border-[rgba(240,164,97,0.18)]" />
                    <div className="h-10 border border-[rgba(240,164,97,0.18)]" />
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              {["personas", "user flows", "hi-fi prototype"].map((item) => (
                <div key={item} className="border border-dashed border-[rgba(224,120,45,0.24)] px-3 py-3">
                  <p className="mono-font text-[10px] uppercase tracking-[0.16em] text-[var(--muted)]">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="grid gap-3">
          <div className="rounded-[var(--radius-sm)] border border-[rgba(224,120,45,0.22)] px-3 py-2 text-[10px] uppercase tracking-[0.18em] text-[var(--muted)]">
            Archive
          </div>
          <div className="rounded-[var(--radius-sm)] border border-[rgba(224,120,45,0.22)] px-3 py-2 text-[10px] uppercase tracking-[0.18em] text-[var(--muted)]">
            UI/UX
          </div>
          <div className="rounded-[var(--radius-sm)] border border-[rgba(224,120,45,0.22)] px-3 py-2 text-[10px] uppercase tracking-[0.18em] text-[var(--muted)]">
            Case Study
          </div>
        </div>
      </div>
      <ScreenFooter path={project.image} />
    </div>
  );
}

export function ProjectMedia({ project }: ProjectMediaProps) {
  const hasAsset = project.image.startsWith("/projects/");

  if (project.videoEmbedUrl) {
    return (
      <div className="relative aspect-video w-full overflow-hidden bg-[rgba(12,9,7,0.72)]">
        <iframe
          src={project.videoEmbedUrl}
          title={`${project.title} video preview`}
          className="absolute inset-0 h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
    );
  }

  if (hasAsset) {
    return (
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-[rgba(12,9,7,0.72)]">
        <Image
          src={project.image}
          alt={`${project.title} project preview`}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      </div>
    );
  }

  switch (project.slug) {
    case "hci-project":
      return <HciArtifact project={project} />;
    case "ppmb-kmbui-2026":
      return <PpmbArtifact project={project} />;
    case "askmo":
      return <AskmoArtifact project={project} />;
    case "law-firm-website":
      return <LawArtifact project={project} />;
    case "tunas":
      return <TunasArtifact project={project} />;
    default:
      return <PpmbArtifact project={project} />;
  }
}
