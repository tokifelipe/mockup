"use client"

import { useState } from "react"
import { Copy, Check, Code } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface ChatCodeTabProps {
  config: any
}

export function ChatCodeTab({ config }: ChatCodeTabProps) {
  const [copied, setCopied] = useState(false)
  const [activeTab, setActiveTab] = useState("html")

  // Añadir una verificación para mostrar un mensaje diferente cuando es una nueva configuración
  const isNewConfig = !config.id || config.id === "nuevo"

  const htmlCode = `<!-- Añade este código justo antes del cierre de la etiqueta </body> -->
<script>
  window.AGENTHUB_CONFIG = ${JSON.stringify(config, null, 2)};
</script>
<script src="https://cdn.agenthub.io/chat-widget.js" async></script>`

  const reactCode = `import { useEffect } from 'react';

function ChatWidget() {
  useEffect(() => {
    // Cargar el script del chat
    const script = document.createElement('script');
    script.src = 'https://cdn.agenthub.io/chat-widget.js';
    script.async = true;
    document.body.appendChild(script);

    // Configurar el widget
    window.AGENTHUB_CONFIG = ${JSON.stringify(config, null, 2)};

    return () => {
      // Limpiar al desmontar
      document.body.removeChild(script);
    };
  }, []);

  return null;
}

export default ChatWidget;`

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Y luego, antes del return, añadir:
  if (isNewConfig) {
    return (
      <div className="space-y-4">
        <Card className="border-none shadow-sm">
          <CardHeader className="bg-primary/5 border-b pb-3">
            <CardTitle className="text-lg">Código de Integración</CardTitle>
            <CardDescription>El código estará disponible después de guardar la configuración</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="p-8 text-center">
              <div className="mb-4 text-gray-400">
                <Code className="h-16 w-16 mx-auto" />
              </div>
              <h3 className="text-lg font-medium mb-2">Guarda tu configuración primero</h3>
              <p className="text-gray-500 mb-4">
                Una vez que guardes esta configuración, podrás acceder al código de integración para añadirlo a tu sitio
                web.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <Card className="border-none shadow-sm">
        <CardHeader className="bg-primary/5 border-b pb-3">
          <CardTitle className="text-lg">Código de Integración</CardTitle>
          <CardDescription>Copia este código para integrar el chat en tu sitio web</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="html">HTML</TabsTrigger>
              <TabsTrigger value="react">React</TabsTrigger>
            </TabsList>

            <TabsContent value="html" className="relative">
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-md overflow-auto text-sm">
                <code>{htmlCode}</code>
              </pre>
              <Button
                size="sm"
                variant="ghost"
                className="absolute top-2 right-2 h-8 w-8 p-0 bg-gray-800 hover:bg-gray-700 text-gray-100"
                onClick={() => copyToClipboard(htmlCode)}
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </TabsContent>

            <TabsContent value="react" className="relative">
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-md overflow-auto text-sm">
                <code>{reactCode}</code>
              </pre>
              <Button
                size="sm"
                variant="ghost"
                className="absolute top-2 right-2 h-8 w-8 p-0 bg-gray-800 hover:bg-gray-700 text-gray-100"
                onClick={() => copyToClipboard(reactCode)}
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </TabsContent>
          </Tabs>

          <div className="mt-4 p-4 bg-blue-50 border border-blue-100 rounded-md">
            <h4 className="text-sm font-medium text-blue-800 mb-2">Instrucciones de Instalación</h4>
            <ol className="text-sm text-blue-700 space-y-2 pl-5 list-decimal">
              <li>Copia el código de arriba.</li>
              <li>
                Pégalo en tu sitio web justo antes del cierre de la etiqueta{" "}
                <code className="bg-blue-100 px-1 rounded">&lt;/body&gt;</code>.
              </li>
              <li>El chat se cargará automáticamente con la configuración que has definido.</li>
              <li>Puedes actualizar la configuración en cualquier momento desde este panel.</li>
            </ol>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
