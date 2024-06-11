/**
 * A project card that collects the data from a project and allows displaying of both the bullets and references in
 * a floating box. This class is encapsulated such that it only requests a single element so that the elements can be
 * independently queried from the back-end (and allow animations).
 */
import {BookOpenCheckIcon, GithubIcon, GlobeIcon, LinkedinIcon} from "lucide-react";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import Link from "next/link";
import {fetchSingleProjectById} from "@/lib/data";

export default async function ResumeProjectCard({ projectId, className } : { projectId : string, className? : string }) {
    const singleProj = await fetchSingleProjectById(projectId);

    if(!singleProj)
        return (<></>);

    return (
        <div className={className}>
            <div
                className="bg-card text-card-foreground min-w-full md:min-w-[60%] w-fit md:max-w-[75%] h-fit shadow-xl">
                {/*Header portion for the card*/}
                <div className="bg-accent p-6">
                    <p className="font-light text-sm">
                        {singleProj.project_type}
                    </p>
                    <p>
                        <span className="font-bold">{singleProj.project_role}</span> - <span
                        className="italic">{singleProj.title}</span>
                    </p>

                    <p className="font-thin text-sm italic">
                        {singleProj.short_description}
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
                                // disambiguate between relevant icons for references
                                let RelIcon;
                                switch (curReference.icon) {
                                    case 'GITHUB_ICON':
                                        RelIcon = GithubIcon;
                                        break;
                                    case 'LINKEDIN_ICON':
                                        RelIcon = LinkedinIcon;
                                        break;
                                    case 'BOOK_ICON':
                                        RelIcon = BookOpenCheckIcon;
                                        break;
                                    default:
                                        RelIcon = GlobeIcon;
                                }

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
                                                    <RelIcon className="h-full"/>
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