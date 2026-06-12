import { ArrowRight, Download } from "lucide-react"
import { NodeGraph } from "./node-graph"

export function Hero() {
  return (
    <section id="top" className="relative border-b border-zinc-800">
      {/* subtle grid backdrop */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <div className="relative mx-auto grid max-w-7xl gap-12 px-6 py-20 md:py-28 lg:grid-cols-2 lg:items-center">
        <div className="flex flex-col items-start gap-6">
          <span className="inline-flex items-center gap-2 rounded-none border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 font-mono text-xs text-cyan-400">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-none bg-cyan-400 opacity-75" />
              <span className="relative inline-flex size-2 rounded-none bg-cyan-400" />
            </span>
            Microsoft Certified: Fabric Analytics Engineer Associate
          </span>

          <h1 className="text-balance font-mono text-4xl font-bold tracking-tight text-zinc-50 md:text-5xl lg:text-6xl">
            Architecting Enterprise Data Ecosystems.{" "}
            <span className="text-cyan-400">Optimizing Modern Lakehouses.</span>
          </h1>

          <p className="max-w-xl text-pretty leading-relaxed text-zinc-400">
            Lead Software Engineer with 9 years of experience engineering high-performance data pipelines, scalable
            cloud architectures, and governance frameworks for global enterprises.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="#case-studies"
              className="group inline-flex items-center gap-2 rounded-none bg-cyan-400 px-4 py-2.5 font-mono text-sm font-medium text-black transition-colors hover:bg-cyan-300"
            >
              Run Case Studies
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href="/resume.pdf"
              className="inline-flex items-center gap-2 rounded-none border border-zinc-800 bg-zinc-900/50 px-4 py-2.5 font-mono text-sm text-zinc-300 transition-colors hover:border-cyan-400 hover:bg-cyan-400/10 hover:text-cyan-400"
            >
              <Download className="size-4 text-zinc-500" />
              cat resume.pdf
            </a>
          </div>
        </div>

        <NodeGraph />
      </div>
    </section>
  )
}
