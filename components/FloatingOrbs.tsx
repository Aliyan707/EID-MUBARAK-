'use client'

import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'

interface Orb {
  x: string
  y: string
  size: number
  color: string
  duration: number
  delay: number
  driftX: number
  driftY: number
}

const ORBS: Orb[] = [
  { x: '10%',  y: '20%', size: 300, color: 'rgba(100,0,130,0.06)',  duration: 18, delay: 0,   driftX: 40,  driftY: 30  },
  { x: '75%',  y: '10%', size: 260, color: 'rgba(0,60,140,0.07)',   duration: 22, delay: 3,   driftX: -30, driftY: 50  },
  { x: '50%',  y: '60%', size: 350, color: 'rgba(140,60,0,0.05)',   duration: 25, delay: 6,   driftX: 50,  driftY: -40 },
  { x: '5%',   y: '75%', size: 200, color: 'rgba(0,80,100,0.06)',   duration: 20, delay: 1.5, driftX: 60,  driftY: 20  },
  { x: '85%',  y: '65%', size: 280, color: 'rgba(80,0,100,0.05)',   duration: 23, delay: 8,   driftX: -40, driftY: -30 },
  { x: '35%',  y: '90%', size: 220, color: 'rgba(0,40,80,0.06)',    duration: 19, delay: 4,   driftX: 30,  driftY: -50 },
]

export default function FloatingOrbs() {
  const orbRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    orbRefs.current.forEach((el, i) => {
      if (!el) return
      const orb = ORBS[i]

      // Primary drift
      gsap.to(el, {
        x: orb.driftX,
        y: orb.driftY,
        duration: orb.duration,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        delay: orb.delay,
      })

      // Secondary slow breathe (scale + opacity)
      gsap.to(el, {
        scale: 1.25,
        opacity: 0.7,
        duration: orb.duration * 0.6,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        delay: orb.delay + 2,
      })
    })
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 2 }}>
      {ORBS.map((orb, i) => (
        <div
          key={i}
          ref={(el) => { orbRefs.current[i] = el }}
          className="absolute rounded-full"
          style={{
            left: orb.x,
            top:  orb.y,
            width:  orb.size,
            height: orb.size,
            background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
            transform: 'translate(-50%, -50%)',
            filter: 'blur(40px)',
            willChange: 'transform, opacity',
          }}
        />
      ))}
    </div>
  )
}
