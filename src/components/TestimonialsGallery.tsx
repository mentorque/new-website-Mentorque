import { useEffect, useMemo, useState, useRef } from "react"
import { ArrowUpRight, Calendar, ChevronLeft, ChevronRight } from "lucide-react"
import { Link } from "react-router-dom"

const testimonialAssetModules = import.meta.glob<
  true,
  string,
  string
>("/public/Whatsapp_testimonial_screenshots/*.{png,jpg,jpeg,webp}", {
  as: "url",
  eager: true,
})

const layoutSlots = [
  { rotation: -2, desktop: { top: "4%", left: "2%" }, width: "221px", delay: 0 },
  { rotation: 1.5, desktop: { top: "6%", left: "22%" }, width: "225px", delay: 0.06 },
  { rotation: -1.8, desktop: { top: "3%", left: "43%" }, width: "219px", delay: 0.12 },
  { rotation: 2.2, desktop: { top: "5%", left: "64%" }, width: "223px", delay: 0.18 },
  { rotation: -1.5, desktop: { top: "7%", left: "84%" }, width: "226px", delay: 0.24 },
  { rotation: 2, desktop: { top: "30%", left: "3%" }, width: "224px", delay: 0.3 },
  { rotation: -2.3, desktop: { top: "28%", left: "23%" }, width: "220px", delay: 0.36 },
  { rotation: 1.7, desktop: { top: "31%", left: "44%" }, width: "224px", delay: 0.42 },
  { rotation: -1.9, desktop: { top: "29%", left: "65%" }, width: "222px", delay: 0.48 },
  { rotation: 2.1, desktop: { top: "32%", left: "85%" }, width: "227px", delay: 0.54 },
  { rotation: -1.6, desktop: { top: "56%", left: "4%" }, width: "221px", delay: 0.6 },
  { rotation: 2.4, desktop: { top: "54%", left: "24%" }, width: "225px", delay: 0.66 },
  { rotation: -2, desktop: { top: "57%", left: "45%" }, width: "223px", delay: 0.72 },
  { rotation: 1.8, desktop: { top: "55%", left: "66%" }, width: "224px", delay: 0.78 },
  { rotation: -2.2, desktop: { top: "58%", left: "86%" }, width: "222px", delay: 0.84 },
  { rotation: 1.9, desktop: { top: "82%", left: "2%" }, width: "224px", delay: 0.9 },
  { rotation: -1.7, desktop: { top: "80%", left: "22%" }, width: "226px", delay: 0.96 },
  { rotation: 2.3, desktop: { top: "83%", left: "43%" }, width: "220px", delay: 1.02 },
  { rotation: -2.1, desktop: { top: "81%", left: "64%" }, width: "223px", delay: 1.08 },
  { rotation: 1.6, desktop: { top: "84%", left: "84%" }, width: "225px", delay: 1.14 },
] as const

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

const naturalCompare = (a: string, b: string) =>
  a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" })

const sanitisePublicUrl = (url: string) =>
  url.startsWith("/public/") ? url.replace("/public", "") : url

const toTitle = (fileName: string) =>
  fileName
    .replace(/[-_]/g, " ")
    .replace(/\s+/g, " ")
    .replace(/\.[^/.]+$/, "")
    .trim()

const toUniqueArray = <T,>(items: T[]) => Array.from(new Set(items))

const shuffleArray = <T,>(array: T[]) => {
  const result = [...array]
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }
  return result
}

const TestimonialsGallery = () => {
  const carouselRef = useRef<HTMLDivElement>(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  const testimonialImages = useMemo(() => {
    const entries = Object.entries(testimonialAssetModules) as [string, string][]

    return entries
      .sort(([a], [b]) => naturalCompare(a, b))
      .map(([, url]) => sanitisePublicUrl(url))
  }, [])

  const uniqueImages = useMemo(() => {
    const source = testimonialImages.length ? testimonialImages : Array.from(fallbackImages)
    return toUniqueArray(source)
  }, [testimonialImages])

  const shuffledImages = useMemo(() => {
    if (!uniqueImages.length) {
      return []
    }
    return shuffleArray(uniqueImages)
  }, [uniqueImages])

  useEffect(() => {
    setCurrentIndex(0)
  }, [shuffledImages])

  const spreadItems = useMemo(() => {
    if (!uniqueImages.length) {
      return []
    }

    const slots = layoutSlots.slice(
      0,
      Math.min(layoutSlots.length, uniqueImages.length)
    )

    return slots.map((slot, index) => {
      const image = uniqueImages[index]
      const fileName = image.split("/").pop() ?? `testimonial-${index + 1}`

      return {
        ...slot,
        image,
        alt: `Mentorque WhatsApp testimonial ${toTitle(fileName)}`,
      }
    })
  }, [uniqueImages])

  const allImages = useMemo(() => shuffledImages, [shuffledImages])

  const mobileItems = useMemo(() => {
    if (!allImages.length) return []

    const desiredCount = Math.max(5, Math.min(10, layoutSlots.length))
    const combined = allImages.length >= desiredCount ? allImages : toUniqueArray([...allImages, ...fallbackImages])
    const images = combined.slice(0, desiredCount)

    return images.map((image, index) => ({
      image,
      title: toTitle(image.split("/").pop() ?? `testimonial-${index + 1}`),
      scale: 1,
    }))
  }, [allImages])

  useEffect(() => {
    if (!mobileItems.length) {
      setCurrentIndex(0)
      return
    }
    if (currentIndex >= mobileItems.length) {
      setCurrentIndex(0)
    }
  }, [mobileItems, currentIndex])

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
    <section className="relative bg-black text-white overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-950/8 via-black to-black" />
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px 128px",
        }}
      />

      <div className="relative z-10 px-6 py-14 md:py-24 text-center">
        <h1 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl text-white mb-3 md:mb-8 leading-tight">
          Peek inside their <span className="text-blue-400">chats & offers</span>
          <br />
        </h1>
        <p className="text-base sm:text-xl md:text-xl lg:text-2xl text-white/70 max-w-4xl mx-auto">
          Real WhatsApp threads and Wins.
        </p>
      </div>

      <div className="relative w-full px-4 md:px-8 lg:px-12 pb-12 sm:pb-20 mb-8">
        <div className="relative px-2 sm:px-4 md:px-8 md:hidden">
          <div className="relative overflow-hidden">
            <div
              ref={carouselRef}
              className="flex transition-transform duration-300 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              {mobileItems.map((item, index) => (
                <div key={index} className="min-w-full flex items-center justify-center py-4 sm:py-6">
                  <div
                    className="relative inline-block rounded"
                    style={{
                      transform: `scale(${item.scale})`,
                    }}
                  >
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      className="block h-[250px] sm:h-[300px] max-w-[200px] sm:max-w-[280px] object-contain rounded"
                      loading="lazy"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center gap-6 mt-4 mb-2">
            <button
              onClick={prevSlide}
              className="p-2.5 rounded-full bg-black/80"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-8 h-8 text-white" />
            </button>
            <button
              onClick={nextSlide}
              className="p-2.5 rounded-full bg-black/80"
              aria-label="Next image"
            >
              <ChevronRight className="w-8 h-8 text-white" />
            </button>
          </div>

          <div className="flex justify-center gap-2 mt-4">
            {mobileItems.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex ? "bg-white" : "bg-white/30"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        <div
          className="relative w-full hidden md:block"
          style={{
            minHeight: "120vh",
          }}
        >
          {spreadItems.map((item, index) => (
            <div
              key={item.image + index}
              className="absolute testimonial-item cursor-pointer group"
              style={{
                top: item.desktop.top,
                left: item.desktop.left,
                width: item.width,
                opacity: 0,
                animation: `fadeInUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${item.delay}s forwards`,
                zIndex: 1,
                willChange: "transform, opacity",
              }}
            >
              <div
                className="relative bg-zinc-900/70 backdrop-blur-md rounded-2xl overflow-hidden border border-zinc-800/50 transition-all duration-500 ease-out shadow-[0_8px_30px_-8px_rgba(0,0,0,0.6)]"
                style={{
                  transform: `rotate(${item.rotation}deg)`,
                  transformOrigin: "center center",
                  willChange: "transform, border-color, box-shadow",
                }}
              >
                <img
                  src={item.image}
                  alt={item.alt}
                  className="w-full h-auto block transition-all duration-500"
                  loading="lazy"
                  style={{
                    imageRendering: "auto",
                    WebkitFontSmoothing: "antialiased" as any,
                  }}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="relative z-10 text-center pb-8 sm:pb-20 lg:pb-24 px-6">
        <Link to="/book-call">
          <button className="group inline-flex items-center gap-3 bg-gradient-to-b from-white to-gray-100 hover:from-gray-50 hover:to-white text-black font-semibold px-8 sm:px-10 py-3.5 sm:py-4 rounded-2xl transition-all duration-200 shadow-[0_6px_22px_rgba(255,255,255,0.12)] hover:shadow-[0_10px_30px_rgba(255,255,255,0.2)] hover:-translate-y-0.5 border border-white/15">
            <Calendar className="w-5 h-5" />
            <span className="text-base sm:text-lg">Book Now</span>
            <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </button>
        </Link>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px) rotate(var(--item-rotation, 0deg));
          }
          to {
            opacity: 1;
            transform: translateY(0) rotate(var(--item-rotation, 0deg));
          }
        }

        .testimonial-item {
          transition: z-index 0s 0s;
        }

        .testimonial-item:hover {
          z-index: 200 !important;
          transition: z-index 0s 0s;
        }

        .testimonial-item:hover > div {
          transform: rotate(0deg) scale(1.25) !important;
          border-color: rgba(161, 161, 170, 0.6) !important;
          box-shadow: 0 25px 80px -15px rgba(0, 0, 0, 0.8),
                      0 0 0 1px rgba(255, 255, 255, 0.05) !important;
        }

        @media (max-width: 767px) {
          .testimonial-item:hover > div {
            transform: rotate(0deg) scale(1.35) !important;
          }
        }

        .testimonial-item > div {
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          transform-style: preserve-3d;
          -webkit-transform-style: preserve-3d;
        }

        ${layoutSlots
          .map(
            (slot, index) => `
          .testimonial-item:nth-child(${index + 1}) {
            --item-rotation: ${slot.rotation}deg;
          }
        `,
          )
          .join("")}
      `}</style>
    </section>
  )
}

export default TestimonialsGallery