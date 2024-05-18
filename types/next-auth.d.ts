import { DefaultSession } from "next-auth"
import { DefaultUser } from "next-auth"
import { Role } from "@/lib/definitions";
import { DefaultJWT } from "next-auth/jwt"
import {TokenSet} from "@auth/core/types";

declare module "next-auth" {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        user: {
            /** User's associated role */
            role: Role;
            access_token: string; // stores access credentials for backend
            referer: string // stores the source of the access token
        } & DefaultSession["user"]
    }

    interface User extends DefaultUser {
        role: Role;
    }

    interface Account extends TokenSet {
        refresh_token_expires_in?: number;
        role: Role;
    }
}

declare module "next-auth/jwt" {
    /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
    interface JWT extends DefaultJWT {
        /** Associated user role */
        role: Role;
        refresh_token: string;
        refresh_token_expires_at: number;
        access_token: string;
        referer: string;
        expires_at: number;
    }
}