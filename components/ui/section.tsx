import { cn } from "@/lib/utils"

interface SectionProps {
  id?: string
  children: React.ReactNode
  className?: string
  /** Whether to render the bottom border. Defaults to true. */
  bordered?: boolean
}

/**
 * Consistent page section wrapper providing max-width, padding, and optional border.
 */
export function Section({ id, children, className, bordered = true }: SectionProps) {
  return (
    <section id={id} className={cn(bordered && "border-b border-zinc-200", className)}>
      <div className="mx-auto max-w-6xl px-6 py-24">{children}</div>
    </section>
  )
}
