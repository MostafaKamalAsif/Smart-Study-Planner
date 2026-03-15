"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogIn, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

export const LoginPage = () => {
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-[var(--background)] via-[var(--background)] to-[var(--muted)]/30 p-4 md:p-8">
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 items-center">
        {/* Left Panel */}
        <div className="hidden md:flex flex-col space-y-6">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-[var(--primary)] rounded-xl flex items-center justify-center">
              <BookOpen className="text-[var(--primary-foreground)]" size={24} />
            </div>
            <span className="text-2xl font-bold tracking-tight">Academia</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
            Master your academic journey with precision.
          </h1>
          <p className="text-[var(--muted-foreground)] text-lg">
            Organize semesters, track assignments, and manage notes in one
            beautiful workspace.
          </p>
          <div className="flex -space-x-2">
            {[1, 2, 3, 4].map((i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={i}
                src={`https://picsum.photos/seed/user${i}/100/100`}
                alt="User"
                className="w-10 h-10 rounded-full border-2 border-[var(--background)]"
                referrerPolicy="no-referrer"
              />
            ))}
            <div className="w-10 h-10 rounded-full bg-[var(--muted)] border-2 border-[var(--background)] flex items-center justify-center text-xs font-medium">
              +2k
            </div>
          </div>
          <p className="text-sm text-[var(--muted-foreground)]">
            Joined by 2,000+ students this semester.
          </p>
        </div>

        {/* Right Panel */}
        <div className="w-full max-w-md mx-auto">
          <div className="md:hidden flex flex-col items-center mb-8 space-y-2">
            <div className="w-12 h-12 bg-[var(--primary)] rounded-xl flex items-center justify-center mb-2">
              <BookOpen className="text-[var(--primary-foreground)]" size={28} />
            </div>
            <h1 className="text-3xl font-bold tracking-tight">Academia</h1>
          </div>

          <Card className="p-6 md:p-8 shadow-2xl border-[var(--border)]/50">
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight">
                  Welcome back
                </h2>
                <p className="text-sm text-[var(--muted-foreground)]">
                  Enter your credentials to access your planner
                </p>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <Input type="email" placeholder="name@university.edu" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Password</label>
                  <Input type="password" placeholder="••••••••" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="remember"
                      className="rounded border-[var(--input)]"
                    />
                    <label
                      htmlFor="remember"
                      className="text-sm text-[var(--muted-foreground)]"
                    >
                      Remember me
                    </label>
                  </div>
                  <button
                    type="button"
                    className="text-sm font-medium text-[var(--primary)] hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>
                <Button type="submit" className="w-full">
                  <LogIn className="mr-2" size={18} />
                  Login
                </Button>
              </div>
              <div className="text-center text-sm">
                <span className="text-[var(--muted-foreground)]">
                  Don&apos;t have an account?{" "}
                </span>
                <Link
                  href="/signup"
                  className="font-medium text-[var(--primary)] hover:underline"
                >
                  Create Account
                </Link>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
};