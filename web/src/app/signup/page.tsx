'use client';

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { signup } from "@/app/auth/actions";
import { useState } from "react";

export default function SignupPage() {
    const searchParams = useSearchParams();
    const error = searchParams.get('error');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (formData: FormData) => {
        setIsLoading(true);
        await signup(formData);
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-dal-grey dark:bg-dal-black">
            <div className="mb-8 text-center">
                <h1 className="text-3xl md:text-4xl font-bold text-dal-black dark:text-white">
                    Drop <span className="text-dal-gold italic">Along</span>
                </h1>
                <p className="text-gray-500 dark:text-gray-400 mt-2">Join the community</p>
            </div>

            <Card className="w-full max-w-sm border-0 shadow-lg dark:bg-card dark:text-card-foreground">
                <CardHeader>
                    <CardTitle className="text-xl text-center dark:text-white">Create Account</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {error && (
                        <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                            <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                        </div>
                    )}

                    <form action={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium dark:text-gray-200">Full Name</label>
                            <Input
                                name="full_name"
                                type="text"
                                placeholder="John Doe"
                                required
                                className="dark:bg-input dark:border-border dark:text-white dark:placeholder:text-muted-foreground"
                            />
                        </div>
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
                                minLength={6}
                                className="dark:bg-input dark:border-border dark:text-white dark:placeholder:text-muted-foreground"
                            />
                        </div>
                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-dal-gold hover:bg-dal-gold-hover text-dal-black font-semibold"
                        >
                            {isLoading ? "Creating account..." : "Sign Up"}
                        </Button>
                    </form>

                    <div className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
                        Already have an account?{" "}
                        <Link href="/login" className="text-dal-gold font-bold hover:underline">
                            Login
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
