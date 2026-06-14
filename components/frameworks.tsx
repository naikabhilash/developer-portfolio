import {
  Filter,
  GitFork,
  TrendingUp,
  Mails,
  FileSpreadsheet,
  Network,
  type LucideIcon,
} from "lucide-react"

/* -------------------------------------------------------------------------- */
/*                                   Data                                     */
/* -------------------------------------------------------------------------- */

interface UseCase {
  icon: LucideIcon
  title: string
  capability: string
  execution: string
  metric: string
}

const marketing: UseCase[] = [
  {
    icon: Filter,
    title: "Conversion Funnel Analytics",
    capability:
      "Stage-by-stage decomposition of the acquisition journey, surfacing drop-off points across awareness, consideration, and conversion.",
    execution:
      "Event-stream ingestion into a star schema, windowed sessionization in SQL, and incremental dbt models materializing funnel cohorts.",
    metric: "CORE METRIC // Stage Conversion Rate",
  },
  {
    icon: GitFork,
    title: "Multi-Touch Attribution",
    capability:
      "Distributes revenue credit across every touchpoint, replacing last-click bias with data-driven weighting models.",
    execution:
      "Markov-chain removal-effect modeling over path-level data, orchestrated through a Python scoring service writing back to the warehouse.",
    metric: "CORE METRIC // Channel-Weighted ROAS",
  },
  {
    icon: TrendingUp,
    title: "Customer Lifetime Value",
    capability:
      "Forward-looking valuation of each customer cohort, segmenting high-value accounts for retention and expansion plays.",
    execution:
      "BG/NBD + Gamma-Gamma probabilistic modeling on transaction history, refreshed nightly and exposed via a semantic metrics layer.",
    metric: "CORE METRIC // Predicted 24-Mo CLV",
  },
  {
    icon: Mails,
    title: "Email Campaign Intelligence",
    capability:
      "Closed-loop measurement of lifecycle email — open, click, and downstream conversion attribution per send.",
    execution:
      "ESP webhook capture into an append-only event log, deduplicated and joined to revenue via identity resolution keys.",
    metric: "CORE METRIC // Revenue per Send",
  },
]

const finance: UseCase[] = [
  {
    icon: FileSpreadsheet,
    title: "P&L Reporting Automation",
    capability:
      "Self-serve profit-and-loss statements with drill-down from consolidated entity totals to individual GL line items.",
    execution:
      "GL extracts harmonized through dbt mapping layers, currency normalization, and version-controlled chart-of-accounts logic.",
    metric: "CORE METRIC // Close Cycle Time",
  },
  {
    icon: Network,
    title: "Hierarchical Sales Analytics",
    capability:
      "Roll-up and roll-down navigation across territory, region, and rep hierarchies with consistent aggregation semantics.",
    execution:
      "Recursive CTE hierarchy flattening, ragged-tree handling, and a Fabric semantic model enforcing additive measure logic.",
    metric: "CORE METRIC // Quota Attainment %",
  },
]

/* -------------------------------------------------------------------------- */
/*                                   Card                                     */
/* -------------------------------------------------------------------------- */

function UseCaseCard({ item }: { item: UseCase }) {
  const Icon = item.icon
  return (
    <div className="group flex flex-col gap-4 border border-zinc-800 bg-zinc-950/40 p-6 transition-colors duration-200 hover:border-zinc-700">
      <div className="flex h-9 w-9 items-center justify-center border border-zinc-800 bg-zinc-900/60 text-zinc-400 transition-colors duration-200 group-hover:text-emerald-400">
        <Icon className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
      </div>

      <h4 className="text-balance font-semibold leading-snug text-zinc-50">{item.title}</h4>

      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          <span className="font-mono text-[10px] font-medium uppercase tracking-widest text-zinc-500">
            Capability
          </span>
          <p className="text-sm leading-relaxed text-zinc-400">{item.capability}</p>
        </div>
        <div className="flex flex-col gap-1">
          <span className="font-mono text-[10px] font-medium uppercase tracking-widest text-zinc-500">
            Technical Execution
          </span>
          <p className="text-sm leading-relaxed text-zinc-400">{item.execution}</p>
        </div>
      </div>

      <div className="mt-auto pt-2">
        <span className="inline-flex items-center border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 font-mono text-[10px] font-medium uppercase tracking-widest text-emerald-400">
          {item.metric}
        </span>
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*                                  Column                                    */
/* -------------------------------------------------------------------------- */

function DomainColumn({ header, items }: { header: string; items: UseCase[] }) {
  return (
    <div className="flex flex-col gap-6">
      <h3 className="font-mono text-xs font-medium uppercase tracking-widest text-zinc-300">{header}</h3>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {items.map((item) => (
          <UseCaseCard key={item.title} item={item} />
        ))}
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*                                  Section                                   */
/* -------------------------------------------------------------------------- */

export function Frameworks() {
  return (
    <section id="frameworks" className="border-t border-zinc-800 bg-zinc-950/50">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <div className="mb-12 flex flex-col gap-3">
          <span className="font-mono text-xs font-medium uppercase tracking-widest text-emerald-400">
            [ /frameworks ]
          </span>
          <h2 className="text-balance font-mono text-4xl font-medium tracking-tight text-zinc-100 md:text-5xl">
            Business Domain Use Cases
          </h2>
          <p className="max-w-2xl text-pretty leading-relaxed text-zinc-400">
            Production-grade analytics frameworks mapped to the domains they serve — from growth and attribution to
            financial intelligence and operational reporting.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-0">
          <div className="lg:pr-10">
            <DomainColumn header="01 // MARKETING ANALYTICS & GROWTH" items={marketing} />
          </div>
          <div className="border-t border-zinc-800 pt-10 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
            <DomainColumn header="02 // FINANCIAL INTELLIGENCE & OPERATIONS" items={finance} />
          </div>
        </div>
      </div>
    </section>
  )
}
