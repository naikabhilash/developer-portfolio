"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"

const links = [
  { label: "Architecture", href: "#pillars" },
  { label: "Case Studies", href: "#case-studies" },
  { label: "Stack", href: "#stack" },
  { label: "Timeline", href: "#timeline" },
]

export function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-800 bg-black/90 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6">
        <a href="#top" className="font-mono text-sm font-bold tracking-tight text-zinc-50">
          AN <span className="text-zinc-600">//</span> <span className="text-cyan-400">ARCHITECT</span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-mono text-sm text-zinc-400 transition-colors hover:text-cyan-400"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="rounded-none border border-zinc-700 px-3 py-1.5 font-mono text-sm text-zinc-50 transition-colors hover:border-cyan-400 hover:bg-cyan-400 hover:text-black"
          >
            Contact
          </a>
        </nav>

        <button
          type="button"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="text-zinc-400 transition-colors hover:text-cyan-400 md:hidden"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-zinc-800 px-6 py-3 md:hidden">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-none px-2 py-2 font-mono text-sm text-zinc-400 transition-colors hover:bg-zinc-900 hover:text-cyan-400"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="rounded-none px-2 py-2 font-mono text-sm text-cyan-400"
          >
            Contact
          </a>
        </nav>
      )}
    </header>
  )
}
