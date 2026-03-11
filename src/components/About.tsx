import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Shield, Zap, Clock, Award } from 'lucide-react'

const features = [
  {
    icon: Clock,
    title: 'Technologie de pointe',
    description:
      'Notre chronomoteur quantique permet des voyages précis à la nanoseconde près. Votre sécurité est notre priorité absolue.',
  },
  {
    icon: Shield,
    title: 'Sécurité garantie',
    description:
      'Chaque voyage est encadré par des experts historiens et scientifiques. Protocoles de sécurité multicouches certifiés.',
  },
  {
    icon: Zap,
    title: 'Expérience immersive',
    description:
      'Pas de vitre, pas de barrière — vous vivez l\'époque comme un vrai contemporain, costumes et documents d\'identité inclus.',
  },
  {
    icon: Award,
    title: 'Luxe absolu',
    description:
      'Hébergements d\'époque reconstitués à la perfection, gastronomie authentique, guides privés multilingues.',
  },
]

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="about" className="py-24 px-4 sm:px-6 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-5"
          style={{
            background: 'radial-gradient(circle, #d4a857, transparent)',
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-64 h-64 rounded-full opacity-5"
          style={{
            background: 'radial-gradient(circle, #d4a857, transparent)',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto" ref={ref}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-gold text-sm uppercase tracking-widest mb-4 font-medium">
            Notre Mission
          </p>
          <h2 className="section-title">
            Le voyage du futur,{' '}
            <span className="italic text-gradient-gold">vers le passé</span>
          </h2>
          <p className="section-subtitle mt-4">
            Fondée en 2047, TimeTravel Agency est la première agence de voyage
            temporel homologuée par le Conseil International du Temps. Nous
            avons ouvert l'histoire à ceux qui osent la vivre.
          </p>
        </motion.div>

        {/* Two columns */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          {/* Left: Image/visual */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] card-glass p-1">
              <img
                src="https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=600&h=450&fit=crop&q=80"
                alt="Voyage temporel — nébuleuse cosmique"
                className="w-full h-full object-cover rounded-xl opacity-80"
                loading="lazy"
              />
              <div
                className="absolute inset-0 rounded-xl"
                style={{
                  background:
                    'linear-gradient(to top, rgba(10,10,15,0.8) 0%, transparent 60%)',
                }}
              />
              {/* Overlay badge */}
              <div className="absolute bottom-4 left-4 right-4 card-glass rounded-xl p-4">
                <div className="text-xs text-gray-500 uppercase tracking-widest mb-1">
                  Chronomoteur Quantique v4.2
                </div>
                <div className="text-white font-medium text-sm">
                  Précision : 99.97% • Portée : −65M ans à ce jour
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-green-400 text-xs">Opérationnel</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Text */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <h3 className="font-serif text-3xl font-bold text-white mb-6">
              Plus qu'une agence,{' '}
              <span className="italic text-gold">une institution</span>
            </h3>
            <p className="text-gray-400 leading-relaxed mb-6">
              Chaque voyage est une œuvre d'art soigneusement orchestrée par nos
              équipes d'historiens, de physiciens temporels et de guides experts.
              Votre sécurité et votre confort sont garantis à chaque instant,
              dans chaque époque.
            </p>
            <p className="text-gray-400 leading-relaxed mb-8">
              Notre intelligence artificielle de nouvelle génération, entraînée
              sur l'intégralité des archives historiques mondiales, vous
              accompagne avant, pendant et après chaque voyage pour une
              expérience unique et personnalisée.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              {[
                { value: '1 247', label: 'Voyageurs' },
                { value: '99.9%', label: 'Satisfaction' },
                { value: '0', label: 'Incident' },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="card-glass rounded-xl p-4 text-center"
                >
                  <div className="font-serif text-2xl font-bold text-gradient-gold">
                    {stat.value}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Features grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
              className="card-glass rounded-xl p-6 group hover:border-gold/40 transition-all duration-300"
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                style={{ background: 'rgba(212, 168, 87, 0.15)' }}
              >
                <feature.icon size={20} className="text-gold" />
              </div>
              <h4 className="font-semibold text-white mb-2 text-sm">
                {feature.title}
              </h4>
              <p className="text-gray-500 text-xs leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
