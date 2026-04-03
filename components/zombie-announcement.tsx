"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

const VIDEO_URL =
  "https://github.com/andreabaez0101-arch/HiddenScriptsOxc6/releases/download/hidden/GTA.5.Zombie.Apocalypse.Mod.Liberation.Official.Trailer.FiveM.mp4"

const POSTER_URL =
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-nwSM2rt8nbwa3z0lPAGUPVerwx5nP1.png"

const DISCORD_URL = "https://discord.com/users/1384032725014548591"

export function ZombieAnnouncement() {
  const [preordered, setPreordered] = useState(false)
  const [videoReady, setVideoReady] = useState(false)
  const [videoSrc, setVideoSrc] = useState<string | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    // Fetch the video as blob to bypass GitHub redirect/CORS blocks
    let objectUrl: string | null = null
    fetch(VIDEO_URL)
      .then((res) => res.blob())
      .then((blob) => {
        objectUrl = URL.createObjectURL(blob)
        setVideoSrc(objectUrl)
      })
      .catch(() => {
        // fallback: try direct src
        setVideoSrc(VIDEO_URL)
      })
    return () => {
      if (objectUrl) URL.revokeObjectURL(objectUrl)
    }
  }, [])

  useEffect(() => {
    if (!videoSrc || !videoRef.current) return
    videoRef.current.play().catch(() => {})
  }, [videoSrc])

  function handlePreorder() {
    setPreordered(true)
    setTimeout(() => {
      window.open(DISCORD_URL, "_blank", "noopener,noreferrer")
    }, 600)
  }

  return (
    <section id="zombie" className="relative w-full overflow-hidden" style={{ minHeight: "90vh" }}>
      {/* Background layer: poster image always visible, video fades in on top */}
      <div className="absolute inset-0 w-full h-full">
        {/* Poster image — always shown, fades out when video is ready */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
          style={{
            backgroundImage: `url(${POSTER_URL})`,
            opacity: videoReady ? 0 : 1,
          }}
        />
        {/* Video */}
        {videoSrc && (
          <video
            ref={videoRef}
            src={videoSrc}
            className={cn(
              "absolute inset-0 w-full h-full object-cover transition-opacity duration-1000",
              videoReady ? "opacity-100" : "opacity-0"
            )}
            muted
            loop
            playsInline
            preload="auto"
            onCanPlay={() => setVideoReady(true)}
          />
        )}
        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, rgba(180,0,0,0.25) 0%, transparent 65%)" }} />
      </div>

      {/* Content */}
      <div className="relative z-10 flex min-h-[90vh] flex-col items-center justify-end px-6 pb-20 pt-32 text-center">

        {/* Top badge */}
        <div className="mb-6 flex items-center gap-2 rounded-full border border-red-600/50 bg-red-950/50 px-4 py-1.5 backdrop-blur-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
          <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-red-400">
            Coming Soon
          </span>
        </div>

        {/* Label */}
        <div className="mb-3 flex items-center gap-2">
          <span className="font-mono text-sm font-bold uppercase tracking-widest text-red-500">dopa</span>
          <span className="text-white/30">—</span>
          <span className="font-mono text-xs font-semibold uppercase tracking-wider text-white/40">
            Custom Event Script
          </span>
        </div>

        {/* Title */}
        <h2 className="text-balance text-4xl font-black leading-tight text-white sm:text-5xl md:text-6xl lg:text-7xl" style={{ textShadow: "0 0 60px oklch(0.4 0.2 20 / 0.8)" }}>
          Project Zombie:{" "}
          <span className="text-red-500">Biohazard Event</span>
        </h2>

        {/* Subtitle */}
        <p className="mt-4 text-base font-semibold text-yellow-400 sm:text-xl">
          El mejor script disponible, proximamente.
        </p>

        {/* Description */}
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/55 sm:text-base">
          Full zombie apocalypse event for FiveM — custom AI hordes, dynamic loot system,
          safe zones, map events, and cinematic UI. Built from scratch. Exclusive. Never resold.
        </p>

        {/* Stats row */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6">
          {[
            { label: "AI Zombie Hordes", value: "Dynamic" },
            { label: "Loot System", value: "Included" },
            { label: "Safe Zones", value: "Custom" },
            { label: "Source Code", value: "Open" },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-0.5">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-red-400">{stat.value}</span>
              <span className="text-xs text-white/35">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={handlePreorder}
            disabled={preordered}
            className={cn(
              "flex items-center gap-2 rounded-xl px-7 py-3.5 text-sm font-bold transition-all duration-300 shadow-lg",
              preordered
                ? "bg-red-950/60 border border-red-700/40 text-red-400 cursor-default"
                : "bg-red-600 hover:bg-red-500 text-white shadow-red-900/50 hover:shadow-red-700/40 hover:scale-105"
            )}
          >
            {preordered ? (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="M20 6 9 17l-5-5" /></svg>
                Interest Registered
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" /></svg>
                Pre-order via Discord
              </>
            )}
          </button>

          <a
            href="#scripts"
            className="rounded-xl border border-white/15 px-6 py-3.5 text-sm font-semibold text-white/50 hover:border-white/30 hover:text-white/80 transition-all duration-150 backdrop-blur-sm"
          >
            Browse Scripts
          </a>
        </div>
      </div>
    </section>
  )
}
