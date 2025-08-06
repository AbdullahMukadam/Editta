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
                return Response.redirect(new URL("/login", nextUrl))
            }
            return true
        },
    }
}
export const { handlers, auth, signIn, signOut } = NextAuth(authConfig)