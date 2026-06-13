import { cn } from "@/lib/utils"

interface BadgeProps {
  children: React.ReactNode
  className?: string
}

/**
 * Small inline badge/tag with blue-900 accent styling.
 */
export function Badge({ children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center border border-blue-900/20 bg-blue-900/5 px-2.5 py-1 text-[11px] font-medium text-blue-900",
        className,
      )}
    >
      {children}
    </span>
  )
}
