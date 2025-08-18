"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Bot, ChevronDown, ChevronUp, Paperclip, Send, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar } from "@/components/ui/avatar"
import { AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface Message {
  id: string
  content: string
  sender: "user" | "agent"
  timestamp: Date
}

export function SupportChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "👋 Hola, soy tu asistente de soporte. ¿En qué puedo ayudarte hoy?",
      sender: "agent",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  const toggleChat = () => {
    setIsOpen(!isOpen)
    if (isMinimized) {
      setIsMinimized(false)
    }
  }

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized)
  }

  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    // Add user message
    // id : Generación de ejemplos para evitar errores.
    const userMessage: Message = {
      id: "1",
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMessage])
    setInputValue("")

    // Simulate agent typing
    setIsTyping(true)
    setTimeout(() => {
      setIsTyping(false)

      // Mock responses based on user input
      let responseContent = ""
      const lowerCaseInput = inputValue.toLowerCase()

      if (lowerCaseInput.includes("agente") || lowerCaseInput.includes("crear")) {
        responseContent =
          "Para crear un nuevo agente, ve a la sección 'Agentes' y haz clic en el botón 'Nuevo Agente'. Allí podrás configurar todos los detalles necesarios."
      } else if (lowerCaseInput.includes("fuente") || lowerCaseInput.includes("datos")) {
        responseContent =
          "Las fuentes de datos se pueden gestionar en la sección 'Fuentes de Datos'. Puedes añadir nuevas fuentes haciendo clic en 'Nueva Fuente de Datos'."
      } else if (lowerCaseInput.includes("error") || lowerCaseInput.includes("problema")) {
        responseContent =
          "Lamento que estés experimentando problemas. ¿Podrías proporcionar más detalles sobre el error que estás encontrando? Así podré ayudarte mejor."
      } else {
        responseContent =
          "Gracias por tu mensaje. ¿Hay algo más específico en lo que pueda ayudarte con la plataforma AgentBuilder?"
      }

      const agentMessage: Message = {
        //id: Generación de ejemplos para evitar errores.
        id: ("hola" + 1).toString(),
        content: responseContent,
        sender: "agent",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, agentMessage])
    }, 1500)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end">
      {/* Chat button */}
      <Button
        onClick={toggleChat}
        className={`rounded-full shadow-lg ${isOpen ? "bg-gray-600 hover:bg-gray-700" : "bg-action hover:bg-action-hover"}`}
        size="icon"
      >
        {isOpen ? <X className="h-5 w-5" /> : <Bot className="h-5 w-5" />}
      </Button>

      {/* Chat window */}
      {isOpen && (
        <div
          className={`mt-4 flex flex-col bg-white rounded-lg shadow-xl border border-gray-200 transition-all duration-300 ease-in-out ${
            isMinimized ? "h-14 w-80" : "h-96 w-80 sm:w-96"
          }`}
        >
          {/* Chat header */}
          <div className="flex items-center justify-between p-3 border-b bg-primary text-white rounded-t-lg">
            <div className="flex items-center">
              <Avatar className="h-8 w-8 mr-2 bg-white/20">
                <AvatarImage src="/images/logo-white.png" alt="Support" />
                <AvatarFallback className="bg-primary-foreground text-primary">AB</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-medium text-sm">Soporte AgentBuilder</h3>
                <p className="text-xs text-white/80">Estamos aquí para ayudarte</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 text-white hover:bg-primary-foreground/10"
              onClick={toggleMinimize}
            >
              {isMinimized ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
          </div>

          {/* Chat content */}
          {!isMinimized && (
            <>
              {/* Messages area */}
              <div className="flex-1 p-3 overflow-y-auto">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                    >
                      {message.sender === "agent" && (
                        <Avatar className="h-8 w-8 mr-2 mt-1">
                          <AvatarImage src="/images/logo-color.png" alt="Support" />
                          <AvatarFallback className="bg-primary/10 text-primary">AB</AvatarFallback>
                        </Avatar>
                      )}
                      <div
                        className={`max-w-[75%] p-3 rounded-lg ${
                          message.sender === "user"
                            ? "bg-action text-white rounded-br-none"
                            : "bg-gray-100 text-gray-800 rounded-bl-none"
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                        <p className="text-xs mt-1 opacity-70">
                          {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </p>
                      </div>
                      {message.sender === "user" && (
                        <Avatar className="h-8 w-8 ml-2 mt-1">
                          <AvatarFallback className="bg-gray-200 text-gray-600">TÚ</AvatarFallback>
                        </Avatar>
                      )}
                    </div>
                  ))}
                  {isTyping && (
                    <div className="flex justify-start">
                      <Avatar className="h-8 w-8 mr-2 mt-1">
                        <AvatarImage src="/images/logo-color.png" alt="Support" />
                        <AvatarFallback className="bg-primary/10 text-primary">AB</AvatarFallback>
                      </Avatar>
                      <div className="bg-gray-100 text-gray-800 p-3 rounded-lg rounded-bl-none">
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
                  <div ref={messagesEndRef} />
                </div>
              </div>

              {/* Input area */}
              <div className="p-3 border-t">
                <div className="flex items-center">
                  <Button variant="ghost" size="icon" className="text-gray-400 hover:text-gray-600">
                    <Paperclip className="h-5 w-5" />
                  </Button>
                  <Textarea
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Escribe tu mensaje..."
                    className="flex-1 resize-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 h-10 py-2"
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim()}
                    size="icon"
                    className="bg-action hover:bg-action-hover text-white ml-2"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}
