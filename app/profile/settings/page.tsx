"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuth } from "@/context/auth-context"
import { useLanguage } from "@/context/language-context"

export default function SettingsPage() {
  const router = useRouter()
  const { user, isAuthenticated, isLoading } = useAuth()
  const { t } = useLanguage()
  const [activeTab, setActiveTab] = useState("profile")

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login")
    }
  }, [isLoading, isAuthenticated, router])

  if (isLoading || !isAuthenticated) {
    return <div className="container mx-auto py-10">Loading...</div>
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex flex-col space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{t("settings")}</h1>
          <p className="text-muted-foreground">{t("manage_your_account_settings")}</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="profile">{t("profile")}</TabsTrigger>
            <TabsTrigger value="account">{t("account")}</TabsTrigger>
            <TabsTrigger value="notifications">{t("notifications")}</TabsTrigger>
          </TabsList>
          <TabsContent value="profile" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>{t("profile_information")}</CardTitle>
                <CardDescription>{t("update_your_profile_information")}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col items-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={user?.avatar} alt={user?.name} />
                    <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col space-y-2">
                    <Button variant="outline" size="sm">
                      {t("change_avatar")}
                    </Button>
                    <Button variant="outline" size="sm">
                      {t("remove_avatar")}
                    </Button>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">{t("first_name")}</Label>
                    <Input id="firstName" defaultValue={user?.name?.split(" ")[0]} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">{t("last_name")}</Label>
                    <Input id="lastName" defaultValue={user?.name?.split(" ")[1]} />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">{t("bio")}</Label>
                  <Textarea id="bio" placeholder={t("tell_us_about_yourself")} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="language">{t("preferred_language")}</Label>
                  <Select defaultValue="en">
                    <SelectTrigger id="language">
                      <SelectValue placeholder={t("select_language")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="ru">Русский</SelectItem>
                      <SelectItem value="uz">O'zbek</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end space-x-2">
                <Button variant="outline">{t("cancel")}</Button>
                <Button>{t("save_changes")}</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="account" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>{t("account_settings")}</CardTitle>
                <CardDescription>{t("update_your_account_settings")}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email">{t("email")}</Label>
                  <Input id="email" type="email" defaultValue={user?.email} />
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-medium">{t("change_password")}</h3>
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">{t("current_password")}</Label>
                      <Input id="currentPassword" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">{t("new_password")}</Label>
                      <Input id="newPassword" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">{t("confirm_password")}</Label>
                      <Input id="confirmPassword" type="password" />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-medium">{t("danger_zone")}</h3>
                  <p className="text-sm text-muted-foreground">{t("danger_zone_description")}</p>
                  <Button variant="destructive">{t("delete_account")}</Button>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end space-x-2">
                <Button variant="outline">{t("cancel")}</Button>
                <Button>{t("save_changes")}</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="notifications" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>{t("notification_settings")}</CardTitle>
                <CardDescription>{t("manage_your_notification_preferences")}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  {[
                    { id: "email", title: t("email_notifications"), description: t("receive_email_notifications") },
                    { id: "push", title: t("push_notifications"), description: t("receive_push_notifications") },
                    { id: "marketing", title: t("marketing_emails"), description: t("receive_marketing_emails") },
                    { id: "updates", title: t("course_updates"), description: t("receive_course_updates") },
                    { id: "reminders", title: t("lesson_reminders"), description: t("receive_lesson_reminders") },
                  ].map((item) => (
                    <div key={item.id} className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor={item.id}>{item.title}</Label>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                      <Switch id={item.id} defaultChecked={item.id !== "marketing"} />
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-end space-x-2">
                <Button variant="outline">{t("cancel")}</Button>
                <Button>{t("save_changes")}</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

