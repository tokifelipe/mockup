//Cliente para el servidor Django: BFF
// app/lib/clients/django.ts
export async function djangoFetch(path: string, init?: RequestInit) {
    const base = process.env.BACKEND_URL;
    if (!base) {
      throw new Error(
        "BACKEND_URL no está configurado. Defínelo (p.ej. http://localhost:8000) o habilita DEMO_LOGIN para modo demo."
      );
    }
    try {
      const res = await fetch(`${base}${path}`, {
        ...init,
        headers: { "Content-Type": "application/json", ...(init?.headers || {}) },
      });
      return res;
    } catch (err: any) {
      const e = new Error(`djangoFetch failed: ${err?.message ?? "Network error"}`);
      (e as any).cause = err;
      throw e;
    }
  }
