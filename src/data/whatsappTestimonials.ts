const WHATSAPP_TESTIMONIAL_IMAGES = [
  "/Whatsapp_testimonial_screenshots/1.jpeg",
  "/Whatsapp_testimonial_screenshots/1.png",
  "/Whatsapp_testimonial_screenshots/2.png",
  "/Whatsapp_testimonial_screenshots/3.png",
  "/Whatsapp_testimonial_screenshots/5.png",
  "/Whatsapp_testimonial_screenshots/6.jpeg",
  "/Whatsapp_testimonial_screenshots/6.5.jpg",
  "/Whatsapp_testimonial_screenshots/8.jpg",
  "/Whatsapp_testimonial_screenshots/12.png",
  "/Whatsapp_testimonial_screenshots/14.png",
  "/Whatsapp_testimonial_screenshots/16.png",
  "/Whatsapp_testimonial_screenshots/17.png",
  "/Whatsapp_testimonial_screenshots/18.jpeg",
  "/Whatsapp_testimonial_screenshots/19.jpeg",
  "/Whatsapp_testimonial_screenshots/20.jpeg",
  "/Whatsapp_testimonial_screenshots/imp2.PNG",
] as const

/**
 * Returns a copy of the WhatsApp testimonial image paths.
 * Keeping this in a single place ensures every component works off the same source.
 */
export const getWhatsAppTestimonials = () => [...WHATSAPP_TESTIMONIAL_IMAGES]



