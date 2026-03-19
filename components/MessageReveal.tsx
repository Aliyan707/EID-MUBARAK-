'use client'

import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'
// ScrollTrigger is registered globally in lib/gsap.ts — used via gsap's scrollTrigger:{} option

// ── Personal message paragraphs ──────────────────────────────────
const MESSAGE_PARAGRAPHS = [
  {
    id: 'opening',
    text: `Assalamualaikum warahmatullahi wabarakatuhu, my dear friend...`,
    style: 'italic text-gold/90 text-xl md:text-2xl font-cormorant',
  },
  {
    id: 'p1',
    text: `Today, as the moonlight spreads everywhere and the world is shining with the joys of Eid, my heart is turning only toward you. A friend like you is one of Allah's greatest blessings — someone who always listens with patience, understands quietly, and stands by you without any conditions. On this blessed occasion, I sincerely thank Allah from the bottom of my heart that you are part of my life.`,
    style: 'text-cream/85 font-poppins',
  },
  {
    id: 'p2',
    text: `This Eid is not just a festival; it reminds me of the beautiful bond we have built together over time. Those moments when we talked until morning came, laughed over the smallest things, held each other's hands through difficulties — all of it is still fresh in my mind. You taught me that a true friend is not someone who stays for a season, but someone who stays with the heart through every phase of life.`,
    style: 'text-cream/85 font-poppins',
  },
  {
    id: 'duas-intro',
    isSpecial: true,
    text: `On this beautiful and joyful day, these are my heartfelt prayers for you:`,
    style: 'text-gold/80 font-cormorant italic text-lg md:text-xl',
  },
  {
    id: 'duas-list',
    isDuaList: true,
    duas: [
      "May Allah Ta'ala accept every dua you have been making through the nights, and may He fulfill every hidden wish of your heart.",
      'May your life be filled with blessings from every direction, may every difficulty become easy, and may every day pass with happiness and peace.',
      'May He grant you perfect health, tranquility of the heart, and the correct guidance in every decision you make.',
      'May sincere and kind-hearted people always surround you — people who value you, love you genuinely, and constantly pray for your well-being.',
      'May every dream of yours turn into reality, may every closed door open for you, and may this Eid mark the beginning of the most beautiful and memorable chapter of your life.',
    ],
    text: '',
    style: '',
  },
  {
    id: 'p3',
    text: `You are an extremely precious friend to me, and I always pray that Allah keeps you happy forever, that your smile never fades, and that our friendship grows even stronger with every Eid that comes.`,
    style: 'text-cream/85 font-poppins',
  },
  {
    id: 'family',
    text: `Eid Mubarak to you and your beloved family. With lots of love, prayers, and utmost respect.`,
    style: 'text-cream/90 font-cormorant text-lg md:text-xl italic',
  },
  {
    id: 'final',
    text: `Your same friend who respects and values you so much 🌙✨❤️`,
    style: 'text-cream/95 font-cormorant text-xl md:text-2xl',
  },
]

function splitIntoWords(text: string) {
  return text.split(' ').map((word, i) => ({
    word,
    key: `${word}-${i}`,
  }))
}

interface ParagraphItem {
  id: string
  text: string
  style: string
  isSpecial?: boolean
  isDuaList?: boolean
  duas?: string[]
  dir?: string
}

function MessageParagraph({ para, index }: { para: ParagraphItem; index: number }) {
  const paraRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!paraRef.current) return

    const words = paraRef.current.querySelectorAll('.word-inner')
    if (!words.length) return

    gsap.fromTo(
      words,
      { opacity: 0, y: 25, rotationX: -20 },
      {
        opacity: 1,
        y: 0,
        rotationX: 0,
        duration: 0.5,
        stagger: 0.025,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: paraRef.current,
          start: 'top 88%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
        },
      }
    )
  }, [])

  if (para.isDuaList && para.duas) {
    return (
      <ul ref={paraRef as React.RefObject<HTMLUListElement>} className="space-y-3 mt-2 mb-2">
        {para.duas.map((dua, i) => (
          <li key={i} className="flex items-start gap-3">
            <span className="text-gold mt-1 shrink-0 text-sm">✦</span>
            <span className="font-poppins text-cream/80 text-sm md:text-base leading-relaxed">
              {splitIntoWords(dua).map(({ word, key }) => (
                <span key={key} className="word-wrapper">
                  <span className="word-inner">{word}&nbsp;</span>
                </span>
              ))}
            </span>
          </li>
        ))}
      </ul>
    )
  }

  return (
    <div
      ref={paraRef as React.RefObject<HTMLDivElement>}
      className={`leading-relaxed ${para.style}`}
      dir={(para as { dir?: string }).dir}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {splitIntoWords(para.text).map(({ word, key }) => (
        <span key={key} className="word-wrapper">
          <span className="word-inner">{word}&nbsp;</span>
        </span>
      ))}
    </div>
  )
}

export default function MessageReveal() {
  const sectionRef   = useRef<HTMLDivElement>(null)
  const headerRef    = useRef<HTMLDivElement>(null)
  const cardRef      = useRef<HTMLDivElement>(null)
  const ornamentTopRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Section header entrance
    gsap.fromTo(
      headerRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1, y: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: headerRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      }
    )

    // Card entrance
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 60, scale: 0.97 },
      {
        opacity: 1, y: 0, scale: 1,
        duration: 1.4,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 82%',
          toggleActions: 'play none none reverse',
        },
      }
    )

    // Top ornament line
    gsap.fromTo(
      ornamentTopRef.current,
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: 1.0,
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: ornamentTopRef.current,
          start: 'top 88%',
          toggleActions: 'play none none reverse',
        },
      }
    )
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative z-20 py-24 md:py-36 px-4 md:px-8"
    >
      <div className="max-w-3xl mx-auto">

        {/* Section header */}
        <div ref={headerRef} className="text-center mb-16 opacity-0">
          <p className="font-poppins text-xs text-gold/50 tracking-[0.5em] uppercase mb-4">
            A Message From the Heart
          </p>
          <h2 className="font-greatVibes text-5xl md:text-6xl text-gold-shimmer mb-4">
            For You, Arfa
          </h2>
          <div
            ref={ornamentTopRef}
            className="ornament-divider max-w-xs mx-auto"
            style={{ transformOrigin: 'center' }}
          >
            <span className="text-gold/60 font-amiri text-lg" dir="rtl">بسم الله الرحمن الرحيم</span>
          </div>
        </div>

        {/* Glassmorphic message card */}
        <div
          ref={cardRef}
          className="glass-card card-shimmer-border rounded-3xl p-8 md:p-12 opacity-0 relative overflow-hidden"
        >
          {/* Corner ornaments */}
          <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-gold/30 rounded-tl-xl" />
          <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-gold/30 rounded-tr-xl" />
          <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-gold/30 rounded-bl-xl" />
          <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-gold/30 rounded-br-xl" />

          {/* Subtle radial glow inside card */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at 50% 0%, rgba(212,175,55,0.06) 0%, transparent 70%)',
            }}
          />

          {/* Greeting */}
          <div className="mb-8">
            <p className="font-cormorant text-2xl md:text-3xl text-gold/90 italic mb-2">
              My dearest Arfa Siddiqui,
            </p>
            <div className="h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
          </div>

          {/* Paragraphs */}
          <div className="space-y-6 text-sm md:text-base leading-relaxed">
            {MESSAGE_PARAGRAPHS.map((para, i) => (
              <MessageParagraph key={para.id} para={para as ParagraphItem} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
