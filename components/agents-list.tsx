"use client"

import { useState } from "react"
import Link from "next/link"
import { Bot, ChevronDown, ChevronRight, Database, Edit, MoreHorizontal, Trash2, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

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

export function AgentsList() {
  const [expandedAgents, setExpandedAgents] = useState<string[]>(["1"])

  const toggleExpand = (agentId: string) => {
    setExpandedAgents((prev) => (prev.includes(agentId) ? prev.filter((id) => id !== agentId) : [...prev, agentId]))
  }

  const renderAgent = (agent: (typeof mockAgents)[0], level = 0) => {
    const isExpanded = expandedAgents.includes(agent.id)
    const hasSupervisedAgents = agent.supervisedAgents.length > 0

    return (
      <div key={agent.id} className="mb-4" style={{ marginLeft: `${level * 24}px` }}>
        <Card
          className="border-l-4"
          style={{ borderLeftColor: agent.type === "supervisor" ? "var(--primary)" : "var(--muted)" }}
        >
          <CardHeader className="pb-2">
            <div className="flex items-start justify-between">
              <div className="flex items-center">
                {hasSupervisedAgents && (
                  <Button variant="ghost" size="sm" className="p-0 h-6 w-6 mr-2" onClick={() => toggleExpand(agent.id)}>
                    {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                  </Button>
                )}
                <div>
                  <CardTitle className="flex items-center">
                    <Bot className="mr-2 h-5 w-5" />
                    {agent.name}
                    {agent.type === "supervisor" && (
                      <Badge variant="outline" className="ml-2">
                        Supervisor
                      </Badge>
                    )}
                  </CardTitle>
                  <CardDescription>{agent.description}</CardDescription>
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link href={`/agents/${agent.id}`}>
                      <Edit className="mr-2 h-4 w-4" />
                      Editar
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-destructive">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Eliminar
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>
          <CardContent className="pb-2">
            <div className="flex flex-wrap gap-2 mb-2">
              <div className="flex items-center text-sm text-muted-foreground">
                <Database className="mr-1 h-4 w-4" />
                Fuentes: {agent.dataSources.join(", ")}
              </div>
            </div>
            {agent.supervisedAgents.length > 0 && (
              <div className="flex items-center text-sm text-muted-foreground">
                <Users className="mr-1 h-4 w-4" />
                Supervisa: {agent.supervisedAgents.length} agente(s)
              </div>
            )}
          </CardContent>
          <CardFooter className="pt-2">
            <div className="flex justify-end w-full">
              <Link href={`/agents/${agent.id}`}>
                <Button variant="outline" size="sm">
                  Ver detalles
                </Button>
              </Link>
            </div>
          </CardFooter>
        </Card>

        {isExpanded && hasSupervisedAgents && (
          <div className="mt-2">
            {agent.supervisedAgents.map((childId) => {
              const childAgent = mockAgents.find((a) => a.id === childId)
              return childAgent ? renderAgent(childAgent, level + 1) : null
            })}
          </div>
        )}
      </div>
    )
  }

  // Find top-level agents (those that aren't supervised by anyone)
  const topLevelAgents = mockAgents.filter((agent) => !mockAgents.some((a) => a.supervisedAgents.includes(agent.id)))

  return <div>{topLevelAgents.map((agent) => renderAgent(agent))}</div>
}
