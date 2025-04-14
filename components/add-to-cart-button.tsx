"use client"

import { useState, useEffect } from "react"
import { ShoppingCart, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { useLanguage } from "@/context/language-context"

type CartItem = {
  id: number
  title: string
  price: number
  image: string
  quantity: number
}

export default function AddToCartButton({
  courseId,
  courseTitle,
  coursePrice,
  courseImage = "/placeholder.svg",
}: {
  courseId: number
  courseTitle: string
  coursePrice: number
  courseImage?: string
}) {
  const [isInCart, setIsInCart] = useState(false)
  const [isAdding, setIsAdding] = useState(false)
  const { toast } = useToast()
  const { t } = useLanguage()

  // Check if course is already in cart
  useEffect(() => {
    try {
      const cartItems = localStorage.getItem("cartItems")
      if (cartItems) {
        const items = JSON.parse(cartItems) as CartItem[]
        setIsInCart(items.some((item) => item.id === courseId))
      }
    } catch (error) {
      console.error("Failed to check cart:", error)
    }
  }, [courseId])

  // Listen for cart updates from other components
  useEffect(() => {
    const handleCartUpdate = () => {
      try {
        const cartItems = localStorage.getItem("cartItems")
        if (cartItems) {
          const items = JSON.parse(cartItems) as CartItem[]
          setIsInCart(items.some((item) => item.id === courseId))
        } else {
          setIsInCart(false)
        }
      } catch (error) {
        console.error("Failed to update cart status:", error)
      }
    }

    window.addEventListener("cartUpdated", handleCartUpdate)
    return () => {
      window.removeEventListener("cartUpdated", handleCartUpdate)
    }
  }, [courseId])

  const handleAddToCart = () => {
    if (isInCart) {
      // Navigate to cart
      window.location.href = "/cart"
      return
    }

    setIsAdding(true)

    try {
      // Get existing cart items
      const existingCartItems = localStorage.getItem("cartItems")
      const cartItems: CartItem[] = existingCartItems ? JSON.parse(existingCartItems) : []

      // Add new item
      const newItem: CartItem = {
        id: courseId,
        title: courseTitle,
        price: coursePrice,
        image: courseImage,
        quantity: 1,
      }

      cartItems.push(newItem)

      // Save to localStorage
      localStorage.setItem("cartItems", JSON.stringify(cartItems))

      // Update state
      setIsInCart(true)

      // Show toast
      toast({
        title: t("addedToCart"),
        description: t("courseAddedToCart"),
      })

      // Dispatch custom event to notify other components about cart update
      const event = new Event("cartUpdated")
      window.dispatchEvent(event)
    } catch (error) {
      console.error("Failed to add to cart:", error)
      toast({
        title: t("error"),
        description: t("failedToAddToCart"),
        variant: "destructive",
      })
    } finally {
      setIsAdding(false)
    }
  }

  return (
    <Button className="w-full" onClick={handleAddToCart} disabled={isAdding}>
      {isInCart ? (
        <>
          <Check className="mr-2 h-4 w-4" />
          {t("viewCart")}
        </>
      ) : (
        <>
          <ShoppingCart className="mr-2 h-4 w-4" />
          {t("addToCart")}
        </>
      )}
    </Button>
  )
}

