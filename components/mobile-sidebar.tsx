"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
// Añadir el import para el nuevo icono
import { Bot, Grid3X3, LayoutDashboard, Mail, MessageSquare, Settings, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface MobileSidebarProps {
  onClose: () => void
}

export function MobileSidebar({ onClose }: MobileSidebarProps) {
  const pathname = usePathname()

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="p-4 border-b flex items-center justify-between">
        <div className="flex-1"></div>
        <div className="flex justify-center flex-1">
          <img src="/images/logo-color.png" alt="AgentBuilder Logo" className="h-10" />
        </div>
        <div className="flex-1 flex justify-end">
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div className="py-4">
        <div className="px-4 mb-2 text-xs font-semibold text-gray-500 uppercase">General</div>
        <nav className="space-y-1">
          <Link href="/" className={`sidebar-item ${pathname === "/" ? "active" : ""}`} onClick={onClose}>
            <LayoutDashboard size={18} />
            <span>Panel</span>
          </Link>
        </nav>
      </div>

      <div className="py-2">
        <div className="px-4 mb-2 text-xs font-semibold text-gray-500 uppercase">Gestión</div>
        <nav className="space-y-1">
          <Link
            href="/agents"
            className={`sidebar-item ${pathname.startsWith("/agents") ? "active" : ""}`}
            onClick={onClose}
          >
            <Bot size={18} />
            <span>Agentes</span>
          </Link>
          <Link
            href="/comunicados"
            className={`sidebar-item ${pathname.startsWith("/comunicados") ? "active" : ""}`}
            onClick={onClose}
          >
            <Mail size={18} />
            <span>Comunicados</span>
          </Link>
          <Link
            href="/chat-config"
            className={`sidebar-item ${pathname.startsWith("/chat-config") ? "active" : ""}`}
            onClick={onClose}
          >
            <MessageSquare size={18} />
            <span>Configuración de Chat</span>
          </Link>
          <Link
            href="/fuentes-datos"
            className={`sidebar-item ${pathname.startsWith("/fuentes-datos") ? "active" : ""}`}
            onClick={onClose}
          >
            <Grid3X3 size={18} />
            <span>Fuentes de Datos</span>
          </Link>
        </nav>
      </div>

      <div className="py-2">
        <div className="px-4 mb-2 text-xs font-semibold text-gray-500 uppercase">Sistema</div>
        <nav className="space-y-1">
          <div className="sidebar-item">
            <Settings size={18} />
            <span>Configuración</span>
          </div>
        </nav>
      </div>

      <div className="mt-auto p-4 border-t">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 mr-2">
            <span className="text-sm font-medium">JD</span>
          </div>
          <div>
            <p className="text-sm font-medium">Juan Pérez</p>
            <p className="text-xs text-gray-500">Administrador</p>
          </div>
        </div>
      </div>
    </div>
  )
}
