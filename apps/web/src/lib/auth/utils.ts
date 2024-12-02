import { auth } from "./index";
import { NextRequest } from "next/server";
import { ApiError } from "../api/errors";

export const getSession = async () => {
    return auth();
};

export const getAuthTokenOrThrow = (
    req: Request | NextRequest,
    type: "Bearer" | "Basic" = "Bearer",
) => {
    const authorizationHeader = req.headers.get("Authorization");

    if (!authorizationHeader) {
        throw new ApiError({
            code: "bad_request",
            message: "Misconfigured authorization header. Did you forget to add 'Bearer '?",
        });
    }

    return authorizationHeader.replace(`${type} `, "");
};

export function generateOTP() {
    // Generate a random number between 0 and 999999
    const randomNumber = Math.floor(Math.random() * 1000000);

    // Pad the number with leading zeros if necessary to ensure it is always 6 digits
    const otp = randomNumber.toString().padStart(6, "0");

    return otp;
}