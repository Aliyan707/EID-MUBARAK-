'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from '@/lib/gsap'

export default function AudioPlayer() {
  const [playing, setPlaying]   = useState(false)
  const [loaded, setLoaded]     = useState(false)
  const [visible, setVisible]   = useState(false)
  const audioRef  = useRef<HTMLAudioElement | null>(null)
  const btnRef    = useRef<HTMLButtonElement>(null)
  const ring1Ref  = useRef<HTMLDivElement>(null)
  const ring2Ref  = useRef<HTMLDivElement>(null)
  const ringTl    = useRef<gsap.core.Timeline | null>(null)

  useEffect(() => {
    // Show button after short delay
    setTimeout(() => setVisible(true), 2000)

    // Create audio element
    const audio = new Audio('/audio/nasheed.mp3')
    audio.loop   = true
    audio.volume = 0.45
    audioRef.current = audio

    audio.addEventListener('canplaythrough', () => setLoaded(true))
    audio.addEventListener('error', () => {
      // Audio file not found — button still shows, just won't play
      setLoaded(false)
    })

    return () => {
      audio.pause()
      audio.src = ''
    }
  }, [])

  // Pulse rings when playing
  useEffect(() => {
    if (playing && ring1Ref.current && ring2Ref.current) {
      ringTl.current = gsap.timeline({ repeat: -1 })
      ringTl.current
        .fromTo([ring1Ref.current, ring2Ref.current],
          { scale: 1, opacity: 0.6 },
          {
            scale: 2.8, opacity: 0,
            duration: 1.6,
            stagger: 0.5,
            ease: 'power1.out',
          }
        )
    } else {
      ringTl.current?.kill()
      if (ring1Ref.current) gsap.set(ring1Ref.current, { scale: 1, opacity: 0 })
      if (ring2Ref.current) gsap.set(ring2Ref.current, { scale: 1, opacity: 0 })
    }
  }, [playing])

  const toggle = () => {
    if (!audioRef.current) return
    if (playing) {
      audioRef.current.pause()
      setPlaying(false)
    } else {
      audioRef.current.play().then(() => setPlaying(true)).catch(() => {
        // Autoplay blocked
      })
    }

    // Button click scale
    gsap.to(btnRef.current, {
      scale: 0.9,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      ease: 'power1.inOut',
    })
  }

  if (!visible) return null

  return (
    <div
      className="fixed bottom-6 right-6 z-50"
      style={{
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.8s ease',
      }}
    >
      <div className="relative flex items-center justify-center">

        {/* Pulse rings */}
        <div
          ref={ring1Ref}
          className="absolute inset-0 rounded-full border border-gold/50 opacity-0"
          style={{ transform: 'scale(1)' }}
        />
        <div
          ref={ring2Ref}
          className="absolute inset-0 rounded-full border border-gold/30 opacity-0"
          style={{ transform: 'scale(1)' }}
        />

        {/* Main button */}
        <button
          ref={btnRef}
          onClick={toggle}
          aria-label={playing ? 'Pause Eid Nasheed' : 'Play Eid Nasheed'}
          title={playing ? 'Pause nasheed' : 'Play soft nasheed'}
          className="
            relative w-14 h-14 rounded-full
            glass-card border-gold-glow
            flex items-center justify-center
            transition-all duration-300
            hover:scale-110 active:scale-95
            group
          "
          style={{
            boxShadow: playing
              ? '0 0 24px rgba(212,175,55,0.7), 0 0 48px rgba(212,175,55,0.3)'
              : '0 0 10px rgba(212,175,55,0.3)',
          }}
        >
          {playing ? (
            /* Pause icon */
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-gold">
              <rect x="6" y="4" width="4" height="16" rx="1" fill="currentColor" />
              <rect x="14" y="4" width="4" height="16" rx="1" fill="currentColor" />
            </svg>
          ) : (
            /* Play icon */
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-gold ml-0.5">
              <path
                d="M8 5.14v13.72a1 1 0 0 0 1.5.86l11-6.86a1 1 0 0 0 0-1.72l-11-6.86A1 1 0 0 0 8 5.14z"
                fill="currentColor"
              />
            </svg>
          )}
        </button>

        {/* Tooltip */}
        <div
          className="
            absolute right-16 top-1/2 -translate-y-1/2
            glass-card rounded-xl px-3 py-1.5
            whitespace-nowrap pointer-events-none
            opacity-0 group-hover:opacity-100
            transition-opacity duration-200
          "
        >
          <p className="font-poppins text-xs text-cream/80">
            {playing ? '🔇 Pause nasheed' : '🎵 Play nasheed'}
          </p>
          {!loaded && (
            <p className="font-poppins text-xs text-cream/40">
              (add audio/nasheed.mp3)
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
