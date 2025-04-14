"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { ArrowLeft, Download } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useToast } from "@/hooks/use-toast"
import AdminSidebar from "@/components/admin-sidebar"

type JobApplication = {
  id: string
  jobId: string
  jobTitle: string
  firstName: string
  lastName: string
  email: string
  phone: string
  coverLetter: string
  resume: string
  passport: string
  diploma: string
  certificates: string[]
  status: "new" | "reviewed" | "interviewed" | "accepted" | "rejected"
  submittedAt: string
}

export default function ApplicationDetailsPage() {
  const router = useRouter()
  const params = useParams()
  const { toast } = useToast()
  const [application, setApplication] = useState<JobApplication | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadApplication = () => {
      try {
        const id = params.id as string
        const storedApplications = localStorage.getItem("jobApplications")

        if (storedApplications) {
          const parsedApplications: JobApplication[] = JSON.parse(storedApplications)
          const foundApplication = parsedApplications.find((app) => app.id === id)

          if (foundApplication) {
            setApplication(foundApplication)
          } else {
            toast({
              title: "Xatolik",
              description: "Ariza topilmadi",
              variant: "destructive",
            })
            router.push("/admin/jobs")
          }
        } else {
          toast({
            title: "Xatolik",
            description: "Arizalar ma'lumotlari topilmadi",
            variant: "destructive",
          })
          router.push("/admin/jobs")
        }
      } catch (error) {
        console.error("Failed to load application:", error)
        toast({
          title: "Xatolik",
          description: "Ariza ma'lumotlarini yuklashda xatolik yuz berdi",
          variant: "destructive",
        })
        router.push("/admin/jobs")
      } finally {
        setIsLoading(false)
      }
    }

    loadApplication()
  }, [params.id, router, toast])

  const updateApplicationStatus = (status: JobApplication["status"]) => {
    if (!application) return

    try {
      const storedApplications = localStorage.getItem("jobApplications")

      if (storedApplications) {
        const parsedApplications: JobApplication[] = JSON.parse(storedApplications)
        const updatedApplications = parsedApplications.map((app) =>
          app.id === application.id ? { ...app, status } : app,
        )

        localStorage.setItem("jobApplications", JSON.stringify(updatedApplications))
        setApplication({ ...application, status })

        toast({
          title: "Status yangilandi",
          description: "Ariza statusi muvaffaqiyatli yangilandi",
        })
      }
    } catch (error) {
      console.error("Failed to update application status:", error)
      toast({
        title: "Xatolik",
        description: "Ariza statusini yangilashda xatolik yuz berdi",
        variant: "destructive",
      })
    }
  }

  const getStatusBadge = (status: JobApplication["status"]) => {
    switch (status) {
      case "new":
        return <Badge className="bg-blue-500">Yangi</Badge>
      case "reviewed":
        return <Badge className="bg-yellow-500">Ko'rib chiqilgan</Badge>
      case "interviewed":
        return <Badge className="bg-purple-500">Suhbat o'tkazilgan</Badge>
      case "accepted":
        return <Badge className="bg-green-500">Qabul qilingan</Badge>
      case "rejected":
        return <Badge className="bg-red-500">Rad etilgan</Badge>
      default:
        return <Badge>Noma'lum</Badge>
    }
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen bg-muted/20">
        <AdminSidebar />
        <div className="flex-1 flex items-center justify-center">
          <p>Yuklanmoqda...</p>
        </div>
      </div>
    )
  }

  if (!application) {
    return (
      <div className="flex min-h-screen bg-muted/20">
        <AdminSidebar />
        <div className="flex-1 flex items-center justify-center">
          <p>Ariza topilmadi</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-muted/20">
      <AdminSidebar />

      <div className="flex-1">
        <div className="container py-8">
          <div className="flex items-center mb-6">
            <Button variant="outline" size="icon" className="mr-2" onClick={() => router.push("/admin/jobs")}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-2xl font-bold">Ariza ma'lumotlari</h1>
          </div>

          <Card className="mb-6">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>
                <div className="flex items-center gap-2">
                  <span>#{application.id.slice(0, 8)}</span>
                  {getStatusBadge(application.status)}
                </div>
              </CardTitle>
              <div className="text-sm text-muted-foreground">
                Topshirilgan sana: {new Date(application.submittedAt).toLocaleString()}
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-medium">Lavozim ma'lumotlari</h3>
                <p className="text-sm text-muted-foreground mt-1">{application.jobTitle}</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium">Shaxsiy ma'lumotlar</h3>
                  <div className="mt-2 space-y-2">
                    <div className="flex items-center">
                      <Avatar className="h-10 w-10 mr-3">
                        <AvatarFallback>
                          {application.firstName[0]}
                          {application.lastName[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">
                          {application.firstName} {application.lastName}
                        </p>
                        <p className="text-sm text-muted-foreground">{application.email}</p>
                      </div>
                    </div>
                    <p className="text-sm">
                      <span className="font-medium">Telefon:</span> {application.phone}
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium">Status</h3>
                  <div className="mt-2 space-y-2">
                    <div className="flex flex-wrap gap-2">
                      <Button
                        size="sm"
                        variant={application.status === "new" ? "default" : "outline"}
                        onClick={() => updateApplicationStatus("new")}
                      >
                        Yangi
                      </Button>
                      <Button
                        size="sm"
                        variant={application.status === "reviewed" ? "default" : "outline"}
                        onClick={() => updateApplicationStatus("reviewed")}
                      >
                        Ko'rib chiqilgan
                      </Button>
                      <Button
                        size="sm"
                        variant={application.status === "interviewed" ? "default" : "outline"}
                        onClick={() => updateApplicationStatus("interviewed")}
                      >
                        Suhbat o'tkazilgan
                      </Button>
                      <Button
                        size="sm"
                        variant={application.status === "accepted" ? "default" : "outline"}
                        className={application.status === "accepted" ? "bg-green-600" : ""}
                        onClick={() => updateApplicationStatus("accepted")}
                      >
                        Qabul qilingan
                      </Button>
                      <Button
                        size="sm"
                        variant={application.status === "rejected" ? "default" : "outline"}
                        className={application.status === "rejected" ? "bg-red-600" : ""}
                        onClick={() => updateApplicationStatus("rejected")}
                      >
                        Rad etilgan
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium">Motivatsion xat</h3>
                <div className="mt-2 p-4 bg-muted rounded-md">
                  <p className="whitespace-pre-wrap">{application.coverLetter}</p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium">Hujjatlar</h3>
                <div className="mt-2 space-y-2">
                  <div className="flex items-center justify-between p-3 bg-muted rounded-md">
                    <span>Rezyume</span>
                    <Button size="sm" variant="outline">
                      <Download className="h-4 w-4 mr-1" />
                      Yuklab olish
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted rounded-md">
                    <span>Passport</span>
                    <Button size="sm" variant="outline">
                      <Download className="h-4 w-4 mr-1" />
                      Yuklab olish
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted rounded-md">
                    <span>Diplom</span>
                    <Button size="sm" variant="outline">
                      <Download className="h-4 w-4 mr-1" />
                      Yuklab olish
                    </Button>
                  </div>
                  {application.certificates && application.certificates.length > 0 && (
                    <div className="flex items-center justify-between p-3 bg-muted rounded-md">
                      <span>Sertifikatlar</span>
                      <Button size="sm" variant="outline">
                        <Download className="h-4 w-4 mr-1" />
                        Yuklab olish
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

