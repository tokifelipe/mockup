"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2, Eye, EyeOff, Mail, Lock } from "lucide-react"

const DEMO_USER = {
  email: "admin@demo.com",
  password: "Admin123!",
}

const AUTH_STORAGE_KEY = "demo-auth"

// === SOURCE: conexión a API/DB ===
// En producción, mueve esto a: /lib/api/auth.ts y usa variables de entorno.
// Ej.: process.env.NEXT_PUBLIC_API_URL configurada en .env.local
const API_URL = process.env.NEXT_PUBLIC_API_URL

type AuthResponse = { ok: true; token?: string } | { ok: false; message: string }

/**
 * Punto único de autenticación.
 * TODO: Reemplazar el bloque "Demo-only" por la llamada real a tu API.
 */
async function authenticate(email: string, password: string): Promise<AuthResponse> {
  // Ejemplo con REST (descomentar y ajustar):
  /*
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
    credentials: "include",
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    return { ok: false, message: err?.message ?? "Error de autenticación" }
  }
  const data = await res.json()
  return { ok: true, token: data?.token }
  */

  // Demo-only (fake):
  await new Promise((r) => setTimeout(r, 600))
  if (email.trim().toLowerCase() === DEMO_USER.email && password === DEMO_USER.password) {
    return { ok: true, token: "demo-token" }
  }
  return { ok: false, message: "Credenciales inválidas. Revisa tu correo y contraseña." }
}
// === FIN SOURCE ===

export function LoginForm() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [remember, setRemember] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Redirect if already authenticated
  useEffect(() => {
    try {
      if (typeof window !== "undefined" && localStorage.getItem(AUTH_STORAGE_KEY) === "1") {
        router.replace("/")
      }
    } catch {
      // noop
    }
  }, [router])

  const emailIsValid = useMemo(() => /\S+@\S+\.\S+/.test(email), [email])
  const canSubmit = useMemo(() => emailIsValid && password.length >= 6 && !loading, [emailIsValid, password, loading])

  const onSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      setError(null)
      if (!emailIsValid) {
        setError("Ingresa un correo válido.")
        return
      }
      if (password.length < 6) {
        setError("La contraseña debe tener al menos 6 caracteres.")
        return
      }

      setLoading(true)
      const result = await authenticate(email, password)

      if (result.ok) {
        try {
          if (remember) {
            localStorage.setItem(AUTH_STORAGE_KEY, "1")
          } else {
            sessionStorage.setItem(AUTH_STORAGE_KEY, "1")
          }
        } catch {
          // noop
        }
        router.replace("/")
        return
      }

      setError(("message" in result && result.message) || "Error de autenticación")
      setLoading(false)
    },
    [email, password, remember, emailIsValid, router]
  )

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-4">
      {error ? (
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md p-2" role="alert">
          {error}
        </p>
      ) : null}

      <div className="space-y-1.5">
        <label htmlFor="email" className="text-sm font-medium text-gray-700">
          Correo electrónico
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
          <Input
            id="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="tucorreo@ejemplo.com"
            className="pl-9"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-invalid={!!error && !emailIsValid}
            aria-describedby={error && !emailIsValid ? "email-error" : undefined}
            required
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <label htmlFor="password" className="text-sm font-medium text-gray-700">
          Contraseña
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            placeholder="••••••••"
            className="pl-9 pr-9"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            aria-invalid={!!error && password.length < 6}
            aria-describedby={error && password.length < 6 ? "password-error" : undefined}
            required
            minLength={6}
          />
          <button
            type="button"
            onClick={() => setShowPassword((s) => !s)}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-gray-500 hover:text-gray-700"
            aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <label className="inline-flex items-center gap-2 text-sm text-gray-600 select-none">
          <input
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
          />
          Recordarme
        </label>
        <a href="#" className="text-sm text-primary hover:underline">
          ¿Olvidaste tu contraseña?
        </a>
      </div>

      <Button
        type="submit"
        className="w-full bg-action hover:bg-action-hover"
        disabled={!canSubmit}
        aria-busy={loading}
      >
        {loading ? (
          <span className="inline-flex items-center">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Ingresando...
          </span>
        ) : (
          "Ingresar"
        )}
      </Button>

      <p className="text-xs text-gray-500 text-center">
        Demo: {DEMO_USER.email} / {DEMO_USER.password}
      </p>
    </form>
  )
}
