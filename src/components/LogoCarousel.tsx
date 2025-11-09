"use client"

const LogoCarousel = () => {
  const logos = [
    { name: "Google", logo: "/logo/amazon.png" },
    { name: "Amazon", logo: "/logo/aib.png" },
    { name: "Netflix", logo: "/logo/microsoft.png" },
    { name: "Uber", logo: "/logo/samsung.png" },
    { name: "Spotify", logo: "/logo/pngwing.com.png" },
    { name: "Microsoft", logo: "/logo/goldman_sachs.png" },
  ]

  return (
    <section className="py-8 sm:py-12 md:py-16 bg-black overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Logo carousel container */}
        <div className="relative overflow-hidden">
          <div className="flex w-max animate-scroll-fast">
            {[...Array(3)].map((_, wrapIndex) => (
              <div key={wrapIndex} className="flex items-center space-x-3 sm:space-x-4 md:space-x-6 lg:space-x-8">
                {logos.map((company, index) => (
                  <div
                    key={`${wrapIndex}-${index}`}
                    className="flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center transition-all duration-300"
                  >
                    {company.logo.endsWith(".png") ? (
                      <img
                        src={company.logo || "/placeholder.svg"}
                        alt={company.name}
                        className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 lg:h-14 lg:w-14 object-contain"
                        loading="lazy"
                      />
                    ) : (
                      <span className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-bold text-white">{company.logo}</span>
                    )}
                  </div>
                ))}
                <div className="w-6 sm:w-8 md:w-10 lg:w-12 xl:w-16 flex-shrink-0" />
              </div>
            ))}
          </div>
          {/* Gradient overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-12 md:w-16 lg:w-24 xl:w-32 bg-gradient-to-r from-black via-black/75 to-transparent pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-12 md:w-16 lg:w-24 xl:w-32 bg-gradient-to-l from-black via-black/75 to-transparent pointer-events-none"></div>
        </div>
      </div>

      <style>{`
        @keyframes scroll-fast {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.3333%);
          }
        }

        .animate-scroll-fast {
          animation: scroll-fast 12s linear infinite;
          will-change: transform;
        }

        .animate-scroll-fast:hover {
          animation-play-state: running;
        }
      `}</style>
    </section>
  )
}

export default LogoCarousel
