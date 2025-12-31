import { useEffect, useMemo, useState } from "react"
import { ArrowUpRight, Calendar } from "lucide-react"
import { Link } from "react-router-dom"
import MobileTestimonialsGallery from "@/components/MobileTestimonialsGallery"

const testimonialAssetModules = import.meta.glob<
  true,
  string,
  string
>("/public/Whatsapp_testimonial_screenshots/*.{png,jpg,jpeg,webp}", {
  query: '?url',
  import: 'default',
  eager: true,
})

const layoutSlots = [
  { rotation: -2, desktop: { top: "4%", left: "10%" }, width: "221px", delay: 0 },
  { rotation: 1.5, desktop: { top: "6%", left: "26%" }, width: "225px", delay: 0.06 },
  { rotation: -1.8, desktop: { top: "3%", left: "43%" }, width: "219px", delay: 0.12 },
  { rotation: 2.2, desktop: { top: "5%", left: "60%" }, width: "223px", delay: 0.18 },
  { rotation: -1.5, desktop: { top: "7%", left: "76%" }, width: "226px", delay: 0.24 },
  { rotation: 2, desktop: { top: "36.5%", left: "11%" }, width: "224px", delay: 0.3 },
  { rotation: -2.3, desktop: { top: "34.5%", left: "27%" }, width: "220px", delay: 0.36 },
  { rotation: 1.7, desktop: { top: "37.5%", left: "44%" }, width: "224px", delay: 0.42 },
  { rotation: -1.9, desktop: { top: "35.5%", left: "61%" }, width: "222px", delay: 0.48 },
  { rotation: 2.1, desktop: { top: "38.5%", left: "77%" }, width: "227px", delay: 0.54 },
  { rotation: -1.6, desktop: { top: "69%", left: "12%" }, width: "221px", delay: 0.6 },
  { rotation: 2.4, desktop: { top: "67%", left: "28%" }, width: "225px", delay: 0.66 },
  { rotation: -2, desktop: { top: "70%", left: "45%" }, width: "223px", delay: 0.72 },
  { rotation: 1.8, desktop: { top: "68%", left: "62%" }, width: "224px", delay: 0.78 },
  { rotation: -2.2, desktop: { top: "71%", left: "78%" }, width: "222px", delay: 0.84 },
  { rotation: 1.9, desktop: { top: "101.5%", left: "10%" }, width: "224px", delay: 0.9 },
  { rotation: -1.7, desktop: { top: "99.5%", left: "26%" }, width: "226px", delay: 0.96 },
  { rotation: 2.3, desktop: { top: "102.5%", left: "43%" }, width: "220px", delay: 1.02 },
  { rotation: -2.1, desktop: { top: "100.5%", left: "60%" }, width: "223px", delay: 1.08 },
  { rotation: 1.6, desktop: { top: "103.5%", left: "76%" }, width: "225px", delay: 1.14 },
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

const TestimonialsGallery = () => {
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

  const spreadItems = useMemo(() => {
    if (!uniqueImages.length) {
      return []
    }

    const slots = layoutSlots.slice(0, Math.min(layoutSlots.length, uniqueImages.length))

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

  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <section className="relative text-white overflow-hidden bg-gradient-to-br from-[#0b1120]/90 via-[#05070d]/95 to-[#020204]">
      <div className="absolute inset-0 bg-gradient-to-b from-[#020204] via-[#05070d]/60 to-[#020204]" />
      <div className="absolute inset-x-0 top-0 h-40 sm:h-48 pointer-events-none bg-gradient-to-b from-[#020204] via-[#05070d]/80 to-transparent" />
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px 128px",
        }}
      />

      <div className="relative z-10 px-6 pt-14 pb-8 md:pt-20 md:pb-12 text-center">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white mb-3 md:mb-5 leading-tight font-bold">
          Peek inside their <span className="text-blue-400">chats & offers</span>
        </h1>
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/70 max-w-4xl mx-auto">
          Real WhatsApp threads and Wins.
        </p>
      </div>

      <div className="relative w-full px-4 md:px-8 lg:px-12 pb-8 md:pb-12">
        {isMobile ? (
          <MobileTestimonialsGallery />
        ) : (
          <div
            className="relative w-full"
            style={{
              minHeight: "130vh",
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
        )}
      </div>

      <div className="relative z-10 text-center pb-12 sm:pb-16 lg:pb-20 px-6">
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