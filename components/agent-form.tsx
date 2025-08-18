"use client"

import type React from "react"

import { useState } from "react"
import { Bot, Database, Save, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { DataSourceSelector } from "@/components/data-source-selector"
import { AgentSelector } from "@/components/agent-selector"

// Mock data for demonstration
const mockAgents = [
  {
    id: "1",
    name: "Agente Supervisor Principal",
    description: "Agente de alto nivel que supervisa a todos los demás agentes",
    type: "supervisor",
    dataSources: ["Base de Conocimiento", "API Externa"],
    supervisedAgents: ["2", "3"],
    prompt: "Eres un agente supervisor que coordina las tareas de otros agentes...",
  },
  {
    id: "2",
    name: "Agente de Atención al Cliente",
    description: "Responde consultas de clientes basadas en la documentación",
    type: "worker",
    dataSources: ["Base de Conocimiento", "CRM"],
    supervisedAgents: ["4"],
    prompt: "Eres un agente de atención al cliente que ayuda a resolver problemas...",
  },
  {
    id: "3",
    name: "Agente de Análisis de Datos",
    description: "Analiza datos y genera informes",
    type: "worker",
    dataSources: ["Data Warehouse", "API de Analytics"],
    supervisedAgents: [],
    prompt: "Eres un agente analítico que procesa datos y genera insights...",
  },
  {
    id: "4",
    name: "Agente de Soporte Técnico",
    description: "Proporciona soporte técnico específico",
    type: "worker",
    dataSources: ["Base de Conocimiento Técnica"],
    supervisedAgents: [],
    prompt: "Eres un agente de soporte técnico especializado en resolver problemas...",
  },
]

const mockDataSources = [
  { id: "1", name: "Base de Conocimiento", type: "vector_db" },
  { id: "2", name: "CRM", type: "api" },
  { id: "3", name: "Data Warehouse", type: "sql" },
  { id: "4", name: "API Externa", type: "api" },
  { id: "5", name: "API de Analytics", type: "api" },
  { id: "6", name: "Base de Conocimiento Técnica", type: "vector_db" },
]

interface AgentFormProps {
  isNew: boolean
  agentId: string
}

export function AgentForm({ isNew, agentId }: AgentFormProps) {
  // If not new, find the agent data
  const existingAgent = !isNew ? mockAgents.find((a) => a.id === agentId) : null

  const [formData, setFormData] = useState({
    name: existingAgent?.name || "",
    description: existingAgent?.description || "",
    type: existingAgent?.type || "worker",
    prompt: existingAgent?.prompt || "",
    dataSources: existingAgent?.dataSources || [],
    supervisedAgents: existingAgent?.supervisedAgents || [],
  })

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    // Here you would save the agent data
    alert("Agente guardado correctamente")
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-4 md:gap-6 mb-6">
        <Card className="border-none shadow-sm">
          <CardHeader className="bg-primary/5 border-b pb-3">
            <CardTitle className="flex items-center text-lg">
              <Bot className="mr-2 h-5 w-5 text-primary" />
              Información Básica
            </CardTitle>
            <CardDescription>Configura la información básica de tu agente</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Nombre del Agente</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Ej: Agente de Atención al Cliente"
                  required
                  className="border-gray-300"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="description">Descripción</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  placeholder="Describe la función de este agente"
                  rows={3}
                  className="border-gray-300"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="type">Tipo de Agente</Label>
                <Select value={formData.type} onValueChange={(value) => handleInputChange("type", value)}>
                  <SelectTrigger id="type" className="border-gray-300">
                    <SelectValue placeholder="Selecciona el tipo de agente" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="worker">Agente Trabajador</SelectItem>
                    <SelectItem value="supervisor">Agente Supervisor</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-gray-500 mt-1">Los agentes supervisores pueden coordinar a otros agentes</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="prompt" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-gray-100 p-1 rounded-lg">
            <TabsTrigger
              value="prompt"
              className="rounded-md data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm"
            >
              Prompt
            </TabsTrigger>
            <TabsTrigger
              value="data-sources"
              className="rounded-md data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm"
            >
              Fuentes
            </TabsTrigger>
            <TabsTrigger
              value="hierarchy"
              className="rounded-md data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm"
            >
              Jerarquía
            </TabsTrigger>
          </TabsList>

          <TabsContent value="prompt" className="mt-4">
            <Card className="border-none shadow-sm">
              <CardHeader className="bg-primary/5 border-b pb-3">
                <CardTitle className="text-lg">Configuración del Prompt</CardTitle>
                <CardDescription>Define el prompt base que utilizará este agente</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <Textarea
                  value={formData.prompt}
                  onChange={(e) => handleInputChange("prompt", e.target.value)}
                  placeholder="Eres un agente que..."
                  rows={10}
                  className="font-mono border-gray-300"
                />
                <div className="flex items-center mt-4">
                  <Switch id="variables" />
                  <Label htmlFor="variables" className="ml-2">
                    Habilitar variables en el prompt
                  </Label>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="data-sources" className="mt-4">
            <Card className="border-none shadow-sm">
              <CardHeader className="bg-primary/5 border-b pb-3">
                <CardTitle className="flex items-center text-lg">
                  <Database className="mr-2 h-5 w-5 text-primary" />
                  Fuentes de Datos
                </CardTitle>
                <CardDescription>Selecciona las fuentes de datos que este agente puede utilizar</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <DataSourceSelector
                  availableSources={mockDataSources}
                  selectedSources={formData.dataSources}
                  onChange={(sources) => handleInputChange("dataSources", sources)}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="hierarchy" className="mt-4">
            <Card className="border-none shadow-sm">
              <CardHeader className="bg-primary/5 border-b pb-3">
                <CardTitle className="flex items-center text-lg">
                  <Users className="mr-2 h-5 w-5 text-primary" />
                  Jerarquía de Agentes
                </CardTitle>
                <CardDescription>
                  {formData.type === "supervisor"
                    ? "Selecciona los agentes que este supervisor coordinará"
                    : "Configura si este agente será supervisado por otros"}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                {formData.type === "supervisor" ? (
                  <AgentSelector
                    availableAgents={mockAgents.filter((a) => a.id !== agentId)}
                    selectedAgents={formData.supervisedAgents}
                    onChange={(agents) => handleInputChange("supervisedAgents", agents)}
                  />
                ) : (
                  <div className="text-center py-4 text-gray-500">
                    Este agente no es un supervisor, por lo que no puede coordinar a otros agentes.
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <div className="flex justify-end">
        <Button type="submit" className="w-full sm:w-auto bg-action hover:bg-action-hover">
          <Save className="mr-2 h-4 w-4" />
          Guardar Agente
        </Button>
      </div>
    </form>
  )
}
