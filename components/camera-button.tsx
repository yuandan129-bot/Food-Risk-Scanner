"use client"

import { Camera } from "lucide-react"

interface CameraButtonProps {
  onClick?: () => void
}

export function CameraButton({ onClick }: CameraButtonProps) {
  return (
    <button
      onClick={onClick}
      className="
        relative group
        h-12 w-12 rounded-2xl
        flex items-center justify-center
        transition-all duration-300
        hover:scale-105 active:scale-95
        shadow-md hover:shadow-lg
      "
      style={{
        background: "linear-gradient(145deg, rgba(200,200,210,0.9), rgba(160,160,170,0.8))",
        border: "1px solid rgba(255,255,255,0.5)",
      }}
      aria-label="Open camera to scan ingredients"
    >
      {/* Gloss highlight */}
      <div
        className="absolute inset-0 rounded-2xl opacity-60 pointer-events-none"
        style={{
          background: "linear-gradient(180deg, rgba(255,255,255,0.5) 0%, transparent 50%)",
        }}
        aria-hidden="true"
      />
      <Camera className="h-5 w-5 text-foreground/80 relative z-10" />
    </button>
  )
}
