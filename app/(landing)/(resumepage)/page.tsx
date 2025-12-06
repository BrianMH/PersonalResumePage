import IdentityCard from "@/components/front-page-intro-card";
import SkillInformationCard from "@/components/front-page-info-card";
import RemovableAlert from "@/components/extended_ui/dismissableError";

/**
 * On the front page, we can have a card with initial presentational info, and then a few cards that would summarize
 * what would normally be seen on a resume.e
 *
 * NOTE: Because the login typically redirects to the home page, this page is used to serve any login error messages
 * encountered.
 */

export default function Home({searchParams}: { searchParams?: { error: string | string[] | undefined } }) {

    return (
        <div className="relative flex-1 min-w-screen flex flex-col gap-6 lg:flex-row lg:gap-0">
            {
                searchParams?.error && !(searchParams.error instanceof Array) && (
                    <RemovableAlert errorValue={searchParams.error}/>
                )
            }

            <div className="z-10 flex flex-row align-middle justify-center lg:flex-none">
                <IdentityCard/>
            </div>
            <SkillInformationCard/>
        </div>
    );
}
