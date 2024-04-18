/**
 * This defines the URLs on which the middleware will function on. But the middleware also keeps the session
 * alive, so it should be running on all pages not serving static content, if possible.
 */
import NextAuth from 'next-auth';
import { authConfig } from './auth.config';

export default NextAuth(authConfig).auth;

export const config = {
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};