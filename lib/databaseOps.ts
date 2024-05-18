'use server';
/**
 * Contains all the operations that immediately communicate with the connected backend
 */
import { z } from 'zod';
import {Role, ServerStatusResponse} from "@/lib/definitions";
import {unstable_noStore as noStore} from "next/dist/server/web/spec-extension/unstable-no-store";

/***********************************************************************
 *                       FETCH OPERATION
 * *********************************************************************/
/**
 * Backend specific API request. This operation can only make requests with representation as the backend.
 * @param url
 * @param requestType
 * @param jsonResponse
 * @param data
 */
export async function makeAPIRequestWithData(url: string,
                                             requestType: "POST" | "GET" | "DELETE" | "PATCH" | "PUT",
                                             jsonResponse: boolean = false,
                                             data: Record<string, any> | null = null) {
    noStore(); // prevent any caching of response

    // access token will be attached to all requests but only validated on certain paths
    const accessTokHeader = {"Authorization": `Bearer ${process.env.BACKEND_API_KEY}`};

    let response = await fetch(url, {
        method: requestType,
        headers: {"Content-Type": "application/json",
            ...accessTokHeader},
        ...(data && {body: JSON.stringify(data)})
    });

    try {
        if (jsonResponse)
            return response.json();
        else
            return response;
    } catch(error) {
        console.error("Database Error: ", error);
        throw new Error("Failed to generate a proper response...")
    }
}

/***********************************************************************
 *                      TOKEN OPERATIONS                               *
 ***********************************************************************/
type UserStatus = {
    errors?: {
        id?: string[],
        email?: string[],
        username?: string[],
        access_token?: string[],
        expires?: string[],
        roles?: string[],
    },
    message?: string,
}

const User = z.object({
    id: z.string({
        required_error: "Id cannot be an empty string.",
    }),
    email: z.string({
        required_error: "E-mail cannot be empty.",
    }).email({
        message: "E-mail must adhere to email format.",
    }),
    username: z.string({
        required_error: "Username cannot be empty.",
    }),
    access_token: z.string(),
    expires: z.coerce.number().min(0),
    roles: z.array(z.object({authority: z.string()})).optional(),
})

// specific operation parsing
const tokenUpdateSchema = z.object({
    id: User.shape.id,
    old_access_token: User.shape.access_token,
    old_expires_at: User.shape.expires,
    new_access_token: User.shape.access_token,
    new_expires_at: User.shape.expires,
})

const tokenSyncSchema = z.object({
    access_token: User.shape.access_token,
    expires_at: User.shape.expires,
    provider: z.string({
        required_error: "Provider must be a valid string."
    }),
    provider_account_id: z.string({
        required_error: "Provider account id cannot be empty."
    }),
})

/**
 * Unlike below, which modifies a given user's possible tokens based on the old value to refresh the value, this simply
 * indicates to the backend that the token should match what was passed to the backend.
 * @param provider
 * @param providerId
 * @param accessToken
 * @param expiry
 */
export async function syncAccessToken(provider: string, providerId: string, accessToken: string, expiry: number) : Promise<UserStatus> {
    const validatedTokenSync = tokenSyncSchema.safeParse({
        access_token: accessToken,
        expires_at: expiry,
        provider: provider,
        provider_account_id: providerId,
    })

    if(!validatedTokenSync.success) {
        console.log(validatedTokenSync.error.flatten());
        return {
            errors: {},
            message: "Improperly formatted input data",
        }
    }

    // then attempt server communication
    try {
        const relEndpoint = process.env.BACKEND_API_ROOT + "/users/updateToken";
        const response = await makeAPIRequestWithData(relEndpoint, "POST", false, validatedTokenSync.data);

        // make sure response is valid
        if(!response.ok) {
            console.log("Response failed with status code: " + response.status);
            throw response;
        }

        // and process make sure our return is valid
        const payload : ServerStatusResponse = await response.json();
        if(!payload.success) {
            console.log(payload);
            throw payload;
        }

        // then finally return success
        return {
            message: "Tokens synced."
        }
    } catch (e) {
        console.log("Failed to perform token sync.");
        return {
            errors: {},
            message: "Failed to perform token sync. Is the server up?"
        }
    }
}

/**
 * Performs the updating of tokens on the server backend using the server's API key.
 *
 * @param userId the user to change the access token for
 * @param oldAccessToken the user's corresponding email
 * @param oldExpiry the old token's expiration time
 * @param newAccessToken the new token to change it to
 * @param newExpiry the expiration time of the new token
 */
export async function updateAccessToken(userId : string, oldAccessToken : string, oldExpiry : number, newAccessToken : string, newExpiry : number) : Promise<UserStatus> {
    const validatedTokenUpdate = tokenUpdateSchema.safeParse({
        id: userId,
        old_access_token: oldAccessToken,
        old_expires_at: oldExpiry,
        new_access_token: newAccessToken,
        new_expires_at: newExpiry,
    })

    if(!validatedTokenUpdate.success) {
        console.log(validatedTokenUpdate.error.flatten());
        return {
            message: "Improperly formatted input data.",
        }
    }

    // then try updating via server update
    try {
        const relEndpoint = process.env.BACKEND_API_ROOT + `/users/${userId}/update_token`
        const response = await makeAPIRequestWithData(relEndpoint, "POST", false, validatedTokenUpdate.data);

        // and then make sure our response is valid
        if(!response.ok) {
            console.log("Response failed with status code: " + response.status);
            throw response;
        }

        // and process make sure our return is valid
        const payload : ServerStatusResponse = await response.json();
        if(!payload.success) {
            console.log(payload);
            throw payload;
        }

        // otherwise successful patch applied
        return {
            message: "Patch applied",
        }

    } catch (e) {
        console.log("Failed to commit to server update: " + e);
        return {
            errors: {},
            message: "Failed server update. Is the server up?",
        }
    }
}