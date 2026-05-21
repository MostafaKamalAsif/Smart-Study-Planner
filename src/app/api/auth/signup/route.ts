import { NextResponse } from "next/server";
import type { ResultSetHeader } from "mysql2";
import { pool } from "@/lib/db";
import { hashPassword, signToken, setAuthCookie } from "@/lib/auth";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const { fullName, email, password, confirmPassword } =
    (body ?? {}) as Record<string, unknown>;

  if (typeof fullName !== "string" || fullName.trim().length < 2) {
    return NextResponse.json(
      { error: "Full name must be at least 2 characters." },
      { status: 400 }
    );
  }
  if (typeof email !== "string" || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
  }
  if (typeof password !== "string" || password.length < 8) {
    return NextResponse.json(
      { error: "Password must be at least 8 characters." },
      { status: 400 }
    );
  }
  if (typeof confirmPassword === "string" && confirmPassword !== password) {
    return NextResponse.json(
      { error: "Passwords do not match." },
      { status: 400 }
    );
  }

  const normalizedEmail = email.trim().toLowerCase();
  const trimmedName = fullName.trim();

  try {
    const passwordHash = await hashPassword(password);
    const [result] = await pool.execute<ResultSetHeader>(
      "INSERT INTO users (full_name, email, password_hash) VALUES (:fullName, :email, :passwordHash)",
      { fullName: trimmedName, email: normalizedEmail, passwordHash }
    );

    const userId = result.insertId;
    const token = signToken({ sub: userId, email: normalizedEmail });
    await setAuthCookie(token);

    return NextResponse.json(
      { user: { id: userId, fullName: trimmedName, email: normalizedEmail } },
      { status: 201 }
    );
  } catch (err) {
    if (
      typeof err === "object" &&
      err !== null &&
      "code" in err &&
      (err as { code?: string }).code === "ER_DUP_ENTRY"
    ) {
      return NextResponse.json(
        { error: "An account with that email already exists." },
        { status: 409 }
      );
    }
    console.error("[auth/signup]", err);
    return NextResponse.json(
      { error: "Could not create account. Please try again." },
      { status: 500 }
    );
  }
}
