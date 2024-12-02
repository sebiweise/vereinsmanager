import type { NextAuthConfig } from "next-auth"
import { providers } from "./providers"

// Notice this is only an object, not a full Auth.js instance
export default {
    providers,
    callbacks: {
        async redirect({ url, baseUrl }) {
            // Allows relative callback URLs
            if (url.startsWith("/")) return `${baseUrl}${url}`
            // Allows callback URLs on the same origin
            else if (new URL(url).origin === baseUrl) return url
            return baseUrl
        }
    },
    pages: {
        signIn: "/login",
        signOut: "/logout",
    }
} satisfies NextAuthConfig