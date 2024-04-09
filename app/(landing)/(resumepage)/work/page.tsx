/**
 * Container for the work content of the main resume page. Holds all relevant prior experiences, including internships
 * and potential gig-work.
 *
 * The flow of this page will be a bit different from the projects page. Instead of a scrollable overview of projects,
 * this page will have two columns, the left hand of which will include relevant education and the right of which will
 * include actual work experiences (including internships).
 */
import EducationCard from "@/components/education-card";
import ExperienceCard from "@/components/experience-card";

export default function WorkPage() {
    return (
        <div className="lg:pr-20 flex-1 flex gap-8 lg:gap-0 flex-col lg:flex-row align-middle justify-between">
            <div className="lg:w-[47.5%] flex">
                <EducationCard />
            </div>

            <div className="lg:w-[47.5%] bg-card">
                <ExperienceCard />
            </div>
        </div>
    )
}