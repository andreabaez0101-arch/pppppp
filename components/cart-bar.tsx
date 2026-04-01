"use client"

import { useState } from "react"
import { useCart } from "@/lib/cart-context"
import { cn } from "@/lib/utils"
import { ReportModal } from "./report-modal"

export function CartBar() {
  const { items, total, clear } = useCart()
  const [open, setOpen] = useState(false)

  const visible = items.length > 0

  return (
    <>
      {/* Floating bar */}
      <div
        className={cn(
          "fixed bottom-6 left-1/2 -translate-x-1/2 z-40",
          "flex items-center gap-4 rounded-2xl border border-primary/30 bg-card px-5 py-3.5",
          "shadow-[0_0_40px_oklch(0.72_0.22_195_/_0.18)]",
          "transition-all duration-500",
          visible
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-6 pointer-events-none"
        )}
      >
        {/* Count badge */}
        <div className="flex items-center gap-2">
          <span
            className="flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold text-background"
            style={{ background: "oklch(0.72 0.22 195)" }}
          >
            {items.length}
          </span>
          <span className="text-sm text-muted-foreground">
            {items.length === 1 ? "script" : "scripts"} selected
          </span>
        </div>

        <div className="h-4 w-px bg-border" />

        {/* Total */}
        <span className="font-mono text-base font-bold text-primary">
          ${total}
        </span>

        <div className="h-4 w-px bg-border" />

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={clear}
            className="rounded-lg px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors duration-150"
          >
            Clear
          </button>
          <button
            onClick={() => setOpen(true)}
            className="rounded-xl px-4 py-1.5 text-xs font-semibold text-background transition-all duration-150 hover:scale-[1.03] active:scale-95"
            style={{ background: "oklch(0.72 0.22 195)" }}
          >
            Generate Report
          </button>
        </div>
      </div>

      <ReportModal open={open} onClose={() => setOpen(false)} />
    </>
  )
}
