export function Footer() {
  return (
    <footer className="border-t border-border py-8 px-4">
      <div className="mx-auto max-w-5xl flex flex-col items-center gap-2 text-center">
        <span className="font-mono text-sm font-bold text-foreground">
          DOPA<span className="text-primary">.</span>WORKS
        </span>
        <p className="font-mono text-xs text-muted-foreground">
          Premium FiveM scripts &amp; development &middot; strangepeoples
        </p>
        <p className="font-mono text-xs text-muted-foreground/30">
          &copy; {new Date().getFullYear()} DOPA WORKS. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
