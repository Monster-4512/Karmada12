"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Clock, Edit, Plus, Trash } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/context/auth-context"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

type ScheduleItem = {
  id: number
  courseId: number
  teacherId: number
  dayOfWeek: string
  startTime: string
  endTime: string
  room: string
}

const daysOfWeek = [
  { value: "monday", label: "Dushanba" },
  { value: "tuesday", label: "Seshanba" },
  { value: "wednesday", label: "Chorshanba" },
  { value: "thursday", label: "Payshanba" },
  { value: "friday", label: "Juma" },
  { value: "saturday", label: "Shanba" },
  { value: "sunday", label: "Yakshanba" },
]

export default function SchedulePage() {
  const { toast } = useToast()
  const { hasPermission } = useAuth()
  const [schedule, setSchedule] = useState<ScheduleItem[]>([])
  const [courses, setCourses] = useState<any[]>([])
  const [teachers, setTeachers] = useState<any[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [activeDay, setActiveDay] = useState("monday")

  const [formData, setFormData] = useState({
    id: 0,
    courseId: 0,
    teacherId: 0,
    dayOfWeek: "monday",
    startTime: "09:00",
    endTime: "10:30",
    room: "A101",
  })

  useEffect(() => {
    // Load schedule, courses, and teachers from localStorage
    try {
      const storedSchedule = localStorage.getItem("schedule")
      const storedCourses = localStorage.getItem("courses")
      const storedTeachers = localStorage.getItem("teachers")

      if (storedCourses) {
        setCourses(JSON.parse(storedCourses))
      }

      if (storedTeachers) {
        setTeachers(JSON.parse(storedTeachers))
      }

      if (storedSchedule) {
        setSchedule(JSON.parse(storedSchedule))
      } else {
        // Sample data if no schedule found
        const sampleSchedule: ScheduleItem[] = [
          {
            id: 1,
            courseId: 1,
            teacherId: 1,
            dayOfWeek: "monday",
            startTime: "09:00",
            endTime: "10:30",
            room: "A101",
          },
          {
            id: 2,
            courseId: 2,
            teacherId: 1,
            dayOfWeek: "monday",
            startTime: "11:00",
            endTime: "12:30",
            room: "A102",
          },
          {
            id: 3,
            courseId: 3,
            teacherId: 2,
            dayOfWeek: "tuesday",
            startTime: "09:00",
            endTime: "10:30",
            room: "B201",
          },
          {
            id: 4,
            courseId: 1,
            teacherId: 1,
            dayOfWeek: "wednesday",
            startTime: "09:00",
            endTime: "10:30",
            room: "A101",
          },
          {
            id: 5,
            courseId: 2,
            teacherId: 1,
            dayOfWeek: "wednesday",
            startTime: "11:00",
            endTime: "12:30",
            room: "A102",
          },
          {
            id: 6,
            courseId: 3,
            teacherId: 2,
            dayOfWeek: "thursday",
            startTime: "09:00",
            endTime: "10:30",
            room: "B201",
          },
        ]
        setSchedule(sampleSchedule)
        localStorage.setItem("schedule", JSON.stringify(sampleSchedule))
      }
    } catch (error) {
      console.error("Failed to load schedule data:", error)
    }
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSelectChange = (name: string, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleAddSchedule = () => {
    setIsEditing(false)
    setFormData({
      id: 0,
      courseId: courses.length > 0 ? courses[0].id : 0,
      teacherId: teachers.length > 0 ? teachers[0].id : 0,
      dayOfWeek: activeDay,
      startTime: "09:00",
      endTime: "10:30",
      room: "A101",
    })
    setIsDialogOpen(true)
  }

  const handleEditSchedule = (item: ScheduleItem) => {
    setIsEditing(true)
    setFormData({
      id: item.id,
      courseId: item.courseId,
      teacherId: item.teacherId,
      dayOfWeek: item.dayOfWeek,
      startTime: item.startTime,
      endTime: item.endTime,
      room: item.room,
    })
    setIsDialogOpen(true)
  }

  const handleDeleteSchedule = (id: number) => {
    if (!hasPermission("manage_courses")) {
      toast({
        title: "Ruxsat yo'q",
        description: "Sizda dars jadvalini o'zgartirish uchun ruxsat yo'q",
        variant: "destructive",
      })
      return
    }

    const updatedSchedule = schedule.filter((item) => item.id !== id)
    setSchedule(updatedSchedule)
    localStorage.setItem("schedule", JSON.stringify(updatedSchedule))

    toast({
      title: "Dars jadvali o'chirildi",
      description: "Dars jadvali muvaffaqiyatli o'chirildi",
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!hasPermission("manage_courses")) {
      toast({
        title: "Ruxsat yo'q",
        description: "Sizda dars jadvalini o'zgartirish uchun ruxsat yo'q",
        variant: "destructive",
      })
      return
    }

    // Validate form
    if (formData.courseId === 0 || formData.teacherId === 0) {
      toast({
        title: "Xatolik",
        description: "Kurs va o'qituvchi tanlanishi shart",
        variant: "destructive",
      })
      return
    }

    try {
      let updatedSchedule: ScheduleItem[]

      if (isEditing) {
        // Update existing schedule item
        updatedSchedule = schedule.map((item) => (item.id === formData.id ? { ...formData } : item))
      } else {
        // Add new schedule item
        const newItem: ScheduleItem = {
          ...formData,
          id: schedule.length > 0 ? Math.max(...schedule.map((item) => item.id)) + 1 : 1,
        }
        updatedSchedule = [...schedule, newItem]
      }

      setSchedule(updatedSchedule)
      localStorage.setItem("schedule", JSON.stringify(updatedSchedule))

      toast({
        title: isEditing ? "Dars jadvali yangilandi" : "Dars jadvali qo'shildi",
        description: isEditing
          ? "Dars jadvali muvaffaqiyatli yangilandi"
          : "Yangi dars jadvali muvaffaqiyatli qo'shildi",
      })

      setIsDialogOpen(false)
    } catch (error) {
      console.error("Failed to save schedule:", error)
      toast({
        title: "Xatolik",
        description: "Dars jadvalini saqlashda xatolik yuz berdi",
        variant: "destructive",
      })
    }
  }

  const getCourseName = (courseId: number) => {
    const course = courses.find((c) => c.id === courseId)
    return course ? course.title : `Kurs ${courseId}`
  }

  const getTeacherName = (teacherId: number) => {
    const teacher = teachers.find((t) => t.id === teacherId)
    return teacher ? teacher.name : `O'qituvchi ${teacherId}`
  }

  const getDaySchedule = (day: string) => {
    return schedule.filter((item) => item.dayOfWeek === day).sort((a, b) => a.startTime.localeCompare(b.startTime))
  }

  return (
    <div className="flex min-h-screen bg-muted/20">
      <div className="flex-1 overflow-auto">
        <div className="container py-8">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <Link href="/admin">
                <Button variant="outline" size="icon">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </Link>
              <h1 className="text-2xl font-bold">Dars jadvali</h1>
            </div>
            {hasPermission("manage_courses") && (
              <Button onClick={handleAddSchedule}>
                <Plus className="h-4 w-4 mr-2" />
                Yangi dars qo'shish
              </Button>
            )}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Haftalik dars jadvali</CardTitle>
              <CardDescription>Barcha kurslar uchun dars jadvalini boshqaring</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="monday" value={activeDay} onValueChange={setActiveDay}>
                <TabsList className="grid grid-cols-7">
                  {daysOfWeek.map((day) => (
                    <TabsTrigger key={day.value} value={day.value}>
                      {day.label}
                    </TabsTrigger>
                  ))}
                </TabsList>

                {daysOfWeek.map((day) => (
                  <TabsContent key={day.value} value={day.value}>
                    <div className="rounded-md border overflow-hidden mt-4">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b bg-muted/50">
                            <th className="py-3 px-4 text-left font-medium">Vaqt</th>
                            <th className="py-3 px-4 text-left font-medium">Kurs</th>
                            <th className="py-3 px-4 text-left font-medium">O'qituvchi</th>
                            <th className="py-3 px-4 text-left font-medium">Xona</th>
                            <th className="py-3 px-4 text-left font-medium">Amallar</th>
                          </tr>
                        </thead>
                        <tbody>
                          {getDaySchedule(day.value).length > 0 ? (
                            getDaySchedule(day.value).map((item, i) => (
                              <tr key={item.id} className={i % 2 === 0 ? "bg-background" : "bg-muted/20"}>
                                <td className="py-3 px-4">
                                  {item.startTime} - {item.endTime}
                                </td>
                                <td className="py-3 px-4">{getCourseName(item.courseId)}</td>
                                <td className="py-3 px-4">{getTeacherName(item.teacherId)}</td>
                                <td className="py-3 px-4">{item.room}</td>
                                <td className="py-3 px-4">
                                  <div className="flex gap-2">
                                    {hasPermission("manage_courses") && (
                                      <>
                                        <Button variant="outline" size="sm" onClick={() => handleEditSchedule(item)}>
                                          <Edit className="h-4 w-4 mr-1" />
                                          Tahrirlash
                                        </Button>
                                        <Button
                                          variant="outline"
                                          size="sm"
                                          className="text-destructive"
                                          onClick={() => handleDeleteSchedule(item.id)}
                                        >
                                          <Trash className="h-4 w-4 mr-1" />
                                          O'chirish
                                        </Button>
                                      </>
                                    )}
                                  </div>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan={5} className="py-6 text-center text-muted-foreground">
                                Bu kun uchun darslar yo'q
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Add/Edit Schedule Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{isEditing ? "Dars jadvalini tahrirlash" : "Yangi dars qo'shish"}</DialogTitle>
            <DialogDescription>
              {isEditing ? "Dars jadvali ma'lumotlarini tahrirlang" : "Yangi dars uchun ma'lumotlarni kiriting"}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="dayOfWeek">Hafta kuni</Label>
                  <Select value={formData.dayOfWeek} onValueChange={(value) => handleSelectChange("dayOfWeek", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Kunni tanlang" />
                    </SelectTrigger>
                    <SelectContent>
                      {daysOfWeek.map((day) => (
                        <SelectItem key={day.value} value={day.value}>
                          {day.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="room">Xona</Label>
                  <Input
                    id="room"
                    name="room"
                    value={formData.room}
                    onChange={handleInputChange}
                    placeholder="Masalan: A101"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startTime">Boshlanish vaqti</Label>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                    <Input
                      id="startTime"
                      name="startTime"
                      type="time"
                      value={formData.startTime}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endTime">Tugash vaqti</Label>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                    <Input
                      id="endTime"
                      name="endTime"
                      type="time"
                      value={formData.endTime}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="courseId">Kurs</Label>
                <Select
                  value={formData.courseId.toString()}
                  onValueChange={(value) => handleSelectChange("courseId", Number.parseInt(value))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Kursni tanlang" />
                  </SelectTrigger>
                  <SelectContent>
                    {courses.map((course) => (
                      <SelectItem key={course.id} value={course.id.toString()}>
                        {course.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="teacherId">O'qituvchi</Label>
                <Select
                  value={formData.teacherId.toString()}
                  onValueChange={(value) => handleSelectChange("teacherId", Number.parseInt(value))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="O'qituvchini tanlang" />
                  </SelectTrigger>
                  <SelectContent>
                    {teachers.map((teacher) => (
                      <SelectItem key={teacher.id} value={teacher.id.toString()}>
                        {teacher.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">{isEditing ? "Saqlash" : "Qo'shish"}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

