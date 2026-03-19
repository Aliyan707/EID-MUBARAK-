'use client'

import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'

export default function ShootingStars() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    function shoot() {
      if (!container) return
      const w = window.innerWidth
      const h = window.innerHeight

      // Start from top-right quadrant, travel toward bottom-left
      const startX = Math.random() * w * 0.8 + w * 0.15
      const startY = Math.random() * h * 0.45

      const length = Math.random() * 140 + 70
      const angle  = 130 + Math.random() * 20  // degrees — mostly down-left
      const rad    = (angle * Math.PI) / 180

      const travelX = Math.cos(rad) * (length * 4 + Math.random() * 250)
      const travelY = Math.sin(rad) * (length * 4 + Math.random() * 250)

      const trail = document.createElement('div')
      trail.style.cssText = `
        position: fixed;
        left: ${startX}px;
        top: ${startY}px;
        width: ${length}px;
        height: ${Math.random() * 1.5 + 0.8}px;
        background: linear-gradient(
          90deg,
          rgba(255,255,255,0) 0%,
          rgba(212,175,55,0.6) 40%,
          rgba(255,255,255,1) 100%
        );
        border-radius: 999px;
        pointer-events: none;
        z-index: 6;
        opacity: 0;
        transform: rotate(${angle}deg);
        transform-origin: right center;
        will-change: transform, opacity;
      `
      container.appendChild(trail)

      // Tiny sparkle head
      const head = document.createElement('div')
      head.style.cssText = `
        position: fixed;
        left: ${startX}px;
        top: ${startY - 2}px;
        width: 4px;
        height: 4px;
        background: #fff;
        border-radius: 50%;
        pointer-events: none;
        z-index: 7;
        opacity: 0;
        filter: blur(0.5px) drop-shadow(0 0 4px rgba(255,215,0,1));
        will-change: transform, opacity;
      `
      container.appendChild(head)

      const dur = Math.random() * 0.5 + 0.35

      const tl = gsap.timeline({ onComplete: () => { trail.remove(); head.remove() } })

      tl.to([trail, head], { opacity: 1, duration: 0.08 })
        .to([trail, head], {
          x: travelX,
          y: travelY,
          opacity: 0,
          duration: dur,
          ease: 'power1.in',
        })
    }

    // Randomised periodic shooter
    let timeoutId: ReturnType<typeof setTimeout>

    function scheduleNext() {
      const delay = Math.random() * 3500 + 1500
      timeoutId = setTimeout(() => {
        shoot()
        // 35% chance of a twin shot
        if (Math.random() > 0.65) {
          setTimeout(shoot, Math.random() * 400 + 150)
        }
        scheduleNext()
      }, delay)
    }

    const firstShot = setTimeout(() => {
      shoot()
      scheduleNext()
    }, 1200)

    return () => {
      clearTimeout(firstShot)
      clearTimeout(timeoutId)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 6 }}
    />
  )
}
