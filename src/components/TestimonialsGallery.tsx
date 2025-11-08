import { useEffect, useState } from "react"
import { ArrowUpRight, Calendar } from "lucide-react"
import { Link } from "react-router-dom"
import { testimonialsData } from "@/data/testimonials"

const TestimonialsGallery = () => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

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
        <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl  leading-tight mb-6">
          People are Landing Interviews {" "}
          <span className="text-blue-500">Fast.</span>
        </h2>
        <p className="text-base sm:text-xl md:text-2xl lg:text-3xl text-white/70 max-w-4xl mx-auto">
          Real offers, real WhatsApp threads, real wins on camera.
        </p>
      </div>

      <div className="relative w-full px-4 md:px-8 lg:px-12 pb-12 sm:pb-20">
        {isMobile ? (
          <div className="flex gap-4 overflow-x-auto pb-8 snap-x snap-mandatory px-4">
            {testimonialsData.map((item) => (
              <div
                key={item.id}
                className="flex-none snap-center w-[78%] min-w-[240px] max-w-[320px]"
              >
                <div className="relative mx-auto flex items-center justify-center bg-zinc-900/70 backdrop-blur-md rounded-2xl overflow-hidden border border-zinc-800/60 shadow-[0_8px_24px_-10px_rgba(0,0,0,0.65)] px-4 py-6 min-h-[220px]">
                  <img
                    src={item.image}
                    alt={`Success story ${item.id}`}
                    className="max-w-full max-h-[260px] h-auto w-auto object-contain"
                    style={{ imageRendering: "auto", WebkitFontSmoothing: "antialiased" as any }}
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <div className="text-white text-xs font-medium text-center bg-zinc-900/80 backdrop-blur py-2 px-3 rounded-xl border border-zinc-700/50">
                      Success Story
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div
            className="relative w-full"
            style={{
              minHeight: "120vh",
            }}
          >
            {testimonialsData.map((item) => {
              const position = item.desktop

              return (
                <div
                  key={item.id}
                  className="absolute testimonial-item cursor-pointer group"
                  style={{
                    top: position.top,
                    left: position.left,
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
                      alt={`Success story ${item.id}`}
                      className="w-full h-auto block transition-all duration-500"
                      style={{
                        imageRendering: "auto",
                        WebkitFontSmoothing: "antialiased" as any,
                      }}
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
                      <div className="text-white text-sm font-medium text-center bg-zinc-900/90 backdrop-blur-sm py-2.5 px-4 rounded-xl border border-zinc-700/50 shadow-lg">
                        Success Story
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      <div className="relative z-10 text-center pb-4 sm:pb-12 lg:pb-16 px-6">
        <Link to="/book-call">
          <button className="group inline-flex items-center gap-3 bg-gradient-to-b from-white to-gray-100 hover:from-gray-50 hover:to-white text-black font-semibold px-8 sm:px-10 py-4 sm:py-5 rounded-2xl transition-all duration-300 shadow-[0_8px_30px_rgba(255,255,255,0.15)] hover:shadow-[0_12px_40px_rgba(255,255,255,0.25)] hover:-translate-y-1 border border-white/20">
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

        ${testimonialsData
          .map(
            (item, index) => `
          .testimonial-item:nth-child(${index + 1}) {
            --item-rotation: ${item.rotation}deg;
          }
        `,
          )
          .join("")}
      `}</style>
    </section>
  )
}

export default TestimonialsGallery

