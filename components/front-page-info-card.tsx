/**
 * This sets up the portion of the page that manages basic skill information in the form of sliders
 */
import {Separator} from "@/components/ui/separator";
import {fetchSoftSkills, fetchTechnicalSkills} from "@/lib/data";
import {Slider} from "@/components/ui/slider";

export default async function SkillInformationCard() {
    // first get our data
    const techSkills = await fetchTechnicalSkills();
    const softSkills = await fetchSoftSkills();

    return (
        <div className="flex-1 flex flex-col align-middle bg-card p-10 relative lg:right-20 lg:pl-24">
            {/*About me page*/}
            <p className="font-semibold text-2xl">
                About Me
            </p>

            <p className="text-sm pt-3">
                I am an Electrical Engineering MS graduate with varied experiences in software and hardware. My
                prior experiences highlight this diverse background with an emphasis in project management, technical
                learning, and innovative problem solving. When combined with my technical background in machine learning
                and computer science, I can approach many problems from various angles.
            </p>

            <Separator className="my-3" />

            <p className="font-semibold text-2xl">
                Technical Skills
            </p>

            {/*This would hold the technical skills along with gauges for them*/}
            <div className="grid py-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {techSkills.map(curSkill => {

                    return (
                        <div
                            key={curSkill.id}
                            className="flex flex-col"
                        >
                            <p>{curSkill.name}</p>
                            <div className="flex flex-row align-middle justify-center">
                                <Slider
                                    defaultValue={[curSkill.barVal]}
                                    max={100}
                                    step={1}
                                    disabled

                                />
                                <p className="pl-6">
                                    {(curSkill.barVal/10).toFixed(1)}
                                </p>
                            </div>
                        </div>
                    )
                })}
            </div>

            <Separator className="my-3" />

            <p className="font-semibold text-2xl">
                Soft Skills
            </p>

            {/*And again with soft skills that could be relevant*/}
            <div className="grid py-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {softSkills.map(curSkill => {

                    return (
                        <div
                            key={curSkill.id}
                            className="flex flex-col"
                        >
                            <p>{curSkill.name}</p>
                            <div className="flex flex-row align-middle justify-center">
                                <Slider
                                    defaultValue={[curSkill.barVal]}
                                    max={100}
                                    step={1}
                                    disabled

                                />
                                <p className="pl-6">
                                    {(curSkill.barVal/10).toFixed(1)}
                                </p>
                            </div>
                        </div>
                    )
                })}
            </div>

        </div>
    )
}