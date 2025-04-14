"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  ArrowLeft,
  Search,
  Mail,
  MessageSquare,
  Phone,
  BookOpen,
  Users,
  FileText,
  CreditCard,
  Settings,
} from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

export default function HelpPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  const handleContactFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setContactForm((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleContactFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Xabar yuborildi",
      description: "Sizning xabaringiz muvaffaqiyatli yuborildi. Tez orada javob beramiz.",
    })
    setContactForm({
      name: "",
      email: "",
      subject: "",
      message: "",
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
          <h1 className="text-2xl font-bold">Yordam va qo'llab-quvvatlash</h1>
        </div>
      </div>

      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Savol yoki kalit so'z kiriting..."
              className="pl-10"
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="faq">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="faq">Ko'p so'raladigan savollar</TabsTrigger>
          <TabsTrigger value="guides">Qo'llanmalar</TabsTrigger>
          <TabsTrigger value="contact">Bog'lanish</TabsTrigger>
        </TabsList>

        <TabsContent value="faq" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Ko'p so'raladigan savollar</CardTitle>
              <CardDescription>Tizim haqida eng ko'p so'raladigan savollar va javoblar</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>Yangi kurs qanday qo'shiladi?</AccordionTrigger>
                  <AccordionContent>
                    Yangi kurs qo'shish uchun "Kurslar" bo'limiga o'ting va "Yangi kurs qo'shish" tugmasini bosing.
                    Kerakli ma'lumotlarni kiriting va "Saqlash" tugmasini bosing. Kurs qo'shilgandan so'ng, uni
                    tahrirlash yoki o'chirish mumkin.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>Foydalanuvchi huquqlarini qanday o'zgartirish mumkin?</AccordionTrigger>
                  <AccordionContent>
                    Foydalanuvchi huquqlarini o'zgartirish uchun "Foydalanuvchilar" bo'limiga o'ting va kerakli
                    foydalanuvchini tanlang. "Tahrirlash" tugmasini bosing va foydalanuvchi huquqlarini o'zgartiring.
                    O'zgarishlarni saqlash uchun "Saqlash" tugmasini bosing.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>Hisobotlarni qanday yuklab olish mumkin?</AccordionTrigger>
                  <AccordionContent>
                    Hisobotlarni yuklab olish uchun "Analitika" bo'limiga o'ting va kerakli hisobot turini tanlang.
                    "Hisobotni yuklab olish" tugmasini bosing va hisobot yuklab olinadi. Hisobotlar Excel, PDF va CSV
                    formatlarida mavjud.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger>Tizimda xatolik yuz berganda nima qilish kerak?</AccordionTrigger>
                  <AccordionContent>
                    Tizimda xatolik yuz berganda, avvalo brauzeringizni yangilang. Agar muammo hal bo'lmasa, tizimdan
                    chiqib, qayta kiring. Agar muammo davom etsa, "Bog'lanish" bo'limiga o'ting va muammo haqida
                    ma'lumot bering. Texnik qo'llab-quvvatlash xizmati sizga yordam beradi.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-5">
                  <AccordionTrigger>Tizim tilini qanday o'zgartirish mumkin?</AccordionTrigger>
                  <AccordionContent>
                    Tizim tilini o'zgartirish uchun yuqori o'ng burchakdagi til tanlov tugmasini bosing va kerakli tilni
                    tanlang. Tizim uch tilda mavjud: o'zbek, rus va ingliz.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="guides" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Qo'llanmalar</CardTitle>
              <CardDescription>Tizimdan foydalanish bo'yicha qo'llanmalar</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {[
                  {
                    title: "Kurslarni boshqarish",
                    description: "Kurslarni qo'shish, tahrirlash va o'chirish bo'yicha qo'llanma",
                    icon: <BookOpen className="h-8 w-8 text-primary" />,
                  },
                  {
                    title: "Foydalanuvchilarni boshqarish",
                    description: "Foydalanuvchilarni boshqarish va huquqlarni o'zgartirish bo'yicha qo'llanma",
                    icon: <Users className="h-8 w-8 text-primary" />,
                  },
                  {
                    title: "Hisobotlar bilan ishlash",
                    description: "Hisobotlarni ko'rish va yuklab olish bo'yicha qo'llanma",
                    icon: <FileText className="h-8 w-8 text-primary" />,
                  },
                  {
                    title: "To'lovlarni boshqarish",
                    description: "To'lovlarni kuzatish va boshqarish bo'yicha qo'llanma",
                    icon: <CreditCard className="h-8 w-8 text-primary" />,
                  },
                  {
                    title: "Xabarlarni boshqarish",
                    description: "Xabarlarni yuborish va qabul qilish bo'yicha qo'llanma",
                    icon: <MessageSquare className="h-8 w-8 text-primary" />,
                  },
                  {
                    title: "Tizim sozlamalari",
                    description: "Tizim sozlamalarini o'zgartirish bo'yicha qo'llanma",
                    icon: <Settings className="h-8 w-8 text-primary" />,
                  },
                ].map((guide, i) => (
                  <Card key={i} className="overflow-hidden">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{guide.title}</CardTitle>
                        <div className="h-8 w-8 flex items-center justify-center">{guide.icon}</div>
                      </div>
                      <CardDescription>{guide.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button variant="outline" className="w-full">
                        Qo'llanmani ko'rish
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contact" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Bog'lanish</CardTitle>
              <CardDescription>Texnik qo'llab-quvvatlash xizmati bilan bog'lanish</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Mail className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <h3 className="font-medium">Email orqali</h3>
                      <p className="text-sm text-muted-foreground">support@itenglish.uz</p>
                      <p className="text-sm text-muted-foreground">24 soat ichida javob beramiz</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Phone className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <h3 className="font-medium">Telefon orqali</h3>
                      <p className="text-sm text-muted-foreground">+998 90 123 45 67</p>
                      <p className="text-sm text-muted-foreground">Ish vaqti: 9:00 - 18:00</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <MessageSquare className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <h3 className="font-medium">Chat orqali</h3>
                      <p className="text-sm text-muted-foreground">Online chat orqali bog'laning</p>
                      <p className="text-sm text-muted-foreground">Tezkor javob olish uchun</p>
                    </div>
                  </div>
                </div>

                <form onSubmit={handleContactFormSubmit} className="space-y-4">
                  <div className="grid gap-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium">
                          Ismingiz
                        </label>
                        <Input
                          id="name"
                          name="name"
                          value={contactForm.name}
                          onChange={handleContactFormChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium">
                          Email
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={contactForm.email}
                          onChange={handleContactFormChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="subject" className="text-sm font-medium">
                        Mavzu
                      </label>
                      <Input
                        id="subject"
                        name="subject"
                        value={contactForm.subject}
                        onChange={handleContactFormChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium">
                        Xabar
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        rows={4}
                        value={contactForm.message}
                        onChange={handleContactFormChange}
                        required
                      />
                    </div>
                  </div>
                  <Button type="submit" className="w-full">
                    Xabarni yuborish
                  </Button>
                </form>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

