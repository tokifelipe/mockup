"use client"

import { useState } from "react"
import { Plus, X } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

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

interface ChatInfoTabProps {
  config: any
  onChange: (values: any) => void
}

export function ChatInfoTab({ config, onChange }: ChatInfoTabProps) {
  const [newSite, setNewSite] = useState("")

  const handleChange = (key: string, value: any) => {
    onChange({ [key]: value })
  }

  const handleAddSite = () => {
    if (!newSite.trim()) return

    // Validar que sea una URL válida o al menos tenga formato de dominio
    if (!newSite.includes(".")) {
      alert("Por favor, introduce un dominio válido")
      return
    }

    // Evitar duplicados
    if (config.sites.includes(newSite)) {
      alert("Este sitio ya está en la lista")
      return
    }

    onChange({ sites: [...config.sites, newSite] })
    setNewSite("")
  }

  const handleRemoveSite = (site: string) => {
    onChange({ sites: config.sites.filter((s: string) => s !== site) })
  }

  return (
    <div className="space-y-4">
      <Card className="border-none shadow-sm">
        <CardHeader className="bg-primary/5 border-b pb-3">
          <CardTitle className="text-lg">Información Básica</CardTitle>
          <CardDescription>Configura la información general de esta configuración de chat</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nombre de la Configuración</Label>
            <Input
              id="name"
              value={config.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="Ej: Chat de Ventas, Chat de Soporte, Chat Principal"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descripción</Label>
            <Textarea
              id="description"
              value={config.description}
              onChange={(e) => handleChange("description", e.target.value)}
              placeholder="Ej: Configuración para la sección de ventas del sitio web"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="agent">Agente Asignado</Label>
            <Select value={config.agent} onValueChange={(value) => handleChange("agent", value)}>
              <SelectTrigger id="agent">
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
            <p className="text-sm text-gray-500">
              Selecciona el agente que responderá a las consultas en este chat. Cada configuración puede tener un agente
              diferente.
            </p>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="status">Estado</Label>
              <p className="text-sm text-gray-500">Activa o desactiva esta configuración de chat</p>
            </div>
            <Switch
              id="status"
              checked={config.status === "active"}
              onCheckedChange={(checked) => handleChange("status", checked ? "active" : "inactive")}
            />
          </div>
        </CardContent>
      </Card>

      <Card className="border-none shadow-sm">
        <CardHeader className="bg-primary/5 border-b pb-3">
          <CardTitle className="text-lg">Sitios Permitidos</CardTitle>
          <CardDescription>Define en qué sitios web se puede utilizar esta configuración de chat</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div className="flex flex-wrap gap-2 mb-4">
            {config.sites.length === 0 ? (
              <div className="text-gray-500 text-sm py-2">No hay sitios configurados</div>
            ) : (
              config.sites.map((site: string, index: number) => (
                <Badge key={index} variant="secondary" className="flex items-center gap-1">
                  {site}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-4 w-4 p-0 ml-1 hover:bg-transparent hover:text-red-500"
                    onClick={() => handleRemoveSite(site)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))
            )}
          </div>

          <div className="flex gap-2">
            <Input
              placeholder="Ej: www.ejemplo.com"
              value={newSite}
              onChange={(e) => setNewSite(e.target.value)}
              className="flex-1"
            />
            <Button type="button" onClick={handleAddSite}>
              <Plus className="h-4 w-4 mr-2" />
              Añadir
            </Button>
          </div>
          <p className="text-sm text-gray-500">
            Añade los dominios donde se utilizará este chat. Deja la lista vacía para permitir cualquier dominio.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
