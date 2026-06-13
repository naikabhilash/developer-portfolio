import { Database, FileCode2, Cloud, Workflow, BarChart3, Layers } from "lucide-react"
import { Badge } from "@/components/ui/badge"

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
    <div className="relative border border-zinc-200 bg-white p-6">
      <div className="mb-5 flex items-center justify-between border-b border-zinc-200 pb-3">
        <span className="text-xs uppercase tracking-widest text-zinc-400">Data Flow</span>
        <div className="flex items-center gap-1.5">
          <span className="size-2 rounded-full bg-zinc-200" />
          <span className="size-2 rounded-full bg-zinc-200" />
          <span className="size-2 rounded-full bg-blue-900" />
        </div>
      </div>

      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
        {/* sources */}
        <div className="flex flex-col gap-3">
          {sources.map((s) => (
            <div
              key={s.label}
              className="flex items-center gap-2 border border-zinc-200 bg-zinc-50 px-3 py-2"
            >
              <s.icon className="size-4 text-zinc-500" />
              <span className="text-xs font-medium text-zinc-600">{s.label}</span>
            </div>
          ))}
        </div>

        {/* connectors + core */}
        <div className="flex flex-col items-center gap-2">
          <div aria-hidden="true" className="text-zinc-300">
            <svg width="40" height="80" viewBox="0 0 40 80" fill="none">
              <path d="M0 13 H20 V40" stroke="currentColor" strokeWidth="1" />
              <path d="M0 40 H40" stroke="currentColor" strokeWidth="1" />
              <path d="M0 67 H20 V40" stroke="currentColor" strokeWidth="1" />
              <circle cx="40" cy="40" r="2.5" className="fill-blue-900" />
            </svg>
          </div>
        </div>

        {/* core */}
        <div className="flex flex-col gap-3">
          {outputs.map((o) => (
            <div
              key={o.label}
              className="flex items-center gap-2 border border-zinc-200 bg-zinc-50 px-3 py-2"
            >
              <o.icon className="size-4 text-zinc-500" />
              <span className="text-xs font-medium text-zinc-600">{o.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 flex items-center justify-center">
        <Badge className="gap-2 px-4 py-2.5">
          <span className="size-2 rounded-full bg-blue-900" />
          <span className="font-serif text-sm font-semibold tracking-tight text-blue-900">OneLake Core</span>
        </Badge>
      </div>

      <p className="mt-3 text-center text-[11px] uppercase tracking-wider text-zinc-400">
        raw ingest &middot; transform &middot; unified semantic layer
      </p>
    </div>
  )
}
