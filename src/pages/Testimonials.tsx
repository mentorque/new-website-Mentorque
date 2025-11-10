import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import CareersHero from "@/components/CareersHero"
import TestimonialsGallery from "@/components/TestimonialsGallery"
import VideoTestimonials from "@/components/VideoTestimonials"

const Testimonials = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b1120] via-[#05070d] to-[#020204]">
      <Navbar />
      <main className="pt-24 sm:pt-28 lg:pt-32">
        <CareersHero />
        <VideoTestimonials />
        <TestimonialsGallery />
      </main>
      <Footer />
    </div>
  )
}

export default Testimonials

