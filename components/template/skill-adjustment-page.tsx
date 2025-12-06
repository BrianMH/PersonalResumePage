/**
 * TODO: Once Next.js 5 comes out, this can replace the ../technical_skills and ../soft_skills endpoints directly
 *       using the variable search params interface. Until then, this server component will render the desired page
 *       while cluttering the resume directory for a while.
 */
import {GaugeValue} from "@/lib/definitions";
import {fetchSoftSkills, fetchTechnicalSkills} from "@/lib/data";
import SliderWithValue from "@/components/dash_components/resume-proj-slider-form-element";
import {Button} from "@/components/ui/button";
import {EditIcon, PlusCircleIcon, XIcon} from "lucide-react";
import Link from "next/link";
import ResumeSkillUpdateForm from "@/components/dash_components/resume-skill-form-modal";

export default async function ResumeSkillPageEditor({ skillType } : { skillType : "soft" | "technical" }) {
    // first we can get our skills here
    let relSkills : GaugeValue[];
    switch (skillType) {
        case "soft":
            relSkills = await fetchSoftSkills(false);
            break;
        case "technical":
            relSkills = await fetchTechnicalSkills(false);
            break;
        default:
            relSkills = [];
    }

    return (
        <div className="flex-1 flex flex-col">
            <div className="px-3 -mt-1 h-fit font-light text-sm">
                Select a skill to make changes to it.
            </div>

            <div className="flex-1">
                <div
                    className="grid py-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                >
                    {relSkills.map(curSkill => {

                        return (
                            <div
                                key={curSkill.id}
                                className="flex flex-row h-full w-full border-2 p-3 border-muted border-dashed"
                            >
                                <SliderWithValue
                                    name={curSkill.name}
                                    defaultVal={curSkill.barVal}
                                    className="flex-1 pr-2"
                                    disabled
                                />
                                <div className="flex flex-col h-full gap-2">
                                    <Button type="button" variant="destructive" className="p-0.5 h-6 w-6">
                                        <XIcon className="h-full w-full"/>
                                    </Button>
                                    <Button type="button" variant="outline" className="p-0.5 h-6 w-6">
                                        <EditIcon className="h-full w-full"/>
                                    </Button>
                                </div>
                            </div>
                        )
                    })}

                    {/*A new element creator*/}
                    <ResumeSkillUpdateForm
                        triggerElem={
                            <Button
                                type="button"
                                variant="outline"
                                className="flex flex-row h-full w-full border-2 p-3 border-muted border-dashed justify-center align-middle"
                            >
                                <div
                                    className="flex flex-col justify-center align-middle"
                                >
                                    <PlusCircleIcon/>
                                </div>
                            </Button>
                        }
                    />
                </div>
            </div>

            <div className="flex flex-row justify-around">
                <Link
                    href={"/dashboard/resume"}
                >
                    <Button type="button">
                        Back
                    </Button>
                </Link>
            </div>
        </div>
    )
}