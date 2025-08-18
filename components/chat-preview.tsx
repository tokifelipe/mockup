"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Bot, MessageCircle, Paperclip, Send, X } from "lucide-react"

interface ChatPreviewProps {
  config: any
}

export function ChatPreview({ config }: ChatPreviewProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<{ text: string; sender: "user" | "agent"; timestamp: Date }[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)

  // Al inicio del componente, después de la declaración de estados:
  const isNewConfig = !config.id || config.id === "nuevo"
  const configName = config.name || "Nueva Configuración"

  // Simular mensaje de bienvenida al abrir el chat
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          text: config.messages.welcomeMessage,
          sender: "agent",
          timestamp: new Date(),
        },
      ])
    }
  }, [isOpen, messages.length, config.messages.welcomeMessage])

  // Simular respuesta del agente
  const simulateAgentResponse = () => {
    setIsTyping(true)
    setTimeout(() => {
      setIsTyping(false)
      setMessages((prev) => [
        ...prev,
        {
          text: "Gracias por tu mensaje. ¿En qué más puedo ayudarte?",
          sender: "agent",
          timestamp: new Date(),
        },
      ])
    }, 1500)
  }

  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    // Añadir mensaje del usuario
    setMessages((prev) => [
      ...prev,
      {
        text: inputValue,
        sender: "user",
        timestamp: new Date(),
      },
    ])
    setInputValue("")

    // Simular respuesta del agente
    simulateAgentResponse()
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  // Determinar el tamaño de la ventana de chat
  const getChatWindowSize = () => {
    switch (config.appearance.chatWindowSize) {
      case "small":
        return "w-[300px] h-[400px]"
      case "medium":
        return "w-[350px] h-[500px]"
      case "large":
        return "w-[400px] h-[600px]"
      case "full":
        return "w-full h-full"
      default:
        return "w-[350px] h-[500px]"
    }
  }

  // Determinar el radio de bordes
  const getBorderRadius = () => {
    switch (config.appearance.borderRadius) {
      case "none":
        return "rounded-none"
      case "small":
        return "rounded-md"
      case "medium":
        return "rounded-lg"
      case "large":
        return "rounded-xl"
      case "full":
        return "rounded-full"
      default:
        return "rounded-lg"
    }
  }

  return (
    <div className="relative h-full bg-gray-100 flex items-end justify-end p-4">
      {/* Botón de chat */}
      {!isOpen && (
        <button
          className={`${getBorderRadius()} w-14 h-14 flex items-center justify-center shadow-lg`}
          style={{ backgroundColor: config.appearance.primaryColor }}
          onClick={() => setIsOpen(true)}
        >
          <MessageCircle className="text-white h-6 w-6" />
        </button>
      )}

      {/* Ventana de chat */}
      {isOpen && (
        <div
          className={`${getChatWindowSize()} flex flex-col bg-white shadow-xl ${
            config.appearance.chatWindowSize === "full" ? "fixed inset-0 z-50" : "relative"
          }`}
          style={{
            borderRadius: config.appearance.chatWindowSize === "full" ? "0" : "0.5rem",
            fontFamily: config.appearance.fontFamily,
          }}
        >
          {/* Encabezado */}
          <div
            className="flex items-center justify-between p-4 border-b relative"
            style={{ backgroundColor: config.appearance.primaryColor }}
          >
            <div className="flex items-center">
              {config.appearance.chatWindowLogo && (
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center mr-3">
                  <Bot className="text-white h-5 w-5" />
                </div>
              )}
              <div>
                <h3 className="font-medium text-white">{config.appearance.chatWindowTitle || configName}</h3>
                {config.appearance.chatWindowSubtitle && (
                  <p className="text-xs text-white/80">{config.appearance.chatWindowSubtitle}</p>
                )}
              </div>
            </div>
            <button className="text-white/80 hover:text-white" onClick={() => setIsOpen(false)}>
              <X className="h-5 w-5" />
            </button>
            {isNewConfig && (
              <div className="absolute top-0 right-0 bg-yellow-400 text-yellow-800 text-xs px-2 py-1 rounded-bl-md">
                Nueva
              </div>
            )}
          </div>

          {/* Área de mensajes */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div key={index} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                {message.sender === "agent" && config.appearance.showAgentAvatar && (
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center mr-2"
                    style={{ backgroundColor: config.appearance.primaryColor + "20" }}
                  >
                    <Bot className="h-4 w-4" style={{ color: config.appearance.primaryColor }} />
                  </div>
                )}
                <div
                  className={`max-w-[70%] p-3 ${
                    message.sender === "user"
                      ? "bg-blue-500 text-white rounded-t-lg rounded-bl-lg"
                      : "bg-gray-100 text-gray-800 rounded-t-lg rounded-br-lg"
                  }`}
                  style={{
                    backgroundColor: message.sender === "user" ? config.appearance.primaryColor : "#f3f4f6",
                  }}
                >
                  <p className={message.sender === "user" ? "text-white" : "text-gray-800"}>{message.text}</p>
                </div>
                {message.sender === "user" && config.appearance.showUserAvatar && (
                  <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center ml-2">
                    <span className="text-xs font-medium text-gray-600">TÚ</span>
                  </div>
                )}
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center mr-2"
                  style={{ backgroundColor: config.appearance.primaryColor + "20" }}
                >
                  <Bot className="h-4 w-4" style={{ color: config.appearance.primaryColor }} />
                </div>
                <div className="bg-gray-100 text-gray-800 p-3 rounded-t-lg rounded-br-lg">
                  <div className="flex space-x-1">
                    <div
                      className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    ></div>
                    <div
                      className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    ></div>
                    <div
                      className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Área de entrada */}
          <div className="border-t p-4">
            <div className="flex items-center">
              {config.behavior.enableAttachments && (
                <button className="p-2 text-gray-500 hover:text-gray-700">
                  <Paperclip className="h-5 w-5" />
                </button>
              )}
              <input
                type="text"
                className="flex-1 border rounded-l-lg py-2 px-3 focus:outline-none"
                placeholder={config.messages.inputPlaceholder}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <button
                className="rounded-r-lg py-2 px-4 text-white"
                style={{ backgroundColor: config.appearance.primaryColor }}
                onClick={handleSendMessage}
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
