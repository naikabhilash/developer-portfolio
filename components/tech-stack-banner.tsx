export function TechStackBanner() {
  const techStack = [
    { name: "Apache Spark", icon: "/Apache-Spark.svg" },
    { name: "AWS", icon: "/aws.svg" },
    { name: "Azure", icon: "/azure.svg" },
    { name: "Databricks", icon: "/databricks.svg" },
    { name: "dbt", icon: "/dbt-icon.svg" },
    { name: "Microsoft Fabric", icon: "/microsoft-fabric.svg" },
    { name: "Plotly", icon: "/Plotly.svg" },
    { name: "Power BI", icon: "/power-bi.svg" },
    { name: "Python", icon: "/python.svg" },
    { name: "R", icon: "/R.svg" },
    { name: "SQL", icon: "/SQL.svg" },
    { name: "Tableau", icon: "/tableau.svg" },
  ]

  return (
    <div className="bg-zinc-950/50 backdrop-sm">
      <div className="mx-auto max-w-6xl px-6 py-6">
        <div className="mb-4 flex items-center justify-center gap-3">
          <span className="size-1.5 rounded-full bg-emerald-400" />
          <span className="text-xs font-medium uppercase tracking-widest text-emerald-400">
            Microsoft Certified: Fabric Analytics Engineer Associate
          </span>
          <img src="/microsoft-certified-associate-badge.svg" alt="Microsoft Certified Associate Badge" className="size-20" />
        </div>
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8">
          {techStack.map((tech, index) => (
            <div
              key={tech.name}
              className="relative flex size-10 items-center justify-center transition-transform hover:scale-105 duration-300"
              style={{
                animation: `float 3s ease-in-out infinite`,
                animationDelay: `${index * 0.2}s`,
              }}
              title={tech.name}
            >
              <img
                src={tech.icon}
                alt={tech.name}
                className="size-10 object-contain opacity-70 hover:opacity-100 transition-opacity"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
