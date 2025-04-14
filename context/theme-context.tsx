"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect, useCallback } from "react"

type Theme = "light" | "dark"

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("light")
  const [mounted, setMounted] = useState(false)

  // Temani qo'llash
  const applyTheme = useCallback((theme: Theme) => {
    const root = window.document.documentElement
    root.classList.remove("light", "dark")
    root.classList.add(theme)
  }, [])

  // Temani o'rnatish va localStorage-ga saqlash
  const setTheme = useCallback(
    (newTheme: Theme) => {
      setThemeState(newTheme)
      localStorage.setItem("theme", newTheme)
      applyTheme(newTheme)

      // Boshqa komponentlar uchun maxsus hodisa yuborish
      const event = new CustomEvent("themeChanged", { detail: newTheme })
      window.dispatchEvent(event)
    },
    [applyTheme],
  )

  // localStorage-dan temani olish
  useEffect(() => {
    setMounted(true)
    const savedTheme = localStorage.getItem("theme") as Theme
    if (savedTheme && ["light", "dark"].includes(savedTheme)) {
      setThemeState(savedTheme)
      applyTheme(savedTheme)
    } else {
      // Default to light if no valid theme is found
      setThemeState("light")
      applyTheme("light")
    }

    // Boshqa komponentlardan tema o'zgarishlarini tinglash
    const handleThemeEvent = (e: CustomEvent) => {
      if (e.detail && ["light", "dark"].includes(e.detail)) {
        setThemeState(e.detail as Theme)
        applyTheme(e.detail as Theme)
      }
    }

    window.addEventListener("themeChanged" as any, handleThemeEvent)

    return () => {
      window.removeEventListener("themeChanged" as any, handleThemeEvent)
    }
  }, [applyTheme])

  // Kontekst qiymati
  const value = {
    theme,
    setTheme,
  }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

// Tema kontekstini ishlatish uchun maxsus hook
export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}

