"use client"

import { useState } from "react"
import { Bot, Code, Globe, Palette, Settings } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChatAppearanceTab } from "@/components/chat-appearance-tab"
import { ChatBehaviorTab } from "@/components/chat-behavior-tab"
import { ChatMessagesTab } from "@/components/chat-messages-tab"
import { ChatCodeTab } from "@/components/chat-code-tab"
import { ChatPreview } from "@/components/chat-preview"
import { ChatInfoTab } from "@/components/chat-info-tab"

// Mock data para configuraciones existentes
const mockChatConfigs = {
  "1": {
    id: "1",
    name: "Chat Principal",
    description: "Configuración para el sitio web principal",
    agent: "2", // ID del agente
    sites: ["www.ejemplo.com"],
    status: "active",
    appearance: {
      primaryColor: "#1A8FB4",
      secondaryColor: "#0F5A73",
      chatButtonPosition: "right",
      chatButtonIcon: "message-circle",
      chatWindowSize: "medium",
      chatWindowTitle: "Asistente Virtual",
      chatWindowLogo: true,
      chatWindowSubtitle: "¿En qué puedo ayudarte hoy?",
      fontFamily: "Inter",
      borderRadius: "medium",
      showAgentAvatar: true,
      showUserAvatar: true,
    },
    behavior: {
      openOnLoad: false,
      openDelay: 5,
      persistConversation: true,
      enableAttachments: true,
      enableVoiceInput: false,
      enableTypingIndicator: true,
      autoFocus: true,
      closeOnSubmit: false,
      enableFeedback: true,
      enableTranscriptEmail: true,
    },
    messages: {
      welcomeMessage: "👋 ¡Hola! Soy tu asistente virtual. ¿En qué puedo ayudarte hoy?",
      placeholderText: "Escribe tu mensaje aquí...",
      offlineMessage:
        "Actualmente estamos fuera de línea. Por favor, déjanos un mensaje y te responderemos lo antes posible.",
      inputPlaceholder: "Escribe tu mensaje...",
      sendButtonText: "Enviar",
      thankYouMessage: "Gracias por tu mensaje. Te responderemos lo antes posible.",
      agentIsTypingText: "El agente está escribiendo...",
    },
  },
  "2": {
    id: "2",
    name: "Chat de Soporte Técnico",
    description: "Configuración para la sección de soporte",
    agent: "4", // ID del agente
    sites: ["soporte.ejemplo.com"],
    status: "active",
    appearance: {
      primaryColor: "#4F46E5",
      secondaryColor: "#3730A3",
      chatButtonPosition: "left",
      chatButtonIcon: "help-circle",
      chatWindowSize: "large",
      chatWindowTitle: "Soporte Técnico",
      chatWindowLogo: true,
      chatWindowSubtitle: "¿Cómo podemos ayudarte?",
      fontFamily: "Roboto",
      borderRadius: "large",
      showAgentAvatar: true,
      showUserAvatar: false,
    },
    behavior: {
      openOnLoad: false,
      openDelay: 0,
      persistConversation: true,
      enableAttachments: true,
      enableVoiceInput: true,
      enableTypingIndicator: true,
      autoFocus: true,
      closeOnSubmit: false,
      enableFeedback: true,
      enableTranscriptEmail: true,
    },
    messages: {
      welcomeMessage:
        "¡Bienvenido al soporte técnico! Estoy aquí para ayudarte con cualquier problema técnico que puedas tener.",
      placeholderText: "Describe tu problema técnico...",
      offlineMessage:
        "Nuestro equipo de soporte no está disponible en este momento. Por favor, describe tu problema y te contactaremos lo antes posible.",
      inputPlaceholder: "Escribe tu consulta técnica...",
      sendButtonText: "Enviar",
      thankYouMessage: "Gracias por contactar con soporte técnico. Un especialista revisará tu caso pronto.",
      agentIsTypingText: "El técnico está escribiendo...",
    },
  },
}

// Configuración inicial para nuevos chats
const initialConfig = {
  name: "",
  description: "",
  agent: "",
  sites: [],
  status: "active",
  appearance: {
    primaryColor: "#1A8FB4",
    secondaryColor: "#0F5A73",
    chatButtonPosition: "right",
    chatButtonIcon: "message-circle",
    chatWindowSize: "medium",
    chatWindowTitle: "Asistente Virtual",
    chatWindowLogo: true,
    chatWindowSubtitle: "¿En qué puedo ayudarte hoy?",
    fontFamily: "Inter",
    borderRadius: "medium",
    showAgentAvatar: true,
    showUserAvatar: true,
  },
  behavior: {
    openOnLoad: false,
    openDelay: 5,
    persistConversation: true,
    enableAttachments: true,
    enableVoiceInput: false,
    enableTypingIndicator: true,
    autoFocus: true,
    closeOnSubmit: false,
    enableFeedback: true,
    enableTranscriptEmail: true,
  },
  messages: {
    welcomeMessage: "👋 ¡Hola! Soy tu asistente virtual. ¿En qué puedo ayudarte hoy?",
    placeholderText: "Escribe tu mensaje aquí...",
    offlineMessage:
      "Actualmente estamos fuera de línea. Por favor, déjanos un mensaje y te responderemos lo antes posible.",
    inputPlaceholder: "Escribe tu mensaje...",
    sendButtonText: "Enviar",
    thankYouMessage: "Gracias por tu mensaje. Te responderemos lo antes posible.",
    agentIsTypingText: "El agente está escribiendo...",
  },
}

interface ChatConfigFormProps {
  isNew: boolean
  configId: string
}

export function ChatConfigForm({ isNew, configId }: ChatConfigFormProps) {
  // Modificar la parte donde se inicializa el estado para manejar mejor el caso de una nueva configuración

  // Cargar configuración existente o usar la inicial
  const existingConfig = !isNew && mockChatConfigs[configId as keyof typeof mockChatConfigs]
  const [config, setConfig] = useState(
    existingConfig || {
      ...initialConfig,
      id: isNew ? "nuevo" : configId,
    },
  )

  const updateConfig = (section: string, values: any) => {
    setConfig((prev) => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        ...values,
      },
    }))
  }

  const updateBasicInfo = (values: any) => {
    setConfig((prev) => ({
      ...prev,
      ...values,
    }))
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <Tabs defaultValue="info" className="w-full">
          <TabsList className="grid w-full grid-cols-5 bg-gray-100 p-1 rounded-lg">
            <TabsTrigger
              value="info"
              className="rounded-md data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm"
            >
              <Globe className="h-4 w-4 mr-2" />
              General
            </TabsTrigger>
            <TabsTrigger
              value="appearance"
              className="rounded-md data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm"
            >
              <Palette className="h-4 w-4 mr-2" />
              Apariencia
            </TabsTrigger>
            <TabsTrigger
              value="behavior"
              className="rounded-md data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm"
            >
              <Settings className="h-4 w-4 mr-2" />
              Comportamiento
            </TabsTrigger>
            <TabsTrigger
              value="messages"
              className="rounded-md data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm"
            >
              <Bot className="h-4 w-4 mr-2" />
              Mensajes
            </TabsTrigger>
            <TabsTrigger
              value="code"
              className="rounded-md data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm"
            >
              <Code className="h-4 w-4 mr-2" />
              Código
            </TabsTrigger>
          </TabsList>

          <TabsContent value="info" className="mt-4">
            <ChatInfoTab config={config} onChange={updateBasicInfo} />
          </TabsContent>

          <TabsContent value="appearance" className="mt-4">
            <ChatAppearanceTab config={config.appearance} onChange={(values) => updateConfig("appearance", values)} />
          </TabsContent>

          <TabsContent value="behavior" className="mt-4">
            <ChatBehaviorTab config={config.behavior} onChange={(values) => updateConfig("behavior", values)} />
          </TabsContent>

          <TabsContent value="messages" className="mt-4">
            <ChatMessagesTab config={config.messages} onChange={(values) => updateConfig("messages", values)} />
          </TabsContent>

          <TabsContent value="code" className="mt-4">
            <ChatCodeTab config={config} />
          </TabsContent>
        </Tabs>
      </div>

      <div className="lg:col-span-1">
        <Card className="sticky top-4">
          <CardHeader className="bg-primary/5 border-b pb-3">
            <CardTitle className="text-lg">Vista Previa</CardTitle>
            <CardDescription>Visualiza cómo se verá el chat para tus usuarios</CardDescription>
          </CardHeader>
          <CardContent className="p-0 h-[600px] overflow-hidden">
            <ChatPreview config={config} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
