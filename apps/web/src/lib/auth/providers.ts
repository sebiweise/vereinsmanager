import type { Provider } from "next-auth/providers"
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "@/lib/db";
import { exceededLoginAttemptsThreshold, incrementLoginAttempts } from "./lock-account";
import { validatePassword } from "./password";
import { signUpSchema } from "@/lib/zod/schemas/auth";

export const providers: Provider[] = [
    CredentialsProvider({
        id: "credentials",
        type: "credentials",
        credentials: {
            email: {
                label: "Email",
                type: "email",
            },
            password: {
                label: "Password",
                type: "password"
            },
        },
        async authorize(credentials, req) {
            if (!credentials) {
                throw new Error("no-credentials");
            }

            const { email, password } = await signUpSchema.parseAsync(credentials);

            if (!email || !password) {
                throw new Error("no-credentials");
            }

            // const { success } = await ratelimit(5, "1 m").limit(
            //     `login-attempts:${email}`,
            // );

            // if (!success) {
            //     throw new Error("too-many-login-attempts");
            // }

            const user = await db.user.findUnique({
                where: { email },
                select: {
                    id: true,
                    passwordHash: true,
                    name: true,
                    email: true,
                    image: true,
                    invalidLoginAttempts: true,
                    emailVerified: true,
                },
            });

            if (!user || !user.passwordHash) {
                throw new Error("invalid-credentials");
            }

            if (exceededLoginAttemptsThreshold(user)) {
                throw new Error("exceeded-login-attempts");
            }

            const passwordMatch = await validatePassword({
                password,
                passwordHash: user.passwordHash,
            });

            if (!passwordMatch) {
                const exceededLoginAttempts = exceededLoginAttemptsThreshold(
                    await incrementLoginAttempts(user),
                );

                if (exceededLoginAttempts) {
                    throw new Error("exceeded-login-attempts");
                } else {
                    throw new Error("invalid-credentials");
                }
            }

            if (!user.emailVerified) {
                throw new Error("email-not-verified");
            }

            // Reset invalid login attempts
            await db.user.update({
                where: { id: user.id },
                data: {
                    invalidLoginAttempts: 0,
                },
            });

            return {
                id: user.id,
                name: user.name,
                email: user.email,
                image: user.image,
            };
        },
    }),
];

export const providerMap = providers
    .map((provider) => {
        if (typeof provider === "function") {
            const providerData = provider()
            return { id: providerData.id, name: providerData.name }
        } else {
            return { id: provider.id, name: provider.name }
        }
    })
    .filter((provider) => provider.id !== "credentials");