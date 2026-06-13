import { Database, FileCode2, Cloud, Workflow, BarChart3, Layers } from "lucide-react"

const sources = [
  { icon: Database, label: "SQL / EDC" },
  { icon: FileCode2, label: "APIs / Files" },
  { icon: Cloud, label: "AWS / Azure" },
]

const outputs = [
  { icon: BarChart3, label: "Power BI" },
  { icon: Workflow, label: "ML Features" },
  { icon: Layers, label: "Warehouse" },
]

export function NodeGraph() {
  return (
    <div className="relative rounded-2xl border border-white/20 bg-white/10 backdrop-blur-xl p-6 shadow-2xl">
      <div className="mb-5 flex items-center justify-between border-b border-white/10 pb-3">
        <span className="text-xs uppercase tracking-widest text-zinc-300">Data Flow</span>
        <div className="flex items-center gap-1.5">
          <span className="size-2 rounded-full bg-zinc-400/50" />
          <span className="size-2 rounded-full bg-zinc-400/50" />
          <span className="size-2 rounded-full bg-emerald-400" />
        </div>
      </div>

      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
        {/* sources */}
        <div className="flex flex-col gap-3">
          {sources.map((s) => (
            <div
              key={s.label}
              className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 backdrop-blur-sm"
            >
              <s.icon className="size-4 text-zinc-300" />
              <span className="text-xs font-medium text-zinc-200">{s.label}</span>
            </div>
          ))}
        </div>

        {/* connectors + core */}
        <div className="flex flex-col items-center gap-2">
          <div aria-hidden="true" className="text-zinc-400/40">
            <svg width="40" height="80" viewBox="0 0 40 80" fill="none">
              <path d="M0 13 H20 V40" stroke="currentColor" strokeWidth="1" />
              <path d="M0 40 H40" stroke="currentColor" strokeWidth="1" />
              <path d="M0 67 H20 V40" stroke="currentColor" strokeWidth="1" />
              <circle cx="40" cy="40" r="2.5" className="fill-emerald-400" />
            </svg>
          </div>
        </div>

        {/* core */}
        <div className="flex flex-col gap-3">
          {outputs.map((o) => (
            <div
              key={o.label}
              className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 backdrop-blur-sm"
            >
              <o.icon className="size-4 text-zinc-300" />
              <span className="text-xs font-medium text-zinc-200">{o.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 flex items-center justify-center">
        <div className="inline-flex items-center gap-2 rounded-lg border border-emerald-400/30 bg-emerald-400/10 px-4 py-2.5 backdrop-blur-sm">
          <span className="size-2 rounded-full bg-emerald-400" />
          <span className="text-sm font-semibold tracking-tight text-emerald-300">OneLake Core</span>
        </div>
      </div>

      <p className="mt-3 text-center text-[11px] uppercase tracking-wider text-zinc-400">
        raw ingest &middot; transform &middot; unified semantic layer
      </p>
    </div>
  )
}
