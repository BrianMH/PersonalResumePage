/**
 * Presents a side-navigation menu that allows for easy access of resume logical groups
 */
'use client';
import {BriefcaseBusinessIcon, GanttChartIcon, UserRoundIcon} from "lucide-react";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {clsx} from "clsx";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

const resumeComponents = [
    {name: "About", description: "Basic Info", href: "/", icon: UserRoundIcon},
    {name: "Experience", description: "Prior Experiences", href: "/work", icon: BriefcaseBusinessIcon},
    {name: "Projects", description: "Prior/Current Projects", href: "/projects", icon: GanttChartIcon},
]

export default function SideNavBar() {
    const pathName = usePathname();

    return (
        <div className="flex flex-row lg:flex-col mt-6 ml-0 lg:mt-0 lg:ml-6 bg-background gap-1">
            {resumeComponents.map(component => {
                const ComponentIcon = component.icon;

                return (
                <TooltipProvider
                    key={component.name}
                >
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Link
                                href={component.href}
                                className={clsx("flex flex-col align-middle justify-center p-3 items-center h-24 w-24 transition-colors hover:bg-accent hover:text-accent-foreground ",
                                    {
                                        'bg-accent' : component.href === "/" ? pathName === component.href : pathName.startsWith(component.href),
                                    })}
                            >
                                {/* And for each link we can use the icon and name */}
                                <ComponentIcon className="flex-1" />
                                <p className="pt-3 text-sm">
                                    {component.name}
                                </p>
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>{component.description}</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            )})}
        </div>
    )
}