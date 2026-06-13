const roles = [
  {
    company: "UsefulBI Corporation",
    period: "2021 – Present",
    title: "Lead Software Engineer",
    description:
      "Architecting ETL pipelines, leading Microsoft Fabric implementations, and building custom MDM solutions for HCP/HCO records with Informatica MDM.",
    active: true,
  },
  {
    company: "Benori Knowledge Solutions",
    period: "2018 – 2021",
    title: "Senior Data Analyst",
    description:
      "Engineering automated web crawlers for data extraction and creating advanced visualization modules in Power BI and Tableau.",
  },
  {
    company: "Times Internet (Taskbucks)",
    period: "2016 – 2018",
    title: "Data Analyst",
    description:
      "Developing operational dashboards via R Shiny and automating daily reporting architectures on R Studio Server, saving 1–2 hours daily.",
  },
]

export function Timeline() {
  return (
    <section id="timeline" className="border-b border-zinc-800">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <div className="mb-16 flex flex-col gap-3">
          <span className="text-xs font-medium uppercase tracking-widest text-emerald-400">The Commit History</span>
          <h2 className="text-balance text-4xl font-semibold tracking-tight text-zinc-100 md:text-5xl">
            Experience Timeline
          </h2>
        </div>

        <ol className="relative ml-3 border-l border-zinc-800">
          {roles.map((role) => (
            <li key={role.company} className="relative pb-12 pl-10 last:pb-0">
              <span
                className={`absolute -left-[6.5px] top-1.5 size-3 rounded-full border-2 border-zinc-950 ${
                  role.active ? "bg-emerald-400" : "bg-zinc-600"
                }`}
              />
              <div className="flex flex-col gap-2 rounded-xl border border-zinc-800 bg-zinc-900/50 p-7 transition-colors hover:bg-zinc-900 hover:border-zinc-700">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-xl font-semibold tracking-tight text-zinc-100">{role.company}</h3>
                  <span className="text-xs uppercase tracking-wider text-zinc-500">{role.period}</span>
                </div>
                <p className="text-sm font-medium text-emerald-400">{role.title}</p>
                <p className="text-pretty leading-relaxed text-zinc-400">{role.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
