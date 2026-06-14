import { Cpu, FlaskConical, Cloud, Activity, Brain, ShieldCheck } from "lucide-react"

type CaseStudy = {
  icon: typeof Cpu
  tag: string
  title: string
  context: string
  metrics: string[]
  span?: boolean
}

const caseStudies: CaseStudy[] = [
  {
    icon: Cpu,
    tag: "Automotive Sector",
    title: "Fabric Capacity Optimization & Campaign Analytics",
    context:
      "Migrated legacy Dataflow Gen1 environments to an optimized Microsoft Fabric Lakehouse using Dataflow Gen2 and Notebooks for EMEA operations of a top-3 global motorcycle manufacturer. Rearchitected business logic mid-flight into structured parent categories to resolve imprecise attribution tracking.",
    metrics: ["30% Reduction in Fabric Capacity Overhead", "200+ Active Self-Service Users"],
    span: true,
  },
  {
    icon: FlaskConical,
    tag: "Pharma Sector",
    title: "Secure Multi-Source Clinical Trial Integration Platform",
    context:
      "Designed pipeline architectures using Python and dbt to unify fragmented, non-standardized EDC schemas. Established automated CI/CD deployments and strict dbt data validation to catch errors prior to warehouse ingestion.",
    metrics: ["Near-Real-Time Global Visibility", "Full Pharma Compliance"],
  },
  {
    icon: Cloud,
    tag: "AWS to Databricks",
    title: "Automated Modernization of 500+ Cloud Workloads",
    context:
      "Led a team converting 500+ legacy AWS Glue jobs to Databricks. Overcame LLM translation variance by breaking pipeline code into structured groups (Library, Transformation, Read/Write) and utilizing targeted prompt tuning.",
    metrics: ["+20% Code Quality Improvement", "Significant Cloud Cost Reduction"],
  },
  {
    icon: Activity,
    tag: "Streaming",
    title: "Low-Latency Telemetry & Operational Alerting Engine",
    context:
      "Implemented streaming pipelines using Fabric ingestion patterns and PySpark streaming to aggregate live log events inside a Delta Lake architecture, feeding an active anomaly-alerting dashboard.",
    metrics: ["Live Anomaly Detection", "Delta Lake Streaming"],
  },
  {
    icon: Brain,
    tag: "MLOps",
    title: "Automated Predictive Features Engine",
    context:
      "Operationalized automated ML training and batch scoring frameworks inside Microsoft Fabric Notebooks, outputting optimized feature tables into a centralized semantic warehouse.",
    metrics: ["Automated Batch Scoring", "Centralized Feature Store"],
  },
  {
    icon: ShieldCheck,
    tag: "Governance",
    title: "Enterprise Workspace Isolation & Lineage Tracking",
    context:
      "Deployed global role-based access control (RBAC), object-level security, sensitivity labels, and end-to-end data lineage audits inside OneLake across hundreds of active self-service environments.",
    metrics: ["End-to-End Lineage", "Object-Level Security"],
  },
]

export function CaseStudies() {
  return (
    <section id="case-studies" className="bg-zinc-950/50 backdrop-sm">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <div className="mb-16 flex flex-col gap-3">
          <span className="text-xs font-medium uppercase tracking-widest text-emerald-400">The Production Logs</span>
          <h2 className="text-balance text-4xl font-semibold tracking-tight text-zinc-100 md:text-5xl">
            Enterprise Case Studies
          </h2>
        </div>

        <div className="grid gap-px overflow-hidden border border-zinc-800 bg-zinc-800 md:grid-cols-2 lg:grid-cols-3">
          {caseStudies.map((cs) => (
            <article
              key={cs.title}
              className={`group flex flex-col gap-4 bg-zinc-900/50 p-8 transition-colors hover:bg-zinc-900 ${
                cs.span ? "lg:col-span-2" : ""
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex size-10 items-center justify-center rounded-lg border border-zinc-700 bg-zinc-950">
                  <cs.icon className="size-4 text-emerald-400" />
                </div>
                <span className="text-[11px] uppercase tracking-widest text-zinc-500">{cs.tag}</span>
              </div>

              <h3 className="text-balance text-xl font-semibold tracking-tight text-zinc-100">{cs.title}</h3>
              <p className="text-pretty text-sm leading-relaxed text-zinc-400">{cs.context}</p>

              <div className="mt-auto flex flex-wrap gap-2 pt-2">
                {cs.metrics.map((m) => (
                  <span
                    key={m}
                    className="inline-flex items-center rounded-md border border-zinc-700 bg-zinc-950 px-2.5 py-1 text-[11px] font-medium text-emerald-400"
                  >
                    {m}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
