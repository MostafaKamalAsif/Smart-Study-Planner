"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, BookOpen, CheckCircle2, Eye, EyeOff, KeyRound } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, type FormEvent } from "react";

interface PasswordRule {
  label: string;
  test: (pw: string) => boolean;
}

const PASSWORD_RULES: PasswordRule[] = [
  { label: "At least 8 characters", test: (pw) => pw.length >= 8 },
  { label: "One uppercase letter", test: (pw) => /[A-Z]/.test(pw) },
  { label: "One number", test: (pw) => /[0-9]/.test(pw) },
  { label: "One special character", test: (pw) => /[^A-Za-z0-9]/.test(pw) },
];

export const SetNewPasswordPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const rulesPass = PASSWORD_RULES.every((r) => r.test(password));
  const passwordsMatch = password === confirm && confirm.length > 0;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!rulesPass) {
      setError("Password does not meet all requirements.");
      return;
    }
    if (!passwordsMatch) {
      setError("Passwords do not match.");
      return;
    }

    setIsLoading(true);
    await new Promise((res) => setTimeout(res, 1400));
    setIsLoading(false);
    setIsSuccess(true);
    // Redirect to login after 2s
    setTimeout(() => router.push("/login"), 2000);
  };

  if (isSuccess) {
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
            <div className="flex flex-col items-center space-y-4 text-center py-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center">
                <CheckCircle2 className="text-emerald-500" size={36} />
              </div>
              <div className="space-y-1">
                <h2 className="text-2xl font-semibold tracking-tight">
                  Password updated!
                </h2>
                <p className="text-sm text-[var(--muted-foreground)]">
                  Your password has been reset successfully. Redirecting you to
                  login...
                </p>
              </div>
              <div className="w-full pt-2">
                <div className="h-1 rounded-full bg-[var(--muted)] overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full animate-[progress_2s_linear_forwards]" />
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  }

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
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Icon + Title */}
            <div className="flex flex-col items-center space-y-3 text-center">
              <div className="w-14 h-14 rounded-2xl bg-[var(--primary)]/10 flex items-center justify-center">
                <KeyRound className="text-[var(--primary)]" size={28} />
              </div>
              <div className="space-y-1">
                <h2 className="text-2xl font-semibold tracking-tight">
                  Set new password
                </h2>
                <p className="text-sm text-[var(--muted-foreground)]">
                  Create a strong password for{" "}
                  <span className="font-medium text-[var(--foreground)]">
                    {email || "your account"}
                  </span>
                </p>
              </div>
            </div>

            {/* New Password */}
            <div className="space-y-2">
              <label className="text-sm font-medium">New Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(""); }}
                  required
                  className="flex h-10 w-full rounded-md border border-[var(--input)] bg-[var(--background)] px-3 py-2 pr-10 text-sm placeholder:text-[var(--muted-foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors cursor-pointer"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>

              {/* Password strength rules */}
              {password.length > 0 && (
                <div className="grid grid-cols-2 gap-1.5 pt-1">
                  {PASSWORD_RULES.map((rule) => {
                    const passes = rule.test(password);
                    return (
                      <div
                        key={rule.label}
                        className={`flex items-center gap-1.5 text-xs transition-colors ${
                          passes
                            ? "text-emerald-500"
                            : "text-[var(--muted-foreground)]"
                        }`}
                      >
                        <div
                          className={`w-1.5 h-1.5 rounded-full flex-shrink-0 transition-colors ${
                            passes ? "bg-emerald-500" : "bg-[var(--border)]"
                          }`}
                        />
                        {rule.label}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Confirm Password</label>
              <div className="relative">
                <input
                  type={showConfirm ? "text" : "password"}
                  placeholder="••••••••"
                  value={confirm}
                  onChange={(e) => { setConfirm(e.target.value); setError(""); }}
                  required
                  className={`flex h-10 w-full rounded-md border bg-[var(--background)] px-3 py-2 pr-10 text-sm placeholder:text-[var(--muted-foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 transition-colors ${
                    confirm.length > 0
                      ? passwordsMatch
                        ? "border-emerald-500"
                        : "border-[var(--destructive)]"
                      : "border-[var(--input)]"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors cursor-pointer"
                >
                  {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {confirm.length > 0 && !passwordsMatch && (
                <p className="text-xs text-[var(--destructive)]">
                  Passwords do not match.
                </p>
              )}
              {confirm.length > 0 && passwordsMatch && (
                <p className="text-xs text-emerald-500 flex items-center gap-1">
                  <CheckCircle2 size={12} /> Passwords match
                </p>
              )}
            </div>

            {/* Global error */}
            {error && (
              <p className="text-sm text-[var(--destructive)] text-center">
                {error}
              </p>
            )}

            {/* Submit */}
            <Button
              type="submit"
              className="w-full"
              disabled={isLoading || !rulesPass || !passwordsMatch}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                  </svg>
                  Updating password...
                </span>
              ) : (
                "Reset Password"
              )}
            </Button>

            {/* Back */}
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