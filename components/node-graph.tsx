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
    <div className="relative rounded-none border border-zinc-800 bg-zinc-950 p-6">
      <div className="mb-4 flex items-center justify-between border-b border-zinc-800 pb-3">
        <span className="font-mono text-xs text-zinc-500">data_flow.diagram</span>
        <div className="flex items-center gap-1.5">
          <span className="size-2 rounded-none bg-zinc-700" />
          <span className="size-2 rounded-none bg-zinc-700" />
          <span className="size-2 rounded-none bg-cyan-400/60" />
        </div>
      </div>

      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
        {/* sources */}
        <div className="flex flex-col gap-3">
          {sources.map((s) => (
            <div
              key={s.label}
              className="flex items-center gap-2 rounded-none border border-zinc-800 bg-black px-3 py-2"
            >
              <s.icon className="size-4 text-zinc-400" />
              <span className="font-mono text-xs text-zinc-400">{s.label}</span>
            </div>
          ))}
        </div>

        {/* connectors + core */}
        <div className="flex flex-col items-center gap-2">
          <div aria-hidden="true" className="text-zinc-700">
            <svg width="40" height="80" viewBox="0 0 40 80" fill="none">
              <path d="M0 13 H20 V40" stroke="currentColor" strokeWidth="1" />
              <path d="M0 40 H40" stroke="currentColor" strokeWidth="1" />
              <path d="M0 67 H20 V40" stroke="currentColor" strokeWidth="1" />
              <circle cx="40" cy="40" r="2.5" className="fill-cyan-400" />
            </svg>
          </div>
        </div>

        {/* core */}
        <div className="flex flex-col gap-3">
          {outputs.map((o) => (
            <div
              key={o.label}
              className="flex items-center gap-2 rounded-none border border-zinc-800 bg-black px-3 py-2"
            >
              <o.icon className="size-4 text-zinc-400" />
              <span className="font-mono text-xs text-zinc-400">{o.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5 flex items-center justify-center">
        <div className="inline-flex items-center gap-2 rounded-none border border-cyan-400/30 bg-cyan-400/10 px-4 py-2.5">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-none bg-cyan-400 opacity-75" />
            <span className="relative inline-flex size-2 rounded-none bg-cyan-400" />
          </span>
          <span className="font-mono text-sm font-semibold tracking-tight text-cyan-400">OneLake Core</span>
        </div>
      </div>

      <p className="mt-3 text-center font-mono text-[11px] text-zinc-600">
        raw_ingest {"->"} transform {"->"} unified_semantic_layer
      </p>
    </div>
  )
}
