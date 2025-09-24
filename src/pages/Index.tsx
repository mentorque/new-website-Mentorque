import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import LogoCarousel from "@/components/LogoCarousel";
import About from "@/components/About";
import Footer from "@/components/Footer";
import TestimonialCarousel from "@/components/Testimonials";
import Component from "@/components/Weeks";
import MentorqueFAQ from "@/components/faq";
import FierceImageCarousel from "@/components/whatsApp";
import Resume from "@/components/resume"; 
import ProgressiveTimeline from '@/components/ProgressiveTimeline.tsx'


const Index = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll(".animate-on-scroll");
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  useEffect(() => {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();

        const targetId = this.getAttribute("href")?.substring(1);
        if (!targetId) return;

        const targetElement = document.getElementById(targetId);
        if (!targetElement) return;

        // Offset for navbar
        const offset = window.innerWidth < 768 ? 100 : 80;

        window.scrollTo({
          top: targetElement.offsetTop - offset,
          behavior: "smooth",
        });
      });
    });
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <main className="space-y-0">
        <section id="Home">
          <Hero />
        </section>

        <section id="Clients">
          <LogoCarousel />
          <FierceImageCarousel />
        </section>

        <section id="About">
          <About />
        </section>



         <section id="ProgressiveTimeline">
        <ProgressiveTimeline/>
        </section>

        <section id="services">
          <Component />
        </section>

        <section id="Testimonials">
          <TestimonialCarousel />
        </section>

        <section id="FAQ">
          <MentorqueFAQ />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
