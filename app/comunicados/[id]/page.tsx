import Link from "next/link"
import { Calendar, ChevronLeft, Clock, Edit, Mail, Send, Trash2, User, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bot } from "lucide-react"

// Mock data para comunicados
const mockComunicados = [
  {
    id: "1",
    titulo: "Actualización de Términos de Servicio",
    agente: "Agente de Atención al Cliente",
    segmento: "Todos los usuarios",
    programado: "2023-05-15T10:00:00",
    estado: "enviado",
    usuarios: 1250,
    contenido:
      "Estimado usuario, le informamos que hemos actualizado nuestros términos de servicio. Los cambios entrarán en vigor el próximo 1 de junio. Por favor, revise los nuevos términos en nuestra página web. Si tiene alguna pregunta, no dude en contactar con nuestro equipo de soporte.",
    fechaCreacion: "2023-05-01T14:30:00",
    fechaEnvio: "2023-05-15T10:00:00",
  },
  {
    id: "2",
    titulo: "Nuevas funcionalidades disponibles",
    agente: "Agente Supervisor Principal",
    segmento: "Usuarios premium",
    programado: "2023-05-20T14:30:00",
    estado: "programado",
    usuarios: 450,
    contenido:
      "Apreciado usuario premium, nos complace informarle que hemos añadido nuevas funcionalidades exclusivas para su tipo de cuenta. Entre ellas se incluyen: análisis avanzado de datos, exportación en múltiples formatos y acceso prioritario al soporte técnico. Esperamos que disfrute de estas mejoras.",
    fechaCreacion: "2023-05-05T09:15:00",
    fechaEnvio: null,
  },
  {
    id: "3",
    titulo: "Mantenimiento programado",
    agente: "Agente de Soporte Técnico",
    segmento: "Usuarios activos",
    programado: "2023-05-25T08:00:00",
    estado: "programado",
    usuarios: 780,
    contenido:
      "Informamos que el próximo día 25 de mayo, de 08:00 a 10:00 horas, realizaremos labores de mantenimiento en nuestros servidores. Durante este período, el servicio podría experimentar interrupciones intermitentes. Lamentamos las molestias que esto pueda ocasionar y agradecemos su comprensión.",
    fechaCreacion: "2023-05-10T11:45:00",
    fechaEnvio: null,
  },
  {
    id: "4",
    titulo: "Encuesta de satisfacción",
    agente: "Agente de Análisis de Datos",
    segmento: "Usuarios recientes",
    programado: "2023-05-10T12:00:00",
    estado: "enviado",
    usuarios: 320,
    contenido:
      "Valoramos su opinión. Como usuario reciente de nuestra plataforma, nos gustaría conocer su experiencia hasta el momento. Por favor, dedique unos minutos a completar nuestra encuesta de satisfacción. Sus comentarios nos ayudarán a mejorar nuestros servicios. Gracias por su colaboración.",
    fechaCreacion: "2023-05-08T16:20:00",
    fechaEnvio: "2023-05-10T12:00:00",
  },
]

export default function ComunicadoDetailPage({ params }: { params: { id: string } }) {
  const comunicado = mockComunicados.find((c) => c.id === params.id)

  if (!comunicado) {
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
        <div className="text-center py-12">
          <h2 className="text-xl font-medium text-gray-900">Comunicado no encontrado</h2>
          <p className="mt-2 text-gray-500">El comunicado que estás buscando no existe o ha sido eliminado.</p>
        </div>
      </div>
    )
  }

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

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-800">{comunicado.titulo}</h1>
          <div className="flex items-center text-sm text-gray-500 mt-1">
            <Badge
              className={`mr-2 ${
                comunicado.estado === "enviado" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
              }`}
            >
              {comunicado.estado === "enviado" ? "Enviado" : "Programado"}
            </Badge>
            <span>Creado el {new Date(comunicado.fechaCreacion).toLocaleDateString("es-ES")}</span>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          {comunicado.estado === "programado" && (
            <>
              <Button variant="outline" className="w-full sm:w-auto">
                <Send className="mr-2 h-4 w-4" />
                Enviar ahora
              </Button>
              <Link href={`/comunicados/${comunicado.id}/editar`} className="w-full sm:w-auto">
                <Button variant="outline" className="w-full">
                  <Edit className="mr-2 h-4 w-4" />
                  Editar
                </Button>
              </Link>
              <Button variant="outline" className="w-full sm:w-auto text-red-600 hover:text-red-700">
                <Trash2 className="mr-2 h-4 w-4" />
                Cancelar
              </Button>
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-500">Agente</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                <Bot className="h-4 w-4 text-primary" />
              </div>
              <span className="font-medium">{comunicado.agente}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-500">Segmento de usuarios</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                <Users className="h-4 w-4 text-primary" />
              </div>
              <div>
                <span className="font-medium">{comunicado.segmento}</span>
                <p className="text-xs text-gray-500">{comunicado.usuarios} destinatarios</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-500">Programado para</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                <Calendar className="h-4 w-4 text-primary" />
              </div>
              <div>
                <span className="font-medium">
                  {new Date(comunicado.programado).toLocaleDateString("es-ES", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </span>
                <p className="text-xs text-gray-500">
                  {new Date(comunicado.programado).toLocaleTimeString("es-ES", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-lg">Contenido del comunicado</CardTitle>
          <CardDescription>Este es el mensaje que se enviará a los usuarios</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-50 p-4 rounded-lg border">
            <div className="flex items-center mb-4 pb-4 border-b">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                <Mail className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="font-medium">{comunicado.titulo}</p>
                <p className="text-xs text-gray-500">De: {comunicado.agente}</p>
              </div>
            </div>
            <div className="prose max-w-none">
              <p className="whitespace-pre-line">{comunicado.contenido}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {comunicado.estado === "enviado" && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Detalles de envío</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center">
                <Clock className="h-4 w-4 text-gray-400 mr-2" />
                <span className="text-sm">
                  Enviado el{" "}
                  {new Date(comunicado.fechaEnvio!).toLocaleDateString("es-ES", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}{" "}
                  a las{" "}
                  {new Date(comunicado.fechaEnvio!).toLocaleTimeString("es-ES", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
              <div className="flex items-center">
                <User className="h-4 w-4 text-gray-400 mr-2" />
                <span className="text-sm">Enviado a {comunicado.usuarios} usuarios</span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                <div className="bg-green-50 p-3 rounded-lg border border-green-100">
                  <p className="text-xs text-green-600 mb-1">Entregados</p>
                  <p className="text-xl font-bold">1,230</p>
                  <p className="text-xs text-green-600">98.4%</p>
                </div>
                <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-100">
                  <p className="text-xs text-yellow-600 mb-1">Abiertos</p>
                  <p className="text-xl font-bold">875</p>
                  <p className="text-xs text-yellow-600">70.0%</p>
                </div>
                <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                  <p className="text-xs text-blue-600 mb-1">Clics</p>
                  <p className="text-xl font-bold">320</p>
                  <p className="text-xs text-blue-600">25.6%</p>
                </div>
                <div className="bg-red-50 p-3 rounded-lg border border-red-100">
                  <p className="text-xs text-red-600 mb-1">Rebotados</p>
                  <p className="text-xl font-bold">20</p>
                  <p className="text-xs text-red-600">1.6%</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
