import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { signup } from "@/app/auth/actions";

export default function SignupPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-dal-grey">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-dal-black">Drop Along</h1>
        <p className="text-gray-500">Join the community</p>
      </div>

      <Card className="w-full max-w-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl text-center">Create Account</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <form action={signup} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Full Name</label>
              <Input name="full_name" type="text" placeholder="John Doe" required />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <Input name="email" type="email" placeholder="you@example.com" required />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Password</label>
              <Input name="password" type="password" placeholder="••••••••" required />
            </div>
            <Button type="submit" className="w-full bg-dal-gold hover:bg-dal-gold-hover text-dal-black font-semibold">
              Sign Up
            </Button>
          </form>

          <div className="text-center text-sm text-gray-500 mt-4">
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