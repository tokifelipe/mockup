import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Sidebar } from "@/components/sidebar"
import { MobileHeader } from "@/components/mobile-header"
import { SupportChat } from "@/components/support-chat"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Gestión de Agentes IA",
  description: "Plataforma para crear y administrar agentes de inteligencia artificial",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <div className="flex h-screen bg-gray-50 app-shell">
          {/* Sidebar visible solo fuera de 'no-shell' */}
          <div className="app-sidebar">
            <Sidebar />
          </div>
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Header móvil visible solo fuera de 'no-shell' */}
            <div className="app-mobile-header">
              <MobileHeader />
            </div>
            <main className="flex-1 overflow-auto">{children}</main>
          </div>
        </div>
        {/* Chat soporte visible solo fuera de 'no-shell' */}
        <div className="app-support">
          <SupportChat />
        </div>
      </body>
    </html>
  )
}
