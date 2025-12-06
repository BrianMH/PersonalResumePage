/**
 * Provides some of the error messages and structures used to display certain messages
 */

export const Errors : { [key : string] : number } = {
    LOGIN_DISABLED_ERROR : 1,
}

/**
 * The following are the error structs. These contain the actual error messages indexed by the error ID. The message
 * contains the error issue, the context contains the subtext usually indicating what to do, and the name indicates
 * the actual error name.
 */
type ErrorStruct = { name: string, message : string, context : string }
export const ErrorStructs : { [key : string ] : ErrorStruct } = {
    "1" : {
        name: "General Login Disabled",
        message: "Login currently disabled for all non-admin users.",
        context: "Contact the site admin if you need access.",
    }
}