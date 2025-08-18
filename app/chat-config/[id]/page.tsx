import Link from "next/link"
import { ChevronLeft, Save } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ChatConfigForm } from "@/components/chat-config-form"

export default function ChatConfigDetailPage({ params }: { params: { id: string } }) {
  const isNew = params.id === "nuevo"

  return (
    <div className="p-4 md:p-8">
      <div className="mb-6">
        <Link href="/chat-config">
          <Button variant="ghost" className="pl-0 text-gray-600 hover:text-gray-900">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Volver a Configuraciones
          </Button>
        </Link>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-800">
            {isNew ? "Nueva Configuración de Chat" : "Editar Configuración de Chat"}
          </h1>
          <p className="text-gray-500 mt-1">
            {isNew
              ? "Crea una nueva configuración para embeber en tu sitio web"
              : "Modifica la configuración existente"}
          </p>
        </div>
        <Button className="w-full md:w-auto bg-action hover:bg-action-hover">
          <Save className="mr-2 h-4 w-4" />
          Guardar Cambios
        </Button>
      </div>

      <ChatConfigForm isNew={isNew} configId={params.id} />
    </div>
  )
}
