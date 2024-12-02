import type { NextAuthConfig } from "next-auth"
import { providers } from "./providers"

// Notice this is only an object, not a full Auth.js instance
export default {
    providers,
    pages: {
        signIn: "/login",
        signOut: "/logout",
    }
} satisfies NextAuthConfig