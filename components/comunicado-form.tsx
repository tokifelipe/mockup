"use client"

import type React from "react"

import { useState } from "react"
import { Calendar, Mail, Save, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock data para comunicados
const mockComunicados = [
  {
    id: "1",
    titulo: "Actualización de Términos de Servicio",
    agente: "2", // ID del agente
    segmento: "todos", // ID del segmento
    programado: "2023-05-15T10:00:00",
    estado: "enviado",
    usuarios: 1250,
    contenido:
      "Estimado usuario, le informamos que hemos actualizado nuestros términos de servicio. Los cambios entrarán en vigor el próximo 1 de junio. Por favor, revise los nuevos términos en nuestra página web. Si tiene alguna pregunta, no dude en contactar con nuestro equipo de soporte.",
  },
  {
    id: "2",
    titulo: "Nuevas funcionalidades disponibles",
    agente: "1", // ID del agente
    segmento: "premium", // ID del segmento
    programado: "2023-05-20T14:30:00",
    estado: "programado",
    usuarios: 450,
    contenido:
      "Apreciado usuario premium, nos complace informarle que hemos añadido nuevas funcionalidades exclusivas para su tipo de cuenta. Entre ellas se incluyen: análisis avanzado de datos, exportación en múltiples formatos y acceso prioritario al soporte técnico. Esperamos que disfrute de estas mejoras.",
  },
]

// Mock data para agentes
const mockAgents = [
  {
    id: "1",
    name: "Agente Supervisor Principal",
    description: "Agente de alto nivel que supervisa a todos los demás agentes",
    type: "supervisor",
  },
  {
    id: "2",
    name: "Agente de Atención al Cliente",
    description: "Responde consultas de clientes basadas en la documentación",
    type: "worker",
  },
  {
    id: "3",
    name: "Agente de Análisis de Datos",
    description: "Analiza datos y genera informes",
    type: "worker",
  },
  {
    id: "4",
    name: "Agente de Soporte Técnico",
    description: "Proporciona soporte técnico específico",
    type: "worker",
  },
]

// Mock data para segmentos de usuarios
const mockSegments = [
  {
    id: "todos",
    name: "Todos los usuarios",
    description: "Todos los usuarios registrados en la plataforma",
    count: 1250,
  },
  {
    id: "premium",
    name: "Usuarios premium",
    description: "Usuarios con suscripción premium activa",
    count: 450,
  },
  {
    id: "activos",
    name: "Usuarios activos",
    description: "Usuarios que han iniciado sesión en los últimos 30 días",
    count: 780,
  },
  {
    id: "recientes",
    name: "Usuarios recientes",
    description: "Usuarios registrados en los últimos 7 días",
    count: 320,
  },
]

interface ComunicadoFormProps {
  isNew: boolean
  comunicadoId: string
}

export function ComunicadoForm({ isNew, comunicadoId }: ComunicadoFormProps) {
  // Si no es nuevo, buscar el comunicado existente
  const existingComunicado = !isNew ? mockComunicados.find((c) => c.id === comunicadoId) : null

  // Obtener la fecha y hora actual para nuevos comunicados
  const now = new Date()
  const tomorrow = new Date(now)
  tomorrow.setDate(tomorrow.getDate() + 1)
  tomorrow.setHours(10, 0, 0, 0)

  const [formData, setFormData] = useState({
    titulo: existingComunicado?.titulo || "",
    agente: existingComunicado?.agente || "",
    segmento: existingComunicado?.segmento || "",
    fecha: existingComunicado
      ? new Date(existingComunicado.programado).toISOString().split("T")[0]
      : tomorrow.toISOString().split("T")[0],
    hora: existingComunicado ? new Date(existingComunicado.programado).toTimeString().slice(0, 5) : "10:00",
    contenido: existingComunicado?.contenido || "",
  })

  const [selectedSegment, setSelectedSegment] = useState<string | null>(existingComunicado?.segmento || null)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSegmentChange = (segmentId: string) => {
    setSelectedSegment(segmentId)
    setFormData((prev) => ({ ...prev, segmento: segmentId }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    // Aquí se enviaría el formulario al servidor
    alert(isNew ? "Comunicado programado correctamente" : "Comunicado actualizado correctamente")
  }

  // Obtener el segmento seleccionado para mostrar el número de usuarios
  const segment = mockSegments.find((s) => s.id === selectedSegment)

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-4 md:gap-6 mb-6">
        <Card className="border-none shadow-sm">
          <CardHeader className="bg-primary/5 border-b pb-3">
            <CardTitle className="flex items-center text-lg">
              <Mail className="mr-2 h-5 w-5 text-primary" />
              Información del Comunicado
            </CardTitle>
            <CardDescription>Configura los detalles básicos del comunicado</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="titulo">Título del Comunicado</Label>
                <Input
                  id="titulo"
                  value={formData.titulo}
                  onChange={(e) => handleInputChange("titulo", e.target.value)}
                  placeholder="Ej: Actualización de Términos de Servicio"
                  required
                  className="border-gray-300"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="agente">Agente que enviará el comunicado</Label>
                <Select value={formData.agente} onValueChange={(value) => handleInputChange("agente", value)} required>
                  <SelectTrigger id="agente" className="border-gray-300">
                    <SelectValue placeholder="Selecciona un agente" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockAgents.map((agent) => (
                      <SelectItem key={agent.id} value={agent.id}>
                        {agent.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-sm text-gray-500 mt-1">El agente seleccionado será el remitente del comunicado</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm">
          <CardHeader className="bg-primary/5 border-b pb-3">
            <CardTitle className="flex items-center text-lg">
              <Users className="mr-2 h-5 w-5 text-primary" />
              Destinatarios
            </CardTitle>
            <CardDescription>Selecciona el segmento de usuarios que recibirá el comunicado</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="segmento">Segmento de usuarios</Label>
                <Select value={formData.segmento} onValueChange={(value) => handleSegmentChange(value)} required>
                  <SelectTrigger id="segmento" className="border-gray-300">
                    <SelectValue placeholder="Selecciona un segmento" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockSegments.map((segment) => (
                      <SelectItem key={segment.id} value={segment.id}>
                        {segment.name} ({segment.count} usuarios)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {segment && (
                  <p className="text-sm text-gray-500 mt-1">Este comunicado se enviará a {segment.count} usuarios</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm">
          <CardHeader className="bg-primary/5 border-b pb-3">
            <CardTitle className="flex items-center text-lg">
              <Calendar className="mr-2 h-5 w-5 text-primary" />
              Programación
            </CardTitle>
            <CardDescription>Establece cuándo se enviará el comunicado</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="fecha">Fecha de envío</Label>
                <Input
                  id="fecha"
                  type="date"
                  value={formData.fecha}
                  onChange={(e) => handleInputChange("fecha", e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                  required
                  className="border-gray-300"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="hora">Hora de envío</Label>
                <Input
                  id="hora"
                  type="time"
                  value={formData.hora}
                  onChange={(e) => handleInputChange("hora", e.target.value)}
                  required
                  className="border-gray-300"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm">
          <CardHeader className="bg-primary/5 border-b pb-3">
            <CardTitle className="text-lg">Contenido del Comunicado</CardTitle>
            <CardDescription>Escribe el mensaje que se enviará a los usuarios</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <Textarea
              value={formData.contenido}
              onChange={(e) => handleInputChange("contenido", e.target.value)}
              placeholder="Escribe aquí el contenido del comunicado..."
              rows={10}
              required
              className="border-gray-300"
            />
            <p className="text-sm text-gray-500 mt-2">
              Puedes usar texto plano. No se admite HTML ni formato enriquecido.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end">
        <Button type="submit" className="w-full sm:w-auto bg-action hover:bg-action-hover">
          <Save className="mr-2 h-4 w-4" />
          {isNew ? "Programar Comunicado" : "Guardar Cambios"}
        </Button>
      </div>
    </form>
  )
}
