import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { Pillars } from "@/components/pillars"
import { StackMatrix } from "@/components/stack-matrix"
import { CaseStudies } from "@/components/case-studies"
import { Timeline } from "@/components/timeline"
import { Footer } from "@/components/footer"
import { KnowledgeGraph } from "@/components/knowledge-graph"

export default function Page() {
  return (
    <div className="min-h-screen bg-zinc-950 font-sans text-zinc-100">
      <KnowledgeGraph />
      <Navbar />
      <main>
        <Hero />
        <Pillars />
        <StackMatrix />
        <CaseStudies />
        <Timeline />
      </main>
      <Footer />
    </div>
  )
}
