import { CheckCircle, Star, Clock, Users, Target, Zap, Award } from 'lucide-react';
import React, { useState, useEffect, useRef } from 'react';

import Navbar from '@/components/Navbar';
import CalendarCTA from '@/components/CalendarCTA';

const ResumeReview = () => {
  const [animatedCards, setAnimatedCards] = useState(new Set());
  const [hasAnimated, setHasAnimated] = useState(false);
  const containerRef = useRef(null);
  
  // Swipable cards state
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);

  const reviewFeatures = [
    {
      title: "ATS Optimization",
      description: "Ensure your resume passes Applicant Tracking Systems",
      icon: <Target className="w-8 h-8" />
    },
    {
      title: "Content Enhancement",
      description: "Improve impact statements and quantify achievements",
      icon: <Zap className="w-8 h-8" />
    },
    {
      title: "Format & Design",
      description: "Professional formatting that stands out to recruiters",
      icon: <Award className="w-8 h-8" />
    },
    {
      title: "Industry Alignment",
      description: "Tailor content to your target industry and role",
      icon: <Users className="w-8 h-8" />
    }
  ];

  const reviewPackage = {
    title: "Professional Resume Review",
    duration: "60 minutes",
    description: "Comprehensive analysis with expert feedback and optimization",
    includes: [
      "ATS compatibility check",
      "Content review and suggestions",
      "Format optimization tips",
      "Live 1-on-1 feedback session",
      "Industry-specific recommendations",
      "Before/after comparison",
      "Written feedback report",
      "Follow-up email support"
    ]
  };
  
  // Improved swipe handlers
  const minSwipeDistance = 50;

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
    setIsDragging(true);
    setDragOffset(0);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const currentTouch = e.targetTouches[0].clientX;
    const offset = currentTouch - touchStart;
    setDragOffset(offset);
    setTouchEnd(currentTouch);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && currentCardIndex < reviewFeatures.length - 1) {
      setCurrentCardIndex(prev => prev + 1);
    } else if (isRightSwipe && currentCardIndex > 0) {
      setCurrentCardIndex(prev => prev - 1);
    }
    
    setIsDragging(false);
    setDragOffset(0);
  };

  const goToCard = (index) => {
    setCurrentCardIndex(index);
  };

  // Prevent zoom on mobile
  useEffect(() => {
    const preventZoom = (e) => {
      if (e.touches.length > 1) {
        e.preventDefault();
      }
    };

    const preventDoubleTapZoom = (e) => {
      if (e.touches && e.touches.length > 1) {
        e.preventDefault();
      }
    };

    document.addEventListener('touchstart', preventZoom);
    document.addEventListener('touchmove', preventDoubleTapZoom, { passive: false });
    document.addEventListener('gesturestart', (e) => e.preventDefault());
    document.addEventListener('gesturechange', (e) => e.preventDefault());
    document.addEventListener('gestureend', (e) => e.preventDefault());

    return () => {
      document.removeEventListener('touchstart', preventZoom);
      document.removeEventListener('touchmove', preventDoubleTapZoom);
      document.removeEventListener('gesturestart', (e) => e.preventDefault());
      document.removeEventListener('gesturechange', (e) => e.preventDefault());
      document.removeEventListener('gestureend', (e) => e.preventDefault());
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            
            // Trigger sequential hover animation
            reviewFeatures.forEach((_, index) => {
              setTimeout(() => {
                setAnimatedCards(prev => new Set(prev).add(index));
              }, index * 600);
            });

            // Remove animation classes after completion
            setTimeout(() => {
              setAnimatedCards(new Set());
            }, reviewFeatures.length * 300 + 3000);
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: '0px 0px -100px 0px'
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [hasAnimated, reviewFeatures.length]);

  return (
    <div className="relative overflow-x-hidden">
      {/* Viewport meta tag should be in your HTML head, but we'll add CSS equivalent */}
      <style jsx global>{`
        @media (max-width: 768px) {
          html, body {
            max-width: 100vw;
            overflow-x: hidden;
            touch-action: pan-y pinch-zoom;
          }
        }
      `}</style>

      <div className="min-h-screen bg-black">
        <Navbar />
        
        {/* Hero Section */}
        <div className="bg-black py-8 md:py-12 px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="w-full max-w-7xl mx-auto">
            <div className="text-center">
              <h1 className="text-3xl sm:text-4xl md:text-6xl mt-16 sm:mt-20 text-white leading-tight mb-6 sm:mb-8">
                Expert <span className="text-blue-400">Resume Review</span>
              </h1>

              <p className="text-lg sm:text-xl md:text-xl text-gray-100 leading-relaxed max-w-2xl mx-auto mb-6 sm:mb-8 px-2">
                Get professional feedback to transform your resume and maximize interview potential
              </p>

              <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-base sm:text-lg">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
                  <span className="text-gray-100 text-sm sm:text-base">ATS Optimized</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
                  <span className="text-gray-100 text-sm sm:text-base">Industry Experts</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
                  <span className="text-gray-100 text-sm sm:text-base">24hr Turnaround</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Review Features */}
        <div className="bg-black py-8 md:py-12 px-4 sm:px-6 md:px-8 lg:px-12" ref={containerRef}>
          <div className="w-full max-w-7xl mx-auto">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-3xl sm:text-4xl md:text-6xl text-white leading-tight mb-6 sm:mb-8">
                What We <span className="text-blue-400">Review</span>
              </h2>
              <p className="text-lg sm:text-xl md:text-2xl text-gray-100 leading-relaxed max-w-2xl mx-auto px-4">
                Comprehensive analysis to maximize your interview potential
              </p>
            </div>

            {/* Desktop View - Grid */}
            <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {reviewFeatures.map((feature, index) => (
                <div 
                  key={index} 
                  className={`relative group backdrop-blur-xl bg-white/[0.02] border border-white/10 rounded-2xl p-6 lg:p-8 text-center transition-all duration-500 before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-br before:from-white/[0.08] before:via-transparent before:to-transparent before:transition-opacity before:duration-500 ${
                    animatedCards.has(index) 
                      ? 'bg-white/[0.05] border-white/20 shadow-2xl shadow-blue-400/10 before:opacity-100' 
                      : 'hover:bg-white/[0.05] hover:border-white/20 hover:shadow-2xl hover:shadow-blue-400/10 before:opacity-0 hover:before:opacity-100'
                  }`}
                >
                  <div className="relative z-10">
                    <div className="text-blue-400 mb-4 lg:mb-6 flex justify-center drop-shadow-lg">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl lg:text-2xl text-white mb-3 lg:mb-4 drop-shadow-sm">
                      {feature.title}
                    </h3>
                    <p className="text-gray-300 text-base lg:text-lg leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                  <div 
                    className={`absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-400/[0.03] via-transparent to-purple-600/[0.02] transition-opacity duration-500 ${
                      animatedCards.has(index) ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                    }`}
                  ></div>
                </div>
              ))}
            </div>

            {/* Mobile View - Swipable Cards */}
            <div className="md:hidden relative w-full" style={{ height: '75vh', minHeight: '500px', maxHeight: '650px' }}>
              <div 
                className="relative w-full h-full flex items-center justify-center touch-pan-y"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                style={{ touchAction: 'pan-y' }}
              >
                <div className="relative w-full h-full max-w-sm mx-auto flex items-center justify-center">
                  {reviewFeatures.map((feature, index) => {
                    const position = index - currentCardIndex;
                    const isActive = index === currentCardIndex;
                    const isPrev = index === currentCardIndex - 1;
                    const isNext = index === currentCardIndex + 1;
                    
                    let transform = 'translateX(0%) scale(1)';
                    let opacity = 0;
                    let zIndex = 0;
                    
                    if (isActive) {
                      transform = `translateX(${dragOffset}px) scale(1)`;
                      opacity = 1;
                      zIndex = 30;
                    } else if (isPrev) {
                      transform = `translateX(calc(-100% + ${dragOffset}px)) scale(0.9)`;
                      opacity = 0.7 - Math.min(Math.abs(dragOffset) / 1000, 0.5);
                      zIndex = 20;
                    } else if (isNext) {
                      transform = `translateX(calc(100% + ${dragOffset}px)) scale(0.9)`;
                      opacity = 0.7 - Math.min(Math.abs(dragOffset) / 1000, 0.5);
                      zIndex = 20;
                    } else if (position < -1 || position > 1) {
                      opacity = 0;
                      zIndex = 0;
                    }

                    return (
                      <div
                        key={index}
                        className="absolute w-11/12 h-4/5 max-w-xs transition-all duration-300 ease-out"
                        style={{
                          transform,
                          opacity,
                          zIndex,
                          pointerEvents: isActive ? 'auto' : 'none',
                        }}
                      >
                        <div className="relative w-full h-full backdrop-blur-xl bg-white/[0.06] border-2 border-white/25 rounded-3xl p-6 shadow-2xl shadow-blue-400/20 flex flex-col justify-center items-center text-center">
                          <div className="relative z-10 flex flex-col items-center justify-center h-full">
                            <div className="text-blue-400 mb-6 drop-shadow-2xl">
                              {React.cloneElement(feature.icon, { className: 'w-14 h-14' })}
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-4 drop-shadow-lg px-2">
                              {feature.title}
                            </h3>
                            <p className="text-gray-200 text-lg leading-relaxed px-4">
                              {feature.description}
                            </p>
                          </div>
                          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-400/[0.08] via-transparent to-purple-600/[0.05]"></div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Card Indicators */}
                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-40">
                  {reviewFeatures.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToCard(index)}
                      className={`transition-all duration-300 rounded-full ${
                        index === currentCardIndex 
                          ? 'w-6 h-2 bg-blue-400' 
                          : 'w-2 h-2 bg-white/40'
                      }`}
                      aria-label={`Go to card ${index + 1}`}
                    />
                  ))}
                </div>

                {/* Swipe Hint */}
                {currentCardIndex === 0 && dragOffset === 0 && (
                  <div className="absolute -bottom-8 left-0 right-0 text-center z-30">
                    <p className="text-gray-400 text-sm animate-pulse">Swipe to explore →</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Review Package */}
        <div className="bg-black py-8 md:py-12 px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="w-full max-w-7xl mx-auto">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-3xl sm:text-4xl md:text-6xl text-white leading-tight mb-6 sm:mb-8">
                Our Resume Review <span className="text-blue-400">Service</span>
              </h2>
              <p className="text-lg sm:text-xl md:text-xl text-gray-100 leading-relaxed max-w-2xl mx-auto px-4">
                Comprehensive professional review to maximize your interview potential
              </p>
            </div>

            <div className="max-w-2xl mx-auto px-2 sm:px-0">
              <div className="relative group backdrop-blur-xl bg-white/[0.03] border border-white/10 rounded-3xl hover:bg-white/[0.06] hover:border-white/20 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-400/15 before:absolute before:inset-0 before:rounded-3xl before:bg-gradient-to-br before:from-white/[0.1] before:via-white/[0.02] before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500 overflow-hidden">
                <div className="relative z-10 p-6 sm:p-8 md:p-12">
                  <div className="text-center mb-6 sm:mb-8">
                    <h3 className="text-2xl sm:text-3xl md:text-4xl text-white mb-3 sm:mb-4 drop-shadow-sm">
                      {reviewPackage.title}
                    </h3>
                    <div className="text-blue-400 flex items-center justify-center gap-2 text-base sm:text-lg drop-shadow-lg">
                      <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
                      {reviewPackage.duration}
                    </div>
                  </div>

                  <p className="text-gray-100 mb-6 sm:mb-8 text-center text-lg sm:text-xl leading-relaxed">{reviewPackage.description}</p>

                  <div className="space-y-4 sm:space-y-6 mb-6 sm:mb-8">
                    {reviewPackage.includes.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex items-start gap-3 sm:gap-4">
                        <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400 flex-shrink-0 mt-0.5 sm:mt-1 drop-shadow-lg" />
                        <span className="text-gray-100 text-base sm:text-lg leading-relaxed text-left">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-400/[0.04] via-transparent to-purple-600/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-60"></div>
                <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-blue-400/[0.05] to-transparent rounded-full blur-2xl"></div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-black py-8 md:py-12 px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="w-full max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl md:text-6xl text-white leading-tight mb-6 sm:mb-8">
              Ready to Transform Your <span className="text-blue-400">Resume?</span>
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-100 leading-relaxed max-w-2xl mx-auto mb-6 sm:mb-8 px-4">
              Join thousands who've improved their interview success rate with expert feedback
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4 sm:px-0">
              <CalendarCTA label="Request a Call back" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeReview;