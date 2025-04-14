"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useAuth } from "@/context/auth-context"
import { useLanguage } from "@/context/language-context"

export default function ProfilePage() {
  const router = useRouter()
  const { user, isAuthenticated, isLoading } = useAuth()
  const { t, language } = useLanguage()
  const [activeTab, setActiveTab] = useState("overview")
  const [mounted, setMounted] = useState(false)

  // After component mounts, we can access translations
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login")
    }
  }, [isLoading, isAuthenticated, router])

  if (isLoading || !isAuthenticated || !mounted) {
    return <div className="container mx-auto py-10">Loading...</div>
  }

  // These translations are needed for the profile page
  const translations = {
    welcome_back: t("welcome_back") || "Welcome Back",
    welcome_message: t("welcome_message") || `Welcome back, ${user?.name}`,
    profile_completion: t("profile_completion") || "Profile Completion",
    student: t("student") || "Student",
    english_b2: t("english_b2") || "English B2",
    it_beginner: t("it_beginner") || "IT Beginner",
    edit_profile: t("edit_profile") || "Edit Profile",
    quick_links: t("quick_links") || "Quick Links",
    my_courses: t("my_courses") || "My Courses",
    certificates: t("certificates") || "Certificates",
    support_chat: t("support_chat") || "Support Chat",
    browse_courses: t("browse_courses") || "Browse Courses",
    overview: t("overview") || "Overview",
    progress: t("progress") || "Progress",
    achievements: t("achievements") || "Achievements",
    active_courses: t("active_courses") || "Active Courses",
    completed_courses: t("completed_courses") || "Completed Courses",
    next_lesson: t("next_lesson") || "Next Lesson",
    join_now: t("join_now") || "Join Now",
    recent_activity: t("recent_activity") || "Recent Activity",
    view_all_activity: t("view_all_activity") || "View All Activity",
    learning_progress: t("learning_progress") || "Learning Progress",
    progress_description: t("progress_description") || "Track your progress across all courses",
    your_achievements: t("your_achievements") || "Your Achievements",
    achievements_description: t("achievements_description") || "Achievements you've earned so far",
    first_course: t("first_course") || "First Course",
    completed_first_course: t("completed_first_course") || "Completed your first course",
    coding_streak: t("coding_streak") || "Coding Streak",
    seven_day_streak: t("seven_day_streak") || "Maintained a 7-day learning streak",
    quiz_master: t("quiz_master") || "Quiz Master",
    perfect_score: t("perfect_score") || "Achieved a perfect score on a quiz",
    fast_learner: t("fast_learner") || "Fast Learner",
    completed_course_quickly: t("completed_course_quickly") || "Completed a course in record time",
  }

  // Function to get completed lesson text with number
  const getCompletedLessonText = (number: number) => {
    const lessonText = t("completed_lesson") || "Completed Lesson"
    return `${lessonText} ${number}`
  }

  // Function to get days ago text with count
  const getDaysAgoText = (count: number) => {
    const daysText = t("days_ago") || "days ago"
    return `${count} ${daysText}`
  }

  return (
    <div className="container mx-auto py-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile sidebar */}
        <div className="md:col-span-1">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex flex-col items-center space-y-3">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={user?.avatar} alt={user?.name} />
                  <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
                </Avatar>
                <div className="space-y-1 text-center">
                  <h2 className="text-2xl font-bold">{user?.name}</h2>
                  <p className="text-sm text-muted-foreground">{user?.email}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{translations.profile_completion}</span>
                    <span className="text-sm text-muted-foreground">75%</span>
                  </div>
                  <Progress value={75} />
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">{translations.student}</Badge>
                  <Badge variant="outline">{translations.english_b2}</Badge>
                  <Badge variant="outline">{translations.it_beginner}</Badge>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" onClick={() => router.push("/profile/settings")}>
                {translations.edit_profile}
              </Button>
            </CardFooter>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>{translations.quick_links}</CardTitle>
            </CardHeader>
            <CardContent className="pb-6">
              <div className="grid gap-2">
                <Button variant="ghost" className="justify-start" onClick={() => router.push("/profile/courses")}>
                  {translations.my_courses}
                </Button>
                <Button variant="ghost" className="justify-start" onClick={() => router.push("/profile/certificates")}>
                  {translations.certificates}
                </Button>
                <Button variant="ghost" className="justify-start" onClick={() => router.push("/profile/chat")}>
                  {translations.support_chat}
                </Button>
                <Button variant="ghost" className="justify-start" onClick={() => router.push("/courses")}>
                  {translations.browse_courses}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main content */}
        <div className="md:col-span-2">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">{translations.overview}</TabsTrigger>
              <TabsTrigger value="progress">{translations.progress}</TabsTrigger>
              <TabsTrigger value="achievements">{translations.achievements}</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>{translations.welcome_back}</CardTitle>
                  <CardDescription>{translations.welcome_message}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="border rounded-lg p-4">
                        <h3 className="font-medium mb-2">{translations.active_courses}</h3>
                        <p className="text-3xl font-bold">3</p>
                      </div>
                      <div className="border rounded-lg p-4">
                        <h3 className="font-medium mb-2">{translations.completed_courses}</h3>
                        <p className="text-3xl font-bold">2</p>
                      </div>
                    </div>
                    <div className="border rounded-lg p-4">
                      <h3 className="font-medium mb-2">{translations.next_lesson}</h3>
                      <p className="font-medium">Advanced JavaScript - Functions</p>
                      <p className="text-sm text-muted-foreground">Today at 18:00</p>
                      <Button size="sm" className="mt-2">
                        {translations.join_now}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{translations.recent_activity}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex items-start space-x-4 border-b pb-4 last:border-0 last:pb-0">
                        <div className="rounded-full bg-primary/10 p-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-primary"
                          >
                            <path d="M12 20h9" />
                            <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                          </svg>
                        </div>
                        <div>
                          <p className="font-medium">{getCompletedLessonText(i)}</p>
                          <p className="text-sm text-muted-foreground">{getDaysAgoText(i)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" className="w-full">
                    {translations.view_all_activity}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="progress" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>{translations.learning_progress}</CardTitle>
                  <CardDescription>{translations.progress_description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { course: "JavaScript Fundamentals", progress: 100 },
                      { course: "React for Beginners", progress: 75 },
                      { course: "Advanced English for IT", progress: 60 },
                    ].map((course, i) => (
                      <div key={i} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{course.course}</span>
                          <span className="text-sm text-muted-foreground">{course.progress}%</span>
                        </div>
                        <Progress value={course.progress} />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="achievements" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>{translations.your_achievements}</CardTitle>
                  <CardDescription>{translations.achievements_description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      {
                        title: translations.first_course,
                        description: translations.completed_first_course,
                        date: "2023-01-15",
                      },
                      {
                        title: translations.coding_streak,
                        description: translations.seven_day_streak,
                        date: "2023-02-10",
                      },
                      { title: translations.quiz_master, description: translations.perfect_score, date: "2023-03-05" },
                      {
                        title: translations.fast_learner,
                        description: translations.completed_course_quickly,
                        date: "2023-04-20",
                      },
                    ].map((achievement, i) => (
                      <div key={i} className="border rounded-lg p-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-yellow-500"
                          >
                            <circle cx="12" cy="8" r="7" />
                            <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
                          </svg>
                          <h3 className="font-medium">{achievement.title}</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">{achievement.description}</p>
                        <p className="text-xs text-muted-foreground mt-2">
                          {new Date(achievement.date).toLocaleDateString()}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

