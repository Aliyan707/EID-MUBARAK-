'use client'

import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'
import AnimatedMoon from './AnimatedMoon'
import MosqueSilhouette from './MosqueSilhouette'

export default function Hero() {
  const sectionRef  = useRef<HTMLElement>(null)
  const arabicRef   = useRef<HTMLDivElement>(null)
  const titleRef    = useRef<HTMLDivElement>(null)
  const subtitleRef = useRef<HTMLDivElement>(null)
  const moonRef     = useRef<HTMLDivElement>(null)
  const bylineRef   = useRef<HTMLDivElement>(null)
  const scrollRef   = useRef<HTMLDivElement>(null)
  const ornamentRef = useRef<HTMLDivElement>(null)
  const starsRef    = useRef<HTMLDivElement>(null)

  // ── Entrance timeline ─────────────────────────────────────────────
  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 })

    tl.fromTo(moonRef.current, { opacity: 0, scale: 0.55, y: -40 }, {
      opacity: 1, scale: 1, y: 0, duration: 1.9, ease: 'power3.out',
    })
    .fromTo(arabicRef.current, { opacity: 0, y: 35, letterSpacing: '0.6em' }, {
      opacity: 1, y: 0, letterSpacing: '0.05em',
      duration: 1.3, ease: 'power2.out',
    }, '-=1.0')
    .fromTo(
      titleRef.current!.querySelectorAll('.char'),
      { opacity: 0, y: 50, rotationX: -100, filter: 'blur(8px)' },
      {
        opacity: 1, y: 0, rotationX: 0, filter: 'blur(0px)',
        duration: 0.65, stagger: 0.055, ease: 'back.out(1.5)',
      },
      '-=0.7'
    )
    .fromTo(ornamentRef.current, { opacity: 0, scaleX: 0 }, {
      opacity: 1, scaleX: 1, duration: 1.0, ease: 'power2.out',
    }, '-=0.2')
    .fromTo(subtitleRef.current!.querySelectorAll('.name-char'), {
      opacity: 0, y: 20, rotationY: -60,
    }, {
      opacity: 1, y: 0, rotationY: 0,
      duration: 0.55, stagger: 0.04, ease: 'back.out(1.4)',
    }, '-=0.5')
    .fromTo(bylineRef.current, { opacity: 0, y: 10 }, {
      opacity: 1, y: 0, duration: 1.1, ease: 'power2.out',
    }, '-=0.3')
    .fromTo(scrollRef.current, { opacity: 0 }, {
      opacity: 1, duration: 1.0, ease: 'power2.out',
    }, '-=0.4')

    // Ambient star twinkles around hero
    if (starsRef.current) {
      const stars = starsRef.current.querySelectorAll('.hero-star')
      gsap.fromTo(stars,
        { opacity: 0, scale: 0 },
        {
          opacity: 1, scale: 1, duration: 0.6,
          stagger: { each: 0.1, from: 'random' },
          ease: 'back.out(2)',
          delay: 1.5,
        }
      )
      // Continuous twinkle
      stars.forEach((star) => {
        gsap.to(star, {
          opacity: `random(0.1, 1)`,
          scale: `random(0.6, 1.3)`,
          duration: `random(1.5, 3.5)`,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          delay: Math.random() * 3,
        })
      })
    }
  }, [])

  // ── Mouse parallax ────────────────────────────────────────────────
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const onMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      const cx = window.innerWidth  / 2
      const cy = window.innerHeight / 2
      const dx = (clientX - cx) / cx   // -1 to 1
      const dy = (clientY - cy) / cy   // -1 to 1

      // Moon floats against cursor (parallax depth)
      gsap.to(moonRef.current, {
        x: -dx * 18, y: -dy * 12,
        duration: 1.2, ease: 'power2.out', overwrite: 'auto',
      })
      // Arabic drifts gently
      gsap.to(arabicRef.current, {
        x: dx * 10, y: dy * 7,
        duration: 1.4, ease: 'power2.out', overwrite: 'auto',
      })
      // Title drifts more
      gsap.to(titleRef.current, {
        x: dx * 14, y: dy * 9,
        duration: 1.3, ease: 'power2.out', overwrite: 'auto',
      })
      // Subtitle barely moves
      gsap.to(subtitleRef.current, {
        x: dx * 8, y: dy * 5,
        duration: 1.5, ease: 'power2.out', overwrite: 'auto',
      })
      // Stars drift opposite
      gsap.to(starsRef.current, {
        x: -dx * 22, y: -dy * 15,
        duration: 1.8, ease: 'power2.out', overwrite: 'auto',
      })
    }

    section.addEventListener('mousemove', onMove)
    return () => section.removeEventListener('mousemove', onMove)
  }, [])

  // ── Split helpers ─────────────────────────────────────────────────
  const titleChars = 'Eid Mubarak'.split('').map((ch, i) => (
    <span
      key={i}
      className="char inline-block"
      style={{ display: ch === ' ' ? 'inline' : 'inline-block', willChange: 'transform, opacity, filter' }}
    >
      {ch === ' ' ? '\u00A0' : ch}
    </span>
  ))

  const nameChars = 'Arfa Siddiqui'.split('').map((ch, i) => (
    <span
      key={i}
      className="name-char inline-block"
      style={{ display: ch === ' ' ? 'inline' : 'inline-block', willChange: 'transform' }}
    >
      {ch === ' ' ? '\u00A0' : ch}
    </span>
  ))

  // Static decorative stars scattered around the hero
  const heroStarPositions = [
    { top: '12%', left: '8%',  size: 3 },
    { top: '18%', left: '88%', size: 2 },
    { top: '30%', left: '5%',  size: 2.5 },
    { top: '28%', left: '92%', size: 2 },
    { top: '55%', left: '7%',  size: 3 },
    { top: '60%', left: '90%', size: 2.5 },
    { top: '75%', left: '12%', size: 2 },
    { top: '70%', left: '85%', size: 3 },
    { top: '8%',  left: '50%', size: 2 },
    { top: '85%', left: '50%', size: 2.5 },
    { top: '40%', left: '3%',  size: 1.5 },
    { top: '45%', left: '95%', size: 1.5 },
  ]

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden hero-gradient px-6 pb-40"
    >
      {/* Ambient sparkle stars */}
      <div ref={starsRef} className="absolute inset-0 pointer-events-none" style={{ zIndex: 3 }}>
        {heroStarPositions.map((s, i) => (
          <div
            key={i}
            className="hero-star absolute"
            style={{
              top: s.top, left: s.left,
              width: s.size, height: s.size,
              background: '#fffde7',
              borderRadius: '50%',
              opacity: 0,
              boxShadow: `0 0 ${s.size * 3}px rgba(255,253,231,0.9)`,
              willChange: 'transform, opacity',
            }}
          />
        ))}
        {/* 4-pointed star sparkles */}
        {[
          { top: '15%', left: '80%', size: 10, color: '#ffd700' },
          { top: '22%', left: '18%', size: 8,  color: '#fffde7' },
          { top: '68%', left: '82%', size: 9,  color: '#ffd700' },
        ].map((s, i) => (
          <div
            key={`spark-${i}`}
            className="hero-star absolute"
            style={{
              top: s.top, left: s.left,
              width: s.size, height: s.size,
              opacity: 0,
              willChange: 'transform, opacity',
            }}
          >
            <svg viewBox="0 0 10 10" width={s.size} height={s.size}>
              <path
                d="M5,0 L5.7,3.3 L9,5 L5.7,6.7 L5,10 L4.3,6.7 L1,5 L4.3,3.3 Z"
                fill={s.color}
                opacity="0.9"
              />
            </svg>
          </div>
        ))}
      </div>

      {/* Moon */}
      <div ref={moonRef} className="mb-6 md:mb-8 opacity-0 relative z-10" style={{ willChange: 'transform' }}>
        <AnimatedMoon />
      </div>

      {/* Arabic */}
      <div
        ref={arabicRef}
        className="opacity-0 text-center mb-3 relative z-10"
        dir="rtl" lang="ar"
        style={{ willChange: 'transform' }}
      >
        <h2
          className="font-reemKufi text-5xl md:text-7xl lg:text-8xl text-gold-shimmer leading-tight"
          style={{ lineHeight: 1.4 }}
        >
          عيد مبارك
        </h2>
      </div>

      {/* English title */}
      <div
        ref={titleRef}
        className="opacity-0 text-center mb-4 overflow-visible relative z-10"
        style={{ willChange: 'transform' }}
      >
        <h1 className="font-greatVibes text-6xl md:text-8xl lg:text-9xl leading-none">
          {titleChars}
        </h1>
      </div>

      {/* Ornament */}
      <div
        ref={ornamentRef}
        className="opacity-0 ornament-divider w-full max-w-sm mb-5 px-4 relative z-10"
        style={{ transformOrigin: 'center' }}
      >
        <span className="text-gold text-xl">✦</span>
        <span className="text-gold/60 text-sm font-cormorant tracking-[0.3em] uppercase">A Gift of Words</span>
        <span className="text-gold text-xl">✦</span>
      </div>

      {/* Dedicated to */}
      <div
        ref={subtitleRef}
        className="opacity-0 text-center mb-4 space-y-1 relative z-10"
        style={{ willChange: 'transform' }}
      >
        <p className="font-cormorant text-xl md:text-2xl text-cream/70 italic tracking-wider">
          dedicated to
        </p>
        <p className="font-cormorant text-4xl md:text-5xl lg:text-6xl font-light tracking-widest text-gold-shimmer">
          {nameChars}
        </p>
      </div>

      {/* Byline */}
      <div ref={bylineRef} className="opacity-0 text-center mt-2 relative z-10">
        <p className="font-poppins text-xs md:text-sm text-cream/40 tracking-[0.4em] uppercase">
          with love &amp; duas — Aliyan Ahmed Siddiqui
        </p>
      </div>

      {/* Scroll hint with bouncing dot */}
      <div
        ref={scrollRef}
        className="opacity-0 absolute bottom-52 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
      >
        <span className="font-poppins text-xs text-cream/30 tracking-[0.3em] uppercase">scroll</span>
        <div className="relative w-px h-14">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-gold/30 to-transparent" />
          <div
            className="absolute w-2 h-2 rounded-full bg-gold/70 left-1/2 -translate-x-1/2"
            style={{ animation: 'scrollDot 1.8s ease-in-out infinite' }}
          />
        </div>
      </div>

      {/* Mosque silhouette */}
      <MosqueSilhouette />
    </section>
  )
}
