import Link from "next/link"

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-zinc-50 px-6 text-center">
      <span className="font-mono text-6xl font-bold text-zinc-200">404</span>
      <h2 className="font-serif text-3xl font-medium tracking-tight text-zinc-900">
        Page not found
      </h2>
      <p className="max-w-md text-zinc-600">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 bg-blue-900 px-5 py-3 text-sm font-medium text-zinc-50 transition-colors hover:bg-blue-950"
      >
        Back to home
      </Link>
    </div>
  )
}
