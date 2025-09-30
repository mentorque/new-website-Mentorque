"use client"

import { useState, useEffect, useRef } from "react"
import Resume from "@/components/onlyslider"

function ResponsiveImage({ src, alt, className, priority = false, ...props }) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-gray-800/30 animate-pulse rounded-2xl" />
      )}
      <img
        src={hasError ? "" : src}
        alt={alt}
        className={`max-w-full max-h-full object-contain rounded-2xl shadow-2xl transition-all duration-700 ease-out ${
          isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"
        } ${className}`}
        loading={priority ? "eager" : "lazy"}
        onLoad={() => setIsLoaded(true)}
        onError={() => {
          setHasError(true)
          setIsLoaded(true)
        }}
        {...props}
      />
    </div>
  )
}

function ResponsiveVideo({ src, className, priority = false, ...props }) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (video) {
      const handleLoad = () => setIsLoaded(true)
      const handleError = () => {
        setHasError(true)
        setIsLoaded(true)
      }

      video.addEventListener("loadeddata", handleLoad)
      video.addEventListener("error", handleError)

      return () => {
        video.removeEventListener("loadeddata", handleLoad)
        video.removeEventListener("error", handleError)
      }
    }
  }, [src])

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-gray-800/30 animate-pulse rounded-2xl flex items-center justify-center">
          <p className="text-gray-400">Loading video...</p>
        </div>
      )}
      {!hasError && (
        <video
          ref={videoRef}
          src={src}
          className={`w-full h-full object-contain rounded-2xl shadow-2xl transition-all duration-700 ease-out ${
            isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"
          } ${className || ""}`}
          autoPlay
          loop
          muted
          playsInline
          preload={priority ? "auto" : "metadata"}
          {...props}
        />
      )}
      {hasError && (
        <div className="flex flex-col items-center justify-center w-full h-full bg-gray-800/30 rounded-2xl p-4">
          <p className="text-red-400 text-center mb-2">Video could not be loaded</p>
        </div>
      )}
    </div>
  )
}

const scrollSections = [
  {
    id: 0,
    type: "resume",
    title: "Resume Transformation",
    content: "Resumes tailored by industry experts. Hyper-personalized to your goals. Proven to deliver tangible results fast.",
  },
  {
    id: 1,
    type: "video",
    title: "Mentorque AI",
    content: "Reads what you read. Sees what you see. Powered by Gemini 2.5-Flash that replaces all the tab switching and answers everything related to your job search.",
    video: "./video1-1.webm",
  },
  {
    id: 2,
    type: "video",
    title: "Track Your Progress",
    content: "With Mentorque dashboard, keep track of your progress, milestones, and growth effortlessly — all in one place.",
    video: "./video2-2.webm",
  },
  {
    id: 3,
    type: "image",
    title: "Portfolios that Convert",
    content: "Your skills. Our design. One stunning portfolio that sets you apart, increasing your odds of getting call-backs.",
    image: "/portfolioooo.png",
  },
]

export default function Component() {
  const [currentSection, setCurrentSection] = useState(0)
  const [imageVisible, setImageVisible] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return
      const container = containerRef.current
      const rect = container.getBoundingClientRect()
      const windowHeight = window.innerHeight

      if (rect.top <= windowHeight && rect.bottom >= 0) {
        if (!imageVisible && rect.top <= windowHeight * 0.8) setImageVisible(true)

        const progress = Math.max(
          0,
          Math.min(1, (windowHeight * 0.5 - rect.top) / (windowHeight + rect.height * 0.5))
        )

        const sectionIndex = Math.floor(progress * scrollSections.length)
        const clampedIndex = Math.max(0, Math.min(scrollSections.length - 1, sectionIndex))

        if (clampedIndex !== currentSection) {
          setIsTransitioning(true)
          setTimeout(() => {
            setCurrentSection(clampedIndex)
            setIsTransitioning(false)
          }, 50)
        }
      } else if (rect.top > windowHeight) {
        setImageVisible(false)
        setCurrentSection(0)
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [currentSection, imageVisible])

  const [containerHeight, setContainerHeight] = useState(() => {
    if (typeof window !== "undefined") {
      const vw = window.innerWidth
      return scrollSections.length * (vw >= 1024 ? 100 : 80)
    }
    return scrollSections.length * 100
  })

  useEffect(() => {
    const handleResize = () => {
      const vw = window.innerWidth
      setContainerHeight(scrollSections.length * (vw >= 1024 ? 100 : 80))
    }
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const currentSectionData = scrollSections[currentSection]
  const isVideoSection = currentSectionData.type === "video"

  return (
    <div className="bg-black">
      <div ref={containerRef} className="relative" style={{ height: `${containerHeight}vh` }}>
        <div className="sticky top-0 flex items-center h-screen">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
            <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-16 items-center justify-center">
              {/* Left media - Increased size for videos */}
              <div
  className={`relative transition-all duration-1000 ease-out w-full ${
    imageVisible ? "translate-y-0 opacity-100" : "translate-y-32 opacity-0"
  } ${isVideoSection ? "lg:col-span-1" : "lg:col-span-1"}`}
>
  <div
    className={`relative w-full ${
      currentSectionData.type === "resume"
        ? "h-[450px] sm:h-[500px] lg:h-[00px] xl:h-[595px] flex items-center justify-center"
        : isVideoSection
        ? "h-[400px] sm:h-[500px] lg:h-[700px] xl:h-[800px]"
        : "h-[350px] sm:h-[450px] lg:h-[595px] xl:h-[595px]"
    }`}
  >
    {currentSectionData.type === "resume" && (
      <div className="w-full h-full lg:h-auto">
        <Resume />
      </div>
    )}

    {currentSectionData.type === "image" && (
      <ResponsiveImage
        src={currentSectionData.image || "/placeholder.svg"}
        alt={currentSectionData.title}
      />
    )}

    {currentSectionData.type === "video" && (
      <ResponsiveVideo src={currentSectionData.video} />
    )}
  </div>
</div>


              {/* Right text - Pushed further to the right */}
              <div className="space-y-6 lg:space-y-8 w-full text-center lg:text-left lg:pl-12">
                <div
                  className={`transition-all duration-300 ease-out ${
                    isTransitioning ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"
                  }`}
                >
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl text-white mb-4 lg:mb-6 font-bold leading-tight">
                    {currentSectionData.title}
                  </h2>
                  <p className="text-lg sm:text-xl text-gray-100 leading-relaxed max-w-2xl mx-auto lg:mx-0 lg:max-w-md">
                    {currentSectionData.content}
                  </p>
                </div>

                {/* Progress indicators */}
                <div className="flex justify-center lg:justify-start space-x-2 mt-8">
                  {scrollSections.map((_, index) => (
                    <div
                      key={index}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        index === currentSection ? "bg-white w-12" : "bg-gray-600 w-8"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}