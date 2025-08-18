"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"

interface ChatBehaviorConfig {
  openOnLoad: boolean
  openDelay: number
  persistConversation: boolean
  enableAttachments: boolean
  enableVoiceInput: boolean
  enableTypingIndicator: boolean
  autoFocus: boolean
  closeOnSubmit: boolean
  enableFeedback: boolean
  enableTranscriptEmail: boolean
}

interface ChatBehaviorTabProps {
  config: ChatBehaviorConfig
  onChange: (values: Partial<ChatBehaviorConfig>) => void
}

export function ChatBehaviorTab({ config, onChange }: ChatBehaviorTabProps) {
  const handleChange = (key: keyof ChatBehaviorConfig, value: any) => {
    onChange({ [key]: value })
  }

  return (
    <div className="space-y-4">
      <Card className="border-none shadow-sm">
        <CardHeader className="bg-primary/5 border-b pb-3">
          <CardTitle className="text-lg">Comportamiento Inicial</CardTitle>
          <CardDescription>Configura cómo se comporta el chat al cargar la página</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="openOnLoad">Abrir Automáticamente</Label>
              <p className="text-sm text-gray-500">El chat se abrirá automáticamente al cargar la página</p>
            </div>
            <Switch
              id="openOnLoad"
              checked={config.openOnLoad}
              onCheckedChange={(checked) => handleChange("openOnLoad", checked)}
            />
          </div>

          {config.openOnLoad && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="openDelay">Retraso de Apertura (segundos)</Label>
                <span className="text-sm font-medium">{config.openDelay}s</span>
              </div>
              <Slider
                id="openDelay"
                min={0}
                max={30}
                step={1}
                value={[config.openDelay]}
                onValueChange={(value) => handleChange("openDelay", value[0])}
              />
            </div>
          )}

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="persistConversation">Persistir Conversación</Label>
              <p className="text-sm text-gray-500">Mantener el historial de conversación entre sesiones</p>
            </div>
            <Switch
              id="persistConversation"
              checked={config.persistConversation}
              onCheckedChange={(checked) => handleChange("persistConversation", checked)}
            />
          </div>
        </CardContent>
      </Card>

      <Card className="border-none shadow-sm">
        <CardHeader className="bg-primary/5 border-b pb-3">
          <CardTitle className="text-lg">Funcionalidades</CardTitle>
          <CardDescription>Habilita o deshabilita funcionalidades del chat</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="enableAttachments">Permitir Adjuntos</Label>
              <p className="text-sm text-gray-500">Los usuarios podrán adjuntar archivos</p>
            </div>
            <Switch
              id="enableAttachments"
              checked={config.enableAttachments}
              onCheckedChange={(checked) => handleChange("enableAttachments", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="enableVoiceInput">Entrada de Voz</Label>
              <p className="text-sm text-gray-500">Los usuarios podrán enviar mensajes por voz</p>
            </div>
            <Switch
              id="enableVoiceInput"
              checked={config.enableVoiceInput}
              onCheckedChange={(checked) => handleChange("enableVoiceInput", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="enableTypingIndicator">Indicador de Escritura</Label>
              <p className="text-sm text-gray-500">Mostrar cuando el agente está escribiendo</p>
            </div>
            <Switch
              id="enableTypingIndicator"
              checked={config.enableTypingIndicator}
              onCheckedChange={(checked) => handleChange("enableTypingIndicator", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="autoFocus">Auto-Enfoque</Label>
              <p className="text-sm text-gray-500">Enfocar automáticamente el campo de entrada al abrir el chat</p>
            </div>
            <Switch
              id="autoFocus"
              checked={config.autoFocus}
              onCheckedChange={(checked) => handleChange("autoFocus", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="closeOnSubmit">Cerrar al Enviar</Label>
              <p className="text-sm text-gray-500">Cerrar el chat después de enviar un mensaje (formularios)</p>
            </div>
            <Switch
              id="closeOnSubmit"
              checked={config.closeOnSubmit}
              onCheckedChange={(checked) => handleChange("closeOnSubmit", checked)}
            />
          </div>
        </CardContent>
      </Card>

      <Card className="border-none shadow-sm">
        <CardHeader className="bg-primary/5 border-b pb-3">
          <CardTitle className="text-lg">Feedback y Seguimiento</CardTitle>
          <CardDescription>Opciones para recopilar feedback y dar seguimiento</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="enableFeedback">Habilitar Feedback</Label>
              <p className="text-sm text-gray-500">Permitir a los usuarios calificar las respuestas</p>
            </div>
            <Switch
              id="enableFeedback"
              checked={config.enableFeedback}
              onCheckedChange={(checked) => handleChange("enableFeedback", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="enableTranscriptEmail">Envío de Transcripción</Label>
              <p className="text-sm text-gray-500">Permitir a los usuarios recibir la conversación por email</p>
            </div>
            <Switch
              id="enableTranscriptEmail"
              checked={config.enableTranscriptEmail}
              onCheckedChange={(checked) => handleChange("enableTranscriptEmail", checked)}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
