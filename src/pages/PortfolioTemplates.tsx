import { Briefcase, CheckCircle, Star, Clock, Target, Code, Globe, Palette } from 'lucide-react';
import { CompletionBadge } from '@/components/ui/completion-badge';
import Navbar from '@/components/Navbar';
import { Link } from "react-router-dom";

const CalendarCTA = ({ label }) => (
  <Link to="/book-call">
    <button className="group relative bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 hover:from-blue-400 hover:to-blue-500 hover:shadow-2xl hover:shadow-blue-400/20 hover:-translate-y-1 backdrop-blur-sm">
      <span className="relative z-10 flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 
                   2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 
                   16H5V9h14v11z" />
        </svg>
        {label}
      </span>
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-white/[0.1] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </button>
  </Link>
);

const PortfolioTemplates = () => {
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

  return (
    <div>
      <div className="min-h-screen bg-black">
        <Navbar />

        {/* Hero Section */}
        <div className="bg-black py-12 px-4 md:px-8 lg:px-12">
          <div className="w-full max-w-7xl mx-auto">
            <div className="text-center">
              <div className="flex justify-center mb-6">
           
              </div>
              <div className="flex items-center justify-center gap-4 mb-6">
                <h1 className="text-4xl md:text-6xl mt-10 text-white leading-tight">
                  Portfolio <span className="text-blue-400">Development</span>
                </h1>
                <CompletionBadge serviceId="portfolio-templates" />
              </div>
              <p className="text-xl md:text-2xl text-gray-100 leading-relaxed max-w-2xl mx-auto mb-8">
                Build a stunning portfolio that showcases your skills and projects
              </p>
              <div className="flex flex-wrap justify-center gap-8 text-lg">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-400" />
                  <span className="text-gray-100">Custom Design</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-blue-400" />
                  <span className="text-gray-100">Professional Hosting</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-blue-400" />
                  <span className="text-gray-100">Fast Delivery</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Portfolio Examples */}
        

        {/* Portfolio Features */}
        <div className="bg-black py-12 px-4 md:px-8 lg:px-12">
          <div className="w-full max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-6xl text-white leading-tight mb-6">
                What We <span className="text-blue-400">Include</span>
              </h2>
              <p className="text-xl md:text-2xl text-gray-100 leading-relaxed max-w-2xl mx-auto">
                Everything you need for a professional online presence
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {portfolioFeatures.map((feature, index) => (
                <div 
                  key={index} 
                  className="relative group backdrop-blur-xl bg-white/[0.02] border border-white/10 rounded-2xl p-8 text-center hover:bg-white/[0.05] hover:border-white/20 hover:shadow-2xl hover:shadow-blue-400/10 transition-all duration-500"
                >
                  <div className="text-blue-400 mb-6 flex justify-center drop-shadow-lg">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl md:text-2xl text-white mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    {feature.description}
                  </p>
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-400/[0.03] via-transparent to-purple-600/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

<div className="w-full max-w-7xl mx-auto">
  <div className="text-center mb-12">
    <h2 className="text-4xl md:text-6xl text-white leading-tight mb-6">
      Our Portfolio <span className="text-blue-400">Service</span>
    </h2>
    <p className="text-xl md:text-2xl text-gray-100 leading-relaxed max-w-2xl mx-auto">
      Complete solution to showcase your professional brand
    </p>
  </div>

  {/* Cards wrapper */}
  <div className="flex flex-col md:flex-row justify-center items-stretch gap-8 px-4">
    
    {/* Portfolio Card */}
    <div className="bg-black py-12 px-2 md:px-6 lg:px-12 flex-1">
      <div className="max-w-2xl mx-auto h-full">
        <div className="relative group backdrop-blur-xl bg-white/[0.03] border border-white/10 rounded-3xl hover:bg-white/[0.06] hover:border-white/20 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-400/15 overflow-hidden h-full">
          <div className="relative z-10 p-8 md:p-12 flex flex-col h-full">
            <div className="text-center mb-8">
              <h3 className="text-3xl md:text-4xl text-white mb-4">
                {portfolioPackage.title}
              </h3>
              <div className="text-blue-400 flex items-center justify-center gap-2 text-lg">
                <Clock className="w-5 h-5" />
                {portfolioPackage.duration}
              </div>
            </div>

            <p className="text-gray-100 mb-8 text-center text-xl leading-relaxed">{portfolioPackage.description}</p>

            <div className="space-y-6 mb-8 flex-grow">
              {portfolioPackage.includes.map((item, itemIndex) => (
                <div key={itemIndex} className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1 drop-shadow-lg" />
                  <span className="text-gray-100 text-lg leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-400/[0.04] via-transparent to-purple-600/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </div>
      </div>
    </div>

    {/* AI Tool Card */}
    <div className="bg-black py-12 px-2 md:px-6 lg:px-12 flex-1">
      <div className="max-w-2xl mx-auto h-full">
        <div className="relative group backdrop-blur-xl bg-white/[0.03] border border-white/10 rounded-3xl hover:bg-white/[0.06] hover:border-white/20 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-400/15 overflow-hidden h-full">
          <div className="relative z-10 p-8 md:p-12 flex flex-col h-full">
            <div className="text-center mb-8">
              <h3 className="text-3xl md:text-4xl text-white mb-4">
                AI Job Assistant
              </h3>
              <div className="text-blue-400 flex items-center justify-center gap-2 text-lg">
               Integrated with Linkedin 
              </div>
            </div>

            <p className="text-gray-100 mb-8 text-center text-xl leading-relaxed">
              AI-powered features to supercharge your job search
            </p>

            <div className="space-y-6 mb-8 flex-grow">
              {[
                "Keywords extraction",
                "Experience analysis",
                "HR lookup",
                "End-to-end job assist",
                "Job description analysis",
                "Resume-based job search",
                "LinkedIn integration",
                "Cover Letter Generation"
              ].map((feature, index) => (
                <div key={index} className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1 drop-shadow-lg" />
                  <span className="text-gray-100 text-lg leading-relaxed">{feature}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-400/[0.04] via-transparent to-blue-600/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </div>
      </div>
    </div>

  </div>
</div>

        {/* CTA Section */}
        <div className="bg-black py-12 px-4 md:px-8 lg:px-12">
          <div className="w-full max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-6xl text-white leading-tight mb-8">
              Ready to Build Your <span className="text-blue-400">Portfolio?</span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-100 leading-relaxed max-w-2xl mx-auto mb-8">
              Showcase your skills with a professional portfolio that gets you noticed
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <CalendarCTA label="Request a Call back" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioTemplates;
