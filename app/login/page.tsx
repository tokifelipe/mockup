// Nota: La conexión a la API/DB se maneja en components/auth/login-form.tsx (función `authenticate`).
"use client"

import { Card, CardContent } from "@/components/ui/card"
import { LoginForm } from "@/components/auth/login-form"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const router = useRouter()

  useEffect(() => {
    try {
      const authed =
        localStorage.getItem("demo-auth") === "1" || sessionStorage.getItem("demo-auth") === "1"
      if (authed) router.replace("/")
    } catch {
      // noop
    }
  }, [router])

  return (
    <div className="w-full h-full flex items-center justify-center p-4">
      <Card className="w-full max-w-md border">
        <CardContent className="p-6">
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-bold text-gray-800">Bienvenido</h1>
            <p className="text-sm text-gray-500">Ingresa tus credenciales para continuar</p>
          </div>
          <LoginForm />
        </CardContent>
      </Card>
    </div>
  )
}
