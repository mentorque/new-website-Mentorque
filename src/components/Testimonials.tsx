"use client"
import type React from "react"
import { useRef } from "react"
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react"

const TestimonialCarousel = () => {
  const row1Ref = useRef<HTMLDivElement>(null)

  const regularTestimonials = [
    {
      id: 9,
      name: "Sree",
      content:
        "After six months with no interview calls, I heard back from Optum, Amazon, and eBay within two weeks of joining Mentorque and landed a Vodafone Order Analyst role.",
      rating: 5,
      avatar: "/Testimonials-People/sreelaxmi-testimonial.jpeg",
    },
    {
      id: 11,
      name: "Sowmya",
      content:
        "Mentorque sharpened my application strategy within weeks I received calls from Amazon and Bounce.io and secured an IT consultant role at TP Dublin.",
      rating: 5,
      avatar: "/Testimonials-People/sowmya-testimonial.jpeg",
    },
    {
      id: 12,
      name: "Morgan",
      content:
        "Working with the team helped me land multiple interview calls in a week using their strategies and automation tools to find and connect with HRs. Highly recommended if you want a faster breakthrough in a tough job market.",
      rating: 5,
      avatar: "/Testimonials-People/morgan-testimonial.jpeg",
    },
    {
      id: 10,
      name: "Shubham",
      content:
        "The personalised guidance made all the difference. I received interview calls from DE Shaw, Q2, Saviynt, and AQR Capital. I’d recommend Mentorque to anyone trying to land calls from top firms.",
      rating: 5,
      avatar: "/Testimonials-People/shubham-testimonial.png",
    },
    {
      id: 1,
      name: "Nilesh Khatiya",
      content:
        "Doing self prep, I couldn't even get any call backs from companies. The resume and portfolios built by Reshu and team were a gamechanger. 100% recommended.",
      rating: 5,
      avatar: "/nilesh.jpeg",
    },
    {
      id: 2,
      name: "Jagruthi C",
      content:
        "Agniva’s guidance, personal progress tracking and LLM powered resume tools simplified my job hunt process and saved me a lot of time.",
      rating: 4,
      avatar: "/jagruti.jpeg",
    },
    {
      id: 3,
      name: "Debmalya Das",
      content:
        "Few sessions with Agniva and Raajit saved me months of trial and error. Would highly recommend for getting calls faster!",
      rating: 5,
      avatar: "/3.jpeg",
    },
    {
      id: 4,
      name: "Dev",
      content:
        "Steadfast support from Reshu plus the chrome extension made my job search much more faster and effective.",
      rating: 5,
      avatar: "/dev.jpeg",
    },
    {
      id: 5,
      name: "Anshul Shetty",
      content:
        "The resume session helped me realise crucial ATS related mistakes and hear back from mutiple companies including Amazon.",
      rating: 4,
      avatar: "/anshul.jpeg",
    },
    {
      id: 6,
      name: "Rigved Harmalker",
      content:
        "The mock interviews with Raajit and Agniva were crucial in securing my internship offer.",
      rating: 5,
      avatar: "/rigved.jpeg",
    },
    {
      id: 13,
      name: "Pramod",
      content:
        "Mentorque revamped my profile and added industry-relevant projects that showcased my skills. Soon after, I received interview calls from Landmark Group, Alaan Pay, and Intervue.io.",
      rating: 5,
      avatar: "/Testimonials-People/pramod-testimonial.png",
    },
    {
      id: 14,
      name: "Udith",
      content:
        "Four calls with the team helped me get multiple callbacks from Amazon, TestGorilla, and more.",
      rating: 5,
      avatar: "/Testimonials-People/udith-testimonial.jpeg",
    },
  ];

  const uniqueTestimonials = regularTestimonials.filter((testimonial, index, self) => {
    return index === self.findIndex((item) => item.id === testimonial.id)
  })
  

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

  const RegularTestimonialCard = ({ testimonial }: { testimonial: any }) => (
    <div className="bg-gradient-to-br from-white/10 to-white/5 rounded-3xl p-6 border border-white/20 backdrop-blur-lg min-w-[280px] md:min-w-[380px] max-w-[280px] md:max-w-[380px] mx-2 md:mx-4 flex-shrink-0 shadow-2xl">
      <div className="flex items-start justify-between mb-6">
        <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-sm">
          <Quote className="w-6 h-6 text-white/80 flex-shrink-0" />
        </div>
        <div className="flex gap-1 ">
          {[...Array(testimonial.rating)].map((_, i) => (
            <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
          ))}
        </div>
      </div>
      <blockquote className="text-gray-200 mb-6 leading-relaxed text-sm md:text-base font-medium pb-12">
        {testimonial.content}
      </blockquote>
      
      <div className="absolute bottom-5 left-5">
        <div className="flex items-center justify-center" >

        <div className="w-16 h-16 rounded-xl mr-3 overflow-hidden ">
          <img
            src={testimonial.avatar || "/placeholder.svg"}
            alt={testimonial.name}
            className="w-full h-full object-cover"
            />
        </div>
        <div>
          <div className="font-bold text-white text-base mb-1">{testimonial.name}</div>
        
        </div>
            </div>
      </div>
    </div>
  )

  return (
    <section className="pt-6 md:pt-8 pb-10 md:pb-12 bg-black overflow-hidden" id="testimonials">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          
           <h2 className="text-4xl md:text-5xl lg:text-6xl  text-white mb-6">
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
              className="flex overflow-x-auto scrollbar-hide scroll-smooth px-4 md:px-16"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {uniqueTestimonials.map((testimonial) => (
                <RegularTestimonialCard key={testimonial.id} testimonial={testimonial} />
              ))}
            </div>
          </div>
            <div className="flex justify-center gap-4 mt-8 md:hidden">
          <button
            onClick={() => scrollCarousel(row1Ref, "left")}
            className="p-3 rounded-full bg-black/90 border-2 border-white/30 backdrop-blur-lg"
            aria-label="Previous testimonials"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          <button
            onClick={() => scrollCarousel(row1Ref, "right")}
            className="p-3 rounded-full bg-black/90 border-2 border-white/30 backdrop-blur-lg"
            aria-label="Next testimonials"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
        </div>
        </div>
      </div>
      <style jsx>{`
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