import { Navbar } from "@/components/navbar"
import { TechStackBanner } from "@/components/tech-stack-banner"
import { Hero } from "@/components/hero"
import { Pillars } from "@/components/pillars"
import { StackMatrix } from "@/components/stack-matrix"
import { Timeline } from "@/components/timeline"
import { ContactForm } from "@/components/contact-form"
import { Footer } from "@/components/footer"
import dynamic from "next/dynamic"

const KnowledgeGraph = dynamic(() => import("@/components/knowledge-graph").then(mod => ({ default: mod.KnowledgeGraph })))
const CaseStudies = dynamic(() => import("@/components/case-studies").then(mod => ({ default: mod.CaseStudies })))
const WorkloadSimulator = dynamic(() => import("@/components/workload-simulator").then(mod => ({ default: mod.WorkloadSimulator })))

export default function Page() {
  return (
    <div className="min-h-screen bg-zinc-950 font-sans text-zinc-100">
      <KnowledgeGraph />
      <Navbar />
      <main>
        <Hero />
        <TechStackBanner />
        <Pillars />
        <StackMatrix />
        <CaseStudies />
        <WorkloadSimulator />
        <Timeline />
        <ContactForm />
      </main>
      <Footer />
    </div>
  )
}
