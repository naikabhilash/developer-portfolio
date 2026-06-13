import { ArrowRight, Download } from "lucide-react"
import { NodeGraph } from "./node-graph"

export function Hero() {
  return (
    <section id="top" className="relative border-b border-zinc-800">
      <div className="relative mx-auto grid max-w-6xl gap-16 px-6 py-24 md:py-32 lg:grid-cols-2 lg:items-center">
        <div className="flex flex-col items-start gap-7">
          <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-emerald-400">
            <span className="size-1.5 rounded-full bg-emerald-400" />
            Microsoft Certified: Fabric Analytics Engineer Associate
          </span>

          <h1 className="text-balance text-5xl font-semibold leading-[1.05] tracking-tight text-zinc-100 md:text-6xl lg:text-7xl">
            Architecting Enterprise Data Ecosystems.{" "}
            <span className="text-emerald-400">Optimizing Modern Lakehouses.</span>
          </h1>

          <p className="max-w-xl text-pretty text-lg leading-relaxed text-zinc-400">
            Lead Software Engineer with 9 years of experience engineering high-performance data pipelines, scalable
            cloud architectures, and governance frameworks for global enterprises.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="#case-studies"
              className="group inline-flex items-center gap-2 bg-emerald-500 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-emerald-400"
            >
              Run Case Studies
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href="/resume.pdf"
              className="inline-flex items-center gap-2 border border-zinc-700 px-5 py-3 text-sm font-medium text-zinc-300 transition-colors hover:border-zinc-500 hover:text-zinc-100"
            >
              <Download className="size-4 text-zinc-500" />
              Download Resume
            </a>
          </div>
        </div>

        <NodeGraph />
      </div>
    </section>
  )
}
