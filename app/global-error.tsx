"use client"

import { useEffect } from "react"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error("Global error:", error)
  }, [error])

  return (
    <html lang="en">
      <body className="font-sans antialiased bg-black text-zinc-50">
        <div className="flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center">
          <h2 className="font-serif text-3xl font-medium tracking-tight">
            Something went wrong
          </h2>
          <p className="max-w-md text-zinc-400">
            A critical error occurred. Please reload the page.
          </p>
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center gap-2 border border-zinc-700 px-5 py-3 text-sm font-medium text-zinc-50 transition-colors hover:border-zinc-500"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  )
}
