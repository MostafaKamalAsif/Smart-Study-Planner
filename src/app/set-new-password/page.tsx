"use client";
import { SetNewPasswordPage } from '@/components/auth/Setnewpasswordpage';
import { Suspense } from "react";

export const dynamic = "force-dynamic";

export default function Page() {
  return (
    <Suspense fallback={null}>
      <SetNewPasswordPage />
    </Suspense>
  );
}
