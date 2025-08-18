import Link from "next/link"
import { Bot, Database, MoreHorizontal, PlusCircle, Search, SlidersHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function AgentsPage() {
  return (
    <div className="p-4 md:p-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Listado de Agentes (12)</h1>
          <div className="flex items-center text-sm text-gray-500 mt-1">
            <Link href="/" className="hover:text-primary">
              Panel
            </Link>
            <span className="mx-2">•</span>
            <span>Agentes</span>
          </div>
        </div>
        <Link href="/agents/new">
          <Button className="w-full md:w-auto bg-action hover:bg-action-hover">
            <PlusCircle className="mr-2 h-4 w-4" />
            Nuevo Agente
          </Button>
        </Link>
      </div>

      <div className="bg-white rounded-lg border overflow-hidden">
        <div className="p-4 border-b flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input placeholder="Buscar agentes..." className="pl-9 h-10 w-full" />
          </div>
          <Button variant="outline" size="sm" className="w-full sm:w-auto">
            <SlidersHorizontal className="mr-2 h-4 w-4" />
            Filtros
          </Button>
        </div>

        {/* Tabla para pantallas medianas y grandes */}
        <div className="hidden md:block">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-gray-50">
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Nombre</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Tipo</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Fuentes de Datos</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Última Actividad</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Estado</th>
                <th className="text-right py-3 px-4 text-xs font-medium text-gray-500 uppercase">Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b hover:bg-gray-50">
                <td className="py-3 px-4">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                      <Bot className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">Agente Supervisor Principal</p>
                      <p className="text-xs text-gray-500">Supervisa 3 agentes</p>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-4 text-sm text-gray-600">Supervisor</td>
                <td className="py-3 px-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <Database className="h-3 w-3 mr-1 text-gray-400" />
                    <span>2 fuentes</span>
                  </div>
                </td>
                <td className="py-3 px-4 text-sm text-gray-600">Hace 2 horas</td>
                <td className="py-3 px-4">
                  <span className="status-badge status-active">Activo</span>
                </td>
                <td className="py-3 px-4 text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Link href="/agents/1" className="flex w-full">
                          Editar
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>Duplicar</DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">Eliminar</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
              <tr className="border-b hover:bg-gray-50">
                <td className="py-3 px-4">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                      <Bot className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">Agente de Atención al Cliente</p>
                      <p className="text-xs text-gray-500">Supervisa 1 agente</p>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-4 text-sm text-gray-600">Trabajador</td>
                <td className="py-3 px-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <Database className="h-3 w-3 mr-1 text-gray-400" />
                    <span>2 fuentes</span>
                  </div>
                </td>
                <td className="py-3 px-4 text-sm text-gray-600">Hace 5 horas</td>
                <td className="py-3 px-4">
                  <span className="status-badge status-active">Activo</span>
                </td>
                <td className="py-3 px-4 text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Link href="/agents/2" className="flex w-full">
                          Editar
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>Duplicar</DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">Eliminar</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
              <tr className="border-b hover:bg-gray-50">
                <td className="py-3 px-4">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                      <Bot className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">Agente de Análisis de Datos</p>
                      <p className="text-xs text-gray-500">Sin supervisados</p>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-4 text-sm text-gray-600">Trabajador</td>
                <td className="py-3 px-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <Database className="h-3 w-3 mr-1 text-gray-400" />
                    <span>2 fuentes</span>
                  </div>
                </td>
                <td className="py-3 px-4 text-sm text-gray-600">Hace 1 día</td>
                <td className="py-3 px-4">
                  <span className="status-badge status-active">Activo</span>
                </td>
                <td className="py-3 px-4 text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Link href="/agents/3" className="flex w-full">
                          Editar
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>Duplicar</DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">Eliminar</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="py-3 px-4">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                      <Bot className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">Agente de Soporte Técnico</p>
                      <p className="text-xs text-gray-500">Sin supervisados</p>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-4 text-sm text-gray-600">Trabajador</td>
                <td className="py-3 px-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <Database className="h-3 w-3 mr-1 text-gray-400" />
                    <span>1 fuente</span>
                  </div>
                </td>
                <td className="py-3 px-4 text-sm text-gray-600">Hace 3 días</td>
                <td className="py-3 px-4">
                  <span className="status-badge status-pending">Pendiente</span>
                </td>
                <td className="py-3 px-4 text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Link href="/agents/4" className="flex w-full">
                          Editar
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>Duplicar</DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">Eliminar</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Vista de tarjetas para móviles */}
        <div className="md:hidden">
          <div className="divide-y">
            <div className="p-4 hover:bg-gray-50">
              <div className="flex items-center mb-2">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                  <Bot className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-800">Agente Supervisor Principal</p>
                  <p className="text-xs text-gray-500">Supervisa 3 agentes</p>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Link href="/agents/1" className="flex w-full">
                        Editar
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>Duplicar</DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">Eliminar</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 mt-2">
                <div>
                  <span className="font-medium">Tipo:</span> Supervisor
                </div>
                <div>
                  <span className="font-medium">Fuentes:</span> 2 fuentes
                </div>
                <div>
                  <span className="font-medium">Última actividad:</span> Hace 2 horas
                </div>
                <div>
                  <span className="font-medium">Estado:</span>
                  <span className="status-badge status-active ml-1">Activo</span>
                </div>
              </div>
            </div>

            <div className="p-4 hover:bg-gray-50">
              <div className="flex items-center mb-2">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                  <Bot className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-800">Agente de Atención al Cliente</p>
                  <p className="text-xs text-gray-500">Supervisa 1 agente</p>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Link href="/agents/2" className="flex w-full">
                        Editar
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>Duplicar</DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">Eliminar</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 mt-2">
                <div>
                  <span className="font-medium">Tipo:</span> Trabajador
                </div>
                <div>
                  <span className="font-medium">Fuentes:</span> 2 fuentes
                </div>
                <div>
                  <span className="font-medium">Última actividad:</span> Hace 5 horas
                </div>
                <div>
                  <span className="font-medium">Estado:</span>
                  <span className="status-badge status-active ml-1">Activo</span>
                </div>
              </div>
            </div>

            <div className="p-4 hover:bg-gray-50">
              <div className="flex items-center mb-2">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                  <Bot className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-800">Agente de Análisis de Datos</p>
                  <p className="text-xs text-gray-500">Sin supervisados</p>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Link href="/agents/3" className="flex w-full">
                        Editar
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>Duplicar</DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">Eliminar</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 mt-2">
                <div>
                  <span className="font-medium">Tipo:</span> Trabajador
                </div>
                <div>
                  <span className="font-medium">Fuentes:</span> 2 fuentes
                </div>
                <div>
                  <span className="font-medium">Última actividad:</span> Hace 1 día
                </div>
                <div>
                  <span className="font-medium">Estado:</span>
                  <span className="status-badge status-active ml-1">Activo</span>
                </div>
              </div>
            </div>

            <div className="p-4 hover:bg-gray-50">
              <div className="flex items-center mb-2">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                  <Bot className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-800">Agente de Soporte Técnico</p>
                  <p className="text-xs text-gray-500">Sin supervisados</p>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Link href="/agents/4" className="flex w-full">
                        Editar
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>Duplicar</DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">Eliminar</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 mt-2">
                <div>
                  <span className="font-medium">Tipo:</span> Trabajador
                </div>
                <div>
                  <span className="font-medium">Fuentes:</span> 1 fuente
                </div>
                <div>
                  <span className="font-medium">Última actividad:</span> Hace 3 días
                </div>
                <div>
                  <span className="font-medium">Estado:</span>
                  <span className="status-badge status-pending ml-1">Pendiente</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 border-t flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-sm text-gray-500 w-full sm:w-auto text-center sm:text-left">
            Mostrando 4 de 12 agentes
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" disabled className="text-xs px-2">
              Anterior
            </Button>
            <Button variant="outline" size="sm" className="bg-primary/10 text-primary text-xs px-2">
              1
            </Button>
            <Button variant="outline" size="sm" className="text-xs px-2">
              2
            </Button>
            <Button variant="outline" size="sm" className="text-xs px-2">
              3
            </Button>
            <Button variant="outline" size="sm" className="text-xs px-2">
              Siguiente
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
