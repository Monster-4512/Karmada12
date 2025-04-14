"use client"

import type React from "react"

import AdminSidebar from "@/components/admin-sidebar"
import { AdminHeader } from "@/components/admin-header"
import { LanguageProvider } from "@/context/language-context"
import { ThemeProvider } from "next-themes"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <LanguageProvider>
        <div id="admin-root" className="min-h-screen bg-background">
          <AdminSidebar />
          <div className="flex flex-col md:ml-64">
            <AdminHeader />
            <main className="flex-1 p-4 sm:p-6 md:p-8">{children}</main>
          </div>
        </div>
      </LanguageProvider>
    </ThemeProvider>
  )
}

