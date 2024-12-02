import { redirect } from "next/navigation"
import { providerMap } from "@/lib/auth/providers"
import { signIn } from "@/lib/auth"
import { AuthError } from "next-auth"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default async function LoginPage(props: {
    searchParams: { callbackUrl: string | undefined }
}) {
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
                        <form
                            action={async (formData) => {
                                "use server"
                                try {
                                    await signIn("credentials", formData)
                                } catch (error) {
                                    if (error instanceof AuthError) {
                                        return redirect(`/login?error=${error.type}`)
                                    }
                                    throw error
                                }
                            }}
                        >
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>
                                    <Link href="#" className="ml-auto inline-block text-sm underline">
                                        Forgot your password?
                                    </Link>
                                </div>
                                <Input id="password" type="password" required />
                            </div>
                            <Button type="submit" className="w-full">
                                Login
                            </Button>
                        </form>
                        {Object.values(providerMap).map((provider) => (
                            <form
                                action={async () => {
                                    "use server"
                                    try {
                                        await signIn(provider.id, {
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