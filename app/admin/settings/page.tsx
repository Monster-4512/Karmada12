"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Save } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

export default function AdminSettingsPage() {
  const { toast } = useToast()

  const [generalSettings, setGeneralSettings] = useState({
    siteName: "IT English Academy",
    siteDescription: "IT mutaxassislari uchun ingliz tili va IT kurslari",
    contactEmail: "info@itenglish.academy",
    contactPhone: "+998 90 123 45 67",
    address: "Toshkent sh., IT City, 3-bino",
  })

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    newUserNotifications: true,
    newOrderNotifications: true,
    marketingEmails: false,
  })

  const [paymentSettings, setPaymentSettings] = useState({
    clickEnabled: true,
    clickMerchantId: "12345",
    clickSecretKey: "********",
    paymeEnabled: true,
    paymeMerchantId: "67890",
    paymeSecretKey: "********",
    bankTransferEnabled: true,
    bankDetails: "Hamkorbank\nHisob raqami: 12345678901234567890\nMFO: 12345",
    cashEnabled: true,
  })

  const handleGeneralSettingsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setGeneralSettings((prev) => ({ ...prev, [name]: value }))
  }

  const handleNotificationSettingChange = (setting: string, value: boolean) => {
    setNotificationSettings((prev) => ({ ...prev, [setting]: value }))
  }

  const handlePaymentSettingsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setPaymentSettings((prev) => ({ ...prev, [name]: value }))
  }

  const handlePaymentToggle = (setting: string, value: boolean) => {
    setPaymentSettings((prev) => ({ ...prev, [setting]: value }))
  }

  const handleSaveSettings = () => {
    toast({
      title: "Sozlamalar saqlandi",
      description: "Barcha sozlamalar muvaffaqiyatli saqlandi",
    })
  }

  return (
    <div className="flex min-h-screen bg-muted/20">
      <div className="flex-1">
        <div className="container py-6">
          <div className="flex items-center gap-2 mb-4">
            <Link href="/admin">
              <Button variant="outline" size="icon" className="h-8 w-8">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <h1 className="text-xl font-bold">Tizim sozlamalari</h1>
          </div>

          <Tabs defaultValue="general">
            <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3 mb-4 gap-1">
              <TabsTrigger value="general" className="text-xs">
                Umumiy sozlamalar
              </TabsTrigger>
              <TabsTrigger value="notifications" className="text-xs">
                Bildirishnomalar
              </TabsTrigger>
              <TabsTrigger value="payment" className="text-xs">
                To'lov sozlamalari
              </TabsTrigger>
            </TabsList>

            <TabsContent value="general">
              <Card>
                <CardHeader className="py-3">
                  <CardTitle className="text-sm">Umumiy sozlamalar</CardTitle>
                  <CardDescription className="text-xs">Sayt uchun asosiy ma'lumotlarni o'zgartiring</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 text-xs">
                  <div className="space-y-1">
                    <Label htmlFor="siteName">Sayt nomi</Label>
                    <Input
                      id="siteName"
                      name="siteName"
                      value={generalSettings.siteName}
                      onChange={handleGeneralSettingsChange}
                      className="h-8 text-xs"
                    />
                  </div>

                  <div className="space-y-1">
                    <Label htmlFor="siteDescription">Sayt tavsifi</Label>
                    <Textarea
                      id="siteDescription"
                      name="siteDescription"
                      value={generalSettings.siteDescription}
                      onChange={handleGeneralSettingsChange}
                      className="text-xs min-h-[60px]"
                    />
                  </div>

                  <div className="space-y-1">
                    <Label htmlFor="contactEmail">Aloqa email</Label>
                    <Input
                      id="contactEmail"
                      name="contactEmail"
                      type="email"
                      value={generalSettings.contactEmail}
                      onChange={handleGeneralSettingsChange}
                      className="h-8 text-xs"
                    />
                  </div>

                  <div className="space-y-1">
                    <Label htmlFor="contactPhone">Aloqa telefoni</Label>
                    <Input
                      id="contactPhone"
                      name="contactPhone"
                      value={generalSettings.contactPhone}
                      onChange={handleGeneralSettingsChange}
                      className="h-8 text-xs"
                    />
                  </div>

                  <div className="space-y-1">
                    <Label htmlFor="address">Manzil</Label>
                    <Textarea
                      id="address"
                      name="address"
                      value={generalSettings.address}
                      onChange={handleGeneralSettingsChange}
                      className="text-xs min-h-[60px]"
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={handleSaveSettings} size="sm" className="text-xs h-8">
                    <Save className="h-3.5 w-3.5 mr-1" />
                    Saqlash
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="notifications">
              <Card>
                <CardHeader className="py-3">
                  <CardTitle className="text-sm">Bildirishnoma sozlamalari</CardTitle>
                  <CardDescription className="text-xs">Qaysi bildirishnomalarni olishni xohlaysiz</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 text-xs">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-xs">Email bildirishnomalari</h3>
                      <p className="text-[10px] text-muted-foreground">Tizim bildirishnomalarini email orqali olish</p>
                    </div>
                    <Switch
                      checked={notificationSettings.emailNotifications}
                      onCheckedChange={(checked) => handleNotificationSettingChange("emailNotifications", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-xs">Yangi foydalanuvchilar</h3>
                      <p className="text-[10px] text-muted-foreground">
                        Yangi foydalanuvchi ro'yxatdan o'tganda bildirishnoma olish
                      </p>
                    </div>
                    <Switch
                      checked={notificationSettings.newUserNotifications}
                      onCheckedChange={(checked) => handleNotificationSettingChange("newUserNotifications", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-xs">Yangi buyurtmalar</h3>
                      <p className="text-[10px] text-muted-foreground">Yangi buyurtma qilinganda bildirishnoma olish</p>
                    </div>
                    <Switch
                      checked={notificationSettings.newOrderNotifications}
                      onCheckedChange={(checked) => handleNotificationSettingChange("newOrderNotifications", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-xs">Marketing xabarlari</h3>
                      <p className="text-[10px] text-muted-foreground">
                        Marketing va yangiliklar haqida xabarlar olish
                      </p>
                    </div>
                    <Switch
                      checked={notificationSettings.marketingEmails}
                      onCheckedChange={(checked) => handleNotificationSettingChange("marketingEmails", checked)}
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={handleSaveSettings} size="sm" className="text-xs h-8">
                    <Save className="h-3.5 w-3.5 mr-1" />
                    Saqlash
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="payment">
              <Card>
                <CardHeader className="py-3">
                  <CardTitle className="text-sm">To'lov sozlamalari</CardTitle>
                  <CardDescription className="text-xs">To'lov usullarini sozlash</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 text-xs">
                  <div className="space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <div>
                        <h3 className="font-medium text-xs">Click</h3>
                      </div>
                      <Switch
                        checked={paymentSettings.clickEnabled}
                        onCheckedChange={(checked) => handlePaymentToggle("clickEnabled", checked)}
                      />
                    </div>

                    {paymentSettings.clickEnabled && (
                      <div className="space-y-3 pl-0 sm:pl-4 border-l-0 sm:border-l-2 sm:border-muted">
                        <div className="space-y-1">
                          <Label htmlFor="clickMerchantId">Merchant ID</Label>
                          <Input
                            id="clickMerchantId"
                            name="clickMerchantId"
                            value={paymentSettings.clickMerchantId}
                            onChange={handlePaymentSettingsChange}
                            className="h-8 text-xs"
                          />
                        </div>

                        <div className="space-y-1">
                          <Label htmlFor="clickSecretKey">Secret Key</Label>
                          <Input
                            id="clickSecretKey"
                            name="clickSecretKey"
                            type="password"
                            value={paymentSettings.clickSecretKey}
                            onChange={handlePaymentSettingsChange}
                            className="h-8 text-xs"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <div>
                        <h3 className="font-medium text-xs">Payme</h3>
                      </div>
                      <Switch
                        checked={paymentSettings.paymeEnabled}
                        onCheckedChange={(checked) => handlePaymentToggle("paymeEnabled", checked)}
                      />
                    </div>

                    {paymentSettings.paymeEnabled && (
                      <div className="space-y-3 pl-0 sm:pl-4 border-l-0 sm:border-l-2 sm:border-muted">
                        <div className="space-y-1">
                          <Label htmlFor="paymeMerchantId">Merchant ID</Label>
                          <Input
                            id="paymeMerchantId"
                            name="paymeMerchantId"
                            value={paymentSettings.paymeMerchantId}
                            onChange={handlePaymentSettingsChange}
                            className="h-8 text-xs"
                          />
                        </div>

                        <div className="space-y-1">
                          <Label htmlFor="paymeSecretKey">Secret Key</Label>
                          <Input
                            id="paymeSecretKey"
                            name="paymeSecretKey"
                            type="password"
                            value={paymentSettings.paymeSecretKey}
                            onChange={handlePaymentSettingsChange}
                            className="h-8 text-xs"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <div>
                        <h3 className="font-medium text-xs">Bank o'tkazmasi</h3>
                      </div>
                      <Switch
                        checked={paymentSettings.bankTransferEnabled}
                        onCheckedChange={(checked) => handlePaymentToggle("bankTransferEnabled", checked)}
                      />
                    </div>

                    {paymentSettings.bankTransferEnabled && (
                      <div className="space-y-3 pl-0 sm:pl-4 border-l-0 sm:border-l-2 sm:border-muted">
                        <div className="space-y-1">
                          <Label htmlFor="bankDetails">Bank ma'lumotlari</Label>
                          <Textarea
                            id="bankDetails"
                            name="bankDetails"
                            value={paymentSettings.bankDetails}
                            onChange={handlePaymentSettingsChange}
                            className="text-xs min-h-[60px]"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div>
                      <h3 className="font-medium text-xs">Naqd pul</h3>
                    </div>
                    <Switch
                      checked={paymentSettings.cashEnabled}
                      onCheckedChange={(checked) => handlePaymentToggle("cashEnabled", checked)}
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={handleSaveSettings} size="sm" className="text-xs h-8">
                    <Save className="h-3.5 w-3.5 mr-1" />
                    Saqlash
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

