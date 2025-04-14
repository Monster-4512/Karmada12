"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Plus, Search, Trash, Edit } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { useNotification } from "@/context/notification-context"
import AdminSidebar from "@/components/admin-sidebar"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

// O'qituvchining tipini belgilash - konsistensiya uchun
type Teacher = {
  id: number
  name: string
  position: string
  specialty: string
  experience: string
  bio: string
  email: string
  phone: string
  image: string
  avatar?: string
  courses: number[]
  status: string
  // Qo'shimcha ma'lumotlar
  specialization?: string
  rating?: number
  joinedAt?: string
}

export default function AdminTeachersPage() {
  const { toast } = useToast()
  const router = useRouter()
  const { addNotification } = useNotification()
  const [searchQuery, setSearchQuery] = useState("")
  const [teachers, setTeachers] = useState<Teacher[]>([])
  const [filteredTeachers, setFilteredTeachers] = useState<Teacher[]>([])
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [teacherToDelete, setTeacherToDelete] = useState<number | null>(null)

  // localStorage dan o'qituvchilarni yuklash
  const loadTeachers = () => {
    try {
      const storedTeachers = localStorage.getItem("teachers")
      if (storedTeachers) {
        const parsedTeachers = JSON.parse(storedTeachers)
        // Ma'lumotlarni konsistent holatga keltirish
        const normalizedTeachers = parsedTeachers.map((teacher: any) => ({
          ...teacher,
          // Agar avatar mavjud emas bo'lsa, image ishlatiladi
          avatar: teacher.avatar || teacher.image,
          // Agar position mavjud emas bo'lsa, specialization ishlatiladi
          position: teacher.position || teacher.specialization || "O'qituvchi",
          // Agar specialty mavjud emas bo'lsa, specialization ishlatiladi
          specialty: teacher.specialty || teacher.specialization || "Ingliz tili",
          // Barcha kerakli maydonlarni tekshirish
          experience: teacher.experience || "Noma'lum",
          bio: teacher.bio || `${teacher.name} - IT English Academy o'qituvchisi`,
          status: teacher.status || "Faol",
        }))
        setTeachers(normalizedTeachers)
        setFilteredTeachers(normalizedTeachers)
      } else {
        // Agar localStorage da o'qituvchilar mavjud emas bo'lsa, namuna ma'lumotlardan foydalanish
        const sampleTeachers = [
          {
            id: 1,
            name: "Aziza Karimova",
            position: "Senior ingliz tili o'qituvchisi",
            specialty: "Ingliz tili",
            experience: "8 yil",
            bio: "IELTS 8.0 ball bilan sertifikatlangan, 8 yillik tajribaga ega o'qituvchi. AQSh va Buyuk Britaniyada malaka oshirgan.",
            email: "aziza@example.com",
            phone: "+998 90 123 45 67",
            image: "/placeholder.svg?height=400&width=400&text=Aziza",
            courses: [1, 2],
            status: "Faol",
          },
          {
            id: 2,
            name: "Bobur Aliyev",
            position: "IT ingliz tili mutaxassisi",
            specialty: "IT ingliz tili",
            experience: "5 yil",
            bio: "IT sohasida 5 yillik tajribaga ega, ingliz tilini IT mutaxassislari uchun o'qitishga ixtisoslashgan.",
            email: "bobur@example.com",
            phone: "+998 90 234 56 78",
            image: "/placeholder.svg?height=400&width=400&text=Bobur",
            courses: [2],
            status: "Faol",
          },
          {
            id: 3,
            name: "Jasur Toshmatov",
            position: "Senior web dasturchi",
            specialty: "Web dasturlash",
            experience: "7 yil",
            bio: "7 yillik tajribaga ega web dasturchi. JavaScript, React va Node.js bo'yicha mutaxassis.",
            email: "jasur@example.com",
            phone: "+998 90 345 67 89",
            image: "/placeholder.svg?height=400&width=400&text=Jasur",
            courses: [3],
            status: "Faol",
          },
          {
            id: 4,
            name: "Dilshod Rahimov",
            position: "Python dasturchi",
            specialty: "Python dasturlash",
            experience: "4 yil",
            bio: "4 yillik tajribaga ega Python dasturchi. Data Science va Machine Learning bo'yicha mutaxassis.",
            email: "dilshod@example.com",
            phone: "+998 90 456 78 90",
            image: "/placeholder.svg?height=400&width=400&text=Dilshod",
            courses: [4],
            status: "Faol",
          },
          {
            id: 5,
            name: "Malika Umarova",
            position: "Java dasturchi",
            specialty: "Java dasturlash",
            experience: "6 yil",
            bio: "6 yillik tajribaga ega Java dasturchi. Enterprise dasturlash va Spring framework bo'yicha mutaxassis.",
            email: "malika@example.com",
            phone: "+998 90 567 89 01",
            image: "/placeholder.svg?height=400&width=400&text=Malika",
            courses: [5],
            status: "Faol",
          },
        ]
        setTeachers(sampleTeachers)
        setFilteredTeachers(sampleTeachers)
        localStorage.setItem("teachers", JSON.stringify(sampleTeachers))
      }
    } catch (error) {
      console.error("O'qituvchilarni yuklashda xatolik:", error)
      toast({
        title: "Xatolik",
        description: "O'qituvchilarni yuklashda xatolik yuz berdi",
        variant: "destructive",
      })
    }
  }

  useEffect(() => {
    loadTeachers()
  }, [toast])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase()
    setSearchQuery(query)

    if (query.trim() === "") {
      setFilteredTeachers(teachers)
    } else {
      const filtered = teachers.filter(
        (teacher) =>
          teacher.name.toLowerCase().includes(query) ||
          teacher.position.toLowerCase().includes(query) ||
          teacher.specialty.toLowerCase().includes(query) ||
          teacher.bio.toLowerCase().includes(query),
      )
      setFilteredTeachers(filtered)
    }
  }

  const handleAddTeacher = () => {
    router.push("/admin/teachers/add")
  }

  const openDeleteDialog = (id: number) => {
    setTeacherToDelete(id)
    setIsDeleteDialogOpen(true)
  }

  const handleDeleteTeacher = () => {
    if (teacherToDelete === null) return

    // O'chiriladigan o'qituvchini topish
    const teacherToDeleteObj = teachers.find((teacher) => teacher.id === teacherToDelete)
    if (!teacherToDeleteObj) return

    // Berilgan ID bo'yicha o'qituvchini filtrlash
    const updatedTeachers = teachers.filter((teacher) => teacher.id !== teacherToDelete)

    // State yangilash
    setTeachers(updatedTeachers)
    setFilteredTeachers(
      updatedTeachers.filter(
        (teacher) =>
          teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          teacher.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
          teacher.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
          teacher.bio.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    )

    // localStorage yangilash
    localStorage.setItem("teachers", JSON.stringify(updatedTeachers))

    // Dialog yopish
    setIsDeleteDialogOpen(false)
    setTeacherToDelete(null)

    // Muvaffaqiyat xabarini ko'rsatish
    toast({
      title: "O'qituvchi o'chirildi",
      description: `"${teacherToDeleteObj.name}" muvaffaqiyatli o'chirildi`,
    })

    // Foydalanuvchilarga bildirishnoma yuborish
    addNotification({
      userId: null, // null barcha foydalanuvchilar uchun
      title: "O'qituvchi o'chirildi",
      message: `"${teacherToDeleteObj.name}" endi platformada o'qituvchi sifatida faoliyat ko'rsatmaydi`,
      type: "teacher-deleted",
      time: new Date().toISOString(),
      read: false,
    })
  }

  return (
    <div className="flex min-h-screen bg-muted/20">
      <AdminSidebar />

      <div className="flex-1">
        <div className="container py-8">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <Link href="/admin">
                <Button variant="outline" size="icon">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </Link>
              <h1 className="text-2xl font-bold">O'qituvchilarni boshqarish</h1>
            </div>
            <Button onClick={handleAddTeacher}>
              <Plus className="h-4 w-4 mr-2" />
              Yangi o'qituvchi qo'shish
            </Button>
          </div>

          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="O'qituvchilarni qidirish..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={handleSearch}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>O'qituvchilar ro'yxati</CardTitle>
              <CardDescription>Barcha o'qituvchilarni boshqaring</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="py-3 px-4 text-left font-medium">Ism</th>
                      <th className="py-3 px-4 text-left font-medium">Lavozim</th>
                      <th className="py-3 px-4 text-left font-medium">Mutaxassislik</th>
                      <th className="py-3 px-4 text-left font-medium">Tajriba</th>
                      <th className="py-3 px-4 text-left font-medium">Kurslar</th>
                      <th className="py-3 px-4 text-left font-medium">Amallar</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTeachers.map((teacher, i) => (
                      <tr key={teacher.id} className={i % 2 === 0 ? "bg-background" : "bg-muted/20"}>
                        <td className="py-3 px-4">{teacher.name}</td>
                        <td className="py-3 px-4">{teacher.position}</td>
                        <td className="py-3 px-4">{teacher.specialty}</td>
                        <td className="py-3 px-4">{teacher.experience}</td>
                        <td className="py-3 px-4">{teacher.courses.length}</td>
                        <td className="py-3 px-4">
                          <div className="flex flex-wrap gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => router.push(`/admin/teachers/edit/${teacher.id}`)}
                            >
                              <Edit className="h-4 w-4 mr-1" />
                              Tahrirlash
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-destructive"
                              onClick={() => openDeleteDialog(teacher.id)}
                            >
                              <Trash className="h-4 w-4 mr-1" />
                              O'chirish
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>O'qituvchini o'chirishni tasdiqlaysizmi?</AlertDialogTitle>
            <AlertDialogDescription>
              Bu amal qaytarib bo'lmaydi. O'qituvchi tizimdan butunlay o'chiriladi va unga bog'liq barcha ma'lumotlar
              yo'qoladi.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Bekor qilish</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteTeacher} className="bg-destructive text-destructive-foreground">
              O'chirish
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

