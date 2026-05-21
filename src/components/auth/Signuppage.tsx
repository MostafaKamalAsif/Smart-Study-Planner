"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { UserPlus, BookOpen, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

export const SignUpPage = () => {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, email, password, confirmPassword }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Could not create account.");
        return;
      }
      router.push("/dashboard");
      router.refresh();
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-[var(--background)] via-[var(--background)] to-[var(--muted)]/30 p-4 md:p-8">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center mb-8 space-y-2">
          <div className="w-12 h-12 bg-[var(--primary)] rounded-xl flex items-center justify-center mb-2">
            <BookOpen className="text-[var(--primary-foreground)]" size={28} />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Smart Study Planner</h1>
        </div>

        <Card className="p-6 md:p-8 shadow-2xl border-[var(--border)]/50">
          <form onSubmit={handleSignUp} className="space-y-6">
            <div className="flex flex-col items-center space-y-2 text-center">
              <h2 className="text-2xl font-semibold tracking-tight">
                Create an account
              </h2>
              <p className="text-sm text-[var(--muted-foreground)]">
                Join Smart Study Planner and start organizing your studies
              </p>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Full Name</label>
                <Input
                  type="text"
                  placeholder="John Doe"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  minLength={2}
                  autoComplete="name"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <Input
                  type="email"
                  placeholder="name@university.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Password</label>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={8}
                    autoComplete="new-password"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Confirm</label>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    minLength={8}
                    autoComplete="new-password"
                  />
                </div>
              </div>

              {error && (
                <p className="text-sm text-[var(--destructive)] text-center">
                  {error}
                </p>
              )}

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 animate-spin" size={18} />
                    Creating account...
                  </>
                ) : (
                  <>
                    <UserPlus className="mr-2" size={18} />
                    Create Account
                  </>
                )}
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
