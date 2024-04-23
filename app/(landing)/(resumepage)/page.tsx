import IdentityCard from "@/components/front-page-intro-card";
import SkillInformationCard from "@/components/front-page-info-card";

/**
 * On the front page, we can have a card with initial presentational info, and then a few cards that would summarize
 * what would normally be seen on a resume.
 */

export default function Home() {
  return (
    <div className="flex-1 min-w-screen flex flex-col gap-6 lg:flex-row lg:gap-0">
        <div className="z-10 flex flex-row align-middle justify-center lg:flex-none">
            <IdentityCard />
        </div>
        <SkillInformationCard />
    </div>
  );
}
