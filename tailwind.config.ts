import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        amiri: ['var(--font-amiri)', 'serif'],
        greatVibes: ['var(--font-great-vibes)', 'cursive'],
        cormorant: ['var(--font-cormorant)', 'serif'],
        poppins: ['var(--font-poppins)', 'sans-serif'],
        sacramento: ['var(--font-sacramento)', 'cursive'],
        reemKufi: ['var(--font-reem-kufi)', 'sans-serif'],
      },
      colors: {
        midnight: '#04040f',
        deepBlue: '#0a0818',
        gold: '#d4af37',
        goldLight: '#f0d060',
        goldDim: '#a07820',
        cream: '#fdf6e3',
        lanternRed: '#e63946',
        lanternGreen: '#2d9e6a',
        lanternAmber: '#f4a261',
        lanternPurple: '#a663cc',
        lanternTeal: '#4cc9f0',
        lanternYellow: '#e9c46a',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'twinkle': 'twinkle 3s ease-in-out infinite',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
        'heart-beat': 'heartBeat 1.5s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        twinkle: {
          '0%, 100%': { opacity: '0.2', transform: 'scale(0.8)' },
          '50%': { opacity: '1', transform: 'scale(1.2)' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(212, 175, 55, 0.4)' },
          '50%': { boxShadow: '0 0 60px rgba(212, 175, 55, 0.9), 0 0 100px rgba(212, 175, 55, 0.4)' },
        },
        heartBeat: {
          '0%, 100%': { transform: 'scale(1)' },
          '14%': { transform: 'scale(1.3)' },
          '28%': { transform: 'scale(1)' },
          '42%': { transform: 'scale(1.2)' },
          '70%': { transform: 'scale(1)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'gold-glow': '0 0 30px rgba(212, 175, 55, 0.6), 0 0 60px rgba(212, 175, 55, 0.3)',
        'gold-glow-sm': '0 0 15px rgba(212, 175, 55, 0.5)',
        'moon-glow': '0 0 80px rgba(255, 215, 0, 0.9), 0 0 160px rgba(255, 180, 0, 0.5)',
      },
    },
  },
  plugins: [],
}

export default config
