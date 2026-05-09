"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, BookOpen, RefreshCw, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState, type ClipboardEvent, type FormEvent, type KeyboardEvent } from "react";

const OTP_LENGTH = 6;

export const VerifyOtpPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";

  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [resendTimer, setResendTimer] = useState(60);
  const [error, setError] = useState("");
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Countdown timer for resend
  useEffect(() => {
    if (resendTimer <= 0) return;
    const t = setTimeout(() => setResendTimer((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [resendTimer]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return; // digits only
    setError("");
    const next = [...otp];
    next[index] = value.slice(-1); // keep only last char
    setOtp(next);
    // Auto-focus next
    if (value && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, OTP_LENGTH);
    const next = [...otp];
    pasted.split("").forEach((char, i) => { next[i] = char; });
    setOtp(next);
    // Focus last filled or next empty
    const focusIdx = Math.min(pasted.length, OTP_LENGTH - 1);
    inputRefs.current[focusIdx]?.focus();
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const code = otp.join("");
    if (code.length < OTP_LENGTH) {
      setError("Please enter all 6 digits.");
      return;
    }
    setIsLoading(true);
    await new Promise((res) => setTimeout(res, 1200));
    setIsLoading(false);
    // In production: verify code with backend first
    router.push(`/set-new-password?email=${encodeURIComponent(email)}`);
  };

  const handleResend = async () => {
    setIsResending(true);
    await new Promise((res) => setTimeout(res, 1000));
    setIsResending(false);
    setResendTimer(60);
    setOtp(Array(OTP_LENGTH).fill(""));
    setError("");
    inputRefs.current[0]?.focus();
  };

  const maskedEmail = email
    ? email.replace(/(.{2})(.*)(@.*)/, (_, a, b, c) => a + "*".repeat(b.length) + c)
    : "your email";

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
                <ShieldCheck className="text-[var(--primary)]" size={28} />
              </div>
              <div className="space-y-1">
                <h2 className="text-2xl font-semibold tracking-tight">
                  Check your email
                </h2>
                <p className="text-sm text-[var(--muted-foreground)]">
                  We sent a 6-digit verification code to
                </p>
                <p className="text-sm font-semibold">{maskedEmail}</p>
              </div>
            </div>

            {/* OTP Inputs */}
            <div className="space-y-3">
              <div className="flex gap-2 justify-center" onPaste={handlePaste}>
                {otp.map((digit, i) => (
                  <input
                    key={i}
                    ref={(el) => { inputRefs.current[i] = el; }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(i, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(i, e)}
                    className={`w-11 h-13 text-center text-xl font-bold rounded-xl border-2 bg-[var(--background)] transition-all outline-none
                      ${digit
                        ? "border-[var(--primary)] text-[var(--foreground)]"
                        : "border-[var(--border)] text-[var(--muted-foreground)]"
                      }
                      focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20
                      ${error ? "border-[var(--destructive)]" : ""}
                    `}
                    style={{ height: "3.25rem" }}
                  />
                ))}
              </div>
              {error && (
                <p className="text-center text-sm text-[var(--destructive)]">
                  {error}
                </p>
              )}
            </div>

            {/* Verify Button */}
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                  </svg>
                  Verifying...
                </span>
              ) : (
                "Verify Code"
              )}
            </Button>

            {/* Resend */}
            <div className="text-center space-y-1">
              <p className="text-sm text-[var(--muted-foreground)]">
                Didn&apos;t receive the code?
              </p>
              {resendTimer > 0 ? (
                <p className="text-sm text-[var(--muted-foreground)]">
                  Resend in{" "}
                  <span className="font-semibold text-[var(--foreground)]">
                    {resendTimer}s
                  </span>
                </p>
              ) : (
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={isResending}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--primary)] hover:underline disabled:opacity-50 cursor-pointer"
                >
                  <RefreshCw size={13} className={isResending ? "animate-spin" : ""} />
                  {isResending ? "Resending..." : "Resend code"}
                </button>
              )}
            </div>

            {/* Back */}
            <div className="text-center pt-2 border-t border-[var(--border)]">
              <Link
                href="/forgot-password"
                className="inline-flex items-center gap-1.5 text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
              >
                <ArrowLeft size={14} />
                Use a different email
              </Link>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};