"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Save, Globe, Image, FileText, Layout } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/context/auth-context"
import AdminSidebar from "@/components/admin-sidebar"
import { PERMISSIONS } from "@/context/auth-context"

export default function WebsitePage() {
  const { toast } = useToast()
  const { hasPermission } = useAuth()
  const [mounted, setMounted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [generalSettings, setGeneralSettings] = useState({
    siteName: "IT English Academy",
    siteDescription: "IT mutaxassislari uchun ingliz tili va IT kurslari",
    contactEmail: "info@itenglish.academy",
    contactPhone: "+998 90 123 45 67",
    address: "Toshkent sh., IT City, 3-bino",
  })

  const [homePageSettings, setHomePageSettings] = useState({
    heroTitle: "Ingliz tili va IT kurslarini o'rganing",
    heroDescription: "IT mutaxassislari uchun ingliz tilini o'rganing va xalqaro ish imkoniyatlariga ega bo'ling",
    showFeaturedCourses: true,
    showTestimonials: true,
    showPartners: true,
  })

  const [socialMediaSettings, setSocialMediaSettings] = useState({
    facebook: "https://facebook.com/itenglishacademy",
    instagram: "https://instagram.com/itenglishacademy",
    telegram: "https://t.me/itenglishacademy",
    youtube: "https://youtube.com/itenglishacademy",
  })

  useEffect(() => {
    setMounted(true)

    // Check if user has permission to manage website settings
    if (!hasPermission(PERMISSIONS.MANAGE_SETTINGS)) {
      toast({
        title: "Ruxsat yo'q",
        description: "Sizda veb-sayt sozlamalarini boshqarish uchun ruxsat yo'q",
        variant: "destructive",
      })
    }

    // Load settings from localStorage
    try {
      const storedGeneralSettings = localStorage.getItem("websiteGeneralSettings")
      const storedHomePageSettings = localStorage.getItem("websiteHomePageSettings")
      const storedSocialMediaSettings = localStorage.getItem("websiteSocialMediaSettings")

      if (storedGeneralSettings) {
        setGeneralSettings(JSON.parse(storedGeneralSettings))
      }

      if (storedHomePageSettings) {
        setHomePageSettings(JSON.parse(storedHomePageSettings))
      }

      if (storedSocialMediaSettings) {
        setSocialMediaSettings(JSON.parse(storedSocialMediaSettings))
      }
    } catch (error) {
      console.error("Failed to load website settings:", error)
    }
  }, [hasPermission, toast])

  const handleGeneralSettingsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setGeneralSettings((prev) => ({ ...prev, [name]: value }))
  }

  const handleHomePageSettingsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setHomePageSettings((prev) => ({ ...prev, [name]: value }))
  }

  const handleHomePageToggleChange = (name: string, checked: boolean) => {
    setHomePageSettings((prev) => ({ ...prev, [name]: checked }))
  }

  const handleSocialMediaSettingsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setSocialMediaSettings((prev) => ({ ...prev, [name]: value }))
  }

  const handleSaveSettings = (settingsType: string) => {
    setIsSubmitting(true)

    try {
      // Save settings to localStorage based on type
      if (settingsType === "general") {
        localStorage.setItem("websiteGeneralSettings", JSON.stringify(generalSettings))
      } else if (settingsType === "homePage") {
        localStorage.setItem("websiteHomePageSettings", JSON.stringify(homePageSettings))
      } else if (settingsType === "socialMedia") {
        localStorage.setItem("websiteSocialMediaSettings", JSON.stringify(socialMediaSettings))
      }

      toast({
        title: "Sozlamalar saqlandi",
        description: "Veb-sayt sozlamalari muvaffaqiyatli saqlandi",
      })
    } catch (error) {
      console.error("Failed to save website settings:", error)
      toast({
        title: "Xatolik",
        description: "Sozlamalarni saqlashda xatolik yuz berdi",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // If not mounted yet, return a placeholder to avoid hydration mismatch
  if (!mounted) {
    return (
      <div className="flex min-h-screen bg-muted/20">
        <div className="w-64 bg-card border-r"></div>
        <div className="flex-1"></div>
      </div>
    )
  }

  // If user doesn't have permission, show access denied message
  if (!hasPermission(PERMISSIONS.MANAGE_SETTINGS)) {
    return (
      <div className="flex min-h-screen bg-muted/20">
        <AdminSidebar />
        <div className="flex-1">
          <div className="container py-8">
            <div className="flex items-center gap-2 mb-6">
              <Link href="/admin">
                <Button variant="outline" size="icon">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </Link>
              <h1 className="text-2xl font-bold">Veb-sayt boshqaruvi</h1>
            </div>

            <Card>
              <CardContent className="py-10 text-center">
                <h2 className="text-xl font-bold mb-2">Ruxsat yo'q</h2>
                <p className="text-muted-foreground">
                  Sizda veb-sayt sozlamalarini boshqarish uchun ruxsat yo'q. Iltimos, administrator bilan bog'laning.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-muted/20">
      <div className="flex-1">
        <div className="container py-8">
          <div className="flex items-center gap-2 mb-6">
            <Link href="/admin">
              <Button variant="outline" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <h1 className="text-2xl font-bold">Veb-sayt boshqaruvi</h1>
          </div>

          <Tabs defaultValue="general">
            <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 mb-6 gap-1">
              <TabsTrigger value="general">
                <Globe className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Umumiy</span>
                <span className="sm:hidden">Umumiy</span>
              </TabsTrigger>
              <TabsTrigger value="homePage">
                <Layout className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Bosh sahifa</span>
                <span className="sm:hidden">Bosh</span>
              </TabsTrigger>
              <TabsTrigger value="socialMedia">
                <FileText className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Ijtimoiy tarmoqlar</span>
                <span className="sm:hidden">Ijtimoiy</span>
              </TabsTrigger>
              <TabsTrigger value="media">
                <Image className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Media</span>
                <span className="sm:hidden">Media</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="general">
              <Card>
                <CardHeader>
                  <CardTitle>Umumiy sozlamalar</CardTitle>
                  <CardDescription>Sayt uchun asosiy ma'lumotlarni o'zgartiring</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="siteName">Sayt nomi</Label>
                    <Input
                      id="siteName"
                      name="siteName"
                      value={generalSettings.siteName}
                      onChange={handleGeneralSettingsChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="siteDescription">Sayt tavsifi</Label>
                    <Textarea
                      id="siteDescription"
                      name="siteDescription"
                      value={generalSettings.siteDescription}
                      onChange={handleGeneralSettingsChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contactEmail">Aloqa email</Label>
                    <Input
                      id="contactEmail"
                      name="contactEmail"
                      type="email"
                      value={generalSettings.contactEmail}
                      onChange={handleGeneralSettingsChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contactPhone">Aloqa telefoni</Label>
                    <Input
                      id="contactPhone"
                      name="contactPhone"
                      value={generalSettings.contactPhone}
                      onChange={handleGeneralSettingsChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Manzil</Label>
                    <Textarea
                      id="address"
                      name="address"
                      value={generalSettings.address}
                      onChange={handleGeneralSettingsChange}
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={() => handleSaveSettings("general")} disabled={isSubmitting}>
                    {isSubmitting ? (
                      "Saqlanmoqda..."
                    ) : (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        Saqlash
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="homePage">
              <Card>
                <CardHeader>
                  <CardTitle>Bosh sahifa sozlamalari</CardTitle>
                  <CardDescription>Bosh sahifa ko'rinishini sozlang</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="heroTitle">Asosiy sarlavha</Label>
                    <Input
                      id="heroTitle"
                      name="heroTitle"
                      value={homePageSettings.heroTitle}
                      onChange={handleHomePageSettingsChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="heroDescription">Asosiy tavsif</Label>
                    <Textarea
                      id="heroDescription"
                      name="heroDescription"
                      value={homePageSettings.heroDescription}
                      onChange={handleHomePageSettingsChange}
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div>
                      <Label htmlFor="showFeaturedCourses">Mashhur kurslarni ko'rsatish</Label>
                      <p className="text-sm text-muted-foreground">
                        Bosh sahifada mashhur kurslar bo'limini ko'rsatish
                      </p>
                    </div>
                    <Switch
                      id="showFeaturedCourses"
                      checked={homePageSettings.showFeaturedCourses}
                      onCheckedChange={(checked) => handleHomePageToggleChange("showFeaturedCourses", checked)}
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div>
                      <Label htmlFor="showTestimonials">Fikrlarni ko'rsatish</Label>
                      <p className="text-sm text-muted-foreground">
                        Bosh sahifada o'quvchilar fikrlari bo'limini ko'rsatish
                      </p>
                    </div>
                    <Switch
                      id="showTestimonials"
                      checked={homePageSettings.showTestimonials}
                      onCheckedChange={(checked) => handleHomePageToggleChange("showTestimonials", checked)}
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div>
                      <Label htmlFor="showPartners">Hamkorlarni ko'rsatish</Label>
                      <p className="text-sm text-muted-foreground">Bosh sahifada hamkorlar bo'limini ko'rsatish</p>
                    </div>
                    <Switch
                      id="showPartners"
                      checked={homePageSettings.showPartners}
                      onCheckedChange={(checked) => handleHomePageToggleChange("showPartners", checked)}
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={() => handleSaveSettings("homePage")} disabled={isSubmitting}>
                    {isSubmitting ? (
                      "Saqlanmoqda..."
                    ) : (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        Saqlash
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="socialMedia">
              <Card>
                <CardHeader>
                  <CardTitle>Ijtimoiy tarmoqlar</CardTitle>
                  <CardDescription>Ijtimoiy tarmoq havolalarini sozlang</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="facebook">Facebook</Label>
                    <Input
                      id="facebook"
                      name="facebook"
                      value={socialMediaSettings.facebook}
                      onChange={handleSocialMediaSettingsChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="instagram">Instagram</Label>
                    <Input
                      id="instagram"
                      name="instagram"
                      value={socialMediaSettings.instagram}
                      onChange={handleSocialMediaSettingsChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="telegram">Telegram</Label>
                    <Input
                      id="telegram"
                      name="telegram"
                      value={socialMediaSettings.telegram}
                      onChange={handleSocialMediaSettingsChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="youtube">YouTube</Label>
                    <Input
                      id="youtube"
                      name="youtube"
                      value={socialMediaSettings.youtube}
                      onChange={handleSocialMediaSettingsChange}
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={() => handleSaveSettings("socialMedia")} disabled={isSubmitting}>
                    {isSubmitting ? (
                      "Saqlanmoqda..."
                    ) : (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        Saqlash
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="media">
              <Card>
                <CardHeader>
                  <CardTitle>Media fayllar</CardTitle>
                  <CardDescription>Sayt uchun media fayllarni boshqaring</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-center py-10">Media fayllar boshqaruvi tez orada qo'shiladi</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

