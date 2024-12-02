import NextAuth, { NextAuthResult } from "next-auth"
import authConfig from "./config"

import { PrismaAdapter } from "@auth/prisma-adapter"
import { db } from "@/lib/db"

// const VERCEL_DEPLOYMENT = !!process.env.VERCEL_URL;

const nextAuth = NextAuth({
    adapter: PrismaAdapter(db),
    session: { strategy: "jwt" },
    // cookies: {
    //     sessionToken: {
    //         name: `${VERCEL_DEPLOYMENT ? "__Secure-" : ""}next-auth.session-token`,
    //         options: {
    //             httpOnly: true,
    //             sameSite: "lax",
    //             path: "/",
    //             // When working on localhost, the cookie domain must be omitted entirely (https://stackoverflow.com/a/1188145)
    //             domain: VERCEL_DEPLOYMENT
    //                 ? `.${process.env.NEXT_PUBLIC_APP_DOMAIN}`
    //                 : undefined,
    //             secure: VERCEL_DEPLOYMENT,
    //         },
    //     },
    // },
    ...authConfig,
});

export const signIn: NextAuthResult["signIn"] = nextAuth.signIn;
export const { handlers, auth, signOut } = nextAuth;