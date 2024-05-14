import BottomBarReference from "@/components/bottom-footer-references";
import Image from "next/image";
import TopNavWithContext from "@/components/top-nav-login-wrapper";
import {auth} from "@/auth";

/**
 * The top bar for most of the resume page (aside from the management dash, most likely)
 */
export default async function TopNav( { children } : Readonly<{ children : React.ReactNode }>) {
    return (
        <div className="relative flex flex-col min-h-screen min-w-full bg-opacity-85 bg-neutral-50 overflow-hidden">
            <div className="fixed w-[100%] h-[100%] -z-20 left-0 top-0">
                <Image
                    src={process.env.AWS_CLOUDFRONT_SERVE_ORIGIN + "/static/quadPCB.png"}
                    alt="A picture of a PCB layout for a quadcopter"
                    fill
                    className="absolute -z-10 object-cover"
                />
            </div>

            <div className="pt-6 md:mx-[10%] min-w-fit shadow-xl">
                <TopNavWithContext />
            </div>

            <div className="flex-1 flex flex-col">
                {children}
            </div>

            <BottomBarReference />
        </div>
    )
}