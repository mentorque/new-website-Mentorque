import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Linkedin } from "lucide-react";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  photo: string;
  collegeImage: string;
  companyImage: string;
  collegeName?: string;
  companyName?: string;
  linkedinUrl?: string;
}

const teamMembers: TeamMember[] = [
  {
    id: "raajit",
    name: "Raajit",
    role: "Founder",
    photo: "/Team Pics/Raajit.jpg",
    collegeImage: "/Team Colleges/UCC (Raajit).png",
    companyImage: "/Team Companies/Vico Advirsory (Raajit).png",
    collegeName: "UCC",
    companyName: "Vico Advisory",
  },
  {
    id: "shikhar",
    name: "Shikhar",
    role: "Growth Head",
    photo: "/Team Pics/Shikhar.jpg",
    collegeImage: "/Team Colleges/IIT Banaras (Shikhar).png",
    companyImage: "/Team Companies/Aramya (Shikhar).png",
    collegeName: "IIT Banaras",
    companyName: "Aramya",
  },
  {
    id: "shresth",
    name: "Shresth",
    role: "Head of Ops",
    photo: "/Team Pics/Shresth.jpg",
    collegeImage: "/Team Colleges/IIT-Kharagpur (Shresth).png",
    companyImage: "/Team Companies/OLA (Shresth).png",
    collegeName: "IIT Kharagpur",
    companyName: "OLA",
  },
  {
    id: "nyai",
    name: "Nyai",
    role: "Leads UI/UX and Marketing",
    photo: "/Team Pics/Nyai.jpg",
    collegeImage: "/Team Colleges/Pearl Academy (Nyai).jpg",
    companyImage: "/Team Companies/Myntra (Nyai).png",
    collegeName: "Pearl Academy",
    companyName: "Myntra",
  },
  {
    id: "umang",
    name: "Umang",
    role: "Creative Designer",
    photo: "/Team Pics/Umang.jpg",
    collegeImage: "/Team Colleges/Alison Learnings (Umang).png",
    companyImage: "/Team Companies/Autheo (Umang).png",
    collegeName: "Alison Learnings",
    companyName: "Autheo",
  },
  {
    id: "anchita",
    name: "Anchita",
    role: "Marketing Lead",
    photo: "/Team Pics/Anchita.jpg",
    collegeImage: "/Team Colleges/UCD (Anchita).png",
    companyImage: "/Team Companies/TISS (Anchita).png",
    collegeName: "UCD",
    companyName: "TISS",
  },
  {
    id: "gokul",
    name: "Gokul",
    role: "Leads Tech",
    photo: "/Team Pics/Gokul.jpg",
    collegeImage: "/Team Colleges/Dayananda sagar (Gokul).png",
    companyImage: "/Team Companies/Mentorque (Gokul).png",
    collegeName: "Dayananda Sagar",
    companyName: "Mentorque",
  },
];

const quotes = [
  "We're not just building a product; we're building futures.",
  "Unlocking possibilities one day at a time.",
  "Empowering the next generation of professionals.",
];

// College full name mappings
const collegeFullNames: Record<string, string> = {
  "UCC": "University College Cork",
  "IIT Banaras": "IIT Banaras",
  "IIT Kharagpur": "IIT Kharagpur",
  "Pearl Academy": "Pearl Academy",
  "Alison Learnings": "Alison Learnings",
  "UCD": "University College Dublin",
  "Dayananda Sagar": "Dayananda Sagar College of Engineering",
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const TeamMemberCard = ({ member, index, size = "normal" }: { member: TeamMember; index: number; size?: "normal" | "large" }) => {
  const isLarge = size === "large";
  
  return (
    <motion.div
      variants={itemVariants}
      className="relative group h-full"
    >
      <div className={`relative w-full aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-gray-900 to-black border border-gray-800/50 shadow-2xl group-hover:border-blue-500/50 group-hover:shadow-blue-500/20 transition-all duration-500`} style={{ transform: 'scale(0.75)', transformOrigin: 'center' }}>
        {/* Primary Photo */}
        <div className="absolute inset-0">
          <img
            src={member.photo}
            alt={member.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "/placeholder.svg";
            }}
          />
          {/* Dark overlay for better text contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        </div>

        {/* Name and Role - Always visible at bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 z-20">
          <div className="bg-gradient-to-r from-black/95 to-black/90 rounded-2xl p-4 sm:p-5 border border-white/10 shadow-xl backdrop-blur-sm">
            <h3 className={`${isLarge ? 'text-2xl sm:text-3xl' : 'text-xl sm:text-2xl'} font-bold text-white mb-1.5 tracking-tight`}>{member.name}</h3>
            <div className="flex items-center gap-2.5 mb-2.5 flex-wrap">
              <p className="text-gray-300 text-base sm:text-lg font-medium uppercase tracking-wider">{member.role}</p>
              {member.collegeName && (
                <>
                  <span className="text-gray-500 text-base">•</span>
                  <p className="text-gray-300 text-base sm:text-lg font-medium capitalize tracking-normal">
                    {collegeFullNames[member.collegeName] || member.collegeName}
                  </p>
                </>
              )}
            </div>
            {member.linkedinUrl && (
              <a
                href={member.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-blue-600 hover:bg-blue-700 border border-blue-400/30 shadow-lg transition-all duration-300 hover:scale-110"
              >
                <Linkedin size={18} className="text-white" />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const QuoteCard = ({ quote, index }: { quote: string; index: number }) => {
  return (
    <motion.div
      variants={itemVariants}
      className="relative group h-full"
    >
      <div className="relative w-full aspect-square rounded-3xl bg-gradient-to-br from-gray-900 via-gray-800 to-black border border-gray-700/50 shadow-2xl group-hover:border-blue-500/50 group-hover:shadow-blue-500/20 transition-all duration-500 flex items-center justify-center p-8 sm:p-10" style={{ transform: 'scale(0.75)', transformOrigin: 'center' }}>
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-indigo-600/20 opacity-40 group-hover:opacity-60 transition-opacity duration-500" />
        <p className="text-white text-lg sm:text-xl lg:text-2xl font-semibold text-center leading-relaxed group-hover:scale-105 transition-transform duration-500 relative z-10 tracking-tight">
          "{quote}"
        </p>
        <div className="absolute top-6 left-6 text-6xl text-white/10 font-serif select-none font-bold">"</div>
        <div className="absolute bottom-6 right-6 text-6xl text-white/10 font-serif select-none font-bold">"</div>
      </div>
    </motion.div>
  );
};

const WideQuoteCard = ({ quote }: { quote: string }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative group w-full"
    >
      <div className="relative w-full aspect-[3/1] rounded-3xl bg-gradient-to-br from-gray-900 via-gray-800 to-black border border-gray-700/50 shadow-2xl group-hover:border-blue-500/50 group-hover:shadow-blue-500/20 transition-all duration-500 flex items-center justify-center p-8 sm:p-12">
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-indigo-600/20 opacity-40 group-hover:opacity-60 transition-opacity duration-500" />
        <p className="text-white text-2xl sm:text-3xl lg:text-4xl font-semibold text-center leading-relaxed group-hover:scale-105 transition-transform duration-500 relative z-10 tracking-tight px-8">
          "{quote}"
        </p>
        <div className="absolute top-6 left-8 text-7xl text-white/10 font-serif select-none font-bold">"</div>
        <div className="absolute bottom-6 right-8 text-7xl text-white/10 font-serif select-none font-bold">"</div>
      </div>
    </motion.div>
  );
};

const Team = () => {
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

  // Create dynamic grid layout with quotes interspersed for visual interest
  const gridItems: Array<{ type: "member" | "quote"; data: TeamMember | string; index: number }> = [];
  
  // First row: Member, Member, Quote
  gridItems.push({ type: "member", data: teamMembers[0], index: 0 }); // Raajit
  gridItems.push({ type: "member", data: teamMembers[1], index: 1 }); // Shikhar
  gridItems.push({ type: "quote", data: quotes[0], index: 0 });
  
  // Second row: Member, Quote, Member
  gridItems.push({ type: "member", data: teamMembers[2], index: 2 }); // Shresth
  gridItems.push({ type: "quote", data: quotes[1], index: 1 });
  gridItems.push({ type: "member", data: teamMembers[5], index: 5 }); // Anchita
  
  // Third row: Nyai, Umang, Gokul (all three together)
  gridItems.push({ type: "member", data: teamMembers[3], index: 3 }); // Nyai
  gridItems.push({ type: "member", data: teamMembers[4], index: 4 }); // Umang
  gridItems.push({ type: "member", data: teamMembers[6], index: 6 }); // Gokul

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b1120] via-[#05070d] to-[#020204] text-white relative overflow-hidden">
      {/* Abstract background elements with lines */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Abstract gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/2 w-80 h-80 bg-indigo-500/5 rounded-full blur-3xl"></div>
        
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/10 via-transparent to-purple-950/10"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
        
        {/* Abstract Lines Background - SVG for crisp rendering */}
        <svg 
          className="absolute inset-0 w-full h-full pointer-events-none" 
          viewBox="0 0 100 100" 
          preserveAspectRatio="none" 
          xmlns="http://www.w3.org/2000/svg"
          style={{ opacity: 0.3 }}
        >
          {/* 2 thick abstract lines */}
          <path d="M0,40 Q25,35 50,40 T100,40" stroke="rgba(59, 130, 246, 0.5)" strokeWidth="1.5" fill="none" />
          <line x1="0" y1="0" x2="100" y2="100" stroke="rgba(139, 92, 246, 0.4)" strokeWidth="1.2" />
        </svg>
        
        {/* Noise texture */}
        <div 
          className="absolute inset-0 opacity-[0.02]" 
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat',
            backgroundSize: '200px 200px'
          }}
        ></div>
      </div>
      
      <Navbar />
      <main className="pt-24 pb-16 relative z-10">
        {/* Hero Section */}
        <section className="container mx-auto px-2 sm:px-4 lg:px-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
              Team of Dreamers, Doers, and Everything in Between
            </h1>
            <p className="text-base sm:text-lg text-gray-300 max-w-xl mx-auto leading-relaxed">
              Meet the brilliant minds behind Mentorque. From prestigious colleges to leading companies, 
              we bring diverse expertise to transform your career journey.
            </p>
          </motion.div>
        </section>

        {/* Team Grid */}
        <section className="container mx-auto px-0 sm:px-1 lg:px-2">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0"
          >
            {gridItems.map((item, idx) => (
              <div key={`${item.type}-${idx}`} className="w-full -m-4">
                {item.type === "member" ? (
                  <TeamMemberCard member={item.data as TeamMember} index={idx} />
                ) : (
                  <QuoteCard quote={item.data as string} index={idx} />
                )}
              </div>
            ))}
          </motion.div>
        </section>

        {/* Additional Quote Section */}
        <section className="container mx-auto px-2 sm:px-4 lg:px-6 mt-8">
          <div className="max-w-5xl mx-auto">
            <WideQuoteCard quote={quotes[2]} />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Team;