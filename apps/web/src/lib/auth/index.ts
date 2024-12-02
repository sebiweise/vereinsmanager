import NextAuth, { NextAuthResult } from "next-auth"
import authConfig from "./config"

import { PrismaAdapter } from "@auth/prisma-adapter"
import { db } from "../db"

const nextAuth = NextAuth({
    adapter: PrismaAdapter(db),
    session: { strategy: "jwt" },
    ...authConfig,
});

export const signIn: NextAuthResult["signIn"] = nextAuth.signIn;
export const { handlers, auth, signOut } = nextAuth;