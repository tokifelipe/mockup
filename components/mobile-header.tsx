"use client"

import { useState } from "react"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { MobileSidebar } from "@/components/mobile-sidebar"

export function MobileHeader() {
  const [open, setOpen] = useState(false)

  return (
    <div className="md:hidden border-b bg-white p-4 flex items-center justify-between">
      <div className="flex items-center">
        <Button variant="ghost" size="icon" onClick={() => setOpen(true)}>
          <Menu className="h-5 w-5" />
        </Button>
        <div className="ml-2">
          <img src="/images/logo-color.png" alt="AgentBuilder Logo" className="h-6" />
        </div>
      </div>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="p-0 w-[280px]">
          <MobileSidebar onClose={() => setOpen(false)} />
        </SheetContent>
      </Sheet>
    </div>
  )
}
