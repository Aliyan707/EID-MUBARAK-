'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import Hero from '@/components/Hero'
import MessageReveal from '@/components/MessageReveal'
import Signature from '@/components/Signature'

// Dynamic (browser-only) imports
const SmoothScroll   = dynamic(() => import('@/components/SmoothScroll'),   { ssr: false })
const ParticlesBg    = dynamic(() => import('@/components/ParticlesBg'),    { ssr: false })
const Lanterns       = dynamic(() => import('@/components/Lanterns'),       { ssr: false })
const AudioPlayer    = dynamic(() => import('@/components/AudioPlayer'),    { ssr: false })
const Preloader      = dynamic(() => import('@/components/Preloader'),      { ssr: false })
const ShootingStars  = dynamic(() => import('@/components/ShootingStars'),  { ssr: false })
const CustomCursor   = dynamic(() => import('@/components/CustomCursor'),   { ssr: false })
const ScrollProgress = dynamic(() => import('@/components/ScrollProgress'), { ssr: false })
const FloatingOrbs   = dynamic(() => import('@/components/FloatingOrbs'),  { ssr: false })

export default function Home() {
  const [preloaderDone, setPreloaderDone] = useState(false)

  return (
    <>
      {/* ── Preloader (shown first, fades out) ── */}
      {!preloaderDone && (
        <Preloader onComplete={() => setPreloaderDone(true)} />
      )}

      {/* ── Main experience ── */}
      <SmoothScroll>

        {/* ── Global UI ── */}
        <CustomCursor />
        <ScrollProgress />

        {/* ── Layer 1: Deep nebula orbs (fixed, blurred) ── */}
        <FloatingOrbs />

        {/* ── Layer 2: tsParticles star field (fixed) ── */}
        <ParticlesBg />

        {/* ── Layer 3: Shooting stars (fixed) ── */}
        <ShootingStars />

        {/* ── Layer 4: Floating fanoos lanterns (fixed) ── */}
        <Lanterns />

        {/* ── Layer 5: Scrollable content ── */}
        <main className="relative z-20 min-h-screen">

          <Hero />

          {/* Section break */}
          <div className="relative z-20 py-2">
            <div
              className="max-w-4xl mx-auto px-6"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.08), transparent)',
                height: '1px',
              }}
            />
          </div>

          <MessageReveal />

          <Signature />

          <div className="h-20" />
        </main>

        {/* ── Layer 6: Fixed UI elements ── */}
        <AudioPlayer />

      </SmoothScroll>
    </>
  )
}
