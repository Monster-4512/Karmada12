"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Users,
  BookOpen,
  GraduationCap,
  Briefcase,
  Calendar,
  MessageSquare,
  BarChart,
  FileText,
  Settings,
  Globe,
  HelpCircle,
  LogOut,
  Menu,
  X,
} from "lucide-react"
import { useState, useEffect } from "react"
import { useAdminLanguage } from "@/context/admin-language-context"
import { useIsMobile } from "@/hooks/use-is-mobile"

export default function AdminSidebar() {
  const pathname = usePathname()
  const { t } = useAdminLanguage()
  const isMobile = useIsMobile()
  const [isSidebarOpen, setIsSidebarOpen] = useState(!isMobile)

  // Update sidebar state when screen size changes
  useEffect(() => {
    setIsSidebarOpen(!isMobile)
  }, [isMobile])

  // Check if we're in the admin section
  const isAdminSection = pathname.startsWith("/admin")

  // If not in admin section, don't render the sidebar
  if (!isAdminSection) {
    return null
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const navItems = [
    { href: "/admin", icon: LayoutDashboard, label: "dashboard" },
    { href: "/admin/users", icon: Users, label: "users" },
    { href: "/admin/courses", icon: BookOpen, label: "courses" },
    { href: "/admin/teachers", icon: GraduationCap, label: "teachers" },
    { href: "/admin/jobs", icon: Briefcase, label: "jobs" },
    { href: "/admin/orders", icon: FileText, label: "orders" },
    { href: "/admin/schedule", icon: Calendar, label: "schedule" },
    { href: "/admin/chat", icon: MessageSquare, label: "chat" },
    { href: "/admin/analytics", icon: BarChart, label: "analytics" },
    { href: "/admin/reports", icon: FileText, label: "reports" },
    { href: "/admin/settings", icon: Settings, label: "settings" },
    { href: "/admin/website", icon: Globe, label: "website" },
    { href: "/admin/help", icon: HelpCircle, label: "help" },
  ]

  return (
    <>
      {/* Mobile toggle button */}
      <button
        className="fixed top-3 left-3 z-50 md:hidden bg-background p-2 rounded-md shadow-md"
        onClick={toggleSidebar}
        aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
      >
        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-background border-r transform transition-transform duration-200 ease-in-out md:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-center h-16 border-b">
            <span className="text-xl font-bold">{t("adminPanel")}</span>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-4">
            <ul className="space-y-1 px-2">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`flex items-center px-4 py-2 text-sm rounded-md transition-colors ${
                      pathname === item.href ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                    }`}
                  >
                    <item.icon className="mr-3 h-5 w-5" />
                    {t(item.label)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* View Site link */}
          <div className="p-4 border-t">
            <Link
              href="/"
              className="flex w-full items-center px-4 py-2 text-sm rounded-md hover:bg-muted transition-colors"
            >
              <Globe className="mr-3 h-5 w-5" />
              {t("viewSite")}
            </Link>
          </div>

          {/* Logout button */}
          <div className="p-4 border-t">
            <button className="flex w-full items-center px-4 py-2 text-sm text-red-500 rounded-md hover:bg-red-100 dark:hover:bg-red-900/20 transition-colors">
              <LogOut className="mr-3 h-5 w-5" />
              {t("logout")}
            </button>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isMobile && isSidebarOpen && (
        <div className="fixed inset-0 z-30 bg-black/50 md:hidden" onClick={() => setIsSidebarOpen(false)} />
      )}
    </>
  )
}

