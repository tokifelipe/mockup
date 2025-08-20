// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const authed = Boolean(req.cookies.get("session")?.value);
  const path = req.nextUrl.pathname;

  // Si no hay cookie y no es login → redirigir a /login
  if (!authed && !path.startsWith("/login") && !path.startsWith("/api")) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("from", path);
    return NextResponse.redirect(url);
  }

  // Si ya hay cookie y va a /login → mandarlo al dashboard
  if (authed && path.startsWith("/login")) {
    const url = req.nextUrl.clone();
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// Configurar qué rutas debe revisar
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
