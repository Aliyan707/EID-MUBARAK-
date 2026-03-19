'use client'

import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'

interface LanternConfig {
  id: number
  top: string
  left: string
  scale: number
  glassColor: string
  glowColor: string
  delay: number
  floatDuration: number
  rotateDuration: number
  driftX: number
  driftY: number
}

const LANTERNS: LanternConfig[] = [
  {
    id: 1,
    top: '6%',   left: '4%',  scale: 0.75, glassColor: '#e63946',
    glowColor: 'rgba(230,57,70,0.55)',  delay: 0,   floatDuration: 4.2, rotateDuration: 5.5, driftX: 18, driftY: 22,
  },
  {
    id: 2,
    top: '8%',   left: '87%', scale: 1.0,  glassColor: '#2d9e6a',
    glowColor: 'rgba(45,158,106,0.5)',  delay: 0.6, floatDuration: 5.0, rotateDuration: 6.0, driftX: 14, driftY: 28,
  },
  {
    id: 3,
    top: '42%',  left: '2%',  scale: 0.65, glassColor: '#e9c46a',
    glowColor: 'rgba(233,196,106,0.55)', delay: 1.1, floatDuration: 3.8, rotateDuration: 7.0, driftX: 20, driftY: 18,
  },
  {
    id: 4,
    top: '40%',  left: '91%', scale: 0.88, glassColor: '#a663cc',
    glowColor: 'rgba(166,99,204,0.5)',  delay: 0.4, floatDuration: 4.6, rotateDuration: 5.0, driftX: 15, driftY: 25,
  },
  {
    id: 5,
    top: '75%',  left: '6%',  scale: 0.6,  glassColor: '#4cc9f0',
    glowColor: 'rgba(76,201,240,0.5)',  delay: 0.9, floatDuration: 5.2, rotateDuration: 6.5, driftX: 22, driftY: 20,
  },
  {
    id: 6,
    top: '72%',  left: '85%', scale: 0.78, glassColor: '#f4a261',
    glowColor: 'rgba(244,162,97,0.55)', delay: 1.5, floatDuration: 4.0, rotateDuration: 5.8, driftX: 16, driftY: 24,
  },
  {
    id: 7,
    top: '22%',  left: '50%', scale: 0.55, glassColor: '#ff6b9d',
    glowColor: 'rgba(255,107,157,0.45)', delay: 2.0, floatDuration: 6.0, rotateDuration: 8.0, driftX: 10, driftY: 30,
  },
]

function FanoosLantern({ glassColor, glowColor }: { glassColor: string; glowColor: string }) {
  // Fanoos (traditional Egyptian lantern) SVG
  // Viewbox 80×160
  return (
    <svg
      viewBox="-40 -80 80 160"
      width="80"
      height="160"
      xmlns="http://www.w3.org/2000/svg"
      overflow="visible"
    >
      <defs>
        <radialGradient id={`glass-${glassColor.replace('#','')}`} cx="40%" cy="35%" r="65%">
          <stop offset="0%"   stopColor="#ffffff" stopOpacity="0.7" />
          <stop offset="50%"  stopColor={glassColor} stopOpacity="0.9" />
          <stop offset="100%" stopColor={glassColor} stopOpacity="0.6" />
        </radialGradient>
        <filter id={`glow-${glassColor.replace('#','')}`} x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="8" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Outer glow halo */}
      <ellipse
        cx="0" cy="10" rx="28" ry="42"
        fill={glowColor}
        filter={`url(#glow-${glassColor.replace('#','')})`}
        opacity="0.5"
      />

      {/* Hanging chain */}
      <line x1="0" y1="-80" x2="0" y2="-62" stroke="#c9a84c" strokeWidth="1.5" strokeDasharray="3,2" />
      <circle cx="0" cy="-80" r="2.5" fill="#c9a84c" />

      {/* Top finial spike */}
      <polygon points="0,-68 -5,-55 5,-55" fill="#d4af37" />
      <circle cx="0" cy="-70" r="3" fill="#d4af37" />

      {/* Top horizontal cap */}
      <rect x="-16" y="-55" width="32" height="6" rx="3" fill="#c9a84c" />
      {/* Decorative dots on top cap */}
      <circle cx="-10" cy="-52" r="1.5" fill="#f0d060" opacity="0.8" />
      <circle cx="0"   cy="-52" r="1.5" fill="#f0d060" opacity="0.8" />
      <circle cx="10"  cy="-52" r="1.5" fill="#f0d060" opacity="0.8" />

      {/* === Main body === */}
      {/* Glass panels — octagonal body */}
      <path
        d="M-14,-49 L14,-49 L20,-28 L22,0 L20,30 L14,50 L-14,50 L-20,30 L-22,0 L-20,-28 Z"
        fill={`url(#glass-${glassColor.replace('#','')})`}
      />

      {/* Frame border */}
      <path
        d="M-14,-49 L14,-49 L20,-28 L22,0 L20,30 L14,50 L-14,50 L-20,30 L-22,0 L-20,-28 Z"
        fill="none" stroke="#c9a84c" strokeWidth="1.8"
      />

      {/* Inner light shimmer */}
      <path
        d="M-10,-44 L10,-44 L16,-25 L17,0 L16,26 L10,44 L-10,44 L-16,26 L-17,0 L-16,-25 Z"
        fill="rgba(255,240,160,0.45)"
      />

      {/* Horizontal frame bands */}
      <line x1="-22" y1="-28" x2="22" y2="-28" stroke="#c9a84c" strokeWidth="1.2" />
      <line x1="-22" y1="0"   x2="22" y2="0"   stroke="#c9a84c" strokeWidth="1.5" />
      <line x1="-20" y1="30"  x2="20" y2="30"  stroke="#c9a84c" strokeWidth="1.2" />

      {/* Vertical spokes */}
      <line x1="-7"  y1="-49" x2="-7"  y2="50" stroke="#c9a84c" strokeWidth="0.8" opacity="0.6" />
      <line x1="7"   y1="-49" x2="7"   y2="50" stroke="#c9a84c" strokeWidth="0.8" opacity="0.6" />

      {/* Center decorative medallion */}
      <circle cx="0" cy="0" r="9" fill="rgba(255,220,100,0.2)" stroke="#d4af37" strokeWidth="1" />
      {/* 6-pointed star in medallion */}
      <polygon
        points="0,-7 2,-2 7,-2 3,2 5,7 0,4 -5,7 -3,2 -7,-2 -2,-2"
        fill="#d4af37" opacity="0.7"
      />

      {/* Bottom cap */}
      <rect x="-16" y="50" width="32" height="6" rx="3" fill="#c9a84c" />

      {/* Tassel strands */}
      {[-6, 0, 6].map((xOff) => (
        <g key={xOff}>
          <line
            x1={xOff} y1="56"
            x2={xOff + (xOff < 0 ? -2 : xOff > 0 ? 2 : 0)} y2="72"
            stroke="#c9a84c" strokeWidth="1.2"
          />
          <circle cx={xOff + (xOff < 0 ? -2 : xOff > 0 ? 2 : 0)} cy="74" r="2.5" fill="#c9a84c" />
        </g>
      ))}
    </svg>
  )
}

export default function Lanterns() {
  const refs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    refs.current.forEach((el, i) => {
      if (!el) return
      const cfg = LANTERNS[i]

      // Initial entrance — fade + rise
      gsap.fromTo(
        el,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1.8, delay: cfg.delay + 0.5, ease: 'power2.out' }
      )

      // Continuous gentle float
      gsap.to(el, {
        y: `+=${cfg.driftY}`,
        x: `+=${cfg.driftX}`,
        rotation: `random(-4, 4)`,
        duration: cfg.floatDuration,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        delay: cfg.delay,
      })

      // Secondary sway (different axis)
      gsap.to(el, {
        x: `-=${cfg.driftX * 0.6}`,
        duration: cfg.rotateDuration,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        delay: cfg.delay + 1.5,
      })

      // Glow pulse
      const glowEl = el.querySelector('.lantern-glow-wrapper') as HTMLElement
      if (glowEl) {
        gsap.to(glowEl, {
          opacity: 0.55,
          scale: 1.08,
          duration: cfg.floatDuration * 0.7,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          delay: cfg.delay + 0.3,
          transformOrigin: 'center center',
        })
      }
    })
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {LANTERNS.map((cfg, i) => (
        <div
          key={cfg.id}
          ref={(el) => { refs.current[i] = el }}
          className="absolute opacity-0"
          style={{
            top: cfg.top,
            left: cfg.left,
            transform: `scale(${cfg.scale})`,
            transformOrigin: 'top center',
          }}
        >
          <div className="lantern-glow-wrapper" style={{ opacity: 0.85 }}>
            <FanoosLantern glassColor={cfg.glassColor} glowColor={cfg.glowColor} />
          </div>
        </div>
      ))}
    </div>
  )
}
