"use client"

import { useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function AgentStats() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Datos de ejemplo para el gráfico
    const data = [
      { month: "Ene", interactions: 120 },
      { month: "Feb", interactions: 180 },
      { month: "Mar", interactions: 240 },
      { month: "Abr", interactions: 320 },
      { month: "May", interactions: 280 },
      { month: "Jun", interactions: 390 },
      { month: "Jul", interactions: 450 },
      { month: "Ago", interactions: 520 },
      { month: "Sep", interactions: 480 },
      { month: "Oct", interactions: 600 },
      { month: "Nov", interactions: 750 },
      { month: "Dic", interactions: 820 },
    ]

    // Configuración del gráfico
    const padding = 40
    const width = canvas.width
    const height = canvas.height
    const graphWidth = width - padding * 2
    const graphHeight = height - padding * 2

    // Limpiar el canvas
    ctx.clearRect(0, 0, width, height)

    // Encontrar el valor máximo para escalar
    const maxValue = Math.max(...data.map((item) => item.interactions))

    // Dibujar el eje Y
    ctx.beginPath()
    ctx.strokeStyle = "#e5e7eb"
    ctx.lineWidth = 1

    // Dibujar líneas horizontales y etiquetas del eje Y
    const numYLines = 5
    for (let i = 0; i <= numYLines; i++) {
      const y = padding + (graphHeight - graphHeight * (i / numYLines))

      ctx.moveTo(padding, y)
      ctx.lineTo(width - padding, y)

      // Etiquetas del eje Y
      const value = Math.round((maxValue * i) / numYLines)
      ctx.fillStyle = "#9ca3af"
      ctx.font = "10px Inter, sans-serif"
      ctx.textAlign = "right"
      ctx.fillText(value.toString(), padding - 10, y + 3)
    }
    ctx.stroke()

    // Dibujar la línea del gráfico
    ctx.beginPath()
    ctx.strokeStyle = "#1A8FB4"
    ctx.lineWidth = 3

    // Dibujar puntos y conectarlos
    data.forEach((item, index) => {
      const x = padding + (graphWidth / (data.length - 1)) * index
      const y = padding + (graphHeight - (item.interactions / maxValue) * graphHeight)

      if (index === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }

      // Etiquetas del eje X
      ctx.fillStyle = "#9ca3af"
      ctx.font = "10px Inter, sans-serif"
      ctx.textAlign = "center"
      ctx.fillText(item.month, x, height - padding + 15)
    })
    ctx.stroke()

    // Dibujar el área bajo la línea
    ctx.lineTo(padding + graphWidth, padding + graphHeight)
    ctx.lineTo(padding, padding + graphHeight)
    ctx.closePath()
    ctx.fillStyle = "rgba(26, 143, 180, 0.1)"
    ctx.fill()

    // Dibujar puntos
    data.forEach((item, index) => {
      const x = padding + (graphWidth / (data.length - 1)) * index
      const y = padding + (graphHeight - (item.interactions / maxValue) * graphHeight)

      ctx.beginPath()
      ctx.arc(x, y, 4, 0, Math.PI * 2)
      ctx.fillStyle = "#1A8FB4"
      ctx.fill()
      ctx.strokeStyle = "#fff"
      ctx.lineWidth = 2
      ctx.stroke()
    })
  }, [])

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Interacciones de Agentes</CardTitle>
      </CardHeader>
      <CardContent>
        <canvas ref={canvasRef} width={1000} height={300} className="w-full h-[300px]"></canvas>
      </CardContent>
    </Card>
  )
}
