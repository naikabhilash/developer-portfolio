import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { Pillars } from "@/components/pillars"
import { StackMatrix } from "@/components/stack-matrix"
import { CaseStudies } from "@/components/case-studies"
import { Timeline } from "@/components/timeline"
import { Footer } from "@/components/footer"

export default function Page() {
  return (
    <div className="min-h-screen bg-zinc-50 font-sans text-zinc-900">
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
