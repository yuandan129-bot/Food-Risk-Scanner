"use client"

import { useState, useCallback } from "react"
import { NavBar } from "@/components/nav-bar"
import { SearchBar } from "@/components/search-bar"
import { Receipt } from "@/components/receipt"
import { analyzeFoodWithAI, type AIFoodResult } from "@/app/actions"

const suggestions = ["coffee", "milk", "banana", "soda", "chocolate", "egg"]

export default function HomePage() {
  const [result, setResult] = useState<AIFoodResult | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)

  const handleSearch = useCallback(async (query: string) => {
    setIsLoading(true)
    setHasSearched(true)
    setResult(null)

    try {
      const aiResult = await analyzeFoodWithAI(query)
      setResult(aiResult)
    } catch (error) {
      console.error("Search error:", error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  return (
    <main className="mesh-gradient min-h-dvh pb-24">
      <div className="page-transition flex flex-col items-center px-4 pt-16 md:pt-24">
        {/* Logo / Title */}
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground text-balance">
            Food Risk Scanner
          </h1>
          <p className="text-sm text-muted-foreground mt-2 max-w-xs mx-auto">
            Discover the hidden side effects of everyday foods
          </p>
        </div>

        {/* Search */}
        <SearchBar onSearch={handleSearch} />

        {/* Suggestion pills */}
        {!hasSearched && (
          <div className="flex flex-wrap justify-center gap-2 mt-6 max-w-md">
            {suggestions.map((item) => (
              <button
                key={item}
                onClick={() => handleSearch(item)}
                className="glass-card rounded-full px-4 py-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors capitalize"
              >
                {item}
              </button>
            ))}
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="mt-8 w-full max-w-sm mx-auto">
            <div className="glass-card rounded-t-sm pt-8 pb-8 px-6 animate-pulse">
              <div className="text-center">
                <div className="text-4xl mb-4">🖨️</div>
                <p className="text-sm text-muted-foreground font-mono">
                  正在打印风险小票...
                </p>
                <div className="mt-6 space-y-3">
                  <div className="h-3 bg-muted-foreground/10 rounded w-3/4 mx-auto" />
                  <div className="h-3 bg-muted-foreground/10 rounded w-full" />
                  <div className="h-3 bg-muted-foreground/10 rounded w-5/6 mx-auto" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Result */}
        {!isLoading && result && (
          <div className="mt-8 w-full">
            <Receipt food={result} />
          </div>
        )}
      </div>

      <NavBar />
    </main>
  )
}
