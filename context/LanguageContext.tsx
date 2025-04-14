"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect, useCallback } from "react"
import { useRouter, usePathname } from "next/navigation"

// Define available languages
export type Language = "uz" | "ru" | "en"

// Define translations interface
interface Translations {
  [key: string]: {
    [key: string]: string
  }
}

// Define language context interface
interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
  translations: Translations
}

// Default translations
const defaultTranslations: Translations = {
  uz: {
    home: "Bosh sahifa",
    courses: "Kurslar",
    jobs: "Ish o'rinlari",
    about: "Biz haqimizda",
    contact: "Bog'lanish",
    login: "Kirish",
    register: "Ro'yxatdan o'tish",
    profile: "Profil",
    logout: "Chiqish",
    my_courses: "Mening kurslarim",
    cart: "Savatcha",
    search: "Qidirish",
    notifications: "Bildirishnomalar",
    mark_all_as_read: "Barchasini o'qilgan deb belgilash",
    no_notifications: "Bildirishnomalar yo'q",
    language: "Til",
    theme: "Mavzu",
    light: "Yorug'",
    dark: "Qorong'i",
    system: "Tizim",
    // Add more translations as needed
  },
  ru: {
    home: "Главная",
    courses: "Курсы",
    jobs: "Вакансии",
    about: "О нас",
    contact: "Контакты",
    login: "Вход",
    register: "Регистрация",
    profile: "Профиль",
    logout: "Выход",
    my_courses: "Мои курсы",
    cart: "Корзина",
    search: "Поиск",
    notifications: "Уведомления",
    mark_all_as_read: "Отметить все как прочитанные",
    no_notifications: "Нет уведомлений",
    language: "Язык",
    theme: "Тема",
    light: "Светлая",
    dark: "Темная",
    system: "Системная",
    // Add more translations as needed
  },
  en: {
    home: "Home",
    courses: "Courses",
    jobs: "Jobs",
    about: "About",
    contact: "Contact",
    login: "Login",
    register: "Register",
    profile: "Profile",
    logout: "Logout",
    my_courses: "My Courses",
    cart: "Cart",
    search: "Search",
    notifications: "Notifications",
    mark_all_as_read: "Mark all as read",
    no_notifications: "No notifications",
    language: "Language",
    theme: "Theme",
    light: "Light",
    dark: "Dark",
    system: "System",
    // Add more translations as needed
  },
}

// Create language context
const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// Language provider component
export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [language, setLanguageState] = useState<Language>("uz")
  const [translations, setTranslations] = useState<Translations>(defaultTranslations)
  const [mounted, setMounted] = useState(false)

  // Initialize language from localStorage
  useEffect(() => {
    setMounted(true)
    const savedLanguage = localStorage.getItem("language")
    if (savedLanguage && ["uz", "ru", "en"].includes(savedLanguage)) {
      setLanguageState(savedLanguage as Language)
    }

    // Create a custom event for language changes
    const handleLanguageEvent = (e: CustomEvent) => {
      if (e.detail && ["uz", "ru", "en"].includes(e.detail)) {
        setLanguageState(e.detail as Language)
      }
    }

    // Add event listener for language changes
    window.addEventListener("languageChanged" as any, handleLanguageEvent)

    return () => {
      window.removeEventListener("languageChanged" as any, handleLanguageEvent)
    }
  }, [])

  // Set language and save to localStorage
  const setLanguage = useCallback(
    (lang: Language) => {
      setLanguageState(lang)
      localStorage.setItem("language", lang)

      // Dispatch custom event for other components
      const event = new CustomEvent("languageChanged", { detail: lang })
      window.dispatchEvent(event)

      // Force refresh the page to update all components
      router.refresh()
    },
    [router],
  )

  // Translation function
  const t = useCallback(
    (key: string): string => {
      if (!mounted) return key
      return translations[language]?.[key] || key
    },
    [language, translations, mounted],
  )

  // Set global language variable for non-React components
  useEffect(() => {
    if (mounted && typeof window !== "undefined") {
      window.__GLOBAL_LANGUAGE = {
        current: language,
        t: (key: string) => translations[language]?.[key] || key,
      }
    }
  }, [language, translations, mounted])

  // Context value
  const value = {
    language,
    setLanguage,
    t,
    translations,
  }

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

// Custom hook to use language context
export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    // If context is undefined, try to use global language
    if (typeof window !== "undefined" && window.__GLOBAL_LANGUAGE) {
      return {
        language: window.__GLOBAL_LANGUAGE.current as Language,
        setLanguage: (lang: Language) => {
          localStorage.setItem("language", lang)
          window.__GLOBAL_LANGUAGE.current = lang
          // Dispatch custom event
          const event = new CustomEvent("languageChanged", { detail: lang })
          window.dispatchEvent(event)
          // Reload page to apply changes
          window.location.reload()
        },
        t: (key: string) => window.__GLOBAL_LANGUAGE.t(key) || key,
        translations: defaultTranslations,
      }
    }
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}

// Declare global window interface
declare global {
  interface Window {
    __GLOBAL_LANGUAGE: {
      current: string
      t: (key: string) => string
    }
  }
}

