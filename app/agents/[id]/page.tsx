import Link from "next/link"
import { ChevronLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { AgentForm } from "@/components/agent-form"

export default function AgentPage({ params }: { params: { id: string } }) {
  const isNewAgent = params.id === "new"

  return (
    <div className="p-4 md:p-8">
      <div className="mb-6">
        <Link href="/agents">
          <Button variant="ghost" className="pl-0 text-gray-600 hover:text-gray-900">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Volver al Listado
          </Button>
        </Link>
      </div>

      <div className="mb-6 md:mb-8">
        <h1 className="text-xl md:text-2xl font-bold text-gray-800">
          {isNewAgent ? "Crear Nuevo Agente" : "Editar Agente"}
        </h1>
        <p className="text-gray-500 mt-1">
          {isNewAgent
            ? "Configura los detalles de tu nuevo agente"
            : "Modifica la configuración de tu agente existente"}
        </p>
      </div>

      <AgentForm isNew={isNewAgent} agentId={params.id} />
    </div>
  )
}
