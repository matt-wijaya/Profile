import { ContactFooter } from "@/components/footer";
import { Hero } from "@/components/hero";
import { MoreWork } from "@/components/more-work";
import { ProjectShowcase } from "@/components/project-showcase";
import { ExperienceStrip } from "@/components/experience-strip";
import { experience } from "@/data/experience";
import { profile } from "@/data/profile";
import { moreProjects, selectedProjects } from "@/data/projects";

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  url: "https://www.mattwijaya.tech/",
  email: profile.email,
  affiliation: {
    "@type": "CollegeOrUniversity",
    name: profile.university,
  },
  sameAs: [profile.github, profile.linkedin, profile.behance],
  knowsAbout: [
    "Software Engineering",
    "Web Development",
    "Product Design",
    "Interaction Design",
    "User Experience",
    "Human-Computer Interaction",
  ],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <main>
        <Hero profile={profile} />
        <ProjectShowcase projects={selectedProjects} />
        <ExperienceStrip experience={experience} cvHref={profile.cv} cvAvailable={profile.cvAvailable} />
        <MoreWork projects={moreProjects} />
      </main>
      <ContactFooter profile={profile} />
    </>
  );
}
