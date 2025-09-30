import { CheckCircle, Star, Clock, Users, Target, Zap, Award } from 'lucide-react';
import React, { useState, useEffect, useRef } from 'react';
import CalendarCTA from '@/components/CalendarCTA';


const ResumeRebuild = () => {
  const [animatedCards, setAnimatedCards] = useState(new Set());
  const [hasAnimated, setHasAnimated] = useState(false);
  const containerRef = useRef(null);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  
  const rebuildFeatures = [
    {
      title: "Complete Rewrite",
      description: "Start fresh with a professionally written resume from scratch",
      icon: <Target className="w-8 h-8" />
    },
    {
      title: "ATS Optimization",
      description: "Advanced formatting and keywords to beat tracking systems",
      icon: <Zap className="w-8 h-8" />
    },
    {
      title: "Industry Templates",
      description: "Custom designs tailored to your specific industry",
      icon: <Award className="w-8 h-8" />
    },
    {
      title: "Personal Branding",
      description: "Develop your unique professional narrative and value proposition",
      icon: <Users className="w-8 h-8" />
    }
  ];

  const rebuildPackage = {
    title: "Complete Resume Rebuild",
    duration: "3-5 days",
    description: "Comprehensive resume transformation with expert collaboration",
    includes: [
      "Full resume rewrite from scratch",
      "ATS-optimized formatting",
      "Industry-specific keywords",
      "Personal branding consultation",
      "LinkedIn profile optimization",
      "Cover letter template",
      "Multiple rounds of revisions",
      "PDF and Word formats",
      "30-day follow-up support"
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

    if (isLeftSwipe && currentCardIndex < rebuildFeatures.length - 1) {
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

  // Prevent zoom and improve mobile experience
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

    // Add event listeners to prevent zoom
    document.addEventListener('touchstart', preventZoom, { passive: false });
    document.addEventListener('touchmove', preventDoubleTapZoom, { passive: false });
    document.addEventListener('gesturestart', (e) => e.preventDefault());
    document.addEventListener('gesturechange', (e) => e.preventDefault());
    document.addEventListener('gestureend', (e) => e.preventDefault());

    // Prevent double-tap zoom
    let lastTouchEnd = 0;
    const handleTouchEnd = (e) => {
      const now = Date.now();
      if (now - lastTouchEnd <= 300) {
        e.preventDefault();
      }
      lastTouchEnd = now;
    };

    document.addEventListener('touchend', handleTouchEnd, { passive: false });

    return () => {
      document.removeEventListener('touchstart', preventZoom);
      document.removeEventListener('touchmove', preventDoubleTapZoom);
      document.removeEventListener('gesturestart', (e) => e.preventDefault());
      document.removeEventListener('gesturechange', (e) => e.preventDefault());
      document.removeEventListener('gestureend', (e) => e.preventDefault());
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            
            rebuildFeatures.forEach((_, index) => {
              setTimeout(() => {
                setAnimatedCards(prev => new Set(prev).add(index));
              }, index * 600);
            });

            setTimeout(() => {
              setAnimatedCards(new Set());
            }, rebuildFeatures.length * 600 + 3000);
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
  }, [hasAnimated, rebuildFeatures.length]);

  return (
    <div className="min-h-screen bg-black overflow-x-hidden">
      {/* Add CSS to prevent zoom */}
      <style jsx global>{`
        @media (max-width: 768px) {
          html, body {
            max-width: 100vw;
            overflow-x: hidden;
            touch-action: pan-y;
            -webkit-user-scalable: no;
            user-scalable: no;
          }
          
          /* Prevent text size adjustment */
          * {
            -webkit-text-size-adjust: 100%;
            text-size-adjust: 100%;
          }
        }
      `}</style>

      {/* Hero Section */}
      <div className="bg-black py-8 md:py-12 px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="w-full max-w-7xl mx-auto">
          <div className="text-center">
            <div className="flex flex-col items-center justify-center gap-4 mb-6">
              <h1 className="text-3xl sm:text-4xl md:text-6xl text-white leading-tight mt-8">
                Resume <span className="text-blue-400">Rebuild</span> & Optimization
              </h1>
            </div>
            
            <p className="text-lg sm:text-xl md:text-xl text-gray-100 leading-relaxed max-w-2xl mx-auto mb-6 sm:mb-8 px-2">
              Complete resume transformation with expert collaboration and ATS optimization
            </p>

            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-base sm:text-lg">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
                <span className="text-gray-100 text-sm sm:text-base">Complete Rewrite</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
                <span className="text-gray-100 text-sm sm:text-base">Expert Collaboration</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
                <span className="text-gray-100 text-sm sm:text-base">Fast Turnaround</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Rebuild Features with Sequential Animation */}
      <div className="bg-black py-8 md:py-12 px-4 sm:px-6 md:px-8 lg:px-12" ref={containerRef}>
        <div className="w-full max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-6xl text-white leading-tight mb-6 sm:mb-8">
              What We <span className="text-blue-400">Rebuild</span>
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-100 leading-relaxed max-w-2xl mx-auto px-4">
              Complete transformation to maximize your career potential
            </p>
          </div>

          {/* Desktop View - Grid */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {rebuildFeatures.map((feature, index) => (
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

          {/* Mobile View - Improved Swipable Cards */}
          <div className="md:hidden relative w-full" style={{ height: '75vh', minHeight: '500px', maxHeight: '650px' }}>
            <div 
              className="relative w-full h-full flex items-center justify-center touch-pan-y"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              style={{ touchAction: 'pan-y' }}
            >
              <div className="relative w-full h-full max-w-sm mx-auto flex items-center justify-center">
                {rebuildFeatures.map((feature, index) => {
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
                {rebuildFeatures.map((_, index) => (
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

      {/* Package Details Section */}
      <div className="bg-black py-8 md:py-12 px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="w-full max-w-5xl mx-auto">
          <div className="backdrop-blur-xl bg-white/[0.02] border border-white/10 rounded-3xl p-6 sm:p-8 md:p-12">
            <div className="text-center mb-6 sm:mb-8">
              <h2 className="text-2xl sm:text-3xl md:text-5xl text-white mb-3 sm:mb-4">
                {rebuildPackage.title}
              </h2>
              <div className="flex items-center justify-center gap-2 text-blue-400 text-lg sm:text-xl mb-3 sm:mb-4">
                <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>{rebuildPackage.duration}</span>
              </div>
              <p className="text-lg sm:text-xl text-gray-300">
                {rebuildPackage.description}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8">
              {rebuildPackage.includes.map((item, index) => (
                <div key={index} className="flex items-start gap-3 p-3 sm:p-4 rounded-xl bg-white/[0.02] border border-white/5">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400 mt-1 flex-shrink-0" />
                  <span className="text-gray-200 text-base sm:text-lg">{item}</span>
                </div>
              ))}
            </div>

        
          </div>
        </div>
      </div>

      {/* Final CTA Section */}
      <div className="bg-black py-12 md:py-16 px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="w-full max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl md:text-5xl text-white mb-4 sm:mb-6">
            Ready to Transform Your <span className="text-blue-400">Career Story</span>?
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
            Let's work together to create a resume that opens doors and accelerates your career growth.
          </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4 sm:px-0">
              <CalendarCTA label="Request a Call back" />
            </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeRebuild;