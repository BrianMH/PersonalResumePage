/**
 * This layout will hold the floating right-side nav that will allow a user to filter blog posts by tags.
 */
import type {Metadata} from "next";
import RightBlogNav from "@/components/blog-right-side-nav";

export const metadata: Metadata = {
    title: "Blog",
    description: "A collection of thoughts encountered during development.",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex-1 flex flex-col lg:flex-row-reverse overflow-y-scroll">
            <div className="lg:fixed h-[80%] flex flex-row lg:flex-col align-middle justify-center mt-6 lg:mt-0">
                <RightBlogNav />
            </div>

            <div className="lg:pr-40 flex-1 flex">
                {children}
            </div>
        </div>
    );
}