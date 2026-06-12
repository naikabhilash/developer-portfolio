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
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200 bg-zinc-50/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a href="#top" className="font-serif text-lg font-semibold tracking-tight text-zinc-900">
          Abhilash Naik
        </a>

        <nav className="hidden items-center gap-9 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-zinc-500 transition-colors hover:text-blue-900"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="text-sm font-medium text-blue-900 underline decoration-blue-900/30 underline-offset-4 transition-colors hover:decoration-blue-900"
          >
            Contact
          </a>
        </nav>

        <button
          type="button"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="text-zinc-500 transition-colors hover:text-blue-900 md:hidden"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-zinc-200 px-6 py-3 md:hidden">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="px-2 py-2 text-sm text-zinc-500 transition-colors hover:text-blue-900"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="px-2 py-2 text-sm font-medium text-blue-900"
          >
            Contact
          </a>
        </nav>
      )}
    </header>
  )
}
