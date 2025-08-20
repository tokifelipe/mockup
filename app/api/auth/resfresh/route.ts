// app/api/auth/refresh/route.ts
import { NextResponse } from "next/server";
import { djangoFetch } from "@/app/lib/clients/django";

export async function POST() {
  // si tu refresh vive en cookie HttpOnly, solo llama al core
  const r = await djangoFetch("/api/auth/refresh/", { method: "POST" });
  if (!r.ok) return NextResponse.json({ ok: false }, { status: 401 });
  const data = await r.json();
  const token = data?.access;
  if (!token) return NextResponse.json({ ok: false }, { status: 500 });

  const resp = NextResponse.json({ ok: true });
  resp.cookies.set("session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 15, // 15m ejemplo
  });
  return resp;
}
