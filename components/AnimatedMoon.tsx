'use client'

import { useEffect, useRef, useCallback } from 'react'
import { gsap } from '@/lib/gsap'

export default function AnimatedMoon() {
  const moonGroupRef = useRef<SVGGElement>(null)
  const glowRef = useRef<SVGCircleElement>(null)
  const haloRef = useRef<SVGCircleElement>(null)
  const sparkleContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!moonGroupRef.current) return

    // Gentle floating
    gsap.to(moonGroupRef.current, {
      y: -18,
      duration: 3.5,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
    })

    // Outer halo pulse
    if (haloRef.current) {
      gsap.to(haloRef.current, {
        opacity: 0.35,
        scale: 1.12,
        transformOrigin: 'center center',
        duration: 2.5,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      })
    }

    // Inner glow pulse
    if (glowRef.current) {
      gsap.to(glowRef.current, {
        opacity: 0.55,
        scale: 1.08,
        transformOrigin: 'center center',
        duration: 2,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        delay: 0.5,
      })
    }
  }, [])

  const handleClick = useCallback(() => {
    if (!sparkleContainerRef.current || !moonGroupRef.current) return

    const svgEl = moonGroupRef.current.closest('svg')
    if (!svgEl) return
    const rect = svgEl.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2

    const container = sparkleContainerRef.current
    const colors = ['#ffd700', '#fff', '#fffde7', '#ffb347', '#e6e6fa', '#f0d060']

    // Burst sparkles
    for (let i = 0; i < 28; i++) {
      const el = document.createElement('div')
      const size = Math.random() * 10 + 4
      const color = colors[Math.floor(Math.random() * colors.length)]
      const isHeart = Math.random() > 0.7

      el.style.cssText = `
        position: fixed;
        left: ${cx}px;
        top: ${cy}px;
        width: ${size}px;
        height: ${size}px;
        background: ${isHeart ? 'transparent' : color};
        color: ${color};
        font-size: ${isHeart ? size * 2 : 0}px;
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transform: translate(-50%, -50%);
        display: flex; align-items: center; justify-content: center;
      `
      if (isHeart) el.textContent = '♥'

      container.appendChild(el)

      const angle = (Math.PI * 2 * i) / 28 + Math.random() * 0.4
      const dist = Math.random() * 180 + 70

      gsap.to(el, {
        x: Math.cos(angle) * dist,
        y: Math.sin(angle) * dist,
        opacity: 0,
        scale: Math.random() * 0.5 + 0.2,
        duration: Math.random() * 1.0 + 0.7,
        ease: 'power2.out',
        onComplete: () => el.remove(),
      })
    }

    // Moon flash
    gsap.to(moonGroupRef.current, {
      scale: 1.15,
      transformOrigin: 'center center',
      duration: 0.15,
      ease: 'power2.out',
      yoyo: true,
      repeat: 1,
    })
  }, [])

  return (
    <>
      <div ref={sparkleContainerRef} className="fixed inset-0 pointer-events-none z-[9999]" />

      <div
        className="relative cursor-pointer select-none"
        onClick={handleClick}
        title="Click me ✨"
      >
        <svg
          viewBox="0 0 260 260"
          width="260"
          height="260"
          xmlns="http://www.w3.org/2000/svg"
          className="glow-moon overflow-visible"
          aria-label="Glowing crescent moon — click for magic"
        >
          <defs>
            {/* Moon body gradient */}
            <radialGradient id="moonBodyGrad" cx="38%" cy="32%" r="68%">
              <stop offset="0%"   stopColor="#fffde7" />
              <stop offset="30%"  stopColor="#ffe57f" />
              <stop offset="65%"  stopColor="#d4af37" />
              <stop offset="100%" stopColor="#8b6914" />
            </radialGradient>

            {/* Outer halo gradient */}
            <radialGradient id="haloGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%"   stopColor="rgba(255,215,0,0.55)" />
              <stop offset="50%"  stopColor="rgba(255,180,0,0.2)" />
              <stop offset="100%" stopColor="rgba(255,140,0,0)" />
            </radialGradient>

            {/* Inner glow gradient */}
            <radialGradient id="innerGlowGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%"   stopColor="rgba(255,235,100,0.7)" />
              <stop offset="100%" stopColor="rgba(255,180,0,0)" />
            </radialGradient>

            {/* Surface texture for the moon */}
            <radialGradient id="craterGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%"   stopColor="rgba(255,255,255,0.0)" />
              <stop offset="100%" stopColor="rgba(0,0,0,0.18)" />
            </radialGradient>

            {/* Clip path for crescent */}
            <clipPath id="crescentClip">
              <path d="M130,20 A90,90 0 1,1 130,240 A90,90 0 1,1 130,20 Z" />
            </clipPath>
          </defs>

          <g ref={moonGroupRef}>
            {/* Outermost halo */}
            <circle
              ref={haloRef}
              cx="130" cy="130" r="110"
              fill="url(#haloGrad)"
              opacity="0.45"
            />

            {/* Mid glow */}
            <circle
              ref={glowRef}
              cx="130" cy="130" r="88"
              fill="url(#innerGlowGrad)"
              opacity="0.5"
            />

            {/* Moon body — full golden circle */}
            <circle cx="118" cy="130" r="78" fill="url(#moonBodyGrad)" />

            {/* Crescent cutout — same deep background color */}
            <circle cx="148" cy="112" r="68" fill="#04040f" />

            {/* Subtle crater textures on the visible sliver */}
            <circle cx="80" cy="105" r="6"  fill="url(#craterGrad)" opacity="0.5" />
            <circle cx="94" cy="148" r="4"  fill="url(#craterGrad)" opacity="0.4" />
            <circle cx="72" cy="140" r="3"  fill="url(#craterGrad)" opacity="0.35" />
            <circle cx="88" cy="88"  r="3.5" fill="url(#craterGrad)" opacity="0.4" />

            {/* Star cluster near the moon */}
            {[
              { cx: 185, cy: 55,  r: 2.5, op: 0.95 },
              { cx: 200, cy: 78,  r: 1.8, op: 0.8  },
              { cx: 175, cy: 42,  r: 1.4, op: 0.7  },
              { cx: 210, cy: 100, r: 2.2, op: 0.85 },
              { cx: 195, cy: 38,  r: 1.0, op: 0.6  },
              { cx: 168, cy: 190, r: 1.8, op: 0.75 },
              { cx: 55,  cy: 70,  r: 2.0, op: 0.7  },
              { cx: 45,  cy: 165, r: 1.5, op: 0.65 },
              { cx: 220, cy: 140, r: 1.2, op: 0.6  },
            ].map((s, i) => (
              <circle
                key={i}
                cx={s.cx} cy={s.cy} r={s.r}
                fill="#fffde7"
                opacity={s.op}
              />
            ))}

            {/* Decorative 4-pointed star sparkles */}
            {[
              { x: 190, y: 58, size: 5 },
              { x: 205, y: 100, size: 4 },
              { x: 52, y: 72, size: 4 },
            ].map((st, i) => (
              <g key={i} transform={`translate(${st.x}, ${st.y})`}>
                <path
                  d={`M0,${-st.size} L${st.size * 0.2},0 L0,${st.size} L${-st.size * 0.2},0 Z`}
                  fill="#fffde7"
                  opacity="0.9"
                />
                <path
                  d={`M${-st.size},0 L0,${st.size * 0.2} L${st.size},0 L0,${-st.size * 0.2} Z`}
                  fill="#fffde7"
                  opacity="0.9"
                />
              </g>
            ))}
          </g>
        </svg>

        {/* Click hint */}
        <p className="absolute -bottom-7 left-1/2 -translate-x-1/2 text-xs text-gold/50 font-poppins tracking-widest whitespace-nowrap animate-pulse">
          ✦ click to cast magic ✦
        </p>
      </div>
    </>
  )
}
