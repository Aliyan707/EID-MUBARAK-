'use client'

import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'

export default function ScrollProgress() {
  const barRef  = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!barRef.current) return

    gsap.fromTo(
      barRef.current,
      { scaleX: 0 },
      {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: document.documentElement,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.3,
        },
      }
    )

    // Glow follows bar
    ScrollTrigger.create({
      trigger: document.documentElement,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        if (glowRef.current) {
          glowRef.current.style.left = `${self.progress * 100}%`
        }
      },
    })
  }, [])

  return (
    <div className="fixed top-0 left-0 right-0 z-[9990] pointer-events-none" style={{ height: 2 }}>
      {/* Track */}
      <div className="w-full h-full bg-white/5" />

      {/* Fill bar */}
      <div
        ref={barRef}
        className="absolute inset-0 origin-left"
        style={{
          background: 'linear-gradient(90deg, #8b6914 0%, #d4af37 40%, #f0d060 70%, #d4af37 100%)',
          boxShadow: '0 0 8px rgba(212,175,55,0.9), 0 0 20px rgba(212,175,55,0.4)',
          transform: 'scaleX(0)',
        }}
      />

      {/* Moving glow dot at the tip */}
      <div
        ref={glowRef}
        className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2"
        style={{
          width: 10,
          height: 10,
          background: '#f0d060',
          borderRadius: '50%',
          filter: 'blur(2px) drop-shadow(0 0 6px rgba(255,215,0,1))',
          left: '0%',
        }}
      />
    </div>
  )
}
