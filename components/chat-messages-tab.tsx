"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

interface ChatMessagesConfig {
  welcomeMessage: string
  placeholderText: string
  offlineMessage: string
  inputPlaceholder: string
  sendButtonText: string
  thankYouMessage: string
  agentIsTypingText: string
}

interface ChatMessagesTabProps {
  config: ChatMessagesConfig
  onChange: (values: Partial<ChatMessagesConfig>) => void
}

export function ChatMessagesTab({ config, onChange }: ChatMessagesTabProps) {
  const handleChange = (key: keyof ChatMessagesConfig, value: string) => {
    onChange({ [key]: value })
  }

  return (
    <div className="space-y-4">
      <Card className="border-none shadow-sm">
        <CardHeader className="bg-primary/5 border-b pb-3">
          <CardTitle className="text-lg">Mensajes del Sistema</CardTitle>
          <CardDescription>Personaliza los mensajes que el sistema muestra a los usuarios</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="welcomeMessage">Mensaje de Bienvenida</Label>
            <Textarea
              id="welcomeMessage"
              value={config.welcomeMessage}
              onChange={(e) => handleChange("welcomeMessage", e.target.value)}
              placeholder="¡Hola! ¿En qué puedo ayudarte hoy?"
              rows={3}
            />
            <p className="text-xs text-gray-500">
              Este mensaje se muestra cuando el usuario abre el chat por primera vez.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="offlineMessage">Mensaje Fuera de Línea</Label>
            <Textarea
              id="offlineMessage"
              value={config.offlineMessage}
              onChange={(e) => handleChange("offlineMessage", e.target.value)}
              placeholder="Actualmente estamos fuera de línea. Por favor, déjanos un mensaje y te responderemos lo antes posible."
              rows={3}
            />
            <p className="text-xs text-gray-500">Este mensaje se muestra cuando no hay agentes disponibles.</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="inputPlaceholder">Placeholder del Campo de Entrada</Label>
            <Input
              id="inputPlaceholder"
              value={config.inputPlaceholder}
              onChange={(e) => handleChange("inputPlaceholder", e.target.value)}
              placeholder="Escribe tu mensaje..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="sendButtonText">Texto del Botón de Envío</Label>
            <Input
              id="sendButtonText"
              value={config.sendButtonText}
              onChange={(e) => handleChange("sendButtonText", e.target.value)}
              placeholder="Enviar"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="thankYouMessage">Mensaje de Agradecimiento</Label>
            <Textarea
              id="thankYouMessage"
              value={config.thankYouMessage}
              onChange={(e) => handleChange("thankYouMessage", e.target.value)}
              placeholder="Gracias por tu mensaje. Te responderemos lo antes posible."
              rows={3}
            />
            <p className="text-xs text-gray-500">
              Este mensaje se muestra después de que el usuario envía un mensaje cuando no hay agentes disponibles.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="agentIsTypingText">Texto de "Agente Escribiendo"</Label>
            <Input
              id="agentIsTypingText"
              value={config.agentIsTypingText}
              onChange={(e) => handleChange("agentIsTypingText", e.target.value)}
              placeholder="El agente está escribiendo..."
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
