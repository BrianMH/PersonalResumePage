/**
 * Custom 404 page as CSS seems to be odd
 */
import {Separator} from "@/components/ui/separator";

export default function NotFoundPage() {
    return (
        <div className="w-screen h-screen flex flex-col align-middle justify-center text-foreground bg-background">
            <div className="w-screen flex flex-row align-middle gap-x-4 justify-center">
                <h1 className="text-3xl font-bold flex flex-col align-middle justify-center">
                    404
                </h1>
                <Separator orientation="vertical" className="py-12" />
                <h3 className="text-xl flex flex-col align-middle justify-center">
                    This page could not be found.
                </h3>
            </div>
        </div>
    )
}