"use client"

import type React from "react"

import { useState } from "react"
import { Database, Globe, Save } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"

// Mock data para fuentes de datos existentes
const mockDataSources = {
  "1": {
    id: "1",
    name: "Base de Conocimiento Principal",
    type: "vector_db",
    description: "Documentación general de la empresa",
    status: "active",
    config: {
      url: "https://example.com/vector-db",
      apiKey: "sk-123456789",
      collection: "main-docs",
    },
  },
  "2": {
    id: "2",
    name: "CRM",
    type: "api",
    description: "API de acceso al sistema CRM",
    status: "active",
    config: {
      url: "https://api.crm.example.com",
      apiKey: "api-key-123",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer api-key-123",
      },
    },
  },
  "3": {
    id: "3",
    name: "Data Warehouse",
    type: "sql",
    description: "Base de datos analítica",
    status: "active",
    config: {
      host: "db.example.com",
      port: "5432",
      database: "analytics",
      username: "analyst",
      password: "********",
    },
  },
}

interface DataSourceFormProps {
  isNew: boolean
  dataSourceId: string
}

export function DataSourceForm({ isNew, dataSourceId }: DataSourceFormProps) {
  // Cargar configuración existente o usar la inicial
  const existingDataSource = !isNew && mockDataSources[dataSourceId as keyof typeof mockDataSources]

  const [formData, setFormData] = useState(
    existingDataSource || {
      id: isNew ? "nuevo" : dataSourceId,
      name: "",
      type: "vector_db",
      description: "",
      status: "active",
      config: {
        url: "",
        apiKey: "",
        collection: "",
      },
    },
  )

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleConfigChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      config: {
        ...prev.config,
        [field]: value,
      },
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    // Aquí iría la lógica para guardar la fuente de datos
    alert(isNew ? "Fuente de datos creada correctamente" : "Fuente de datos actualizada correctamente")
  }

  // Renderizar campos de configuración según el tipo de fuente de datos
  const renderConfigFields = () => {
    switch (formData.type) {
      case "vector_db":
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="url">URL de la Base de Conocimiento</Label>
              <Input
                id="url"
                value={formData.config.url || ""}
                onChange={(e) => handleConfigChange("url", e.target.value)}
                placeholder="https://example.com/vector-db"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="apiKey">API Key</Label>
              <Input
                id="apiKey"
                type="password"
                value={formData.config.apiKey || ""}
                onChange={(e) => handleConfigChange("apiKey", e.target.value)}
                placeholder="sk-..."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="collection">Colección</Label>
              <Input
                id="collection"
                value={formData.config.collection || ""}
                onChange={(e) => handleConfigChange("collection", e.target.value)}
                placeholder="main-docs"
              />
            </div>
          </>
        )
      case "api":
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="url">URL de la API</Label>
              <Input
                id="url"
                value={formData.config.url || ""}
                onChange={(e) => handleConfigChange("url", e.target.value)}
                placeholder="https://api.example.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="apiKey">API Key</Label>
              <Input
                id="apiKey"
                type="password"
                value={formData.config.apiKey || ""}
                onChange={(e) => handleConfigChange("apiKey", e.target.value)}
                placeholder="api-key-123"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="headers">Headers (JSON)</Label>
              <Textarea
                id="headers"
                value={formData.config.headers ? JSON.stringify(formData.config.headers, null, 2) : ""}
                onChange={(e) => {
                  try {
                    const headers = JSON.parse(e.target.value)
                    handleConfigChange("headers", headers)
                  } catch (error) {
                    // Si no es un JSON válido, guardar como texto
                    handleConfigChange("headers", e.target.value)
                  }
                }}
                placeholder='{"Content-Type": "application/json", "Authorization": "Bearer api-key-123"}'
                rows={5}
              />
            </div>
          </>
        )
      case "sql":
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="host">Host</Label>
              <Input
                id="host"
                value={formData.config.host || ""}
                onChange={(e) => handleConfigChange("host", e.target.value)}
                placeholder="db.example.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="port">Puerto</Label>
              <Input
                id="port"
                value={formData.config.port || ""}
                onChange={(e) => handleConfigChange("port", e.target.value)}
                placeholder="5432"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="database">Base de Datos</Label>
              <Input
                id="database"
                value={formData.config.database || ""}
                onChange={(e) => handleConfigChange("database", e.target.value)}
                placeholder="analytics"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="username">Usuario</Label>
              <Input
                id="username"
                value={formData.config.username || ""}
                onChange={(e) => handleConfigChange("username", e.target.value)}
                placeholder="usuario"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                type="password"
                value={formData.config.password || ""}
                onChange={(e) => handleConfigChange("password", e.target.value)}
                placeholder="********"
              />
            </div>
          </>
        )
      default:
        return null
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-4 md:gap-6 mb-6">
        <Card className="border-none shadow-sm">
          <CardHeader className="bg-primary/5 border-b pb-3">
            <CardTitle className="flex items-center text-lg">
              <Database className="mr-2 h-5 w-5 text-primary" />
              Información Básica
            </CardTitle>
            <CardDescription>Configura la información básica de tu fuente de datos</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Nombre de la Fuente de Datos</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Ej: Base de Conocimiento, CRM, API Externa"
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
                  placeholder="Describe la función de esta fuente de datos"
                  rows={3}
                  className="border-gray-300"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="type">Tipo de Fuente de Datos</Label>
                <Select value={formData.type} onValueChange={(value) => handleInputChange("type", value)}>
                  <SelectTrigger id="type" className="border-gray-300">
                    <SelectValue placeholder="Selecciona el tipo de fuente de datos" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="vector_db">Base de Conocimiento</SelectItem>
                    <SelectItem value="api">API</SelectItem>
                    <SelectItem value="sql">Base de Datos SQL</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-gray-500 mt-1">
                  El tipo de fuente de datos determina cómo los agentes interactuarán con ella
                </p>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="status">Estado</Label>
                  <p className="text-sm text-gray-500">Activa o desactiva esta fuente de datos</p>
                </div>
                <Switch
                  id="status"
                  checked={formData.status === "active"}
                  onCheckedChange={(checked) => handleInputChange("status", checked ? "active" : "inactive")}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm">
          <CardHeader className="bg-primary/5 border-b pb-3">
            <CardTitle className="flex items-center text-lg">
              <Globe className="mr-2 h-5 w-5 text-primary" />
              Configuración de Conexión
            </CardTitle>
            <CardDescription>Configura los parámetros de conexión a la fuente de datos</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid gap-4">{renderConfigFields()}</div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end">
        <Button type="submit" className="w-full sm:w-auto bg-action hover:bg-action-hover">
          <Save className="mr-2 h-4 w-4" />
          {isNew ? "Crear Fuente de Datos" : "Guardar Cambios"}
        </Button>
      </div>
    </form>
  )
}
