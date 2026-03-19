'use client'

import { useEffect, useRef } from 'react'
import { ScrollTrigger } from '@/lib/gsap'

// Dynamically import Lenis to avoid SSR issues
export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<unknown>(null)

  useEffect(() => {
    let lenis: {
      raf: (t: number) => void
      on: (e: string, cb: unknown) => void
      destroy: () => void
    } | null = null

    import('@studio-freight/lenis').then(({ default: Lenis }) => {
      lenis = new Lenis({
        duration: 1.4,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 0.9,
        touchMultiplier: 1.5,
      }) as typeof lenis

      lenisRef.current = lenis

      lenis!.on('scroll', ScrollTrigger.update)

      const ticker = (time: number) => {
        lenis!.raf(time * 1000)
      }

      import('@/lib/gsap').then(({ gsap }) => {
        gsap.ticker.add(ticker)
        gsap.ticker.lagSmoothing(0)
      })
    })

    return () => {
      if (lenis) lenis.destroy()
    }
  }, [])

  return <>{children}</>
}
