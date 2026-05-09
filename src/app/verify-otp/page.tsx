"use client";
import { VerifyOtpPage } from '@/components/auth/Verifyotppage';
import { Suspense } from "react";

export const dynamic = "force-dynamic";

export default function Page() {
  return (
    <Suspense fallback={null}>
      <VerifyOtpPage />
    </Suspense>
  );
}
