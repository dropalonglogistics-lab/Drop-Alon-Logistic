import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { login } from "@/app/auth/actions";
import LoginButton from "./LoginButton";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-dal-grey">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-dal-black">Drop Along</h1>
        <p className="text-gray-500">Welcome back</p>
      </div>

      <Card className="w-full max-w-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl text-center">Login</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <form action={login} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <Input name="email" type="email" placeholder="you@example.com" required />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Password</label>
              <Input name="password" type="password" placeholder="••••••••" required />
            </div>
            
            <LoginButton />
          </form>

          <div className="text-center text-sm text-gray-500 mt-4">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-dal-gold font-bold hover:underline">
              Sign Up
            </Link>
          </div>
        </CardContent>
      </Card>
      
      <div className="mt-8">
        <Link href="/" className="text-xs text-gray-400 hover:text-gray-600">
          Skip for now (Guest Mode)
        </Link>
      </div>
    </div>
  );
}

