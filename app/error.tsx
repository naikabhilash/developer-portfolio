"use client"

import { useEffect } from "react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error("Route error:", error)
  }, [error])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-zinc-50 px-6 text-center">
      <h2 className="font-serif text-3xl font-medium tracking-tight text-zinc-900">
        Something went wrong
      </h2>
      <p className="max-w-md text-zinc-600">
        An unexpected error occurred. Please try again or reload the page.
      </p>
      <button
        type="button"
        onClick={reset}
        className="inline-flex items-center gap-2 bg-blue-900 px-5 py-3 text-sm font-medium text-zinc-50 transition-colors hover:bg-blue-950"
      >
        Try again
      </button>
    </div>
  )
}
