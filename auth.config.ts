/**
 * Sets up the middleware for use in the website
 *
 * TODO: Deal with token re-authentication so that login isn't prompted by default... Maybe work on server-side ADMIN
 *       privilege as well based on (unique) email.
 */
import type {Account, NextAuthConfig} from 'next-auth';
import {Role} from "@/lib/definitions";
import {JWT} from "@auth/core/jwt";

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
        // Controls whether a login is allowed to occur
        async signIn({ user, account, profile }) {
            return true;
        },
        // processes the JWT (this would persist something to the database)
        async jwt({token, user, account}) {
            if(account && user) {
                // logon performed. save any entries required in the token as necessary
                token.role = user.role;
                token.refresh_token = account.refresh_token || "";
                token.refresh_token_expires_at = (account.expires_at || 0) - (account.expires_in || 0) + (account.refresh_token_expires_in || 0);
                token.access_token = account.access_token || "";
                token.expires_at = account.expires_at || 0;

                return token;
            } else if(Date.now() < token.expires_at * 1000) {
                // token is still valid, continue using it
                return token;
            } else if(token.refresh_token && token.expires_at && Date.now() < token.refresh_token_expires_at * 1000) {
                // token has expired and still within realm of refreshing. try to refresh it via refresh token
                try {
                    const response = await fetch("https://github.com/login/oauth/access_token",
                        {
                            headers: {
                                "Content-Type": "application/x-www-form-urlencoded",
                            },
                            body: new URLSearchParams({
                                client_id: process.env.AUTH_GITHUB_ID || "",
                                client_secret: process.env.AUTH_GITHUB_SECRET || "",
                                grant_type: "refresh_token",
                                refresh_token: token.refresh_token,
                            }),
                            method: "POST",
                        })

                    // convert to our adjusted class and check response
                    const timeOfResponse = Date.now();
                    const tokens : Account = await response.json();
                    if(!response.ok) throw tokens;

                    return {
                        ...token,
                        access_token: tokens.access_token,
                        expires_at: Math.floor(timeOfResponse / 1000 + (tokens.expires_in || 0)),
                        refresh_token: tokens.refresh_token,
                        refresh_token_expires_at: Math.floor(timeOfResponse / 1000 + (tokens.refresh_token_expires_in || 0)),
                    } as JWT
                } catch(error) {
                    console.log("Error refreshing token: ", error);
                    return null;
                }
            } else {
                // token has completely expired and not refreshable. JWT should be invalidated
                return null;
            }
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