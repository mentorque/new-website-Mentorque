import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Linkedin, GraduationCap, Briefcase } from "lucide-react";

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
    role: "Lead UI/UX and Marketing",
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

const TeamMemberCard = ({ member, index }: { member: TeamMember; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      variants={itemVariants}
      className="relative group"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="relative w-full aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-gray-900 to-black border-2 border-gray-800 shadow-2xl group-hover:border-blue-500/50 group-hover:shadow-blue-500/20 transition-all duration-500">
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

        {/* College and Company Badges - visible on hover */}
        <motion.div
          className="absolute top-12 left-0 right-0 flex items-center justify-center gap-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 px-4 pb-32"
          initial={false}
          animate={{
            opacity: isHovered ? 1 : 0,
            y: isHovered ? 0 : 20,
          }}
          transition={{ duration: 0.4 }}
        >
          {/* College Badge */}
          <div className="relative group/badge">
            <div className="bg-black/95 backdrop-blur-sm px-5 py-4 rounded-2xl border-2 border-white/30 shadow-2xl transform group-hover/badge:scale-105 transition-all duration-300 hover:border-white/50 min-w-[180px]">
              <div className="flex flex-col items-center gap-3">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg">
                    <GraduationCap size={16} className="text-white" />
                  </div>
                  <span className="text-white text-xs font-bold uppercase tracking-wide">College</span>
                </div>
                <div className="w-28 h-28 relative bg-white rounded-lg p-3 shadow-md border border-gray-200 flex items-center justify-center">
                  <img
                    src={member.collegeImage}
                    alt={`${member.name} - ${member.collegeName}`}
                    className="max-w-full max-h-full object-contain"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "/placeholder.svg";
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Company Badge */}
          <div className="relative group/badge">
            <div className="bg-black/95 backdrop-blur-sm px-5 py-4 rounded-2xl border-2 border-white/30 shadow-2xl transform group-hover/badge:scale-105 transition-all duration-300 hover:border-white/50 min-w-[180px]">
              <div className="flex flex-col items-center gap-3">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg">
                    <Briefcase size={16} className="text-white" />
                  </div>
                  <span className="text-white text-xs font-bold uppercase tracking-wide">Company</span>
                </div>
                <div className="w-28 h-28 relative bg-white rounded-lg p-3 shadow-md border border-gray-200 flex items-center justify-center">
                  <img
                    src={member.companyImage}
                    alt={`${member.name} - ${member.companyName}`}
                    className="max-w-full max-h-full object-contain"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "/placeholder.svg";
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Name and Role - Always visible at bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 z-20">
          <div className="bg-gradient-to-r from-black/95 to-black/90 rounded-2xl p-5 border-2 border-white/20 shadow-xl">
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2 tracking-tight">{member.name}</h3>
            <p className="text-gray-300 text-sm font-medium uppercase tracking-wider mb-3">{member.role}</p>
            {member.linkedinUrl && (
              <a
                href={member.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-700 border-2 border-blue-400/50 shadow-lg shadow-blue-500/30 mt-2 transition-all duration-300 hover:scale-110 hover:shadow-blue-500/50"
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
      className="relative h-full min-h-[250px] rounded-3xl bg-gradient-to-br from-gray-900 via-gray-800 to-black border-2 border-gray-700 p-8 sm:p-10 flex items-center justify-center group hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-500"
    >
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-indigo-600/20 opacity-40 group-hover:opacity-60 transition-opacity duration-500" />
      <p className="text-white text-lg sm:text-xl lg:text-2xl font-semibold text-center leading-relaxed group-hover:scale-105 transition-transform duration-500 relative z-10 tracking-tight">
        "{quote}"
      </p>
      <div className="absolute top-6 left-6 text-6xl sm:text-7xl text-white/10 font-serif select-none font-bold">"</div>
      <div className="absolute bottom-6 right-6 text-6xl sm:text-7xl text-white/10 font-serif select-none font-bold">"</div>
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
  
  // Third row: Nyai, Umang, Gokul (all three together - MUST be consecutive)
  gridItems.push({ type: "member", data: teamMembers[3], index: 3 }); // Nyai - position 7
  gridItems.push({ type: "member", data: teamMembers[4], index: 4 }); // Umang - position 8
  gridItems.push({ type: "member", data: teamMembers[6], index: 6 }); // Gokul - position 9

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b1120] via-[#05070d] to-[#020204] text-white relative overflow-hidden">
      {/* Subtle abstract background elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Subtle radial gradients */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/2 w-80 h-80 bg-indigo-500/5 rounded-full blur-3xl"></div>
        
        {/* Subtle gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/10 via-transparent to-purple-950/10"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
        
        {/* Very subtle noise texture */}
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
      <main className="pt-24 sm:pt-28 lg:pt-32 pb-20 relative z-10">
        {/* Hero Section */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 mb-16 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
              Team of Dreamers, Doers, and Everything in Between
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Meet the brilliant minds behind Mentorque. From prestigious colleges to leading companies, 
              we bring diverse expertise to transform your career journey.
            </p>
          </motion.div>
        </section>

        {/* Team Grid */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* First two rows */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto mb-6 sm:mb-8"
          >
            {gridItems.slice(0, 6).map((item, idx) => {
              return (
                <div 
                  key={`${item.type}-${idx}`} 
                  className="w-full"
                >
                  {item.type === "member" ? (
                    <TeamMemberCard member={item.data as TeamMember} index={idx} />
                  ) : (
                    <div className="h-full min-h-[300px] sm:min-h-[350px]">
                      <QuoteCard quote={item.data as string} index={idx} />
                    </div>
                  )}
                </div>
              );
            })}
          </motion.div>

          {/* Third row: Nyai, Umang, Gokul - explicitly together */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto"
          >
            {gridItems.slice(6, 9).map((item, idx) => {
              const actualIdx = idx + 6;
              return (
                <div 
                  key={`${item.type}-${actualIdx}`} 
                  className="w-full"
                >
                  {item.type === "member" ? (
                    <TeamMemberCard member={item.data as TeamMember} index={actualIdx} />
                  ) : (
                    <div className="h-full min-h-[300px] sm:min-h-[350px]">
                      <QuoteCard quote={item.data as string} index={actualIdx} />
                    </div>
                  )}
                </div>
              );
            })}
          </motion.div>
        </section>

        {/* Additional Quote Section */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 mt-16 sm:mt-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <QuoteCard quote={quotes[2]} index={2} />
          </motion.div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Team;
