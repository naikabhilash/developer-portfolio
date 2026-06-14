"use client"

import { useEffect, useState } from "react"
import {
  Filter,
  GitFork,
  TrendingUp,
  Radio,
  FileSpreadsheet,
  Network,
  ShieldCheck,
  Satellite,
  type LucideIcon,
} from "lucide-react"
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  AreaChart,
  Area,
  ComposedChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts"

/* -------------------------------------------------------------------------- */
/*                              Accent Palette                                */
/* -------------------------------------------------------------------------- */

const accents = {
  emerald: { text: "text-emerald-400", stroke: "#34d399", fill: "rgba(52,211,153,0.5)", bar: "bg-emerald-500/50" },
  sky: { text: "text-sky-400", stroke: "#38bdf8", fill: "rgba(56,189,248,0.5)", bar: "bg-sky-500/50" },
  teal: { text: "text-teal-400", stroke: "#2dd4bf", fill: "rgba(45,212,191,0.5)", bar: "bg-teal-500/50" },
  amber: { text: "text-amber-400", stroke: "#fbbf24", fill: "rgba(251,191,36,0.5)", bar: "bg-amber-500/50" },
} as const

type Accent = keyof typeof accents

/* -------------------------------------------------------------------------- */
/*                          Shared Dashboard Primitives                       */
/* -------------------------------------------------------------------------- */

function StatTile({ label, value, sub, accent = "emerald" }: { label: string; value: string; sub?: string; accent?: Accent }) {
  return (
    <div className="flex flex-col gap-0.5 border border-zinc-800 bg-zinc-900/40 px-2.5 py-2">
      <span className="font-mono text-[8.5px] uppercase tracking-wider text-zinc-500">{label}</span>
      <span className={`font-mono text-sm font-semibold leading-none tabular-nums ${accents[accent].text}`}>{value}</span>
      {sub && <span className="font-mono text-[8.5px] uppercase tracking-wider text-zinc-600">{sub}</span>}
    </div>
  )
}

function StatRow({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-3 gap-2">{children}</div>
}

function Panel({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <span className="font-mono text-[9px] uppercase tracking-wider text-zinc-500">{label}</span>
      {children}
    </div>
  )
}

function CardFrame({
  icon: Icon,
  title,
  metric,
  summary,
  children,
}: {
  icon: LucideIcon
  title: string
  metric: string
  summary: string
  children: React.ReactNode
}) {
  return (
    <div className="group flex flex-col gap-4 border border-zinc-800 bg-zinc-950/40 p-5 transition-colors duration-200 hover:border-zinc-700">
      <div className="flex items-start gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center border border-zinc-800 bg-zinc-900/60 text-zinc-400 transition-colors duration-200 group-hover:text-emerald-400">
          <Icon className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
        </div>
        <h4 className="text-balance pt-1 font-semibold leading-snug text-zinc-50">{title}</h4>
      </div>

      <div className="flex min-h-0 flex-col gap-4">{children}</div>

      <p className="border-t border-zinc-800/80 pt-3 text-[12px] leading-relaxed text-zinc-400">{summary}</p>

      <div className="mt-auto pt-1">
        <span className="inline-flex items-center border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 font-mono text-[10px] font-medium uppercase tracking-widest text-emerald-400">
          {metric}
        </span>
      </div>
    </div>
  )
}

const chartTooltip = {
  contentStyle: {
    background: "#09090b",
    border: "1px solid #27272a",
    borderRadius: 0,
    fontSize: 11,
    fontFamily: "var(--font-mono)",
    color: "#e4e4e7",
  },
  labelStyle: { color: "#71717a" },
  itemStyle: { color: "#34d399" },
  cursor: { fill: "rgba(52,211,153,0.06)" },
}

/* -------------------------------------------------------------------------- */
/*                       01.1 — Conversion Funnel Mapping                     */
/* -------------------------------------------------------------------------- */

const funnelStages = [
  { label: "Traffic", pct: 100, drop: "0ms", note: "Ingestion" },
  { label: "Lead", pct: 64, drop: "+38ms", note: "Enriched" },
  { label: "Test Ride", pct: 32, drop: "+52ms", note: "Active" },
  { label: "Purchase", pct: 12, drop: "+71ms", note: "Converted" },
]

const funnelTrend = [
  { d: "W1", cr: 9 },
  { d: "W2", cr: 10 },
  { d: "W3", cr: 11 },
  { d: "W4", cr: 10 },
  { d: "W5", cr: 12 },
  { d: "W6", cr: 12 },
]

function FunnelWidget() {
  return (
    <>
      <StatRow>
        <StatTile label="Visit → Buy" value="12.0%" sub="+1.4 pts" />
        <StatTile label="Lead Rate" value="64%" sub="stage 02" accent="sky" />
        <StatTile label="Drop-off" value="88%" sub="leakage" accent="amber" />
      </StatRow>

      <Panel label="Stage Conversion">
        <div className="flex flex-col gap-2.5">
          {funnelStages.map((s, i) => (
            <div key={s.label} className="group/stage relative">
              <div className="mb-1 flex items-center justify-between font-mono text-[10px] uppercase tracking-wider">
                <span className="text-zinc-400">{s.label}</span>
                <span className="text-emerald-400">{s.pct}%</span>
              </div>
              <div className="h-3 w-full border border-zinc-800 bg-zinc-900/60 transition-colors duration-200 group-hover/stage:border-emerald-500/30">
                <div className="h-full bg-emerald-500/40 transition-all duration-500" style={{ width: `${s.pct}%` }} />
              </div>
              <div className="pointer-events-none absolute -top-1 right-0 z-10 translate-y-[-100%] border border-emerald-500/30 bg-zinc-950 px-2 py-1 font-mono text-[9px] uppercase tracking-wider text-emerald-400 opacity-0 transition-opacity duration-150 group-hover/stage:opacity-100">
                {s.note} // drop-off {s.drop}
              </div>
              {i < funnelStages.length - 1 && <div className="mx-auto mt-1 h-1.5 w-px bg-zinc-800" />}
            </div>
          ))}
        </div>
      </Panel>

      <Panel label="6-Week Conversion Trend">
        <div className="h-[60px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={funnelTrend} margin={{ left: 0, right: 0, top: 4, bottom: 0 }}>
              <defs>
                <linearGradient id="funnelFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#34d399" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="#34d399" stopOpacity={0} />
                </linearGradient>
              </defs>
              <Tooltip {...chartTooltip} formatter={(v: number) => [`${v}%`, "CR"]} />
              <Area type="monotone" dataKey="cr" stroke="#34d399" strokeWidth={2} fill="url(#funnelFill)" animationDuration={600} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Panel>
    </>
  )
}

/* -------------------------------------------------------------------------- */
/*                     01.2 — Multi-Touch Attribution Engine                  */
/* -------------------------------------------------------------------------- */

const mtaData = {
  "First-Touch": [
    { channel: "Paid Search", weight: 46 },
    { channel: "Social", weight: 28 },
    { channel: "Email", weight: 14 },
    { channel: "Direct", weight: 12 },
  ],
  "Last-Touch": [
    { channel: "Paid Search", weight: 19 },
    { channel: "Social", weight: 17 },
    { channel: "Email", weight: 31 },
    { channel: "Direct", weight: 33 },
  ],
}

function MtaWidget() {
  const [mode, setMode] = useState<keyof typeof mtaData>("First-Touch")
  return (
    <>
      <StatRow>
        <StatTile label="Blended ROAS" value="4.2x" sub="+0.6x" accent="sky" />
        <StatTile label="Touchpoints" value="6.8" sub="per convert" />
        <StatTile label="Model" value="Markov" sub="data-driven" accent="amber" />
      </StatRow>

      <Panel label="Channel Credit Allocation">
        <div className="flex flex-col gap-3">
          <div className="flex border border-zinc-800 font-mono text-[10px] uppercase tracking-wider">
            {(Object.keys(mtaData) as (keyof typeof mtaData)[]).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setMode(m)}
                className={`flex-1 px-2 py-1.5 transition-colors duration-150 ${
                  mode === m ? "bg-sky-500/10 text-sky-400" : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                [ {m} ]
              </button>
            ))}
          </div>
          <div className="h-[120px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mtaData[mode]} layout="vertical" margin={{ left: 0, right: 8, top: 0, bottom: 0 }}>
                <CartesianGrid horizontal={false} stroke="#27272a" />
                <XAxis type="number" hide domain={[0, 50]} />
                <YAxis
                  type="category"
                  dataKey="channel"
                  width={74}
                  tick={{ fill: "#a1a1aa", fontSize: 9, fontFamily: "var(--font-mono)" }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip {...chartTooltip} formatter={(v: number) => [`${v}%`, "Credit"]} itemStyle={{ color: "#38bdf8" }} />
                <Bar dataKey="weight" radius={0} animationDuration={500}>
                  {mtaData[mode].map((_, i) => (
                    <Cell key={i} fill="rgba(56,189,248,0.55)" />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </Panel>
    </>
  )
}

/* -------------------------------------------------------------------------- */
/*                     01.3 — Customer Lifetime Value Stream                  */
/* -------------------------------------------------------------------------- */

const clvData = [
  { m: "M0", actual: 120, forecast: 120 },
  { m: "M3", actual: 210, forecast: 230 },
  { m: "M6", actual: 320, forecast: 360 },
  { m: "M9", actual: 430, forecast: 510 },
  { m: "M12", actual: 560, forecast: 690 },
  { m: "M18", actual: 690, forecast: 920 },
  { m: "M24", actual: 810, forecast: 1180 },
]

const clvCohorts = [
  { c: "2023-Q1", v: 92 },
  { c: "2023-Q3", v: 78 },
  { c: "2024-Q1", v: 64 },
  { c: "2024-Q3", v: 51 },
]

function ClvWidget() {
  return (
    <>
      <StatRow>
        <StatTile label="24-Mo CLV" value="$1.18K" sub="predicted" />
        <StatTile label="Retention" value="47%" sub="@ M24" accent="teal" />
        <StatTile label="Payback" value="4.1mo" sub="CAC ratio" accent="amber" />
      </StatRow>

      <Panel label="Cumulative Value · Observed vs Forecast">
        <div className="h-[120px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={clvData} margin={{ left: -28, right: 6, top: 6, bottom: 0 }}>
              <defs>
                <linearGradient id="clvFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#34d399" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="#34d399" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="#27272a" vertical={false} />
              <XAxis dataKey="m" tick={{ fill: "#71717a", fontSize: 9, fontFamily: "var(--font-mono)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#52525b", fontSize: 9, fontFamily: "var(--font-mono)" }} axisLine={false} tickLine={false} />
              <Tooltip {...chartTooltip} />
              <Area type="monotone" dataKey="forecast" stroke="#52525b" strokeWidth={1} strokeDasharray="3 3" fill="none" animationDuration={700} />
              <Area type="monotone" dataKey="actual" stroke="#34d399" strokeWidth={2} fill="url(#clvFill)" animationDuration={700} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="flex items-center justify-between font-mono text-[9px] uppercase tracking-wider text-zinc-500">
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-px w-3 bg-emerald-400" /> Observed
          </span>
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-px w-3 border-t border-dashed border-zinc-500" /> ML Forecast
          </span>
        </div>
      </Panel>

      <Panel label="Cohort Health Index">
        <div className="flex flex-col gap-1.5">
          {clvCohorts.map((c) => (
            <div key={c.c} className="flex items-center gap-2 font-mono text-[9px]">
              <span className="w-16 shrink-0 uppercase tracking-wider text-zinc-500">{c.c}</span>
              <div className="h-1.5 flex-1 bg-zinc-900">
                <div className="h-full bg-teal-500/50 transition-all duration-500" style={{ width: `${c.v}%` }} />
              </div>
              <span className="w-8 text-right text-teal-400">{c.v}</span>
            </div>
          ))}
        </div>
      </Panel>
    </>
  )
}

/* -------------------------------------------------------------------------- */
/*                  01.4 — Optimized Campaign Infrastructure                  */
/* -------------------------------------------------------------------------- */

const campaignSeed = [
  { id: "CAMP_WELCOME_Q1", cu: 0.2 },
  { id: "CAMP_PROMO_EMEA", cu: 0.3 },
  { id: "CAMP_REENGAGE_NA", cu: 0.2 },
  { id: "CAMP_VIP_LAUNCH", cu: 0.4 },
]

function CampaignWidget() {
  const [bars, setBars] = useState(() => campaignSeed.map(() => 40 + Math.random() * 40))
  useEffect(() => {
    const t = setInterval(() => {
      setBars(campaignSeed.map(() => 30 + Math.random() * 60))
    }, 1100)
    return () => clearInterval(t)
  }, [])
  return (
    <>
      <StatRow>
        <StatTile label="Rev / Send" value="$0.42" sub="+11%" accent="amber" />
        <StatTile label="Deliverability" value="99.2%" sub="inbox rate" />
        <StatTile label="Open Rate" value="38%" sub="+3 pts" accent="sky" />
      </StatRow>

      <Panel label="Live Throughput · Compute Units / Send">
        <div className="flex flex-col divide-y divide-zinc-800 border border-zinc-800">
          {campaignSeed.map((c, i) => (
            <div key={c.id} className="flex flex-col gap-1.5 px-3 py-2">
              <div className="flex items-center justify-between font-mono text-[10px]">
                <span className="text-zinc-300">{c.id}</span>
                <span className="text-amber-400">{c.cu} CU // Optimal</span>
              </div>
              <div className="h-1.5 w-full bg-zinc-900">
                <div className="h-full bg-amber-500/50 transition-all duration-1000 ease-out" style={{ width: `${bars[i]}%` }} />
              </div>
            </div>
          ))}
        </div>
      </Panel>
    </>
  )
}

/* -------------------------------------------------------------------------- */
/*                       02.1 — Automated P&L Reporting                       */
/* -------------------------------------------------------------------------- */

const pnlRows = [
  { item: "Gross Revenue", val: "$4.82M", delta: "+4.2%", up: true, spark: [4, 6, 5, 7, 8, 7, 9] },
  { item: "COGS", val: "$1.91M", delta: "-1.8%", up: true, spark: [6, 5, 6, 4, 5, 4, 4] },
  { item: "Gross Profit", val: "$2.91M", delta: "+6.1%", up: true, spark: [3, 4, 5, 5, 6, 7, 8] },
  { item: "OpEx", val: "$1.34M", delta: "+2.3%", up: false, spark: [4, 5, 4, 6, 5, 6, 6] },
  { item: "Net Income", val: "$1.57M", delta: "+9.4%", up: true, spark: [2, 3, 4, 4, 6, 7, 9] },
]

function Spark({ data, up }: { data: number[]; up: boolean }) {
  const max = Math.max(...data)
  const pts = data.map((d, i) => `${(i / (data.length - 1)) * 100},${20 - (d / max) * 18}`).join(" ")
  return (
    <svg viewBox="0 0 100 20" preserveAspectRatio="none" className="h-4 w-14" aria-hidden="true">
      <polyline points={pts} fill="none" stroke={up ? "#34d399" : "#f87171"} strokeWidth={1.5} />
    </svg>
  )
}

function PnlWidget() {
  return (
    <>
      <StatRow>
        <StatTile label="Net Margin" value="32.6%" sub="+1.9 pts" />
        <StatTile label="Close Cycle" value="2.1d" sub="-3.4d" accent="sky" />
        <StatTile label="Variance" value="0.4%" sub="vs budget" accent="amber" />
      </StatRow>

      <Panel label="Consolidated Statement · MoM">
        <div className="flex flex-col divide-y divide-zinc-800 border border-zinc-800 font-mono text-[10px]">
          {pnlRows.map((r) => (
            <div key={r.item} className="grid grid-cols-[1fr_auto_auto_auto] items-center gap-3 px-3 py-2">
              <span className="truncate uppercase tracking-wider text-zinc-400">{r.item}</span>
              <Spark data={r.spark} up={r.up} />
              <span className="tabular-nums text-zinc-200">{r.val}</span>
              <span className={`tabular-nums ${r.up ? "text-emerald-400" : "text-red-400"}`}>{r.delta}</span>
            </div>
          ))}
        </div>
      </Panel>
    </>
  )
}

/* -------------------------------------------------------------------------- */
/*                   02.2 — Global Sales Intelligence Matrix                  */
/* -------------------------------------------------------------------------- */

const crumbs = ["Global", "EMEA", "DACH", "SKU_4060"]
const salesData = [
  { q: "Q1", actual: 320, target: 300 },
  { q: "Q2", actual: 410, target: 380 },
  { q: "Q3", actual: 360, target: 420 },
  { q: "Q4", actual: 480, target: 460 },
]
const regionSplit = [
  { r: "EMEA", v: 41 },
  { r: "AMER", v: 34 },
  { r: "APAC", v: 25 },
]

function SalesWidget() {
  const [active, setActive] = useState(crumbs.length - 1)
  return (
    <>
      <StatRow>
        <StatTile label="Quota Attain" value="104%" sub="+9 pts" accent="sky" />
        <StatTile label="YoY Growth" value="+18%" sub="constant FX" />
        <StatTile label="Pipeline" value="$8.4M" sub="weighted" accent="amber" />
      </StatRow>

      <Panel label="Drill-Down · Actuals vs Target">
        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap items-center gap-1 font-mono text-[10px] uppercase tracking-wider">
            {crumbs.map((c, i) => (
              <span key={c} className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setActive(i)}
                  className={`transition-colors duration-150 ${i === active ? "text-sky-400" : "text-zinc-500 hover:text-zinc-300"}`}
                >
                  {c}
                </button>
                {i < crumbs.length - 1 && <span className="text-zinc-700">{"➔"}</span>}
              </span>
            ))}
          </div>
          <div className="h-[120px]">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={salesData} margin={{ left: -28, right: 6, top: 6, bottom: 0 }}>
                <CartesianGrid stroke="#27272a" vertical={false} />
                <XAxis dataKey="q" tick={{ fill: "#71717a", fontSize: 9, fontFamily: "var(--font-mono)" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#52525b", fontSize: 9, fontFamily: "var(--font-mono)" }} axisLine={false} tickLine={false} />
                <Tooltip {...chartTooltip} itemStyle={{ color: "#38bdf8" }} />
                <Bar dataKey="actual" fill="rgba(56,189,248,0.5)" radius={0} animationDuration={500} />
                <Line type="monotone" dataKey="target" stroke="#a1a1aa" strokeWidth={1.5} strokeDasharray="4 3" dot={false} animationDuration={600} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>
      </Panel>

      <Panel label="Revenue by Region">
        <div className="flex flex-col gap-1.5">
          {regionSplit.map((r) => (
            <div key={r.r} className="flex items-center gap-2 font-mono text-[9px]">
              <span className="w-12 shrink-0 uppercase tracking-wider text-zinc-500">{r.r}</span>
              <div className="h-1.5 flex-1 bg-zinc-900">
                <div className="h-full bg-sky-500/50 transition-all duration-500" style={{ width: `${r.v}%` }} />
              </div>
              <span className="w-8 text-right text-sky-400">{r.v}%</span>
            </div>
          ))}
        </div>
      </Panel>
    </>
  )
}

/* -------------------------------------------------------------------------- */
/*                  02.3 — Master Data Management Resolution                  */
/* -------------------------------------------------------------------------- */

function MdmWidget() {
  return (
    <>
      <StatRow>
        <StatTile label="Golden Records" value="2.4M" sub="mastered" accent="teal" />
        <StatTile label="Match Conf." value="99.4%" sub="survivorship" />
        <StatTile label="Dupes Purged" value="184K" sub="this run" accent="amber" />
      </StatRow>

      <Panel label="Entity Resolution Graph">
        <svg viewBox="0 0 240 110" className="h-[120px] w-full" aria-hidden="true">
          <g>
            <rect x="2" y="6" width="92" height="34" fill="#18181b" stroke="#27272a" />
            <text x="8" y="20" fill="#a1a1aa" fontSize="7" fontFamily="var(--font-mono)">Vendor_Source_A</text>
            <text x="8" y="31" fill="#52525b" fontSize="6.5" fontFamily="var(--font-mono)">Dr. J. Smith · NPI 4421</text>
          </g>
          <g>
            <rect x="2" y="70" width="92" height="34" fill="#18181b" stroke="#27272a" />
            <text x="8" y="84" fill="#a1a1aa" fontSize="7" fontFamily="var(--font-mono)">Vendor_Source_B</text>
            <text x="8" y="95" fill="#52525b" fontSize="6.5" fontFamily="var(--font-mono)">John Smith MD · 04421</text>
          </g>
          <path d="M94 23 C150 23 150 55 176 55" fill="none" stroke="#2dd4bf" strokeWidth="1.25" strokeDasharray="4 4" opacity="0.7">
            <animate attributeName="stroke-dashoffset" from="16" to="0" dur="0.9s" repeatCount="indefinite" />
          </path>
          <path d="M94 87 C150 87 150 55 176 55" fill="none" stroke="#2dd4bf" strokeWidth="1.25" strokeDasharray="4 4" opacity="0.7">
            <animate attributeName="stroke-dashoffset" from="16" to="0" dur="0.9s" repeatCount="indefinite" />
          </path>
          <circle cx="190" cy="55" r="13" fill="rgba(45,212,191,0.12)" stroke="#2dd4bf" strokeWidth="1.25">
            <animate attributeName="r" values="12;14;12" dur="1.8s" repeatCount="indefinite" />
          </circle>
          <path d="M185 55 l3 3 l6 -7" fill="none" stroke="#2dd4bf" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <div className="border border-teal-500/20 bg-teal-500/10 px-2.5 py-1.5 text-center font-mono text-[9px] uppercase tracking-wider text-teal-400">
          [ Single Source of Truth Verified // Match Confidence: 99.4% ]
        </div>
      </Panel>
    </>
  )
}

/* -------------------------------------------------------------------------- */
/*                  02.4 — Supply Chain Telemetry & Logistics                 */
/* -------------------------------------------------------------------------- */

const routeNodes = [
  { x: 24, y: 30, label: "Satellite Ingestion" },
  { x: 120, y: 78, label: "Port Transit" },
  { x: 216, y: 38, label: "Warehouse Router" },
]

function SupplyWidget() {
  const [log, setLog] = useState<string[]>([
    "LAT 51.5074 // LON -0.1278 // OK",
    "LAT 48.8566 // LON 2.3522 // OK",
  ])
  useEffect(() => {
    const t = setInterval(() => {
      const lat = (Math.random() * 80 - 20).toFixed(4)
      const lon = (Math.random() * 200 - 100).toFixed(4)
      setLog((prev) => [`LAT ${lat} // LON ${lon} // OK`, ...prev].slice(0, 3))
    }, 1500)
    return () => clearInterval(t)
  }, [])
  return (
    <>
      <StatRow>
        <StatTile label="In-Transit" value="1,204" sub="shipments" accent="teal" />
        <StatTile label="On-Time" value="96.8%" sub="+2.1 pts" />
        <StatTile label="Active Nodes" value="38" sub="global" accent="amber" />
      </StatRow>

      <Panel label="Logistics Mesh · Live Tracking">
        <div className="relative border border-zinc-800 bg-zinc-950">
          <svg viewBox="0 0 240 100" className="h-[110px] w-full" aria-hidden="true">
            {Array.from({ length: 9 }).map((_, i) => (
              <line key={`v${i}`} x1={i * 30} y1="0" x2={i * 30} y2="100" stroke="#18181b" strokeWidth="0.5" />
            ))}
            {Array.from({ length: 5 }).map((_, i) => (
              <line key={`h${i}`} x1="0" y1={i * 25} x2="240" y2={i * 25} stroke="#18181b" strokeWidth="0.5" />
            ))}
            <path
              id="route"
              d={`M${routeNodes[0].x} ${routeNodes[0].y} L${routeNodes[1].x} ${routeNodes[1].y} L${routeNodes[2].x} ${routeNodes[2].y}`}
              fill="none"
              stroke="#2dd4bf"
              strokeWidth="1"
              strokeDasharray="3 3"
              opacity="0.5"
            />
            {routeNodes.map((n) => (
              <g key={n.label}>
                <circle cx={n.x} cy={n.y} r="3" fill="#2dd4bf" />
                <text x={n.x} y={n.y - 6} fill="#71717a" fontSize="6" fontFamily="var(--font-mono)" textAnchor="middle">
                  {n.label}
                </text>
              </g>
            ))}
            <circle r="3.5" fill="#2dd4bf">
              <animateMotion dur="4s" repeatCount="indefinite" rotate="auto">
                <mpath href="#route" />
              </animateMotion>
            </circle>
            <circle r="6" fill="none" stroke="#2dd4bf" strokeWidth="1" opacity="0.5">
              <animate attributeName="r" values="4;9;4" dur="1.4s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.6;0;0.6" dur="1.4s" repeatCount="indefinite" />
              <animateMotion dur="4s" repeatCount="indefinite">
                <mpath href="#route" />
              </animateMotion>
            </circle>
          </svg>
        </div>
        <div className="flex flex-col gap-0.5 border border-zinc-800 bg-zinc-900/40 px-2.5 py-1.5 font-mono text-[9px] text-zinc-500">
          {log.map((l, i) => (
            <span key={`${l}-${i}`} className={i === 0 ? "text-teal-400" : ""}>
              {"> "}
              {l}
            </span>
          ))}
        </div>
      </Panel>
    </>
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
            Production-grade analytics frameworks rendered as live, interactive dashboards — each domain pairs KPI
            instrumentation with drill-down visuals and an operating summary.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-0">
          {/* Column 01 */}
          <div className="flex flex-col gap-6 lg:pr-10">
            <h3 className="font-mono text-xs font-medium uppercase tracking-widest text-zinc-300">
              01 // MARKETING ANALYTICS &amp; GROWTH
            </h3>
            <div className="grid grid-cols-1 gap-4">
              <CardFrame
                icon={Filter}
                title="Customer Funnel & Conversion Mapping"
                metric="CORE METRIC // Stage Conversion Rate"
                summary="Tracks every visitor from acquisition to purchase, surfacing the exact stage where intent decays. Pipeline ingestion latency is logged per step so engineering and growth share one source of truth, while the weekly trend confirms optimization lift is holding."
              >
                <FunnelWidget />
              </CardFrame>
              <CardFrame
                icon={GitFork}
                title="Multi-Touch Attribution Engines"
                metric="CORE METRIC // Channel-Weighted ROAS"
                summary="A data-driven Markov model redistributes conversion credit across the full journey rather than crowning a single touch. Toggling first- versus last-touch exposes how budget assumptions shift channel value, keeping spend aligned to incremental return."
              >
                <MtaWidget />
              </CardFrame>
              <CardFrame
                icon={TrendingUp}
                title="Customer Lifetime Value Streams"
                metric="CORE METRIC // Predicted 24-Mo CLV"
                summary="Cumulative observed value is projected against an ML forecast curve, with cohort health bars flagging which acquisition vintages are decaying. The result is a forward CLV-to-CAC payback signal that gates how aggressively growth can reinvest."
              >
                <ClvWidget />
              </CardFrame>
              <CardFrame
                icon={Radio}
                title="Optimized Campaign Infrastructure"
                metric="CORE METRIC // Revenue per Send"
                summary="Each campaign runs on a metered compute budget, streaming live throughput so cost-per-send stays optimal at scale. Deliverability and engagement KPIs sit beside spend, tying infrastructure efficiency directly to revenue outcomes."
              >
                <CampaignWidget />
              </CardFrame>
            </div>
          </div>

          {/* Column 02 */}
          <div className="flex flex-col gap-6 border-t border-zinc-800 pt-10 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
            <h3 className="font-mono text-xs font-medium uppercase tracking-widest text-zinc-300">
              02 // FINANCIAL INTELLIGENCE &amp; OPERATIONS
            </h3>
            <div className="grid grid-cols-1 gap-4">
              <CardFrame
                icon={FileSpreadsheet}
                title="Automated P&L Operational Reporting"
                metric="CORE METRIC // Close Cycle Time"
                summary="The consolidated statement refreshes automatically with month-over-month deltas and inline sparklines per line item. Variance-to-budget and a compressed close cycle let finance move from manual reconciliation to continuous, audit-ready reporting."
              >
                <PnlWidget />
              </CardFrame>
              <CardFrame
                icon={Network}
                title="Global Sales Intelligence & Forecasting"
                metric="CORE METRIC // Quota Attainment %"
                summary="A drill-down hierarchy moves from global down to individual SKU, comparing actuals against target while the regional split shows where growth concentrates. Quota attainment and weighted pipeline anchor the forecast in committed reality."
              >
                <SalesWidget />
              </CardFrame>
              <CardFrame
                icon={ShieldCheck}
                title="Healthcare & Pharma Master Data Management"
                metric="CORE METRIC // Match Confidence"
                summary="Conflicting vendor records are resolved through probabilistic matching and survivorship rules into a single golden record. High match confidence and aggressive duplicate purging keep regulated provider data clean, compliant, and reconciliation-ready."
              >
                <MdmWidget />
              </CardFrame>
              <CardFrame
                icon={Satellite}
                title="Global Supply Chain Telemetry & Logistics"
                metric="CORE METRIC // In-Transit Visibility"
                summary="Satellite and IoT feeds stream shipment coordinates across the logistics mesh in real time, mapping each node from ingestion to warehouse. On-time performance and in-transit counts give operations a live ETA and exception view across the network."
              >
                <SupplyWidget />
              </CardFrame>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
