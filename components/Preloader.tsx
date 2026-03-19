'use client'

import { useEffect, useRef, useMemo } from 'react'
import { gsap } from '@/lib/gsap'

interface PreloaderProps {
  onComplete: () => void
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const overlayRef  = useRef<HTMLDivElement>(null)
  const moonRef     = useRef<HTMLDivElement>(null)
  const arabicRef   = useRef<HTMLDivElement>(null)
  const englishRef  = useRef<HTMLDivElement>(null)
  const taglineRef  = useRef<HTMLDivElement>(null)
  const ringRef     = useRef<HTMLDivElement>(null)
  const ring2Ref    = useRef<HTMLDivElement>(null)

  // Generate static star positions once (avoids SSR mismatch)
  const stars = useMemo(() => (
    Array.from({ length: 80 }, (_, i) => ({
      id: i,
      left: ((i * 137.508) % 100).toFixed(2),
      top:  ((i * 97.31)  % 100).toFixed(2),
      size: (((i * 47) % 24) / 10 + 0.5).toFixed(1),
      delay: ((i * 0.15)  % 4).toFixed(1),
      dur:   ((i * 0.11)  % 2 + 2).toFixed(1),
      opacity: (((i * 31) % 70) / 100 + 0.15).toFixed(2),
    }))
  ), [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set([arabicRef.current, englishRef.current, taglineRef.current], {
        opacity: 0, y: 24,
      })
      gsap.set(moonRef.current, { opacity: 0, scale: 0.4, rotation: -25 })
      gsap.set([ringRef.current, ring2Ref.current], { scale: 0, opacity: 0 })

      const tl = gsap.timeline({
        onComplete: () => {
          // Sweep rings out
          gsap.to([ringRef.current, ring2Ref.current], {
            scale: 3, opacity: 0, duration: 0.7, ease: 'power2.out', stagger: 0.15,
          })
          // Fade overlay away
          gsap.to(overlayRef.current, {
            opacity: 0,
            duration: 0.85,
            ease: 'power2.inOut',
            delay: 0.3,
            onComplete,
          })
        },
      })

      tl
        // Moon drops in
        .to(moonRef.current, {
          opacity: 1, scale: 1, rotation: 0,
          duration: 1.1, ease: 'back.out(1.8)',
        })
        // Rings pulse out from moon
        .to([ringRef.current, ring2Ref.current], {
          scale: 1, opacity: 0.6,
          duration: 0.5, ease: 'power2.out', stagger: 0.2,
        }, '-=0.4')
        .to([ringRef.current, ring2Ref.current], {
          scale: 2.2, opacity: 0,
          duration: 0.8, ease: 'power1.out', stagger: 0.2,
        }, '-=0.2')
        // Arabic text
        .to(arabicRef.current, { opacity: 1, y: 0, duration: 0.9, ease: 'power2.out' }, '-=0.5')
        // English text
        .to(englishRef.current, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }, '-=0.5')
        // Tagline
        .to(taglineRef.current, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.4')
        // Hold
        .to({}, { duration: 1.5 })
    })

    return () => ctx.revert()
  }, [onComplete])

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[99999] bg-midnight flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Nebula */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse at 20% 50%, rgba(80,0,100,0.18) 0%, transparent 55%),
            radial-gradient(ellipse at 80% 30%, rgba(0,30,100,0.16) 0%, transparent 55%)
          `,
        }}
      />

      {/* Stars */}
      <div className="absolute inset-0 pointer-events-none">
        {stars.map((s) => (
          <div
            key={s.id}
            className="absolute rounded-full bg-white"
            style={{
              left:   `${s.left}%`,
              top:    `${s.top}%`,
              width:  `${s.size}px`,
              height: `${s.size}px`,
              opacity: Number(s.opacity),
              animation: `twinkle ${s.dur}s ease-in-out ${s.delay}s infinite`,
            }}
          />
        ))}
      </div>

      {/* Moon rings */}
      <div className="relative flex items-center justify-center mb-8">
        <div
          ref={ringRef}
          className="absolute rounded-full border-2 border-gold/50"
          style={{ width: 160, height: 160 }}
        />
        <div
          ref={ring2Ref}
          className="absolute rounded-full border border-gold/30"
          style={{ width: 160, height: 160 }}
        />

        {/* Crescent moon */}
        <div ref={moonRef} className="relative">
          <svg
            viewBox="0 0 120 120"
            width="120"
            height="120"
            className="glow-moon overflow-visible"
          >
            <defs>
              <radialGradient id="pl-moonGrad" cx="38%" cy="32%" r="68%">
                <stop offset="0%"   stopColor="#fffde7" />
                <stop offset="40%"  stopColor="#ffe57f" />
                <stop offset="75%"  stopColor="#d4af37" />
                <stop offset="100%" stopColor="#8b6914" />
              </radialGradient>
              <radialGradient id="pl-haloGrad" cx="50%" cy="50%" r="50%">
                <stop offset="0%"   stopColor="rgba(255,215,0,0.5)" />
                <stop offset="100%" stopColor="rgba(255,215,0,0)"   />
              </radialGradient>
            </defs>
            <circle cx="60" cy="60" r="54" fill="url(#pl-haloGrad)" opacity="0.5" />
            <circle cx="54" cy="60" r="38" fill="url(#pl-moonGrad)" />
            <circle cx="72" cy="50" r="33" fill="#04040f" />
            {/* Stars near moon */}
            <circle cx="93" cy="28" r="1.5" fill="#fffde7" opacity="0.9" />
            <circle cx="100" cy="45" r="1.0" fill="#fffde7" opacity="0.7" />
            <circle cx="20"  cy="35" r="1.2" fill="#fffde7" opacity="0.8" />
          </svg>
        </div>
      </div>

      {/* Arabic */}
      <div ref={arabicRef} className="text-center mb-2" dir="rtl" lang="ar">
        <p className="font-reemKufi text-5xl md:text-6xl text-gold-shimmer" style={{ lineHeight: 1.5 }}>
          عيد مبارك
        </p>
      </div>

      {/* English */}
      <div ref={englishRef} className="text-center mb-4">
        <p className="font-greatVibes text-4xl md:text-5xl text-cream/90">
          Eid Mubarak
        </p>
      </div>

      {/* Tagline */}
      <div ref={taglineRef} className="text-center">
        <p className="font-cormorant text-lg italic text-gold/60">
          A gift for Arfa Siddiqui — with all my duas ✦
        </p>
        <div className="mt-4 flex items-center justify-center gap-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-gold/50"
              style={{ animation: `pulse 1.4s ease-in-out ${i * 0.2}s infinite` }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
