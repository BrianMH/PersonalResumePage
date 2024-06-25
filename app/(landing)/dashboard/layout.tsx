import {DashSideNav} from "@/components/dash-side-nav";
import {Separator} from "@/components/ui/separator";

/**
 * The resume page is special as it requires a special navigation bar on the left to allow for much easier navigation in
 * the page. These have been logically grouped into this particular section
 */
export default async function SideNavigationLayout( { children, slot } :
    { children : React.ReactNode, slot : React.ReactNode }) {

    return (
        <div className="flex-1 flex flex-col bg-black bg-opacity-10 backdrop-blur-md p-6 pt-44 -mt-36 pr-12">
            <div className="text-2xl px-6 py-3 w-40 mx-6 bg-card shadow-xl">
                <p className="w-full text-center">
                    Settings
                </p>
            </div>

            <div className="flex flex-1 flex-col md:flex-row">
                <div className="mx-6 h-fit w-40 bg-card shadow-xl flex flex-col items-center">
                    <Separator className="w-[80%]"/>
                    <DashSideNav />
                </div>

                {/*Render all config pages simultaneously*/}
                <div className="relative flex-1 flex flex-col p-6 bg-card mt-6 md:mt-0">
                    <div className="pb-3 px-3">
                        {slot}
                    </div>

                    <div className="flex-1 flex flex-col">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}