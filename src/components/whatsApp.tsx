import { ReactNode, useMemo } from "react"
import { ArrowUpRight, Calendar } from "lucide-react"
import { Link } from "react-router-dom"

const testimonialAssetModules = import.meta.glob<
  true,
  string,
  string
>("/public/Whatsapp_testimonial_screenshots/*.{png,jpg,jpeg,webp}", {
  as: "url",
  eager: true,
})

const previewLayout = [
  {
    rotation: -14,
    translateX: -140,
    translateY: -18,
    scale: 0.88,
    zIndex: 3,
  },
  {
    rotation: -7,
    translateX: -72,
    translateY: -8,
    scale: 0.92,
    zIndex: 4,
  },
  {
    rotation: 0,
    translateX: 0,
    translateY: 0,
    scale: 0.96,
    zIndex: 5,
  },
  {
    rotation: 7,
    translateX: 72,
    translateY: -8,
    scale: 0.92,
    zIndex: 4,
  },
  {
    rotation: 14,
    translateX: 140,
    translateY: -18,
    scale: 0.88,
    zIndex: 3,
  },
] as const

const fallbackImages = [
  "/screen/imp1.jpg",
  "/screen/15.png",
  "/screen/16.png",
  "/screen/17.png",
  "/screen/18.jpeg",
]

const naturalCompare = (a: string, b: string) =>
  a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" })

const sanitisePublicUrl = (url: string) =>
  url.startsWith("/public/") ? url.replace("/public", "") : url

const shuffleArray = <T,>(input: T[]) => {
  const array = [...input]
  for (let i = array.length - 1; i > 0; i -= 1) {
    const randomIndex = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[randomIndex]] = [array[randomIndex], array[i]]
  }
  return array
}

const toTitle = (fileName: string) =>
  fileName
    .replace(/[-_]/g, " ")
    .replace(/\s+/g, " ")
    .replace(/\.[^/.]+$/, "")
    .trim()

const buildPreviewCards = (images: string[]) =>
  previewLayout.map((layout, index) => {
    const image = images[index % images.length]
    const fileName = image.split("/").pop() ?? `testimonial-${index + 1}`

    return {
      ...layout,
      image,
      alt: `Mentorque testimonial ${toTitle(fileName)}`,
    }
  })

type TestimonialGalleryProps = {
  showGallery?: boolean
  maxPreviewImages?: number
  title?: ReactNode
  subtitle?: ReactNode
  ctaHref?: string
  ctaLabel?: string
  ctaDescription?: string
  statLabel?: string
  statSuffix?: string
}

export default function TestimonialGallery({
  showGallery = false,
  maxPreviewImages = previewLayout.length,
  title: _title,
  subtitle,
  ctaHref = "/testimonials",
  ctaLabel = "View Testimonials",
  ctaDescription = "Peek inside their chats & offers—real WhatsApp, real videos.",
  statLabel = "Verified WhatsApp Wins",
  statSuffix = "Receipts",
}: TestimonialGalleryProps) {
  const testimonialImages = useMemo(() => {
    const entries = Object.entries(testimonialAssetModules) as [
      string,
      string
    ][]

    if (!entries.length) {
      return shuffleArray(fallbackImages)
    }

    const sortedImages = entries
      .sort(([a], [b]) => naturalCompare(a, b))
      .map(([, url]) => sanitisePublicUrl(url))

    return shuffleArray(sortedImages)
  }, [])

  const previewCards = useMemo(() => {
    const images = testimonialImages.length
      ? testimonialImages.slice(0, maxPreviewImages)
      : fallbackImages

    return buildPreviewCards(images)
  }, [maxPreviewImages, testimonialImages])

  const galleryCards = useMemo(() => {
    if (!showGallery) {
      return []
    }

    return testimonialImages.map((image, index) => {
      const fileName = image.split("/").pop() ?? `testimonial-${index + 1}`

      return {
        image,
        alt: `Mentorque WhatsApp testimonial ${toTitle(fileName)}`,
      }
    })
  }, [showGallery, testimonialImages])

  return (
    <div className="bg-black min-h-[60vh] sm:min-h-[80vh] lg:min-h-screen relative overflow-hidden pb-4 sm:pb-6">
      {/* Refined background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-950/8 via-black to-black"></div>
      
      {/* Subtle noise texture overlay */}
      <div className="absolute inset-0 opacity-[0.015]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
        backgroundRepeat: 'repeat',
        backgroundSize: '128px 128px'
      }}></div>

      {/* Header Section */}
      <div className="text-center py-8 sm:py-16 md:py-24 px-6 relative z-10">
      <h1 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl text-white mb-3 md:mb-8 leading-tight">
          People are Landing Interviews <span className="text-blue-400">Fast.</span>
          <br />
        </h1>
        <p className="text-base sm:text-xl md:text-2xl lg:text-3xl text-white/60 mb-10 sm:mb-20 md:mb-24 font-light max-w-4xl mx-auto leading-relaxed">
          {subtitle ?? "Your next raise starts with this click."}
        </p>

        <div className="flex flex-col items-center">
            {/* Preview Cards */}
            <div
              className="relative mb-0 preview-cards-container w-full"
              style={{
                height: "140px",
                width: "100%",
                maxWidth: "850px",
                overflow: "visible",
                perspective: "1200px",
              }}
            >
              {previewCards.map((card, index) => (
                <div
                  key={index}
                  className="absolute bottom-0 left-1/2 preview-card group"
                  style={{
                    transform: `translateX(calc(-50% + ${card.translateX}px)) translateY(40%) rotate(${card.rotation}deg) scale(${card.scale})`,
                    zIndex: card.zIndex,
                    width: "210px",
                    height: "300px",
                    transformStyle: "preserve-3d",
                    willChange: "transform, z-index",
                    transition:
                      "transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), z-index 0.3s ease-out",
                  }}
                >
                  <div
                    className="relative w-full h-full bg-zinc-900/95 backdrop-blur-lg rounded-2xl overflow-hidden shadow-[0_25px_70px_-20px_rgba(0,0,0,0.9)] border border-zinc-700/70 transition-all duration-700 group-hover:border-zinc-500 group-hover:shadow-[0_30px_80px_-15px_rgba(0,0,0,1)]"
                    style={{
                      animation: `previewFloat 4s ease-in-out ${index * 0.4}s infinite, previewPop 5s ease-in-out ${index * 0.5}s infinite`,
                    }}
                  >
                    <img
                      src={card.image}
                      alt={card.alt}
                      className="w-full h-full object-cover object-top"
                      style={{
                        imageRendering: "auto" as const,
                        WebkitFontSmoothing: "antialiased" as any,
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
            <Link
              to={ctaHref}
              className="mt-6 flex items-center justify-center group w-full sm:w-auto text-center bg-gray-900 text-white hover:bg-black font-semibold py-2.5 sm:py-3 md:py-4 px-5 sm:px-6 md:px-8 lg:px-10 rounded-full transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-[1.02] text-sm sm:text-base md:text-lg z-10"
            >
              <Calendar className="mr-2 sm:mr-3 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
              {ctaLabel}
              <ArrowUpRight className="ml-2 sm:ml-3 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 transition-transform group-hover:translate-x-1" />
            </Link>
            {ctaDescription && (
              <p className="mt-2 text-gray-400 text-xs sm:text-sm">{ctaDescription}</p>
            )}
        </div>
      </div>

      {showGallery && galleryCards.length > 0 && (
        <div className="relative z-10 px-6 pb-6 sm:pb-8">
          <div className="mx-auto flex max-w-6xl flex-col gap-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-sm font-semibold uppercase tracking-[0.35em] text-white/50 sm:text-base">
                {statLabel}
              </h2>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white/60">
                {galleryCards.length} {statSuffix}
              </span>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 testimonial-gallery-grid">
              {galleryCards.map((card) => (
                <div
                  key={card.image}
                  className="testimonial-gallery-card group overflow-hidden rounded-2xl border border-zinc-800/70 bg-zinc-950/70 backdrop-blur-sm shadow-[0_25px_60px_-25px_rgba(0,0,0,0.95)] transition-transform duration-500 hover:-translate-y-2 hover:border-zinc-600/60 hover:shadow-[0_30px_80px_-20px_rgba(0,0,0,1)]"
                >
                  <img
                    src={card.image}
                    alt={card.alt}
                    loading="lazy"
                    className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <style>{`
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

        .testimonial-gallery-card {
          position: relative;
          isolation: isolate;
        }

        .testimonial-gallery-card::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            rgba(9, 9, 11, 0.12) 0%,
            rgba(9, 9, 11, 0) 60%,
            rgba(9, 9, 11, 0.35) 100%
          );
          opacity: 0;
          transition: opacity 0.4s ease;
          pointer-events: none;
          z-index: 1;
        }

        .testimonial-gallery-card:hover::after {
          opacity: 1;
        }

        .testimonial-gallery-grid {
          grid-auto-rows: 1fr;
        }

        .testimonial-gallery-card:nth-child(6n + 1),
        .testimonial-gallery-card:nth-child(6n + 4) {
          aspect-ratio: 3 / 4;
        }

        .testimonial-gallery-card:nth-child(6n + 2),
        .testimonial-gallery-card:nth-child(6n + 5) {
          aspect-ratio: 4 / 5;
        }

        .testimonial-gallery-card:nth-child(3n) {
          aspect-ratio: 1;
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

      `}</style>
    </div>
  )
}