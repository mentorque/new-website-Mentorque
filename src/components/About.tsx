"use client"
import { Calendar } from "lucide-react"
import { useState, useEffect, useRef } from "react"

const StatCard = ({ stat, description, delay, colSpan = "span-1", visible, showHoverEffect }) => {
  return (
    <div
      className={`relative group backdrop-blur-xl bg-white/[0.02] border border-white/10 rounded-2xl sm:rounded-3xl p-4 sm:p-5 md:p-6 transition-all duration-700 ease-out transform ${
        visible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-12 scale-95"
      } ${
        showHoverEffect 
          ? "bg-white/[0.05] border-white/20 shadow-2xl shadow-blue-400/10 before:opacity-100" 
          : "hover:bg-white/[0.05] hover:border-white/20 hover:shadow-2xl hover:shadow-blue-400/10 before:opacity-0 hover:before:opacity-100"
      } before:absolute before:inset-0 before:rounded-2xl sm:before:rounded-3xl before:bg-gradient-to-br before:from-white/[0.08] before:via-transparent before:to-transparent before:transition-opacity before:duration-500 ${colSpan}`}
      style={{ transitionDelay: `${delay}ms` }}
      aria-hidden={!visible}
    >
      <div className="relative z-10 flex flex-col justify-center h-full min-h-[120px] sm:min-h-[140px] md:min-h-[150px]">
        <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-2 sm:mb-3 md:mb-4 bg-gradient-to-br from-blue-200 via-blue-100 to-white bg-clip-text text-transparent drop-shadow-sm leading-tight">
          {stat}
        </h3>

        <p className="text-gray-100 text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed">
          {description}
        </p>
      </div>

      <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-400/[0.03] via-transparent to-purple-600/[0.02] transition-opacity duration-500 ${
        showHoverEffect ? "opacity-100" : "opacity-0 group-hover:opacity-100"
      }`}></div>
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-60"></div>
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-blue-400/[0.05] to-transparent rounded-full blur-2xl"></div>
    </div>
  )
}

const About = () => {
  const stats = [
    { stat: "12 Days", description: "median time to first interview", delay: 120, colSpan: "col-span-1 md:col-span-4" },
    { stat: "1.6 - 1.8×", description: "increase over previous salary on accepted offers", delay: 240, colSpan: "col-span-1 md:col-span-4" },
    { stat: "2 in 3", description: "two interviews in 30 days", delay: 360, colSpan: "col-span-1 md:col-span-4" },
    { stat: "3.1×", description: "more callbacks from the same number of applications", delay: 480, colSpan: "col-span-1 md:col-span-5" },
    { stat: "78%", description: "reach at least one final round within 8 weeks", delay: 600, colSpan: "col-span-1 md:col-span-4" },
    { stat: "92%", description: "report visible momentum within the first 14 days", delay: 720, colSpan: "col-span-1 md:col-span-3" }
  ]

  const sectionRef = useRef(null)
  const [visible, setVisible] = useState(false)
  const [hoverStates, setHoverStates] = useState(stats.map(() => false))

  useEffect(() => {
    if (typeof window === "undefined") return
    const node = sectionRef.current
    if (!node) return

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true)
            
            stats.forEach((stat, index) => {
              setTimeout(() => {
                setHoverStates(prev => {
                  const newStates = [...prev]
                  newStates[index] = true
                  return newStates
                })
                setTimeout(() => {
                  setHoverStates(prev => {
                    const newStates = [...prev]
                    newStates[index] = false
                    return newStates
                  })
                }, 3000)
              }, stat.delay + 500)
            })
            obs.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.2 }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="bg-black relative" id="about" ref={sectionRef}>
      <div className="pt-12 sm:pt-14 md:pt-16 pb-12 sm:pb-14 md:pb-16 px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <p className="text-sm sm:text-base md:text-lg lg:text-xl m-2 sm:m-3 text-gray-400  tracking-wider">WELCOME TO</p>

          <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl text-white leading-tight mb-4 sm:mb-6 md:mb-8 px-2">
            Turning Point of Your <span className="text-blue-400 drop-shadow-lg">Job Hunt</span>
          </h1>


        </div>

        {/* Stats Section */}
        <div className="w-full max-w-7xl mx-auto mb-12 md:mb-16">
          {/* Mobile - auto-scrolling horizontal scroll */}
          <div className="block md:hidden overflow-hidden pb-2 -mx-4 px-4 relative">
            <div className="flex gap-3 sm:gap-4 animate-scroll-stats">
              {stats.map((s, i) => (
                <div key={i} className="flex-shrink-0" style={{ width: '85vw' }}>
                  <StatCard 
                    {...s} 
                    visible={visible} 
                    showHoverEffect={hoverStates[i]}
                  />
                </div>
              ))}
              {/* Duplicate for seamless loop */}
              {stats.map((s, i) => (
                <div key={`duplicate-${i}`} className="flex-shrink-0" style={{ width: '85vw' }}>
                  <StatCard 
                    {...s} 
                    visible={visible} 
                    showHoverEffect={hoverStates[i]}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Desktop Grid */}
          <div className="hidden md:grid grid-cols-12 gap-4 md:gap-6">
            {stats.map((s, i) => (
              <StatCard 
                key={i} 
                {...s} 
                visible={visible} 
                showHoverEffect={hoverStates[i]}
              />
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center px-4 sm:px-6 pb-8 sm:pb-10 md:pb-12">
          <div
            className={`flex flex-col items-center justify-center gap-3 sm:gap-4 mt-8 sm:mt-10 transition-all duration-700 transform ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: visible ? "800ms" : "0ms" }}
          >
             <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl text-white leading-tight mb-4 sm:mb-6 md:mb-8 px-2">
            Betting on <span className="text-blue-400 drop-shadow-lg"> Yourself ?</span>
          </h1>
            <a
              href="/book-call"
              className="flex items-center justify-center group text-center bg-white text-gray-900 hover:bg-gray-100 py-3 sm:py-3.5 md:py-4 px-7 sm:px-8 md:px-9 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] text-sm sm:text-base md:text-lg"
            >
              <Calendar className="mr-2 sm:mr-3 w-4 h-4 sm:w-5 sm:h-5" />
              Place the Bet.
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes scroll-stats {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-50%));
          }
        }
        
        .animate-scroll-stats {
          animation: scroll-stats 30s linear infinite;
          display: flex;
          will-change: transform;
          width: max-content;
        }
        
        .animate-scroll-stats:hover {
          animation-play-state: paused;
        }
        
        @media (min-width: 640px) {
          .animate-scroll-stats > div {
            width: 75vw !important;
          }
        }
        
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  )
}

export default About
