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
    <section id="timeline" className="border-b border-zinc-200">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <div className="mb-16 flex flex-col gap-3">
          <span className="text-xs font-medium uppercase tracking-widest text-blue-900">The Commit History</span>
          <h2 className="text-balance font-serif text-4xl font-medium tracking-tight text-zinc-900 md:text-5xl">
            Experience Timeline
          </h2>
        </div>

        <ol className="relative ml-3 border-l border-zinc-200">
          {roles.map((role) => (
            <li key={role.company} className="relative pb-12 pl-10 last:pb-0">
              <span
                className={`absolute -left-[6.5px] top-1.5 size-3 rounded-full border-2 border-zinc-50 ${
                  role.active ? "bg-blue-900" : "bg-zinc-300"
                }`}
              />
              <div className="flex flex-col gap-2 border border-zinc-200 bg-white p-7 transition-colors hover:border-zinc-300">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="font-serif text-xl font-medium tracking-tight text-zinc-900">{role.company}</h3>
                  <span className="text-xs uppercase tracking-wider text-zinc-400">{role.period}</span>
                </div>
                <p className="text-sm font-medium text-blue-900">{role.title}</p>
                <p className="text-pretty leading-relaxed text-zinc-600">{role.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
