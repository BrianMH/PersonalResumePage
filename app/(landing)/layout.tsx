import TopNavigationBar from "@/components/top-nav-bar";
import BottomBarReference from "@/components/bottom-footer-references";

/**
 * The top bar for most of the resume page (aside from the management dash, most likely)
 */
export default async function TopNav( { children } : Readonly<{ children : React.ReactNode }>) {
    return (
        <div className="flex flex-col min-h-screen min-w-full bg-gray-200">
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