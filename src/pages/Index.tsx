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
  // Scroll animations
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

  // Smooth scrolling
  useEffect(() => {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const targetId = this.getAttribute("href")?.substring(1);
        if (!targetId) return;
        const targetElement = document.getElementById(targetId);
        if (!targetElement) return;
        const offset = window.innerWidth < 768 ? 100 : 80;
        window.scrollTo({ top: targetElement.offsetTop - offset, behavior: "smooth" });
      });
    });
  }, []);

  // **GA4 UTM tracking**
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const utm_source = params.get('utm_source');
    const utm_medium = params.get('utm_medium');
    const utm_campaign = params.get('utm_campaign');
    const utm_content = params.get('utm_content');

    if (utm_source && window.gtag) {
      window.gtag('event', 'utm_params', {
        source: utm_source,
        medium: utm_medium,
        campaign: utm_campaign,
        content: utm_content,
      });
    }
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <main className="space-y-0">
        <section id="Home">
          <Hero />
        </section>

         <section id="Testimonials">
             <LogoCarousel />
          <TestimonialCarousel />
        </section>


       

            <section id="services">
          <Component />
        </section>


        <section id="ProgressiveTimeline">
          <ProgressiveTimeline/>
        </section>

    
        <section id="Clients">
          <FierceImageCarousel />
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
