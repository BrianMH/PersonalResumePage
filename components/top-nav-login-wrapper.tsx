/**
 * Wraps the top nav with an async component that grabs user login status before passing it down the bar itself
 */
import {auth} from "@/auth";
import {fetchProjectBriefs} from "@/lib/data";
import TopNavigationBar from "@/components/top-nav-bar";
import {Role} from "@/lib/definitions";

export default async function TopNavWithContext() {
    // generate our login link for the user
    const loginLink = `https://github.com/login/oauth/authorize?client_id=${process.env.AUTH_GITHUB_ID}`

    // fetch projects to render them
    // We need to make sure we know our projects for our top nav
    const projBriefs = await fetchProjectBriefs();

    // fetch our user if possible
    const user = await auth();
    const loggedIn = !!user;

    return (
        <TopNavigationBar
            loginLink={loginLink}
            userImage={user?.user?.image || ''}
            username={user?.user?.name || ''}
            userRole={Role.USER}
            userLogged={loggedIn}
            projBriefs={projBriefs}
        />

    )
}