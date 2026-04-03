"use client"

import { useInView } from "@/hooks/use-in-view"
import { cn } from "@/lib/utils"

const policies = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: "No Refunds After Delivery",
    body: "Once a script has been delivered and the source is in your hands, all sales are final. No exceptions.",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
        <circle cx="12" cy="12" r="10" /><path d="M12 8v4l3 3" />
      </svg>
    ),
    title: "Partial Refund — Work Already Started",
    body: "If you cancel after development has begun but before delivery, the developer keeps a portion for the work already done. You receive a partial refund — never zero, never full.",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    ),
    title: "Full Refund — Not Started",
    body: "Changed your mind before any work began? You get a 100% refund, no questions asked.",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
        <rect width="18" height="11" x="3" y="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
    title: "Non-Custom Scripts — Encrypted",
    body: "All pre-made scripts are delivered encrypted. You receive a working, protected build — the internals are not exposed.",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
        <path d="M16 18l6-6-6-6" /><path d="M8 6l-6 6 6 6" />
      </svg>
    ),
    title: "Custom Scripts — Open Source",
    body: "Custom builds are delivered fully open source. The code is yours — no obfuscation, no locks. You own every line.",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
        <circle cx="12" cy="12" r="3" /><path d="M3 12h1m16 0h1M12 3v1m0 16v1" /><path d="m5.6 5.6.7.7m11.4-.7-.7.7M5.6 18.4l.7-.7m11.4.7-.7-.7" />
      </svg>
    ),
    title: "Open Source Non-Custom — Available at Premium",
    body: "Want the full unencrypted source of a pre-made script? We offer open-source versions of select non-custom scripts at a higher price.",
  },
]

export function PurchasePolicy() {
  const { ref: headerRef, inView: headerIn } = useInView()
  const { ref: gridRef, inView: gridIn } = useInView()

  return (
    <section id="policy" className="py-24 px-4 border-t border-border">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div
          ref={headerRef}
          className={cn(
            "mb-14 flex flex-col gap-2 transition-all duration-700",
            headerIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          )}
        >
          <span className="font-mono text-xs text-primary uppercase tracking-widest">— Purchase Policy</span>
          <h2 className="text-4xl font-bold text-foreground">How It Works</h2>
          <p className="text-muted-foreground">Clear rules. No surprises.</p>
        </div>

        {/* Grid */}
        <div ref={gridRef} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {policies.map((policy, i) => (
            <div
              key={policy.title}
              className={cn(
                "flex flex-col gap-3 rounded-xl border border-border bg-card p-5",
                "transition-all duration-700 hover:border-primary/30",
                gridIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              )}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-primary/20 bg-primary/10 text-primary">
                {policy.icon}
              </div>
              <p className="text-sm font-semibold text-foreground">{policy.title}</p>
              <p className="text-sm leading-relaxed text-muted-foreground">{policy.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
