"use client"

import { useState } from "react"
import { Check, Plus, Search, Users, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

interface Segment {
  id: string
  name: string
  description: string
  count: number
}

interface SegmentSelectorProps {
  availableSegments: Segment[]
  selectedSegment: string | null
  onChange: (segmentId: string) => void
}

export function SegmentSelector({ availableSegments, selectedSegment, onChange }: SegmentSelectorProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleSelectSegment = (segmentId: string) => {
    onChange(segmentId)
    setIsDialogOpen(false)
  }

  const filteredSegments = availableSegments.filter(
    (segment) =>
      segment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      segment.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Obtener el segmento seleccionado
  const segment = availableSegments.find((s) => s.id === selectedSegment)

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-4">
        {!selectedSegment ? (
          <div className="text-gray-500 text-sm py-2">No hay segmento seleccionado</div>
        ) : (
          <Badge variant="secondary" className="flex items-center gap-1 bg-primary/10 text-primary border-0">
            <Users className="h-3 w-3" />
            {segment?.name} ({segment?.count} usuarios)
            <Button
              variant="ghost"
              size="sm"
              className="h-4 w-4 p-0 ml-1 hover:bg-transparent hover:text-red-500"
              onClick={() => onChange("")}
            >
              <X className="h-3 w-3" />
            </Button>
          </Badge>
        )}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="w-full border-gray-300 text-gray-700">
            <Plus className="mr-2 h-4 w-4" />
            Seleccionar Segmento
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Seleccionar Segmento de Usuarios</DialogTitle>
          </DialogHeader>

          <div className="relative mb-4">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Buscar segmentos..."
              className="pl-8 border-gray-300"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <ScrollArea className="h-[300px] pr-4">
            <div className="space-y-2">
              {filteredSegments.length === 0 ? (
                <div className="text-center py-4 text-gray-500">No se encontraron segmentos</div>
              ) : (
                filteredSegments.map((segment) => (
                  <Button
                    key={segment.id}
                    variant="outline"
                    className="w-full justify-start h-auto py-3 border-gray-300 hover:border-primary hover:bg-primary/5"
                    onClick={() => handleSelectSegment(segment.id)}
                  >
                    <div className="flex items-center w-full">
                      <Users className="h-4 w-4 mr-2 text-primary" />
                      <div className="flex-1 text-left">
                        <div className="font-medium">{segment.name}</div>
                        <div className="text-xs text-gray-500">{segment.description}</div>
                        <div className="text-xs text-primary mt-1">{segment.count} usuarios</div>
                      </div>
                      {selectedSegment === segment.id && <Check className="h-4 w-4 text-primary ml-2" />}
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
