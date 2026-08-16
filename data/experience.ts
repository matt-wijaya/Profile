export type ExperienceEntry = {
  organization: string;
  role: string;
  year: string;
  summary: string;
  emphasis?: boolean;
};

export const experience: ExperienceEntry[] = [
  {
    organization: "PPMB KMBUI 2026",
    role: "Executive Board - UI/UX Designer",
    year: "2026",
    summary:
      "Own the UI/UX design of ppmbkmbui.net, shaping information architecture, user flows, responsive layouts, and interface consistency for freshman admissions and onboarding.",
    emphasis: true,
  },
  {
    organization: "KMBUI XVIIII - Kalyanamita Division",
    role: "Division Staff",
    year: "2026",
    summary:
      "Create magazine layouts, educational Instagram content, appreciation posts, merchandise, and live-reporting assets with a consistent visual voice.",
    emphasis: true,
  },
  {
    organization: "PMB Fasilkom UI",
    role: "Visual Design Staff",
    year: "2026",
    summary:
      "Designed social-media information assets and merchandise, photographed orientation activities, and helped communicate key incoming-student information.",
  },
  {
    organization: "COMPFEST 17",
    role: "Expert Staff - Visual Design",
    year: "2025",
    summary:
      "Produced mascot variations, booklets, presentation decks, and social assets within an established design system, emphasizing readability and consistency.",
    emphasis: true,
  },
];
