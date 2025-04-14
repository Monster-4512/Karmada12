"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Save } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/context/auth-context"
import AdminSidebar from "@/components/admin-sidebar"
import { Checkbox } from "@/components/ui/checkbox"

export default function AddTeacherPage() {
  const { toast } = useToast()
  const router = useRouter()
  const { hasPermission } = useAuth()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [courses, setCourses] = useState<any[]>([])

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    specialization: "",
    status: "active",
    selectedCourses: [] as number[],
  })

  useEffect(() => {
    // Ruxsatlarni tekshirish
    if (!hasPermission("manage_teachers")) {
      toast({
        title: "Ruxsat yo'q",
        description: "Sizda o'qituvchilarni qo'shish uchun ruxsat yo'q",
        variant: "destructive",
      })
      router.push("/admin")
      return
    }

    // Kurslarni yuklash
    try {
      const storedCourses = localStorage.getItem("courses")
      if (storedCourses) {
        setCourses(JSON.parse(storedCourses))
      }
    } catch (error) {
      console.error("Kurslarni yuklashda xatolik:", error)
    }
  }, [hasPermission, router, toast])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleCourseToggle = (courseId: number) => {
    setFormData((prev) => {
      const selectedCourses = [...prev.selectedCourses]
      if (selectedCourses.includes(courseId)) {
        return {
          ...prev,
          selectedCourses: selectedCourses.filter((id) => id !== courseId),
        }
      } else {
        return {
          ...prev,
          selectedCourses: [...selectedCourses, courseId],
        }
      }
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Formani tekshirish
    if (!formData.name || !formData.email || !formData.phone) {
      toast({
        title: "Xatolik",
        description: "Ism, email va telefon to'ldirilishi shart",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // localStorage dan mavjud o'qituvchilarni olish
      const storedTeachers = localStorage.getItem("teachers")
      const teachers = storedTeachers ? JSON.parse(storedTeachers) : []

      // Yangi o'qituvchi yaratish
      const newTeacher = {
        id: teachers.length > 0 ? Math.max(...teachers.map((t: any) => t.id)) + 1 : 1,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        avatar: `/placeholder.svg?height=100&width=100&text=${formData.name
          .split(" ")
          .map((n) => n[0])
          .join("")}`,
        specialization: formData.specialization,
        courses: formData.selectedCourses,
        status: formData.status,
        rating: 5.0, // Yangi o'qituvchilar uchun standart reyting
        joinedAt: new Date().toISOString(),
        // Konsistensiya uchun qo'shimcha maydonlar
        position: formData.specialization || "O'qituvchi",
        specialty: formData.specialization || "Ingliz tili",
        experience: "Yangi",
        bio: `${formData.name} - IT English Academy o'qituvchisi.`,
      }

      // O'qituvchilar ro'yxatiga qo'shish
      const updatedTeachers = [...teachers, newTeacher]
      localStorage.setItem("teachers", JSON.stringify(updatedTeachers))

      toast({
        title: "O'qituvchi qo'shildi",
        description: "Yangi o'qituvchi muvaffaqiyatli qo'shildi",
      })

      // O'qituvchilar ro'yxatiga qaytish
      router.push("/admin/teachers")
    } catch (error) {
      console.error("O'qituvchini qo'shishda xatolik:", error)
      toast({
        title: "Xatolik",
        description: "O'qituvchini qo'shishda xatolik yuz berdi",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-screen bg-muted/20">
      <AdminSidebar />

      <div className="flex-1">
        <div className="container py-8">
          <div className="flex items-center gap-2 mb-6">
            <Link href="/admin/teachers">
              <Button variant="outline" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <h1 className="text-2xl font-bold">Yangi o'qituvchi qo'shish</h1>
          </div>

          <Card>
            <form onSubmit={handleSubmit}>
              <CardHeader>
                <CardTitle>O'qituvchi ma'lumotlari</CardTitle>
                <CardDescription>Yangi o'qituvchi uchun barcha ma'lumotlarni to'ldiring</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">F.I.O</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Masalan: Aziza Karimova"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Masalan: aziza@example.com"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefon</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Masalan: +998 90 123 45 67"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="specialization">Mutaxassislik</Label>
                  <Input
                    id="specialization"
                    name="specialization"
                    value={formData.specialization}
                    onChange={handleInputChange}
                    placeholder="Masalan: IT ingliz tili o'qituvchisi"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">Holati</Label>
                  <Select value={formData.status} onValueChange={(value) => handleSelectChange("status", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Holatni tanlang" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Faol</SelectItem>
                      <SelectItem value="inactive">Nofaol</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Kurslar</Label>
                  <div className="border rounded-md p-4 space-y-2">
                    {courses.length > 0 ? (
                      courses.map((course) => (
                        <div key={course.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={`course-${course.id}`}
                            checked={formData.selectedCourses.includes(course.id)}
                            onCheckedChange={() => handleCourseToggle(course.id)}
                          />
                          <Label htmlFor={`course-${course.id}`} className="cursor-pointer">
                            {course.title}
                          </Label>
                        </div>
                      ))
                    ) : (
                      <p className="text-muted-foreground">Kurslar mavjud emas</p>
                    )}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" type="button" onClick={() => router.push("/admin/teachers")}>
                  Bekor qilish
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    "Saqlanmoqda..."
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Saqlash
                    </>
                  )}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </div>
  )
}

