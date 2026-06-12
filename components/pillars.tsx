import { Gauge, ShieldCheck, Users } from "lucide-react"

const pillars = [
  {
    icon: Gauge,
    title: "Compute & Performance",
    description:
      "Dropping cloud overhead while increasing data processing velocities through optimized Delta/Parquet layouts and tuned Spark workloads.",
  },
  {
    icon: ShieldCheck,
    title: "Absolute Data Integrity",
    description:
      "Version-controlled pipelines with automated testing frameworks that catch schema drift and validation errors before ingestion.",
  },
  {
    icon: Users,
    title: "Self-Service Culture",
    description:
      "Building unified semantic models that empower 200+ decentralized users to explore governed data safely and independently.",
  },
]

export function Pillars() {
  return (
    <section id="pillars" className="border-b border-zinc-800">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <div className="mb-12 flex flex-col gap-3">
          <span className="font-mono text-xs uppercase tracking-widest text-cyan-400">// the archetype</span>
          <h2 className="text-balance font-mono text-3xl font-bold tracking-tight text-zinc-50 md:text-4xl">
            Core Engineering Pillars
          </h2>
        </div>

        <div className="grid gap-px overflow-hidden rounded-none border border-zinc-800 bg-zinc-800 md:grid-cols-3">
          {pillars.map((p) => (
            <div
              key={p.title}
              className="group flex flex-col gap-4 bg-black p-8 transition-colors hover:bg-zinc-900"
            >
              <div className="flex size-10 items-center justify-center rounded-none border border-cyan-400/30 bg-cyan-400/10">
                <p.icon className="size-5 text-cyan-400" />
              </div>
              <h3 className="font-mono text-lg font-semibold tracking-tight text-zinc-50">{p.title}</h3>
              <p className="leading-relaxed text-zinc-400">{p.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
