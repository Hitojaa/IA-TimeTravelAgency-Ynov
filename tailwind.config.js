/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#d4a857',
          light: '#f0c879',
          dark: '#b8893f',
          muted: 'rgba(212, 168, 87, 0.15)',
        },
        dark: {
          DEFAULT: '#0a0a0f',
          card: '#111118',
          border: 'rgba(212, 168, 87, 0.2)',
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out 2s infinite',
        'pulse-gold': 'pulseGold 2s ease-in-out infinite',
        'gradient': 'gradientShift 15s ease infinite',
        'particle': 'particle 20s linear infinite',
        'spin-slow': 'spin 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        pulseGold: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(212, 168, 87, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(212, 168, 87, 0.6)' },
        },
        gradientShift: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        particle: {
          '0%': { transform: 'translateY(100vh) rotate(0deg)', opacity: '0' },
          '10%': { opacity: '1' },
          '90%': { opacity: '1' },
          '100%': { transform: 'translateY(-10vh) rotate(720deg)', opacity: '0' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
