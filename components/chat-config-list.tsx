"use client"

import Link from "next/link"
import { Bot, Code, Copy, Edit, Globe, MessageSquare, MoreHorizontal, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useState } from "react"

// Mock data para configuraciones de chat
const mockChatConfigs = [
  {
    id: "1",
    name: "Chat Principal",
    description: "Configuración para el sitio web principal",
    agent: "Agente de Atención al Cliente",
    sites: ["www.ejemplo.com"],
    lastUpdated: "2023-05-15T10:00:00",
    status: "active",
  },
  {
    id: "2",
    name: "Chat de Soporte Técnico",
    description: "Configuración para la sección de soporte",
    agent: "Agente de Soporte Técnico",
    sites: ["soporte.ejemplo.com"],
    lastUpdated: "2023-05-10T14:30:00",
    status: "active",
  },
  {
    id: "3",
    name: "Chat de Ventas",
    description: "Configuración para la sección de ventas",
    agent: "Agente Supervisor Principal",
    sites: ["ventas.ejemplo.com", "tienda.ejemplo.com"],
    lastUpdated: "2023-05-08T09:15:00",
    status: "active",
  },
  {
    id: "4",
    name: "Chat de Pruebas",
    description: "Configuración para pruebas internas",
    agent: "Agente de Análisis de Datos",
    sites: ["test.ejemplo.com"],
    lastUpdated: "2023-05-05T16:45:00",
    status: "inactive",
  },
]

export function ChatConfigList() {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [configToDelete, setConfigToDelete] = useState<string | null>(null)
  const [codeDialogOpen, setCodeDialogOpen] = useState(false)
  const [selectedConfig, setSelectedConfig] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  const handleDelete = (id: string) => {
    setConfigToDelete(id)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    // Aquí iría la lógica para eliminar la configuración
    console.log("Eliminando configuración:", configToDelete)
    setDeleteDialogOpen(false)
    setConfigToDelete(null)
  }

  const handleShowCode = (id: string) => {
    setSelectedConfig(id)
    setCodeDialogOpen(true)
  }

  const copyCode = () => {
    const code = `<!-- Código de integración para el chat ${
      mockChatConfigs.find((c) => c.id === selectedConfig)?.name
    } -->
<script>
  window.AGENTHUB_CONFIG = {
    chatId: "${selectedConfig}",
    primaryColor: "#1A8FB4",
    position: "right"
  };
</script>
<script src="https://cdn.agenthub.io/chat-widget.js" async></script>`

    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <>
      {/* Tabla para pantallas medianas y grandes */}
      <div className="hidden md:block">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-gray-50">
              <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Nombre</th>
              <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Agente</th>
              <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Sitios</th>
              <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Última Actualización</th>
              <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Estado</th>
              <th className="text-right py-3 px-4 text-xs font-medium text-gray-500 uppercase">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {mockChatConfigs.map((config) => (
              <tr key={config.id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                      <MessageSquare className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{config.name}</p>
                      <p className="text-xs text-gray-500">{config.description}</p>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <Bot className="h-3 w-3 mr-1 text-gray-400" />
                    <span>{config.agent}</span>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <div className="flex flex-wrap gap-1">
                    {config.sites.map((site, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        <Globe className="h-3 w-3 mr-1" />
                        {site}
                      </Badge>
                    ))}
                  </div>
                </td>
                <td className="py-3 px-4 text-sm text-gray-600">
                  {new Date(config.lastUpdated).toLocaleDateString("es-ES", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </td>
                <td className="py-3 px-4">
                  <Badge
                    className={`${
                      config.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {config.status === "active" ? "Activo" : "Inactivo"}
                  </Badge>
                </td>
                <td className="py-3 px-4 text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={() => handleShowCode(config.id)}
                    >
                      <Code className="h-4 w-4" />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/chat-config/${config.id}`}>
                            <Edit className="mr-2 h-4 w-4" />
                            Editar
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleShowCode(config.id)}>
                          <Code className="mr-2 h-4 w-4" />
                          Ver Código
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Copy className="mr-2 h-4 w-4" />
                          Duplicar
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600" onClick={() => handleDelete(config.id)}>
                          <Trash2 className="mr-2 h-4 w-4" />
                          Eliminar
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Vista de tarjetas para móviles */}
      <div className="md:hidden">
        <div className="divide-y">
          {mockChatConfigs.map((config) => (
            <div key={config.id} className="p-4 hover:bg-gray-50">
              <div className="flex items-center mb-2">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                  <MessageSquare className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-800">{config.name}</p>
                  <p className="text-xs text-gray-500">{config.description}</p>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link href={`/chat-config/${config.id}`}>
                        <Edit className="mr-2 h-4 w-4" />
                        Editar
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleShowCode(config.id)}>
                      <Code className="mr-2 h-4 w-4" />
                      Ver Código
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Copy className="mr-2 h-4 w-4" />
                      Duplicar
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600" onClick={() => handleDelete(config.id)}>
                      <Trash2 className="mr-2 h-4 w-4" />
                      Eliminar
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 mt-2">
                <div>
                  <span className="font-medium">Agente:</span> {config.agent}
                </div>
                <div>
                  <span className="font-medium">Última actualización:</span>{" "}
                  {new Date(config.lastUpdated).toLocaleDateString("es-ES", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </div>
                <div>
                  <span className="font-medium">Estado:</span>{" "}
                  <Badge
                    className={`ml-1 ${
                      config.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {config.status === "active" ? "Activo" : "Inactivo"}
                  </Badge>
                </div>
                <div>
                  <span className="font-medium">Sitios:</span> {config.sites.length}
                </div>
              </div>
              <div className="mt-3 flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs flex-1"
                  onClick={() => handleShowCode(config.id)}
                >
                  <Code className="h-3 w-3 mr-1" />
                  Código
                </Button>
                <Link href={`/chat-config/${config.id}`} className="flex-1">
                  <Button variant="outline" size="sm" className="text-xs w-full">
                    <Edit className="h-3 w-3 mr-1" />
                    Editar
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Diálogo de confirmación para eliminar */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Eliminar Configuración</DialogTitle>
            <DialogDescription>
              ¿Estás seguro de que deseas eliminar esta configuración de chat? Esta acción no se puede deshacer.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Eliminar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Diálogo para mostrar el código de integración */}
      <Dialog open={codeDialogOpen} onOpenChange={setCodeDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Código de Integración</DialogTitle>
            <DialogDescription>Copia este código y pégalo en tu sitio web para integrar el chat.</DialogDescription>
          </DialogHeader>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-md overflow-auto text-sm">
            <pre>
              <code>
                {`<!-- Código de integración para el chat ${
                  mockChatConfigs.find((c) => c.id === selectedConfig)?.name
                } -->
<script>
  window.AGENTHUB_CONFIG = {
    chatId: "${selectedConfig}",
    primaryColor: "#1A8FB4",
    position: "right"
  };
</script>
<script src="https://cdn.agenthub.io/chat-widget.js" async></script>`}
              </code>
            </pre>
          </div>
          <DialogFooter>
            <Button className="w-full" onClick={copyCode}>
              {copied ? "¡Copiado!" : "Copiar Código"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Paginación */}
      <div className="p-4 border-t flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="text-sm text-gray-500 w-full sm:w-auto text-center sm:text-left">
          Mostrando {mockChatConfigs.length} configuraciones
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" disabled className="text-xs px-2">
            Anterior
          </Button>
          <Button variant="outline" size="sm" className="bg-primary/10 text-primary text-xs px-2">
            1
          </Button>
          <Button variant="outline" size="sm" className="text-xs px-2">
            Siguiente
          </Button>
        </div>
      </div>
    </>
  )
}
