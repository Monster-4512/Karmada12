"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/context/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Search, UserPlus, Mail, Phone, Calendar } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

export default function AdminUsersPage() {
  const { toast } = useToast()
  const { getAllUsers, updateUserPermissions, toggleUserActive } = useAuth()
  const [users, setUsers] = useState<any[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredUsers, setFilteredUsers] = useState<any[]>([])

  // Load users only once when component mounts
  useEffect(() => {
    // Load registered users
    const registeredUsers = getAllUsers()
    if (registeredUsers.length > 0) {
      setUsers(registeredUsers)
      setFilteredUsers(registeredUsers)
    } else {
      // Fallback to demo data if no registered users
      const demoUsers = [
        {
          id: 1,
          name: "Alisher Karimov",
          email: "alisher@example.com",
          phone: "+998 90 123 45 67",
          courses: 2,
          registeredAt: "2023-05-15T10:30:00Z",
          role: "user",
          active: true,
        },
        {
          id: 2,
          name: "Dilnoza Rahimova",
          email: "dilnoza@example.com",
          phone: "+998 90 234 56 78",
          courses: 1,
          registeredAt: "2023-06-20T14:45:00Z",
          role: "user",
          active: true,
        },
        {
          id: 3,
          name: "Bobur Aliyev",
          email: "bobur@example.com",
          phone: "+998 90 345 67 89",
          courses: 3,
          registeredAt: "2023-07-10T09:15:00Z",
          role: "user",
          active: true,
        },
        {
          id: 4,
          name: "Malika Umarova",
          email: "malika@example.com",
          phone: "+998 90 456 78 90",
          courses: 0,
          registeredAt: "2023-08-05T16:30:00Z",
          role: "user",
          active: true,
        },
        {
          id: 5,
          name: "Jasur Toshmatov",
          email: "jasur@example.com",
          phone: "+998 90 567 89 01",
          courses: 1,
          registeredAt: "2023-09-12T11:20:00Z",
          role: "user",
          active: true,
        },
      ]
      setUsers(demoUsers)
      setFilteredUsers(demoUsers)
    }
  }, [getAllUsers])

  // Filter users when search query changes
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredUsers(users)
    } else {
      const lowercaseQuery = searchQuery.toLowerCase()
      const filtered = users.filter(
        (user) =>
          user.name.toLowerCase().includes(lowercaseQuery) ||
          user.email.toLowerCase().includes(lowercaseQuery) ||
          user.phone.includes(searchQuery),
      )
      setFilteredUsers(filtered)
    }
  }, [searchQuery, users])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  const handleAddUser = () => {
    toast({
      title: "Foydalanuvchi qo'shish",
      description: "Yangi foydalanuvchi qo'shish funksiyasi hali ishlab chiqilmoqda",
    })
  }

  const handleToggleActive = (userId: number, currentActive: boolean) => {
    toggleUserActive(userId, !currentActive)

    // Update local state to reflect the change
    setUsers((prevUsers) => prevUsers.map((user) => (user.id === userId ? { ...user, active: !currentActive } : user)))
  }

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString)
      return formatDistanceToNow(date, { addSuffix: true })
    } catch (error) {
      return "Invalid date"
    }
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Foydalanuvchilar</h1>
        <div className="flex space-x-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Qidirish..."
              className="pl-8 w-[250px]"
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
          <Button onClick={handleAddUser}>
            <UserPlus className="mr-2 h-4 w-4" />
            Yangi foydalanuvchi
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Barcha foydalanuvchilar ({filteredUsers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Foydalanuvchi</TableHead>
                <TableHead>Aloqa</TableHead>
                <TableHead>Ro'yxatdan o'tgan</TableHead>
                <TableHead>Holat</TableHead>
                <TableHead className="text-right">Amallar</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="font-medium">{user.name}</div>
                    <div className="text-sm text-muted-foreground">{user.role || "Foydalanuvchi"}</div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center text-sm">
                      <Mail className="mr-1 h-4 w-4" />
                      {user.email}
                    </div>
                    <div className="flex items-center text-sm mt-1">
                      <Phone className="mr-1 h-4 w-4" />
                      {user.phone}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center text-sm">
                      <Calendar className="mr-1 h-4 w-4" />
                      {formatDate(user.registeredAt)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        user.active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                      }`}
                    >
                      {user.active ? "Faol" : "Faol emas"}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Menyu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => {
                            toast({
                              title: "Tahrirlash",
                              description: `${user.name} ma'lumotlarini tahrirlash`,
                            })
                          }}
                        >
                          Tahrirlash
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            toast({
                              title: "Ruxsatlar",
                              description: `${user.name} ruxsatlarini boshqarish`,
                            })
                          }}
                        >
                          Ruxsatlar
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleToggleActive(user.id, user.active)}>
                          {user.active ? "Faolsizlantirish" : "Faollashtirish"}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

