import { useMemo, useCallback } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown, Compass, Star } from 'lucide-react'

const PARTICLE_COUNT = 40
const STAR_COUNT = 60

function generateParticles() {
  return Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 15 + 10,
    delay: Math.random() * 15,
  }))
}

function generateStars() {
  return Array.from({ length: STAR_COUNT }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    size: Math.random() * 2 + 0.5,
    duration: Math.random() * 3 + 2,
    delay: Math.random() * 3,
  }))
}

export default function Hero() {
  const particles = useMemo(() => generateParticles(), [])
  const stars = useMemo(() => generateStars(), [])

  const scrollToDestinations = useCallback(() => {
    document.getElementById('destinations')?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  const scrollToChat = useCallback(() => {
    // Trigger chatbot open
    document.dispatchEvent(new CustomEvent('open-chatbot'))
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden hero-bg">
      {/* Animated gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 60%, rgba(13,13,26,0.8) 0%, rgba(10,10,15,1) 70%)',
        }}
      />

      {/* Stars */}
      {stars.map((star) => (
        <div
          key={star.id}
          className="star"
          style={{
            left: `${star.left}%`,
            top: `${star.top}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animationDuration: `${star.duration}s`,
            animationDelay: `${star.delay}s`,
          }}
        />
      ))}

      {/* Particles */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="particle"
          style={{
            left: `${p.left}%`,
            bottom: 0,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}

      {/* Decorative clock rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="absolute w-[600px] h-[600px] rounded-full border border-gold/5 animate-spin-slow"
          style={{ animationDuration: '40s' }}
        />
        <div
          className="absolute w-[800px] h-[800px] rounded-full border border-gold/3"
          style={{
            animation: 'spin 60s linear infinite reverse',
          }}
        />
        <div className="absolute w-[400px] h-[400px] rounded-full border border-gold/8 animate-spin-slow" />
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center px-4 sm:px-6 max-w-5xl mx-auto">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full text-xs font-medium tracking-widest uppercase"
          style={{
            background: 'rgba(212, 168, 87, 0.1)',
            border: '1px solid rgba(212, 168, 87, 0.3)',
            color: '#d4a857',
          }}
        >
          <Star size={12} fill="currentColor" />
          Agence de voyage temporel de luxe
          <Star size={12} fill="currentColor" />
        </motion.div>

        {/* Main title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-tight mb-6"
        >
          Traversez
          <br />
          <span className="text-gradient-gold italic">les siècles</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Paris 1889, Crétacé −65M, Florence 1504.{' '}
          <span className="text-gray-300">
            Trois époques d'exception vous attendent.
          </span>{' '}
          Laissez-vous guider par notre intelligence artificielle pour choisir
          le voyage de vos rêves.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button
            onClick={scrollToDestinations}
            className="btn-gold text-base px-8 py-4 flex items-center justify-center gap-2"
          >
            <Compass size={18} />
            Découvrir nos destinations
          </button>
          <button
            onClick={scrollToChat}
            className="btn-outline text-base px-8 py-4 flex items-center justify-center gap-2"
          >
            <span>🤖</span>
            Parler à notre agent IA
          </button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="flex flex-wrap justify-center gap-8 mt-16"
        >
          {[
            { value: '3', label: 'Destinations' },
            { value: '2M+', label: 'Années d\'histoire' },
            { value: '100%', label: 'Sécurisé' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-serif text-2xl font-bold text-gradient-gold">
                {stat.value}
              </div>
              <div className="text-xs text-gray-500 uppercase tracking-widest mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-gray-600 uppercase tracking-widest">
          Explorer
        </span>
        <ChevronDown
          size={20}
          className="text-gold"
          style={{ animation: 'scrollBounce 2s ease-in-out infinite' }}
        />
      </motion.div>
    </section>
  )
}
