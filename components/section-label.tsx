type SectionLabelProps = {
  index: string;
  title: string;
  intro?: string;
  align?: "left" | "right";
};

export function SectionLabel({ index, title, intro, align = "left" }: SectionLabelProps) {
  return (
    <div
      className={`mb-10 flex flex-col gap-5 border-b border-[rgba(224,120,45,0.14)] pb-6 md:mb-14 md:flex-row md:items-end md:justify-between ${
        align === "right" ? "md:flex-row-reverse" : ""
      }`}
    >
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <p className="meta-label text-xs text-[var(--accent)]">{`SECTION ${index} // ${title.toUpperCase()}`}</p>
          <div className="archive-rule hidden h-px flex-1 md:block" />
        </div>
        <p className="meta-label text-[10px] text-[var(--muted)]">
          archive index / {index}
        </p>
        <h2 className="display-font text-balance text-[clamp(2rem,4vw,3.75rem)] leading-[0.95] tracking-[-0.04em] text-[#f0e3ca]">
          {title}
        </h2>
      </div>
      {intro ? <p className="max-w-xl text-sm leading-7 text-[var(--muted)] md:text-base">{intro}</p> : null}
    </div>
  );
}
