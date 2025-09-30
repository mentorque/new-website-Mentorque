import { MessageSquare, Users, FileText, Star, CheckCircle, Clock, Target, Zap, Award, Calendar } from 'lucide-react';
import React, { useState, useEffect, useRef } from 'react';
import CalendarCTA from '@/components/CalendarCTA';
import Navbar from '@/components/Navbar';


const MockInterview = () => {
  const [animatedCards, setAnimatedCards] = useState(new Set());
  const [hasAnimated, setHasAnimated] = useState(false);
  const containerRef = useRef(null);
  
  // Swipable cards state for benefits
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);

  const interviewBenefits = [
    {
      title: "Expert Industry Mentors",
      description: "Practice with mentors from top tech companies and leading organizations",
      icon: <Award className="w-8 h-8" />
    },
    {
      title: "Real Interview Simulation",
      description: "Authentic interview environment with actual interviewers",
      icon: <Target className="w-8 h-8" />
    },
    {
      title: "Detailed Feedback",
      description: "Comprehensive feedback on performance and improvement areas",
      icon: <Zap className="w-8 h-8" />
    },
    {
      title: "Progress Tracking",
      description: "Track your improvement across all interview types",
      icon: <CheckCircle className="w-8 h-8" />
    }
  ];

  const interviewWeeks = [
    {
      week: 5,
      title: "Elevator Pitch",
      subtitle: "Perfect Your 30-Second Introduction",
      difficulty: "Beginner",
      icon: <MessageSquare className="w-8 h-8" />,
      description:
        "Master the art of introducing yourself confidently and memorably. Learn to craft a compelling elevator pitch that highlights your unique value proposition and leaves a lasting impression on recruiters and hiring managers.",
      skills: [
        "Personal branding and positioning",
        "Confidence building and presentation",
        "Storytelling techniques",
        "Value proposition articulation",
      ],
      preparation: [
        "Prepare 3-4 key achievements",
        "Practice with different time limits (30s, 60s, 90s)",
        "Record yourself for self-assessment",
        "Prepare for follow-up questions",
      ],
    },
    {
      week: 6,
      title: "Competency Interview",
      subtitle: "Master the STAR Method",
      difficulty: "Intermediate",
      icon: <Users className="w-8 h-8" />,
      description:
        "Learn to answer behavioral questions using the STAR method (Situation, Task, Action, Result). Practice with real scenarios and get feedback on your storytelling structure and impact measurement.",
      skills: [
        "STAR method mastery",
        "Behavioral question patterns",
        "Leadership and teamwork examples",
        "Conflict resolution scenarios",
      ],
      preparation: [
        "Prepare 8-10 STAR stories",
        "Practice with common behavioral questions",
        "Quantify your achievements with metrics",
        "Prepare examples for different competencies",
      ],
    },
    {
      week: 7,
      title: "Technical Interview",
      subtitle: "Coding Challenges & Problem Solving",
      difficulty: "Advanced",
      icon: <FileText className="w-8 h-8" />,
      description:
        "Tackle coding challenges, system design questions, and technical deep-dives with MAANG engineers. Practice problem-solving approaches, code optimization, and technical communication.",
      skills: [
        "Algorithm and data structures",
        "System design fundamentals",
        "Code optimization techniques",
        "Technical communication",
      ],
      preparation: [
        "Review core algorithms and data structures",
        "Practice coding on whiteboard/online platforms",
        "Prepare system design examples",
        "Practice explaining your thought process",
      ],
    },
    {
      week: 8,
      title: "Final Behavioral Round",
      subtitle: "Executive-Level Assessment",
      difficulty: "Expert",
      icon: <Star className="w-8 h-8" />,
      description:
        "Advanced behavioral assessment focusing on leadership, strategic thinking, and cultural fit. Practice with senior executives and learn to demonstrate executive presence and decision-making capabilities.",
      skills: [
        "Executive presence and leadership",
        "Strategic thinking and vision",
        "Cultural fit assessment",
        "High-stakes decision making",
      ],
      preparation: [
        "Prepare leadership and strategic examples",
        "Research company culture and values",
        "Practice executive-level communication",
        "Prepare questions for senior leadership",
      ],
    },
  ];

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

    if (isLeftSwipe && currentCardIndex < interviewBenefits.length - 1) {
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

            interviewBenefits.forEach((_, index) => {
              setTimeout(() => {
                setAnimatedCards((prev) => new Set(prev).add(index));
              }, index * 600);
            });

            setTimeout(() => {
              setAnimatedCards(new Set());
            }, interviewBenefits.length * 600 + 3000);
          }
        });
      },
      { threshold: 0.3, rootMargin: '0px 0px -100px 0px' }
    );

    if (containerRef.current) observer.observe(containerRef.current);

    return () => {
      if (containerRef.current) observer.unobserve(containerRef.current);
    };
  }, [hasAnimated, interviewBenefits.length]);

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
       <Navbar />
  

      {/* Hero Section */}
      <div className="bg-black py-8 md:py-12 px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl md:text-6xl text-white leading-tight font-bold mt-16 sm:mt-20 mb-6">
            Mock <span className="text-blue-400">Interviews</span> with Expert Mentors
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-100 leading-relaxed max-w-2xl mx-auto mb-6 sm:mb-8 px-2">
            Practice with mentors from top companies and master every interview type
          </p>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-base sm:text-lg">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
              <span className="text-gray-100 text-sm sm:text-base">Weeks 5-8 Program</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
              <span className="text-gray-100 text-sm sm:text-base">Expert Mentors</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
              <span className="text-gray-100 text-sm sm:text-base">Real Interview Simulation</span>
            </div>
          </div>
        </div>
      </div>

      {/* Interview Benefits */}
      <div className="bg-black py-8 md:py-12 px-4 sm:px-6 md:px-8 lg:px-12" ref={containerRef}>
        <div className="w-full max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-6xl text-white leading-tight mb-6 sm:mb-8">
              Why Practice with <span className="text-blue-400">Mentors?</span>
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-100 leading-relaxed max-w-2xl mx-auto px-4">
              Get insider knowledge and real-world interview experience
            </p>
          </div>

          {/* Desktop View - Grid */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {interviewBenefits.map((benefit, index) => (
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
                    {benefit.icon}
                  </div>
                  <h3 className="text-xl lg:text-2xl text-white mb-3 lg:mb-4 drop-shadow-sm">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-300 text-base lg:text-lg leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
                <div
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-400/[0.03] via-transparent to-purple-600/[0.02] transition-opacity duration-500 ${
                    animatedCards.has(index)
                      ? 'opacity-100'
                      : 'opacity-0 group-hover:opacity-100'
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
                {interviewBenefits.map((benefit, index) => {
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
                            {React.cloneElement(benefit.icon, { className: 'w-14 h-14' })}
                          </div>
                          <h3 className="text-2xl font-bold text-white mb-4 drop-shadow-lg px-2">
                            {benefit.title}
                          </h3>
                          <p className="text-gray-200 text-lg leading-relaxed px-4">
                            {benefit.description}
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
                {interviewBenefits.map((_, index) => (
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

      {/* Interview Weeks */}
      <div className="bg-black py-8 md:py-12 px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-6xl text-white mb-6">
            Interview <span className="text-blue-400">Mastery</span> Program
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-100 leading-relaxed max-w-2xl mx-auto px-4">
            Progressive skill building from basics to executive-level mastery
          </p>
        </div>

        <div className="space-y-6 sm:space-y-8 max-w-6xl mx-auto">
          {interviewWeeks.map((week, index) => (
            <div
              key={index}
              className="relative group backdrop-blur-xl bg-white/[0.02] border border-white/10 rounded-3xl hover:bg-white/[0.06] hover:border-white/20 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-400/15 overflow-hidden"
            >
              <div className="relative z-10 p-6 sm:p-8 md:p-12 flex flex-col lg:flex-row gap-6 sm:gap-8">
                {/* Left Side */}
                <div className="lg:w-1/3">
                  <div className="flex items-center gap-4 mb-4 sm:mb-6">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full flex items-center justify-center text-xl sm:text-2xl font-bold">
                      {week.week}
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-1">
                        {week.title}
                      </h3>
                      <p className="text-gray-300 text-base sm:text-lg">{week.subtitle}</p>
                    </div>
                  </div>
               
                </div>

                {/* Right Side */}
                <div className="lg:w-2/3">
                  <p className="mb-4 sm:mb-6 text-base sm:text-lg leading-relaxed text-gray-300">
                    {week.description}
                  </p>
                  <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <h4 className="font-bold mb-2 sm:mb-3 flex items-center gap-2 text-white text-base sm:text-lg">
                        <Target className="w-4 h-4 text-blue-400" />
                        Skills You'll Master
                      </h4>
                      <ul className="space-y-1 sm:space-y-2">
                        {week.skills.map((skill, skillIndex) => (
                          <li
                            key={skillIndex}
                            className="flex items-start gap-2"
                          >
                            <CheckCircle className="w-4 h-4 flex-shrink-0 mt-1 text-blue-400" />
                            <span className="text-gray-300 text-sm sm:text-base">{skill}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold mb-2 sm:mb-3 flex items-center gap-2 text-white text-base sm:text-lg">
                        <Calendar className="w-4 h-4 text-blue-400" />
                        Preparation Tips
                      </h4>
                      <ul className="space-y-1 sm:space-y-2">
                        {week.preparation.map((tip, tipIndex) => (
                          <li
                            key={tipIndex}
                            className="flex items-start gap-2"
                          >
                            <CheckCircle className="w-4 h-4 flex-shrink-0 mt-1 text-blue-400" />
                            <span className="text-gray-300 text-sm sm:text-base">{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-400/[0.04] via-transparent to-purple-600/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-60"></div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-black py-8 md:py-12 px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-6xl text-white mb-4 sm:mb-6">
            Ready to <span className="text-blue-400">Master</span> Your Interviews?
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-100 max-w-2xl mx-auto mb-6 sm:mb-8 px-4">
            Join thousands who've landed their dream jobs with expert mentor guidance
          </p>
          <CalendarCTA label="Request a call back" />
        </div>
      </div>
    </div>
  );
};

export default MockInterview;