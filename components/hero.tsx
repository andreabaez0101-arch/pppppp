"use client"

import { useEffect, useRef, useState } from "react"

export function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animFrameId: number
    const particles: {
      x: number
      y: number
      vx: number
      vy: number
      alpha: number
      size: number
    }[] = []

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    resize()
    window.addEventListener("resize", resize)

    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        alpha: Math.random() * 0.6 + 0.1,
        size: Math.random() * 1.5 + 0.5,
      })
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `oklch(0.72 0.22 195 / ${p.alpha})`
        ctx.fill()

        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j]
          const dx = p.x - q.x
          const dy = p.y - q.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 130) {
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(q.x, q.y)
            ctx.strokeStyle = `oklch(0.72 0.22 195 / ${0.1 * (1 - dist / 130)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }

      animFrameId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animFrameId)
      window.removeEventListener("resize", resize)
    }
  }, [])

  const stats = [
    { val: "40+", label: "Scripts" },
    { val: "$20", label: "Starting at" },
    { val: "100%", label: "Custom" },
  ]

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

      {/* Radial glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 50% 40%, oklch(0.72 0.22 195 / 0.07) 0%, transparent 70%)",
        }}
      />

      {/* Horizontal scan line */}
      <div
        className="pointer-events-none absolute left-0 right-0 h-px opacity-30"
        style={{
          top: "42%",
          background:
            "linear-gradient(to right, transparent, oklch(0.72 0.22 195 / 0.6), transparent)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-6 px-4 text-center">
        {/* Badge */}
        <div
          className="transition-all duration-700 ease-out"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(-12px)",
            transitionDelay: "100ms",
          }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 font-mono text-xs text-primary uppercase tracking-widest">
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
            Premium FiveM Development
          </span>
        </div>

        {/* Title */}
        <div
          className="transition-all duration-700 ease-out"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(20px)",
            transitionDelay: "250ms",
          }}
        >
          <h1 className="text-balance text-7xl font-bold tracking-tight text-foreground md:text-9xl leading-none">
            DOPA
            <span
              className="block"
              style={{ color: "oklch(0.72 0.22 195)", textShadow: "0 0 40px oklch(0.72 0.22 195 / 0.4)" }}
            >
              WORKS
            </span>
          </h1>
        </div>

        {/* Tagline */}
        <div
          className="transition-all duration-700 ease-out"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(16px)",
            transitionDelay: "400ms",
          }}
        >
          <p className="max-w-xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
            High-quality scripts, UI systems, and custom development for FiveM servers.
            Clean code. Optimized. Built to last.
          </p>
        </div>

        {/* Stats */}
        <div
          className="mt-4 flex gap-10 transition-all duration-700 ease-out"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(16px)",
            transitionDelay: "550ms",
          }}
        >
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col items-center gap-1">
              <span
                className="font-mono text-3xl font-bold"
                style={{ color: "oklch(0.72 0.22 195)", textShadow: "0 0 20px oklch(0.72 0.22 195 / 0.3)" }}
              >
                {s.val}
              </span>
              <span className="text-xs text-muted-foreground uppercase tracking-wider font-mono">
                {s.label}
              </span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div
          className="mt-6 flex flex-col items-center gap-3 transition-all duration-700 ease-out"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(16px)",
            transitionDelay: "700ms",
          }}
        >
          <a
            href="#scripts"
            className="group relative overflow-hidden rounded-xl px-8 py-3.5 font-mono text-sm font-semibold uppercase tracking-wider text-primary-foreground transition-all duration-200 hover:scale-105 active:scale-95"
            style={{ background: "oklch(0.72 0.22 195)", boxShadow: "0 0 30px oklch(0.72 0.22 195 / 0.35)" }}
          >
            <span className="relative z-10">View All Scripts</span>
            <span
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: "oklch(0.78 0.20 195)" }}
            />
          </a>

          {/* Scroll cue */}
          <div className="mt-4 flex flex-col items-center gap-2 text-muted-foreground/30">
            <span className="font-mono text-[10px] uppercase tracking-widest">scroll</span>
            <div className="h-8 w-px bg-gradient-to-b from-muted-foreground/30 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  )
}
