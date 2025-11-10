import { Mail, Phone, Linkedin, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full bg-black py-6 sm:py-8 md:py-10 border-t border-white/10">
      <div className="section-container max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row justify-between gap-6 sm:gap-8 md:gap-10 text-white">

          {/* Brand Info */}
          <div className="flex flex-col gap-2 sm:gap-3">
            <h2 className="text-xl sm:text-2xl font-bold">Mentorque</h2>
            <p className="text-xs sm:text-sm text-gray-400 max-w-sm leading-relaxed">
              Mentorque is an end to end job hunt program engineered to help professionals land and clear interviews faster.
            </p>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3">Contact Us</h3>
            <ul className="text-xs sm:text-sm text-gray-300 space-y-1.5 sm:space-y-2">
              <li className="flex items-center gap-2">
                <Mail size={14} className="sm:w-4 sm:h-4" /> 
                <a 
                  href="mailto:info@mentorquedu.com" 
                  className="hover:text-white transition-colors break-all"
                >
                  info@mentorquedu.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={14} className="sm:w-4 sm:h-4" /> 
                <a 
                  href="tel:+918486242054" 
                  className="hover:text-white transition-colors"
                >
                  +91 8486242054
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3">Follow Us</h3>
            <div className="flex gap-3 sm:gap-4">
              <a 
                href="https://www.linkedin.com/company/mentorquedu/" 
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn" 
                className="hover:opacity-80 transition-opacity"
              >
                <Linkedin size={24} className="sm:w-7 sm:h-7 md:w-8 md:h-8" color="white" />
              </a>
              <a 
                href="https://www.instagram.com/mentorquedu/?igsh=bmlic3didDBvemNs#" 
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram" 
                className="hover:opacity-80 transition-opacity"
              >
                <Instagram size={24} className="sm:w-7 sm:h-7 md:w-8 md:h-8" color="white" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Note */}
        <div className="mt-6 sm:mt-8 md:mt-10 text-center text-xs sm:text-sm text-gray-500 border-t border-white/10 pt-3 sm:pt-4">
          © 2025 Mentorque. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;