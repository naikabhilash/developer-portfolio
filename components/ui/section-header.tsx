import { cn } from "@/lib/utils"

interface SectionHeaderProps {
  eyebrow: string
  title: string
  className?: string
}

/**
 * Reusable section header with an uppercase eyebrow label and a serif heading.
 */
export function SectionHeader({ eyebrow, title, className }: SectionHeaderProps) {
  return (
    <div className={cn("mb-16 flex flex-col gap-3", className)}>
      <span className="text-xs font-medium uppercase tracking-widest text-blue-900">{eyebrow}</span>
      <h2 className="text-balance font-serif text-4xl font-medium tracking-tight text-zinc-900 md:text-5xl">
        {title}
      </h2>
    </div>
  )
}
