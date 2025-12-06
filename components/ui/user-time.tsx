'use client';
/**
 * Renders time in a client's timezone. This is tag-less, so make sure that if it needs to be enclosed somewhere that it
 * is done carefully.
 */

export default function UserFormattedTime({ setTime } : { setTime: string }) {
    return (
        <>
            {(new Date(setTime)).toLocaleString()}
        </>
    )
}