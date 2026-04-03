"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

const PURCHASES = [
  {
    name: "velasquezCzx",
    avatar: "https://cdn.pfps.gg/pfps/11378-hiromi-higuruma.png",
    item: "HUD Pack Premium",
    amount: 45,
  },
  {
    name: "xShadowRogue",
    avatar: "https://cdn.pfps.gg/pfps/96107-angel.jpeg",
    item: "Drug System v2",
    amount: 30,
  },
  {
    name: "d34thbydesign",
    avatar: "https://cdn.pfps.gg/pfps/54774-sexy-death.gif",
    item: "Custom Script (Full)",
    amount: 120,
  },
  {
    name: "mikuonthesticks",
    avatar: "https://cdn.pfps.gg/pfps/48054-black-miku.jpeg",
    item: "Inventory UI Redesign",
    amount: 55,
  },
  {
    name: "latinavibes__",
    avatar: "https://cdn.pfps.gg/pfps/35120-latina-baddie.png",
    item: "Police MDT Script",
    amount: 40,
  },
]

export function RecentPurchases() {
  const [current, setCurrent] = useState(0)
  const [visible, setVisible] = useState(true)
  const [started, setStarted] = useState(false)

  // Delay start by 3s so it doesn't pop immediately
  useEffect(() => {
    const timeout = setTimeout(() => setStarted(true), 3000)
    return () => clearTimeout(timeout)
  }, [])

  useEffect(() => {
    if (!started) return
    const cycle = setInterval(() => {
      // fade out
      setVisible(false)
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % PURCHASES.length)
        setVisible(true)
      }, 400)
    }, 4000)
    return () => clearInterval(cycle)
  }, [started])

  if (!started) return null

  const p = PURCHASES[current]

  return (
    <div
      className={cn(
        "fixed bottom-6 left-6 z-40 flex items-center gap-3 rounded-2xl border border-border bg-card/90 px-4 py-3 shadow-xl backdrop-blur-md transition-all duration-400",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
      )}
      style={{ maxWidth: 280 }}
    >
      {/* Avatar */}
      <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border border-border">
        <Image
          src={p.avatar}
          alt={p.name}
          fill
          unoptimized
          className="object-cover"
        />
        {/* green dot */}
        <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-card bg-emerald-400" />
      </div>

      {/* Text */}
      <div className="flex flex-col min-w-0">
        <div className="flex items-center gap-1.5">
          <span className="truncate text-sm font-semibold text-foreground">{p.name}</span>
          <span className="shrink-0 rounded bg-primary/15 px-1.5 py-0.5 font-mono text-[10px] font-bold text-primary">
            ${p.amount}
          </span>
        </div>
        <span className="truncate text-xs text-muted-foreground">just purchased · {p.item}</span>
      </div>
    </div>
  )
}
