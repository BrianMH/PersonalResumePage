/**
 * After some reconsideration, I felt that it could be more useful to create the site info page as a sort of CMS for
 * a pseudo-blog. Not a fully functional one, but enough to give an insight into how the process of creating the website
 * was like.
 *
 * NOTE: dangerouslySetInnerHTML={{__html: TestTest}} can be used to admit data into an inner HTML (potentially with bugs)
 */
import {fetchNextNPPostIds, fetchNumPages} from "@/lib/data";
import BlogPostCard from "@/components/blog-post-preview";
import PaginationToN from "@/components/pagination-with-max-n";
import {Suspense} from "react";
import {Skeleton} from "@/components/ui/skeleton";
import {auth} from "@/auth";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert";
import {AlertCircle} from "lucide-react";
import {Role} from "@/lib/definitions";

interface SearchParamType {
    searchParams?: {
        category?: string; // this would hold the category if relevant
        page?: string; // and the corresponding page
    }
}

export default async function BlogPage({ searchParams } : SearchParamType ) {
    // we would want to load up the most recent 5 blog posts by default, so we get our post ids and forward them to
    // individually suspended blog preview components
    const query = searchParams?.category || '';
    const currentPage = Number(searchParams?.page) || 1;
    const totalPages = await fetchNumPages(query);
    const currentPostIds = await fetchNextNPPostIds(query, currentPage);

    // if we have -1 pages and nothing within our current post ids, warn of the server being down
    if(totalPages === -1 && currentPostIds.length === 0) {
        return (
            <main className="flex-1 flex mb-6 p-6 min-w-screen max-w-full flex-col">
                <div className="h-fit flex flex-row align-middle justify-center">
                    <div className="w-fit flex flex-col bg-card p-6 text-center shadow-lg mb-12">
                        <h1 className="text-2xl">
                            Personal Blog
                        </h1>
                        <h4 className="font-light">
                            A collection of random thoughts and/or project progress reports...
                        </h4>
                    </div>
                </div>

                <div className="h-fit flex flex-row align-middle justify-center">
                    <div className="h-fit flex flex-row align-middle justify-center">
                        <Alert variant="destructive" className="bg-card">
                            <AlertCircle className="h-4 w-4"/>
                            <AlertTitle>Error</AlertTitle>
                            <AlertDescription>
                                Backend blog server is down. Please be patient as the backend could take some time to fix.
                            </AlertDescription>
                        </Alert>
                    </div>
                </div>
            </main>
    )
    }

    return (
        <main className="flex-1 flex mb-6 p-6 min-w-screen max-w-full flex-col">
            <div className="h-fit flex flex-row align-middle justify-center">
                <div className="w-fit flex flex-col bg-card p-6 text-center shadow-lg mb-12">
                    <h1 className="text-2xl">
                        Personal Blog
                    </h1>
                    <h4 className="font-light">
                        A collection of random thoughts and/or project progress reports...
                    </h4>
                </div>
            </div>

            {/*And here we will see our blog previews*/}
            <div className="h-fit flex flex-row align-middle justify-center">
                <div className="flex flex-col gap-y-6">
                    {currentPostIds.map(idWrapper => {

                        return (
                            <BlogPostCard
                                key={idWrapper.id}
                                blogId={idWrapper.id}
                            />
                        )
                    })}
                </div>
            </div>

            {/*Finally our pagination which will be dependent on the total number of posts present*/}
            <div>
                <PaginationToN nPages={totalPages} />
            </div>
        </main>
    )
}