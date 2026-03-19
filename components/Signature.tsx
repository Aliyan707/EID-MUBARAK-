'use client'

import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'

export default function Signature() {
  const sectionRef   = useRef<HTMLDivElement>(null)
  const heartRef     = useRef<HTMLSpanElement>(null)
  const nameRef      = useRef<HTMLDivElement>(null)
  const dateRef      = useRef<HTMLDivElement>(null)
  const dividerRef   = useRef<HTMLDivElement>(null)
  const arabicDuaRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    })

    tl.fromTo(dividerRef.current, { scaleX: 0 }, {
      scaleX: 1, duration: 1.2, ease: 'power2.inOut',
    })

    .fromTo(arabicDuaRef.current, { opacity: 0, y: 20 }, {
      opacity: 1, y: 0, duration: 1.0, ease: 'power2.out',
    }, '-=0.4')

    .fromTo(nameRef.current, { opacity: 0, x: -30 }, {
      opacity: 1, x: 0, duration: 1.2, ease: 'power3.out',
    }, '-=0.6')

    .fromTo(dateRef.current, { opacity: 0 }, {
      opacity: 1, duration: 0.9, ease: 'power2.out',
    }, '-=0.5')

    .fromTo(heartRef.current, { scale: 0, opacity: 0 }, {
      scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(2)',
    }, '-=0.3')

    // Heartbeat loop
    .then(() => {
      if (heartRef.current) {
        gsap.to(heartRef.current, {
          scale: 1.3,
          duration: 0.3,
          ease: 'power1.out',
          repeat: -1,
          yoyo: true,
          repeatDelay: 0.7,
        })
      }
    })

    // Floating hearts spawn
    const container = containerRef.current
    if (!container) return

    let heartInterval: ReturnType<typeof setInterval>

    const scrollTriggerInstance = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 80%',
      onEnter: () => {
        heartInterval = setInterval(() => {
          spawnFloatingHeart(container)
        }, 1400)
      },
      onLeave: () => clearInterval(heartInterval),
      onLeaveBack: () => clearInterval(heartInterval),
    })

    return () => {
      clearInterval(heartInterval)
      scrollTriggerInstance.kill()
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative z-20 py-24 md:py-36 px-4 flex flex-col items-center"
    >
      <div ref={containerRef} className="relative flex flex-col items-center gap-6 w-full max-w-lg">

        {/* Ornament divider */}
        <div
          ref={dividerRef}
          className="ornament-divider w-full"
          style={{ transformOrigin: 'center' }}
        >
          <span className="text-gold text-2xl">✦</span>
          <span className="text-gold/40 text-sm font-cormorant tracking-widest">Eid Mubarak</span>
          <span className="text-gold text-2xl">✦</span>
        </div>

        {/* Arabic dua */}
        <div
          ref={arabicDuaRef}
          className="text-center opacity-0"
          dir="rtl"
          lang="ar"
        >
          <p className="font-amiri text-2xl md:text-3xl text-gold/80 leading-loose">
            تقبَّل الله منا ومنكم
          </p>
          <p className="font-poppins text-xs text-cream/40 tracking-widest mt-1">
            May Allah accept from us and from you
          </p>
        </div>

        {/* Glass card for signature */}
        <div className="glass-card rounded-2xl px-10 py-8 text-center w-full">

          {/* Name */}
          <div ref={nameRef} className="opacity-0 mb-3">
            <p className="font-poppins text-xs text-cream/40 tracking-[0.4em] uppercase mb-3">
              With all my duas
            </p>
            <p className="font-greatVibes text-5xl md:text-6xl text-gold-shimmer leading-tight">
              Aliyan Ahmed Siddiqui
            </p>
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-gold/25 to-transparent my-4" />

          {/* Date */}
          <div ref={dateRef} className="opacity-0 flex items-center justify-center gap-3">
            <span className="text-gold/40 text-sm">✦</span>
            <p className="font-cormorant text-lg md:text-xl text-cream/60 italic tracking-widest">
              Eid ul-Fitr · March 2026
            </p>
            <span className="text-gold/40 text-sm">✦</span>
          </div>
        </div>

        {/* Animated heart */}
        <span
          ref={heartRef}
          className="text-5xl opacity-0 select-none"
          style={{ filter: 'drop-shadow(0 0 16px rgba(255,100,150,0.9))' }}
          aria-hidden="true"
        >
          🤍
        </span>

        {/* Footer */}
        <p className="font-poppins text-xs text-cream/25 tracking-[0.3em] uppercase mt-4">
          Made with love, lanterns & late nights
        </p>
      </div>
    </section>
  )
}

function spawnFloatingHeart(container: HTMLElement) {
  const hearts = ['🤍', '💛', '✨', '🌙', '⭐']
  const el = document.createElement('div')
  el.textContent = hearts[Math.floor(Math.random() * hearts.length)]

  const xStart = Math.random() * 300 - 150
  const size   = Math.random() * 20 + 14

  el.style.cssText = `
    position: absolute;
    bottom: 80px;
    left: 50%;
    transform: translateX(${xStart}px);
    font-size: ${size}px;
    pointer-events: none;
    z-index: 100;
    will-change: transform, opacity;
    user-select: none;
  `
  container.appendChild(el)

  gsap.to(el, {
    y: -(Math.random() * 140 + 80),
    x: `+=${Math.random() * 60 - 30}`,
    opacity: 0,
    scale: Math.random() * 0.5 + 0.3,
    duration: Math.random() * 1.8 + 1.4,
    ease: 'power1.out',
    onComplete: () => el.remove(),
  })
}
