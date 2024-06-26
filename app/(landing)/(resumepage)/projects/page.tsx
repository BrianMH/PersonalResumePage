import {fetchResumeProjectIds} from "@/lib/data";
import ResumeProjectCard from "@/components/resume-project-card";

/**
 * Like with the work page, this holds some brief descriptions for the projects that were created, along with links
 * that point to their actual project pages (might need to flesh this element out a bit more)
 */
export default async function ProjectsOverviewPage() {
    // we can fetch our projects here
    const relProjsIds = await fetchResumeProjectIds();

    return (
        <div className="pb-1 lg:mr-20 md:pr-2">
            {/*Location of the title for the projects list*/}
            <div className="h-fit flex flex-row align-middle justify-center">
                <div className="w-fit flex flex-col bg-card p-6 text-center shadow-lg mb-6">
                    <h1 className="text-2xl">
                        Projects
                    </h1>
                    <h4 className="font-light">
                        Key projects and key points. Coursework and personal projects.
                    </h4>
                </div>
            </div>

            <div className="space-y-6">
                {relProjsIds.map(projId => {
                    return (
                        <ResumeProjectCard key={projId} projectId={projId} className="fill-mode-both delay-[100ms] animate-in fade-in-0 ease-in duration-150 flex even:flex-row-reverse odd:flex-row"/>
                    )
                })}
            </div>
        </div>
    )
}