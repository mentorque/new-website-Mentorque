"use client"
import type React from "react"
import { useRef } from "react"
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react"

type Testimonial = {
  id: number
  name: string
  content: string
  rating: number
  avatar: string
  logos?: string[]
}

const TestimonialCarousel = () => {
  const row1Ref = useRef<HTMLDivElement>(null)

  const regularTestimonials: Testimonial[] = [
    {
      id: 1,
      name: "Nilesh Khatiya",
      content:
        "Before Mentorque I couldn’t get any callbacks despite self-prep. The resume and portfolio built by Reshu and team were game changers. 100% recommended.",
      rating: 5,
      avatar: "/nilesh.jpeg",
    },
    {
      id: 2,
      name: "Jagruthi C",
      content: "Agniva’s guidance, personal progress tracking, and LLM-powered resume tools simplified my job hunt and saved me so much time.",
      rating: 4,
      avatar: "/jagruti.jpeg",
    },
    {
      id: 3,
      name: "Debmalya Das",
      content: "A few sessions with Agniva and Raajit saved me months of trial and error. Highly recommend them if you want interview calls faster!",
      rating: 5,
      avatar: "/3.jpeg",
    },
 
    {
      id: 5,
      name: "Anshul Shetty",
      content: "The resume session helped me realise crucial ATS-related mistakes and I heard back from multiple companies, including Amazon.",
      rating: 4,
      avatar: "/anshul.jpeg",
    },
    {
      id: 6,
      name: "Rigved Harmalker",
      content: "The mock interviews with Raajit and Agniva were crucial for securing my internship offer.",
      rating: 5,
      avatar: "/rigved.jpeg",
    },
 
    {
      id: 8,
      name: "Sree",
      content:
        "After six months with no interview calls, I heard back from Optum, Amazon, and eBay within two weeks of joining Mentorque and landed a Vodafone Order Analyst role.",
      rating: 5,
      avatar: "/Testimonials-People/sreelaxmi-testimonial.jpeg",
      logos: [
        "/Testimony Company logos/sree-logo-1.png",
        "/Testimony Company logos/sree-logo-2.png",
        "/Testimony Company logos/sree-logo-3.jpg",
        "/Testimony Company logos/sree-logo-4.png",
      ],
    },
    {
      id: 9,
      name: "Shubham",
      content:
        "The personalised guidance made all the difference. I received interview calls from DE Shaw, Q2, Saviynt, and AQR Capital. I’d recommend Mentorque to anyone trying to land calls from top firms.",
      rating: 5,
      avatar: "/Testimonials-People/shubham-testimonial.png",
      logos: [
        "/Testimony Company logos/shubham-logo-1.png",
        "/Testimony Company logos/shubham-logo-2.png",
      ],
    },
    {
      id: 10,
      name: "Sowmya",
      content:
        "Mentorque sharpened my application strategy  within weeks I received calls from Amazon and Bounce.io and secured an IT consultant role at TP Dublin.",
      rating: 5,
      avatar: "/Testimonials-People/sowmya-testimonial.jpeg",
      logos: [
        "/Testimony Company logos/sowmya-logo-1.png",
        "/Testimony Company logos/sowmya-logo-2.jpeg",
      ],
    },
    {
      id: 11,
      name: "Morgan",
      content:
        "Working with the team helped me land multiple interview calls in a week using their strategies and automation tools to find and connect with HRs. Highly recommended if you want a faster breakthrough in a tough job market.",
      rating: 5,
      avatar: "/Testimonials-People/morgan-testimonial.jpeg",
      logos: [
        "/Testimony Company logos/morgan-logo-1.jpeg",
      ],
    },
    {
      id: 12,
      name: "Pramod",
      content:
        "Mentorque revamped my profile and added industry-relevant projects that showcased my skills. Soon after, I received interview calls from Landmark Group, Alaan Pay, and Intervue.io.",
      rating: 5,
      avatar: "/Testimonials-People/pramod-testimonial.png",
      logos: [
        "/Testimony Company logos/pramod-logo-1.png",
        "/Testimony Company logos/pramod-logo-2.jpg",
      ],
    },
    {
      id: 13,
      name: "Udith",
      content: "Four calls with the team helped me get multiple callbacks from Amazon, TestGorilla, and more.",
      rating: 5,
      avatar: "/Testimonials-People/udith-testimonial.jpeg",
      logos: [
        "/Testimony Company logos/udith-logo-1.png",
        "/Testimony Company logos/udith-logo-2.png",
      ],
    },
  ]

  const scrollCarousel = (ref: React.RefObject<HTMLDivElement>, direction: "left" | "right") => {
    if (ref.current) {
      const scrollAmount = window.innerWidth < 768 ? 280 : 370
      const newScrollLeft = ref.current.scrollLeft + (direction === "right" ? scrollAmount : -scrollAmount)
      ref.current.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      })
    }
  }

  const RegularTestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => {
    const hasLogos = Boolean(testimonial.logos?.length)

    return (
      <div className="group min-w-[280px] sm:min-w-[300px] md:min-w-[420px] max-w-[280px] sm:max-w-[300px] md:max-w-[420px] mx-1.5 sm:mx-2 md:mx-4 flex-shrink-0">
        <div className="relative overflow-hidden bg-gradient-to-br from-white/[0.05] via-black/65 to-blue-500/[0.08] rounded-[30px] p-5 sm:p-6 md:p-8 backdrop-blur-2xl shadow-[0_16px_40px_-24px_rgba(0,0,0,0.7)] transition-all duration-250 ease-out transform-gpu group-hover:scale-[1.01] group-hover:shadow-[0_20px_58px_-30px_rgba(59,130,246,0.3)]">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-400/18 via-transparent to-purple-500/22 opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100"></div>

          <div className="relative flex flex-col h-full gap-6 sm:gap-7">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 sm:p-3 rounded-2xl bg-white/5 border border-white/10">
              <Quote className="w-5 h-5 sm:w-6 sm:h-6 text-white/80" />
            </div>
            <div>
              <div className="text-sm font-semibold text-white/70 uppercase tracking-[0.28em]">testimonial</div>
              <div className="flex gap-1 mt-2">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
            </div>
          </div>
        </div>

        <blockquote className="relative text-gray-100 leading-relaxed text-sm sm:text-base md:text-lg font-medium">
          {testimonial.content}
        </blockquote>

        <div className={`relative grid gap-4${hasLogos ? " mt-auto" : ""}`}>
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/40 via-white/5 to-transparent blur-md opacity-70"></div>
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden border border-white/20 bg-white/5">
                <img
                  src={testimonial.avatar || "/placeholder.svg"}
                  alt={testimonial.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="flex-1">
              <div className="font-semibold text-white text-lg sm:text-xl md:text-2xl">{testimonial.name}</div>
              <div className="mt-1 text-white/50 text-xs sm:text-sm uppercase tracking-[0.22em]">Mentorque </div>
            </div>
          </div>

          {hasLogos ? (
            <div className="pt-4 border-t border-white/10">
              <div className="text-white/60 text-[11px] sm:text-xs md:text-sm uppercase tracking-[0.18em] mb-3">
                Interview calls from
              </div>
              <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                {testimonial.logos.map((logo, index) => (
                  <div
                    key={`${testimonial.id}-logo-${index}`}
                    className="h-8 sm:h-9 md:h-11 px-3.5 sm:px-4 md:px-5 rounded-2xl bg-white border border-white/40 shadow-md flex items-center"
                  >
                    <img
                      src={logo}
                      alt={`${testimonial.name} company ${index + 1}`}
                      className="h-full w-auto object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
        </div>
      </div>
    )
  }

  return (
    <section className="py-12 sm:py-16 md:py-24 lg:py-32 bg-black overflow-hidden" id="testimonials">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          
           <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-white mb-4 sm:mb-6">
           Are We Liked?
           
          </h2>
        
        </div>

        {/* Navigation Buttons */}
      

        {/* Testimonials Carousel */}
        <div className="relative">
          {/* Desktop Navigation Buttons */}
          <button
            onClick={() => scrollCarousel(row1Ref, "left")}
            className="hidden md:block absolute left-2 top-1/2 -translate-y-1/2 z-50 p-4 rounded-full bg-black/90 border-2 border-white/30 backdrop-blur-lg shadow-2xl"
            aria-label="Previous testimonials"
          >
            <ChevronLeft className="w-8 h-8 text-white" />
          </button>
          <button
            onClick={() => scrollCarousel(row1Ref, "right")}
            className="hidden md:block absolute right-2 top-1/2 -translate-y-1/2 z-50 p-4 rounded-full bg-black/90 border-2 border-white/30 backdrop-blur-lg shadow-2xl"
            aria-label="Next testimonials"
          >
            <ChevronRight className="w-8 h-8 text-white" />
          </button>

          <div className="relative">
            <div className="md:absolute left-0 top-0 bottom-0 w-8 md:w-24 bg-gradient-to-r from-black via-black/80 to-transparent z-40 pointer-events-none"></div>
            <div className="md:absolute right-0 top-0 bottom-0 w-8 md:w-24 bg-gradient-to-l from-black via-black/80 to-transparent z-40 pointer-events-none"></div>
            <div
              ref={row1Ref}
              className="flex overflow-x-auto scrollbar-hide scroll-smooth px-2 sm:px-4 md:px-16"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {[...regularTestimonials].reverse().map((testimonial) => (
                <RegularTestimonialCard key={testimonial.id} testimonial={testimonial} />
              ))}
            </div>
          </div>
            <div className="flex justify-center gap-3 sm:gap-4 mt-6 sm:mt-8 md:hidden">
          <button
            onClick={() => scrollCarousel(row1Ref, "left")}
            className="p-2.5 sm:p-3 rounded-full bg-black/90 border-2 border-white/30 backdrop-blur-lg"
            aria-label="Previous testimonials"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </button>
          <button
            onClick={() => scrollCarousel(row1Ref, "right")}
            className="p-2.5 sm:p-3 rounded-full bg-black/90 border-2 border-white/30 backdrop-blur-lg"
            aria-label="Next testimonials"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </button>
        </div>
        </div>
      </div>
      <style>{`
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

export default TestimonialCarousel
