import NextAuth from 'next-auth';
import {authConfig} from './auth.config';
import GithubProvider from "@auth/core/providers/github";

export const { auth, handlers: { GET, POST }, signIn, signOut } = NextAuth({
    ...authConfig,
    basePath: "/api/auth",
    providers: [
        GithubProvider({checks: ["nonce"]}),
    ],
});
