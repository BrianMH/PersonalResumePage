import TopNavigationBar from "@/components/top-nav-bar";
import BottomBarReference from "@/components/bottom-footer-references";
import Image from "next/image";

/**
 * The top bar for most of the resume page (aside from the management dash, most likely)
 */
export default async function TopNav( { children } : Readonly<{ children : React.ReactNode }>) {
    return (
        <div className="relative flex flex-col min-h-screen min-w-full bg-opacity-85 bg-neutral-50">
            <Image
                src="/pcb.png"
                alt="A picture of a PCB layout"
                layout="fill"
                objectFit="cover"
                className="absolute -z-10"
            />

            <div className="pt-6 mx-[10%] min-w-fit shadow-xl">
                <TopNavigationBar />
            </div>

            <div className="flex-1 flex flex-col">
                {children}
            </div>

            <BottomBarReference />
        </div>
    )
}