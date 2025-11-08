import { useState, useEffect } from 'react';
import { Sparkles, Flame } from 'lucide-react';

const HERO_STATS = [
  "Work at the most unique company in the world.",
  "1 in 30 applications shortlisted",
  "Avg time to 1st interview: 11.8 days",
  "Job Offer rate increased by 3.2x"
];

const TYPING_SPEED = 45;
const HOLD_DELAY = 2000;

const CareersHero = () => {
  const stats = HERO_STATS;

  const [currentStat, setCurrentStat] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isHolding, setIsHolding] = useState(false);

  const heroImages = [
    {
      key: "dublin-sunset",
      src: "/HeroCareers-Images/Dublin%20stock.jpg",
      alt: "Sunset view of Dublin city streets",
      gridClass: "order-1 md:order-1 lg:col-start-1 lg:row-start-1 justify-self-start lg:self-end",
      frameClass:
        "w-full aspect-[3/4] xs:aspect-[5/6] sm:aspect-[4/3] md:w-56 md:aspect-[5/4] border border-white/20 shadow-[0_30px_80px_-40px_rgba(15,118,255,0.55)] -rotate-6 translate-y-1 md:-translate-y-4 hover:-translate-y-6",
      badge: {
        text: "Dublin",
        className:
          "absolute top-4 left-4 inline-flex items-center gap-1 px-3 py-1 text-xs font-medium tracking-wide uppercase rounded-full bg-white/85 text-slate-900 shadow-lg shadow-sky-500/30"
      },
      overlayGradient: "from-amber-200/10 via-transparent to-purple-400/20"
    },
    {
      key: "Apple-park",
      src: "/HeroCareers-Images/apple.png",
      alt: "Playful smiley wallpaper on bright desktop",
      gridClass: "order-2 md:order-2 lg:col-start-2 lg:row-start-1 justify-self-center lg:self-start",
      frameClass:
        "w-full aspect-[3/4] xs:aspect-[5/6] sm:aspect-[4/3] md:w-[20rem] md:aspect-[5/4] border border-white/15 shadow-[0_40px_120px_-50px_rgba(168,85,247,0.6)] rotate-1 -translate-y-2 md:-translate-y-6 hover:-translate-y-8",
      badge: {
        text: "Apple Park",
        className:
          "absolute top-5 left-5 inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-full bg-purple-500/80 text-white backdrop-blur"
      },
      overlayGradient: "from-purple-300/25 via-transparent to-pink-400/30"
    },
    {
      key: "global-crew",
      src: "/HeroCareers-Images/GoogleHq.jpg",
      alt: "Team celebrating together at Google campus",
      gridClass: "order-3 md:order-3 lg:col-start-3 lg:row-start-1 justify-self-end lg:self-end",
      frameClass:
        "w-full aspect-[3/4] xs:aspect-[5/6] sm:aspect-[4/3] md:w-[20rem] md:aspect-[5/4] border border-cyan-300/40 shadow-[0_30px_90px_-40px_rgba(6,182,212,0.7)] rotate-3 -translate-y-1 md:-translate-y-2 hover:-translate-y-6",
      badge: {
        text: "Google HQ",
        className:
          "absolute bottom-5 right-5 inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-full bg-cyan-500/80 text-white backdrop-blur"
      },
      overlayGradient: "from-cyan-200/25 via-transparent to-blue-400/25"
    },
    {
      key: "bangalore-skyline",
      src: "/HeroCareers-Images/bangalore.jpg",
      alt: "Bangalore skyline during golden hour",
      gridClass: "order-4 md:order-4 lg:col-start-1 lg:row-start-2 justify-self-center lg:self-start",
      frameClass:
        "w-full aspect-[3/4] xs:aspect-[5/6] sm:aspect-[4/3] md:w-56 md:aspect-[5/4] border border-white/15 shadow-[0_25px_70px_-45px_rgba(59,130,246,0.7)] rotate-1 translate-y-2 md:translate-y-4 hover:-translate-y-1",
      badge: {
        text: "Bangalore",
        className:
          "absolute bottom-4 right-4 inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-full bg-slate-900/80 text-white backdrop-blur"
      },
      overlayGradient: "from-purple-400/30 via-transparent to-blue-300/20"
    },
    {
      key: "mentorque-interior",
      src: "/HeroCareers-Images/Amazon%20stock.jpg",
      alt: "Modern workspace interior with warm lighting",
      gridClass: "order-5 md:order-5 lg:col-start-2 lg:row-start-2 justify-self-center",
      frameClass:
        "w-full aspect-[3/4] xs:aspect-[5/6] sm:aspect-[4/3] md:w-[22rem] md:aspect-[5/4] border border-white/15 shadow-[0_30px_90px_-40px_rgba(238,238,238,0.45)] rotate-0 translate-y-3 md:translate-y-6 hover:-translate-y-1",
      badge: {
        text: "inside amazon",
        className:
          "absolute top-5 right-5 inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-full bg-white/85 text-slate-800 backdrop-blur"
      },
      overlayGradient: "from-amber-200/20 via-transparent to-rose-200/30",
      decoration: (
        <svg
          className="pointer-events-none absolute -right-12 top-1/2 hidden h-16 w-16 -translate-y-1/2 rotate-6 text-amber-200 drop-shadow-[0_10px_25px_rgba(251,191,36,0.45)] xl:block"
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="32" cy="32" r="30" stroke="currentColor" strokeWidth="3" opacity="0.35" />
          <path
            d="M18 36C24 44 40 46 48 30"
            stroke="currentColor"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M20 22L26 28L32 22L38 28L44 22"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )
    },
    {
      key: "london-twilight",
      src: "/HeroCareers-Images/london%20stock%20photo.jpg",
      alt: "Modern cityscape from above in twilight",
      gridClass: "order-6 md:order-6 lg:col-start-3 lg:row-start-2 justify-self-end lg:self-end",
      frameClass:
        "w-full aspect-[3/4] xs:aspect-[5/6] sm:aspect-[4/3] md:w-56 md:aspect-[5/4] border border-white/20 shadow-[0_35px_90px_-45px_rgba(56,189,248,0.7)] rotate-2 translate-y-2 md:translate-y-5 hover:-translate-y-1",
      badge: {
        text: "London",
        className:
          "absolute bottom-4 left-4 inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-full bg-slate-900/80 text-white backdrop-blur"
      },
      overlayGradient: "from-blue-300/25 via-transparent to-indigo-400/25"
    }
  ];

  const renderFrame = (frame) => (
    <div key={frame.key} className={`${frame.gridClass} pointer-events-auto relative`}>
      <div className={`relative overflow-hidden rounded-3xl transition-transform duration-700 ease-out group ${frame.frameClass}`}>
        <div className="absolute inset-0 bg-gradient-to-br from-black/10 via-black/0 to-black/40 opacity-30 transition-opacity duration-500 group-hover:opacity-60" />
        <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${frame.overlayGradient} opacity-0 group-hover:opacity-80 transition-opacity duration-500`} />
        <img
          src={frame.src}
          alt={frame.alt}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.08]"
          loading="lazy"
        />
        {frame.badge ? (
          <div className={`${frame.badge.className} shadow-[0_10px_25px_-12px_rgba(0,0,0,0.55)]`}>{frame.badge.text}</div>
        ) : null}
        <div className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-white/15 group-hover:ring-white/25 transition-all duration-500" />
        <div className="pointer-events-none absolute -inset-[1px] rounded-[inherit] bg-gradient-to-tr from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-screen" />
      </div>
      {frame.decoration ? frame.decoration : null}
    </div>
  );
  
  useEffect(() => {
    const fullText = stats[currentStat];
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    if (!isHolding && displayText.length < fullText.length) {
      timeoutId = setTimeout(() => {
        setDisplayText(fullText.slice(0, displayText.length + 1));
      }, TYPING_SPEED);
      return () => clearTimeout(timeoutId);
    }

    if (!isHolding && displayText.length === fullText.length) {
      setIsHolding(true);
      return;
    }

    if (isHolding) {
      timeoutId = setTimeout(() => {
        setDisplayText('');
        setIsHolding(false);
        setCurrentStat((prev) => (prev + 1) % stats.length);
      }, HOLD_DELAY);
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [displayText, isHolding, currentStat, stats.length]);

  return (
    <div className="relative w-full min-h-[60vh] sm:min-h-[70vh] lg:min-h-[90vh] xl:min-h-screen bg-black overflow-hidden py-8 sm:py-16 md:py-20">
      {/* Large "JOB" text background */}
      <div
        className="hidden sm:block absolute top-4 left-4 text-yellow-100 font-black text-[150px] lg:text-[200px] leading-none opacity-30 select-none tracking-[0.06em] drop-shadow-[0_12px_32px_rgba(255,255,255,0.08)]"
        style={{ fontFamily: 'Arial Black, sans-serif' }}
      >
        JOB
      </div>
      
      {/* Sparkles decoration - left */}
      <div className="absolute bottom-20 left-12 z-20 rounded-full border border-yellow-200/35 bg-yellow-200/18 p-5 shadow-[0_40px_95px_-35px_rgba(250,204,21,0.7)] transform rotate-3">
        <Sparkles className="w-14 h-14 md:w-16 md:h-16 text-yellow-200 drop-shadow-[0_16px_32px_rgba(250,204,21,0.35)]" fill="currentColor" />
      </div>
      
      {/* Fire emoji - top right */}
      <div className="hidden sm:block absolute top-6 right-16 sm:top-6 sm:right-20 md:top-4 md:right-28 z-30 transform -rotate-3">
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-red-500/30 blur-[24px]" />
          <Flame className="relative h-16 w-16 sm:h-20 sm:w-20 md:h-[5rem] md:w-[5rem] text-red-500 drop-shadow-[0_20px_50px_rgba(239,68,68,0.5)]" fill="currentColor" />
          <div className="absolute inset-0 flex items-center justify-center">
            <svg className="h-10 w-10 sm:h-12 sm:w-12" viewBox="0 0 24 24" fill="none">
              <path d="M12 3C8.5 3 7 6 7 8.5C7 9.5 7.5 10.5 8 11C6.5 11.5 5 13 5 15.5C5 18.5 7.5 21 12 21C16.5 21 19 18.5 19 15.5C19 13 17.5 11.5 16 11C16.5 10.5 17 9.5 17 8.5C17 6 15.5 3 12 3Z" fill="#ff6b35"/>
              <ellipse cx="12" cy="8" rx="1.5" ry="2" fill="#ffd700"/>
            </svg>
          </div>
        </div>
      </div>

      {/* Central ambience to fill negative space */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10">
        <div className="relative h-32 w-32 sm:h-40 sm:w-40 md:h-64 md:w-64">
          <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,rgba(192,132,252,0.4),rgba(59,130,246,0)_75%)] blur-3xl" />
          <div className="absolute inset-4 md:inset-6 rounded-full border border-white/15 opacity-40" />
          <div className="absolute inset-2 md:inset-4 rounded-full border border-white/30 border-dashed opacity-50 animate-[spin_32s_linear_infinite]" />
          <div className="absolute inset-10 md:inset-12 rounded-full bg-[conic-gradient(from_120deg_at_50%_50%,rgba(255,255,255,0.25),rgba(255,255,255,0)_60%)] opacity-70 animate-[spin_48s_linear_infinite]" />
          <div className="absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-purple-400 via-pink-400 to-sky-400 opacity-70 shadow-[0_0_45px_15px_rgba(192,132,252,0.35)]" />
        </div>
      </div>
      
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
        <div className="pointer-events-auto grid w-full max-w-6xl grid-cols-3 grid-rows-2 gap-1.5 px-3 sm:px-6 sm:gap-4 md:gap-6 lg:grid-cols-3 lg:grid-rows-2 lg:gap-x-12 lg:gap-y-10 xl:px-12">
          {heroImages.map(renderFrame)}
        </div>
      </div>
      
      {/* Central stat display */}
      <div className="absolute top-1/2 left-1/2 z-20 w-full -translate-x-1/2 -translate-y-1/2 px-6">
        <div className="relative mx-auto w-full max-w-[50rem] overflow-hidden rounded-3xl border border-white/10 bg-white/95 px-10 py-6 shadow-[0_35px_110px_-50px_rgba(255,255,255,0.8)]">
          <div className="absolute inset-0 bg-gradient-to-br from-white via-white/90 to-white/80 opacity-80" />
          <div className="relative flex items-center space-x-3 text-gray-500">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
            </svg>
            <div className="flex items-center text-lg sm:text-xl md:text-2xl font-light text-gray-700">
              <span className="relative pr-2">
                {displayText}
                <span className="absolute right-0 top-1/2 h-[1.4em] w-[2px] -translate-y-1/2 bg-purple-500/80 animate-pulse" />
              </span>
            </div>
          </div>
          {/* Progress dots */}
          <div className="relative mt-4 flex justify-center space-x-2">
            {stats.map((_, index) => (
              <div
                key={index}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentStat ? 'w-8 bg-purple-500' : 'w-2 bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareersHero;