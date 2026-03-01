"use client"

import { useState, useMemo, useCallback } from "react"
import { Search } from "lucide-react"
import { NavBar } from "@/components/nav-bar"
import { CameraButton } from "@/components/camera-button"
import { AdditiveTag } from "@/components/additive-tag"
import { AdditiveModal } from "@/components/additive-modal"
import {
  additiveDatabase,
  additiveCategories,
  type Additive,
} from "@/lib/food-data"

export default function ScannerPage() {
  const [query, setQuery] = useState("")
  const [selectedAdditive, setSelectedAdditive] = useState<Additive | null>(null)
  const [isFocused, setIsFocused] = useState(false)

  const filteredByCategory = useMemo(() => {
    const normalizedQuery = query.toLowerCase().trim()
    const filtered = normalizedQuery
      ? additiveDatabase.filter(
          (a) =>
            a.name.toLowerCase().includes(normalizedQuery) ||
            a.code.toLowerCase().includes(normalizedQuery) ||
            a.category.toLowerCase().includes(normalizedQuery)
        )
      : additiveDatabase

    const grouped: Record<string, Additive[]> = {}
    for (const cat of additiveCategories) {
      const items = filtered.filter((a) => a.category === cat)
      if (items.length > 0) {
        grouped[cat] = items
      }
    }
    return grouped
  }, [query])

  const handleTagClick = useCallback((additive: Additive) => {
    setSelectedAdditive(additive)
  }, [])

  const handleCloseModal = useCallback(() => {
    setSelectedAdditive(null)
  }, [])

  const handleCameraClick = () => {
    // Placeholder for camera/upload functionality
    alert("Camera/upload feature coming soon! This would use GPT-4o Vision to scan ingredient labels.")
  }

  return (
    <main className="mesh-gradient min-h-dvh pb-24">
      <div className="page-transition flex flex-col items-center px-4 pt-16 md:pt-24">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground text-balance">
            Ingredient Scanner
          </h1>
          <p className="text-sm text-muted-foreground mt-2 max-w-xs mx-auto">
            Explore common food additives and their safety profiles
          </p>
        </div>

        {/* Search + Camera */}
        <div className="w-full max-w-md mx-auto flex items-center gap-3">
          <div
            className={`
              relative flex-1 flex items-center
              glass-card rounded-2xl
              transition-all duration-300
              ${isFocused ? "shadow-lg ring-2 ring-primary/10" : "shadow-md"}
            `}
          >
            <Search className="absolute left-4 h-5 w-5 text-muted-foreground pointer-events-none" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="Search additives..."
              className="w-full bg-transparent py-4 pl-12 pr-4 text-foreground placeholder:text-muted-foreground/60 focus:outline-none text-base rounded-2xl"
              aria-label="Search for food additives"
            />
          </div>
          <CameraButton onClick={handleCameraClick} />
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 mt-6 text-[11px] text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            Safe
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-amber-400" />
            Caution
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-red-400" />
            Avoid
          </span>
        </div>

        {/* Additive Categories */}
        <div className="w-full max-w-2xl mt-8 space-y-8">
          {Object.entries(filteredByCategory).map(([category, additives]) => (
            <section key={category}>
              <h2 className="text-xs uppercase tracking-[0.15em] text-muted-foreground font-semibold mb-3 px-1">
                {category}
              </h2>
              <div className="flex flex-wrap gap-2">
                {additives.map((additive) => (
                  <AdditiveTag
                    key={additive.code}
                    additive={additive}
                    onClick={handleTagClick}
                  />
                ))}
              </div>
            </section>
          ))}

          {Object.keys(filteredByCategory).length === 0 && (
            <div className="text-center py-12">
              <div className="glass-card inline-block rounded-2xl px-8 py-6">
                <p className="text-4xl mb-3">{"🧪"}</p>
                <p className="text-sm text-muted-foreground">
                  No additives match your search.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      <AdditiveModal additive={selectedAdditive} onClose={handleCloseModal} />

      <NavBar />
    </main>
  )
}
