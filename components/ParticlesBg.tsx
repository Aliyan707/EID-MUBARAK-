'use client'

import { useEffect, useState, useCallback } from 'react'
import Particles, { initParticlesEngine } from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'
import type { Container, Engine } from '@tsparticles/engine'

export default function ParticlesBg() {
  const [init, setInit] = useState(false)

  useEffect(() => {
    initParticlesEngine(async (engine: Engine) => {
      await loadSlim(engine)
    }).then(() => {
      setInit(true)
    })
  }, [])

  const particlesLoaded = useCallback(async (_container: Container | undefined) => {
    // Container loaded
  }, [])

  if (!init) return null

  return (
    <Particles
      id="tsparticles"
      particlesLoaded={particlesLoaded}
      options={{
        fpsLimit: 60,
        background: { color: { value: 'transparent' } },
        particles: {
          number: {
            value: 280,
            density: { enable: true, width: 1920, height: 1080 },
          },
          color: {
            value: ['#ffffff', '#ffd700', '#fffde7', '#bde0fe', '#e6e6fa', '#ffeaa7'],
          },
          shape: { type: 'circle' },
          opacity: {
            value: { min: 0.05, max: 1.0 },
            animation: {
              enable: true,
              speed: 0.6,
              sync: false,
            },
          },
          size: {
            value: { min: 0.3, max: 2.8 },
            animation: {
              enable: true,
              speed: 1.2,
              sync: false,
            },
          },
          move: {
            enable: true,
            speed: { min: 0.03, max: 0.25 },
            direction: 'none',
            random: true,
            straight: false,
            outModes: { default: 'out' },
          },
          twinkle: {
            particles: {
              enable: true,
              frequency: 0.06,
              opacity: 1,
            },
          },
        },
        detectRetina: true,
        interactivity: {
          events: {
            onHover: {
              enable: true,
              mode: 'grab',
            },
          },
          modes: {
            grab: {
              distance: 140,
              links: {
                opacity: 0.15,
                color: '#d4af37',
              },
            },
          },
        },
      }}
    />
  )
}
