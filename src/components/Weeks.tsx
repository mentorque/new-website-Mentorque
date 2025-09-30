"use client"

import { useState, useEffect, useRef } from "react"
import Resume from "@/components/onlyslider"
import { Play, Pause, Loader } from 'lucide-react'

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

function ResponsiveVideo({ src, thumbnail, className, priority = false, sectionId, currentSection, ...props }) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [showThumbnail, setShowThumbnail] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  // Reset to thumbnail when section changes away from this video
  useEffect(() => {
    if (currentSection !== sectionId) {
      // If this video is not the current section, reset it
      if (videoRef.current) {
        videoRef.current.pause()
        videoRef.current.currentTime = 0
      }
      setIsPlaying(false)
      setShowThumbnail(true)
      setIsLoading(false)
    }
  }, [currentSection, sectionId])

  // Preload video metadata
  useEffect(() => {
    const video = videoRef.current
    if (video && src) {
      const handleLoad = () => {
        console.log("Video metadata loaded:", src)
        setIsLoaded(true)
      }
      
      const handleError = (e) => {
        console.error("Video loading error:", src, e)
        setHasError(true)
        setIsLoaded(true)
      }

      video.preload = "metadata"
      video.addEventListener("loadedmetadata", handleLoad)
      video.addEventListener("error", handleError)

      return () => {
        video.removeEventListener("loadedmetadata", handleLoad)
        video.removeEventListener("error", handleError)
      }
    }
  }, [src])

  const togglePlay = async () => {
    if (!videoRef.current || !isLoaded) return
    
    try {
      if (isPlaying) {
        // Pause video
        videoRef.current.pause()
        setIsPlaying(false)
      } else {
        // Play video
        setIsLoading(true)
        setShowThumbnail(false)
        
        const video = videoRef.current
        
        // Critical: Ensure mobile attributes are set
        video.playsInline = true
        video.muted = true
        video.setAttribute('playsinline', 'true')
        video.setAttribute('webkit-playsinline', 'true')
        video.setAttribute('muted', 'true')
        
        // Small delay to ensure DOM updates
        await new Promise(resolve => setTimeout(resolve, 50))
        
        const playPromise = video.play()
        
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              console.log("Video started playing")
              setIsPlaying(true)
              setIsLoading(false)
            })
            .catch(error => {
              console.error("Play failed:", error)
              // Fallback: show thumbnail and let user retry
              setShowThumbnail(true)
              setIsLoading(false)
            })
        }
      }
    } catch (error) {
      console.error("Toggle play error:", error)
      setShowThumbnail(true)
      setIsLoading(false)
    }
  }

  // Handle video events
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handlePlay = () => {
      setIsPlaying(true)
      setIsLoading(false)
    }

    const handlePause = () => {
      setIsPlaying(false)
    }

    const handleEnded = () => {
      setIsPlaying(false)
      setShowThumbnail(true)
      video.currentTime = 0 // Reset to beginning
    }

    const handleWaiting = () => setIsLoading(true)
    const handleCanPlay = () => setIsLoading(false)

    video.addEventListener("play", handlePlay)
    video.addEventListener("pause", handlePause)
    video.addEventListener("ended", handleEnded)
    video.addEventListener("waiting", handleWaiting)
    video.addEventListener("canplay", handleCanPlay)

    return () => {
      video.removeEventListener("play", handlePlay)
      video.removeEventListener("pause", handlePause)
      video.removeEventListener("ended", handleEnded)
      video.removeEventListener("waiting", handleWaiting)
      video.removeEventListener("canplay", handleCanPlay)
    }
  }, [])

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Thumbnail with play button - Always show first */}
      {showThumbnail && (
        <div 
          className="absolute inset-0 z-20 transition-all duration-300 cursor-pointer group"
          onClick={togglePlay}
        >
          {thumbnail ? (
            <img
              src={thumbnail}
              alt="Video thumbnail"
              className="w-full h-full object-contain rounded-2xl"
              onError={(e) => {
                console.error("Thumbnail failed to load:", thumbnail)
                // Show fallback if thumbnail fails
                e.target.style.display = 'none'
              }}
            />
          ) : (
            <div className="w-full h-full bg-gray-800 rounded-2xl flex items-center justify-center">
              <div className="bg-white/90 backdrop-blur-sm rounded-full p-4">
                <Play className="w-8 h-8 text-black fill-current" />
              </div>
            </div>
          )}
          {/* Play button overlay */}
          <div className="absolute inset-0 bg-black/30 hover:bg-black/20 transition-all duration-300 rounded-2xl flex items-center justify-center">
            <div className="bg-white/90 backdrop-blur-sm rounded-full p-3 sm:p-4 group-hover:scale-110 transition-transform duration-300 shadow-2xl">
              <Play className="w-6 h-6 sm:w-8 sm:h-8 text-black fill-current" />
            </div>
          </div>
        </div>
      )}

      {/* Loading state */}
      {isLoading && (
        <div className="absolute inset-0 z-30 bg-black/50 rounded-2xl flex items-center justify-center">
          <div className="bg-black/70 backdrop-blur-sm rounded-full p-4 sm:p-6 flex flex-col items-center gap-2">
            <Loader className="w-6 h-6 sm:w-8 sm:h-8 text-white animate-spin" />
            <span className="text-white text-xs sm:text-sm">Loading...</span>
          </div>
        </div>
      )}

      {/* Error state */}
      {hasError && (
        <div 
          className="absolute inset-0 z-30 flex flex-col items-center justify-center w-full h-full bg-gray-800/70 rounded-2xl p-4 cursor-pointer"
          onClick={togglePlay}
        >
          <p className="text-red-400 text-center mb-2 text-sm">Video failed to load</p>
          <p className="text-gray-400 text-center text-xs">Tap to retry</p>
        </div>
      )}

      {/* Video element */}
      <div className={`relative w-full h-full transition-opacity duration-300 ${
        showThumbnail ? 'opacity-0' : 'opacity-100'
      }`}>
        <video
          ref={videoRef}
          src={src}
          className={`w-full h-full object-contain rounded-2xl shadow-2xl ${
            className || ""
          }`}
          loop
          muted
          playsInline
          preload="metadata"
          // Mobile-specific attributes
          webkit-playsinline="true"
          x5-playsinline="true"
          x5-video-player-type="h5"
          {...props}
        >
          <source src={src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Play/Pause overlay - Only show when video is visible */}
        {!showThumbnail && !isLoading && (
          <div 
            className="absolute inset-0 cursor-pointer flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 z-10"
            onClick={togglePlay}
          >
            <div className="bg-black/60 backdrop-blur-sm rounded-full p-3 sm:p-4 transition-transform duration-200 hover:scale-110">
              {isPlaying ? (
                <Pause className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              ) : (
                <Play className="w-5 h-5 sm:w-6 sm:h-6 text-white fill-current" />
              )}
            </div>
          </div>
        )}

        {/* Always visible mobile controls */}
        {!showThumbnail && !isLoading && (
          <div className="md:hidden absolute bottom-4 right-4 z-20">
            <div 
              className="bg-black/80 backdrop-blur-sm rounded-full p-3 border border-white/20"
              onClick={togglePlay}
            >
              {isPlaying ? (
                <Pause className="w-4 h-4 text-white" />
              ) : (
                <Play className="w-4 h-4 text-white fill-current" />
              )}
            </div>
          </div>
        )}
      </div>
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
    video: "./video1-1.mp4",
    thumbnail: "./thumbnail1.png",
  },
  {
    id: 2,
    type: "video",
    title: "Track Your Progress",
    content: "With Mentorque dashboard, keep track of your progress, milestones, and growth effortlessly — all in one place.",
    video: "./video2-2.mp4",
    thumbnail: "./thumbnail2.png",
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

    window.addEventListener("scroll", handleScroll, { passive: true })
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

  return (
    <div className="bg-black">
      <div ref={containerRef} className="relative" style={{ height: `${containerHeight}vh` }}>
        <div className="sticky top-0 flex items-center h-screen">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
            <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-16 items-center justify-center">
              {/* Left media */}
              <div
                className={`relative transition-all duration-1000 ease-out w-full ${
                  imageVisible ? "translate-y-0 opacity-100" : "translate-y-32 opacity-0"
                } ${currentSectionData.type === "video" ? "lg:col-span-1" : "lg:col-span-1"}`}
              >
                <div
                  className={`relative w-full ${
                    currentSectionData.type === "resume"
                      ? "h-[450px] sm:h-[500px] lg:h-[500px] xl:h-[595px] flex items-center justify-center"
                      : currentSectionData.type === "video"
                      ? "h-[400px] sm:h-[500px] lg:h-[600px] xl:h-[700px]"
                      : "h-[350px] sm:h-[450px] lg:h-[500px] xl:h-[595px]"
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
                    <ResponsiveVideo 
                      src={currentSectionData.video} 
                      thumbnail={currentSectionData.thumbnail}
                      sectionId={currentSectionData.id}
                      currentSection={currentSection}
                    />
                  )}
                </div>
              </div>

              {/* Right text */}
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