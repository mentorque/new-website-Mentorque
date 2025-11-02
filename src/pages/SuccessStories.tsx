import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { ArrowLeft, Calendar, ArrowUpRight } from "lucide-react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

export default function SuccessStories() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Group testimonials into 3 rows
  const allTestimonials = [
    "/hi.PNG",
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
  ]

  const row1 = allTestimonials.slice(0, Math.ceil(allTestimonials.length / 3))
  const row2 = allTestimonials.slice(row1.length, row1.length * 2)
  const row3 = allTestimonials.slice(row1.length * 2)

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      
      {/* Header */}
      <div className="pt-20 sm:pt-24 pb-8 px-4 text-center">
        <Link 
          to="/#Clients"
          className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-6 transition-colors text-sm sm:text-base"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>
        
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3">
          Success Stories
        </h1>
        <p className="text-gray-400 text-sm sm:text-base">
          People are landing interviews fast
        </p>
      </div>

      {/* Mobile Carousel - 3 Rows */}
      <div className="pb-16 px-2 sm:px-4 space-y-6">
        {/* Row 1 */}
        <div className="overflow-hidden">
          <div className="flex gap-3 sm:gap-4 animate-scroll-row1">
            {[...row1, ...row1].map((img, i) => (
              <div key={`row1-${i}`} className="flex-shrink-0 w-[90vw] sm:w-[45vw] max-w-[400px]">
                <div className="relative rounded-xl overflow-hidden bg-zinc-900/70 backdrop-blur-md border border-zinc-800/50 shadow-lg aspect-[3/4]">
                  <img
                    src={img}
                    alt={`Success story ${i + 1}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2 - Reverse direction */}
        <div className="overflow-hidden">
          <div className="flex gap-3 sm:gap-4 animate-scroll-row2">
            {[...row2, ...row2].map((img, i) => (
              <div key={`row2-${i}`} className="flex-shrink-0 w-[90vw] sm:w-[45vw] max-w-[400px]">
                <div className="relative rounded-xl overflow-hidden bg-zinc-900/70 backdrop-blur-md border border-zinc-800/50 shadow-lg aspect-[3/4]">
                  <img
                    src={img}
                    alt={`Success story ${i + row1.length + 1}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Row 3 */}
        <div className="overflow-hidden">
          <div className="flex gap-3 sm:gap-4 animate-scroll-row3">
            {[...row3, ...row3].map((img, i) => (
              <div key={`row3-${i}`} className="flex-shrink-0 w-[90vw] sm:w-[45vw] max-w-[400px]">
                <div className="relative rounded-xl overflow-hidden bg-zinc-900/70 backdrop-blur-md border border-zinc-800/50 shadow-lg aspect-[3/4]">
                  <img
                    src={img}
                    alt={`Success story ${i + row1.length + row2.length + 1}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center pb-16 px-4">
        <Link to="/book-call">
          <button className="group inline-flex items-center gap-3 bg-gradient-to-b from-white to-gray-100 hover:from-gray-50 hover:to-white text-black font-semibold px-8 sm:px-10 py-4 sm:py-5 rounded-xl sm:rounded-2xl transition-all duration-400 shadow-[0_8px_30px_rgba(255,255,255,0.15)] hover:shadow-[0_12px_40px_rgba(255,255,255,0.25)] hover:-translate-y-1 border border-white/20">
            <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="text-base sm:text-lg">Book Now</span>
            <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-400 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </button>
        </Link>
      </div>

      <Footer />

      <style>{`
        @keyframes scroll-row1 {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-50% - 0.75rem));
          }
        }

        @keyframes scroll-row2 {
          0% {
            transform: translateX(calc(-50% - 0.75rem));
          }
          100% {
            transform: translateX(0);
          }
        }

        @keyframes scroll-row3 {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-50% - 0.75rem));
          }
        }

        .animate-scroll-row1 {
          animation: scroll-row1 40s linear infinite;
          width: fit-content;
        }

        .animate-scroll-row2 {
          animation: scroll-row2 45s linear infinite;
          width: fit-content;
        }

        .animate-scroll-row3 {
          animation: scroll-row3 50s linear infinite;
          width: fit-content;
        }

        .animate-scroll-row1:hover,
        .animate-scroll-row2:hover,
        .animate-scroll-row3:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  )
}

