/**
 * Contains a drop-down with relevant education information
 */
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";
import {fetchEducationEntries} from "@/lib/data";
import {convertNumericalDateToMM_YY} from "@/lib/helper";

export default async function EducationCard() {
    // first get our educational data from server
    const educationEntries = await fetchEducationEntries();

    // adjust our dates beforehand
    for(let relEntry of educationEntries) {
        relEntry.degreeStart = await convertNumericalDateToMM_YY(relEntry.degreeStart);
        relEntry.degreeEnd = await convertNumericalDateToMM_YY(relEntry.degreeEnd);
    }

    return (
        <div className="flex-1 flex flex-col bg-card p-6">
            <p className="w-full text-center font-semibold text-2xl pb-3">
                Education
            </p>

            {educationEntries.map(entry => {

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
                                        {entry.degreeLocation}
                                    </p>
                                    <div className="flex flex-row justify-between">
                                        <p>
                                            <span className="font-bold">{entry.degreeType}</span> - <span className="italic">{entry.degreeFocus}</span>
                                        </p>
                                        <p className="font-light">
                                            {entry.degreeStart} - {entry.degreeEnd}
                                        </p>
                                    </div>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent>
                                <div className="flex flex-col w-full">
                                    {entry.description.gpa &&
                                        <p>
                                            <span className="font-semibold">GPA: </span>
                                            {entry.description.gpa}
                                        </p>
                                    }
                                    {entry.description.focus &&
                                        <p>
                                            <span className="font-semibold">Program Focus: </span>
                                            {entry.description.focus}
                                        </p>
                                    }
                                    {entry.description.topics &&
                                        <p>
                                            <span className="font-semibold">Topics Covered: </span>
                                            {entry.description.topics.join(", ")}
                                        </p>
                                    }
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                )
            })}
        </div>
    )
}