"use client"

import { useState, useEffect } from "react"

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Ekran o'lchamini tekshirish uchun funksiya
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768) // 768px dan kichik ekranlar mobil hisoblanadi
    }

    // Dastlab tekshirish
    checkIfMobile()

    // Ekran o'lchami o'zgarganida tekshirish
    window.addEventListener("resize", checkIfMobile)

    // Cleanup
    return () => {
      window.removeEventListener("resize", checkIfMobile)
    }
  }, [])

  return isMobile
}

