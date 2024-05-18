/**
 * Sets up the middleware for use in the website
 *
 * TODO: Deal with token re-authentication so that login isn't prompted by default... Maybe work on server-side ADMIN
 *       privilege as well based on (unique) email.
 */
import type {Account, NextAuthConfig} from 'next-auth';
import {JWT} from "@auth/core/jwt";
import {syncAccessToken, updateAccessToken} from "@/lib/databaseOps";
import {Role} from "@/lib/definitions";

export const authConfig = {
    pages: {
        signIn: '/'
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            // first we can get the user's role before making any assumptions
            // TODO: Convert list of roles into JWT token attribute and use to delineate valid paths for middleware
            const userRole = (auth && auth.user.role) || Role.USER;
            const isLoggedIn = !!auth?.user;

            const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
            const isCreatingNewPost = nextUrl.pathname.endsWith('/blog/new');

            if (isOnDashboard) {
                if (isLoggedIn) return true;
                return false; // Redirect unauthenticated users to main page
            } else if(isCreatingNewPost) {
                if(isLoggedIn && userRole === Role.ADMIN) return true;
                return false;
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
                token.refresh_token = account.refresh_token!;
                token.refresh_token_expires_at = (account.expires_at!) - (account.expires_in!) + (account.refresh_token_expires_in || 0);
                token.access_token = account.access_token!;
                token.expires_at = account.expires_at!;
                token.referer = account.provider;

                // then we can attempt to make sure the server is properly synchronized with the given account
                // as this isn't handled automatically (for example, if a token is lost and automatically issued on login)
                try {
                    const respMessage = await syncAccessToken(account.provider, account.providerAccountId, account.access_token!, account.expires_at!);
                    if(respMessage.errors !== undefined)
                        throw respMessage;
                } catch (e) {
                    console.log("Error synchronizing user token with backend.");
                }

                return token;
            } else if(Date.now() < token.expires_at * 1000) {
                // token is still valid, continue using it
                return token;
            } else if(token.refresh_token && token.expires_at && Date.now() < token.refresh_token_expires_at * 1000) {
                // token has expired and still within realm of refreshing. try to refresh it via refresh token
                try {
                    const response = await fetch("https://github.com/login/oauth/access_token?" +
                                                            new URLSearchParams({
                                                                client_id: process.env.AUTH_GITHUB_ID!,
                                                                client_secret: process.env.AUTH_GITHUB_SECRET!,
                                                                grant_type: "refresh_token",
                                                                refresh_token: token.refresh_token,
                                                                }),
                    {
                            headers: {
                                "Content-Type": "application/x-www-form-urlencoded",
                                "Accept" : "application/json",  // required as default response is text
                            },
                            method: "POST",
                        })

                    // convert to our adjusted class and check response
                    const timeOfResponse = Date.now();
                    if(!response.ok) throw response;
                    const tokens : Account = await response.json();

                    // and once the response works, we ask our database to change the currently saved token
                    await updateAccessToken(token.sub!,
                        token.access_token,
                        token.expires_at,
                        tokens.access_token!,
                        Math.floor(timeOfResponse / 1000 + tokens.expires_in!));

                    return {
                        ...token,
                        access_token: tokens.access_token,
                        expires_at: Math.floor(timeOfResponse / 1000 + tokens.expires_in!),
                        refresh_token: tokens.refresh_token,
                        refresh_token_expires_at: Math.floor(timeOfResponse / 1000 + tokens.refresh_token_expires_in!),
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
            session.user.access_token = token.access_token;
            session.user.referer = token.referer;

            return session;
        }
    },
    session: { strategy: "jwt" },
    providers: [],
} satisfies NextAuthConfig;