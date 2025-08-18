"use client"

import Link from "next/link"
import { Bot, ChevronRight, PlusCircle, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { AgentStats } from "@/components/agent-stats"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function HomePage() {
  const router = useRouter()
  const [ready, setReady] = useState(false)

  useEffect(() => {
    try {
      const authed =
        localStorage.getItem("demo-auth") === "1" || sessionStorage.getItem("demo-auth") === "1"
      if (!authed) {
        router.replace("/login")
        return
      }
      setReady(true)
    } catch {
      router.replace("/login")
    }
  }, [router])

  if (!ready) return null

  return (
    <div className="p-4 md:p-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 md:mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Panel de Control</h1>
          <p className="text-gray-500">Gestiona tus agentes y visualiza su rendimiento</p>
        </div>
        <Link href="/agents/new">
          <Button className="w-full md:w-auto bg-action hover:bg-action-hover">
            <PlusCircle className="mr-2 h-4 w-4" />
            Nuevo Agente
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
        <Card>
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Agentes</p>
                <h3 className="text-3xl font-bold text-gray-800">12</h3>
              </div>
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Bot className="h-6 w-6 text-primary" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-green-600">
              <span className="font-medium">+2 nuevos</span>
              <span className="text-gray-500 ml-1">este mes</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Agentes Activos</p>
                <h3 className="text-3xl font-bold text-gray-800">8</h3>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Bot className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-gray-500">
              <span>66% del total</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Interacciones</p>
                <h3 className="text-3xl font-bold text-gray-800">1,254</h3>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <svg
                  className="h-6 w-6 text-primary"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8 12H8.01M12 12H12.01M16 12H16.01M21 12C21 16.418 16.97 20 12 20C10.5 20 9.06 19.75 7.74 19.28L3 20L4.5 15.97C3.56 14.9 3 13.5 3 12C3 7.582 7.03 4 12 4C16.97 4 21 7.582 21 12Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-green-600">
              <span className="font-medium">+18%</span>
              <span className="text-gray-500 ml-1">vs semana anterior</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mb-6 md:mb-8">
        <AgentStats />
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-800">Agentes Recientes</h2>
          <Link href="/agents" className="text-primary text-sm font-medium flex items-center">
            Ver todos
            <ChevronRight className="ml-1 h-4 w-4" />
          </Link>
        </div>

        <div className="bg-white rounded-lg border overflow-hidden">
          <div className="p-4 border-b flex items-center">
            <Search className="h-4 w-4 text-gray-400 mr-2" />
            <Input
              placeholder="Buscar agentes..."
              className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 h-8 text-sm"
            />
          </div>

          {/* Tabla para pantallas medianas y grandes */}
          <div className="hidden md:block">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Nombre</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Tipo</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Fuentes</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Última Actividad</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Estado</th>
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
                  <td className="py-3 px-4 text-sm text-gray-600">2 fuentes</td>
                  <td className="py-3 px-4 text-sm text-gray-600">Hace 2 horas</td>
                  <td className="py-3 px-4">
                    <span className="status-badge status-active">Activo</span>
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
                  <td className="py-3 px-4 text-sm text-gray-600">2 fuentes</td>
                  <td className="py-3 px-4 text-sm text-gray-600">Hace 5 horas</td>
                  <td className="py-3 px-4">
                    <span className="status-badge status-active">Activo</span>
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
                  <td className="py-3 px-4 text-sm text-gray-600">2 fuentes</td>
                  <td className="py-3 px-4 text-sm text-gray-600">Hace 1 día</td>
                  <td className="py-3 px-4">
                    <span className="status-badge status-active">Activo</span>
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
                  <td className="py-3 px-4 text-sm text-gray-600">1 fuente</td>
                  <td className="py-3 px-4 text-sm text-gray-600">Hace 3 días</td>
                  <td className="py-3 px-4">
                    <span className="status-badge status-pending">Pendiente</span>
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
                  <span className="status-badge status-active">Activo</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 mt-2">
                  <div>
                    <span className="font-medium">Tipo:</span> Supervisor
                  </div>
                  <div>
                    <span className="font-medium">Fuentes:</span> 2 fuentes
                  </div>
                  <div className="col-span-2">
                    <span className="font-medium">Última actividad:</span> Hace 2 horas
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
                  <span className="status-badge status-active">Activo</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 mt-2">
                  <div>
                    <span className="font-medium">Tipo:</span> Trabajador
                  </div>
                  <div>
                    <span className="font-medium">Fuentes:</span> 2 fuentes
                  </div>
                  <div className="col-span-2">
                    <span className="font-medium">Última actividad:</span> Hace 5 horas
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
                  <span className="status-badge status-active">Activo</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 mt-2">
                  <div>
                    <span className="font-medium">Tipo:</span> Trabajador
                  </div>
                  <div>
                    <span className="font-medium">Fuentes:</span> 2 fuentes
                  </div>
                  <div className="col-span-2">
                    <span className="font-medium">Última actividad:</span> Hace 1 día
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
                  <span className="status-badge status-pending">Pendiente</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 mt-2">
                  <div>
                    <span className="font-medium">Tipo:</span> Trabajador
                  </div>
                  <div>
                    <span className="font-medium">Fuentes:</span> 1 fuente
                  </div>
                  <div className="col-span-2">
                    <span className="font-medium">Última actividad:</span> Hace 3 días
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 md:mt-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-800">Usuarios con Más Interacciones</h2>
          <Button variant="outline" size="sm" className="text-primary text-sm font-medium flex items-center">
            Ver todos
            <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </div>

        <div className="bg-white rounded-lg border overflow-hidden">
          {/* Tabla para pantallas medianas y grandes */}
          <div className="hidden md:block">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Usuario</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Interacciones</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">
                    Última Interacción
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Tendencia</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                        <span className="text-sm font-medium text-blue-600">MC</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">María Castillo</p>
                        <p className="text-xs text-gray-500">maria@ejemplo.com</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">128</td>
                  <td className="py-3 px-4 text-sm text-gray-600">Hace 2 horas</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      <div className="text-green-600 flex items-center">
                        <svg
                          className="w-4 h-4 mr-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 10l7-7m0 0l7 7m-7-7v18"
                          ></path>
                        </svg>
                        <span>12%</span>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                        <span className="text-sm font-medium text-purple-600">JR</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">Juan Rodríguez</p>
                        <p className="text-xs text-gray-500">juan@ejemplo.com</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">96</td>
                  <td className="py-3 px-4 text-sm text-gray-600">Hace 5 horas</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      <div className="text-green-600 flex items-center">
                        <svg
                          className="w-4 h-4 mr-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 10l7-7m0 0l7 7m-7-7v18"
                          ></path>
                        </svg>
                        <span>8%</span>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                        <span className="text-sm font-medium text-green-600">AL</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">Ana López</p>
                        <p className="text-xs text-gray-500">ana@ejemplo.com</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">85</td>
                  <td className="py-3 px-4 text-sm text-gray-600">Hace 1 día</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      <div className="text-red-600 flex items-center">
                        <svg
                          className="w-4 h-4 mr-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 14l-7 7m0 0l-7-7m7 7V3"
                          ></path>
                        </svg>
                        <span>3%</span>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mr-3">
                        <span className="text-sm font-medium text-orange-600">PG</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">Pedro Gómez</p>
                        <p className="text-xs text-gray-500">pedro@ejemplo.com</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">72</td>
                  <td className="py-3 px-4 text-sm text-gray-600">Hace 2 días</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      <div className="text-green-600 flex items-center">
                        <svg
                          className="w-4 h-4 mr-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 10l7-7m0 0l7 7m-7-7v18"
                          ></path>
                        </svg>
                        <span>5%</span>
                      </div>
                    </div>
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
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-sm font-medium text-blue-600">MC</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">María Castillo</p>
                    <p className="text-xs text-gray-500">maria@ejemplo.com</p>
                  </div>
                  <div className="text-green-600 flex items-center">
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 10l7-7m0 0l7 7m-7-7v18"
                      ></path>
                    </svg>
                    <span>12%</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 mt-2">
                  <div>
                    <span className="font-medium">Interacciones:</span> 128
                  </div>
                  <div>
                    <span className="font-medium">Última:</span> Hace 2 horas
                  </div>
                </div>
              </div>

              <div className="p-4 hover:bg-gray-50">
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-sm font-medium text-purple-600">JR</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">Juan Rodríguez</p>
                    <p className="text-xs text-gray-500">juan@ejemplo.com</p>
                  </div>
                  <div className="text-green-600 flex items-center">
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 10l7-7m0 0l7 7m-7-7v18"
                      ></path>
                    </svg>
                    <span>8%</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 mt-2">
                  <div>
                    <span className="font-medium">Interacciones:</span> 96
                  </div>
                  <div>
                    <span className="font-medium">Última:</span> Hace 5 horas
                  </div>
                </div>
              </div>

              <div className="p-4 hover:bg-gray-50">
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-sm font-medium text-green-600">AL</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">Ana López</p>
                    <p className="text-xs text-gray-500">ana@ejemplo.com</p>
                  </div>
                  <div className="text-red-600 flex items-center">
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 14l-7 7m0 0l-7-7m7 7V3"
                      ></path>
                    </svg>
                    <span>3%</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 mt-2">
                  <div>
                    <span className="font-medium">Interacciones:</span> 85
                  </div>
                  <div>
                    <span className="font-medium">Última:</span> Hace 1 día
                  </div>
                </div>
              </div>

              <div className="p-4 hover:bg-gray-50">
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-sm font-medium text-orange-600">PG</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">Pedro Gómez</p>
                    <p className="text-xs text-gray-500">pedro@ejemplo.com</p>
                  </div>
                  <div className="text-green-600 flex items-center">
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 10l7-7m0 0l7 7m-7-7v18"
                      ></path>
                    </svg>
                    <span>5%</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 mt-2">
                  <div>
                    <span className="font-medium">Interacciones:</span> 72
                  </div>
                  <div>
                    <span className="font-medium">Última:</span> Hace 2 días
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
