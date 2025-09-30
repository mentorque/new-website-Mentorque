import { CheckCircle, Star, Clock, Target, Code, Globe, Palette, FileText, Sparkles, Mail, Users } from 'lucide-react';
import React, { useState, useEffect, useRef } from 'react';
import Navbar from '@/components/Navbar';
import CalendarCTA from '@/components/CalendarCTA';


const PortfolioTemplates = () => {
  const [animatedCards, setAnimatedCards] = useState(new Set());
  const [hasAnimated, setHasAnimated] = useState(false);
  const [animatedAICards, setAnimatedAICards] = useState(new Set());
  const [hasAnimatedAI, setHasAnimatedAI] = useState(false);
  const containerRef = useRef(null);
  const aiToolsRef = useRef(null);
  
  // Swipable cards state for Portfolio Features
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);

  // Swipable cards state for AI Tools
  const [currentAICardIndex, setCurrentAICardIndex] = useState(0);
  const [aiTouchStart, setAITouchStart] = useState(0);
  const [aiTouchEnd, setAITouchEnd] = useState(0);
  const [isAIDragging, setIsAIDragging] = useState(false);
  const [aiDragOffset, setAIDragOffset] = useState(0);

  const aiToolFeatures = [
    {
      title: "Keyword Analysis",
      description: "Analyze job descriptions and optimize your resume with AI-powered keyword matching",
      icon: <Target className="w-8 h-8" />
    },
    {
      title: "Experience Enhancement",
      description: "Transform your experience into compelling, quantified achievements",
      icon: <Sparkles className="w-8 h-8" />
    },
    {
      title: "Cover Letter Generator",
      description: "Create personalized cover letters tailored to each job application",
      icon: <Mail className="w-8 h-8" />
    },
    {
      title: "HR Contact Finder",
      description: "Find and connect with HR professionals and hiring managers instantly",
      icon: <Users className="w-8 h-8" />
    }
  ];

  const portfolioFeatures = [
    {
      title: "Custom Design",
      description: "Personalized layouts that reflect your unique brand and style",
      icon: <Palette className="w-8 h-8" />
    },
    {
      title: "Responsive Development",
      description: "Mobile-first designs that look perfect on all devices",
      icon: <Code className="w-8 h-8" />
    },
    {
      title: "SEO Optimization",
      description: "Built for search engines to help recruiters find you",
      icon: <Target className="w-8 h-8" />
    },
    {
      title: "Domain & Hosting",
      description: "Professional domain setup and reliable hosting included",
      icon: <Globe className="w-8 h-8" />
    }
  ];

  const portfolioPackage = {
    title: "Professional Portfolio Development",
    duration: "5-7 days",
    description: "Complete portfolio website with custom design and professional hosting",
    includes: [
      "Custom Portfolio website",
      "Mobile-responsive Development",
      "Professional domain setup",
      "1-year Hosting",
      "Keyword optimization",
      "Contact form",
      "Portfolio template selection",
      "Content Organization guidance",
      "Launch support & training"
    ]
  };

  const aiToolPackageFeatures = [
    "Keywords extraction",
    "Experience analysis",
    "HR lookup",
    "End-to-end job assist",
    "Job description analysis",
    "Resume-based job search",
    "LinkedIn integration",
    "Cover Letter Generation"
  ];

  // Portfolio Features swipe handlers
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

    if (isLeftSwipe && currentCardIndex < portfolioFeatures.length - 1) {
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

  // AI Tools swipe handlers
  const handleAITouchStart = (e) => {
    setAITouchStart(e.targetTouches[0].clientX);
    setIsAIDragging(true);
    setAIDragOffset(0);
  };

  const handleAITouchMove = (e) => {
    if (!isAIDragging) return;
    const currentTouch = e.targetTouches[0].clientX;
    const offset = currentTouch - aiTouchStart;
    setAIDragOffset(offset);
    setAITouchEnd(currentTouch);
  };

  const handleAITouchEnd = () => {
    if (!isAIDragging) return;
    
    const distance = aiTouchStart - aiTouchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && currentAICardIndex < aiToolFeatures.length - 1) {
      setCurrentAICardIndex(prev => prev + 1);
    } else if (isRightSwipe && currentAICardIndex > 0) {
      setCurrentAICardIndex(prev => prev - 1);
    }
    
    setIsAIDragging(false);
    setAIDragOffset(0);
  };

  const goToAICard = (index) => {
    setCurrentAICardIndex(index);
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

    document.addEventListener('touchstart', preventZoom, { passive: false });
    document.addEventListener('touchmove', preventDoubleTapZoom, { passive: false });
    document.addEventListener('gesturestart', (e) => e.preventDefault());
    document.addEventListener('gesturechange', (e) => e.preventDefault());
    document.addEventListener('gestureend', (e) => e.preventDefault());

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

  // Animation observer for Portfolio Features
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            
            portfolioFeatures.forEach((_, index) => {
              setTimeout(() => {
                setAnimatedCards(prev => new Set(prev).add(index));
              }, index * 600);
            });

            setTimeout(() => {
              setAnimatedCards(new Set());
            }, portfolioFeatures.length * 600 + 3000);
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
  }, [hasAnimated, portfolioFeatures.length]);

  // Animation observer for AI Tools
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimatedAI) {
            setHasAnimatedAI(true);
            
            aiToolFeatures.forEach((_, index) => {
              setTimeout(() => {
                setAnimatedAICards(prev => new Set(prev).add(index));
              }, index * 600);
            });

            setTimeout(() => {
              setAnimatedAICards(new Set());
            }, aiToolFeatures.length * 600 + 3000);
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: '0px 0px -100px 0px'
      }
    );

    if (aiToolsRef.current) {
      observer.observe(aiToolsRef.current);
    }

    return () => {
      if (aiToolsRef.current) {
        observer.unobserve(aiToolsRef.current);
      }
    };
  }, [hasAnimatedAI, aiToolFeatures.length]);

  return (
    <div className="min-h-screen bg-black overflow-x-hidden">
      <style jsx global>{`
        @media (max-width: 768px) {
          html, body {
            max-width: 100vw;
            overflow-x: hidden;
            touch-action: pan-y;
            -webkit-user-scalable: no;
            user-scalable: no;
          }
          
          * {
            -webkit-text-size-adjust: 100%;
            text-size-adjust: 100%;
          }
        }
      `}</style>

      <Navbar />

      {/* Hero Section */}
      <div className="bg-black py-8 md:py-12 px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="w-full max-w-7xl mx-auto">
        
        </div>
      </div>

      {/* AI-Powered Job Application Tools Section */}
      <div className="bg-black py-8 md:py-12 px-4 sm:px-6 md:px-8 lg:px-12" ref={aiToolsRef}>
        <div className="w-full max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-6xl text-white leading-tight mb-6 sm:mb-8">
              AI-Powered <span className="text-purple-400">Job Application Tools</span>
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-100 leading-relaxed max-w-2xl mx-auto px-4">
              Intelligent features to streamline your job search
            </p>
          </div>

          {/* Desktop View - Grid */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {aiToolFeatures.map((feature, index) => (
              <div 
                key={index} 
                className={`relative group backdrop-blur-xl bg-white/[0.02] border border-white/10 rounded-2xl p-6 lg:p-8 text-center transition-all duration-500 before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-br before:from-white/[0.08] before:via-transparent before:to-transparent before:transition-opacity before:duration-500 ${
                  animatedAICards.has(index) 
                    ? 'bg-white/[0.05] border-white/20 shadow-2xl shadow-purple-400/10 before:opacity-100' 
                    : 'hover:bg-white/[0.05] hover:border-white/20 hover:shadow-2xl hover:shadow-purple-400/10 before:opacity-0 hover:before:opacity-100'
                }`}
              >
                <div className="relative z-10">
                  <div className="text-purple-400 mb-4 lg:mb-6 flex justify-center drop-shadow-lg">
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
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-400/[0.03] via-transparent to-blue-600/[0.02] transition-opacity duration-500 ${
                    animatedAICards.has(index) ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                  }`}
                ></div>
              </div>
            ))}
          </div>

          {/* Mobile View - Swipable Cards */}
          <div className="md:hidden relative w-full" style={{ height: '75vh', minHeight: '500px', maxHeight: '650px' }}>
            <div 
              className="relative w-full h-full flex items-center justify-center touch-pan-y"
              onTouchStart={handleAITouchStart}
              onTouchMove={handleAITouchMove}
              onTouchEnd={handleAITouchEnd}
              style={{ touchAction: 'pan-y' }}
            >
              <div className="relative w-full h-full max-w-sm mx-auto flex items-center justify-center">
                {aiToolFeatures.map((feature, index) => {
                  const position = index - currentAICardIndex;
                  const isActive = index === currentAICardIndex;
                  const isPrev = index === currentAICardIndex - 1;
                  const isNext = index === currentAICardIndex + 1;
                  
                  let transform = 'translateX(0%) scale(1)';
                  let opacity = 0;
                  let zIndex = 0;
                  
                  if (isActive) {
                    transform = `translateX(${aiDragOffset}px) scale(1)`;
                    opacity = 1;
                    zIndex = 30;
                  } else if (isPrev) {
                    transform = `translateX(calc(-100% + ${aiDragOffset}px)) scale(0.9)`;
                    opacity = 0.7 - Math.min(Math.abs(aiDragOffset) / 1000, 0.5);
                    zIndex = 20;
                  } else if (isNext) {
                    transform = `translateX(calc(100% + ${aiDragOffset}px)) scale(0.9)`;
                    opacity = 0.7 - Math.min(Math.abs(aiDragOffset) / 1000, 0.5);
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
                      <div className="relative w-full h-full backdrop-blur-xl bg-white/[0.06] border-2 border-white/25 rounded-3xl p-6 shadow-2xl shadow-purple-400/20 flex flex-col justify-center items-center text-center">
                        <div className="relative z-10 flex flex-col items-center justify-center h-full">
                          <div className="text-purple-400 mb-6 drop-shadow-2xl">
                            {React.cloneElement(feature.icon, { className: 'w-14 h-14' })}
                          </div>
                          <h3 className="text-2xl font-bold text-white mb-4 drop-shadow-lg px-2">
                            {feature.title}
                          </h3>
                          <p className="text-gray-200 text-lg leading-relaxed px-4">
                            {feature.description}
                          </p>
                        </div>
                        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-400/[0.08] via-transparent to-blue-600/[0.05]"></div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Card Indicators */}
              <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-40">
                {aiToolFeatures.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToAICard(index)}
                    className={`transition-all duration-300 rounded-full ${
                      index === currentAICardIndex 
                        ? 'w-6 h-2 bg-purple-400' 
                        : 'w-2 h-2 bg-white/40'
                    }`}
                    aria-label={`Go to AI tool card ${index + 1}`}
                  />
                ))}
              </div>

              {/* Swipe Hint */}
              {currentAICardIndex === 0 && aiDragOffset === 0 && (
                <div className="absolute -bottom-8 left-0 right-0 text-center z-30">
                  <p className="text-gray-400 text-sm animate-pulse">Swipe to explore →</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Portfolio Features */}
      <div className="bg-black py-8 md:py-12 px-4 sm:px-6 md:px-8 lg:px-12" ref={containerRef}>
        <div className="w-full max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-6xl text-white leading-tight mb-6 sm:mb-8">
              Portfolio <span className="text-blue-400">Development</span>
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-100 leading-relaxed max-w-2xl mx-auto px-4">
              Build a stunning portfolio that showcases your skills and projects
            </p>
          </div>

          {/* Desktop View - Grid */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {portfolioFeatures.map((feature, index) => (
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
                {portfolioFeatures.map((feature, index) => {
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
                {portfolioFeatures.map((_, index) => (
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

      {/* Service Cards Section */}
      <div className="bg-black py-8 md:py-12 px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="w-full max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-6xl text-white leading-tight mb-6">
              Our Portfolio <span className="text-blue-400">Service</span>
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-100 leading-relaxed max-w-2xl mx-auto px-4">
              Complete solution to showcase your professional brand
            </p>
          </div>

          <div className="flex flex-col md:flex-row justify-center items-stretch gap-6 sm:gap-8">
            
            {/* Portfolio Card */}
            <div className="flex-1">
              <div className="relative group backdrop-blur-xl bg-white/[0.03] border border-white/10 rounded-3xl hover:bg-white/[0.06] hover:border-white/20 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-400/15 overflow-hidden h-full">
                <div className="relative z-10 p-6 sm:p-8 md:p-12 flex flex-col h-full">
                  <div className="text-center mb-6 sm:mb-8">
                    <h3 className="text-2xl sm:text-3xl md:text-4xl text-white mb-3 sm:mb-4">
                      {portfolioPackage.title}
                    </h3>
                    <div className="text-blue-400 flex items-center justify-center gap-2 text-base sm:text-lg">
                      <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
                      {portfolioPackage.duration}
                    </div>
                  </div>

                  <p className="text-gray-100 mb-6 sm:mb-8 text-center text-lg sm:text-xl leading-relaxed">{portfolioPackage.description}</p>

                  <div className="space-y-4 sm:space-y-6 mb-6 sm:mb-8 flex-grow">
                    {portfolioPackage.includes.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex items-start gap-3 sm:gap-4">
                        <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400 flex-shrink-0 mt-1 drop-shadow-lg" />
                        <span className="text-gray-100 text-base sm:text-lg leading-relaxed">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-400/[0.04] via-transparent to-purple-600/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-60"></div>
              </div>
            </div>

            {/* AI Tool Card */}
            <div className="flex-1">
              <div className="relative group backdrop-blur-xl bg-white/[0.03] border border-white/10 rounded-3xl hover:bg-white/[0.06] hover:border-white/20 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-400/15 overflow-hidden h-full">
                <div className="relative z-10 p-6 sm:p-8 md:p-12 flex flex-col h-full">
                  <div className="text-center mb-6 sm:mb-8">
                    <h3 className="text-2xl sm:text-3xl md:text-4xl text-white mb-3 sm:mb-4">
                      AI Job Assistant
                    </h3>
                    <div className="text-purple-400 flex items-center justify-center gap-2 text-base sm:text-lg">
                      Integrated with LinkedIn
                    </div>
                  </div>

                  <p className="text-gray-100 mb-6 sm:mb-8 text-center text-lg sm:text-xl leading-relaxed">
                    AI-powered features to supercharge your job search
                  </p>

                  <div className="space-y-4 sm:space-y-6 mb-6 sm:mb-8 flex-grow">
                    {aiToolPackageFeatures.map((feature, index) => (
                      <div key={index} className="flex items-start gap-3 sm:gap-4">
                        <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400 flex-shrink-0 mt-1 drop-shadow-lg" />
                        <span className="text-gray-100 text-base sm:text-lg leading-relaxed">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-400/[0.04] via-transparent to-blue-600/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-60"></div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-black py-8 md:py-12 px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="w-full max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-6xl text-white leading-tight mb-6 sm:mb-8">
            Ready to Build Your <span className="text-blue-400">Portfolio?</span>
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-100 leading-relaxed max-w-2xl mx-auto mb-6 sm:mb-8 px-4">
            Showcase your skills with a professional portfolio that gets you noticed
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <CalendarCTA label="Request a Call back" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioTemplates;