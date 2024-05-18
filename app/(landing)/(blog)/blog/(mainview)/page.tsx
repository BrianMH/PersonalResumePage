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