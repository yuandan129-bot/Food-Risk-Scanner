"use client"

import type { Additive } from "@/lib/food-data"

const statusIndicator = {
  safe: "bg-emerald-400",
  caution: "bg-amber-400",
  avoid: "bg-red-400",
}

interface AdditiveTagProps {
  additive: Additive
  onClick: (additive: Additive) => void
}

export function AdditiveTag({ additive, onClick }: AdditiveTagProps) {
  return (
    <button
      onClick={() => onClick(additive)}
      className="group glass-card inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm transition-all duration-200 hover:shadow-md hover:scale-[1.02] active:scale-[0.98]"
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${statusIndicator[additive.status]}`}
        aria-hidden="true"
      />
      <span className="text-foreground/80 group-hover:text-foreground transition-colors">
        {additive.name}
      </span>
      <span className="text-[10px] text-muted-foreground font-mono">
        {additive.code}
      </span>
    </button>
  )
}
