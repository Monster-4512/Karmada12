"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

// Define available languages
export type Language = "en" | "ru" | "uz"

// Define translations interface
interface Translations {
  [key: string]: {
    [key: string]: string
  }
}

// Define context interface
interface AdminLanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

// Default translations for admin panel
const defaultTranslations: Translations = {
  en: {
    dashboard: "Dashboard",
    users: "Users",
    courses: "Courses",
    teachers: "Teachers",
    jobs: "Jobs",
    schedule: "Schedule",
    chat: "Chat",
    analytics: "Analytics",
    reports: "Reports",
    settings: "Settings",
    website: "Website",
    help: "Help",
    logout: "Logout",
    language: "Language",
    english: "English",
    russian: "Russian",
    uzbek: "Uzbek",
    darkMode: "Dark Mode",
    lightMode: "Light Mode",
    adminPanel: "Admin Panel",
    viewSite: "View Site",
    orders: "Orders",
    // Add more translations as needed
  },
  ru: {
    dashboard: "Панель управления",
    users: "Пользователи",
    courses: "Курсы",
    teachers: "Преподаватели",
    jobs: "Вакансии",
    schedule: "Расписание",
    chat: "Чат",
    analytics: "Аналитика",
    reports: "Отчеты",
    settings: "Настройки",
    website: "Веб-сайт",
    help: "Помощь",
    logout: "Выход",
    language: "Язык",
    english: "Английский",
    russian: "Русский",
    uzbek: "Узбекский",
    darkMode: "Темный режим",
    lightMode: "Светлый режим",
    adminPanel: "Панель администратора",
    viewSite: "Просмотр сайта",
    orders: "Заказы",
    // Add more translations as needed
  },
  uz: {
    dashboard: "Boshqaruv paneli",
    users: "Foydalanuvchilar",
    courses: "Kurslar",
    teachers: "O'qituvchilar",
    jobs: "Ish o'rinlari",
    schedule: "Jadval",
    chat: "Chat",
    analytics: "Tahlillar",
    reports: "Hisobotlar",
    settings: "Sozlamalar",
    website: "Veb-sayt",
    help: "Yordam",
    logout: "Chiqish",
    language: "Til",
    english: "Ingliz",
    russian: "Rus",
    uzbek: "O'zbek",
    darkMode: "Qorong'u rejim",
    lightMode: "Yorug' rejim",
    adminPanel: "Admin panel",
    viewSite: "Saytni ko'rish",
    orders: "Buyurtmalar",
    // Add more translations as needed
  },
}

// Create context with default values
const AdminLanguageContext = createContext<AdminLanguageContextType>({
  language: "en",
  setLanguage: () => {},
  t: (key: string) => key,
})

// Storage key for admin language preference
const STORAGE_KEY = "admin-language-preference"

// Provider component
export function AdminLanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  // Load language preference from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedLanguage = localStorage.getItem(STORAGE_KEY) as Language
      if (savedLanguage && ["en", "ru", "uz"].includes(savedLanguage)) {
        setLanguage(savedLanguage)
        console.log("Loaded language from localStorage:", savedLanguage)
      }
    }
  }, [])

  // Save language preference to localStorage when it changes
  const handleSetLanguage = (newLang: Language) => {
    console.log("Setting language to:", newLang)
    setLanguage(newLang)
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, newLang)
    }
  }

  // Translation function
  const t = (key: string): string => {
    if (!defaultTranslations[language] || !defaultTranslations[language][key]) {
      // Fallback to English or return the key itself
      return defaultTranslations.en[key] || key
    }
    return defaultTranslations[language][key]
  }

  const contextValue = {
    language,
    setLanguage: handleSetLanguage,
    t,
  }

  return <AdminLanguageContext.Provider value={contextValue}>{children}</AdminLanguageContext.Provider>
}

// Custom hook to use the admin language context
export function useAdminLanguage() {
  const context = useContext(AdminLanguageContext)
  if (!context) {
    throw new Error("useAdminLanguage must be used within an AdminLanguageProvider")
  }
  return context
}

export default AdminLanguageProvider

