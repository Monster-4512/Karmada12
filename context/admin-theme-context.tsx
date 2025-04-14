"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { useTheme } from "next-themes"

type AdminThemeContextType = {
  theme: string
  setTheme: (theme: string) => void
}

const AdminThemeContext = createContext<AdminThemeContextType>({
  theme: "light",
  setTheme: () => {},
})

export function AdminThemeProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  // After mounting, we have access to the theme
  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <AdminThemeContext.Provider
      value={{
        theme: theme || "light",
        setTheme,
      }}
    >
      {children}
    </AdminThemeContext.Provider>
  )
}

export const useAdminTheme = () => useContext(AdminThemeContext)

