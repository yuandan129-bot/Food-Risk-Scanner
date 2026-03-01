"use client"

import { useEffect, useRef } from "react"
import { X, ShieldCheck, ShieldAlert, ShieldX } from "lucide-react"
import type { Additive } from "@/lib/food-data"

const statusConfig = {
  safe: {
    label: "Generally Safe",
    icon: ShieldCheck,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    border: "border-emerald-200",
  },
  caution: {
    label: "Use Caution",
    icon: ShieldAlert,
    color: "text-amber-600",
    bg: "bg-amber-50",
    border: "border-amber-200",
  },
  avoid: {
    label: "Best Avoided",
    icon: ShieldX,
    color: "text-red-600",
    bg: "bg-red-50",
    border: "border-red-200",
  },
}

interface AdditiveModalProps {
  additive: Additive | null
  onClose: () => void
}

export function AdditiveModal({ additive, onClose }: AdditiveModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    if (additive) {
      document.addEventListener("keydown", handleEscape)
      document.body.style.overflow = "hidden"
    }
    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = ""
    }
  }, [additive, onClose])

  if (!additive) return null

  const config = statusConfig[additive.status]
  const StatusIcon = config.icon

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] flex items-end md:items-center justify-center p-4"
      onClick={(e) => {
        if (e.target === overlayRef.current) onClose()
      }}
      role="dialog"
      aria-modal="true"
      aria-label={`Details for ${additive.name}`}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-foreground/20 backdrop-blur-sm animate-in fade-in duration-200" />

      {/* Modal */}
      <div className="relative w-full max-w-md glass-card rounded-3xl p-6 shadow-2xl animate-in slide-in-from-bottom-4 fade-in duration-300 md:slide-in-from-bottom-0 max-h-[85vh] overflow-y-auto"
        style={{ background: "rgba(255, 255, 255, 0.88)", backdropFilter: "blur(30px)" }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 h-8 w-8 rounded-full bg-foreground/5 hover:bg-foreground/10 flex items-center justify-center transition-colors"
          aria-label="Close"
        >
          <X className="h-4 w-4 text-muted-foreground" />
        </button>

        {/* Header */}
        <div className="pr-8">
          <p className="text-xs text-muted-foreground font-mono tracking-wider mb-1">
            {additive.code}
          </p>
          <h3 className="text-xl font-semibold text-foreground tracking-tight">
            {additive.name}
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            {additive.category}
          </p>
        </div>

        {/* Status badge */}
        <div className={`mt-4 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium ${config.bg} ${config.color} border ${config.border}`}>
          <StatusIcon className="h-3.5 w-3.5" />
          {config.label}
        </div>

        {/* Content sections */}
        <div className="mt-5 space-y-4">
          <div>
            <h4 className="text-[11px] uppercase tracking-[0.1em] text-muted-foreground font-semibold mb-1.5">
              Primary Usage
            </h4>
            <p className="text-sm text-foreground/80 leading-relaxed">
              {additive.usage}
            </p>
          </div>

          <div className="h-px bg-foreground/5" />

          <div>
            <h4 className="text-[11px] uppercase tracking-[0.1em] text-muted-foreground font-semibold mb-1.5">
              Risk Note
            </h4>
            <p className="text-sm text-foreground/80 leading-relaxed">
              {additive.riskNote}
            </p>
          </div>

          <div className="h-px bg-foreground/5" />

          <div>
            <h4 className="text-[11px] uppercase tracking-[0.1em] text-muted-foreground font-semibold mb-1.5">
              Our Advice
            </h4>
            <p className="text-sm text-foreground/80 leading-relaxed">
              {additive.advice}
            </p>
          </div>
        </div>

        {/* Disclaimer */}
        <p className="text-[10px] text-muted-foreground/50 mt-5 text-center">
          For educational purposes only. Consult a healthcare professional for specific dietary advice.
        </p>
      </div>
    </div>
  )
}
