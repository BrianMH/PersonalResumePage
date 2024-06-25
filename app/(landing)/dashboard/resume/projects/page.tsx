/**
 * Project manipulation page.
 */
import {fetchResumeProjectIds, fetchSingleProjectById} from "@/lib/data";
import Link from "next/link";
import DashResumeProjCard from "@/components/dash_components/resume-proj-box";
import {CirclePlus} from "lucide-react";
import {Button} from "@/components/ui/button";
import ResumeProjectUpdateForm from "@/components/dash_components/resume-proj-form-modal";

export default async function Page() {
    // we get all the relevant project ids just like in the normal page
    const relProjsIds = await fetchResumeProjectIds();

    // and then render the view on the server-end
    return (
        <div className="flex-1">
            <div className="flex flex-row flex-wrap pt-3 gap-6">
                {/*Pre-defined projects*/}
                <div className="flex flex-row align-middle justify-center gap-6">
                    {relProjsIds.map(async (projId) => {
                        const fetchedProj = await fetchSingleProjectById(projId)
                        if(!fetchedProj)
                            return null;

                        return (
                            <ResumeProjectUpdateForm
                                key={projId}
                                project={fetchedProj}
                                triggerElem={(
                                    <button
                                        className="flex flex-col align-middle justify-center"
                                    >
                                        <DashResumeProjCard projId={projId}/>
                                    </button>
                                )}
                            />
                        )
                    })}
                </div>

                {/*And now the new project*/}
                <ResumeProjectUpdateForm
                    triggerElem={(
                        <button
                            className="flex flex-col align-middle justify-center"
                        >
                            <div className="w-32 h-32 border bg-card shadow-sm rounded-lg hover:bg-gray-100">
                                <div className="flex flex-row justify-center align-middle w-full h-full">
                                    <div className="flex flex-col justify-center align-middle h-full">
                                        <CirclePlus className="w-9 h-9"/>
                                    </div>
                                </div>
                            </div>
                        </button>
                    )}
                />
            </div>
        </div>
    )
}