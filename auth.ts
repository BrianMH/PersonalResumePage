import NextAuth from 'next-auth';
import {authConfig} from './auth.config';
import GithubProvider from "@auth/core/providers/github";
import {Role} from "@/lib/definitions";
import RestAdapter from "@/lib/databaseAdapter";

export const { auth, handlers: { GET, POST }, signIn, signOut } = NextAuth({
    ...authConfig,
    basePath: "/api/auth",
    providers: [
        GithubProvider({
            async profile(profile, token) {
                // first define the base values we want in the token with default user privileges
                return {
                    id: profile.id.toString(),
                    name: profile.name ?? profile.login,
                    email: profile.email,
                    image: profile.avatar_url,
                    role: Role.USER,
                };
            },
            checks: ["nonce"]
        }),
    ],
    adapter: RestAdapter({ debug : process.env.ADAPER_DEBUG !== undefined }),
});
