import Link from "next/link"
import { Calendar, Clock, Mail, MoreHorizontal, PlusCircle, Search, SlidersHorizontal, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

// Mock data para comunicados
const mockComunicados = [
  {
    id: "1",
    titulo: "Actualización de Términos de Servicio",
    agente: "Agente de Atención al Cliente",
    segmento: "Todos los usuarios",
    programado: "2023-05-15T10:00:00",
    estado: "enviado",
    usuarios: 1250,
  },
  {
    id: "2",
    titulo: "Nuevas funcionalidades disponibles",
    agente: "Agente Supervisor Principal",
    segmento: "Usuarios premium",
    programado: "2023-05-20T14:30:00",
    estado: "programado",
    usuarios: 450,
  },
  {
    id: "3",
    titulo: "Mantenimiento programado",
    agente: "Agente de Soporte Técnico",
    segmento: "Usuarios activos",
    programado: "2023-05-25T08:00:00",
    estado: "programado",
    usuarios: 780,
  },
  {
    id: "4",
    titulo: "Encuesta de satisfacción",
    agente: "Agente de Análisis de Datos",
    segmento: "Usuarios recientes",
    programado: "2023-05-10T12:00:00",
    estado: "enviado",
    usuarios: 320,
  },
]

export default function ComunicadosPage() {
  return (
    <div className="p-4 md:p-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Comunicados Programados</h1>
          <div className="flex items-center text-sm text-gray-500 mt-1">
            <Link href="/" className="hover:text-primary">
              Panel
            </Link>
            <span className="mx-2">•</span>
            <span>Comunicados</span>
          </div>
        </div>
        <Link href="/comunicados/nuevo">
          <Button className="w-full md:w-auto bg-action hover:bg-action-hover">
            <PlusCircle className="mr-2 h-4 w-4" />
            Nuevo Comunicado
          </Button>
        </Link>
      </div>

      <div className="bg-white rounded-lg border overflow-hidden">
        <div className="p-4 border-b flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input placeholder="Buscar comunicados..." className="pl-9 h-10 w-full" />
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
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Título</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Agente</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Segmento</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Programado para</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Estado</th>
                <th className="text-right py-3 px-4 text-xs font-medium text-gray-500 uppercase">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {mockComunicados.map((comunicado) => (
                <tr key={comunicado.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                        <Mail className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">{comunicado.titulo}</p>
                        <p className="text-xs text-gray-500">{comunicado.usuarios} destinatarios</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">{comunicado.agente}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <Users className="h-3 w-3 mr-1 text-gray-400" />
                      <span>{comunicado.segmento}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1 text-gray-400" />
                      <span>
                        {new Date(comunicado.programado).toLocaleDateString("es-ES", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        })}
                      </span>
                      <Clock className="h-3 w-3 ml-2 mr-1 text-gray-400" />
                      <span>
                        {new Date(comunicado.programado).toLocaleTimeString("es-ES", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <Badge
                      className={`${
                        comunicado.estado === "enviado" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {comunicado.estado === "enviado" ? "Enviado" : "Programado"}
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
                        <DropdownMenuItem>
                          <Link href={`/comunicados/${comunicado.id}`} className="flex w-full">
                            Ver detalles
                          </Link>
                        </DropdownMenuItem>
                        {comunicado.estado === "programado" && (
                          <>
                            <DropdownMenuItem>
                              <Link href={`/comunicados/${comunicado.id}/editar`} className="flex w-full">
                                Editar
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>Enviar ahora</DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">Cancelar</DropdownMenuItem>
                          </>
                        )}
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
            {mockComunicados.map((comunicado) => (
              <div key={comunicado.id} className="p-4 hover:bg-gray-50">
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                    <Mail className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">{comunicado.titulo}</p>
                    <p className="text-xs text-gray-500">{comunicado.usuarios} destinatarios</p>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Link href={`/comunicados/${comunicado.id}`} className="flex w-full">
                          Ver detalles
                        </Link>
                      </DropdownMenuItem>
                      {comunicado.estado === "programado" && (
                        <>
                          <DropdownMenuItem>
                            <Link href={`/comunicados/${comunicado.id}/editar`} className="flex w-full">
                              Editar
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem>Enviar ahora</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">Cancelar</DropdownMenuItem>
                        </>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 mt-2">
                  <div>
                    <span className="font-medium">Agente:</span> {comunicado.agente}
                  </div>
                  <div>
                    <span className="font-medium">Segmento:</span> {comunicado.segmento}
                  </div>
                  <div className="col-span-2">
                    <span className="font-medium">Programado para:</span>{" "}
                    {new Date(comunicado.programado).toLocaleDateString("es-ES", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}{" "}
                    a las{" "}
                    {new Date(comunicado.programado).toLocaleTimeString("es-ES", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                  <div>
                    <span className="font-medium">Estado:</span>{" "}
                    <Badge
                      className={`ml-1 ${
                        comunicado.estado === "enviado" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {comunicado.estado === "enviado" ? "Enviado" : "Programado"}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 border-t flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-sm text-gray-500 w-full sm:w-auto text-center sm:text-left">
            Mostrando {mockComunicados.length} comunicados
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
      </div>
    </div>
  )
}
