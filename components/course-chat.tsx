"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useAuth } from "@/context/auth-context"
import { useToast } from "@/hooks/use-toast"
import { useLanguage } from "@/context/language-context"

type Message = {
  id: number
  sender: {
    id: number
    name: string
    avatar?: string
    isTeacher?: boolean
  }
  content: string
  timestamp: Date | string
  type: "text" | "voice" | "video" | "image"
  mediaUrl?: string
  duration?: number
}

export default function CourseChat({ courseId, courseTitle }: { courseId: number; courseTitle: string }) {
  const { isAuthenticated, user } = useAuth()
  const { toast } = useToast()
  const { t } = useLanguage()
  const [activeTab, setActiveTab] = useState("private")
  const [message, setMessage] = useState("")
  const [privateMessages, setPrivateMessages] = useState<Message[]>([])
  const [groupMessages, setGroupMessages] = useState<Message[]>([])
  const [showTeachingOffer, setShowTeachingOffer] = useState(false)
  const [reportProblem, setReportProblem] = useState("")
  const [isSubmittingReport, setIsSubmittingReport] = useState(false)
  const [reportSubmitted, setReportSubmitted] = useState(false)
  const [isRecordingVoice, setIsRecordingVoice] = useState(false)
  const [isRecordingVideo, setIsRecordingVideo] = useState(false)
  const [showVideoCall, setShowVideoCall] = useState(false)
  const [showAudioCall, setShowAudioCall] = useState(false)
  const [callDuration, setCallDuration] = useState(0)
  const [callInterval, setCallInterval] = useState<NodeJS.Timeout | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])
  const videoChunksRef = useRef<Blob[]>([])

  // Simulate course completion for demo purposes
  const courseProgress = 100 // This would normally come from user data

  // Mock course data
  const course = {
    students: 50, // Example number of students
  }

  // Helper function to convert string dates to Date objects
  const convertDates = (messages: Message[]): Message[] => {
    return messages.map((msg) => ({
      ...msg,
      timestamp: typeof msg.timestamp === "string" ? new Date(msg.timestamp) : msg.timestamp,
    }))
  }

  // Helper function to prepare messages for storage
  const prepareForStorage = (messages: Message[]): any[] => {
    return messages.map((msg) => ({
      ...msg,
      timestamp: msg.timestamp instanceof Date ? msg.timestamp.toISOString() : msg.timestamp,
    }))
  }

  useEffect(() => {
    // Show teaching offer if course is 100% complete
    if (courseProgress === 100) {
      setShowTeachingOffer(true)
    }

    // Load initial messages
    if (isAuthenticated && user?.id) {
      // Load messages from localStorage if available
      try {
        const storedPrivateMessages = localStorage.getItem(`privateMessages_${courseId}_${user.id}`)
        const storedGroupMessages = localStorage.getItem(`groupMessages_${courseId}`)

        if (storedPrivateMessages) {
          const parsedMessages = JSON.parse(storedPrivateMessages)
          setPrivateMessages(convertDates(parsedMessages))
        } else {
          // Default messages if none in storage
          const defaultPrivateMessages = [
            {
              id: 1,
              sender: {
                id: 99,
                name: "Aziza Karimova",
                avatar: "/placeholder.svg?height=40&width=40",
                isTeacher: true,
              },
              content: t("welcomeMessage"),
              timestamp: new Date(Date.now() - 86400000), // 1 day ago
              type: "text"
            },
            {
              id: 2,
              sender: {
                id: 99,
                name: "Aziza Karimova",
                avatar: "/placeholder.svg?height=40&width=40",
                isTeacher: true,
              },
              content: t("voiceMessageExample"),
              timestamp: new Date(Date.now() - 43200000), // 12 hours ago
              type: "voice",
              mediaUrl: "/placeholder.svg?height=40&width=200",
              duration: 15
            }
          ]
          setPrivateMessages(defaultPrivateMessages)
          localStorage.setItem(
            `privateMessages_${courseId}_${user.id}`,
            JSON.stringify(prepareForStorage(defaultPrivateMessages)),
          )
        }

        if (storedGroupMessages) {
          const parsedMessages = JSON.parse(storedGroupMessages)
          setGroupMessages(convertDates(parsedMessages))
        } else {
          // Default messages if none in storage
          const defaultGroupMessages = [
            {
              id: 1,
              sender: {
                id: 99,
                name: "Aziza Karimova",
                avatar: "/placeholder.svg?height=40&width=40",
                isTeacher: true,
              },
              content: t("groupWelcomeMessage"),
              timestamp: new Date(Date.now() - 172800000), // 2 days ago
              type: "text"
            },
            {
              id: 2,
              sender: {
                id: 3,
                name: "Bobur Aliyev",
                avatar: "/placeholder.svg?height=40&width=40",
              },
              content: t("week3AssignmentQuestion"),
              timestamp: new Date(Date.now() - 86400000), // 1 day ago
              type: "text"
            },
            {
              id: 3,
              sender: {
                id: 99,
                name: "Aziza Karimova",
                avatar: "/placeholder.svg?height=40&width=40",
                isTeacher: true,
              },
              content: t("assignmentSubmissionInstructions"),
              timestamp: new Date(Date.now() - 82800000), // 23 hours ago
              type: "text"
            },
            {
              id: 4,
              sender: {
                id: 99,
                name: "Aziza Karimova",
                avatar: "/placeholder.svg?height=40&width=40",
                isTeacher: true,
              },
              content: "",
              timestamp: new Date(Date.now() - 72800000), // 20 hours ago
              type: "voice",
              mediaUrl: "/placeholder.svg?height=40&width=200",
              duration: 25
            }
          ]
          setGroupMessages(defaultGroupMessages)
          localStorage.setItem(`groupMessages_${courseId}`, JSON.stringify(prepareForStorage(defaultGroupMessages)))
        }
      } catch (error) {
        console.error("Error loading chat messages:", error)
      }
    }
  }, [isAuthenticated, courseProgress, courseId, user?.id, t])

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [privateMessages, groupMessages, activeTab])

  // Clean up media recorder on unmount
  useEffect(() => {
    return () => {
      if (mediaRecorderRef.current) {
        if (mediaRecorderRef.current.state === "recording") {
          mediaRecorderRef.current.stop()
        }
      }
      if (callInterval) {
        clearInterval(callInterval)
      }
    }
  }, [callInterval])

  const handleSendMessage = () => {
    if (!message.trim()) return
    if (!isAuthenticated || !user?.id) {
      toast({
        title: t("loginFirst"),
        description: t("loginToChat"),
        variant: "destructive",
      })
      return
    }

    const newMessage: Message = {
      id: Date.now(),
      sender: {
        id: user.id,
        name: user.name || t("user"),
        avatar: user.avatar,
      },
      content: message,
      timestamp: new Date(),
      type: "text"
    }

    try {
      if (activeTab === "private") {
        const updatedMessages = [...privateMessages, newMessage]
        setPrivateMessages(updatedMessages)

        // Save to localStorage
        localStorage.setItem(
          `privateMessages_${courseId}_${user.id}`,
          JSON.stringify(prepareForStorage(updatedMessages)),
        )

        // Simulate teacher response after a delay
        setTimeout(() => {
          const teacherResponse: Message = {
            id: Date.now() + 1,
            sender: {
              id: 99,
              name: "Aziza Karimova",
              avatar: "/placeholder.svg?height=40&width=40",
              isTeacher: true,
            },
            content: t("thankYouForQuestion"),
            timestamp: new Date(),
            type: "text"
          }
          const updatedWithResponse = [...updatedMessages, teacherResponse]
          setPrivateMessages(updatedWithResponse)

          // Save to localStorage with the response
          localStorage.setItem(
            `privateMessages_${courseId}_${user.id}`,
            JSON.stringify(prepareForStorage(updatedWithResponse)),
          )
        }, 1000)
      } else {
        const updatedMessages = [...groupMessages, newMessage]
        setGroupMessages(updatedMessages)

        // Save to localStorage
        localStorage.setItem(`groupMessages_${courseId}`, JSON.stringify(prepareForStorage(updatedMessages)))
      }

      setMessage("")
    } catch (error) {
      console.error("Error saving chat messages:", error)
      toast({
        title: t("error"),
        description: t("errorSavingMessage"),
        variant: "destructive",
      })
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleReportProblem = () => {
    if (!reportProblem.trim()) {
      toast({
        title: t("error"),
        description: t("pleaseEnterProblemDescription"),
        variant: "destructive",
      })
      return
    }

    if (!user?.id) {
      toast({
        title: t("loginFirst"),
        description: t("loginToReportProblem"),
        variant: "destructive",
      })
      return
    }

    setIsSubmittingReport(true)

    // Simulate sending the report
    setTimeout(() => {
      // In a real app, this would be an API call
      console.log("Problem report:", reportProblem)

      setIsSubmittingReport(false)
      setReportSubmitted(true)

      // Add the report to private messages
      const newMessage: Message = {
        id: Date.now(),
        sender: {
          id: user.id,
          name: user.name || t("user"),
          avatar: user.avatar,
        },
        content: `${t("problem")}: ${reportProblem}`,
        timestamp: new Date(),
        type: "text"
      }

      const updatedMessages = [...privateMessages, newMessage]
      setPrivateMessages(updatedMessages)

// Save to localStorage

