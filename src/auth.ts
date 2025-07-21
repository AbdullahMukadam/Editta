import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import { db } from "@/db/drizzle"
import type { NextAuthConfig } from "next-auth"


export const authConfig: NextAuthConfig = {
    adapter: DrizzleAdapter(db),
    providers: [GitHub],
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user
            const paths = ["/dashboard"]
            const isProtectedRoute = paths.some((path) => nextUrl.pathname.startsWith(path))
            if (isProtectedRoute && !isLoggedIn) {
                const redirectUrl = new URL("/login", nextUrl.origin)
                redirectUrl.searchParams.append("callbackUrl", nextUrl.pathname)
                return Response.redirect(redirectUrl)
            }
            return true
        },
    }
}
export const { handlers, auth, signIn, signOut } = NextAuth(authConfig)