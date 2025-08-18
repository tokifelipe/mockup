"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { Bot } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

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

export function AgentHierarchy() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null)
  const [zoom, setZoom] = useState(1)
  const [canvasWidth, setCanvasWidth] = useState(1000)

  // Calculate positions for the hierarchy visualization
  const calculatePositions = () => {
    const positions: Record<string, { x: number; y: number; width: number; height: number }> = {}

    // Find root agents (not supervised by anyone)
    const rootAgents = mockAgents.filter((agent) => !mockAgents.some((a) => a.supervisedAgents.includes(agent.id)))

    // Position root agents at the top
    const rootWidth = 180
    const rootSpacing = 250
    const rootStartX = ((rootAgents.length - 1) * rootSpacing) / 2

    rootAgents.forEach((agent, index) => {
      positions[agent.id] = {
        x: rootStartX - index * rootSpacing,
        y: 50,
        width: rootWidth,
        height: 80,
      }
    })

    // Position supervised agents recursively
    const positionChildren = (parentId: string, level: number) => {
      const parent = mockAgents.find((a) => a.id === parentId)
      if (!parent || !parent.supervisedAgents.length) return

      const children = parent.supervisedAgents
      const childWidth = 160
      const childSpacing = 200
      const childStartX = ((children.length - 1) * childSpacing) / 2

      children.forEach((childId, index) => {
        positions[childId] = {
          x: positions[parentId].x - childStartX + index * childSpacing,
          y: positions[parentId].y + 150,
          width: childWidth,
          height: 70,
        }

        // Position this child's children
        positionChildren(childId, level + 1)
      })
    }

    // Position all children starting from root agents
    rootAgents.forEach((agent) => positionChildren(agent.id, 1))

    return positions
  }

  // Draw the hierarchy on canvas
  const drawHierarchy = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Calculate positions
    const positions = calculatePositions()

    // Set canvas dimensions based on positions
    const maxX = Math.max(...Object.values(positions).map((p) => Math.abs(p.x) + p.width))
    const maxY = Math.max(...Object.values(positions).map((p) => p.y + p.height))

    canvas.width = canvasWidth
    canvas.height = (maxY + 100) * zoom

    // Apply zoom
    ctx.scale(zoom, zoom)

    // Center the drawing
    ctx.translate(canvas.width / (2 * zoom), 0)

    // Draw connections first (so they appear behind the nodes)
    ctx.strokeStyle = "#d1d5db"
    ctx.lineWidth = 2

    mockAgents.forEach((agent) => {
      if (agent.supervisedAgents.length) {
        const parentPos = positions[agent.id]

        agent.supervisedAgents.forEach((childId) => {
          const childPos = positions[childId]

          if (parentPos && childPos) {
            ctx.beginPath()
            ctx.moveTo(parentPos.x, parentPos.y + parentPos.height)
            ctx.lineTo(parentPos.x, parentPos.y + parentPos.height + 30)
            ctx.lineTo(childPos.x, parentPos.y + parentPos.height + 30)
            ctx.lineTo(childPos.x, childPos.y)
            ctx.stroke()
          }
        })
      }
    })

    // Draw agent nodes
    mockAgents.forEach((agent) => {
      const pos = positions[agent.id]
      if (!pos) return

      // Draw node
      ctx.fillStyle = agent.type === "supervisor" ? "#e6f7fb" : "#f9fafb"
      ctx.strokeStyle = selectedAgent === agent.id ? "#1A8FB4" : agent.type === "supervisor" ? "#93c5fd" : "#e5e7eb"
      ctx.lineWidth = selectedAgent === agent.id ? 3 : 2

      // Rounded rectangle
      const radius = 8
      ctx.beginPath()
      ctx.moveTo(pos.x - pos.width / 2 + radius, pos.y)
      ctx.lineTo(pos.x + pos.width / 2 - radius, pos.y)
      ctx.quadraticCurveTo(pos.x + pos.width / 2, pos.y, pos.x + pos.width / 2, pos.y + radius)
      ctx.lineTo(pos.x + pos.width / 2, pos.y + pos.height - radius)
      ctx.quadraticCurveTo(
        pos.x + pos.width / 2,
        pos.y + pos.height,
        pos.x + pos.width / 2 - radius,
        pos.y + pos.height,
      )
      ctx.lineTo(pos.x - pos.width / 2 + radius, pos.y + pos.height)
      ctx.quadraticCurveTo(
        pos.x - pos.width / 2,
        pos.y + pos.height,
        pos.x - pos.width / 2,
        pos.y + pos.height - radius,
      )
      ctx.lineTo(pos.x - pos.width / 2, pos.y + radius)
      ctx.quadraticCurveTo(pos.x - pos.width / 2, pos.y, pos.x - pos.width / 2 + radius, pos.y)
      ctx.closePath()

      ctx.fill()
      ctx.stroke()

      // Draw text
      ctx.fillStyle = "#1f2937"
      ctx.font = "14px sans-serif"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"

      // Truncate text if too long
      let name = agent.name
      if (ctx.measureText(name).width > pos.width - 20) {
        name = name.substring(0, 15) + "..."
      }

      ctx.fillText(name, pos.x, pos.y + pos.height / 2 - 10)

      // Draw agent type
      ctx.fillStyle = "#6b7280"
      ctx.font = "12px sans-serif"
      ctx.fillText(agent.type === "supervisor" ? "Supervisor" : "Trabajador", pos.x, pos.y + pos.height / 2 + 10)
    })
  }

  // Handle canvas click to select an agent
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = (e.clientX - rect.left) / zoom - canvas.width / (2 * zoom)
    const y = (e.clientY - rect.top) / zoom

    const positions = calculatePositions()

    // Check if click is on an agent
    for (const [id, pos] of Object.entries(positions)) {
      if (x >= pos.x - pos.width / 2 && x <= pos.x + pos.width / 2 && y >= pos.y && y <= pos.y + pos.height) {
        setSelectedAgent(id)
        return
      }
    }

    // If click is not on any agent, deselect
    setSelectedAgent(null)
  }

  // Zoom controls
  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.1, 2))
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.1, 0.5))
  const handleResetZoom = () => setZoom(1)

  // Update canvas width on window resize
  useEffect(() => {
    const updateCanvasWidth = () => {
      const container = canvasRef.current?.parentElement
      if (container) {
        setCanvasWidth(container.clientWidth - 32) // Subtract padding
      }
    }

    updateCanvasWidth()
    window.addEventListener("resize", updateCanvasWidth)

    return () => {
      window.removeEventListener("resize", updateCanvasWidth)
    }
  }, [])

  // Draw on mount and when dependencies change
  useEffect(() => {
    drawHierarchy()
  }, [zoom, selectedAgent, canvasWidth])

  return (
    <div className="flex flex-col items-center">
      <div className="flex justify-center space-x-2 mb-4">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="sm" onClick={handleZoomOut} className="border-gray-300">
                -
              </Button>
            </TooltipTrigger>
            <TooltipContent>Reducir zoom</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="sm" onClick={handleResetZoom} className="border-gray-300">
                100%
              </Button>
            </TooltipTrigger>
            <TooltipContent>Restablecer zoom</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="sm" onClick={handleZoomIn} className="border-gray-300">
                +
              </Button>
            </TooltipTrigger>
            <TooltipContent>Aumentar zoom</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="relative overflow-auto border rounded-lg p-4 w-full" style={{ maxHeight: "600px" }}>
        <canvas ref={canvasRef} onClick={handleCanvasClick} style={{ cursor: "pointer" }} />
      </div>

      {selectedAgent && (
        <Card className="mt-6 w-full max-w-md border-none shadow-sm">
          <CardContent className="pt-6">
            {(() => {
              const agent = mockAgents.find((a) => a.id === selectedAgent)
              if (!agent) return null

              return (
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                      <Bot className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="text-lg font-medium">{agent.name}</h3>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">{agent.description}</p>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium mb-1">Tipo</h4>
                    <p className="text-sm">{agent.type === "supervisor" ? "Supervisor" : "Trabajador"}</p>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium mb-1">Fuentes de Datos</h4>
                    <div className="flex flex-wrap gap-1">
                      {agent.dataSources.map((source) => (
                        <span key={source} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                          {source}
                        </span>
                      ))}
                    </div>
                  </div>

                  {agent.supervisedAgents.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium mb-1">Agentes Supervisados</h4>
                      <div className="flex flex-wrap gap-1">
                        {agent.supervisedAgents.map((id) => {
                          const supervisedAgent = mockAgents.find((a) => a.id === id)
                          return supervisedAgent ? (
                            <span key={id} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                              {supervisedAgent.name}
                            </span>
                          ) : null
                        })}
                      </div>
                    </div>
                  )}
                </div>
              )
            })()}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
