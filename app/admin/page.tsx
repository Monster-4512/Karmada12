"use client"

import { useAdminLanguage } from "@/context/admin-language-context"

export default function AdminDashboard() {
  const { t, language } = useAdminLanguage()

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">{t("dashboard")}</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
          <div className="text-sm font-medium">totalUsers</div>
          <div className="text-3xl font-bold">1,234</div>
          <div className="text-sm text-green-500 mt-2">
            +12%{" "}
            {language === "uz"
              ? "o'tgan oyga nisbatan"
              : language === "ru"
                ? "по сравнению с прошлым месяцем"
                : "compared to last month"}
          </div>
        </div>

        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
          <div className="text-sm font-medium">totalCourses</div>
          <div className="text-3xl font-bold">24</div>
          <div className="text-sm text-green-500 mt-2">
            +3{" "}
            {language === "uz"
              ? "o'tgan oyga nisbatan"
              : language === "ru"
                ? "по сравнению с прошлым месяцем"
                : "compared to last month"}
          </div>
        </div>

        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
          <div className="text-sm font-medium">monthlyIncome</div>
          <div className="text-3xl font-bold">
            {language === "uz" ? "2 700 000 so'm" : language === "ru" ? "2 700 000 сум" : "$25,000"}
          </div>
          <div className="text-sm text-green-500 mt-2">
            +8%{" "}
            {language === "uz"
              ? "o'tgan oyga nisbatan"
              : language === "ru"
                ? "по сравнению с прошлым месяцем"
                : "compared to last month"}
          </div>
        </div>

        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
          <div className="text-sm font-medium">activeStudents</div>
          <div className="text-3xl font-bold">856</div>
          <div className="text-sm text-green-500 mt-2">
            +5%{" "}
            {language === "uz"
              ? "o'tgan oyga nisbatan"
              : language === "ru"
                ? "по сравнению с прошлым месяцем"
                : "compared to last month"}
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">
            {language === "uz"
              ? "So'nggi ro'yxatdan o'tganlar"
              : language === "ru"
                ? "Последние регистрации"
                : "Recent Registrations"}
          </h2>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gray-200"></div>
                  <div className="ml-3">
                    <div className="font-medium">User {i}</div>
                    <div className="text-sm text-muted-foreground">user{i}@example.com</div>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">2h ago</div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">
            {language === "uz" ? "So'nggi xaridlar" : language === "ru" ? "Последние покупки" : "Recent Purchases"}
          </h2>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded bg-gray-200"></div>
                  <div className="ml-3">
                    <div className="font-medium">Course {i}</div>
                    <div className="text-sm text-muted-foreground">User {i}</div>
                  </div>
                </div>
                <div className="text-sm font-medium">
                  {language === "uz" ? "250,000 so'm" : language === "ru" ? "250,000 сум" : "$25"}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

