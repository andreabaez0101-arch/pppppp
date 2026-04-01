"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

const links = [
  { label: "Scripts", href: "#scripts" },
  { label: "Services", href: "#services" },
  { label: "Policy", href: "#policy" },
  { label: "Contact", href: "#contact" },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 transition-all duration-300",
        scrolled
          ? "border-b border-border bg-background/80 backdrop-blur-md"
          : "bg-transparent"
      )}
    >
      <a href="#" className="flex items-center gap-2 group">
        <span className="font-mono text-lg font-bold text-foreground tracking-tight group-hover:text-primary transition-colors">
          DOPA<span className="text-primary">.</span>
        </span>
        <span className="font-mono text-xs text-muted-foreground uppercase tracking-widest">
          WORKS
        </span>
      </a>

      <nav className="hidden md:flex items-center gap-6">
        {links.map((l) => (
          <a
            key={l.href}
            href={l.href}
            className="font-mono text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
          >
            {l.label}
          </a>
        ))}
      </nav>

      <a
        href="#contact"
        className="rounded-lg border border-primary/40 bg-primary/10 px-4 py-2 font-mono text-xs text-primary uppercase tracking-wider transition-all hover:bg-primary/20 hover:border-primary/60"
      >
        Hire Me
      </a>
    </header>
  )
}
