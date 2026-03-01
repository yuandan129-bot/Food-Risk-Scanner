"use client"

import { useState, useRef, useEffect } from "react"
import { Search } from "lucide-react"

interface SearchBarProps {
  onSearch: (query: string) => void
  placeholder?: string
  className?: string
}

export function SearchBar({
  onSearch,
  placeholder = "Search a food...",
  className = "",
}: SearchBarProps) {
  const [query, setQuery] = useState("")
  const [isFocused, setIsFocused] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      onSearch(query.trim())
    }
  }

  return (
    <form onSubmit={handleSubmit} className={`w-full max-w-md mx-auto ${className}`}>
      <div
        className={`
          relative flex items-center
          glass-card rounded-2xl
          transition-all duration-300
          ${isFocused ? "shadow-lg ring-2 ring-primary/10" : "shadow-md"}
        `}
      >
        <Search className="absolute left-4 h-5 w-5 text-muted-foreground pointer-events-none" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className="w-full bg-transparent py-4 pl-12 pr-4 text-foreground placeholder:text-muted-foreground/60 focus:outline-none text-base rounded-2xl"
          aria-label="Search for a food item"
        />
        {query.trim() && (
          <button
            type="submit"
            className="absolute right-3 bg-primary text-primary-foreground rounded-xl px-4 py-1.5 text-sm font-medium hover:opacity-90 transition-opacity"
          >
            Scan
          </button>
        )}
      </div>
    </form>
  )
}
