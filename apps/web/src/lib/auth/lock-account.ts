import { User } from "db";
import { MAX_LOGIN_ATTEMPTS } from "./constants";
import { db } from "@/lib/db";

export const incrementLoginAttempts = async (
    user: Pick<User, "id" | "email">,
) => {
    const { invalidLoginAttempts, lockedAt } = await db.user.update({
        where: { id: user.id },
        data: {
            invalidLoginAttempts: {
                increment: 1,
            },
        },
        select: {
            lockedAt: true,
            invalidLoginAttempts: true,
        },
    });

    if (!lockedAt && invalidLoginAttempts >= MAX_LOGIN_ATTEMPTS) {
        await db.user.update({
            where: { id: user.id },
            data: {
                lockedAt: new Date(),
            },
        });

        // TODO:
        // Send email to user that their account has been locked
    }

    return {
        invalidLoginAttempts,
        lockedAt,
    };
};

export const exceededLoginAttemptsThreshold = (
    user: Pick<User, "invalidLoginAttempts">,
) => {
    return user.invalidLoginAttempts >= MAX_LOGIN_ATTEMPTS;
};