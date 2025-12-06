import {Adapter, AdapterAccount, AdapterUser} from "@auth/core/adapters";
import {makeAPIRequestWithData} from "@/lib/databaseOps";

/**
 * Returns an adapter that interface with the backend server. Since all operations are performed via a REST-based server,
 * there is a simple client implemented that performs a
 * @param options allows specification of some adjustment settings (which are yet to be implemented)
 * @constructor
 */
export default function RestAdapter(options : { debug? : boolean } = {}) : Adapter {
    return {
        async createUser(user) {
            const createUserEndpoint = process.env.BACKEND_API_ROOT + "/users/new";

            if(options.debug) {
                console.log("Creating new user with input object: ");
                console.log(user);
            }

            // presumably this actually does not contain the proper ID initially, so we need to manually
            // set it to the database value
            const savedUser : AdapterUser = await makeAPIRequestWithData(createUserEndpoint, "POST", true, user);

            return savedUser;
        },
        async getUser(id) {
            const getUserEndpoint = process.env.BACKEND_API_ROOT + `/users/${id}`;

            if(options.debug)
                console.log("Getting user with id: " + id);

            const relevantUserResponse = await makeAPIRequestWithData(getUserEndpoint, "GET");

            if(relevantUserResponse.ok) {
                const relevantUser : AdapterUser = await relevantUserResponse.json();

                if(options.debug)
                    console.log(relevantUser);

                return relevantUser;
            } else
                return null;
        },
        async getUserByEmail(email) {
            const getUserByEmailEndpoint = process.env.BACKEND_API_ROOT + `/users/email/${email}`;

            if(options.debug)
                console.log("Getting user by email with email: " + email);

            const relevantUserResponse = await makeAPIRequestWithData(getUserByEmailEndpoint, "GET");

            if(relevantUserResponse.ok) {
                const relevantUser : AdapterUser = await relevantUserResponse.json();

                if(options.debug)
                    console.log(relevantUser);

                return relevantUser;
            } else
                return null;
        },
        async getUserByAccount({ providerAccountId, provider }) {
            const getUserByAccountEndpoint = process.env.BACKEND_API_ROOT + `/users/account/${provider}/${providerAccountId}`;

            if(options.debug)
                console.log("Getting user by account with account provider and id: " + provider + " == " + providerAccountId);

            const relevantUserResponse = await makeAPIRequestWithData(getUserByAccountEndpoint, "GET");

            if(relevantUserResponse.ok) {
                const relevantUser : AdapterUser = await relevantUserResponse.json();

                if(options.debug)
                    console.log(relevantUser);

                return relevantUser;
            } else
                return null;
        },
        async updateUser(user) {
            const updateUserEndpoint = process.env.BACKEND_API_ROOT + `/users/${user.id}`;

            if(options.debug) {
                console.log("Updating user entry with new entry: ");
                console.log(user);
            }

            const updatedUser : AdapterUser = await makeAPIRequestWithData(updateUserEndpoint, "PUT", true, user);

            return updatedUser;
        },
        async deleteUser(userId) {
            const deleteUserEndpoint = process.env.BACKEND_API_ROOT + `/users/${userId}`;

            const deleteRes = await makeAPIRequestWithData(deleteUserEndpoint, "DELETE", true);

            return;
        },
        async linkAccount(account) {
            const linkAccountEndpoint = process.env.BACKEND_API_ROOT + `/users/${account.userId}/account`;

            if(options.debug) {
                console.log("Linking account to user with created object: ");
                console.log(account);
            }

            const linkedAccountResponse = await makeAPIRequestWithData(linkAccountEndpoint, "PUT", false, account);

            if(linkedAccountResponse.ok) {
                const relevantAccount : AdapterAccount = await linkedAccountResponse.json();

                if(options.debug) {
                    console.log("Linked account with user: ");
                    console.log(relevantAccount);
                }

                // since the refresh token isn't stored in the database, we return it here as well
                return {
                    ...relevantAccount,
                    refresh_token: account.refresh_token,
                };
            } else
                throw new Error("Failed to associate account to given user.");
        },
        async unlinkAccount({ providerAccountId, provider }) {
            const unlinkAccountEndpoint = process.env.BACKEND_API_ROOT + `/users/account/${provider}/${providerAccountId}`;

            const unlinkRes = await makeAPIRequestWithData(unlinkAccountEndpoint, "DELETE", true);

            return;
        },
        async createSession({ sessionToken, userId, expires }) {
            throw new Error("Not Implemented.")
        },
        async getSessionAndUser(sessionToken) {
            throw new Error("Not Implemented.")
        },
        async updateSession({ sessionToken }) {
            throw new Error("Not Implemented.")
        },
        async deleteSession(sessionToken) {
            throw new Error("Not Implemented.")
        },
        async createVerificationToken({ identifier, expires, token }) {
            throw new Error("Not Implemented.")
        },
        async useVerificationToken({ identifier, token }) {
            throw new Error("Not Implemented.")
        },
    }
}