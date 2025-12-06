/**
 * Does exactly what we saw from the education card, but instead with work experiences / internships instead
 */
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";
import {BookOpenCheckIcon, GithubIcon, GlobeIcon, LinkedinIcon} from "lucide-react";
import Link from "next/link";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import {fetchExperienceEntries} from "@/lib/data";
import {convertNumericalDateToMM_YY} from "@/lib/helper";


export default async function ExperienceCard() {
    const experienceEntries = await fetchExperienceEntries();

    // convert our date values
    for(let relEntry of experienceEntries) {
        relEntry.jobTimeStart = await convertNumericalDateToMM_YY(relEntry.jobTimeStart);
        relEntry.jobTimeEnd = await convertNumericalDateToMM_YY(relEntry.jobTimeEnd);
    }

    return (
        <div className="flex-1 flex flex-col bg-card p-6">
            <p className="w-full text-center font-semibold text-2xl pb-3">
                Experience
            </p>

            {experienceEntries.map(entry => {

                return (
                    <Accordion
                        key={entry.id}
                        type="single"
                        collapsible
                    >
                        <AccordionItem value={entry.id.toString()}>
                            {/*For our trigger, we want a brief overview of the degree along with the main info*/}
                            <AccordionTrigger>
                                <div className="flex flex-col w-full pr-2">
                                    <p>
                                        {entry.jobLocation}
                                    </p>
                                    <div className="flex flex-row justify-between">
                                        <p>
                                            <span className="font-bold">{entry.jobType}</span> - <span className="italic">{entry.jobTitle}</span>
                                        </p>
                                        <p className="font-light">
                                            {entry.jobTimeStart} - {entry.jobTimeEnd}
                                        </p>
                                    </div>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent>
                                <div className="flex flex-col w-full">
                                    <ul className="list-disc list-inside">
                                        {entry.description.bullets.map((bulletObject, index) => {
                                            return (
                                                <li key={index}>{bulletObject}</li>
                                            );
                                        })}
                                    </ul>

                                    {/*And then references if they exist for the position (NDA allowing)*/}
                                    { entry.description.references && entry.description.references.length > 0 &&
                                        (
                                            <div className="flex flex-row gap-3 pt-3">
                                                <div className="flex flex-col justify-center align-middle">
                                                    References:
                                                </div>

                                                {entry.description.references && entry.description.references.map(curReference => {
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
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                )
            })}
        </div>
    );
}