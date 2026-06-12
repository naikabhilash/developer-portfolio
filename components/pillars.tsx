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
          <span className="font-mono text-xs uppercase tracking-widest text-emerald-400">// the archetype</span>
          <h2 className="text-balance text-3xl font-bold tracking-tight text-zinc-50 md:text-4xl">
            Core Engineering Pillars
          </h2>
        </div>

        <div className="grid gap-px overflow-hidden rounded-lg border border-zinc-800 bg-zinc-800 md:grid-cols-3">
          {pillars.map((p) => (
            <div
              key={p.title}
              className="group flex flex-col gap-4 bg-zinc-950 p-8 transition-colors hover:bg-zinc-900/60"
            >
              <div className="flex size-10 items-center justify-center rounded-lg border border-emerald-500/20 bg-emerald-500/10">
                <p.icon className="size-5 text-emerald-400" />
              </div>
              <h3 className="text-lg font-semibold tracking-tight text-zinc-50">{p.title}</h3>
              <p className="leading-relaxed text-zinc-400">{p.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
