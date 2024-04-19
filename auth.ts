import NextAuth from 'next-auth';
import {authConfig} from './auth.config';
import GithubProvider from "@auth/core/providers/github";
import {Role} from "@/lib/definitions";
import {fetchUserRoleGivenEmail} from "@/lib/data";

export const { auth, handlers: { GET, POST }, signIn, signOut } = NextAuth({
    ...authConfig,
    basePath: "/api/auth",
    providers: [
        GithubProvider({
            async profile(profile) {
                return {
                    name: profile.name,
                    email: profile.email,
                    image: profile.avatar_url,
                    // for role setting, we have to fetch it from the server along with the (presumably) unique email
                    role: await fetchUserRoleGivenEmail(profile.email || ''),
                }
            },
            checks: ["nonce"]
        }),
    ],
});
