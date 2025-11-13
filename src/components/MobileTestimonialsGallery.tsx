"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { getWhatsAppTestimonials } from "@/data/whatsappTestimonials"

const naturalCompare = (a: string, b: string) =>
  a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" })

const toUniqueArray = <T,>(items: T[]) => Array.from(new Set(items))

const toTitle = (fileName: string) =>
  fileName
    .replace(/[-_]/g, " ")
    .replace(/\s+/g, " ")
    .replace(/\.[^/.]+$/, "")
    .trim()

const fallbackImages = [
  "/screen/imp1.jpg",
  "/screen/15.png",
  "/screen/16.png",
  "/screen/17.png",
  "/screen/18.jpeg",
  "/screen/19.jpeg",
  "/screen/20.jpeg",
  "/screen/6.jpg",
  "/screen/7.jpg",
  "/screen/10.jpg",
  "/screen/12.png",
  "/screen/14.png",
] as const


const MobileTestimonialsGallery = () => {
  const carouselRef = useRef<HTMLDivElement>(null)
  const [currentIndex, setCurrentIndex] = useState(0)

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
    setCurrentIndex(index)
  }

  const nextSlide = () => {
    if (!mobileItems.length) return
    const newIndex = (currentIndex + 1) % mobileItems.length
    setCurrentIndex(newIndex)
  }

  const prevSlide = () => {
    if (!mobileItems.length) return
    const newIndex = (currentIndex - 1 + mobileItems.length) % mobileItems.length
    setCurrentIndex(newIndex)
  }

  return (
    <div className="relative px-2 sm:px-3">
      <div
        className="relative overflow-hidden rounded-2xl bg-black/10 border border-white/10"
        ref={carouselRef}
      >
        <div
          className="flex w-full transition-transform duration-300 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
            width: `${mobileItems.length * 100}%`,
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {mobileItems.map((item, index) => (
            <div key={item.image + index} className="flex w-full justify-center py-5">
              <div className="relative rounded-2xl bg-zinc-900/70 backdrop-blur-md overflow-hidden border border-zinc-800/60 shadow-[0_8px_24px_-10px_rgba(0,0,0,0.65)] px-5 py-6">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  className="block h-[360px] sm:h-[432px] max-w-[288px] sm:max-w-[403px] object-contain rounded-xl transition-transform duration-500"
                  loading="lazy"
                  style={{ imageRendering: "auto", WebkitFontSmoothing: "antialiased" as any }}
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={prevSlide}
          className="absolute left-2.5 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/80 border border-white/10"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-2.5 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/80 border border-white/10"
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
            className={`w-2 h-2 rounded-full transition-colors ${index === currentIndex ? "bg-white" : "bg-white/30"}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

export default MobileTestimonialsGallery
