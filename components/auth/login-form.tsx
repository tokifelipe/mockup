// components/auth/login-form.tsx
"use client";

import { useCallback, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Eye, EyeOff, Mail, Lock } from "lucide-react";

export function LoginForm() {
  const router = useRouter();
  const sp = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const emailIsValid = useMemo(() => /\S+@\S+\.\S+/.test(email), [email]);
  const canSubmit = useMemo(
    () => emailIsValid && password.length >= 6 && !loading,
    [emailIsValid, password, loading]
  );

  const onSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setError(null);
      if (!emailIsValid) return setError("Ingresa un correo válido.");
      if (password.length < 6) return setError("La contraseña debe tener al menos 6 caracteres.");

      setLoading(true);
      const r = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, remember }),
      });

      if (r.ok) {
        const from = sp.get("from") || "/dashboard";
        router.replace(from);
        return;
      }
      const err = await r.json().catch(() => ({}));
      setError(err?.message ?? "Error de autenticación");
      setLoading(false);
    },
    [email, password, remember, emailIsValid, router, sp]
  );

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-4">
      {error && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md p-2" role="alert">
          {error}
        </p>
      )}

      {/* Email */}
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
          />
        </div>
      </div>

      {/* Password */}
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
            minLength={6}
            required
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

      {/* Remember + Submit */}
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

      <Button type="submit" className="w-full bg-action hover:bg-action-hover" disabled={!canSubmit} aria-busy={loading}>
        {loading ? (
          <span className="inline-flex items-center">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Ingresando...
          </span>
        ) : (
          "Ingresar"
        )}
      </Button>
    </form>
  );
}
