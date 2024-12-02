'use client'

import { providerMap } from "@/lib/auth/providers"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { signUpSchema } from "@/lib/zod/schemas/auth"
import z from "@/lib/zod"
import { credentialLogin, providerLogin } from "../actions/login"

export default function LoginPage(props: {
    searchParams: { callbackUrl: string | undefined }
}) {
    const loginForm = useForm<z.infer<typeof signUpSchema>>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    function onSubmit(values: z.infer<typeof signUpSchema>) {
        credentialLogin(values);
    }

    return (
        <div className="flex h-screen w-full items-center justify-center px-4">
            <Card className="mx-auto max-w-sm">
                <CardHeader>
                    <CardTitle className="text-2xl">Login</CardTitle>
                    <CardDescription>
                        Enter your email below to login to your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4">
                        <Form {...loginForm}>
                            <form onSubmit={loginForm.handleSubmit(onSubmit)}>
                                <div className="grid gap-2">
                                    <FormField
                                        control={loginForm.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Email</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="m@example.com" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <FormField
                                        control={loginForm.control}
                                        name="password"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Password</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="********" {...field} />
                                                </FormControl>
                                                <FormDescription>
                                                    <Link href="#" className="ml-auto inline-block text-sm underline">
                                                        Forgot your password?
                                                    </Link>
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <Button type="submit" className="w-full">
                                    Login
                                </Button>
                            </form>
                        </Form>
                        {Object.values(providerMap).map((provider) => (
                            <form
                                action={async () => {
                                    await providerLogin(provider.id, props);
                                }}
                            >
                                <Button type="submit" variant="outline" className="w-full">
                                    Login with {provider.name}
                                </Button>
                            </form>
                        ))}
                    </div>
                    <div className="mt-4 text-center text-sm">
                        Don&apos;t have an account?{" "}
                        <Link href="/register" className="underline">
                            Sign up
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}