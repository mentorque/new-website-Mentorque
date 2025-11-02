"use client"

const LogoCarousel = () => {
  const logos = [
    { name: "Google", logo: "/logo/amazon.png" },
    { name: "Amazon", logo: "/logo/aib.png" },
    { name: "Netflix", logo: "/logo/microsoft.png" },
    { name: "Uber", logo: "/logo/samsung.png" },
    { name: "Tesla", logo: "/logo/jpMorgan.png" },
    { name: "Spotify", logo: "/logo/pngwing.com.png" },
    { name: "Microsoft", logo: "/logo/goldman_sachs.png" },
  ]

  return (
    <section className="py-8 sm:py-12 md:py-16 bg-black overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Logo carousel container */}
        <div className="relative overflow-hidden">
          <div className="flex space-x-3 sm:space-x-4 md:space-x-6 lg:space-x-8 animate-scroll-fast">
            {/* First set of logos */}
            {logos.map((company, index) => (
              <div
                key={`first-${index}`}
                className="flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-lg flex items-center justify-center hover:border-white/40 transition-colors duration-300 backdrop-blur-sm"
              >
                {company.logo.endsWith(".png") ? (
                  <img
                    src={company.logo || "/placeholder.svg"}
                    alt={company.name}
                    className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 lg:h-12 lg:w-12 object-contain"
                    loading="lazy"
                  />
                ) : (
                  <span className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-bold text-white">{company.logo}</span>
                )}
              </div>
            ))}
            {/* Second set for seamless loop */}
            {logos.map((company, index) => (
              <div
                key={`second-${index}`}
                className="flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-lg flex items-center justify-center hover:border-white/40 transition-colors duration-300 backdrop-blur-sm"
              >
                {company.logo.endsWith(".png") ? (
                  <img
                    src={company.logo || "/placeholder.svg"}
                    alt={company.name}
                    className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 lg:h-12 lg:w-12 object-contain"
                    loading="lazy"
                  />
                ) : (
                  <span className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-bold text-white">{company.logo}</span>
                )}
              </div>
            ))}
            {/* Third set for seamless loop */}
            {logos.map((company, index) => (
              <div
                key={`third-${index}`}
                className="flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-lg flex items-center justify-center hover:border-white/40 transition-colors duration-300 backdrop-blur-sm"
              >
                {company.logo.endsWith(".png") ? (
                  <img
                    src={company.logo || "/placeholder.svg"}
                    alt={company.name}
                    className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 lg:h-12 lg:w-12 object-contain"
                    loading="lazy"
                  />
                ) : (
                  <span className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-bold text-white">{company.logo}</span>
                )}
              </div>
            ))}
          </div>
          {/* Gradient overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-12 md:w-16 lg:w-24 xl:w-32 bg-gradient-to-r from-black/90 to-transparent pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-12 md:w-16 lg:w-24 xl:w-32 bg-gradient-to-l from-black/90 to-transparent pointer-events-none"></div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll-fast {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-100% / 3));
          }
        }
        
        .animate-scroll-fast {
          animation: scroll-fast 8s linear infinite;
        }
        
        .animate-scroll-fast:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  )
}

export default LogoCarousel
