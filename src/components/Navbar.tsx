import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Clock, Menu, X } from 'lucide-react'

const navLinks = [
  { label: 'Destinations', href: '#destinations' },
  { label: 'Notre Histoire', href: '#about' },
  { label: 'Quiz', href: '#quiz' },
  { label: 'Contact', href: '#footer' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (href: string) => {
    setMenuOpen(false)
    const el = document.querySelector(href)
    el?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-dark/90 backdrop-blur-md border-b border-dark-border shadow-lg shadow-black/20'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2 group"
          >
            <div className="relative">
              <Clock
                size={28}
                className="text-gold transition-transform duration-700 group-hover:rotate-180"
              />
              <div className="absolute inset-0 bg-gold/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <span className="font-serif text-lg font-bold">
              <span className="text-gradient-gold">TimeTravel</span>
              <span className="text-white/80 ml-1">Agency</span>
            </span>
          </button>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="text-sm text-gray-400 hover:text-gold transition-colors duration-200 relative group"
              >
                {link.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-gold transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
            <button
              onClick={() => handleNavClick('#destinations')}
              className="btn-gold text-sm px-5 py-2"
            >
              Réserver
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-gray-400 hover:text-gold transition-colors"
            aria-label="Menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-dark/95 backdrop-blur-md border-b border-dark-border"
          >
            <div className="flex flex-col px-4 py-4 gap-4">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="text-left text-gray-300 hover:text-gold py-2 transition-colors"
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={() => handleNavClick('#destinations')}
                className="btn-gold text-sm mt-2"
              >
                Réserver
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
