"use client"

import { useState, useEffect, useRef } from "react"
import { useLanguage, type Language } from "@/context/language-context"
import { ChevronDown, Globe } from "lucide-react"

export function AdminLanguageSwitcher() {
  const { language, setLanguage, t } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)

  // Set mounted state after component mounts to avoid hydration issues
  useEffect(() => {
    setMounted(true)
  }, [])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Toggle dropdown
  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  // Handle language selection
  const handleLanguageSelect = (lang: Language) => {
    setLanguage(lang)
    setIsOpen(false)
  }

  // Get language display name
  const getLanguageDisplay = (lang: Language) => {
    switch (lang) {
      case "en":
        return "English"
      case "ru":
        return "Русский"
      case "uz":
        return "O'zbek"
      default:
        return "English"
    }
  }

  // Don't render anything during SSR to avoid hydration issues
  if (!mounted) {
    return <div className="w-28 h-9 bg-secondary/30 rounded animate-pulse"></div>
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="flex items-center justify-between w-28 px-3 py-2 text-sm font-medium rounded-md bg-secondary text-foreground hover:bg-secondary/80 transition-colors"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <span className="flex items-center gap-2">
          <Globe className="h-4 w-4" />
          {getLanguageDisplay(language)}
        </span>
        <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1 w-28 rounded-md shadow-lg bg-background border border-border z-50">
          <div className="py-1" role="menu" aria-orientation="vertical">
            <button
              className={`w-full text-left px-4 py-2 text-sm hover:bg-secondary transition-colors flex items-center gap-2 ${language === "en" ? "bg-primary/10 font-medium" : ""}`}
              role="menuitem"
              onClick={() => handleLanguageSelect("en")}
            >
              <span>🇬🇧</span> English
            </button>
            <button
              className={`w-full text-left px-4 py-2 text-sm hover:bg-secondary transition-colors flex items-center gap-2 ${language === "ru" ? "bg-primary/10 font-medium" : ""}`}
              role="menuitem"
              onClick={() => handleLanguageSelect("ru")}
            >
              <span>🇷🇺</span> Русский
            </button>
            <button
              className={`w-full text-left px-4 py-2 text-sm hover:bg-secondary transition-colors flex items-center gap-2 ${language === "uz" ? "bg-primary/10 font-medium" : ""}`}
              role="menuitem"
              onClick={() => handleLanguageSelect("uz")}
            >
              <span>🇺🇿</span> O'zbek
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminLanguageSwitcher

