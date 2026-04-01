"use client"

import { useInView } from "@/hooks/use-in-view"
import { specialServices, paymentMethods } from "@/lib/pricing-data"
import { cn } from "@/lib/utils"

export function ServicesSection() {
  const { ref: headerRef, inView: headerIn } = useInView()
  const { ref: cardsRef, inView: cardsIn } = useInView()
  const { ref: payRef, inView: payIn } = useInView()

  return (
    <section id="services" className="py-24 px-4 border-t border-border">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div
          ref={headerRef}
          className={cn(
            "mb-14 flex flex-col gap-2 transition-all duration-700",
            headerIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          )}
        >
          <span className="font-mono text-xs text-primary uppercase tracking-widest">— Services</span>
          <h2 className="text-4xl font-bold text-foreground">More Ways to Work</h2>
          <p className="text-muted-foreground">Custom builds and existing script fixes.</p>
        </div>

        {/* Cards */}
        <div ref={cardsRef} className="grid gap-4 md:grid-cols-2">
          {specialServices.map((service, i) => (
            <div
              key={service.id}
              className={cn(
                "rounded-xl border border-border bg-card p-6",
                "transition-all duration-700 hover:border-primary/30 hover:shadow-[0_0_30px_oklch(0.72_0.22_195_/_0.07)]",
                cardsIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              )}
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              <div className="mb-5 flex items-center justify-between">
                <div
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-primary/20 bg-primary/10"
                  style={{ color: "oklch(0.72 0.22 195)" }}
                >
                  <span className="text-base font-bold font-mono">{i === 0 ? "#" : "~"}</span>
                </div>
                <span className="font-mono text-xl font-bold text-primary">{service.range}</span>
              </div>
              <h3 className="mb-2 text-xl font-bold text-foreground">{service.title}</h3>
              <p className="mb-4 text-sm leading-relaxed text-muted-foreground">{service.description}</p>
              {"features" in service && service.features && (
                <ul className="flex flex-col gap-1.5">
                  {service.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
                      <span className="text-primary font-bold">+</span>
                      {f}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        {/* Custom script ownership notice */}
        <div
          className={cn(
            "mt-4 rounded-xl border border-border bg-card/50 p-5 transition-all duration-700",
            cardsIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          )}
          style={{ transitionDelay: "260ms" }}
        >
          <div className="flex items-start gap-3">
            <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-primary/20 bg-primary/10">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-primary">
                <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="text-sm font-semibold text-foreground">Your Script. Yours Only.</span>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Every custom script is built exclusively for you. Once delivered, the source code is{" "}
                <span className="text-foreground font-medium">permanently deleted</span> from my machine — no backups, no copies.
              </p>
              <p className="text-sm leading-relaxed text-muted-foreground">
                If another client wants something in the same genre — say, a fishing script — I&apos;ll build them one from scratch.
                It will never resemble yours in logic, design, or code. Every build is original.
              </p>
            </div>
          </div>
        </div>

        {/* Payment methods */}
        <div
          ref={payRef}
          className={cn(
            "mt-10 rounded-xl border border-border bg-card p-6 transition-all duration-700",
            payIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          )}
          style={{ transitionDelay: "160ms" }}
        >
          <h3 className="mb-4 font-mono text-xs uppercase tracking-widest text-muted-foreground">
            Payment Methods
          </h3>
          <div className="flex flex-wrap gap-3">
            {paymentMethods.map((m) => (
              <span
                key={m}
                className="rounded-md border border-border bg-secondary px-3 py-1.5 font-mono text-xs text-foreground/80"
              >
                {m}
              </span>
            ))}
            {["Tebex", "Stripe"].map((m) => (
              <span
                key={m}
                className="rounded-md border border-primary/15 bg-primary/5 px-3 py-1.5 font-mono text-xs text-primary/50"
              >
                {m} — Soon
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
