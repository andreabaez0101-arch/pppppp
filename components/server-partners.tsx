"use client"

import Image from "next/image"
import { useState } from "react"

const SERVERS = [
  { name: "🔥 Red Zone RP",      icon: "https://frontend.cfx-services.net/api/servers/icon/x5b4yx/-1888824734.png" },
  { name: "The Streets",          icon: "https://frontend.cfx-services.net/api/servers/icon/bo9yvl/-2061533334.png" },
  { name: "Genesis Community",    icon: "https://frontend.cfx-services.net/api/servers/icon/xjyllr/646068835.png" },
  { name: "ALTAMIRA RP",          icon: "https://frontend.cfx-services.net/api/servers/icon/aogpxe/-1476372406.png" },
  { name: "LA PERLA RP",          icon: "https://frontend.cfx-services.net/api/servers/icon/amgzje/1468134870.png" },
  { name: "STREET RP",            icon: "https://frontend.cfx-services.net/api/servers/icon/vgpjx5/988179140.png" },
]

export function ServerPartners() {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div
      className="fixed top-1/2 -translate-y-1/2 left-4 z-40 w-52 rounded-2xl border border-border shadow-2xl overflow-hidden"
      style={{ background: "hsl(var(--card))", backdropFilter: "blur(14px)" }}
    >
      {/* Header */}
      <button
        onClick={() => setCollapsed((v) => !v)}
        className="flex w-full items-center justify-between px-4 py-2.5 hover:bg-white/5 transition-colors duration-150"
      >
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
          <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
            Server Partners
          </span>
        </div>
        <span className="font-mono text-[10px] font-bold text-primary">{SERVERS.length}</span>
      </button>

      {/* Divider */}
      <div className="h-px bg-border" />

      {/* Server list */}
      {!collapsed && (
        <div className="flex flex-col py-1">
          {SERVERS.map((s, i) => (
            <div
              key={s.name}
              className="flex items-center gap-3 px-3 py-2 mx-1 rounded-xl transition-colors duration-150 hover:bg-white/5"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-lg border border-border/50">
                <Image
                  src={s.icon}
                  alt={s.name}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
              <span className="truncate text-xs font-semibold text-foreground leading-tight">
                {s.name}
              </span>
            </div>
          ))}
          <div className="h-1.5" />
        </div>
      )}
    </div>
  )
}
