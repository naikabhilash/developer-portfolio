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
    <section id="pillars" className="border-b border-zinc-200">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <div className="mb-16 flex flex-col gap-3">
          <span className="text-xs font-medium uppercase tracking-widest text-blue-900">The Archetype</span>
          <h2 className="text-balance font-serif text-4xl font-medium tracking-tight text-zinc-900 md:text-5xl">
            Core Engineering Pillars
          </h2>
        </div>

        <div className="grid gap-px overflow-hidden border border-zinc-200 bg-zinc-200 md:grid-cols-3">
          {pillars.map((p) => (
            <div
              key={p.title}
              className="group flex flex-col gap-4 bg-zinc-50 p-8 transition-colors hover:bg-white"
            >
              <div className="flex size-11 items-center justify-center border border-blue-900/20 bg-blue-900/5">
                <p.icon className="size-5 text-blue-900" />
              </div>
              <h3 className="font-serif text-xl font-medium tracking-tight text-zinc-900">{p.title}</h3>
              <p className="leading-relaxed text-zinc-600">{p.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
