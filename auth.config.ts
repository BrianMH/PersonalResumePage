/**
 * Sets up the middleware for use in the website
 *
 * TODO: Deal with token re-authentication so that login isn't prompted by default... Maybe work on server-side ADMIN
 *       privilege as well based on (unique) email.
 */
import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
    pages: {
        signIn: '/'
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
            if (isOnDashboard) {
                if (isLoggedIn) return true;
                return false; // Redirect unauthenticated users to login page
            } else if (isLoggedIn) {
                return true;
            }
            return true;
        },
        // processes the JWT
        async jwt({token, user}) {
            // console.log("Inside JWT callback");
            // console.log(token);
            // console.log(user);
            return token;
        },
        // modifies the session so that particular attributes are visible from the user inner attribute
        // these attributes would be returned on calling getSession(), getServerSession(), and useSession()
        async session({ session, token, user }) {
            // console.log("Inside session callback");
            // console.log(session);
            // console.log(user);
            return session;
        }
    },
    session: { strategy: "jwt" },
    providers: [],
} satisfies NextAuthConfig;