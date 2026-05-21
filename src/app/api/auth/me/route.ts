import { NextResponse } from "next/server";
import type { RowDataPacket } from "mysql2";
import { pool } from "@/lib/db";
import { getCurrentUserPayload } from "@/lib/auth";

interface UserRow extends RowDataPacket {
  id: number;
  full_name: string;
  email: string;
}

export async function GET() {
  const payload = await getCurrentUserPayload();
  if (!payload) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  try {
    const [rows] = await pool.execute<UserRow[]>(
      "SELECT id, full_name, email FROM users WHERE id = :id LIMIT 1",
      { id: payload.sub }
    );
    const user = rows[0];
    if (!user) return NextResponse.json({ user: null }, { status: 401 });

    return NextResponse.json({
      user: { id: user.id, fullName: user.full_name, email: user.email },
    });
  } catch (err) {
    console.error("[auth/me]", err);
    return NextResponse.json({ error: "Server error." }, { status: 500 });
  }
}
