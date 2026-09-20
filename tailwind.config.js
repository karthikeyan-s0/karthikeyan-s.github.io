/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        space: {
          950: '#040507',
          900: '#07080a',
          850: '#0b0d13',
          800: '#10131c',
          750: '#151926',
          700: '#1b2030',
          600: '#283046',
        },
        accent: {
          cyan: '#38bdf8',
          blue: '#2563eb',
          violet: '#a855f7',
          indigo: '#6366f1',
        },
        surface: {
          glass: 'rgba(15, 18, 28, 0.65)',
          border: 'rgba(255, 255, 255, 0.08)',
          highlight: 'rgba(255, 255, 255, 0.15)',
        }
      },
      fontFamily: {
        sans: ['Space Grotesk', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        display: ['Syne', 'Space Grotesk', 'sans-serif'],
      },
      letterSpacing: {
        tighter: '-0.05em',
        widest: '0.25em',
        ultra: '0.4em',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        'glow-blue': '0 0 35px -5px rgba(56, 189, 248, 0.25)',
        'glow-violet': '0 0 35px -5px rgba(168, 85, 247, 0.25)',
      }
    },
  },
  plugins: [],
}
