/**
 * Sets up the middleware for use in the website
 *
 * TODO: Deal with token re-authentication so that login isn't prompted by default... Maybe work on server-side ADMIN
 *       privilege as well based on (unique) email.
 */
import type { NextAuthConfig } from 'next-auth';
import {Role} from "@/lib/definitions";

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
        /** Controls whether a login is allowed to occur **/
        async signIn({ user, account, profile }) {
            return true;
        },
        // processes the JWT (this would persist something to the database)
        async jwt({token, user, profile}) {
            if(user)
                token.role = user.role;

            return token;
        },
        // modifies the session so that particular attributes are visible from the user inner attribute
        // these attributes would be returned on calling getSession(), getServerSession(), and useSession()
        async session({ session, token, user }) {
            session.user.role = token.role;
            return session;
        }
    },
    session: { strategy: "jwt" },
    providers: [],
} satisfies NextAuthConfig;