"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { useNotification } from "@/context/notification-context"

type JobType = "full-time" | "part-time" | "contract" | "remote"

interface JobData {
  id: string
  title: string
  company: string
  location: string
  type: JobType
  salary: string
  description: string
  requirements: string[]
  createdAt: string
  isActive: boolean
}

export default function AddJobPage() {
  const router = useRouter()
  const { toast } = useToast()
  const { addNotification } = useNotification()

  const [formData, setFormData] = useState<Omit<JobData, "id" | "createdAt" | "isActive">>({
    title: "",
    company: "TechGlobal Inc.",
    location: "",
    type: "full-time",
    salary: "",
    description: "",
    requirements: ["", "", ""],
  })

  const handleRequirementChange = (index: number, value: string) => {
    const updatedRequirements = [...formData.requirements]
    updatedRequirements[index] = value
    setFormData({ ...formData, requirements: updatedRequirements })
  }

  const addRequirement = () => {
    setFormData({
      ...formData,
      requirements: [...formData.requirements, ""],
    })
  }

  const removeRequirement = (index: number) => {
    const updatedRequirements = [...formData.requirements]
    updatedRequirements.splice(index, 1)
    setFormData({ ...formData, requirements: updatedRequirements })
  }

  // Add cleanup effect
  useEffect(() => {
    return () => {
      // Cleanup function
    }
  }, [])

  // Improve the handleSubmit function to handle errors better
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    try {
      // Filter out empty requirements
      const filteredRequirements = formData.requirements.filter((req) => req.trim() !== "")

      if (filteredRequirements.length === 0) {
        toast({
          title: "Xatolik",
          description: "Kamida bitta talab kiritilishi kerak",
          variant: "destructive",
        })
        return
      }

      // Create new job with ID and timestamp
      const newJob: JobData = {
        ...formData,
        id: Date.now().toString(),
        requirements: filteredRequirements,
        createdAt: new Date().toISOString(),
        isActive: true,
      }

      // Save to localStorage
      const storedJobs = localStorage.getItem("jobs")
      const jobs = storedJobs ? JSON.parse(storedJobs) : []
      jobs.push(newJob)
      localStorage.setItem("jobs", JSON.stringify(jobs))

      // Add notification for all users
      addNotification({
        userId: null, // null means for all users
        title: "Yangi ish e'loni",
        message: `Yangi ish e'loni qo'shildi: ${newJob.title}`,
        type: "job",
      })

      toast({
        title: "Ish e'loni qo'shildi",
        description: "Yangi ish e'loni muvaffaqiyatli qo'shildi",
      })

      // Redirect to jobs management page
      router.push("/admin/jobs")
    } catch (error) {
      console.error("Failed to save job:", error)
      toast({
        title: "Xatolik",
        description: "Ish e'lonini saqlashda xatolik yuz berdi",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="container py-8 max-w-4xl mx-auto">
      <div className="flex items-center mb-6">
        <Link href="/admin/jobs">
          <Button variant="outline" size="icon" className="mr-2">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">Yangi ish e'lonini qo'shish</h1>
      </div>

      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Ish e'loni ma'lumotlari</CardTitle>
            <CardDescription>Yangi ish e'loni yaratish uchun quyidagi formani to'ldiring</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Lavozim nomi</Label>
                  <Input
                    id="title"
                    placeholder="Masalan: Senior Frontend Developer"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">Kompaniya</Label>
                  <Input
                    id="company"
                    placeholder="Masalan: TechGlobal Inc."
                    required
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="location">Joylashuv</Label>
                  <Input
                    id="location"
                    placeholder="Masalan: Berlin, Germany"
                    required
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Ish turi</Label>
                  <Select
                    value={formData.type}
                    onValueChange={(value) => setFormData({ ...formData, type: value as JobType })}
                  >
                    <SelectTrigger id="type">
                      <SelectValue placeholder="Ish turini tanlang" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="full-time">To'liq stavka</SelectItem>
                      <SelectItem value="part-time">Yarim stavka</SelectItem>
                      <SelectItem value="contract">Shartnoma asosida</SelectItem>
                      <SelectItem value="remote">Masofaviy</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="salary">Maosh</Label>
                <Input
                  id="salary"
                  placeholder="Masalan: $80,000 - $100,000"
                  required
                  value={formData.salary}
                  onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Ish tavsifi</Label>
                <Textarea
                  id="description"
                  placeholder="Ish haqida batafsil ma'lumot..."
                  className="min-h-[120px]"
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Talablar</Label>
                  <Button type="button" variant="outline" size="sm" onClick={addRequirement}>
                    <Plus className="h-4 w-4 mr-1" />
                    Talab qo'shish
                  </Button>
                </div>

                {formData.requirements.map((requirement, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      placeholder={`Talab ${index + 1}`}
                      value={requirement}
                      onChange={(e) => handleRequirementChange(index, e.target.value)}
                    />
                    {formData.requirements.length > 1 && (
                      <Button type="button" variant="outline" size="icon" onClick={() => removeRequirement(index)}>
                        &times;
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between border-t pt-6">
            <Button type="button" variant="outline" onClick={() => router.push("/admin/jobs")}>
              Bekor qilish
            </Button>
            <Button type="submit">Ish e'lonini qo'shish</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

