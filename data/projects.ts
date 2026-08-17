export type ProjectLinkType =
  | "website"
  | "github"
  | "behance"
  | "figma"
  | "case-study"
  | "demo";

export type ProjectStatus = "live" | "prototype" | "case-study" | "development" | "built";

export type FeaturedLayout = "spotlight" | "split" | "stacked" | "editorial" | "device";

export type ProjectLink = {
  label: string;
  href: string;
  type: ProjectLinkType;
};

export type Project = {
  slug: string;
  title: string;
  subtitle?: string;
  year?: string;
  categories: string[];
  description: string;
  image: string;
  videoEmbedUrl?: string;
  status?: ProjectStatus;
  selected: boolean;
  group: "work" | "other";
  award?: string;
  role?: string;
  stack?: string[];
  builtByMatthew?: boolean;
  layout?: FeaturedLayout;
  links: ProjectLink[];
};

export const allProjects: Project[] = [
  {
    slug: "askmo",
    title: "ASKMO",
    subtitle: "A connected sports platform across web and mobile surfaces.",
    year: "2025",
    categories: ["Full-stack", "Web + Mobile"],
    description:
      "A connected sports platform for discovering, booking, and reviewing facilities, coaches, and events across web and mobile.",
    image: "",
    videoEmbedUrl: "https://www.youtube.com/embed/5kN-t0zCB8E?si=OZOksUOYjXCbDUg1",
    status: "built",
    selected: true,
    group: "work",
    layout: "device",
    stack: ["Booking", "Authentication", "Reviews", "Events", "Profile / History"],
    links: [
      {
        label: "Web Repository",
        href: "https://github.com/pbp-kelompok-c04/askmo",
        type: "github",
      },
      {
        label: "Mobile Repository",
        href: "https://github.com/pbp-kelompok-c04/askmo-mobile",
        type: "github",
      },
    ],
  },
  {
    slug: "hci-project",
    title: "BurhanFinance",
    subtitle: "An end-to-end HCI case study from discovery to prototype.",
    year: "2026",
    categories: ["UX Research", "Product Design"],
    description:
      "An end-to-end human-computer interaction project developed from real problem discovery and user interviews through information synthesis, interaction design, and a high-fidelity prototype.",
    image: "/projects/hci-cover.webp",
    status: "case-study",
    selected: true,
    group: "work",
    layout: "spotlight",
    stack: ["UX Research", "Interviews", "Product Design", "Figma", "Prototype"],
    links: [
      {
        label: "View Behance Case Study",
        href: "https://www.behance.net/gallery/251920851/BurhanFinance-FIntech-Mobile-App-UI-UX-Design",
        type: "behance",
      },
    ],
  },
  {
    slug: "kudos-kiddos",
    title: "Kudos Kiddos",
    subtitle: "A group-developed learning concept shaped from an open SDG brief.",
    year: "2025",
    categories: ["Group Project", "GEMASTIK Competition"],
    description:
      "An educational mobile experience shaped from an open SDG-based brief, balancing children's learning and engagement with parental supervision and AI-assisted guidance.",
    image: "/projects/kudos-kiddos-cover.webp",
    status: "case-study",
    selected: false,
    group: "work",
    role: "UI/UX Designer",
    builtByMatthew: false,
    layout: "device",
    stack: ["UX Research", "Product Design", "Interaction Design", "Figma", "Prototyping"],
    links: [
      {
        label: "View Case Study",
        href: "https://drive.google.com/file/d/1dsrIhdV3oPQgorpJ7RWI9o0fGRz-a3_P/view",
        type: "case-study",
      },
    ],
  },
  {
    slug: "ppmb-kmbui-2026",
    title: "PPMB KMBUI 2026",
    subtitle: "A live web experience shaped through brand, flow, and responsiveness.",
    year: "2026",
    categories: ["Web Design", "Development"],
    description:
      "A live digital experience designed for PPMB KMBUI 2026, combining visual identity, information hierarchy, and responsive web execution.",
    image: "/projects/ppmb-cover.webp",
    status: "live",
    selected: true,
    group: "work",
    layout: "split",
    builtByMatthew: false,
    stack: ["Product Design", "Figma", "Prototype"],
    links: [
      {
        label: "Visit Website",
        href: "https://ppmbkmbui.net",
        type: "website",
      },
    ],
  },
  {
    slug: "tunas",
    title: "Tunas",
    subtitle: "A student-to-opportunity mobile concept recognized by RISTEK Fasilkom UI.",
    year: "2025",
    categories: ["UI/UX Design"],
    description:
      "A mobile product concept connecting students with experience opportunities and UMKM hiring needs.",
    image: "/projects/tunas-cover.webp",
    status: "prototype",
    selected: false,
    group: "work",
    layout: "stacked",
    award: "Runner-up - RISTEK Fasilkom UI",
    stack: ["Personas", "User Flows", "Interface Design", "Prototype"],
    links: [
      {
        label: "View Prototype",
        href: "https://bit.ly/tunas-prototype",
        type: "figma",
      },
      {
        label: "View Case Study",
        href: "https://canva.link/e2npskryozbwk2r",
        type: "case-study",
      },
    ],
  },
  {
    slug: "law-firm-website",
    title: "ALCO's Website",
    subtitle: "A restrained client-facing website concept focused on trust and clarity.",
    year: "2025",
    categories: ["Web Design", "Client Work"],
    description:
      "A professional website concept for a legal practice, focused on clarity, trust, hierarchy, and restrained visual communication.",
    image: "/projects/lawfirm-cover.webp",
    status: "development",
    selected: false,
    group: "work",
    layout: "editorial",
    stack: ["Web Design", "UI", "Client Work", "Responsive"],
    links: [
    ],
  },
];

export const selectedProjects = allProjects.filter((project) => project.selected);
export const moreProjects = allProjects.filter((project) => project.group === "other");
