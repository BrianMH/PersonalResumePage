import SideNavBar from "@/components/side-resume-navigation";

/**
 * The resume page is special as it requires a special navigation bar on the left to allow for much easier navigation in
 * the page. These have been logically grouped into this particular section
 */
export default async function SideNavigationLayout( { children } : Readonly<{ children : React.ReactNode }>) {
    return (
        <div className="flex-1 flex flex-col lg:flex-row">
            <div className="flex flex-row lg:flex-col justify-center align-middle lg:max-h-[80vh]">
                <SideNavBar />
            </div>

            <div className="relative flex-1 flex flex-col mx-6 p-6">
                {children}
            </div>
        </div>
    )
}