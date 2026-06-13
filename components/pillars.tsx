import { Gauge, ShieldCheck, Users } from "lucide-react"
import { Section } from "@/components/ui/section"
import { SectionHeader } from "@/components/ui/section-header"
import { CardGrid } from "@/components/ui/card-grid"
import { IconBox } from "@/components/ui/icon-box"

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
    <Section id="pillars">
      <SectionHeader eyebrow="The Archetype" title="Core Engineering Pillars" />

      <CardGrid className="md:grid-cols-3">
        {pillars.map((p) => (
          <div
            key={p.title}
            className="group flex flex-col gap-4 bg-zinc-50 p-8 transition-colors hover:bg-white"
          >
            <IconBox icon={p.icon} size="size-11" iconSize="size-5" />
            <h3 className="font-serif text-xl font-medium tracking-tight text-zinc-900">{p.title}</h3>
            <p className="leading-relaxed text-zinc-600">{p.description}</p>
          </div>
        ))}
      </CardGrid>
    </Section>
  )
}
