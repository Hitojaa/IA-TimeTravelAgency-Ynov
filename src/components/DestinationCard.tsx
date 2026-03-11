import { motion } from 'framer-motion'
import { ArrowRight, Clock, Tag, Sparkles } from 'lucide-react'
import type { Destination } from '../types'

interface Props {
  destination: Destination
  index: number
}

export default function DestinationCard({ destination, index }: Props) {
  const handleBook = () => {
    // Open chatbot with pre-filled message
    document.dispatchEvent(
      new CustomEvent('open-chatbot', {
        detail: { message: `Je souhaite en savoir plus sur la destination ${destination.name}` },
      })
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay: index * 0.15 }}
      className="group relative card-glass rounded-2xl overflow-hidden flex flex-col hover:border-gold/40 transition-all duration-500 hover:-translate-y-2"
      style={{
        boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
      }}
      whileHover={{
        boxShadow: `0 20px 60px rgba(0,0,0,0.4), 0 0 30px ${destination.accentColor}20`,
      }}
    >
      {/* Image */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={destination.image}
          alt={destination.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to bottom, transparent 30%, rgba(10,10,15,0.95) 100%)`,
          }}
        />

        {/* Era badge */}
        <div className="absolute top-4 left-4">
          <span
            className="text-xs font-medium px-3 py-1.5 rounded-full backdrop-blur-sm"
            style={{
              background: `${destination.accentColor}30`,
              border: `1px solid ${destination.accentColor}50`,
              color: destination.accentColor,
            }}
          >
            {destination.era}
          </span>
        </div>

        {/* Price badge */}
        <div className="absolute top-4 right-4">
          <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-dark/80 backdrop-blur-sm text-gold border border-gold/30">
            À partir de {destination.price.toLocaleString('fr-FR')} €
          </span>
        </div>

        {/* Emoji */}
        <div className="absolute bottom-4 left-4 text-4xl">
          {destination.emoji}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6">
        {/* Title */}
        <div className="mb-4">
          <h3 className="font-serif text-2xl font-bold text-white mb-1 group-hover:text-gold transition-colors duration-300">
            {destination.name}
          </h3>
          <div className="flex items-center gap-1.5 text-gray-500 text-xs">
            <Clock size={12} />
            <span>{destination.duration}</span>
            <span className="mx-1">•</span>
            <span>{destination.year}</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-400 text-sm leading-relaxed mb-5 flex-1">
          {destination.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-5">
          {destination.tags.map((tag) => (
            <span
              key={tag}
              className="flex items-center gap-1 text-xs text-gray-500 px-2.5 py-1 rounded-full"
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              <Tag size={10} />
              {tag}
            </span>
          ))}
        </div>

        {/* Highlights */}
        <div className="mb-6">
          <p className="text-xs text-gray-600 uppercase tracking-widest mb-3 flex items-center gap-1.5">
            <Sparkles size={10} className="text-gold" />
            Points forts
          </p>
          <ul className="space-y-1.5">
            {destination.highlights.slice(0, 3).map((h) => (
              <li key={h} className="flex items-start gap-2 text-xs text-gray-400">
                <span className="text-gold mt-0.5">✦</span>
                {h}
              </li>
            ))}
          </ul>
        </div>

        {/* CTA */}
        <button
          onClick={handleBook}
          className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold transition-all duration-300 group/btn"
          style={{
            background: `${destination.accentColor}20`,
            border: `1px solid ${destination.accentColor}40`,
            color: destination.accentColor,
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget
            el.style.background = `${destination.accentColor}30`
            el.style.borderColor = `${destination.accentColor}70`
            el.style.boxShadow = `0 0 20px ${destination.accentColor}20`
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget
            el.style.background = `${destination.accentColor}20`
            el.style.borderColor = `${destination.accentColor}40`
            el.style.boxShadow = 'none'
          }}
        >
          Explorer cette époque
          <ArrowRight size={16} className="transition-transform duration-300 group-hover/btn:translate-x-1" />
        </button>
      </div>
    </motion.div>
  )
}
