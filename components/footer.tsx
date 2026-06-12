import { Mail } from "lucide-react"

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
    </svg>
  )
}

export function Footer() {
  return (
    <footer id="contact" className="bg-zinc-50">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          <div className="flex flex-col gap-6">
            <span className="text-xs font-medium uppercase tracking-widest text-blue-900">The Callback Function</span>
            <h2 className="text-balance font-serif text-4xl font-medium tracking-tight text-zinc-900 md:text-5xl">
              Let&apos;s build something scalable together.
            </h2>

            <pre className="overflow-x-auto border border-zinc-200 bg-white p-6 font-mono text-sm leading-relaxed">
              <code>
                <span className="text-zinc-400">const</span> <span className="text-blue-900">contact</span>{" "}
                <span className="text-zinc-400">=</span> <span className="text-zinc-700">{"{"}</span>
                {"\n"}
                {"  "}
                <span className="text-zinc-500">email</span>
                <span className="text-zinc-400">:</span>{" "}
                <span className="text-blue-900">&quot;abhilash29naik@gmail.com&quot;</span>
                <span className="text-zinc-400">,</span>
                {"\n"}
                {"  "}
                <span className="text-zinc-500">location</span>
                <span className="text-zinc-400">:</span>{" "}
                <span className="text-blue-900">&quot;Bengaluru, India // Remote&quot;</span>
                <span className="text-zinc-400">,</span>
                {"\n"}
                <span className="text-zinc-700">{"}"}</span>
                <span className="text-zinc-400">;</span>
              </code>
            </pre>
          </div>

          <div className="flex flex-col gap-3 lg:items-end">
            <a
              href="mailto:abhilash29naik@gmail.com"
              className="group inline-flex w-full items-center justify-between gap-3 bg-blue-900 px-5 py-3.5 text-sm font-medium text-zinc-50 transition-colors hover:bg-blue-950 lg:w-auto"
            >
              <span className="flex items-center gap-2">
                <Mail className="size-4" />
                Send email
              </span>
              <span className="text-zinc-50/50 transition-transform group-hover:translate-x-0.5">{"->"}</span>
            </a>
            <a
              href="https://linkedin.com/in/abhilash-naik"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex w-full items-center justify-between gap-3 border border-zinc-300 bg-white px-5 py-3.5 text-sm font-medium text-zinc-700 transition-colors hover:border-zinc-900 hover:text-zinc-900 lg:w-auto"
            >
              <span className="flex items-center gap-2">
                <LinkedinIcon className="size-4 text-zinc-400" />
                linkedin.com/in/abhilash-naik
              </span>
              <span className="text-zinc-400 transition-transform group-hover:translate-x-0.5">{"->"}</span>
            </a>
          </div>
        </div>

        <div className="mt-20 flex flex-col items-center justify-between gap-3 border-t border-zinc-200 pt-6 sm:flex-row">
          <span className="font-serif text-lg font-semibold tracking-tight text-zinc-900">Abhilash Naik</span>
          <p className="text-xs text-zinc-400">© 2026 Abhilash Naik. Optimized for performance.</p>
        </div>
      </div>
    </footer>
  )
}
