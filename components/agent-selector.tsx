"use client"

import { useState } from "react"
import { Bot, Check, Plus, Search, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

interface Agent {
  id: string
  name: string
  type: string
  description: string
}

interface AgentSelectorProps {
  availableAgents: Agent[]
  selectedAgents: string[]
  onChange: (agents: string[]) => void
}

export function AgentSelector({ availableAgents, selectedAgents, onChange }: AgentSelectorProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleRemoveAgent = (agentId: string) => {
    onChange(selectedAgents.filter((id) => id !== agentId))
  }

  const handleAddAgent = (agentId: string) => {
    if (!selectedAgents.includes(agentId)) {
      onChange([...selectedAgents, agentId])
    }
    setIsDialogOpen(false)
  }

  const filteredAgents = availableAgents.filter(
    (agent) =>
      agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Get agent names for display
  const getAgentName = (agentId: string) => {
    const agent = availableAgents.find((a) => a.id === agentId)
    return agent ? agent.name : agentId
  }

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-4">
        {selectedAgents.length === 0 ? (
          <div className="text-gray-500 text-sm py-2">No hay agentes seleccionados</div>
        ) : (
          selectedAgents.map((agentId) => (
            <Badge
              key={agentId}
              variant="secondary"
              className="flex items-center gap-1 bg-primary/10 text-primary border-0"
            >
              <Bot className="h-3 w-3" />
              {getAgentName(agentId)}
              <Button
                variant="ghost"
                size="sm"
                className="h-4 w-4 p-0 ml-1 hover:bg-transparent hover:text-red-500"
                onClick={() => handleRemoveAgent(agentId)}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          ))
        )}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="w-full border-gray-300 text-gray-700">
            <Plus className="mr-2 h-4 w-4" />
            Añadir Agentes
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Seleccionar Agentes</DialogTitle>
          </DialogHeader>

          <div className="relative mb-4">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Buscar agentes..."
              className="pl-8 border-gray-300"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <ScrollArea className="h-[300px] pr-4">
            <div className="space-y-2">
              {filteredAgents.length === 0 ? (
                <div className="text-center py-4 text-gray-500">No se encontraron agentes</div>
              ) : (
                filteredAgents.map((agent) => (
                  <Button
                    key={agent.id}
                    variant="outline"
                    className="w-full justify-start h-auto py-3 border-gray-300 hover:border-primary hover:bg-primary/5"
                    onClick={() => handleAddAgent(agent.id)}
                  >
                    <div className="flex items-center w-full">
                      <Bot className="h-4 w-4 mr-2 text-primary" />
                      <div className="flex-1 text-left">
                        <div className="font-medium">{agent.name}</div>
                        <div className="text-xs text-gray-500">{agent.description}</div>
                      </div>
                      {selectedAgents.includes(agent.id) && <Check className="h-4 w-4 text-primary ml-2" />}
                    </div>
                  </Button>
                ))
              )}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  )
}
