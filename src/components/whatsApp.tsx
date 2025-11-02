import { useState, useEffect } from "react"
import { ArrowUpRight, Calendar } from "lucide-react"
import { Link } from "react-router-dom"

export default function TestimonialGallery() {
  const [showGallery, setShowGallery] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const testimonials = [
    // Row 1 - Natural scattered look
    {
      id: 1,
      image: "/hi.PNG",
      rotation: -2,
      desktop: { top: "4%", left: "2%" },
      mobile: { top: "2%", left: "2%" },
      width: "260px",
      mobileWidth: "46%",
      delay: 0
    },
    {
      id: 2,
      image: "/screen/imp1.jpg",
      rotation: 1.5,
      desktop: { top: "6%", left: "22%" },
      mobile: { top: "2%", left: "52%" },
      width: "265px",
      mobileWidth: "46%",
      delay: 0.06
    },
    {
      id: 3,
      image: "/screen/15.png",
      rotation: -1.8,
      desktop: { top: "3%", left: "43%" },
      mobile: { top: "28%", left: "2%" },
      width: "258px",
      mobileWidth: "46%",
      delay: 0.12
    },
    {
      id: 4,
      image: "/screen/16.png",
      rotation: 2.2,
      desktop: { top: "5%", left: "64%" },
      mobile: { top: "28%", left: "52%" },
      width: "262px",
      mobileWidth: "46%",
      delay: 0.18
    },
    {
      id: 5,
      image: "/screen/17.png",
      rotation: -1.5,
      desktop: { top: "7%", left: "84%" },
      mobile: { top: "54%", left: "2%" },
      width: "266px",
      mobileWidth: "46%",
      delay: 0.24
    },
    
    // Row 2
    {
      id: 6,
      image: "/screen/18.jpeg",
      rotation: 2,
      desktop: { top: "30%", left: "3%" },
      mobile: { top: "54%", left: "52%" },
      width: "263px",
      mobileWidth: "46%",
      delay: 0.3
    },
    {
      id: 7,
      image: "/screen/19.jpeg",
      rotation: -2.3,
      desktop: { top: "28%", left: "23%" },
      mobile: { top: "80%", left: "2%" },
      width: "259px",
      mobileWidth: "46%",
      delay: 0.36
    },
    {
      id: 8,
      image: "/screen/20.jpeg",
      rotation: 1.7,
      desktop: { top: "31%", left: "44%" },
      mobile: { top: "80%", left: "52%" },
      width: "264px",
      mobileWidth: "46%",
      delay: 0.42
    },
    {
      id: 9,
      image: "/screen/6.jpg",
      rotation: -1.9,
      desktop: { top: "29%", left: "65%" },
      mobile: { top: "106%", left: "2%" },
      width: "261px",
      mobileWidth: "46%",
      delay: 0.48
    },
    {
      id: 10,
      image: "/screen/7.jpg",
      rotation: 2.1,
      desktop: { top: "32%", left: "85%" },
      mobile: { top: "106%", left: "52%" },
      width: "267px",
      mobileWidth: "46%",
      delay: 0.54
    },
    
    // Row 3
    {
      id: 11,
      image: "/screen/10.jpg",
      rotation: -1.6,
      desktop: { top: "56%", left: "4%" },
      mobile: { top: "132%", left: "2%" },
      width: "260px",
      mobileWidth: "46%",
      delay: 0.6
    },
    {
      id: 12,
      image: "/screen/12.png",
      rotation: 2.4,
      desktop: { top: "54%", left: "24%" },
      mobile: { top: "132%", left: "52%" },
      width: "265px",
      mobileWidth: "46%",
      delay: 0.66
    },
    {
      id: 13,
      image: "/screen/14.png",
      rotation: -2,
      desktop: { top: "57%", left: "45%" },
      mobile: { top: "158%", left: "2%" },
      width: "262px",
      mobileWidth: "46%",
      delay: 0.72
    },
    {
      id: 14,
      image: "/screen/16.png",
      rotation: 1.8,
      desktop: { top: "55%", left: "66%" },
      mobile: { top: "158%", left: "52%" },
      width: "263px",
      mobileWidth: "46%",
      delay: 0.78
    },
    {
      id: 15,
      image: "/screen/17.png",
      rotation: -2.2,
      desktop: { top: "58%", left: "86%" },
      mobile: { top: "184%", left: "2%" },
      width: "261px",
      mobileWidth: "46%",
      delay: 0.84
    },
    
    // Row 4
    {
      id: 16,
      image: "/screen/18.jpeg",
      rotation: 1.9,
      desktop: { top: "82%", left: "2%" },
      mobile: { top: "184%", left: "52%" },
      width: "264px",
      mobileWidth: "46%",
      delay: 0.9
    },
    {
      id: 17,
      image: "/screen/19.jpeg",
      rotation: -1.7,
      desktop: { top: "80%", left: "22%" },
      mobile: { top: "210%", left: "2%" },
      width: "266px",
      mobileWidth: "46%",
      delay: 0.96
    },
    {
      id: 18,
      image: "/screen/20.jpeg",
      rotation: 2.3,
      desktop: { top: "83%", left: "43%" },
      mobile: { top: "210%", left: "52%" },
      width: "259px",
      mobileWidth: "46%",
      delay: 1.02
    },
    {
      id: 19,
      image: "/screen/6.jpg",
      rotation: -2.1,
      desktop: { top: "81%", left: "64%" },
      mobile: { top: "236%", left: "2%" },
      width: "262px",
      mobileWidth: "46%",
      delay: 1.08
    },
    {
      id: 20,
      image: "/screen/7.jpg",
      rotation: 1.6,
      desktop: { top: "84%", left: "84%" },
      mobile: { top: "236%", left: "52%" },
      width: "265px",
      mobileWidth: "46%",
      delay: 1.14
    }
  ]

  const previewCards = [
    { 
      image: "/screen/imp1.jpg", 
      rotation: -14,
      translateX: -140,
      translateY: -18,
      scale: 0.88,
      zIndex: 3
    },
    { 
      image: "/screen/15.png", 
      rotation: -7,
      translateX: -72,
      translateY: -8,
      scale: 0.92,
      zIndex: 4
    },
    { 
      image: "/screen/16.png", 
      rotation: 0,
      translateX: 0,
      translateY: 0,
      scale: 0.96,
      zIndex: 5
    },
    { 
      image: "/screen/17.png", 
      rotation: 7,
      translateX: 72,
      translateY: -8,
      scale: 0.92,
      zIndex: 4
    },
    { 
      image: "/screen/18.jpeg", 
      rotation: 14,
      translateX: 140,
      translateY: -18,
      scale: 0.88,
      zIndex: 3
    }
  ]

  return (
    <div className="bg-black min-h-screen relative overflow-hidden">
      {/* Refined background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-950/8 via-black to-black"></div>
      
      {/* Subtle noise texture overlay */}
      <div className="absolute inset-0 opacity-[0.015]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
        backgroundRepeat: 'repeat',
        backgroundSize: '128px 128px'
      }}></div>

      {/* Header Section */}
      <div className="text-center py-16 md:py-28 px-6 relative z-10">
        <h1 className="text-4xl md:text-6xl lg:text-7xl text-white mb-7 leading-[1.1] font-bold tracking-tight">
          People are Landing Interviews{" "}
          <span className="text-blue-500 inline-block">Fast.</span>
        </h1>
        <p className="text-xl md:text-2xl lg:text-3xl text-white/60 mb-24 font-light max-w-4xl mx-auto leading-relaxed">
          Moments in time that made a difference.
        </p>

        {!showGallery && (
          <div className="flex flex-col items-center">
            {/* Preview Cards - 60% visible from top */}
            <div 
              className="relative mb-0 preview-cards-container" 
              style={{ 
                height: '180px', 
                width: '100%', 
                maxWidth: '850px', 
                overflow: 'visible',
                perspective: '1200px'
              }}
            >
              {previewCards.map((card, index) => (
                <div
                  key={index}
                  className="absolute bottom-0 left-1/2 preview-card group"
                  style={{
                    transform: `translateX(calc(-50% + ${card.translateX}px)) translateY(40%) rotate(${card.rotation}deg) scale(${card.scale})`,
                    zIndex: card.zIndex,
                    width: '210px',
                    height: '300px',
                    transformStyle: 'preserve-3d',
                    willChange: 'transform, z-index',
                    transition: 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), z-index 0.3s ease-out'
                  } as React.CSSProperties}
                >
                  <div 
                    className="relative w-full h-full bg-zinc-900/95 backdrop-blur-lg rounded-2xl overflow-hidden shadow-[0_25px_70px_-20px_rgba(0,0,0,0.9)] border border-zinc-700/70 transition-all duration-700 group-hover:border-zinc-500 group-hover:shadow-[0_30px_80px_-15px_rgba(0,0,0,1)]"
                    style={{
                      animation: `previewFloat 4s ease-in-out ${index * 0.4}s infinite, previewPop 5s ease-in-out ${index * 0.5}s infinite`
                    }}
                  >
                    <img
                      src={card.image}
                      alt=""
                      className="w-full h-full object-cover object-top"
                      style={{ 
                        imageRendering: 'auto' as const,
                        WebkitFontSmoothing: 'antialiased' as any
                      }}
                    />
                    {/* Refined overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/40 transition-opacity duration-700 group-hover:opacity-80"></div>
                    
                    {/* Subtle shimmer effect */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 preview-shimmer"></div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            {isMobile ? (
              <Link
                to="/success-stories"
                className="group relative inline-flex items-center gap-3 bg-gradient-to-b from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-semibold px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 rounded-xl sm:rounded-2xl transition-all duration-400 shadow-[0_8px_30px_rgba(37,99,235,0.35)] hover:shadow-[0_12px_40px_rgba(37,99,235,0.45)] hover:-translate-y-1 z-10 border border-blue-500/20 text-sm sm:text-base md:text-lg"
              >
                <span>View Success Stories</span>
                <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-400 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Link>
            ) : (
              <button
                onClick={() => setShowGallery(true)}
                className="group relative inline-flex items-center gap-3 bg-gradient-to-b from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-semibold px-10 py-5 rounded-2xl transition-all duration-400 shadow-[0_8px_30px_rgba(37,99,235,0.35)] hover:shadow-[0_12px_40px_rgba(37,99,235,0.45)] hover:-translate-y-1 z-10 border border-blue-500/20"
              >
                <span className="text-lg">View Success Stories</span>
                <ArrowUpRight className="w-5 h-5 transition-transform duration-400 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </button>
            )}
          </div>
        )}
      </div>

      {/* Gallery Section */}
      {showGallery && (
        <div className="relative pb-12 md:pb-16">
          {/* Section Title */}

          {/* Testimonial Gallery - Scattered natural layout */}
          <div 
            className="relative w-full px-4 md:px-8 lg:px-12 -mt-8 md:-mt-12" 
            style={{ 
              minHeight: isMobile ? '280vh' : '140vh',
              paddingBottom: '60px'
            }}
          >
            {testimonials.map((item) => {
              const pos = isMobile ? item.mobile : item.desktop
              
              return (
                <div
                  key={item.id}
                  className="absolute testimonial-item cursor-pointer group"
                  style={{
                    top: pos.top,
                    left: pos.left,
                    width: isMobile ? item.mobileWidth : item.width,
                    opacity: 0,
                    animation: `fadeInUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${item.delay}s forwards`,
                    zIndex: 1,
                    willChange: 'transform, opacity'
                  }}
                >
                  <div 
                    className="relative bg-zinc-900/70 backdrop-blur-md rounded-2xl overflow-hidden border border-zinc-800/50 transition-all duration-500 ease-out shadow-[0_8px_30px_-8px_rgba(0,0,0,0.6)]"
                    style={{
                      transform: `rotate(${item.rotation}deg)`,
                      transformOrigin: 'center center',
                      willChange: 'transform, border-color, box-shadow'
                    }}
                  >
                    <img
                      src={item.image}
                      alt={`Success story ${item.id}`}
                      className="w-full h-auto block transition-all duration-500"
                      style={{ 
                        imageRendering: 'auto' as const,
                        WebkitFontSmoothing: 'antialiased' as any
                      }}
                    />
                    
                    {/* Refined hover overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    {/* Hover info badge */}
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

          {/* Bottom CTA - Book Now Button */}
          <div className="text-center pt-32 md:pt-40 pb-6 relative z-10 px-6">
            <Link to="/book-call">
              <button className="group inline-flex items-center gap-3 bg-gradient-to-b from-white to-gray-100 hover:from-gray-50 hover:to-white text-black font-semibold px-10 py-5 rounded-2xl transition-all duration-400 shadow-[0_8px_30px_rgba(255,255,255,0.15)] hover:shadow-[0_12px_40px_rgba(255,255,255,0.25)] hover:-translate-y-1 border border-white/20">
                <Calendar className="w-5 h-5" />
                <span className="text-lg">Book Now</span>
                <ArrowUpRight className="w-5 h-5 transition-transform duration-400 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </button>
            </Link>
          </div>
        </div>
      )}

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

        @keyframes previewFloat {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }

        @keyframes previewPop {
          0%, 100% {
            transform: scale(1);
          }
          25% {
            transform: scale(1.03);
          }
          75% {
            transform: scale(0.97);
          }
        }

        @keyframes previewShimmer {
          0% {
            transform: translateX(-100%) translateY(-100%) rotate(45deg);
          }
          100% {
            transform: translateX(100%) translateY(100%) rotate(45deg);
          }
        }

        .preview-shimmer {
          animation: previewShimmer 3s ease-in-out infinite;
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

        /* Preview card hover - bring to front with smooth physics like real cards */
        .preview-card {
          transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1), z-index 0s 0.2s;
          transform-style: preserve-3d;
        }

        .preview-card:hover {
          z-index: 100 !important;
          transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1), z-index 0s 0s;
        }

        /* Store original transform values and create card lift effect */
        ${previewCards.map((card, index) => {
          const hoverLift = 6; // Reduced lift amount
          const hoverScale = 1.02; // Reduced scale
          
          return `
            .preview-card:nth-child(${index + 1}) {
              --original-x: ${card.translateX}px;
              --original-rotation: ${card.rotation}deg;
              --original-scale: ${card.scale};
            }
            .preview-card:nth-child(${index + 1}):hover {
              transform: translateX(calc(-50% + ${card.translateX}px)) translateY(calc(40% - ${hoverLift}px)) rotate(${card.rotation}deg) scale(${hoverScale}) !important;
            }
          `;
        }).join('')}

        /* Mobile adjustments */
        @media (max-width: 767px) {
          .testimonial-item:hover > div {
            transform: rotate(0deg) scale(1.35) !important;
          }
          
          .preview-card {
            width: 160px !important;
            height: 240px !important;
          }
        }

        /* Smooth performance optimizations */
        .testimonial-item > div {
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          transform-style: preserve-3d;
          -webkit-transform-style: preserve-3d;
        }

        ${testimonials.map((t, i) => `
          .testimonial-item:nth-child(${i + 1}) {
            --item-rotation: ${t.rotation}deg;
          }
        `).join('')}
      `}</style>
    </div>
  )
}