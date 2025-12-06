/**
 * This layout will hold the floating right-side nav that will allow a user to filter blog posts by tags.
 */
import type {Metadata} from "next";
import RightBlogNav from "@/components/blog-right-side-nav";
import {auth} from "@/auth";
import {Role} from "@/lib/definitions";
import {Button} from "@/components/ui/button";
import {PlusIcon} from "lucide-react";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Blog",
    description: "A collection of thoughts encountered during development.",
};

export default async function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await auth();

    return (
        <div className="flex-1 flex flex-col lg:flex-row-reverse overflow-y-scroll">
            <div className="lg:fixed h-[80%] flex flex-row lg:flex-col align-middle justify-center mt-6 lg:mt-0">
                <RightBlogNav />
            </div>

            <div className="lg:pr-40 flex-1 flex">
                {children}
            </div>

            {/* We would like a floating button to be able to add blog posts if we have the designated privilege for it*/}
            {
                session?.user.role === Role.ADMIN && (
                    <div className="hidden md:block md:fixed bottom-6 right-10">
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <Button
                                        className="rounded-full shadow-lg bg-card h-[50px] w-[50px] hover:bg-accent"
                                        asChild
                                    >
                                        <Link href={"/blog/new"}>
                                            <PlusIcon className="text-card-foreground"/>
                                        </Link>
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    Create New Post
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                )
            }
        </div>
    );
}