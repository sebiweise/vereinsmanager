import { headers } from "next/headers";
import { ApiError } from "./errors";

export const parseRequestBody = async (req: Request) => {
    try {
        return await req.json();
    } catch (e) {
        throw new ApiError({
            code: "bad_request",
            message:
                "Invalid JSON format in request body. Please ensure the request body is a valid JSON object.",
        });
    }
};

export const getIP = () => {
    const FALLBACK_IP_ADDRESS = "0.0.0.0";
    const forwardedFor = headers().get("x-forwarded-for");

    if (forwardedFor) {
        return forwardedFor.split(",")[0] ?? FALLBACK_IP_ADDRESS;
    }

    return headers().get("x-real-ip") ?? FALLBACK_IP_ADDRESS;
};
