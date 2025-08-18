"use client"

import { Clock } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface TimePickerProps {
  time: string
  onChange: (time: string) => void
  disabled?: boolean
}

export function TimePicker({ time, onChange, disabled }: TimePickerProps) {
  const hours = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, "0"))
  const minutes = ["00", "15", "30", "45"]

  const [hour, minute] = time.split(":")

  const handleHourChange = (value: string) => {
    onChange(`${value}:${minute}`)
  }

  const handleMinuteChange = (value: string) => {
    onChange(`${hour}:${value}`)
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn("w-full justify-start text-left font-normal border-gray-300", !time && "text-muted-foreground")}
          disabled={disabled}
        >
          <Clock className="mr-2 h-4 w-4" />
          {time ? `${hour}:${minute}` : <span>Seleccionar hora</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-4">
        <div className="flex gap-2">
          <div className="grid gap-2">
            <div className="text-xs font-medium">Hora</div>
            <Select value={hour} onValueChange={handleHourChange}>
              <SelectTrigger className="w-20">
                <SelectValue placeholder="Hora" />
              </SelectTrigger>
              <SelectContent>
                {hours.map((h) => (
                  <SelectItem key={h} value={h}>
                    {h}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <div className="text-xs font-medium">Minuto</div>
            <Select value={minute} onValueChange={handleMinuteChange}>
              <SelectTrigger className="w-20">
                <SelectValue placeholder="Minuto" />
              </SelectTrigger>
              <SelectContent>
                {minutes.map((m) => (
                  <SelectItem key={m} value={m}>
                    {m}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
