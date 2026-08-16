import { ContactFooter } from "@/components/footer";
import { Hero } from "@/components/hero";
import { MoreWork } from "@/components/more-work";
import { ProjectShowcase } from "@/components/project-showcase";
import { ExperienceStrip } from "@/components/experience-strip";
import { experience } from "@/data/experience";
import { profile } from "@/data/profile";
import { featuredProjects, moreProjects } from "@/data/projects";

export default function HomePage() {
  return (
    <>
      <main>
        <Hero profile={profile} />
        <ProjectShowcase projects={featuredProjects} />
        <ExperienceStrip experience={experience} cvHref={profile.cv} cvAvailable={profile.cvAvailable} />
        <MoreWork projects={moreProjects} />
      </main>
      <ContactFooter profile={profile} />
    </>
  );
}
