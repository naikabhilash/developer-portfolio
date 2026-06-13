import { cn } from "@/lib/utils"
import type { LucideIcon } from "lucide-react"

interface IconBoxProps {
  icon: LucideIcon
  /** Container size class, e.g. "size-10" or "size-11". Defaults to "size-10". */
  size?: string
  /** Icon size class, e.g. "size-4" or "size-5". Defaults to "size-4". */
  iconSize?: string
  className?: string
}

/**
 * Icon container with blue-900 border/background accent.
 */
export function IconBox({ icon: Icon, size = "size-10", iconSize = "size-4", className }: IconBoxProps) {
  return (
    <div className={cn("flex items-center justify-center border border-blue-900/20 bg-blue-900/5", size, className)}>
      <Icon className={cn(iconSize, "text-blue-900")} />
    </div>
  )
}
