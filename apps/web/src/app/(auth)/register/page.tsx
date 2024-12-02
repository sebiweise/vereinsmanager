'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { signUpSchema } from "@/lib/zod/schemas/auth"
import z from "@/lib/zod"
import { createUserAccountAction } from "@/lib/actions/create-user-account"
import { redirect } from "next/navigation"

export default function RegisterPage(props: {
    searchParams: { callbackUrl: string | undefined }
}) {
    const registerForm = useForm<z.infer<typeof signUpSchema>>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    function onSubmit(values: z.infer<typeof signUpSchema>) {
        createUserAccountAction(values);
    }

    return (
        <div className="flex h-screen w-full items-center justify-center px-4">
            <Card className="mx-auto max-w-sm">
                <CardHeader>
                    <CardTitle className="text-2xl">Registrierung</CardTitle>
                    <CardDescription>
                        Gib deine E-Mail-Adresse und dein Passwort ein, um dich registrieren.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4">
                        <Form {...registerForm}>
                            <form onSubmit={registerForm.handleSubmit(onSubmit)}>
                                <div className="grid gap-2">
                                    <FormField
                                        control={registerForm.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>E-Mail</FormLabel>
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
                                        control={registerForm.control}
                                        name="password"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Passwort</FormLabel>
                                                <FormControl>
                                                    <Input type="password" placeholder="********" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <Button type="submit" className="w-full">
                                    Registrieren
                                </Button>
                            </form>
                        </Form>
                    </div>
                    <div className="mt-4 text-center text-sm">
                        Hast du bereits einen Account?&nbsp;
                        <Link href="/login" className="underline">
                            Einloggen
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}