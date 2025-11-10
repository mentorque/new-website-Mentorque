"use client"
import { useState, useEffect, useCallback } from 'react'
import { MessageCircle, X, Calendar } from 'lucide-react'

const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxqe3h-H7hyZRFtcdY81UFpi-mPNyLmYbXGmz63RlTPJrmhsT8e4hf0tnl1ay8HZr0zig/exec'

const INITIAL_FORM_DATA = {
  name: '',
  email: '',
  contactNumber: '',
  occupation: ''
}

const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
const validatePhone = (phone: string) => /^[\d\s\-\+\(\)]{10,}$/.test(phone)

export default function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [hasOpened, setHasOpened] = useState(false)
  const [hasOpenedAtTestimonials, setHasOpenedAtTestimonials] = useState(false)
  const [formData, setFormData] = useState(INITIAL_FORM_DATA)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Check if mobile
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Auto-open on page load (desktop only)
  useEffect(() => {
    if (isMobile) return // Don't auto-open on mobile
    
    const timer = setTimeout(() => {
      setIsOpen(true)
      setHasOpened(true)
    }, 2000) // Open after 2 seconds

    return () => clearTimeout(timer)
  }, [isMobile])

  // Auto-open at testimonial section (mobile only)
  useEffect(() => {
    if (!isMobile || hasOpenedAtTestimonials) return

    const testimonialSection = document.getElementById('testimonials')
    if (!testimonialSection) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasOpenedAtTestimonials) {
            // Small delay before opening
            setTimeout(() => {
              setIsOpen(true)
              setHasOpenedAtTestimonials(true)
              setHasOpened(true)
            }, 1000)
          }
        })
      },
      { threshold: 0.3 } // Open when 30% of section is visible
    )

    observer.observe(testimonialSection)

    return () => {
      observer.disconnect()
    }
  }, [hasOpenedAtTestimonials, isMobile])

  // Close on scroll - immediate close
  useEffect(() => {
    if (!isOpen || !hasOpened) return

    let lastScrollY = window.scrollY
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      // Close immediately on any scroll movement
      if (Math.abs(currentScrollY - lastScrollY) > 5) {
        setIsOpen(false)
      }
      lastScrollY = currentScrollY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [isOpen, hasOpened])

  const isFormValid = 
    formData.name.trim().length >= 2 &&
    validateEmail(formData.email.trim()) &&
    validatePhone(formData.contactNumber.trim())

  const validateField = useCallback((name: string, value: string) => {
    const newErrors = { ...errors }
    
    switch (name) {
      case 'name':
        if (value.trim().length < 2) {
          newErrors.name = 'Name must be at least 2 characters'
        } else {
          delete newErrors.name
        }
        break
      case 'email':
        if (!validateEmail(value.trim())) {
          newErrors.email = 'Please enter a valid email'
        } else {
          delete newErrors.email
        }
        break
      case 'contactNumber':
        if (!validatePhone(value.trim())) {
          newErrors.contactNumber = 'Please enter a valid phone number'
        } else {
          delete newErrors.contactNumber
        }
        break
    }
    
    setErrors(newErrors)
  }, [errors])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    if (value.trim().length > 0 || errors[name]) {
      validateField(name, value)
    }
  }

  const handleSubmit = async () => {
    if (!isFormValid || isSubmitting) return

    setIsSubmitting(true)

    try {
      const payload = {
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        contactNumber: formData.contactNumber.trim(),
        occupation: formData.occupation.trim()
      }

      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 10000)

      void fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: controller.signal
      })

      clearTimeout(timeoutId)
      setTimeout(() => {
        setShowSuccess(true)
      }, 2000)

      setFormData(INITIAL_FORM_DATA)
      setErrors({})

      setTimeout(() => {
        setShowSuccess(false)
        setIsOpen(false)
      }, 6000)
    } catch (error) {
      console.error('Submission error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const getInputClassName = (fieldName: string) => {
    const baseClass = "w-full px-3 py-2 text-sm border-2 rounded-xl focus:ring-2 focus:ring-blue-400/40 transition-all duration-200 ease-out outline-none bg-white/80 backdrop-blur-sm text-gray-900 placeholder:text-gray-500/70 border-blue-200/50 focus:border-blue-500 hover:border-blue-300/60 shadow-sm"
    const hasError = errors[fieldName]
    
    if (hasError) {
      return `${baseClass} border-red-400/70 focus:border-red-500 focus:ring-red-400/30`
    }
    return baseClass
  }

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[9999] 
          w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl sm:rounded-2xl 
          bg-gradient-to-br from-neutral-800 to-black backdrop-blur-2xl 
          border border-neutral-700/40 text-white 
          shadow-2xl shadow-black/40 
          transition-all duration-400 ease-[cubic-bezier(0.34,1.56,0.64,1)] 
          flex items-center justify-center group ${
            /* your dynamic classes go here */
          isOpen 
            ? 'scale-0 opacity-0 rotate-90 pointer-events-none' 
            : 'scale-100 opacity-100 hover:scale-110 hover:border-blue-500/60 hover:shadow-blue-500/60'
        }`}
        aria-label="Open chat"
        style={{
          animation: isOpen ? 'none' : 'pulseGlow 2.5s ease-in-out infinite'
        }}
      >
        <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 group-hover:scale-110 transition-transform duration-300" />
        <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </button>

      {/* Chat Widget */}
      <div
        className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[9999] w-[90vw] sm:w-[85vw] max-w-[320px] transition-all duration-400 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
          isOpen 
            ? 'opacity-100 translate-y-0 scale-100 rotate-0' 
            : 'opacity-0 translate-y-6 scale-95 rotate-2 pointer-events-none'
        }`}
        style={{
          transformOrigin: 'bottom right'
        }}
      >
        <div className="bg-gradient-to-br from-white/95 via-blue-50/90 to-indigo-50/95 backdrop-blur-2xl rounded-2xl sm:rounded-3xl shadow-2xl shadow-blue-200/30 border border-blue-200/40 overflow-hidden relative">
          {/* Subtle background overlay for depth */}
          <div className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-blue-100/20 via-indigo-50/15 to-violet-50/10 pointer-events-none"></div>
          {/* Animated border glow */}
          <div className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-blue-400/20 via-indigo-300/10 to-violet-400/15 opacity-60"></div>
          
          {/* Header */}
          <div className="relative p-2.5 sm:p-3 md:p-3.5 flex items-center justify-between border-b border-blue-200/30">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 bg-white rounded-lg flex items-center justify-center shadow-lg">
                <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 bg-black rounded-sm"></div>
              </div>
              <div>
                <h3 className="text-gray-900 font-bold text-xs sm:text-xs md:text-sm">Mentorque</h3>
                <p className="text-blue-700/70 text-[9px] sm:text-[10px] md:text-xs">Book Your Call</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-lg sm:rounded-xl bg-white/80 hover:bg-white border border-blue-200/40 hover:border-blue-300/60 transition-all duration-200 ease-out flex items-center justify-center hover:scale-110 group shadow-sm"
              aria-label="Close chat"
            >
              <X className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-gray-700 group-hover:rotate-90 transition-transform duration-200 ease-out" />
            </button>
          </div>

          {/* Form */}
          <div className="relative p-2.5 sm:p-3.5 md:p-4 space-y-2 sm:space-y-2.5 max-h-[50vh] overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
            {showSuccess ? (
              <div className="text-center py-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-500 backdrop-blur-xl rounded-full flex items-center justify-center mx-auto mb-2.5 border border-green-300/50 shadow-lg shadow-green-400/40">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h4 className="text-base font-bold text-gray-900 mb-1">Application Submitted!</h4>
                <p className="text-xs text-gray-700">
                  We'll get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <>
                <div>
                  <label htmlFor="chat-name" className="block text-xs font-semibold text-gray-800 mb-1">
                    Name *
                  </label>
                  <input
                    id="chat-name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={getInputClassName('name')}
                    placeholder="Enter your full name"
                  />
                  {errors.name && (
                    <p className="mt-1 text-xs text-red-600 font-medium">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="chat-email" className="block text-xs font-semibold text-gray-800 mb-1">
                    Email ID *
                  </label>
                  <input
                    id="chat-email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={getInputClassName('email')}
                    placeholder="Enter your email"
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-red-600 font-medium">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="chat-phone" className="block text-xs font-semibold text-gray-800 mb-1">
                    Contact Number *
                  </label>
                  <input
                    id="chat-phone"
                    type="tel"
                    name="contactNumber"
                    value={formData.contactNumber}
                    onChange={handleChange}
                    className={getInputClassName('contactNumber')}
                    placeholder="Enter your phone"
                  />
                  {errors.contactNumber && (
                    <p className="mt-1 text-xs text-red-600 font-medium">{errors.contactNumber}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="chat-occupation" className="block text-xs font-semibold text-gray-800 mb-1">
                    Occupation
                  </label>
                  <input
                    id="chat-occupation"
                    type="text"
                    name="occupation"
                    value={formData.occupation}
                    onChange={handleChange}
                    className={getInputClassName('occupation')}
                    placeholder="Optional"
                  />
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={!isFormValid || isSubmitting}
                  className="relative w-full bg-gradient-to-br from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white py-2 px-3.5 rounded-xl font-semibold shadow-xl shadow-blue-500/40 hover:shadow-2xl hover:shadow-blue-500/60 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 ease-out flex items-center justify-center gap-2 mt-1.5 border border-blue-400/40 hover:border-blue-400/60 overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/15 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 ease-out"></div>
                  {isSubmitting ? (
                    <>
                      <div className="relative z-10 w-4 h-4 border-2 border-white/40 rounded-full border-t-white animate-spin"></div>
                      <span className="relative z-10 text-sm">Submitting...</span>
                    </>
                  ) : (
                    <>
                      <Calendar className="relative z-10 w-4 h-4 group-hover:scale-110 transition-transform duration-200 ease-out" />
                      <span className="relative z-10 text-sm">Book Call</span>
                    </>
                  )}
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulseGlow {
          0%, 100% {
            box-shadow: 0 10px 40px rgba(59, 130, 246, 0.4), 0 0 0 0 rgba(59, 130, 246, 0.6);
          }
          50% {
            box-shadow: 0 10px 40px rgba(59, 130, 246, 0.4), 0 0 0 8px rgba(59, 130, 246, 0);
          }
        }

        .scrollbar-thin::-webkit-scrollbar {
          width: 6px;
        }

        .scrollbar-thin::-webkit-scrollbar-track {
          background: transparent;
        }

        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: rgba(59, 130, 246, 0.3);
          border-radius: 3px;
        }

        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: rgba(59, 130, 246, 0.5);
        }
      `}</style>
    </>
  )
}

