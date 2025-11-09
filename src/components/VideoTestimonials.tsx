"use client"

import { useRef, useState, useCallback, useEffect } from "react"
import { Link } from "react-router-dom"
import { Play, Pause, Calendar, ArrowUpRight } from "lucide-react"

const videoTestimonials = [
  {
    src: "/testinomial1.mp4",
    title: "Clip 1",
    thumb: "/thumbnails/clip1.jpg",
  },
  {
    src: "/testinomial2.mp4",
    title: "Clip 2",
    thumb: "/thumbnails/clip2.jpg",
  },
  {
    src: "/testinomial4.mp4",
    title: "Clip 4",
    thumb: "/thumbnails/clip3.jpg",
  }
]

const VideoCard = ({ video, className = "" }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const enableAudio = useCallback(() => {
    const element = videoRef.current
    if (!element) return
    element.muted = false
    element.volume = 1
  }, [])

  const togglePlayback = useCallback(() => {
    const element = videoRef.current
    if (!element) return

    if (element.paused) {
      enableAudio()
      const playPromise = element.play()
      if (playPromise?.catch) {
        playPromise.catch(() => setIsPlaying(false))
      }
      setIsPlaying(true)
    } else {
      element.pause()
      setIsPlaying(false)
    }
  }, [enableAudio])

  const handlePlay = () => setIsPlaying(true)
  const handlePause = () => setIsPlaying(false)

  useEffect(() => {
    enableAudio()
  }, [enableAudio])

  return (
    <div
      className={`group relative overflow-hidden rounded-[32px] border border-white/15 bg-white/5 p-4 sm:p-5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-white/25 hover:bg-white/[0.12] ${className}`}
    >
      <div className="relative aspect-[9/16] overflow-hidden rounded-[28px] border border-white/15 bg-black shadow-[0_30px_80px_-45px_rgba(59,130,246,0.65)]">
        {video.thumb && (
          <img
            src={video.thumb}
            alt={`${video.title} thumbnail`}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${isPlaying ? "opacity-0" : "opacity-100"}`}
            loading="lazy"
          />
        )}
        <video
          ref={videoRef}
          src={video.src}
          poster={video.thumb}
          muted={false}
          playsInline
          preload="metadata"
          onPlay={handlePlay}
          onPause={handlePause}
          className="h-full w-full object-cover"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
        <div className="pointer-events-none absolute inset-4 rounded-[24px] border border-white/10" />
        <button
          type="button"
          onClick={togglePlayback}
          className={`group absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center transition duration-300 md:h-24 md:w-24 pointer-events-none opacity-0 group-hover:opacity-90 group-hover:pointer-events-auto ${
            isPlaying ? 'group-hover:opacity-80' : ''
          }`}
          aria-label={isPlaying ? `Pause ${video.title}` : `Play ${video.title}`}
        >
          <span className="absolute inset-0 rounded-full bg-gradient-to-br from-white/80 via-white/40 to-white/10 backdrop-blur-md shadow-[0_30px_90px_-35px_rgba(255,255,255,0.85)] transition-all duration-300 group-hover:scale-105 group-hover:from-white/95 group-hover:via-white/80 group-hover:to-white/20" />
          <span className="absolute inset-[3px] rounded-full border border-white/60 bg-white/70 transition-all duration-300 group-hover:bg-white" />
          <span className="relative flex h-[70%] w-[70%] items-center justify-center rounded-full bg-slate-900/90 text-white transition-all duration-300 group-hover:bg-slate-900">
            {isPlaying ? <Pause className="h-8 w-8 md:h-10 md:w-10" /> : <Play className="h-8 w-8 translate-x-[1px] md:h-10 md:w-10" />}
          </span>
        </button>
        <div className="absolute inset-x-0 bottom-4 flex items-center justify-end px-4">
          <div className="pointer-events-none inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.4em] text-white/80">
            {video.title}
          </div>
        </div>
      </div>
    </div>
  )
}

const VideoTestimonials = () => {
  return (
    <section className="bg-black px-4 sm:px-6 lg:px-10 py-16 sm:py-20">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col items-center text-center gap-4">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs uppercase tracking-[0.35em] text-white/70">
            Real-time Wins
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-white">
            Luck favors the prepared. We prepare you.
          </h2>
          <p className="text-white/70 text-base sm:text-lg md:text-xl">
            Your next raise starts with this click.
          </p>

          <Link to="/book-call" className="mt-6 inline-flex">
            <button className="group inline-flex items-center gap-3 bg-gradient-to-b from-white to-gray-100 hover:from-gray-50 hover:to-white text-black font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-2xl transition-all duration-300 shadow-[0_8px_30px_rgba(255,255,255,0.15)] hover:shadow-[0_12px_40px_rgba(255,255,255,0.25)] hover:-translate-y-1 border border-white/20">
              <Calendar className="w-5 h-5" />
              <span className="text-sm sm:text-base">Book a call</span>
              <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </button>
          </Link>
         
        </div>

        <div className="mt-12">
          <div className="flex gap-3 overflow-x-auto pb-4 snap-x snap-mandatory md:hidden justify-around">
            {videoTestimonials.map((video) => (
              <VideoCard
                key={`${video.src}-mobile`}
                video={video}
                className="w-[224px] sm:w-[266px] flex-shrink-0 snap-center"
              />
            ))}
          </div>

          <div className="hidden md:flex md:flex-wrap md:justify-around md:gap-6">
            {videoTestimonials.map((video) => (
              <VideoCard key={video.src} video={video} className="w-[336px]" />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default VideoTestimonials

