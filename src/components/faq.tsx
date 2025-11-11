import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const MentorqueFAQ = () => {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (index) => {
    setOpenSection(openSection === index ? null : index);
  };

  const faqData = [
    {
      title: "Mentorship Program Eligibility and Enrollment",
      content: [
        {
          subtitle: "Qualified Participants",
          text: "Ambitious students and professionals who want faster interviews, sharper career momentum, and hands-on support from industry mentors are welcome to join. If you are ready to invest in your next opportunity, you are the right fit."
        },
        {
          subtitle: "How to Enroll",
          text: "Book a call on our website or start the complimentary 14-day trial. You are covered by a 14-day refund window—if you decide the program is not for you, cancel and receive a full refund."
        },
        {
          subtitle: "Program Availability",
          text: "Enrollment depends on mentor availability and program capacity. Each participant can hold one active mentorship program at a time."
        }
      ]
    },
    {
      title: "Supported Features and Technologies",
      content: [
        {
          subtitle: "Live Mentorship",
          text: "1-on-1 mentorship calls are available via online platforms, with support for video, audio, and chat communication."
        },
        {
          subtitle: "Progress Tracking",
          text: "Participants can track their progress with personalized roadmaps, accountability check-ins, and feedback from mentors."
        },
        {
          subtitle: "Supported Devices",
          text: "Mentorship sessions can be accessed from any device with an internet connection and a supported browser."
        },
        {
          subtitle: "Languages",
          text: "Currently, mentorship is available in English. Additional language support may be added in the future."
        }
      ]
    },
    {
      title: "Accessibility and Support Features",
      content: [
        {
          subtitle: "24/7 Support",
          text: "Mentorque offers round-the-clock customer support for technical issues and booking inquiries."
        },
        {
          subtitle: "Accessibility",
          text: "If you require specific accommodations, please contact support before booking your session."
        }
        
      ]
    },
    {
      title: "Additional Services and Product Offerings",
      content: [
        {
          subtitle: "Resume Review",
          text: "Resume reviews are available to all enrolled participants."
        },
        {
          subtitle: "Networking Sprint",
          text: "Specialized programs to improve networking skills and increase interview callbacks."
        },
        {
          subtitle: "Career Clarity Sprint",
          text: "Programs designed to help participants clarify their career goals and improve resume shortlist rates."
        }
      ]
    },
    {
      title: "Trade-In and Referral Programs",
      content: [
        {
          subtitle: "Referral Bonuses",
          text: "Refer a friend to Mentorque and receive a bonus or discount on your next session (subject to program terms and availability)."
        }
        
      ]
    },
    {
      title: "Subscriptions and Payments",
      content: [
        {
          subtitle: "Subscription Required",
          text: "Some advanced features or ongoing mentorship plans may require a subscription. Details will be provided at the time of booking."
        },
        {
          subtitle: "Payment Methods",
          text: "All major credit cards and digital payment methods are accepted."
        },
        {
          subtitle: "Refunds and Cancellations",
          text: "Refunds are subject to Mentorque's cancellation policy. Please review the terms and conditions before booking."
        }
      ]
    },
    {
      title: "Terms and Conditions",
      content: [
        {
          subtitle: "Changes to Features",
          text: "Mentorque reserves the right to modify or discontinue features, services, or programs at any time."
        },
        {
          subtitle: "Regional Availability",
          text: "Some features or programs may not be available in all regions or for all participants."
        }
        
      ]
    }
  ];

  return (
    <div className=" bg-black text-white">
      <div className="max-w-4xl mx-auto px-4 py-6 sm:py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-3 sm:mb-4 text-white">
            Frequently Asked Questions
          </h1>
          <p className="text-gray-400 text-sm sm:text-base md:text-lg">
            Everything you need to know about Mentorship
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-2 sm:space-y-3">
          {faqData.map((section, index) => (
            <div
              key={index}
              className="border border-gray-800 rounded-lg overflow-hidden bg-gray-900/50 backdrop-blur-sm"
            >
              {/* Section Header */}
              <button
                onClick={() => toggleSection(index)}
                className="w-full px-4 sm:px-5 md:px-6 py-3 sm:py-3.5 md:py-4 text-left flex items-center justify-between hover:bg-gray-800/50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-600"
              >
                <h2 className="text-sm sm:text-base md:text-lg lg:text-xl text-white pr-3 sm:pr-4 leading-snug">
                  {section.title}
                </h2>
                <div className="flex-shrink-0">
                  {openSection === index ? (
                    <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                  )}
                </div>
              </button>

              {/* Section Content */}
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openSection === index ? 'max-h-svh opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-4 sm:px-5 md:px-6 pb-3 sm:pb-4 pt-2 space-y-3 sm:space-y-4">
                  {section.content.map((item, itemIndex) => (
                    <div key={itemIndex} className="border-l-2 border-gray-700 pl-3 sm:pl-4">
                      <h3 className="text-sm sm:text-base md:text-lg font-medium text-gray-200 mb-1.5 sm:mb-2">
                        {item.subtitle}
                      </h3>
                      <p className="text-gray-400 text-xs sm:text-sm md:text-base leading-relaxed">
                        {item.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

       
       
      </div>
    </div>
  );
};

export default MentorqueFAQ;