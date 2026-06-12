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
    <footer id="contact" className="bg-zinc-950">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="flex flex-col gap-6">
            <span className="font-mono text-xs uppercase tracking-widest text-emerald-400">// the callback function</span>
            <h2 className="text-balance text-3xl font-bold tracking-tight text-zinc-50 md:text-4xl">
              Let&apos;s build something scalable together.
            </h2>

            <pre className="overflow-x-auto rounded-lg border border-zinc-800 bg-zinc-900/40 p-5 font-mono text-sm leading-relaxed">
              <code>
                <span className="text-zinc-500">const</span> <span className="text-emerald-400">contact</span>{" "}
                <span className="text-zinc-500">=</span> <span className="text-zinc-300">{"{"}</span>
                {"\n"}
                {"  "}
                <span className="text-zinc-400">email</span>
                <span className="text-zinc-500">:</span>{" "}
                <span className="text-emerald-400">&quot;abhilash29naik@gmail.com&quot;</span>
                <span className="text-zinc-500">,</span>
                {"\n"}
                {"  "}
                <span className="text-zinc-400">location</span>
                <span className="text-zinc-500">:</span>{" "}
                <span className="text-emerald-400">&quot;Bengaluru, India // Remote&quot;</span>
                <span className="text-zinc-500">,</span>
                {"\n"}
                <span className="text-zinc-300">{"}"}</span>
                <span className="text-zinc-500">;</span>
              </code>
            </pre>
          </div>

          <div className="flex flex-col gap-3 lg:items-end">
            <a
              href="mailto:abhilash29naik@gmail.com"
              className="group inline-flex w-full items-center justify-between gap-3 rounded-lg bg-emerald-500 px-5 py-3.5 font-mono text-sm font-medium text-zinc-950 transition-colors hover:bg-emerald-400 lg:w-auto"
            >
              <span className="flex items-center gap-2">
                <Mail className="size-4" />
                Send email
              </span>
              <span className="text-zinc-700 transition-transform group-hover:translate-x-0.5">{"->"}</span>
            </a>
            <a
              href="https://linkedin.com/in/abhilash-naik"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex w-full items-center justify-between gap-3 rounded-lg border border-zinc-800 bg-zinc-900/50 px-5 py-3.5 font-mono text-sm text-zinc-300 transition-colors hover:border-zinc-700 hover:text-zinc-50 lg:w-auto"
            >
              <span className="flex items-center gap-2">
                <LinkedinIcon className="size-4 text-zinc-500" />
                linkedin.com/in/abhilash-naik
              </span>
              <span className="text-zinc-600 transition-transform group-hover:translate-x-0.5">{"->"}</span>
            </a>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-3 border-t border-zinc-800 pt-6 sm:flex-row">
          <span className="font-mono text-sm font-bold tracking-tight text-zinc-50">
            AN <span className="text-zinc-600">//</span> <span className="text-emerald-400">ARCHITECT</span>
          </span>
          <p className="font-mono text-xs text-zinc-500">© 2026 Abhilash Naik. Optimized for performance.</p>
        </div>
      </div>
    </footer>
  )
}
