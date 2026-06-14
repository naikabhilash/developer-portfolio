"use client"

import { useEffect, useRef, useState } from "react"
import {
  GitMerge,
  BarChart3,
  Braces,
  Sliders,
  Play,
  Loader2,
  CheckCircle2,
  Cloud,
  Workflow,
  Database,
  PieChart as PieIcon,
  ArrowRight,
  Zap,
  AlertTriangle,
} from "lucide-react"
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from "recharts"

/* -------------------------------------------------------------------------- */
/*                              Console Shell                                 */
/* -------------------------------------------------------------------------- */

const tabs = [
  { key: "pipeline", label: "Pipeline Orchestrator", icon: GitMerge },
  { key: "analytics", label: "Financial Analytics Canvas", icon: BarChart3 },
  { key: "dbt", label: "dbt Schema Harmonization", icon: Braces },
  { key: "fabric", label: "Fabric Capacity Profiler", icon: Sliders },
] as const

type TabKey = (typeof tabs)[number]["key"]

export function Sandbox() {
  const [active, setActive] = useState<TabKey>("pipeline")

  return (
    <section id="sandbox" className="bg-zinc-950/50 backdrop-sm">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <div className="mb-12 flex flex-col gap-3">
          <span className="font-mono text-xs font-medium uppercase tracking-widest text-emerald-400">
            [ /sandbox ]
          </span>
          <h2 className="text-balance font-mono text-4xl font-medium tracking-tight text-zinc-100 md:text-5xl">
            System Simulation Console
          </h2>
          <p className="max-w-2xl text-pretty leading-relaxed text-zinc-400">
            Interactive simulations of the data platform primitives I build in production — pipeline orchestration,
            semantic analytics, schema harmonization, and capacity tuning.
          </p>
        </div>

        {/* Console window */}
        <div className="overflow-hidden border border-zinc-800 bg-zinc-900/40">
          {/* Title bar */}
          <div className="flex items-center gap-2 border-b border-zinc-800 bg-zinc-900/80 px-4 py-3">
            <span className="size-3 rounded-full bg-zinc-700" />
            <span className="size-3 rounded-full bg-zinc-700" />
            <span className="size-3 rounded-full bg-emerald-500/60" />
            <span className="ml-3 font-mono text-xs text-zinc-500">fabric-console — simulation@v0</span>
          </div>

          {/* Tab strip */}
          <div className="flex flex-wrap gap-px border-b border-zinc-800 bg-zinc-800">
            {tabs.map((t) => {
              const isActive = t.key === active
              return (
                <button
                  key={t.key}
                  type="button"
                  onClick={() => setActive(t.key)}
                  className={`inline-flex flex-1 items-center justify-center gap-2 px-4 py-3 font-mono text-xs font-medium transition-colors sm:text-sm ${
                    isActive
                      ? "bg-zinc-950 text-emerald-400"
                      : "bg-zinc-900 text-zinc-500 hover:bg-zinc-900/60 hover:text-zinc-300"
                  }`}
                >
                  <t.icon className="size-4 shrink-0" />
                  <span className="hidden sm:inline">{t.label}</span>
                </button>
              )
            })}
          </div>

          {/* Panel body */}
          <div className="bg-zinc-950 p-5 sm:p-8">
            {active === "pipeline" && <PipelineOrchestrator />}
            {active === "analytics" && <FinancialAnalytics />}
            {active === "dbt" && <DbtHarmonization />}
            {active === "fabric" && <FabricProfiler />}
          </div>
        </div>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------------- */
/*                          Tab 1: Pipeline Orchestrator                      */
/* -------------------------------------------------------------------------- */

const pipelineNodes = [
  { key: "salesforce", label: "Salesforce", sub: "Source CRM", icon: Cloud },
  { key: "dataflow", label: "Dataflow Gen2", sub: "Ingestion", icon: Workflow },
  { key: "delta", label: "Delta Lake", sub: "Lakehouse", icon: Database },
  { key: "powerbi", label: "Power BI Sync", sub: "Semantic", icon: PieIcon },
]

const pipelineLogs = [
  { node: 0, text: "[INFO] Authenticating Salesforce OAuth connector..." },
  { node: 0, text: "[SUCCESS] Connection established · 4 objects discovered." },
  { node: 1, text: "[INFO] Ingesting 1.2M rows via Dataflow Gen2..." },
  { node: 1, text: "[INFO] Staging to OneLake parquet shards (12 partitions)." },
  { node: 2, text: "[INFO] Merging into Delta Lake bronze layer..." },
  { node: 2, text: "[SUCCESS] Bronze layer write completed · 1,204,338 rows." },
  { node: 3, text: "[INFO] Refreshing Power BI semantic model..." },
  { node: 3, text: "[SUCCESS] Pipeline finished in 42.7s · 0 errors." },
]

function PipelineOrchestrator() {
  const [running, setRunning] = useState(false)
  const [activeNode, setActiveNode] = useState(-1)
  const [doneNodes, setDoneNodes] = useState<number[]>([])
  const [logs, setLogs] = useState<{ text: string; tone: "info" | "success" }[]>([])
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])
  const logEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [logs])

  useEffect(() => {
    return () => timers.current.forEach(clearTimeout)
  }, [])

  const trigger = () => {
    if (running) return
    timers.current.forEach(clearTimeout)
    timers.current = []
    setRunning(true)
    setActiveNode(-1)
    setDoneNodes([])
    setLogs([])

    pipelineLogs.forEach((log, i) => {
      const t = setTimeout(() => {
        setActiveNode(log.node)
        setDoneNodes((prev) => {
          const completed = pipelineLogs.slice(0, i).map((l) => l.node)
          return Array.from(new Set(completed.filter((n) => n < log.node)))
        })
        setLogs((prev) => [
          ...prev,
          { text: log.text, tone: log.text.includes("[SUCCESS]") ? "success" : "info" },
        ])
      }, 700 * (i + 1))
      timers.current.push(t)
    })

    const end = setTimeout(
      () => {
        setDoneNodes([0, 1, 2, 3])
        setActiveNode(-1)
        setRunning(false)
      },
      700 * (pipelineLogs.length + 1),
    )
    timers.current.push(end)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="max-w-md text-sm leading-relaxed text-zinc-400">
          Directed Acyclic Graph orchestrating a CRM-to-BI ingestion run across Microsoft Fabric.
        </p>
        <button
          type="button"
          onClick={trigger}
          disabled={running}
          className="inline-flex items-center gap-2 border border-emerald-500 bg-emerald-500/10 px-4 py-2 font-mono text-sm font-medium text-emerald-400 transition-colors hover:bg-emerald-500/20 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {running ? <Loader2 className="size-4 animate-spin" /> : <Play className="size-4" />}
          {running ? "Running..." : "[ Trigger Pipeline ]"}
        </button>
      </div>

      {/* DAG */}
      <div className="flex flex-col items-stretch gap-3 lg:flex-row lg:items-center">
        {pipelineNodes.map((node, i) => {
          const isActive = activeNode === i
          const isDone = doneNodes.includes(i)
          const lit = isActive || isDone
          return (
            <div key={node.key} className="flex flex-1 items-center gap-3 lg:flex-col">
              <div
                className={`flex w-full flex-col gap-2 border p-4 transition-all duration-300 ${
                  isActive
                    ? "animate-pulse border-emerald-400 bg-emerald-500/10 shadow-[0_0_20px_-4px] shadow-emerald-500/40"
                    : isDone
                      ? "border-emerald-500/60 bg-emerald-500/5"
                      : "border-zinc-800 bg-zinc-900/50"
                }`}
              >
                <div className="flex items-center justify-between">
                  <node.icon className={`size-5 ${lit ? "text-emerald-400" : "text-zinc-500"}`} />
                  {isDone && <CheckCircle2 className="size-4 text-emerald-400" />}
                  {isActive && <span className="size-2 animate-ping rounded-full bg-emerald-400" />}
                </div>
                <div>
                  <p className={`font-mono text-sm font-medium ${lit ? "text-zinc-50" : "text-zinc-300"}`}>
                    {node.label}
                  </p>
                  <p className="font-mono text-[11px] uppercase tracking-wider text-zinc-500">{node.sub}</p>
                </div>
              </div>
              {i < pipelineNodes.length - 1 && (
                <ArrowRight
                  className={`size-5 shrink-0 rotate-90 transition-colors lg:rotate-0 ${
                    doneNodes.includes(i) ? "text-emerald-400" : "text-zinc-700"
                  }`}
                />
              )}
            </div>
          )
        })}
      </div>

      {/* Terminal */}
      <div className="overflow-hidden border border-zinc-800 bg-black">
        <div className="flex items-center gap-2 border-b border-zinc-800 px-4 py-2">
          <span className="font-mono text-[11px] uppercase tracking-wider text-zinc-500">orchestration.log</span>
        </div>
        <div className="h-44 overflow-y-auto p-4 font-mono text-xs leading-relaxed">
          {logs.length === 0 ? (
            <p className="text-zinc-600">$ awaiting trigger...</p>
          ) : (
            logs.map((log, i) => (
              <p key={i} className={log.tone === "success" ? "text-emerald-400" : "text-zinc-400"}>
                <span className="text-zinc-600">$</span> {log.text}
              </p>
            ))
          )}
          <div ref={logEndRef} />
        </div>
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*                       Tab 2: Financial Analytics Canvas                    */
/* -------------------------------------------------------------------------- */

const regions = [
  {
    key: "global",
    label: "Global",
    revenue: "$48.2M",
    variance: "+6.4%",
    variancePositive: true,
    data: [
      { m: "Jan", actual: 32, forecast: 30 },
      { m: "Feb", actual: 35, forecast: 33 },
      { m: "Mar", actual: 38, forecast: 37 },
      { m: "Apr", actual: 41, forecast: 39 },
      { m: "May", actual: 44, forecast: 43 },
      { m: "Jun", actual: 48, forecast: 45 },
    ],
  },
  {
    key: "emea",
    label: "EMEA",
    revenue: "$18.9M",
    variance: "+3.1%",
    variancePositive: true,
    data: [
      { m: "Jan", actual: 12, forecast: 12 },
      { m: "Feb", actual: 13, forecast: 13 },
      { m: "Mar", actual: 15, forecast: 14 },
      { m: "Apr", actual: 16, forecast: 16 },
      { m: "May", actual: 17, forecast: 17 },
      { m: "Jun", actual: 19, forecast: 18 },
    ],
  },
  {
    key: "dach",
    label: "DACH",
    revenue: "$9.4M",
    variance: "-1.8%",
    variancePositive: false,
    data: [
      { m: "Jan", actual: 8, forecast: 8 },
      { m: "Feb", actual: 8.5, forecast: 9 },
      { m: "Mar", actual: 8.2, forecast: 9 },
      { m: "Apr", actual: 9, forecast: 9.4 },
      { m: "May", actual: 9.1, forecast: 9.6 },
      { m: "Jun", actual: 9.4, forecast: 9.8 },
    ],
  },
  {
    key: "printers",
    label: "Consumer Printers",
    revenue: "$5.7M",
    variance: "+11.2%",
    variancePositive: true,
    data: [
      { m: "Jan", actual: 3, forecast: 2.8 },
      { m: "Feb", actual: 3.4, forecast: 3 },
      { m: "Mar", actual: 4, forecast: 3.4 },
      { m: "Apr", actual: 4.6, forecast: 4 },
      { m: "May", actual: 5.2, forecast: 4.6 },
      { m: "Jun", actual: 5.7, forecast: 5 },
    ],
  },
]

function FinancialAnalytics() {
  const [region, setRegion] = useState(regions[0].key)
  const [flash, setFlash] = useState(false)
  const current = regions.find((r) => r.key === region)!

  const onChange = (val: string) => {
    setRegion(val)
    setFlash(true)
  }

  useEffect(() => {
    if (!flash) return
    const t = setTimeout(() => setFlash(false), 1200)
    return () => clearTimeout(t)
  }, [flash, region])

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="border border-zinc-800 bg-zinc-900/50 p-4">
            <p className="font-mono text-[11px] uppercase tracking-wider text-zinc-500">Revenue (YTD)</p>
            <p className="mt-1 font-mono text-2xl font-semibold text-zinc-50 tabular-nums">{current.revenue}</p>
          </div>
          <div className="border border-zinc-800 bg-zinc-900/50 p-4">
            <p className="font-mono text-[11px] uppercase tracking-wider text-zinc-500">Variance vs FCST</p>
            <p
              className={`mt-1 font-mono text-2xl font-semibold tabular-nums ${
                current.variancePositive ? "text-emerald-400" : "text-amber-400"
              }`}
            >
              {current.variance}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="region-select" className="font-mono text-[11px] uppercase tracking-wider text-zinc-500">
            Hierarchy
          </label>
          <select
            id="region-select"
            value={region}
            onChange={(e) => onChange(e.target.value)}
            className="border border-zinc-700 bg-zinc-900 px-3 py-2 font-mono text-sm text-zinc-100 outline-none transition-colors hover:border-zinc-500 focus:border-emerald-500"
          >
            {regions.map((r) => (
              <option key={r.key} value={r.key}>
                {r.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Latency badge */}
      <div className="flex items-center gap-3">
        <span
          className={`inline-flex items-center gap-2 border px-3 py-1.5 font-mono text-xs transition-all duration-300 ${
            flash
              ? "border-emerald-400 bg-emerald-500/10 text-emerald-300"
              : "border-zinc-800 bg-zinc-900/50 text-zinc-500"
          }`}
        >
          <Zap className={`size-3.5 ${flash ? "text-emerald-400" : "text-zinc-600"}`} />
          [ Query Latency: 12ms via Fact Aggregates ]
        </span>
        <span className="font-mono text-xs text-zinc-600">Actuals vs Forecast · {current.label}</span>
      </div>

      {/* Chart */}
      <div className="border border-zinc-800 bg-zinc-900/30 p-4">
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={current.data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
            <CartesianGrid stroke="#27272a" strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="m" stroke="#52525b" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="#52525b" fontSize={12} tickLine={false} axisLine={false} />
            <Tooltip
              contentStyle={{
                background: "#09090b",
                border: "1px solid #27272a",
                borderRadius: 0,
                fontFamily: "var(--font-mono)",
                fontSize: 12,
              }}
              labelStyle={{ color: "#a1a1aa" }}
              cursor={{ stroke: "#3f3f46" }}
            />
            <Line
              type="monotone"
              dataKey="forecast"
              name="Forecast"
              stroke="#52525b"
              strokeWidth={2}
              strokeDasharray="4 4"
              dot={false}
              isAnimationActive
              animationDuration={600}
            />
            <Line
              type="monotone"
              dataKey="actual"
              name="Actual"
              stroke="#34d399"
              strokeWidth={2.5}
              dot={{ r: 3, fill: "#34d399" }}
              isAnimationActive
              animationDuration={600}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*                      Tab 3: dbt Schema Harmonization                       */
/* -------------------------------------------------------------------------- */

const vendors = [
  {
    key: "veeva",
    label: "Veeva EDC",
    messy: `{
  "VID": "0011x000A",
  "acct_nm": "Mercy General",
  "type__c": "HCO",
  "stat": "actv",
  "lst_upd": "11/03/24"
}`,
  },
  {
    key: "iqvia",
    label: "IQVIA EDC",
    messy: `{
  "customer_id": "IQ-88213",
  "FullName": "mercy general hosp.",
  "EntityType": "Organization",
  "active_flag": 1,
  "modified": "2024-03-11T09:00Z"
}`,
  },
  {
    key: "reltio",
    label: "Reltio EDC",
    messy: `{
  "uri": "entities/9f2a",
  "attributes.Name": "Mercy Gen.",
  "category": "hco_record",
  "isActive": "TRUE",
  "updatedTime": 1709542800
}`,
  },
]

const unifiedSchema = `{
  "entity_id":      "UUID  (surrogate)",
  "entity_name":    "Mercy General Hospital",
  "entity_type":    "HCO",
  "is_active":       true,
  "source_system":  "<vendor>",
  "updated_at":     "2024-03-11T09:00:00Z"
}`

function DbtHarmonization() {
  const [vendor, setVendor] = useState(vendors[0].key)
  const [scrambling, setScrambling] = useState(false)
  const [confirmed, setConfirmed] = useState(true)
  const current = vendors.find((v) => v.key === vendor)!

  const switchVendor = (key: string) => {
    if (key === vendor) return
    setVendor(key)
    setScrambling(true)
    setConfirmed(false)
  }

  useEffect(() => {
    if (!scrambling) return
    const t1 = setTimeout(() => setScrambling(false), 650)
    const t2 = setTimeout(() => setConfirmed(true), 900)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [scrambling, vendor])

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="max-w-md text-sm leading-relaxed text-zinc-400">
          dbt models normalizing disparate EDC vendor payloads into one governed MDM relational schema.
        </p>
        <div className="flex flex-wrap gap-px border border-zinc-800 bg-zinc-800">
          {vendors.map((v) => (
            <button
              key={v.key}
              type="button"
              onClick={() => switchVendor(v.key)}
              className={`px-3 py-1.5 font-mono text-xs font-medium transition-colors ${
                v.key === vendor
                  ? "bg-zinc-950 text-emerald-400"
                  : "bg-zinc-900 text-zinc-500 hover:text-zinc-300"
              }`}
            >
              {v.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-px overflow-hidden border border-zinc-800 bg-zinc-800 lg:grid-cols-2">
        {/* Left: messy source */}
        <div className="bg-zinc-950">
          <div className="flex items-center justify-between border-b border-zinc-800 px-4 py-2">
            <span className="font-mono text-[11px] uppercase tracking-wider text-zinc-500">
              source · {current.label}
            </span>
            <span className="font-mono text-[11px] text-amber-400">unstandardized</span>
          </div>
          <pre
            className={`overflow-x-auto p-4 font-mono text-xs leading-relaxed text-zinc-400 transition-opacity duration-300 ${
              scrambling ? "opacity-30 blur-[1px]" : "opacity-100"
            }`}
          >
            {current.messy}
          </pre>
        </div>

        {/* Right: unified */}
        <div className="bg-zinc-950">
          <div className="flex items-center justify-between border-b border-zinc-800 px-4 py-2">
            <span className="font-mono text-[11px] uppercase tracking-wider text-zinc-500">
              dbt model · stg_hco_unified
            </span>
            <Braces className="size-3.5 text-emerald-400" />
          </div>
          <pre
            className={`overflow-x-auto p-4 font-mono text-xs leading-relaxed text-emerald-300/90 transition-opacity duration-300 ${
              scrambling ? "opacity-30 blur-[1px]" : "opacity-100"
            }`}
          >
            {unifiedSchema.replace("<vendor>", current.label)}
          </pre>
        </div>
      </div>

      {/* Confirmation */}
      <div className="flex items-center gap-2 font-mono text-xs">
        {scrambling ? (
          <span className="flex items-center gap-2 text-zinc-500">
            <Loader2 className="size-3.5 animate-spin" /> running dbt build...
          </span>
        ) : confirmed ? (
          <span className="flex items-center gap-2 text-emerald-400">
            <CheckCircle2 className="size-3.5" /> ✔ dbt_test_assertion: passed (0 anomalies)
          </span>
        ) : (
          <span className="text-zinc-600">awaiting assertion...</span>
        )}
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*                       Tab 4: Fabric Capacity Profiler                      */
/* -------------------------------------------------------------------------- */

const unoptimizedData = [
  { stage: "Ingest", cu: 42 },
  { stage: "Transform", cu: 68 },
  { stage: "Merge", cu: 55 },
  { stage: "Refresh", cu: 38 },
]

const optimizedData = [
  { stage: "Ingest", cu: 28 },
  { stage: "Transform", cu: 47 },
  { stage: "Merge", cu: 39 },
  { stage: "Refresh", cu: 27 },
]

function FabricProfiler() {
  const [optimized, setOptimized] = useState(false)
  const data = optimized ? optimizedData : unoptimizedData
  const totalUnopt = unoptimizedData.reduce((s, d) => s + d.cu, 0)
  const totalOpt = optimizedData.reduce((s, d) => s + d.cu, 0)
  const drop = Math.round(((totalUnopt - totalOpt) / totalUnopt) * 100)
  const current = data.reduce((s, d) => s + d.cu, 0)

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="max-w-md text-sm leading-relaxed text-zinc-400">
          Profiling compute capacity unit (CU) overhead across a workload lifecycle. Toggle the engine to refactor.
        </p>
      </div>

      {/* Slider toggle */}
      <div className="flex flex-col gap-3">
        <div className="grid grid-cols-2 gap-px overflow-hidden border border-zinc-800 bg-zinc-800">
          <button
            type="button"
            onClick={() => setOptimized(false)}
            className={`px-4 py-3 font-mono text-xs font-medium transition-colors sm:text-sm ${
              !optimized ? "bg-zinc-950 text-amber-400" : "bg-zinc-900 text-zinc-500 hover:text-zinc-300"
            }`}
          >
            [ Unoptimized: Dataflow Gen1 ]
          </button>
          <button
            type="button"
            onClick={() => setOptimized(true)}
            className={`px-4 py-3 font-mono text-xs font-medium transition-colors sm:text-sm ${
              optimized ? "bg-zinc-950 text-emerald-400" : "bg-zinc-900 text-zinc-500 hover:text-zinc-300"
            }`}
          >
            [ Optimized: Fabric Lakehouse + PySpark ]
          </button>
        </div>

        {/* track */}
        <div className="relative h-1 w-full bg-zinc-800">
          <div
            className={`absolute top-0 h-1 w-1/2 transition-all duration-500 ${
              optimized ? "left-1/2 bg-emerald-400" : "left-0 bg-amber-400"
            }`}
          />
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        <div className="border border-zinc-800 bg-zinc-900/50 p-4">
          <p className="font-mono text-[11px] uppercase tracking-wider text-zinc-500">Total CU Overhead</p>
          <p
            className={`mt-1 font-mono text-2xl font-semibold tabular-nums transition-colors ${
              optimized ? "text-emerald-400" : "text-amber-400"
            }`}
          >
            {current} CU
          </p>
        </div>
        <div className="border border-zinc-800 bg-zinc-900/50 p-4">
          <p className="font-mono text-[11px] uppercase tracking-wider text-zinc-500">Reduction</p>
          <p className="mt-1 font-mono text-2xl font-semibold tabular-nums text-emerald-400">
            {optimized ? `-${drop}%` : "0%"}
          </p>
        </div>
        <div className="col-span-2 border border-zinc-800 bg-zinc-900/50 p-4 sm:col-span-1">
          <p className="font-mono text-[11px] uppercase tracking-wider text-zinc-500">Lifecycle Status</p>
          <span
            className={`mt-2 inline-flex items-center gap-1.5 font-mono text-xs font-medium ${
              optimized ? "text-emerald-400" : "text-amber-400"
            }`}
          >
            {optimized ? <CheckCircle2 className="size-3.5" /> : <AlertTriangle className="size-3.5" />}
            {optimized ? "[ Optimal Compute Overhead ]" : "[ Capacity Warning ]"}
          </span>
        </div>
      </div>

      {/* Bar chart */}
      <div className="border border-zinc-800 bg-zinc-900/30 p-4">
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
            <CartesianGrid stroke="#27272a" strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="stage" stroke="#52525b" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="#52525b" fontSize={12} tickLine={false} axisLine={false} domain={[0, 80]} />
            <Tooltip
              contentStyle={{
                background: "#09090b",
                border: "1px solid #27272a",
                borderRadius: 0,
                fontFamily: "var(--font-mono)",
                fontSize: 12,
              }}
              labelStyle={{ color: "#a1a1aa" }}
              cursor={{ fill: "#18181b" }}
            />
            <Bar dataKey="cu" name="CU Overhead" radius={[2, 2, 0, 0]} isAnimationActive animationDuration={600}>
              {data.map((entry, i) => (
                <Cell key={i} fill={optimized ? "#34d399" : "#fbbf24"} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
