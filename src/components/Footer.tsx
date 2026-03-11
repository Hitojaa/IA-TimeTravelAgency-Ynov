import { motion } from 'framer-motion'
import { Clock, Mail, Phone, MapPin, Instagram, Twitter, Linkedin } from 'lucide-react'

export default function Footer() {
  const year = new Date().getFullYear()

  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer
      id="footer"
      className="relative pt-20 pb-8 px-4 sm:px-6"
      style={{
        background: 'linear-gradient(to bottom, #0a0a0f, #080810)',
        borderTop: '1px solid rgba(212,168,87,0.15)',
      }}
    >
      {/* Top glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(212,168,87,0.4), transparent)',
        }}
      />

      <div className="max-w-7xl mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-5">
              <Clock size={24} className="text-gold" />
              <span className="font-serif text-xl font-bold">
                <span className="text-gradient-gold">TimeTravel</span>
                <span className="text-white/80 ml-1">Agency</span>
              </span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed max-w-sm mb-6">
              La première agence de voyage temporel homologuée au monde.
              Explorez l'histoire, vivez le passé, revenez changé.
            </p>
            {/* Social */}
            <div className="flex gap-3">
              {[
                { icon: Instagram, label: 'Instagram' },
                { icon: Twitter, label: 'Twitter' },
                { icon: Linkedin, label: 'LinkedIn' },
              ].map(({ icon: Icon, label }) => (
                <button
                  key={label}
                  aria-label={label}
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-gray-500 hover:text-gold transition-colors duration-200"
                  style={{ background: 'rgba(255,255,255,0.05)' }}
                >
                  <Icon size={16} />
                </button>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-5 uppercase tracking-widest">
              Destinations
            </h4>
            <ul className="space-y-3">
              {[
                { label: '🗼 Paris 1889', href: '#destinations' },
                { label: '🦕 Crétacé −65M', href: '#destinations' },
                { label: '🎨 Florence 1504', href: '#destinations' },
                { label: '✨ Quiz de personnalité', href: '#quiz' },
              ].map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="text-gray-500 hover:text-gold text-sm transition-colors duration-200"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-5 uppercase tracking-widest">
              Contact
            </h4>
            <ul className="space-y-4">
              {[
                { icon: Mail, label: 'contact@timetravel.agency' },
                { icon: Phone, label: '+33 1 23 45 67 89' },
                { icon: MapPin, label: 'Paris, France (2047)' },
              ].map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-center gap-3">
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(212,168,87,0.1)' }}
                  >
                    <Icon size={13} className="text-gold" />
                  </div>
                  <span className="text-gray-500 text-sm">{label}</span>
                </li>
              ))}
            </ul>

            {/* Newsletter */}
            <div className="mt-6">
              <p className="text-xs text-gray-600 mb-2 uppercase tracking-widest">
                Newsletter
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="votre@email.com"
                  className="flex-1 px-3 py-2 rounded-lg text-xs text-gray-300 placeholder-gray-600 focus:outline-none"
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}
                />
                <button
                  className="px-3 py-2 rounded-lg text-xs font-medium"
                  style={{
                    background: 'linear-gradient(135deg, #d4a857, #f0c879)',
                    color: '#0a0a0f',
                  }}
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div
          className="w-full h-px mb-8"
          style={{ background: 'rgba(212,168,87,0.1)' }}
        />

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 text-xs">
            © {year} TimeTravel Agency. Projet pédagogique — M1 Digital & IA,
            Ynov Campus.
          </p>
          <div className="flex gap-6 text-xs text-gray-600">
            <button className="hover:text-gray-400 transition-colors">
              Mentions légales
            </button>
            <button className="hover:text-gray-400 transition-colors">
              Confidentialité
            </button>
            <button className="hover:text-gray-400 transition-colors">
              CGV
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
