import TopNavigationBar from "@/components/top-nav-bar";
import BottomBarReference from "@/components/bottom-footer-references";
import Image from "next/image";
import {fetchProjectBriefs} from "@/lib/data";

/**
 * The top bar for most of the resume page (aside from the management dash, most likely)
 */
export default async function TopNav( { children } : Readonly<{ children : React.ReactNode }>) {
    // We need to make sure we know our projects for our top nav
    const projBriefs = await fetchProjectBriefs();

    return (
        <div className="relative flex flex-col min-h-screen min-w-full bg-opacity-85 bg-neutral-50 overflow-hidden">
            <Image
                src={process.env.AWS_CLOUDFRONT_SERVE_ORIGIN + "/static/quadPCB.png"}
                alt="A picture of a PCB layout for a quadcopter"
                fill
                className="absolute -z-10 object-cover"
            />

            <div className="pt-6 mx-[10%] min-w-fit shadow-xl">
                <TopNavigationBar projBriefs={projBriefs} />
            </div>

            <div className="flex-1 flex flex-col">
                {children}
            </div>

            <BottomBarReference />
        </div>
    )
}