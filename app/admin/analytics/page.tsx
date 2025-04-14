"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Download, Users, BookOpen, DollarSign, Calendar } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"

export default function AnalyticsPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("overview")

  const handleDownloadReport = (reportType: string) => {
    toast({
      title: "Hisobot yuklab olinmoqda",
      description: `${reportType} hisoboti yuklab olinmoqda...`,
    })
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon" asChild>
            <Link href="/admin">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">Analitika</h1>
        </div>
        <Button onClick={() => handleDownloadReport("Umumiy")}>
          <Download className="mr-2 h-4 w-4" />
          Hisobotni yuklab olish
        </Button>
      </div>

      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Umumiy</TabsTrigger>
          <TabsTrigger value="users">Foydalanuvchilar</TabsTrigger>
          <TabsTrigger value="courses">Kurslar</TabsTrigger>
          <TabsTrigger value="revenue">Daromad</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Jami foydalanuvchilar</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,234</div>
                <p className="text-xs text-muted-foreground mt-1">
                  <span className="text-green-500">+12%</span> o'tgan oyga nisbatan
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Faol o'quvchilar</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">789</div>
                <p className="text-xs text-muted-foreground mt-1">
                  <span className="text-green-500">+5%</span> o'tgan oyga nisbatan
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Jami kurslar</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24</div>
                <p className="text-xs text-muted-foreground mt-1">
                  <span className="text-green-500">+3</span> o'tgan oyga nisbatan
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Oylik daromad</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24,560,000 so'm</div>
                <p className="text-xs text-muted-foreground mt-1">
                  <span className="text-green-500">+8%</span> o'tgan oyga nisbatan
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Umumiy statistika</CardTitle>
              <CardDescription>So'nggi 30 kun ichidagi faollik</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center bg-muted/20 rounded-md">
                <p className="text-muted-foreground">Grafik ma'lumotlari bu yerda ko'rsatiladi</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Foydalanuvchilar statistikasi</CardTitle>
              <CardDescription>Foydalanuvchilar soni va faolligi</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <div className="h-[300px] flex items-center justify-center bg-muted/20 rounded-md">
                  <p className="text-muted-foreground">Foydalanuvchilar grafigi bu yerda ko'rsatiladi</p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Foydalanuvchilar bo'yicha ma'lumotlar</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                          <Users className="h-4 w-4 inline mr-2" />
                          Yangi foydalanuvchilar
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">128</div>
                        <p className="text-xs text-muted-foreground mt-1">Bu oy</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                          <Users className="h-4 w-4 inline mr-2" />
                          Faol foydalanuvchilar
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">789</div>
                        <p className="text-xs text-muted-foreground mt-1">So'nggi 30 kun</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                          <Calendar className="h-4 w-4 inline mr-2" />
                          O'rtacha faollik
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">3.2 soat</div>
                        <p className="text-xs text-muted-foreground mt-1">Har bir foydalanuvchi uchun</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="courses" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Kurslar statistikasi</CardTitle>
              <CardDescription>Kurslar bo'yicha ma'lumotlar</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <div className="h-[300px] flex items-center justify-center bg-muted/20 rounded-md">
                  <p className="text-muted-foreground">Kurslar grafigi bu yerda ko'rsatiladi</p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Eng mashhur kurslar</h3>
                  <div className="rounded-md border overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b bg-muted/50">
                          <th className="py-3 px-4 text-left font-medium">Kurs nomi</th>
                          <th className="py-3 px-4 text-left font-medium">O'quvchilar</th>
                          <th className="py-3 px-4 text-left font-medium">Baholash</th>
                          <th className="py-3 px-4 text-left font-medium">Daromad</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { name: "Ingliz tili asoslari", students: 245, rating: 4.8, revenue: "294,000,000" },
                          { name: "IT ingliz tili", students: 187, rating: 4.9, revenue: "280,500,000" },
                          { name: "Web dasturlash", students: 156, rating: 4.7, revenue: "280,800,000" },
                          { name: "Python asoslari", students: 98, rating: 4.6, revenue: "137,200,000" },
                          { name: "Java dasturlash", students: 76, rating: 4.5, revenue: "121,600,000" },
                        ].map((course, i) => (
                          <tr key={i} className={i % 2 === 0 ? "bg-background" : "bg-muted/20"}>
                            <td className="py-3 px-4">{course.name}</td>
                            <td className="py-3 px-4">{course.students}</td>
                            <td className="py-3 px-4">{course.rating} / 5</td>
                            <td className="py-3 px-4">{course.revenue} so'm</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="revenue" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Daromad statistikasi</CardTitle>
              <CardDescription>Moliyaviy ko'rsatkichlar</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <div className="h-[300px] flex items-center justify-center bg-muted/20 rounded-md">
                  <p className="text-muted-foreground">Daromad grafigi bu yerda ko'rsatiladi</p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Daromad bo'yicha ma'lumotlar</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                          <DollarSign className="h-4 w-4 inline mr-2" />
                          Jami daromad
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">1,114,100,000 so'm</div>
                        <p className="text-xs text-muted-foreground mt-1">Barcha vaqt uchun</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                          <DollarSign className="h-4 w-4 inline mr-2" />
                          Oylik daromad
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">24,560,000 so'm</div>
                        <p className="text-xs text-muted-foreground mt-1">Joriy oy</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                          <BookOpen className="h-4 w-4 inline mr-2" />
                          Kurs boshiga daromad
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">46,420,000 so'm</div>
                        <p className="text-xs text-muted-foreground mt-1">O'rtacha</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

