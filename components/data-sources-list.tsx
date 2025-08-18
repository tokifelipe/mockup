"use client"

import { useState } from "react"
import Link from "next/link"
import { Bot, Database, Edit, Globe, MoreHorizontal, Trash2 } from "lucide-react"

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

// Mock data para fuentes de datos
const mockDataSources = [
  {
    id: "1",
    name: "Base de Conocimiento Principal",
    type: "vector_db",
    description: "Documentación general de la empresa",
    lastUpdated: "2023-05-15T10:00:00",
    status: "active",
    usedBy: ["Agente Supervisor Principal", "Agente de Atención al Cliente"],
  },
  {
    id: "2",
    name: "CRM",
    type: "api",
    description: "API de acceso al sistema CRM",
    lastUpdated: "2023-05-10T14:30:00",
    status: "active",
    usedBy: ["Agente de Atención al Cliente"],
  },
  {
    id: "3",
    name: "Data Warehouse",
    type: "sql",
    description: "Base de datos analítica",
    lastUpdated: "2023-05-08T09:15:00",
    status: "active",
    usedBy: ["Agente de Análisis de Datos"],
  },
  {
    id: "4",
    name: "API Externa",
    type: "api",
    description: "Conexión a servicio externo",
    lastUpdated: "2023-05-05T16:45:00",
    status: "active",
    usedBy: ["Agente Supervisor Principal"],
  },
  {
    id: "5",
    name: "Base de Conocimiento Técnica",
    type: "vector_db",
    description: "Documentación técnica y manuales",
    lastUpdated: "2023-05-03T11:20:00",
    status: "active",
    usedBy: ["Agente de Soporte Técnico"],
  },
  {
    id: "6",
    name: "API de Analytics",
    type: "api",
    description: "Conexión a plataforma de analytics",
    lastUpdated: "2023-05-01T13:10:00",
    status: "inactive",
    usedBy: ["Agente de Análisis de Datos"],
  },
]

export function DataSourcesList() {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [dataSourceToDelete, setDataSourceToDelete] = useState<string | null>(null)

  const handleDelete = (id: string) => {
    setDataSourceToDelete(id)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    // Aquí iría la lógica para eliminar la fuente de datos
    console.log("Eliminando fuente de datos:", dataSourceToDelete)
    setDeleteDialogOpen(false)
    setDataSourceToDelete(null)
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "vector_db":
        return <Database className="h-4 w-4 text-blue-500" />
      case "api":
        return <Globe className="h-4 w-4 text-green-500" />
      case "sql":
        return <Database className="h-4 w-4 text-purple-500" />
      default:
        return <Database className="h-4 w-4 text-gray-500" />
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "vector_db":
        return "Base de Conocimiento"
      case "api":
        return "API"
      case "sql":
        return "Base de Datos SQL"
      default:
        return type
    }
  }

  return (
    <>
      {/* Tabla para pantallas medianas y grandes */}
      <div className="hidden md:block">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-gray-50">
              <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Nombre</th>
              <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Tipo</th>
              <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Utilizada por</th>
              <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Última Actualización</th>
              <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Estado</th>
              <th className="text-right py-3 px-4 text-xs font-medium text-gray-500 uppercase">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {mockDataSources.map((dataSource) => (
              <tr key={dataSource.id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                      {getTypeIcon(dataSource.type)}
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{dataSource.name}</p>
                      <p className="text-xs text-gray-500">{dataSource.description}</p>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <Badge
                    variant="outline"
                    className={`
                      ${dataSource.type === "vector_db" ? "border-blue-200 bg-blue-50 text-blue-700" : ""}
                      ${dataSource.type === "api" ? "border-green-200 bg-green-50 text-green-700" : ""}
                      ${dataSource.type === "sql" ? "border-purple-200 bg-purple-50 text-purple-700" : ""}
                    `}
                  >
                    {getTypeLabel(dataSource.type)}
                  </Badge>
                </td>
                <td className="py-3 px-4">
                  <div className="flex flex-wrap gap-1">
                    {dataSource.usedBy.map((agent, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        <Bot className="h-3 w-3 mr-1" />
                        {agent}
                      </Badge>
                    ))}
                  </div>
                </td>
                <td className="py-3 px-4 text-sm text-gray-600">
                  {new Date(dataSource.lastUpdated).toLocaleDateString("es-ES", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </td>
                <td className="py-3 px-4">
                  <Badge
                    className={`${
                      dataSource.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {dataSource.status === "active" ? "Activa" : "Inactiva"}
                  </Badge>
                </td>
                <td className="py-3 px-4 text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link href={`/fuentes-datos/${dataSource.id}`}>
                          <Edit className="mr-2 h-4 w-4" />
                          Editar
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600" onClick={() => handleDelete(dataSource.id)}>
                        <Trash2 className="mr-2 h-4 w-4" />
                        Eliminar
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Vista de tarjetas para móviles */}
      <div className="md:hidden">
        <div className="divide-y">
          {mockDataSources.map((dataSource) => (
            <div key={dataSource.id} className="p-4 hover:bg-gray-50">
              <div className="flex items-center mb-2">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                  {getTypeIcon(dataSource.type)}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-800">{dataSource.name}</p>
                  <p className="text-xs text-gray-500">{dataSource.description}</p>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link href={`/fuentes-datos/${dataSource.id}`}>
                        <Edit className="mr-2 h-4 w-4" />
                        Editar
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600" onClick={() => handleDelete(dataSource.id)}>
                      <Trash2 className="mr-2 h-4 w-4" />
                      Eliminar
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 mt-2">
                <div>
                  <span className="font-medium">Tipo:</span>{" "}
                  <Badge
                    variant="outline"
                    className={`ml-1 text-xs
                      ${dataSource.type === "vector_db" ? "border-blue-200 bg-blue-50 text-blue-700" : ""}
                      ${dataSource.type === "api" ? "border-green-200 bg-green-50 text-green-700" : ""}
                      ${dataSource.type === "sql" ? "border-purple-200 bg-purple-50 text-purple-700" : ""}
                    `}
                  >
                    {getTypeLabel(dataSource.type)}
                  </Badge>
                </div>
                <div>
                  <span className="font-medium">Última actualización:</span>{" "}
                  {new Date(dataSource.lastUpdated).toLocaleDateString("es-ES", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </div>
                <div>
                  <span className="font-medium">Estado:</span>{" "}
                  <Badge
                    className={`ml-1 ${
                      dataSource.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {dataSource.status === "active" ? "Activa" : "Inactiva"}
                  </Badge>
                </div>
                <div>
                  <span className="font-medium">Utilizada por:</span> {dataSource.usedBy.length} agentes
                </div>
              </div>
              <div className="mt-3">
                <Link href={`/fuentes-datos/${dataSource.id}`} className="w-full">
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
            <DialogTitle>Eliminar Fuente de Datos</DialogTitle>
            <DialogDescription>
              ¿Estás seguro de que deseas eliminar esta fuente de datos? Esta acción no se puede deshacer y podría
              afectar a los agentes que la utilizan.
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

      {/* Paginación */}
      <div className="p-4 border-t flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="text-sm text-gray-500 w-full sm:w-auto text-center sm:text-left">
          Mostrando {mockDataSources.length} fuentes de datos
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
