/**
 * The create a blog page. Middleware is used to keep unwanted users from this page.
 */
import NewPostEditor from "@/components/blog-newpost-editor";

export default async function NewBlogPostPage() {

    return (
        <main className="flex-1 flex mb-6 p-6 min-w-screen flex-row align-middle justify-center">
            <div className="bg-card w-full lg:max-w-[1000px]">
                <NewPostEditor/>
            </div>
        </main>
)
}