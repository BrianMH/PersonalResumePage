/**
 * A project card that collects the data from a project and allows displaying of both the bullets and references in
 * a floating box. This class is encapsulated such that it only requests a single element so that the elements can be
 * independently queried from the back-end (and allow animations).
 */
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import Link from "next/link";
import {fetchSingleProjectById} from "@/lib/data";
import {convertNumericalDateToMM_YY} from "@/lib/helper";
import ResProjIconSelector from "@/components/extended_ui/resproj-icon-selector";
import {CSSProperties} from "react";
import {CSSDelayProps} from "@/lib/definitions";

export default async function ResumeProjectCard({ projectId, className, style } : { projectId : string, className? : string, style? : CSSDelayProps }) {
    const singleProj = await fetchSingleProjectById(projectId);
    if(!singleProj)
        return (<></>);

    // convert our single project's dates
    singleProj.projectStart = await convertNumericalDateToMM_YY(singleProj.projectStart);
    singleProj.projectEnd = await convertNumericalDateToMM_YY(singleProj.projectEnd);

    if(!singleProj)
        return (<></>);

    return (
        <div className={className} style={style}>
            <div
                className="bg-card text-card-foreground min-w-full md:min-w-[60%] w-fit md:max-w-[75%] h-fit shadow-xl">
                {/*Header portion for the card*/}
                <div className="bg-accent p-6">
                    <p className="font-light text-sm">
                        {singleProj.projectType}
                    </p>
                    <div className="flex flex-col-reverse md:flex-row justify-between">
                        <p>
                            <span className="font-bold">{singleProj.projectRole}</span> - <span
                            className="italic">{singleProj.title}</span>
                        </p>
                        <p className="text-sm md:text-base font-light">
                            {singleProj.projectStart} - {singleProj.projectEnd}
                        </p>
                    </div>

                    <p className="font-thin text-sm italic">
                        {singleProj.shortDescription}
                    </p>
                </div>

                {/*Body containing the bullets*/}
                <div className="p-6 pb-3 pt-3">
                    <ul className="list-disc list-inside">
                        {singleProj.content.bullets.map((bullet, index) => {
                            return (
                                <li key={index}>{bullet}</li>
                            );
                        })}
                    </ul>
                </div>

                {/*And finally our footer with references if available*/}
                {singleProj.content.references && singleProj.content.references.length > 0 &&
                    (
                        <div className="flex flex-row gap-3 p-6 pt-0">
                            <div className="flex flex-col justify-center align-middle">
                                References:
                            </div>

                            {singleProj.content.references && singleProj.content.references.map(curReference => {
                                return (
                                    <TooltipProvider
                                        key={curReference.id}
                                    >
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Link
                                                    href={curReference.href}
                                                    className="flex flex-col justify-center align-middle"
                                                >
                                                    <ResProjIconSelector iconString={curReference.icon} className="h-full"/>
                                                </Link>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>{curReference.description}</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                );
                            })}
                        </div>
                    )
                }
            </div>
        </div>
    )
}