// app/(auth)/login/page.tsx
import { Card, CardContent } from "@/components/ui/card";
import { LoginForm } from "@/components/auth/login-form";

export default function LoginPage() {
  return (
    <div className="w-full h-full flex items-center justify-center p-4">
      <Card className="w-full max-w-md border">
        <CardContent className="p-6">
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-bold text-gray-800">Bienvenido</h1>
            <p className="text-sm text-gray-500">Ingresa tus credenciales para continuar</p>
          </div>
          {(((process.env.DEMO_LOGIN === 'true') || (process.env.DEMO_LOGIN === '1')) ||
            (process.env.NODE_ENV !== 'production')) && (
            <div className="mb-4 rounded-md border border-dashed p-3 text-xs text-gray-600">
              Demo login habilitado. Use: demo@example.com / demo1234
            </div>
          )}
          <LoginForm />
        </CardContent>
      </Card>
    </div>
  );
}
