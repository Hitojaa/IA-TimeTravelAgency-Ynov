import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import DestinationCard from './DestinationCard'
import { destinations } from '../data/destinations'

export default function Destinations() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="destinations" className="py-24 px-4 sm:px-6 relative">
      {/* Section header */}
      <div className="max-w-7xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-gold text-sm uppercase tracking-widest mb-4 font-medium">
            Nos Destinations
          </p>
          <h2 className="section-title">
            Choisissez votre{' '}
            <span className="italic text-gradient-gold">époque</span>
          </h2>
          <p className="section-subtitle mt-4">
            Trois périodes exceptionnelles soigneusement sélectionnées pour
            leur richesse historique, culturelle et naturelle. Chaque voyage
            est une œuvre d'art.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {destinations.map((dest, i) => (
            <DestinationCard key={dest.id} destination={dest} index={i} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-14"
        >
          <p className="text-gray-500 text-sm mb-4">
            Vous ne savez pas laquelle choisir ?
          </p>
          <button
            onClick={() =>
              document
                .getElementById('quiz')
                ?.scrollIntoView({ behavior: 'smooth' })
            }
            className="btn-outline text-sm px-8 py-3"
          >
            Faire notre quiz de personnalité ✨
          </button>
        </motion.div>
      </div>
    </section>
  )
}
