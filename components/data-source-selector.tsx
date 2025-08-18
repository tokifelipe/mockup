"use client"

import { useState } from "react"
import { Check, Database, Plus, Search, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

interface DataSource {
  id: string
  name: string
  type: string
}

interface DataSourceSelectorProps {
  availableSources: DataSource[]
  selectedSources: string[]
  onChange: (sources: string[]) => void
}

export function DataSourceSelector({ availableSources, selectedSources, onChange }: DataSourceSelectorProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleRemoveSource = (sourceName: string) => {
    onChange(selectedSources.filter((name) => name !== sourceName))
  }

  const handleAddSource = (sourceName: string) => {
    if (!selectedSources.includes(sourceName)) {
      onChange([...selectedSources, sourceName])
    }
    setIsDialogOpen(false)
  }

  const filteredSources = availableSources.filter((source) =>
    source.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getSourceTypeIcon = (type: string) => {
    return <Database className="h-4 w-4 mr-2 text-primary" />
  }

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-4">
        {selectedSources.length === 0 ? (
          <div className="text-gray-500 text-sm py-2">No hay fuentes de datos seleccionadas</div>
        ) : (
          selectedSources.map((sourceName) => (
            <Badge
              key={sourceName}
              variant="secondary"
              className="flex items-center gap-1 bg-primary/10 text-primary border-0"
            >
              <Database className="h-3 w-3" />
              {sourceName}
              <Button
                variant="ghost"
                size="sm"
                className="h-4 w-4 p-0 ml-1 hover:bg-transparent hover:text-red-500"
                onClick={() => handleRemoveSource(sourceName)}
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
            Añadir Fuente de Datos
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Seleccionar Fuentes de Datos</DialogTitle>
          </DialogHeader>

          <div className="relative mb-4">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Buscar fuentes de datos..."
              className="pl-8 border-gray-300"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <ScrollArea className="h-[300px] pr-4">
            <div className="space-y-2">
              {filteredSources.length === 0 ? (
                <div className="text-center py-4 text-gray-500">No se encontraron fuentes de datos</div>
              ) : (
                filteredSources.map((source) => (
                  <Button
                    key={source.id}
                    variant="outline"
                    className="w-full justify-start h-auto py-3 border-gray-300 hover:border-primary hover:bg-primary/5"
                    onClick={() => handleAddSource(source.name)}
                  >
                    <div className="flex items-center w-full">
                      {getSourceTypeIcon(source.type)}
                      <div className="flex-1 text-left">
                        <div className="font-medium">{source.name}</div>
                        <div className="text-xs text-gray-500">
                          Tipo:{" "}
                          {source.type === "vector_db"
                            ? "Base de Conocimiento"
                            : source.type === "api"
                              ? "API"
                              : source.type === "sql"
                                ? "Base de Datos SQL"
                                : source.type}
                        </div>
                      </div>
                      {selectedSources.includes(source.name) && <Check className="h-4 w-4 text-primary ml-2" />}
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
