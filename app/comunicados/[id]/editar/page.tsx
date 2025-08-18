import Link from "next/link"
import { ChevronLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ComunicadoForm } from "@/components/comunicado-form"

export default function EditarComunicadoPage({ params }: { params: { id: string } }) {
  return (
    <div className="p-4 md:p-8">
      <div className="mb-6">
        <Link href="/comunicados">
          <Button variant="ghost" className="pl-0 text-gray-600 hover:text-gray-900">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Volver a Comunicados
          </Button>
        </Link>
      </div>

      <div className="mb-6 md:mb-8">
        <h1 className="text-xl md:text-2xl font-bold text-gray-800">Editar Comunicado</h1>
        <p className="text-gray-500 mt-1">Modifica los detalles del comunicado programado</p>
      </div>

      <ComunicadoForm isNew={false} comunicadoId={params.id} />
    </div>
  )
}
