// app/api/auth/login/route.ts
import { NextResponse } from "next/server";
import { djangoFetch } from "@/app/lib/clients/django";

export async function POST(req: Request) {
  const { email, password, remember } = await req.json().catch(() => ({}));

  if (!email || !password) {
    return NextResponse.json(
      { ok: false, message: "Correo y contraseña requeridos" },
      { status: 400 }
    );
  }

  const isDev = process.env.NODE_ENV !== "production";
  const allowDemo =
    process.env.DEMO_LOGIN === "true" ||
    process.env.DEMO_LOGIN === "1" ||
    isDev;

  // Acepta demo en dev o cuando DEMO_LOGIN esté activo
  if (allowDemo && email === "demo@example.com" && password === "demo1234") {
    const resp = NextResponse.json({ ok: true, demo: true });
    resp.cookies.set("session", "dev-demo-token", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/",
      maxAge: remember ? 60 * 60 * 24 * 30 : undefined,
    });
    return resp;
  }

  // Llama a Django (ajusta endpoint/body según tu API)
  let r: Response;
  try {
    r = await djangoFetch("/api/auth/login/", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  } catch {
    // En desarrollo no devolver 503: indicar uso de demo
    if (isDev) {
      return NextResponse.json(
        { ok: false, message: "Backend no disponible. Use demo@example.com / demo1234" },
        { status: 401 }
      );
    }
    return NextResponse.json(
      { ok: false, message: "Backend no disponible. Contacte al administrador." },
      { status: 503 }
    );
  }

  if (!r.ok) {
    const err = await r.json().catch(() => ({}));
    return NextResponse.json(
      { ok: false, message: err?.message ?? "Credenciales inválidas" },
      { status: 401 }
    );
  }

  // Supón que Django devuelve { access, refresh } o { session }
  const data = await r.json();
  const token = data?.access || data?.session;
  if (!token) {
    return NextResponse.json({ ok: false, message: "Respuesta inválida" }, { status: 500 });
  }

  const resp = NextResponse.json({ ok: true });
  resp.cookies.set("session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: remember ? 60 * 60 * 24 * 30 : undefined,
  });
  return resp;
}
