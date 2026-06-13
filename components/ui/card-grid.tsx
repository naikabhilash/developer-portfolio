import { cn } from "@/lib/utils"

interface CardGridProps {
  children: React.ReactNode
  className?: string
}

/**
 * A bordered grid with 1px gap lines between cards (the "pixel border" pattern).
 */
export function CardGrid({ children, className }: CardGridProps) {
  return (
    <div className={cn("grid gap-px overflow-hidden border border-zinc-200 bg-zinc-200", className)}>
      {children}
    </div>
  )
}
