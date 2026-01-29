'use client';

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { login } from "@/app/auth/actions";
import LoginButton from "./LoginButton";

export default function LoginPage() {
    const searchParams = useSearchParams();
    const error = searchParams.get('error');

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-dal-grey dark:bg-dal-black">
            <div className="mb-8 text-center">
                <h1 className="text-3xl md:text-4xl font-bold text-dal-black dark:text-white">
                    Drop <span className="text-dal-gold italic">Along</span>
                </h1>
                <p className="text-gray-500 dark:text-gray-400 mt-2">Welcome back</p>
            </div>

            <Card className="w-full max-w-sm border-0 shadow-lg dark:bg-card dark:text-card-foreground">
                <CardHeader>
                    <CardTitle className="text-xl text-center dark:text-white">Login</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {error && (
                        <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                            <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                        </div>
                    )}

                    <form action={login} className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium dark:text-gray-200">Email</label>
                            <Input
                                name="email"
                                type="email"
                                placeholder="you@example.com"
                                required
                                className="dark:bg-input dark:border-border dark:text-white dark:placeholder:text-muted-foreground"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium dark:text-gray-200">Password</label>
                            <Input
                                name="password"
                                type="password"
                                placeholder="••••••••"
                                required
                                className="dark:bg-input dark:border-border dark:text-white dark:placeholder:text-muted-foreground"
                            />
                        </div>

                        <LoginButton />
                    </form>

                    <div className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
                        Don&apos;t have an account?{" "}
                        <Link href="/signup" className="text-dal-gold font-bold hover:underline">
                            Sign Up
                        </Link>
                    </div>
                </CardContent>
            </Card>

            <div className="mt-8">
                <Link href="/" className="text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                    Skip for now (Guest Mode)
                </Link>
            </div>
        </div>
    );
}
