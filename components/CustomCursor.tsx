'use client'

import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'

export default function CustomCursor() {
  const dotRef   = useRef<HTMLDivElement>(null)
  const ringRef  = useRef<HTMLDivElement>(null)
  const trailRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Don't run on touch-only devices
    if (window.matchMedia('(pointer: coarse)').matches) return

    const dot   = dotRef.current
    const ring  = ringRef.current
    const trail = trailRef.current
    if (!dot || !ring || !trail) return

    // Hide native cursor on body
    document.body.style.cursor = 'none'

    let mouseX = window.innerWidth / 2
    let mouseY = window.innerHeight / 2
    let frameId = 0

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY

      // Dot follows instantly
      gsap.set(dot, { x: mouseX, y: mouseY })

      // Ring follows with lag
      gsap.to(ring, {
        x: mouseX,
        y: mouseY,
        duration: 0.38,
        ease: 'power2.out',
        overwrite: 'auto',
      })

      // Spawn trail sparkle occasionally
      if (Math.random() > 0.72) {
        spawnTrail(trail, mouseX, mouseY)
      }
    }

    // Grow ring on interactive elements
    const onEnterInteractive = () => {
      gsap.to(ring, { scale: 2.0, borderColor: 'rgba(212,175,55,0.9)', duration: 0.25 })
      gsap.to(dot,  { scale: 0.3, duration: 0.2 })
    }
    const onLeaveInteractive = () => {
      gsap.to(ring, { scale: 1.0, borderColor: 'rgba(212,175,55,0.45)', duration: 0.25 })
      gsap.to(dot,  { scale: 1.0, duration: 0.2 })
    }

    const interactiveSelectors = 'a, button, [role="button"], input, label, svg'
    const attachHover = () => {
      document.querySelectorAll<HTMLElement>(interactiveSelectors).forEach((el) => {
        el.addEventListener('mouseenter', onEnterInteractive)
        el.addEventListener('mouseleave', onLeaveInteractive)
        el.style.cursor = 'none'
      })
    }

    attachHover()

    window.addEventListener('mousemove', onMove)

    // Initial position
    gsap.set([dot, ring], { x: mouseX, y: mouseY })

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.body.style.cursor = ''
      cancelAnimationFrame(frameId)
      document.querySelectorAll<HTMLElement>(interactiveSelectors).forEach((el) => {
        el.removeEventListener('mouseenter', onEnterInteractive)
        el.removeEventListener('mouseleave', onLeaveInteractive)
        el.style.cursor = ''
      })
    }
  }, [])

  return (
    <>
      {/* Trail container */}
      <div ref={trailRef} className="fixed inset-0 pointer-events-none z-[99990]" />

      {/* Inner gold dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[99992]"
        style={{
          width: 8,
          height: 8,
          background: '#f0d060',
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)',
          filter: 'drop-shadow(0 0 5px rgba(240,208,96,1)) drop-shadow(0 0 12px rgba(212,175,55,0.8))',
          willChange: 'transform',
          mixBlendMode: 'screen',
        }}
      />

      {/* Outer ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-[99991]"
        style={{
          width: 32,
          height: 32,
          border: '1.5px solid rgba(212,175,55,0.45)',
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)',
          willChange: 'transform',
          transition: 'border-color 0.2s',
        }}
      />
    </>
  )
}

function spawnTrail(container: HTMLElement, x: number, y: number) {
  const colors = ['rgba(212,175,55,0.9)', 'rgba(255,255,255,0.8)', 'rgba(240,208,96,0.7)', 'rgba(255,220,100,0.6)']
  const el = document.createElement('div')
  const size = Math.random() * 5 + 2

  el.style.cssText = `
    position: fixed;
    left: ${x}px;
    top: ${y}px;
    width: ${size}px;
    height: ${size}px;
    background: ${colors[Math.floor(Math.random() * colors.length)]};
    border-radius: 50%;
    pointer-events: none;
    z-index: 99989;
    transform: translate(-50%, -50%);
    will-change: transform, opacity;
  `
  container.appendChild(el)

  gsap.to(el, {
    x: (Math.random() - 0.5) * 28,
    y: (Math.random() - 0.5) * 28,
    opacity: 0,
    scale: 0.1,
    duration: Math.random() * 0.5 + 0.4,
    ease: 'power2.out',
    onComplete: () => el.remove(),
  })
}
