/**
 * Contains a picture of the resume owner along with some connections available to select.
 */
import Image from "next/image";
import {DownloadIcon, GithubIcon, LinkedinIcon, MailIcon, MapPinIcon} from "lucide-react";
import {Separator} from "@/components/ui/separator";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {clsx} from "clsx";
import {RESUME_PATH} from "@/lib/consts";

const referenceComponents = [
    {name: "Brian Henriquez", href: "https://linkedin.com", icon: LinkedinIcon},
    {name: "BrianMH", href: "https://github.com/BrianMH", icon: GithubIcon},
    {name: "bmhenriq@eng.ucsd.edu", href: "mailto:bmhenriq@eng.ucsd.edu", icon: MailIcon},
    {name: "Los Angeles, CA", href: "", icon: MapPinIcon},
]

export default function IdentityCard() {
    // declare our resume file path
    const resumePath = process.env.AWS_CLOUDFRONT_SERVE_ORIGIN + RESUME_PATH;

    return (
        <div className="w-[24vw] min-w-fit min-h-fit flex flex-col justify-center align-middle z-10">
            {/*  For the identity part, we would like a smaller card on the left that looks like it's "floating" */}
            <div className="relative flex flex-col h-fit">
                {/* Image div */}
                <div className="relative w-full flex flex-row align-middle justify-center">
                    <Image
                        src={process.env.AWS_CLOUDFRONT_SERVE_ORIGIN + "/static/avatar.png"}
                        width={200}
                        height={200}
                        alt="profile picture"
                        className="rounded-full"
                    />
                </div>
                {/*We push our bottom div up a bit to cover the avatar halfway*/}
                <div className="relative bottom-[100px] -mb-[100px]"></div>

                {/*And this contains the actual link information*/}
                <div className="flex-1 flex flex-col w-full align-middle p-6 pt-[115px] shadow-2xl bg-gradient-to-b from-background from-[57%] to-secondary to-[57%]">
                    <p className="text-5xl font-serif text-center text-foreground pb-2">
                        Brian <span className="block font-semibold">Henriquez</span>
                    </p>
                    <p className="text-center sm:text-lg font-light text-accent-foreground">
                        Aspiring Full-Stack Developer
                    </p>
                    <p className="text-center sm:text-lg font-light text-accent-foreground">
                        Machine Learning Enthusiast
                    </p>

                    <Separator className="my-4" />

                    {/* We can place our links to social pages here... */}
                    <div className="flex flex-col align-middle justify-center w-full gap-1">
                        {referenceComponents.map(component => {
                            const ComponentIcon = component.icon;

                            return (
                                <Link
                                    key={component.name}
                                    href={component.href}
                                    className={clsx("flex flex-row align-middle justify-center ",
                                                component.href === "" ? "pointer-events-none" : "")}
                                    aria-disabled={component.href === ""}
                                    tabIndex={component.href === "" ? -1 : 0}
                                >
                                    <ComponentIcon />
                                    <p className="pl-2 flex flex-col align-middle justify-center text-sm">{component.name}</p>
                                </Link>
                            )
                        })}
                    </div>

                    <Separator className="my-4" />

                    {/*At the very bottom we would like to have a button to allow users to download a resume*/}
                    <div className="relative flex flex-row align-middle justify-center">
                        <Button asChild>
                            <div className="flex flex-row">
                                <DownloadIcon className="h-4 pr-2 "/>
                                <a href={resumePath} target="_blank">Download Resume</a>
                            </div>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}