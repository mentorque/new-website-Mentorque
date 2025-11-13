"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import type { ReactEventHandler } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import {
  getWhatsAppTestimonials,
  WHATSAPP_TESTIMONIAL_IMAGES,
} from "@/data/whatsappTestimonials"

const naturalCompare = (a: string, b: string) =>
  a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" })

const toUniqueArray = <T,>(items: T[]) => Array.from(new Set(items))

const toTitle = (fileName: string) =>
  fileName
    .replace(/[-_]/g, " ")
    .replace(/\s+/g, " ")
    .replace(/\.[^/.]+$/, "")
    .trim()

const fallbackImages = WHATSAPP_TESTIMONIAL_IMAGES
const FALLBACK_PLACEHOLDER = "/placeholder.svg"

const handleImageError: ReactEventHandler<HTMLImageElement> = (event) => {
  const img = event.currentTarget

  if (img.dataset.fallbackApplied === "true") {
    return
  }

  img.dataset.fallbackApplied = "true"
  img.src = FALLBACK_PLACEHOLDER
}

const MobileTestimonialsGallery = () => {
  const carouselRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const testimonialImages = useMemo(() => {
    const images = getWhatsAppTestimonials().sort(naturalCompare)
    return images.length ? images : Array.from(fallbackImages)
  }, [])

  const uniqueImages = useMemo(
    () => toUniqueArray(testimonialImages),
    [testimonialImages],
  )

  const mobileItems = useMemo(() => {
    const desiredCount = Math.min(Math.max(uniqueImages.length, 5), 10)
    const source =
      uniqueImages.length >= desiredCount
        ? uniqueImages
        : toUniqueArray([...uniqueImages, ...fallbackImages])

    return source.slice(0, desiredCount).map((image, index) => ({
      image,
      title: toTitle(image.split("/").pop() ?? `testimonial-${index + 1}`),
    }))
  }, [uniqueImages])

  useEffect(() => {
    setCurrentIndex(0)
  }, [mobileItems.length])

  const goToSlide = (index: number) => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentIndex(index)
    setTimeout(() => setIsTransitioning(false), 350)
  }

  const nextSlide = () => {
    if (!mobileItems.length || isTransitioning) return
    setIsTransitioning(true)
    const newIndex = (currentIndex + 1) % mobileItems.length
    setCurrentIndex(newIndex)
    setTimeout(() => setIsTransitioning(false), 350)
  }

  const prevSlide = () => {
    if (!mobileItems.length || isTransitioning) return
    setIsTransitioning(true)
    const newIndex = (currentIndex - 1 + mobileItems.length) % mobileItems.length
    setCurrentIndex(newIndex)
    setTimeout(() => setIsTransitioning(false), 350)
  }

  return (
    <div className="relative px-2 sm:px-3">
      <div
        className="relative overflow-hidden rounded-2xl bg-black/10 border border-white/10"
        ref={containerRef}
      >
        <div
          ref={carouselRef}
          className="flex transition-transform duration-300 ease-out"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
            touchAction: 'pan-y pinch-zoom',
          }}
        >
          {mobileItems.map((item, index) => (
            <div
              key={item.image + index}
              className="flex-shrink-0 w-full flex justify-center py-5 px-2"
              style={{ minWidth: '100%' }}
            >
              <div className="relative rounded-2xl bg-zinc-900/70 backdrop-blur-md overflow-hidden border border-zinc-800/60 shadow-[0_8px_24px_-10px_rgba(0,0,0,0.65)] px-5 py-6">
                <img
                  src={item.image || FALLBACK_PLACEHOLDER}
                  alt={item.title}
                  className="block h-[360px] sm:h-[432px] w-auto max-w-[288px] sm:max-w-[403px] object-contain rounded-xl mx-auto"
                  loading="lazy"
                  decoding="async"
                  onError={handleImageError}
                  style={{ 
                    imageRendering: "auto", 
                    WebkitFontSmoothing: "antialiased" as any,
                    userSelect: 'none',
                    pointerEvents: 'none'
                  }}
                  draggable={false}
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={prevSlide}
          disabled={isTransitioning}
          className="absolute left-2.5 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/80 border border-white/10 hover:bg-black/90 active:scale-95 transition-all disabled:opacity-50 z-10"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        <button
          onClick={nextSlide}
          disabled={isTransitioning}
          className="absolute right-2.5 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/80 border border-white/10 hover:bg-black/90 active:scale-95 transition-all disabled:opacity-50 z-10"
          aria-label="Next image"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>
      </div>

      <div className="flex justify-center gap-2 mt-5">
        {mobileItems.map((_, index) => (
          <button
            key={`dot-${index}`}
            onClick={() => goToSlide(index)}
            disabled={isTransitioning}
            className={`w-2 h-2 rounded-full transition-colors disabled:cursor-not-allowed ${index === currentIndex ? "bg-white" : "bg-white/30"}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

export default MobileTestimonialsGallery