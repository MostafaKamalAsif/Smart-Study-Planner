"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, BookOpen, ArrowLeft, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

export const ForgotPasswordPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsLoading(true);
    // Simulate API call
    // await new Promise((res) => setTimeout(res, 1200));
    // setIsLoading(false);
    // Pass email to verify page via query param
//     router.push(`/verify-otp?email=${encodeURIComponent(email)}`);
//   };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-[var(--background)] via-[var(--background)] to-[var(--muted)]/30 p-4 md:p-8">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8 space-y-2">
          <div className="w-12 h-12 bg-[var(--primary)] rounded-xl flex items-center justify-center mb-2">
            <BookOpen className="text-[var(--primary-foreground)]" size={28} />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Academia</h1>
        </div>

        <Card className="p-6 md:p-8 shadow-2xl border-[var(--border)]/50">
          <form /*onSubmit={handleSubmit}*/ className="space-y-6">
            {/* Icon + Title */}
            <div className="flex flex-col items-center space-y-3 text-center">
              <div className="w-14 h-14 rounded-2xl bg-[var(--primary)]/10 flex items-center justify-center">
                <Mail className="text-[var(--primary)]" size={28} />
              </div>
              <div className="space-y-1">
                <h2 className="text-2xl font-semibold tracking-tight">
                  Forgot password?
                </h2>
                <p className="text-sm text-[var(--muted-foreground)] max-w-xs">
                  No worries! Enter your email and we&apos;ll send you a
                  verification code to reset your password.
                </p>
              </div>
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Email Address</label>
              <div className="relative">
                <Mail
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]"
                  size={16}
                />
                <Input
                  type="email"
                  placeholder="name@university.edu"
                  className="pl-10"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Submit */}
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <svg
                    className="animate-spin h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    />
                  </svg>
                  Sending code...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Send size={16} />
                  Send Reset Code
                </span>
              )}
            </Button>

            {/* Back to login */}
            <div className="text-center">
              <Link
                href="/login"
                className="inline-flex items-center gap-1.5 text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
              >
                <ArrowLeft size={14} />
                Back to login
              </Link>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};