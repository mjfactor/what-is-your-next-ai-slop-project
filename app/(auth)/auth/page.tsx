"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { authClient } from "@/lib/auth-client"
import { Github } from "lucide-react"
import { useState } from "react"
const GoogleIcon = () => (
    <svg className="size-4" viewBox="0 0 24 24" aria-hidden="true">
        <path
            fill="currentColor"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        />
        <path
            fill="currentColor"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        />
        <path
            fill="currentColor"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        />
        <path
            fill="currentColor"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        />
    </svg>
)

export default function AuthPage() {
    const [isGoogleLoading, setIsGoogleLoading] = useState(false)
    const [isGithubLoading, setIsGithubLoading] = useState(false)

    const handleGoogleSignIn = async () => {
        try {
            setIsGoogleLoading(true)
            await authClient.signIn.social({
                provider: "google",
            })
        } catch (error) {
            console.error("Google sign-in error:", error)
        } finally {
            setIsGoogleLoading(false)
        }
    }

    const handleGithubSignIn = async () => {
        try {
            setIsGithubLoading(true)
            await authClient.signIn.social({
                provider: "github",
            })
        } catch (error) {
            console.error("GitHub sign-in error:", error)
        } finally {
            setIsGithubLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-background p-4">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center space-y-1">
                    <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
                    <CardDescription>
                        Sign in to your account to continue
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Button
                        variant="outline"
                        className="w-full h-11"
                        onClick={handleGoogleSignIn}
                        disabled={isGoogleLoading || isGithubLoading}
                    >
                        {isGoogleLoading ? (
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current" />
                        ) : (
                            <GoogleIcon />
                        )}
                        Continue with Google
                    </Button>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <Separator className="w-full" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-background px-2 text-muted-foreground">
                                Or
                            </span>
                        </div>
                    </div>

                    <Button
                        variant="outline"
                        className="w-full h-11"
                        onClick={handleGithubSignIn}
                        disabled={isGoogleLoading || isGithubLoading}
                    >
                        {isGithubLoading ? (
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current" />
                        ) : (
                            <Github className="size-4" />
                        )}
                        Continue with GitHub
                    </Button>

                    <div className="text-center text-sm text-muted-foreground">
                        By continuing, you agree to our Terms of Service and Privacy Policy.
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
