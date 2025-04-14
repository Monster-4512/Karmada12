"use client"

import type React from "react"

// import { ThemeProvider } from "@/components/theme-provider"
// import { LanguageProvider } from "@/context/language-context"
import { AuthProvider } from "@/context/auth-context"
import { NotificationProvider } from "@/context/notification-context"
import { PurchaseProvider } from "@/context/purchase-context"
// import { ThemeProvider as CustomThemeProvider } from "@/context/theme-context"

export function ClientProviders({ children }: { children: React.ReactNode }) {
  // Remove the language change event listeners that force page reload
  // This is now handled directly in the language-context.tsx

  return (
    <AuthProvider>
      <PurchaseProvider>
        <NotificationProvider>{children}</NotificationProvider>
      </PurchaseProvider>
    </AuthProvider>
  )
}

