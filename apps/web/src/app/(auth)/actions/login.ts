'use server'

import { signIn } from "@/lib/auth"
import z from "@/lib/zod"
import { signUpSchema } from "@/lib/zod/schemas/auth"
import { AuthError } from "next-auth"
import { redirect } from "next/navigation"

export async function credentialLogin(values: z.infer<typeof signUpSchema>) {
    try {
        await signIn("credentials", values)
    } catch (error) {
        if (error instanceof AuthError) {
            return redirect(`/login?error=${error.type}`)
        }
        throw error
    }
}

export async function providerLogin(id: any, props: { searchParams: { callbackUrl: any } }) {
    try {
        await signIn(id, {
            redirectTo: props.searchParams?.callbackUrl ?? "",
        })
    } catch (error) {
        // Signin can fail for a number of reasons, such as the user
        // not existing, or the user not having the correct role.
        // In some cases, you may want to redirect to a custom error
        if (error instanceof AuthError) {
            return redirect(`/login?error=${error.type}`)
        }

        // Otherwise if a redirects happens Next.js can handle it
        // so you can just re-thrown the error and let Next.js handle it.
        // Docs:
        // https://nextjs.org/docs/app/api-reference/functions/redirect#server-component
        throw error
    }
}