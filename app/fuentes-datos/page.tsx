import Link from "next/link"
import { PlusCircle, Search, SlidersHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DataSourcesList } from "@/components/data-sources-list"

export default function FuentesDatosPage() {
  return (
    <div className="p-4 md:p-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Fuentes de Datos</h1>
          <div className="flex items-center text-sm text-gray-500 mt-1">
            <Link href="/" className="hover:text-primary">
              Panel
            </Link>
            <span className="mx-2">•</span>
            <span>Fuentes de Datos</span>
          </div>
        </div>
        <Link href="/fuentes-datos/nueva">
          <Button className="w-full md:w-auto bg-action hover:bg-action-hover">
            <PlusCircle className="mr-2 h-4 w-4" />
            Nueva Fuente de Datos
          </Button>
        </Link>
      </div>

      <div className="bg-white rounded-lg border overflow-hidden">
        <div className="p-4 border-b flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input placeholder="Buscar fuentes de datos..." className="pl-9 h-10 w-full" />
          </div>
          <Button variant="outline" size="sm" className="w-full sm:w-auto">
            <SlidersHorizontal className="mr-2 h-4 w-4" />
            Filtros
          </Button>
        </div>

        <DataSourcesList />
      </div>
    </div>
  )
}
