import {fetchProjects} from "@/lib/data";

/**
 * Like with the work page, this holds some brief descriptions for the projects that were created, along with links
 * that point to their actual project pages (might need to flesh this element out a bit more)
 */
export default async function ProjectsOverviewPage() {
    // we can fetch our projects here
    const relProjs = await fetchProjects();

    return (
        <div className="bg-card p-6 mr-20 flex-1">
            This is the project overview page!
        </div>
    )
}