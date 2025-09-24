"use client"

import { useState, useEffect, useRef } from "react"
import BeforeAfterSlider from "./BeforeAfterSlider"

export default function Resume() {
  const afterResume = "/before.jpeg"
  const beforeResume = "/after.jpeg"
  
  const [animatedValue, setAnimatedValue] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (isVisible) {
      // Smooth number animation
      const duration = 2500
      const steps = 60
      const increment = 80 / steps
      let current = 0
      
      const timer = setInterval(() => {
        current += increment
        if (current >= 80) {
          setAnimatedValue(80)
          clearInterval(timer)
        } else {
          setAnimatedValue(Math.floor(current))
        }
      }, duration / steps)

      return () => clearInterval(timer)
    }
  }, [isVisible])

  return (
    <div ref={sectionRef} className="w-full h-full flex items-center justify-center">
      <div className="w-full h-full max-w-lg">
        <BeforeAfterSlider
          before={beforeResume}
          after={afterResume}
          width={470}
          height={580}
          className="w-full h-full"
        />
      </div>
    </div>
  )
}