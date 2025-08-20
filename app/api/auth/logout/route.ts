// app/api/auth/logout/route.ts
import { NextResponse } from "next/server";
export async function POST() {
  const resp = NextResponse.json({ ok: true });
  resp.cookies.set("session", "", { path: "/", maxAge: 0 });
  return resp;
}
