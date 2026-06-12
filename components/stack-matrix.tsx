"use client"

import { useState } from "react"
import { HardDrive, GitBranch, PieChart, Lock } from "lucide-react"

const domains = [
  {
    key: "storage",
    label: "Fabric Storage",
    icon: HardDrive,
    items: ["OneLake", "Lakehouse", "Warehouse Design", "Delta / Parquet Optimization"],
  },
  {
    key: "pipelines",
    label: "Pipelines & Compute",
    icon: GitBranch,
    items: ["PySpark", "Python", "dbt", "AWS Glue", "Azure Data Factory", "Apache Airflow"],
  },
  {
    key: "bi",
    label: "BI & Semantics",
    icon: PieChart,
    items: ["Power BI", "DAX", "Power Query (M)", "Tabular Editor", "DAX Studio"],
  },
  {
    key: "governance",
    label: "Governance & Ops",
    icon: Lock,
    items: ["RBAC", "Data Lineage", "Sensitivity Labels", "CI/CD Workflows"],
  },
]

export function StackMatrix() {
  const [active, setActive] = useState(domains[0].key)
  const current = domains.find((d) => d.key === active)!

  return (
    <section id="stack" className="border-b border-zinc-200">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <div className="mb-16 flex flex-col gap-3">
          <span className="text-xs font-medium uppercase tracking-widest text-blue-900">The Semantic Layer</span>
          <h2 className="text-balance font-serif text-4xl font-medium tracking-tight text-zinc-900 md:text-5xl">
            Tech Stack Matrix
          </h2>
        </div>

        <div className="flex flex-wrap gap-2">
          {domains.map((d) => {
            const isActive = d.key === active
            return (
              <button
                key={d.key}
                type="button"
                onClick={() => setActive(d.key)}
                className={`inline-flex items-center gap-2 border px-4 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "border-blue-900 bg-blue-900 text-zinc-50"
                    : "border-zinc-300 text-zinc-600 hover:border-zinc-900 hover:text-zinc-900"
                }`}
              >
                <d.icon className="size-4" />
                {d.label}
              </button>
            )
          })}
        </div>

        <div className="mt-8">
          <div className="grid gap-px overflow-hidden border border-zinc-200 bg-zinc-200 sm:grid-cols-2 lg:grid-cols-3">
            {current.items.map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 bg-zinc-50 px-4 py-4 transition-colors hover:bg-white"
              >
                <span className="size-1.5 rounded-full bg-blue-900" />
                <span className="text-sm font-medium text-zinc-700">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
