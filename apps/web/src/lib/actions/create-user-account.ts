"use server"

import { db } from "@/lib/db";
import { hashPassword } from "../auth/password";
import z from "../zod";
import { signUpSchema } from "../zod/schemas/auth";

const schema = signUpSchema.extend({
    code: z.string().min(6, "OTP must be 6 characters long."),
});

// Sign up a new user using email and password
export async function createUserAccountAction(values: z.infer<typeof signUpSchema>) {
    const { email, password } = values;

    // const { success } = await ratelimit(2, "1 m").limit(`signup:${getIP()}`);

    // if (!success) {
    //     throw new Error("Too many requests. Please try again later.");
    // }

    // const verificationToken = await db.emailVerificationToken.findUnique({
    //     where: {
    //         identifier: email,
    //         token: code,
    //         expires: {
    //             gte: new Date(),
    //         },
    //     },
    // });

    // if (!verificationToken) {
    //     throw new Error("Invalid verification code entered.");
    // }

    // await db.emailVerificationToken.delete({
    //     where: {
    //         identifier: email,
    //         token: code,
    //     },
    // });

    const user = await db.user.findUnique({
        where: {
            email,
        },
    });

    if (!user) {
        await db.user.create({
            data: {
                email,
                passwordHash: await hashPassword(password),
                emailVerified: new Date(),
            },
        });
    }

    return { ok: true };
};