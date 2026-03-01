"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Search, ScanLine } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/", label: "Receipt", icon: Search },
  { href: "/scanner", label: "Scanner", icon: ScanLine },
]

export function NavBar() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <div className="glass-card flex items-center gap-1 rounded-full px-2 py-2 shadow-lg">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300",
                isActive
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon className="h-4 w-4" />
              <span>{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
