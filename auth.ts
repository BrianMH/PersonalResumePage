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
            async profile(profile, token) {
                // first define the base values we want in the token with default user privileges
                let userTokenInfo = {
                    id: profile.id.toString(),
                    name: profile.name ?? profile.login,
                    email: profile.email,
                    image: profile.avatar_url,
                    role: Role.USER,
                };

                // and then pass this in order to augment the token with our proper role
                userTokenInfo.role = await fetchUserRoleGivenEmail(userTokenInfo);

                return userTokenInfo;
            },
            checks: ["nonce"]
        }),
    ],
});
