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

    <section id="stack" className="border-b border-zinc-800">

      <div className="mx-auto max-w-6xl px-6 py-24">

        <div className="mb-16 flex flex-col gap-3">

          <span className="text-xs font-mono font-medium uppercase tracking-widest text-emerald-400">The Semantic Layer</span>

          <h2 className="text-balance font-mono text-4xl font-medium tracking-tight text-zinc-100 md:text-5xl">

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

                className={`inline-flex items-center gap-2 border px-4 py-2 text-sm font-mono font-medium transition-colors ${

                  isActive

                    ? "border-emerald-500 bg-emerald-500 text-white"

                    : "border-zinc-700 text-zinc-400 hover:border-zinc-500 hover:text-zinc-100"

                }`}

              >

                <d.icon className="size-4" />

                {d.label}

              </button>

            )

          })}

        </div>



        <div className="mt-8">

          <div className="grid gap-px overflow-hidden border border-zinc-800 bg-zinc-800 sm:grid-cols-2 lg:grid-cols-3">

            {current.items.map((item) => (

              <div

                key={item}

                className="flex items-center gap-3 bg-zinc-900 px-4 py-4 transition-colors hover:bg-zinc-800"

              >

                <span className="size-1.5 rounded-none bg-emerald-400" />

                <span className="text-sm font-mono font-medium text-zinc-300">{item}</span>

              </div>

            ))}

          </div>

        </div>

      </div>

    </section>

  )

}

