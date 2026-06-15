"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { 
  BarChart, Bar, AreaChart, Area, LineChart, Line, 
  RadialBarChart, RadialBar, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, Cell, Legend,
  FunnelChart, Funnel, LabelList
} from "recharts"

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

interface PnLRow {
  metric: string
  actual: number
  budget: number
  variance: number
}

interface SalesData {
  month: string
  actual: number
  forecast: number
}

interface MatchingAccuracy {
  name: string
  value: number
}

interface InventoryVelocity {
  hub: string
  velocity: number
}

// ============================================================================
// SLIDE 1: MULTI-TOUCH ATTRIBUTION DASHBOARD (AUTOMOTIVE)
// ============================================================================

type AttributionModel = "first-touch" | "last-touch" | "linear" | "w-shaped"
type ConversionGoal = "vehicle-sales" | "pa-revenue" | "rider-memberships"

interface ChannelData {
  channel: string
  spend: number
  vehicleSalesUnits: number
  paRevenue: number
  riderSignups: number
  attributedRevenue: Record<AttributionModel, number>
}

const CHANNEL_DATA: ChannelData[] = [
  {
    channel: "Website Configurator",
    spend: 4200000,
    vehicleSalesUnits: 1850,
    paRevenue: 8200000,
    riderSignups: 3200,
    attributedRevenue: { "first-touch": 38500000, "last-touch": 12800000, "linear": 26200000, "w-shaped": 32400000 },
  },
  {
    channel: "Events & Rallies",
    spend: 6800000,
    vehicleSalesUnits: 2400,
    paRevenue: 14500000,
    riderSignups: 5800,
    attributedRevenue: { "first-touch": 28000000, "last-touch": 18200000, "linear": 28500000, "w-shaped": 35200000 },
  },
  {
    channel: "Email Campaigns",
    spend: 1800000,
    vehicleSalesUnits: 900,
    paRevenue: 5400000,
    riderSignups: 2100,
    attributedRevenue: { "first-touch": 12200000, "last-touch": 14800000, "linear": 18500000, "w-shaped": 16800000 },
  },
  {
    channel: "Dealership Walk-ins",
    spend: 3200000,
    vehicleSalesUnits: 3100,
    paRevenue: 6800000,
    riderSignups: 1200,
    attributedRevenue: { "first-touch": 18000000, "last-touch": 52000000, "linear": 24200000, "w-shaped": 22400000 },
  },
  {
    channel: "Paid Search & Social",
    spend: 5500000,
    vehicleSalesUnits: 1400,
    paRevenue: 4200000,
    riderSignups: 2800,
    attributedRevenue: { "first-touch": 32000000, "last-touch": 28500000, "linear": 28600000, "w-shaped": 24200000 },
  },
  {
    channel: "Influencer Reviews",
    spend: 2100000,
    vehicleSalesUnits: 650,
    paRevenue: 3400000,
    riderSignups: 1900,
    attributedRevenue: { "first-touch": 13800000, "last-touch": 16200000, "linear": 16500000, "w-shaped": 11500000 },
  },
]

const MODEL_LABELS: Record<AttributionModel, string> = {
  "first-touch": "First-Touch",
  "last-touch": "Last-Touch",
  "linear": "Linear",
  "w-shaped": "W-Shaped (30/30/30)",
}

const GOAL_LABELS: Record<ConversionGoal, string> = {
  "vehicle-sales": "Vehicle Sales",
  "pa-revenue": "P&A Revenue",
  "rider-memberships": "Rider Memberships",
}

const FUNNEL_DATA: Record<ConversionGoal, { name: string; value: number; fill: string }[]> = {
  "vehicle-sales": [
    { name: "Website Configurator", value: 48000, fill: "#10b981" },
    { name: "Lead Nurturing (Email)", value: 32000, fill: "#059669" },
    { name: "Experiential (Events)", value: 18000, fill: "#047857" },
    { name: "Purchase (Showroom)", value: 9200, fill: "#065f46" },
  ],
  "pa-revenue": [
    { name: "Events & Rallies", value: 58000, fill: "#10b981" },
    { name: "Website Configurator", value: 34000, fill: "#059669" },
    { name: "Email Cross-Sell", value: 22000, fill: "#047857" },
    { name: "P&A Purchase", value: 14500, fill: "#065f46" },
  ],
  "rider-memberships": [
    { name: "Events & Rallies", value: 42000, fill: "#10b981" },
    { name: "Influencer Reviews", value: 28000, fill: "#059669" },
    { name: "Community Nurture", value: 16000, fill: "#047857" },
    { name: "Membership Signup", value: 11800, fill: "#065f46" },
  ],
}

const KPI_CARDS = [
  { label: "Attributed Revenue", value: "$142.5M", sub: "All Channels Combined" },
  { label: "Blended CAC", value: "$450", sub: "Customer Acquisition Cost" },
  { label: "Overall ROAS", value: "6.2x", sub: "Return on Ad Spend" },
  { label: "Cross-Sell Rate", value: "42%", sub: "Vehicle → P&A within 30d" },
]

const MTAExecutiveNarrative = () => (
  <div className="bg-zinc-900/60 border border-zinc-800 rounded-lg p-5 mb-4">
    <div className="flex items-center gap-2 mb-3">
      <div className="w-1 h-6 bg-emerald-500 rounded-full" />
      <span className="text-xs font-semibold uppercase tracking-widest text-emerald-400">Executive Insights</span>
    </div>
    <p className="text-sm leading-relaxed text-zinc-400">
      While Dealership Walk-ins historically claim 100% of conversion credit under legacy Last-Touch reporting, shifting to a multi-touch model reveals that experiential Marketing (Events & Rallies) and digital discovery (Website Configurator) touchpoints initiate over 60% of high-value buyer journeys. Furthermore, brand-hosted events act as the primary catalyst for high-margin Parts & Accessories (P&A) cross-selling and community Rider Group memberships.
    </p>
  </div>
)

const MTAKpiCards = () => (
  <div className="grid grid-cols-4 gap-3 mb-4">
    {KPI_CARDS.map((kpi) => (
      <div key={kpi.label} className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-4 flex flex-col justify-between">
        <div className="text-[10px] font-medium uppercase tracking-widest text-zinc-500">{kpi.label}</div>
        <div className="text-2xl font-semibold text-emerald-400 mt-2">{kpi.value}</div>
        <div className="text-[10px] text-zinc-600 mt-1">{kpi.sub}</div>
      </div>
    ))}
  </div>
)

const MTAModelSelector = ({ model, setModel }: { model: AttributionModel; setModel: (m: AttributionModel) => void }) => (
  <div className="flex items-center gap-2">
    <span className="text-[10px] uppercase tracking-widest text-zinc-500">Model:</span>
    <div className="flex gap-1">
      {(Object.keys(MODEL_LABELS) as AttributionModel[]).map((m) => (
        <button
          key={m}
          onClick={() => setModel(m)}
          className={`px-2.5 py-1 text-[10px] font-medium rounded border transition-all ${
            model === m
              ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
              : "bg-zinc-900 border-zinc-800 text-zinc-500 hover:text-zinc-300"
          }`}
        >
          {MODEL_LABELS[m]}
        </button>
      ))}
    </div>
  </div>
)

const MTAGoalSelector = ({ goal, setGoal }: { goal: ConversionGoal; setGoal: (g: ConversionGoal) => void }) => (
  <div className="flex items-center gap-2">
    <span className="text-[10px] uppercase tracking-widest text-zinc-500">Goal:</span>
    <div className="flex gap-1">
      {(Object.keys(GOAL_LABELS) as ConversionGoal[]).map((g) => (
        <button
          key={g}
          onClick={() => setGoal(g)}
          className={`px-2.5 py-1 text-[10px] font-medium rounded border transition-all ${
            goal === g
              ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
              : "bg-zinc-900 border-zinc-800 text-zinc-500 hover:text-zinc-300"
          }`}
        >
          {GOAL_LABELS[g]}
        </button>
      ))}
    </div>
  </div>
)

const MTARevenueChart = ({ model }: { model: AttributionModel }) => {
  const data = CHANNEL_DATA.map((ch) => ({
    channel: ch.channel.length > 14 ? ch.channel.slice(0, 14) + "…" : ch.channel,
    revenue: ch.attributedRevenue[model] / 1000000,
    spend: ch.spend / 1000000,
  }))

  return (
    <div className="h-52">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical" barCategoryGap="20%">
          <CartesianGrid strokeDasharray="3 3" stroke="#27272a" horizontal={false} />
          <XAxis
            type="number"
            tick={{ fill: "#71717a", fontSize: 9 }}
            axisLine={{ stroke: "#27272a" }}
            tickFormatter={(v: number) => `$${v}M`}
          />
          <YAxis
            type="category"
            dataKey="channel"
            tick={{ fill: "#a1a1aa", fontSize: 9 }}
            axisLine={{ stroke: "#27272a" }}
            width={110}
          />
          <Tooltip
            contentStyle={{ backgroundColor: "#09090b", border: "1px solid #27272a", borderRadius: "8px" }}
            itemStyle={{ color: "#a1a1aa" }}
            formatter={(value) => `$${Number(value).toFixed(1)}M`}
          />
          <Legend wrapperStyle={{ fontSize: "10px" }} />
          <Bar dataKey="revenue" name="Attributed Revenue" fill="#10b981" radius={[0, 4, 4, 0]} />
          <Bar dataKey="spend" name="Marketing Spend" fill="#3f3f46" radius={[0, 4, 4, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

const MTAFunnelChart = ({ goal }: { goal: ConversionGoal }) => (
  <div className="h-52">
    <ResponsiveContainer width="100%" height="100%">
      <FunnelChart>
        <Tooltip
          contentStyle={{ backgroundColor: "#09090b", border: "1px solid #27272a", borderRadius: "8px" }}
          itemStyle={{ color: "#a1a1aa" }}
        />
        <Funnel dataKey="value" data={FUNNEL_DATA[goal]} isAnimationActive>
          <LabelList position="right" fill="#a1a1aa" fontSize={10} dataKey="name" />
          <LabelList position="center" fill="#ffffff" fontSize={11} dataKey="value" formatter={(v) => Number(v).toLocaleString()} />
        </Funnel>
      </FunnelChart>
    </ResponsiveContainer>
  </div>
)

const MTATacticalTable = ({ model }: { model: AttributionModel }) => (
  <div className="overflow-x-auto">
    <table className="w-full text-xs">
      <thead>
        <tr className="border-b border-zinc-800">
          <th className="text-left py-2 px-2 text-zinc-500 font-medium">Channel Source</th>
          <th className="text-right py-2 px-2 text-zinc-500 font-medium">Spend</th>
          <th className="text-right py-2 px-2 text-zinc-500 font-medium">Vehicle Sales</th>
          <th className="text-right py-2 px-2 text-zinc-500 font-medium">P&A Revenue</th>
          <th className="text-right py-2 px-2 text-zinc-500 font-medium">Rider Signups</th>
          <th className="text-right py-2 px-2 text-zinc-500 font-medium">ROAS</th>
        </tr>
      </thead>
      <tbody>
        {CHANNEL_DATA.map((ch) => {
          const roas = (ch.attributedRevenue[model] / ch.spend).toFixed(1)
          return (
            <tr key={ch.channel} className="border-b border-zinc-800/50 hover:bg-zinc-900/50 transition-colors">
              <td className="py-2 px-2 text-zinc-300">{ch.channel}</td>
              <td className="py-2 px-2 text-right text-zinc-400 font-mono">${(ch.spend / 1000000).toFixed(1)}M</td>
              <td className="py-2 px-2 text-right text-zinc-400 font-mono">{ch.vehicleSalesUnits.toLocaleString()}</td>
              <td className="py-2 px-2 text-right text-zinc-400 font-mono">${(ch.paRevenue / 1000000).toFixed(1)}M</td>
              <td className="py-2 px-2 text-right text-zinc-400 font-mono">{ch.riderSignups.toLocaleString()}</td>
              <td className="py-2 px-2 text-right font-mono">
                <span className={Number(roas) >= 5 ? "text-emerald-400" : Number(roas) >= 3 ? "text-yellow-400" : "text-red-400"}>
                  {roas}x
                </span>
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  </div>
)

const OmnichannelSlide = () => {
  const [model, setModel] = useState<AttributionModel>("w-shaped")
  const [goal, setGoal] = useState<ConversionGoal>("vehicle-sales")

  return (
    <div className="h-full overflow-y-auto space-y-4 pr-2">
      {/* Executive Narrative */}
      <MTAExecutiveNarrative />

      {/* Section A: KPI Cards */}
      <MTAKpiCards />

      {/* Section B: Strategic Discovery */}
      <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-4">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="text-xs font-medium uppercase tracking-widest text-zinc-500">
            Strategic Discovery — Attribution Analysis
          </div>
          <div className="flex flex-wrap gap-4">
            <MTAModelSelector model={model} setModel={setModel} />
            <MTAGoalSelector goal={goal} setGoal={setGoal} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-[10px] uppercase tracking-widest text-zinc-500 mb-2">
              Attributed Revenue vs. Spend by Channel ({MODEL_LABELS[model]})
            </div>
            <MTARevenueChart model={model} />
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-widest text-zinc-500 mb-2">
              Conversion Funnel Velocity
            </div>
            <MTAFunnelChart goal={goal} />
          </div>
        </div>
      </div>

      {/* Section C: Tactical Audit */}
      <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="text-xs font-medium uppercase tracking-widest text-zinc-500">
            Tactical Audit — Channel Performance Matrix
          </div>
          <span className="text-[10px] text-zinc-600 font-mono">MODEL: {MODEL_LABELS[model]}</span>
        </div>
        <MTATacticalTable model={model} />
      </div>

    </div>
  )
}

// ============================================================================
// SLIDE 2: FINANCIAL INTELLIGENCE P&L COMPONENTS
// ============================================================================

const PnLSpreadsheet = () => {
  const rows: PnLRow[] = [
    { metric: "Gross Revenue", actual: 1240000, budget: 1200000, variance: 3.3 },
    { metric: "COGS", actual: 680000, budget: 650000, variance: -4.6 },
    { metric: "Gross Profit", actual: 560000, budget: 550000, variance: 1.8 },
    { metric: "OpEx", actual: 320000, budget: 300000, variance: -6.7 },
    { metric: "Net Income", actual: 240000, budget: 250000, variance: -4.0 },
  ]

  return (
    <div className="space-y-2">
      <div className="text-xs font-medium uppercase tracking-widest text-zinc-500">
        P&L Statement
      </div>
      <div className="space-y-1">
        {rows.map((row) => (
          <div key={row.metric} className="flex justify-between items-center text-xs">
            <span className="text-zinc-400 w-24">{row.metric}</span>
            <span className="text-zinc-300 font-mono">
              ${(row.actual / 1000).toFixed(0)}K
            </span>
            <span className={`font-mono ${row.variance >= 0 ? "text-emerald-400" : "text-red-400"}`}>
              {row.variance >= 0 ? "+" : ""}{row.variance.toFixed(1)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

const VarianceTags = () => {
  const variances = [
    { label: "Revenue", value: "+4.2%", positive: true },
    { label: "COGS", value: "-1.8%", positive: false },
    { label: "OpEx", value: "+2.1%", positive: false },
  ]

  return (
    <div className="space-y-2">
      <div className="text-xs font-medium uppercase tracking-widest text-zinc-500">
        Live Variance
      </div>
      <div className="flex flex-wrap gap-2">
        {variances.map((v) => (
          <span
            key={v.label}
            className={`px-2 py-1 text-xs font-mono rounded border ${
              v.positive 
                ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" 
                : "bg-red-500/10 border-red-500/20 text-red-400"
            }`}
          >
            {v.label}: {v.value}
          </span>
        ))}
      </div>
    </div>
  )
}

const SparklineRow = ({ label }: { label: string }) => (
  <div className="flex justify-between items-center text-xs">
    <span className="text-zinc-400">{label}</span>
    <div className="flex gap-0.5">
      {[40, 60, 45, 70, 55, 80, 65].map((h, i) => (
        <div
          key={i}
          className="w-1 bg-emerald-500/30 rounded-sm"
          style={{ height: `${h}%` }}
        />
      ))}
    </div>
  </div>
)

const BreadcrumbTracker = () => {
  const path = ["Global", "EMEA", "DACH", "SKU_4060"]

  return (
    <div className="space-y-2">
      <div className="text-xs font-medium uppercase tracking-widest text-zinc-500">
        Hierarchy Navigation
      </div>
      <div className="flex items-center gap-2 text-xs">
        {path.map((p, i) => (
          <span key={p}>
            <span className={i === path.length - 1 ? "text-emerald-400 font-medium" : "text-zinc-400"}>
              {p}
            </span>
            {i < path.length - 1 && <span className="text-zinc-600">➔</span>}
          </span>
        ))}
      </div>
    </div>
  )
}

const SalesForecastChart = () => {
  const data: SalesData[] = [
    { month: "Jan", actual: 95, forecast: 100 },
    { month: "Feb", actual: 88, forecast: 95 },
    { month: "Mar", actual: 102, forecast: 98 },
    { month: "Apr", actual: 110, forecast: 105 },
    { month: "May", actual: 105, forecast: 110 },
  ]

  return (
    <div className="h-40">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
          <XAxis 
            dataKey="month" 
            tick={{ fill: "#71717a", fontSize: 10 }}
            axisLine={{ stroke: "#27272a" }}
          />
          <YAxis 
            tick={{ fill: "#71717a", fontSize: 10 }}
            axisLine={{ stroke: "#27272a" }}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: "#09090b", 
              border: "1px solid #27272a",
              borderRadius: "8px"
            }}
            itemStyle={{ color: "#a1a1aa" }}
          />
          <Bar dataKey="actual" fill="#10b981" radius={[4, 4, 0, 0]} />
          <Line 
            type="monotone" 
            dataKey="forecast" 
            stroke="#71717a" 
            strokeWidth={2}
            strokeDasharray="5 5"
            dot={false}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

const SecurityTerminal = () => (
  <div className="space-y-2 font-mono text-xs">
    <div className="text-xs font-medium uppercase tracking-widest text-zinc-500">
      Security Status
    </div>
    <div className="space-y-1">
      <div className="text-emerald-400">✓ RLS_VERIFIED</div>
      <div className="text-emerald-400">✓ PARTITION_GLOBAL</div>
      <div className="text-emerald-400">✓ AUDIT_LOGGING</div>
      <div className="text-zinc-500">{">"} ACCESS_GRANTED</div>
    </div>
  </div>
)

const CompressionBadge = () => (
  <div className="space-y-2">
    <div className="text-xs font-medium uppercase tracking-widest text-zinc-500">
      Compression Rate
    </div>
    <div className="flex items-center gap-2">
      <div className="px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded text-emerald-400 text-xs font-mono">
        4.2x
      </div>
      <span className="text-xs text-zinc-500">Tabular Editor</span>
    </div>
  </div>
)

const FinancialSlide = () => (
  <div className="grid grid-cols-3 gap-3 h-full">
    {/* Left Column: Configuration */}
    <div className="space-y-3">
      <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-4">
        <PnLSpreadsheet />
      </div>
      <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-4">
        <VarianceTags />
      </div>
      <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-4">
        <div className="space-y-2">
          <div className="text-xs font-medium uppercase tracking-widest text-zinc-500">
            Transaction Sparklines
          </div>
          <div className="space-y-2">
            <SparklineRow label="Revenue" />
            <SparklineRow label="COGS" />
            <SparklineRow label="OpEx" />
          </div>
        </div>
      </div>
    </div>

    {/* Center Column: Data Ledger */}
    <div className="space-y-3">
      <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-4 h-[calc(50%-6px)]">
        <BreadcrumbTracker />
      </div>
      <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-4 h-[calc(50%-6px)]">
        <div className="text-xs font-medium uppercase tracking-widest text-zinc-500 mb-3">
          Sales vs Forecast
        </div>
        <SalesForecastChart />
      </div>
    </div>

    {/* Right Column: Analytics */}
    <div className="space-y-3">
      <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-4">
        <SecurityTerminal />
      </div>
      <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-4">
        <CompressionBadge />
      </div>
      <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-4 flex items-center justify-center">
        <div className="text-xs text-center">
          <div className="text-emerald-400 font-medium">Core Metric</div>
          <div className="text-zinc-500 mt-1">Sub-Second 6-Level</div>
          <div className="text-zinc-500">Hierarchy Drill-Down</div>
        </div>
      </div>
    </div>
  </div>
)

// ============================================================================
// SLIDE 3: HEALTHCARE MDM COMPONENTS
// ============================================================================

const SourceCodeBlock = ({ source, data }: { source: string; data: string[] }) => (
  <div className="space-y-2">
    <div className="text-xs font-medium uppercase tracking-widest text-zinc-500">
      {source}
    </div>
    <div className="bg-zinc-950 border border-zinc-800 rounded p-3 font-mono text-xs">
      {data.map((line, i) => (
        <div key={i} className="text-zinc-400">
          <span className="text-zinc-600">{i + 1}:</span> {line}
        </div>
      ))}
    </div>
  </div>
)

const EntityResolutionNetwork = () => (
  <div className="space-y-2">
    <div className="text-xs font-medium uppercase tracking-widest text-zinc-500">
      Entity Resolution Engine
    </div>
    <div className="relative h-24 bg-zinc-900/50 border border-zinc-800 rounded-lg flex items-center justify-center">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-8 h-8 bg-emerald-500/20 border-2 border-emerald-500 rounded-full flex items-center justify-center">
          <div className="w-3 h-3 bg-emerald-400 rounded-full" />
        </div>
      </div>
      {[0, 1, 2, 3].map((i) => (
        <div
          key={i}
          className="absolute w-4 h-4 bg-zinc-700 rounded-full border border-zinc-600"
          style={{
            top: `${20 + (i % 2) * 60}%`,
            left: `${15 + Math.floor(i / 2) * 70}%`,
          }}
        />
      ))}
    </div>
  </div>
)

const MatchingAccuracyChart = () => {
  const data: MatchingAccuracy[] = [
    { name: "Identity", value: 99.4 },
    { name: "Address", value: 97.8 },
    { name: "Phone", value: 95.2 },
  ]

  return (
    <div className="h-40">
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart cx="50%" cy="50%" innerRadius="30%" outerRadius="80%" data={data}>
          <RadialBar dataKey="value" cornerRadius={10}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={index === 0 ? "#10b981" : "#27272a"} />
            ))}
          </RadialBar>
          <text 
            x="50%" 
            y="50%" 
            textAnchor="middle" 
            dominantBaseline="middle" 
            className="fill-emerald-400 text-lg font-semibold"
          >
            99.4%
          </text>
        </RadialBarChart>
      </ResponsiveContainer>
    </div>
  )
}

const GoldenSchemaDisplay = () => {
  const schema = [
    "practitioner_id: UUID",
    "full_name: STRING",
    "specialization: ENUM",
    "facility_id: UUID",
    "license_status: BOOLEAN",
  ]

  return (
    <div className="space-y-2">
      <div className="text-xs font-medium uppercase tracking-widest text-zinc-500">
        Golden Schema
      </div>
      <div className="bg-zinc-900/50 border border-zinc-800 rounded p-3 font-mono text-xs space-y-1">
        {schema.map((field) => (
          <div key={field} className="text-emerald-400">
            {field}
          </div>
        ))}
      </div>
    </div>
  )
}

const ValidationLog = () => {
  const logs = [
    "DETECTED: 3 duplicate records",
    "RESOLVED: 2 conflicting entries",
    "MERGED: 1 identity cluster",
    "VERIFIED: Schema compliance OK",
  ]

  return (
    <div className="space-y-2">
      <div className="text-xs font-medium uppercase tracking-widest text-zinc-500">
        Validation Log
      </div>
      <div className="space-y-1 font-mono text-xs">
        {logs.map((log, i) => (
          <div key={i} className="text-zinc-400">
            <span className="text-emerald-400">✓</span> {log}
          </div>
        ))}
      </div>
    </div>
  )
}

const HealthcareSlide = () => (
  <div className="grid grid-cols-5 gap-3 h-full">
    {/* Left Column: Input Streams */}
    <div className="col-span-2 space-y-3">
      <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-4 h-[calc(50%-6px)]">
        <SourceCodeBlock 
          source="Vendor_Source_A"
          data={[
            'name: "Dr. John Smith"',
            'npi: "1234567890"',
            'specialty: "Cardiology"',
            'facility: "Hospital A"',
          ]}
        />
      </div>
      <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-4 h-[calc(50%-6px)]">
        <SourceCodeBlock 
          source="Vendor_Source_B"
          data={[
            'full_name: "J. Smith MD"',
            'provider_id: "NPI-123456789"',
            'practice: "Cardiac Care"',
            'location: "Hosp. A"',
          ]}
        />
      </div>
    </div>

    {/* Right Column: Analytics Grid */}
    <div className="col-span-3 grid grid-cols-2 gap-3">
      <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-4">
        <EntityResolutionNetwork />
      </div>
      <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-4">
        <div className="text-xs font-medium uppercase tracking-widest text-zinc-500 mb-2">
          Match Confidence
        </div>
        <MatchingAccuracyChart />
      </div>
      <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-4">
        <GoldenSchemaDisplay />
      </div>
      <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-4">
        <ValidationLog />
      </div>
      <div className="col-span-2 bg-zinc-900/50 border border-zinc-800 rounded-lg p-4 flex items-center justify-center">
        <div className="text-xs text-center">
          <div className="text-emerald-400 font-medium">Core Metric</div>
          <div className="text-zinc-500 mt-1">Multi-Tenant Identity Resolution</div>
          <div className="text-zinc-500">& Audited Single Source of Truth</div>
        </div>
      </div>
    </div>
  </div>
)

// ============================================================================
// SLIDE 4: SUPPLY CHAIN TELEMETRY COMPONENTS
// ============================================================================

const GeoMapGrid = () => (
  <div className="space-y-2">
    <div className="text-xs font-medium uppercase tracking-widest text-zinc-500">
      Global Routing Map
    </div>
    <div className="h-32 bg-zinc-900/50 border border-zinc-800 rounded-lg relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-px h-px bg-emerald-400"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-zinc-600 text-xs">Interactive Map Canvas</div>
      </div>
    </div>
  </div>
)

const TrackingDot = () => (
  <div className="space-y-2">
    <div className="text-xs font-medium uppercase tracking-widest text-zinc-500">
      Live Asset Tracking
    </div>
    <div className="h-20 bg-zinc-900/50 border border-zinc-800 rounded-lg relative flex items-center justify-center">
      <div className="relative">
        <div className="absolute inset-0 bg-emerald-400 rounded-full animate-ping opacity-75" />
        <div className="relative w-4 h-4 bg-emerald-400 rounded-full" />
      </div>
    </div>
  </div>
)

const SatelliteTicker = () => {
  const streams = [
    "AIS_3847: LAT 52.52, LON 13.40",
    "AIS_3848: LAT 51.50, LON -0.12",
    "AIS_3849: LAT 48.85, LON 2.35",
  ]

  return (
    <div className="space-y-2">
      <div className="text-xs font-medium uppercase tracking-widest text-zinc-500">
        Satellite Telemetry
      </div>
      <div className="space-y-1 font-mono text-xs">
        {streams.map((stream, i) => (
          <div key={i} className="text-emerald-400">
            {stream}
          </div>
        ))}
      </div>
    </div>
  )
}

const InventoryVelocityChart = () => {
  const data: InventoryVelocity[] = [
    { hub: "EU-West", velocity: 85 },
    { hub: "US-East", velocity: 92 },
    { hub: "APAC", velocity: 78 },
    { hub: "LATAM", velocity: 65 },
  ]

  return (
    <div className="h-32">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
          <XAxis 
            dataKey="hub" 
            tick={{ fill: "#71717a", fontSize: 10 }}
            axisLine={{ stroke: "#27272a" }}
          />
          <YAxis 
            tick={{ fill: "#71717a", fontSize: 10 }}
            axisLine={{ stroke: "#27272a" }}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: "#09090b", 
              border: "1px solid #27272a",
              borderRadius: "8px"
            }}
            itemStyle={{ color: "#a1a1aa" }}
          />
          <Line 
            type="monotone" 
            dataKey="velocity" 
            stroke="#10b981" 
            strokeWidth={2}
            dot={{ fill: "#10b981" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

const ThroughputCounter = () => {
  const hubs = [
    { name: "Hamburg", load: "87%" },
    { name: "Rotterdam", load: "92%" },
    { name: "Singapore", load: "78%" },
  ]

  return (
    <div className="space-y-2">
      <div className="text-xs font-medium uppercase tracking-widest text-zinc-500">
        Hub Throughput
      </div>
      <div className="space-y-1">
        {hubs.map((hub) => (
          <div key={hub.name} className="flex justify-between text-xs">
            <span className="text-zinc-400">{hub.name}</span>
            <span className="text-emerald-400 font-mono">{hub.load}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

const NetworkHealthWidget = () => (
  <div className="space-y-2">
    <div className="text-xs font-medium uppercase tracking-widest text-zinc-500">
      Pipeline Health
    </div>
    <div className="flex items-center gap-2">
      <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
      <span className="text-xs text-emerald-400">All Systems Operational</span>
    </div>
    <div className="text-xs text-zinc-500">
      Latency: 12ms | Uptime: 99.9%
    </div>
  </div>
)

const SupplyChainSlide = () => (
  <div className="h-full w-full relative">
    <iframe
      src="http://localhost:8050"
      className="w-full h-full border-0 rounded-lg"
      title="Supply Chain Telemetry — Dash Plotly"
      style={{ minHeight: "580px" }}
    />
    <div className="absolute top-3 right-3 px-2 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded text-[10px] font-mono text-emerald-400">
      PLOTLY BACKEND
    </div>
  </div>
)

// ============================================================================
// SLIDE 5: CEO FINANCIAL COMMAND CENTER (Streamlit)
// ============================================================================

const STREAMLIT_URL = process.env.NEXT_PUBLIC_STREAMLIT_URL || "https://ceo-dashboardgit-fwz2heby6wrjanjl77xdey.streamlit.app/?embed=true&embed_options=dark_theme"

const CEODashboardSlide = () => (
  <div className="h-full w-full relative">
    <iframe
      src={STREAMLIT_URL}
      className="w-full h-full border-0 rounded-lg"
      title="CEO Financial Command Center — Streamlit"
      style={{ minHeight: "580px" }}
      allow="fullscreen"
      loading="lazy"
    />
    <div className="absolute top-3 right-3 px-2 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded text-[10px] font-mono text-emerald-400">
      STREAMLIT CLOUD
    </div>
  </div>
)

// ============================================================================
// SLIDE 6: CUSTOMER LIFETIME VALUE & RETENTION COMMAND
// ============================================================================

type CustomerSegment = "all" | "adventure" | "cruiser" | "urban" | "sport"

const SEGMENT_LABELS: Record<CustomerSegment, string> = {
  all: "All Segments",
  adventure: "Adventure Touring",
  cruiser: "Heavy Cruisers",
  urban: "Urban Commuters",
  sport: "Sport/Track Riders",
}

const SEGMENT_GAUGE_DATA: Record<CustomerSegment, { nps: number; churnRisk: number; crossSell: number; avgCLV: string; retention12m: number; repeatPurchase: number }> = {
  all:       { nps: 74, churnRisk: 18, crossSell: 56, avgCLV: "$32,500", retention12m: 78, repeatPurchase: 24 },
  adventure: { nps: 82, churnRisk: 12, crossSell: 68, avgCLV: "$48,200", retention12m: 88, repeatPurchase: 34 },
  cruiser:   { nps: 79, churnRisk: 14, crossSell: 62, avgCLV: "$41,800", retention12m: 84, repeatPurchase: 30 },
  urban:     { nps: 61, churnRisk: 32, crossSell: 38, avgCLV: "$18,400", retention12m: 62, repeatPurchase: 14 },
  sport:     { nps: 70, churnRisk: 22, crossSell: 52, avgCLV: "$28,600", retention12m: 74, repeatPurchase: 20 },
}

const SEGMENT_CLV_MULTIPLIERS: Record<CustomerSegment, { rider: number; nonRider: number }> = {
  all:       { rider: 1.0, nonRider: 1.0 },
  adventure: { rider: 1.45, nonRider: 1.2 },
  cruiser:   { rider: 1.3, nonRider: 1.1 },
  urban:     { rider: 0.6, nonRider: 0.55 },
  sport:     { rider: 0.9, nonRider: 0.8 },
}

const getCLVTrajectoryData = (segment: CustomerSegment) => {
  const m = SEGMENT_CLV_MULTIPLIERS[segment]
  return Array.from({ length: 13 }, (_, i) => ({
    month: i * 5,
    riderGroup: Math.round((800 + (i * 2600) + (i * i * 80)) * m.rider),
    nonRiderGroup: Math.round((800 + (i * 1400) + (i * i * 20)) * m.nonRider),
  }))
}

const COHORT_RETENTION_BASE = [
  { cohort: "Q1 2024", rates: [100, 94, 89, 85, 82, 79, 76, 74, 72, 70, 68, 66] },
  { cohort: "Q2 2024", rates: [100, 92, 86, 81, 78, 75, 72, 69, 67, 65, 63, 61] },
  { cohort: "Q3 2024", rates: [100, 95, 91, 88, 85, 83, 81, 79, 77, 76, 74, 73] },
  { cohort: "Q4 2024", rates: [100, 93, 88, 83, 80, 77, 74, 71, 69, 67, 65, 63] },
]

const SEGMENT_RETENTION_OFFSETS: Record<CustomerSegment, number> = {
  all: 0, adventure: 6, cruiser: 4, urban: -10, sport: -2,
}

const getCohortRetention = (segment: CustomerSegment) => {
  const offset = SEGMENT_RETENTION_OFFSETS[segment]
  return COHORT_RETENTION_BASE.map((row) => ({
    cohort: row.cohort,
    rates: row.rates.map((v, i) => i === 0 ? 100 : Math.min(100, Math.max(30, v + offset))),
  }))
}

const SEGMENT_CHURN_TRIGGERS: Record<CustomerSegment, string[]> = {
  all: [
    "Lack of local Rider Group chapter events",
    "2nd consecutive missed scheduled service",
    "Out-of-stock preferred riding gear/accessories",
  ],
  adventure: [
    "Insufficient long-distance rally event calendar",
    "Delayed touring accessory restocks",
    "No GPS/nav system integration updates",
  ],
  cruiser: [
    "Limited chrome/custom parts availability",
    "Reduced dealer-hosted weekend ride events",
    "Competitor loyalty program poaching",
  ],
  urban: [
    "High insurance costs vs. public transit savings",
    "Lack of urban-specific gear (compact storage, etc.)",
    "Insufficient short-commute service packages",
  ],
  sport: [
    "Track-day partnership programs discontinued",
    "Performance part lead times exceeding 4 weeks",
    "No tiered race licensing support pathway",
  ],
}

const LOYALTY_TIERS = [
  { tier: "Platinum Elite", riders: 4200, annualPA: 8400, serviceAdherence: 96, yearsActive: 8.2, upgradeProbability: 62 },
  { tier: "Gold", riders: 12800, annualPA: 5200, serviceAdherence: 91, yearsActive: 5.4, upgradeProbability: 38 },
  { tier: "Silver", riders: 28500, annualPA: 2800, serviceAdherence: 72, yearsActive: 3.1, upgradeProbability: 22 },
  { tier: "Bronze", riders: 54000, annualPA: 1200, serviceAdherence: 48, yearsActive: 1.6, upgradeProbability: 11 },
]


const CLVNarrative = () => (
  <div className="bg-zinc-900/60 border border-zinc-800 rounded-lg p-5 mb-4">
    <div className="flex items-center gap-2 mb-3">
      <div className="w-1 h-6 bg-emerald-500 rounded-full" />
      <span className="text-xs font-semibold uppercase tracking-widest text-emerald-400">Executive Insights</span>
    </div>
    <p className="text-sm leading-relaxed text-zinc-400">
      Post-sale engagement is our highest-margin growth engine. Data reveals that riders who join an official Rider Group chapter within 60 days of vehicle delivery exhibit an 84% higher 3-year Customer Lifetime Value (CLV) due to recurring Parts & Accessories (P&A) customization and a 3.5x higher repeat vehicle purchase rate. Mitigating churn among urban-commuter segment buyers remains our primary tactical retention priority this quarter.
    </p>
  </div>
)

const CLVGauge = ({ label, value, max, suffix, color }: { label: string; value: number; max: number; suffix: string; color: string }) => {
  const pct = (value / max) * 100
  const radius = 40
  const circumference = Math.PI * radius
  const offset = circumference - (pct / 100) * circumference

  return (
    <div className="flex flex-col items-center">
      <svg width="100" height="60" viewBox="0 0 100 60">
        <path
          d="M 10 55 A 40 40 0 0 1 90 55"
          fill="none"
          stroke="#27272a"
          strokeWidth="8"
          strokeLinecap="round"
        />
        <path
          d="M 10 55 A 40 40 0 0 1 90 55"
          fill="none"
          stroke={color}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={`${circumference}`}
          strokeDashoffset={offset}
          className="transition-all duration-700"
        />
      </svg>
      <div className="text-lg font-semibold text-zinc-100 -mt-1">{value}{suffix}</div>
      <div className="text-[10px] text-zinc-500 text-center mt-0.5">{label}</div>
    </div>
  )
}

const CLVTrajectoryChart = ({ segment }: { segment: CustomerSegment }) => (
  <div className="h-56">
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={getCLVTrajectoryData(segment)}>
        <defs>
          <linearGradient id="clvRiderGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#10b981" stopOpacity={0.25} />
            <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="clvNonRiderGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#71717a" stopOpacity={0.15} />
            <stop offset="95%" stopColor="#71717a" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
        <XAxis
          dataKey="month"
          tick={{ fill: "#71717a", fontSize: 9 }}
          axisLine={{ stroke: "#27272a" }}
          tickFormatter={(v) => `M${v}`}
        />
        <YAxis
          tick={{ fill: "#71717a", fontSize: 9 }}
          axisLine={{ stroke: "#27272a" }}
          tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
        />
        <Tooltip
          contentStyle={{ backgroundColor: "#09090b", border: "1px solid #27272a", borderRadius: "8px" }}
          itemStyle={{ color: "#a1a1aa" }}
          formatter={(value) => `$${Number(value).toLocaleString()}`}
        />
        <Legend wrapperStyle={{ fontSize: "10px" }} />
        <Area
          type="monotone"
          dataKey="riderGroup"
          name="Active Rider Group Members"
          stroke="#10b981"
          strokeWidth={2}
          fillOpacity={1}
          fill="url(#clvRiderGrad)"
        />
        <Area
          type="monotone"
          dataKey="nonRiderGroup"
          name="Non-Rider Group Buyers"
          stroke="#71717a"
          strokeWidth={2}
          strokeDasharray="4 4"
          fillOpacity={1}
          fill="url(#clvNonRiderGrad)"
        />
      </AreaChart>
    </ResponsiveContainer>
  </div>
)

const CohortHeatmap = ({ segment }: { segment: CustomerSegment }) => {
  const months = ["M1", "M2", "M3", "M4", "M5", "M6", "M7", "M8", "M9", "M10", "M11", "M12"]
  const data = getCohortRetention(segment)

  const getColor = (val: number) => {
    if (val >= 90) return "bg-emerald-500/80"
    if (val >= 80) return "bg-emerald-500/60"
    if (val >= 70) return "bg-emerald-500/40"
    if (val >= 60) return "bg-emerald-500/20"
    return "bg-amber-500/30"
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-[10px]">
        <thead>
          <tr>
            <th className="text-left py-1.5 px-1.5 text-zinc-500 font-medium">Cohort</th>
            {months.map((m) => (
              <th key={m} className="text-center py-1.5 px-1 text-zinc-500 font-medium">{m}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.cohort}>
              <td className="py-1.5 px-1.5 text-zinc-400 font-medium whitespace-nowrap">{row.cohort}</td>
              {row.rates.map((val, i) => (
                <td key={i} className="py-1 px-0.5 text-center">
                  <div className={`rounded px-1.5 py-1 ${getColor(val)} text-zinc-100 font-mono`}>
                    {val}%
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

const LoyaltyTable = () => (
  <div className="overflow-x-auto">
    <table className="w-full text-xs">
      <thead>
        <tr className="border-b border-zinc-800">
          <th className="text-left py-2 px-2 text-zinc-500 font-medium">Membership Tier</th>
          <th className="text-right py-2 px-2 text-zinc-500 font-medium">Active Riders</th>
          <th className="text-right py-2 px-2 text-zinc-500 font-medium">Avg Annual P&A ($)</th>
          <th className="text-right py-2 px-2 text-zinc-500 font-medium">Service Adherence</th>
          <th className="text-right py-2 px-2 text-zinc-500 font-medium">Avg Years Active</th>
          <th className="text-right py-2 px-2 text-zinc-500 font-medium">Upgrade Probability</th>
        </tr>
      </thead>
      <tbody>
        {LOYALTY_TIERS.map((row) => (
          <tr key={row.tier} className="border-b border-zinc-800/50 hover:bg-zinc-900/50 transition-colors">
            <td className="py-2 px-2 text-zinc-300 font-medium">{row.tier}</td>
            <td className="py-2 px-2 text-right text-zinc-400 font-mono">{row.riders.toLocaleString()}</td>
            <td className="py-2 px-2 text-right text-zinc-400 font-mono">${row.annualPA.toLocaleString()}</td>
            <td className="py-2 px-2 text-right font-mono">
              <span className={row.serviceAdherence >= 90 ? "text-emerald-400" : row.serviceAdherence >= 70 ? "text-yellow-400" : "text-red-400"}>
                {row.serviceAdherence}%
              </span>
            </td>
            <td className="py-2 px-2 text-right text-zinc-400 font-mono">{row.yearsActive}</td>
            <td className="py-2 px-2 text-right font-mono">
              <span className={row.upgradeProbability >= 50 ? "text-emerald-400" : row.upgradeProbability >= 30 ? "text-yellow-400" : "text-zinc-400"}>
                {row.upgradeProbability}%
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)

const CLVRetentionSlide = () => {
  const [segment, setSegment] = useState<CustomerSegment>("all")

  return (
    <div className="h-full overflow-y-auto space-y-4 pr-2">
      {/* Executive Narrative */}
      <CLVNarrative />

      {/* Asymmetric Layout */}
      <div className="grid grid-cols-3 gap-4">
        {/* Left Column: Segment & Health Panel (1/3) */}
        <div className="col-span-1 space-y-4">
          {/* Segment Filter */}
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-4">
            <div className="text-[10px] uppercase tracking-widest text-zinc-500 mb-2">Customer Segment</div>
            <select
              value={segment}
              onChange={(e) => setSegment(e.target.value as CustomerSegment)}
              className="w-full bg-zinc-900 border border-zinc-800 rounded px-2.5 py-1.5 text-xs text-zinc-300 focus:outline-none focus:border-emerald-500/40"
            >
              {(Object.keys(SEGMENT_LABELS) as CustomerSegment[]).map((s) => (
                <option key={s} value={s}>{SEGMENT_LABELS[s]}</option>
              ))}
            </select>
          </div>

          {/* Gauges */}
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-4">
            <div className="text-[10px] uppercase tracking-widest text-zinc-500 mb-3">Performance Gauges</div>
            <div className="space-y-4">
              <CLVGauge label="Net Promoter Score" value={SEGMENT_GAUGE_DATA[segment].nps} max={100} suffix="" color="#10b981" />
              <CLVGauge label="Churn Risk Index" value={SEGMENT_GAUGE_DATA[segment].churnRisk} max={100} suffix="%" color="#f59e0b" />
              <CLVGauge label="Cross-Sell Penetration" value={SEGMENT_GAUGE_DATA[segment].crossSell} max={100} suffix="%" color="#10b981" />
            </div>
          </div>

          {/* Churn Triggers */}
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-4">
            <div className="text-[10px] uppercase tracking-widest text-zinc-500 mb-2">Top 3 Churn Triggers</div>
            <div className="space-y-2">
              {SEGMENT_CHURN_TRIGGERS[segment].map((trigger, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="text-red-400 text-[10px] font-mono mt-0.5">{`0${i + 1}`}</span>
                  <span className="text-xs text-zinc-400 leading-tight">{trigger}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Predictive Value & Engagement (2/3) */}
        <div className="col-span-2 space-y-4">
          {/* CLV Trajectory */}
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="text-[10px] uppercase tracking-widest text-zinc-500">
                Predictive CLV Trajectory (60-Month)
              </div>
              <div className="flex items-center gap-3 text-[10px]">
                <span className="text-zinc-500">5-Yr Avg CLV:</span>
                <span className="text-emerald-400 font-semibold">{SEGMENT_GAUGE_DATA[segment].avgCLV}</span>
              </div>
            </div>
            <CLVTrajectoryChart segment={segment} />
          </div>

          {/* Cohort Retention Heatmap */}
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="text-[10px] uppercase tracking-widest text-zinc-500">
                Cohort Retention Heatmap (Monthly Decay)
              </div>
              <div className="flex items-center gap-3 text-[10px]">
                <span className="text-zinc-500">12-Mo Retention:</span>
                <span className="text-emerald-400 font-semibold">{SEGMENT_GAUGE_DATA[segment].retention12m}%</span>
                <span className="text-zinc-600">|</span>
                <span className="text-zinc-500">Repeat Purchase:</span>
                <span className="text-emerald-400 font-semibold">{SEGMENT_GAUGE_DATA[segment].repeatPurchase}%</span>
              </div>
            </div>
            <CohortHeatmap segment={segment} />
          </div>
        </div>
      </div>

      {/* Tactical Loyalty Table (Full Width) */}
      <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-4">
        <div className="text-xs font-medium uppercase tracking-widest text-zinc-500 mb-3">
          Tactical Loyalty Audit — Rider Membership Tier Performance
        </div>
        <LoyaltyTable />
      </div>
    </div>
  )
}

// ============================================================================
// MAIN WORKLOAD SIMULATOR COMPONENT
// ============================================================================

const slides = [
  { id: 0, title: "Omnichannel Marketing & Multi-Touch Attribution", summary: "End-to-end leakage visibility with 30% Fabric capacity optimization across EMEA campaign operations.", component: OmnichannelSlide },
  { id: 1, title: "Global Customer Lifetime Value & Retention Command", summary: "Retention-first analytics revealing 84% higher CLV for active Rider Group members with predictive cohort degradation modeling.", component: CLVRetentionSlide },
  // DISABLED: Financial Intelligence & P&L Operations
  // { id: 2, title: "Financial Intelligence & P&L Operations", summary: "Sub-second 6-level hierarchy drill-down with multi-source reconciliation and Row-Level Security.", component: FinancialSlide },
  { id: 3, title: "CEO Financial Command Center — PC & Printer Manufacturer", summary: "Interactive executive dashboard with constant-currency analytics, FX bridge, printing supplies mix, and working capital telemetry.", component: CEODashboardSlide },
  // DISABLED: Healthcare & Pharma Master Data Management
  // { id: 3, title: "Healthcare & Pharma Master Data Management", summary: "Multi-tenant identity resolution achieving 99.4% match confidence for audited single source of truth.", component: HealthcareSlide },
  // DISABLED: Supply Chain Telemetry & Logistics Routing
  // { id: 4, title: "Supply Chain Telemetry & Logistics Routing", summary: "Low-latency geo-spatial routing with live asset tracking across global fulfillment centers.", component: SupplyChainSlide },
]

export function WorkloadSimulator() {
  const [activeSlide, setActiveSlide] = useState(0)

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const ActiveComponent = slides[activeSlide].component

  return (
    <section id="frameworks" className="bg-zinc-950/50 backdrop-sm py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 flex flex-col gap-3">
          <span className="text-xs font-medium uppercase tracking-widest text-emerald-400">
            Analytical Workload Simulator
          </span>
          <h2 className="text-balance text-4xl font-semibold tracking-tight text-zinc-100 md:text-5xl transition-all duration-300">
            {slides[activeSlide].title}
          </h2>
          <p className="max-w-2xl text-pretty text-base leading-relaxed text-zinc-400 transition-all duration-300">
            {slides[activeSlide].summary}
          </p>
        </div>

        <div className="relative bg-zinc-950/70 backdrop-blur-xl border border-zinc-800 p-6 shadow-2xl rounded-xl transition-all duration-300">
          {/* Navigation Controls */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 border border-zinc-800 text-zinc-400 hover:text-emerald-400 hover:border-zinc-700 transition-all rounded-lg bg-zinc-950/50"
            aria-label="Previous slide"
          >
            <ChevronLeft className="size-5" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 border border-zinc-800 text-zinc-400 hover:text-emerald-400 hover:border-zinc-700 transition-all rounded-lg bg-zinc-950/50"
            aria-label="Next slide"
          >
            <ChevronRight className="size-5" />
          </button>

          {/* Slide Content */}
          <div className="h-[600px] px-12">
            <ActiveComponent />
          </div>

          {/* Slide Indicators */}
          <div className="flex justify-center gap-2 mt-6">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveSlide(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === activeSlide 
                    ? "bg-emerald-400 w-6" 
                    : "bg-zinc-700 hover:bg-zinc-600"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Slide Title */}
          <div className="text-center mt-4">
            <span className="text-sm text-zinc-500">
              {slides[activeSlide].title}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
