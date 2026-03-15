"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { UserPlus, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

export const SignUpPage = () => {
  const router = useRouter();

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-[var(--background)] via-[var(--background)] to-[var(--muted)]/30 p-4 md:p-8">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center mb-8 space-y-2">
          <div className="w-12 h-12 bg-[var(--primary)] rounded-xl flex items-center justify-center mb-2">
            <BookOpen className="text-[var(--primary-foreground)]" size={28} />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Academia</h1>
        </div>

        <Card className="p-6 md:p-8 shadow-2xl border-[var(--border)]/50">
          <form onSubmit={handleSignUp} className="space-y-6">
            <div className="flex flex-col items-center space-y-2 text-center">
              <h2 className="text-2xl font-semibold tracking-tight">
                Create an account
              </h2>
              <p className="text-sm text-[var(--muted-foreground)]">
                Join Academia and start organizing your studies
              </p>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Full Name</label>
                <Input type="text" placeholder="John Doe" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <Input type="email" placeholder="name@university.edu" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Password</label>
                  <Input type="password" placeholder="••••••••" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Confirm</label>
                  <Input type="password" placeholder="••••••••" />
                </div>
              </div>
              <Button type="submit" className="w-full">
                <UserPlus className="mr-2" size={18} />
                Create Account
              </Button>
            </div>
            <div className="text-center text-sm">
              <span className="text-[var(--muted-foreground)]">
                Already have an account?{" "}
              </span>
              <Link
                href="/login"
                className="font-medium text-[var(--primary)] hover:underline"
              >
                Login
              </Link>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};