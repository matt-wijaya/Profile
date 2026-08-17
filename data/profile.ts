export type Profile = {
  name: string;
  headline: string;
  supportingCopy: string;
  statusLine: string;
  opportunityBadge?: string;
  degree: string;
  university: string;
  location: string;
  region: string;
  studyPeriod: string;
  gpa: string;
  email: string;
  github: string;
  linkedin: string;
  behance: string;
  cv: string;
  cvAvailable: boolean;
};

export const profile: Profile = {
  name: "Matthew Wijaya",
  headline: "I turn ideas into interfaces, then make them work.",
  supportingCopy:
    "I'm Matthew Wijaya, a Computer Science student at Universitas Indonesia working somewhere between product design, interaction, and engineering.",
  statusLine: "based in Indonesia - currently studying @ Universitas Indonesia",
  opportunityBadge: "Open to design + engineering opportunities",
  degree: "Computer Science",
  university: "Universitas Indonesia",
  location: "Indonesia",
  region: "Depok, West Java",
  studyPeriod: "2024 - present",
  gpa: "3.69 / 4.00",
  email: "mail.matthewwijaya@gmail.com",
  github: "https://github.com/matt-wijaya",
  linkedin: "https://www.linkedin.com/in/matthew-wijaya/",
  behance: "https://www.behance.net/matthew_wijaya",
  cv: "/Matthew-Wijaya-CV.pdf",
  cvAvailable: true,
};
