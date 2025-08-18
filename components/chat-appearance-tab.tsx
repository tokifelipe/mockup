"use client"

import { useState } from "react"
import { Laptop, Monitor, Smartphone } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface ChatAppearanceConfig {
  primaryColor: string
  secondaryColor: string
  chatButtonPosition: string
  chatButtonIcon: string
  chatWindowSize: string
  chatWindowTitle: string
  chatWindowLogo: boolean
  chatWindowSubtitle: string
  fontFamily: string
  borderRadius: string
  showAgentAvatar: boolean
  showUserAvatar: boolean
}

interface ChatAppearanceTabProps {
  config: ChatAppearanceConfig
  onChange: (values: Partial<ChatAppearanceConfig>) => void
}

export function ChatAppearanceTab({ config, onChange }: ChatAppearanceTabProps) {
  const [activeDevice, setActiveDevice] = useState("desktop")

  const handleChange = (key: keyof ChatAppearanceConfig, value: any) => {
    onChange({ [key]: value })
  }

  return (
    <div className="space-y-4">
      <Card className="border-none shadow-sm">
        <CardHeader className="bg-primary/5 border-b pb-3">
          <CardTitle className="text-lg">Colores y Marca</CardTitle>
          <CardDescription>Personaliza los colores y elementos de marca del chat</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="primaryColor">Color Primario</Label>
              <div className="flex gap-2">
                <div
                  className="w-10 h-10 rounded-md border cursor-pointer"
                  style={{ backgroundColor: config.primaryColor }}
                />
                <Input
                  id="primaryColor"
                  type="text"
                  value={config.primaryColor}
                  onChange={(e) => handleChange("primaryColor", e.target.value)}
                  className="flex-1"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="secondaryColor">Color Secundario</Label>
              <div className="flex gap-2">
                <div
                  className="w-10 h-10 rounded-md border cursor-pointer"
                  style={{ backgroundColor: config.secondaryColor }}
                />
                <Input
                  id="secondaryColor"
                  type="text"
                  value={config.secondaryColor}
                  onChange={(e) => handleChange("secondaryColor", e.target.value)}
                  className="flex-1"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="chatWindowTitle">Título del Chat</Label>
            <Input
              id="chatWindowTitle"
              value={config.chatWindowTitle}
              onChange={(e) => handleChange("chatWindowTitle", e.target.value)}
              placeholder="Asistente Virtual"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="chatWindowSubtitle">Subtítulo del Chat</Label>
            <Input
              id="chatWindowSubtitle"
              value={config.chatWindowSubtitle}
              onChange={(e) => handleChange("chatWindowSubtitle", e.target.value)}
              placeholder="¿En qué puedo ayudarte hoy?"
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="chatWindowLogo">Mostrar Logo</Label>
            <Switch
              id="chatWindowLogo"
              checked={config.chatWindowLogo}
              onCheckedChange={(checked) => handleChange("chatWindowLogo", checked)}
            />
          </div>
        </CardContent>
      </Card>

      <Card className="border-none shadow-sm">
        <CardHeader className="bg-primary/5 border-b pb-3">
          <CardTitle className="text-lg">Posición y Tamaño</CardTitle>
          <CardDescription>Configura la posición y tamaño del widget de chat</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="chatButtonPosition">Posición del Botón de Chat</Label>
            <Select
              value={config.chatButtonPosition}
              onValueChange={(value) => handleChange("chatButtonPosition", value)}
            >
              <SelectTrigger id="chatButtonPosition">
                <SelectValue placeholder="Selecciona una posición" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="left">Izquierda</SelectItem>
                <SelectItem value="right">Derecha</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="chatButtonIcon">Icono del Botón de Chat</Label>
            <Select value={config.chatButtonIcon} onValueChange={(value) => handleChange("chatButtonIcon", value)}>
              <SelectTrigger id="chatButtonIcon">
                <SelectValue placeholder="Selecciona un icono" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="message-circle">Mensaje Circular</SelectItem>
                <SelectItem value="message-square">Mensaje Cuadrado</SelectItem>
                <SelectItem value="help-circle">Ayuda</SelectItem>
                <SelectItem value="bot">Bot</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="chatWindowSize">Tamaño de la Ventana de Chat</Label>
            <Tabs value={activeDevice} onValueChange={setActiveDevice} className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-2">
                <TabsTrigger value="mobile">
                  <Smartphone className="h-4 w-4 mr-2" />
                  Móvil
                </TabsTrigger>
                <TabsTrigger value="tablet">
                  <Laptop className="h-4 w-4 mr-2" />
                  Tablet
                </TabsTrigger>
                <TabsTrigger value="desktop">
                  <Monitor className="h-4 w-4 mr-2" />
                  Escritorio
                </TabsTrigger>
              </TabsList>
            </Tabs>
            <Select value={config.chatWindowSize} onValueChange={(value) => handleChange("chatWindowSize", value)}>
              <SelectTrigger id="chatWindowSize">
                <SelectValue placeholder="Selecciona un tamaño" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="small">Pequeño</SelectItem>
                <SelectItem value="medium">Mediano</SelectItem>
                <SelectItem value="large">Grande</SelectItem>
                <SelectItem value="full">Pantalla Completa (Móvil)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card className="border-none shadow-sm">
        <CardHeader className="bg-primary/5 border-b pb-3">
          <CardTitle className="text-lg">Estilo Visual</CardTitle>
          <CardDescription>Personaliza el estilo visual del chat</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fontFamily">Fuente</Label>
            <Select value={config.fontFamily} onValueChange={(value) => handleChange("fontFamily", value)}>
              <SelectTrigger id="fontFamily">
                <SelectValue placeholder="Selecciona una fuente" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Inter">Inter</SelectItem>
                <SelectItem value="Roboto">Roboto</SelectItem>
                <SelectItem value="Open Sans">Open Sans</SelectItem>
                <SelectItem value="Lato">Lato</SelectItem>
                <SelectItem value="Montserrat">Montserrat</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="borderRadius">Radio de Bordes</Label>
            <Select value={config.borderRadius} onValueChange={(value) => handleChange("borderRadius", value)}>
              <SelectTrigger id="borderRadius">
                <SelectValue placeholder="Selecciona un radio de bordes" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">Sin bordes</SelectItem>
                <SelectItem value="small">Pequeño</SelectItem>
                <SelectItem value="medium">Mediano</SelectItem>
                <SelectItem value="large">Grande</SelectItem>
                <SelectItem value="full">Completo (Circular)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="showAgentAvatar">Mostrar Avatar del Agente</Label>
            <Switch
              id="showAgentAvatar"
              checked={config.showAgentAvatar}
              onCheckedChange={(checked) => handleChange("showAgentAvatar", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="showUserAvatar">Mostrar Avatar del Usuario</Label>
            <Switch
              id="showUserAvatar"
              checked={config.showUserAvatar}
              onCheckedChange={(checked) => handleChange("showUserAvatar", checked)}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
