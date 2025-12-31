export const WHATSAPP_TESTIMONIAL_IMAGES = [
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

const testimonialAssetModules = import.meta.glob<
  true,
  string,
  string
>("/public/Whatsapp_testimonial_screenshots/*.{png,jpg,jpeg,webp}", {
  query: '?url',
  import: 'default',
  eager: true,
})

const naturalCompare = (a: string, b: string) =>
  a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" })

const sanitisePublicUrl = (url: string) =>
  url.startsWith("/public/") ? url.replace("/public", "") : url

/**
 * Returns a list of WhatsApp testimonial image paths.
 * Uses the bundled asset list when available and falls back to the static list.
 */
export const getWhatsAppTestimonials = () => {
  const entries = Object.entries(testimonialAssetModules) as [string, string][]

  if (!entries.length) {
    return [...WHATSAPP_TESTIMONIAL_IMAGES]
  }

  return entries
    .sort(([a], [b]) => naturalCompare(a, b))
    .map(([, url]) => sanitisePublicUrl(url))
}



