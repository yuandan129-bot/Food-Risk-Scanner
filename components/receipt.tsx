"use client"

import { useRef, useEffect, useState } from "react"
import type { AIFoodResult } from "@/app/actions"

function Barcode() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const width = canvas.width
    const height = canvas.height
    ctx.clearRect(0, 0, width, height)
    ctx.fillStyle = "#2a2a2a"

    let x = 10
    while (x < width - 10) {
      const barWidth = Math.random() > 0.5 ? 2 : 1
      const gap = Math.random() > 0.6 ? 3 : 1
      ctx.fillRect(x, 0, barWidth, height)
      x += barWidth + gap
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      width={200}
      height={50}
      className="mx-auto opacity-80"
      aria-hidden="true"
    />
  )
}

function DottedLine() {
  return (
    <div
      className="border-t border-dashed border-receipt-foreground/20 my-3"
      aria-hidden="true"
    />
  )
}

function SeverityDot({ severity }: { severity: string }) {
  const color =
    severity === "high"
      ? "bg-accent"
      : severity === "medium"
        ? "bg-chart-2"
        : "bg-muted-foreground/40"
  return <span className={`inline-block h-2 w-2 rounded-full ${color}`} />
}

export function Receipt({ food }: { food: AIFoodResult }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const now = new Date()
  const dateStr = now.toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })
  const timeStr = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  })

  return (
    <div
      className={`w-full max-w-sm mx-auto transition-all duration-700 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <div className="bg-receipt receipt-shadow zigzag-bottom rounded-t-sm pt-8 pb-8 px-6">
        {/* Header */}
        <div className="text-center font-mono">
          <p className="text-3xl mb-2">{food.emoji}</p>
          <h2 className="text-base font-bold tracking-[0.2em] text-receipt-foreground uppercase">
            Warning Receipt
          </h2>
          <p className="text-xs text-receipt-foreground/50 mt-1 tracking-wider">
            {dateStr} {timeStr}
          </p>
          <p className="text-xs text-receipt-foreground/40 mt-0.5 tracking-wider">
            {"ORDER #"}
            {Math.floor(Math.random() * 9000 + 1000)}
          </p>
        </div>

        <DottedLine />

        {/* Summary */}
        <div className="font-mono">
          <p className="text-[10px] uppercase tracking-[0.15em] text-receipt-foreground/50 mb-2 font-bold">
            Risk Analysis
          </p>
          <p className="text-xs leading-relaxed text-receipt-foreground/80">
            {food.summary}
          </p>
        </div>

        <DottedLine />

        {/* Side Effects */}
        <div className="font-mono">
          <p className="text-[10px] uppercase tracking-[0.15em] text-receipt-foreground/50 mb-3 font-bold">
            Itemized Risks
          </p>
          <ul className="space-y-2" role="list">
            {food.risks.map((risk, i) => (
              <li
                key={i}
                className="flex items-center justify-between text-xs text-receipt-foreground/80"
              >
                <span className="flex items-center gap-2">
                  <SeverityDot severity={risk.severity} />
                  <span className={risk.severity === "high" ? "font-bold" : ""}>
                    {risk.label}
                  </span>
                </span>
                <span className="flex-1 mx-2 border-b border-dotted border-receipt-foreground/15" />
                <span className="text-receipt-foreground/50 tabular-nums">
                  {"x1"}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <DottedLine />

        {/* Total */}
        <div className="font-mono flex items-center justify-between text-sm font-bold text-receipt-foreground">
          <span>TOTAL RISKS</span>
          <span>{food.risks.length}</span>
        </div>

        <DottedLine />

        {/* Barcode */}
        <div className="text-center mt-4">
          <Barcode />
          <p className="font-mono text-[10px] text-receipt-foreground/40 mt-2 tracking-[0.3em] uppercase">
            {food.slogan}
          </p>
        </div>

        {/* Footer */}
        <div className="text-center mt-4">
          <p className="font-mono text-[9px] text-receipt-foreground/30 tracking-wider">
            FOOD RISK SCANNER v1.0
          </p>
          <p className="font-mono text-[9px] text-receipt-foreground/30 tracking-wider">
            For educational purposes only
          </p>
        </div>
      </div>
    </div>
  )
}
