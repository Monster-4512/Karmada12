"use client"

import { useState, useRef } from "react"
import { Globe, ChevronDown, ExternalLink } from "lucide-react"
import { useAdminLanguage, type Language } from "@/context/admin-language-context"
import { AdminThemeToggle } from "@/components/admin-theme-toggle"
import { useOnClickOutside } from "@/hooks/use-on-click-outside"
import Link from "next/link"

export function AdminHeader() {
  const { language, setLanguage, t } = useAdminLanguage()
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useOnClickOutside(dropdownRef, () => setIsLanguageDropdownOpen(false))

  // Handle language selection
  const handleLanguageSelect = (lang: Language) => {
    setLanguage(lang)
    setIsLanguageDropdownOpen(false)
  }

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:px-6">
      <div className="hidden md:block text-lg font-semibold">{t("adminPanel")}</div>

      <div className="ml-auto flex items-center gap-4">
        {/* View Site Link */}
        <Link href="/" className="flex items-center text-sm font-medium hover:text-primary transition-colors">
          <ExternalLink className="mr-1 h-4 w-4" />
          {t("viewSite")}
        </Link>

        {/* Language Switcher */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
            className="flex items-center justify-between px-3 py-1.5 text-sm font-medium rounded-md bg-secondary text-foreground hover:bg-secondary/80 transition-colors"
            aria-haspopup="true"
            aria-expanded={isLanguageDropdownOpen}
          >
            <span className="flex items-center">
              <Globe className="mr-2 h-4 w-4" />
              {language === "en" ? "English" : language === "ru" ? "Русский" : "O'zbek"}
            </span>
            <ChevronDown
              className={`ml-2 h-4 w-4 transition-transform ${isLanguageDropdownOpen ? "rotate-180" : ""}`}
            />
          </button>

          {isLanguageDropdownOpen && (
            <div className="absolute right-0 mt-1 w-40 rounded-md shadow-lg bg-background border border-border z-50">
              <div className="py-1" role="menu" aria-orientation="vertical">
                <button
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-secondary transition-colors ${language === "en" ? "bg-primary/10 font-medium" : ""}`}
                  role="menuitem"
                  onClick={() => handleLanguageSelect("en")}
                >
                  English
                </button>
                <button
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-secondary transition-colors ${language === "ru" ? "bg-primary/10 font-medium" : ""}`}
                  role="menuitem"
                  onClick={() => handleLanguageSelect("ru")}
                >
                  Русский
                </button>
                <button
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-secondary transition-colors ${language === "uz" ? "bg-primary/10 font-medium" : ""}`}
                  role="menuitem"
                  onClick={() => handleLanguageSelect("uz")}
                >
                  O'zbek
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Theme Toggle */}
        <AdminThemeToggle />
      </div>
    </header>
  )
}

