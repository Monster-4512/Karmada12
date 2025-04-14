"use client"

import { useState, useEffect, useRef } from "react"
import { Check, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { useLanguage, type Language } from "@/context/language-context"
import { useOnClickOutside } from "@/hooks/use-on-click-outside"
import { usePathname } from "next/navigation"

export default function LanguageSwitcher() {
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const popoverRef = useRef<HTMLDivElement>(null)
  const { language, setLanguage, t } = useLanguage()
  const pathname = usePathname()

  // Close popover when clicking outside
  useOnClickOutside(popoverRef, () => setOpen(false))

  // After mounting, we have access to the language
  useEffect(() => {
    setMounted(true)
  }, [])

  // Handle language change
  const handleLanguageSelect = (value: string) => {
    try {
      const newLang = value as Language
      setLanguage(newLang)
      setOpen(false)
    } catch (error) {
      console.error("Error changing language:", error)
    }
  }

  if (!mounted) {
    return <Button variant="ghost" size="icon" className="w-9 h-9 opacity-0" />
  }

  const languages = [
    { value: "uz", label: "O'zbek" },
    { value: "ru", label: "Русский" },
    { value: "en", label: "English" },
  ]

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          role="combobox"
          aria-expanded={open}
          className="w-9 h-9 px-0"
          aria-label={t("language")}
        >
          <Globe className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">{t("language")}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" ref={popoverRef}>
        <Command>
          <CommandInput placeholder={t("language")} />
          <CommandList>
            <CommandEmpty>No language found.</CommandEmpty>
            <CommandGroup>
              {languages.map((lang) => (
                <CommandItem key={lang.value} value={lang.value} onSelect={handleLanguageSelect}>
                  <Check className={cn("mr-2 h-4 w-4", language === lang.value ? "opacity-100" : "opacity-0")} />
                  {lang.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

