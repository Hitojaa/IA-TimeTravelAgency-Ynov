import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, Bot, Clock, AlertCircle } from 'lucide-react'
import type { Message } from '../types'

const INITIAL_MESSAGE: Message = {
  role: 'assistant',
  content:
    'Bonjour et bienvenue chez TimeTravel Agency ! 🕰️\n\nJe suis votre assistant virtuel spécialisé en voyages temporels de luxe. Je peux vous conseiller sur nos 3 destinations exclusives :\n\n🗼 **Paris 1889** — Belle Époque\n🦕 **Crétacé −65M** — Ère des dinosaures\n🎨 **Florence 1504** — Renaissance\n\nComment puis-je vous aider ?',
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  // Listen for chatbot open events from other components
  useEffect(() => {
    const handler = (e: CustomEvent) => {
      setIsOpen(true)
      if (e.detail?.message) {
        setTimeout(() => {
          setInput(e.detail.message)
          inputRef.current?.focus()
        }, 400)
      }
    }
    document.addEventListener('open-chatbot', handler as EventListener)
    return () => document.removeEventListener('open-chatbot', handler as EventListener)
  }, [])

  // Auto-scroll to bottom
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, isLoading])

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300)
    }
  }, [isOpen])

  const sendMessage = useCallback(async () => {
    const text = input.trim()
    if (!text || isLoading) return

    const userMessage: Message = { role: 'user', content: text }
    const newMessages = [...messages, userMessage]
    setMessages(newMessages)
    setInput('')
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages.filter((m) => m.role !== 'assistant' || m !== INITIAL_MESSAGE),
        }),
      })

      if (!response.ok) {
        throw new Error(`Erreur ${response.status}`)
      }

      const data = await response.json()
      setMessages([
        ...newMessages,
        { role: 'assistant', content: data.content },
      ])
    } catch (err) {
      setError(
        "Désolé, je suis momentanément indisponible. Réessayez dans quelques instants."
      )
      setMessages([
        ...newMessages,
        {
          role: 'assistant',
          content:
            "Je rencontre une difficulté technique. Veuillez réessayer ou nous contacter directement. 🙏",
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }, [input, isLoading, messages])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  // Format message text with basic markdown
  const formatMessage = (text: string) => {
    return text
      .split('\n')
      .map((line, i) => {
        // Bold: **text**
        const formatted = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        return `<span key="${i}">${formatted}</span>`
      })
      .join('<br/>')
  }

  return (
    <>
      {/* Floating Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <AnimatePresence>
          {!isOpen && (
            <motion.button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              onClick={() => setIsOpen(true)}
              className="w-14 h-14 rounded-full flex items-center justify-center shadow-2xl group relative"
              style={{
                background: 'linear-gradient(135deg, #d4a857, #f0c879)',
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Ouvrir le chat"
            >
              <MessageCircle size={24} className="text-dark" />
              {/* Pulse ring */}
              <span
                className="absolute inset-0 rounded-full animate-ping opacity-30"
                style={{ background: '#d4a857' }}
              />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Chat Window */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              className="absolute bottom-0 right-0 w-[340px] sm:w-[380px] h-[540px] flex flex-col rounded-2xl overflow-hidden shadow-2xl"
              style={{
                background: '#0f0f1a',
                border: '1px solid rgba(212,168,87,0.3)',
                boxShadow:
                  '0 25px 60px rgba(0,0,0,0.5), 0 0 40px rgba(212,168,87,0.1)',
              }}
            >
              {/* Header */}
              <div
                className="flex items-center justify-between px-4 py-3 flex-shrink-0"
                style={{
                  background: 'linear-gradient(135deg, #1a1408, #0f0f1a)',
                  borderBottom: '1px solid rgba(212,168,87,0.2)',
                }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center"
                    style={{ background: 'rgba(212,168,87,0.15)' }}
                  >
                    <Clock size={16} className="text-gold" />
                  </div>
                  <div>
                    <p className="text-white text-sm font-semibold leading-tight">
                      Agent TimeTravel
                    </p>
                    <div className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                      <span className="text-xs text-green-400">
                        En ligne — IA Claude
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-500 hover:text-white transition-colors p-1"
                  aria-label="Fermer"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`message-bubble flex ${
                      msg.role === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    {msg.role === 'assistant' && (
                      <div
                        className="w-6 h-6 rounded-full flex items-center justify-center mr-2 flex-shrink-0 mt-1"
                        style={{ background: 'rgba(212,168,87,0.2)' }}
                      >
                        <Bot size={12} className="text-gold" />
                      </div>
                    )}
                    <div
                      className="max-w-[85%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed"
                      style={
                        msg.role === 'user'
                          ? {
                              background: 'linear-gradient(135deg, #d4a857, #c9a227)',
                              color: '#0a0a0f',
                              borderRadius: '18px 18px 4px 18px',
                            }
                          : {
                              background: 'rgba(255,255,255,0.06)',
                              color: '#e5e5e5',
                              border: '1px solid rgba(255,255,255,0.08)',
                              borderRadius: '18px 18px 18px 4px',
                            }
                      }
                      dangerouslySetInnerHTML={{
                        __html: formatMessage(msg.content),
                      }}
                    />
                  </div>
                ))}

                {/* Loading dots */}
                {isLoading && (
                  <div className="message-bubble flex justify-start">
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center mr-2 flex-shrink-0"
                      style={{ background: 'rgba(212,168,87,0.2)' }}
                    >
                      <Bot size={12} className="text-gold" />
                    </div>
                    <div
                      className="px-4 py-3 rounded-2xl"
                      style={{
                        background: 'rgba(255,255,255,0.06)',
                        border: '1px solid rgba(255,255,255,0.08)',
                      }}
                    >
                      <div className="flex gap-1 items-center h-4">
                        <div
                          className="w-1.5 h-1.5 rounded-full bg-gold dot-pulse"
                        />
                        <div
                          className="w-1.5 h-1.5 rounded-full bg-gold dot-pulse"
                        />
                        <div
                          className="w-1.5 h-1.5 rounded-full bg-gold dot-pulse"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Error message */}
                {error && (
                  <div className="flex items-center gap-2 text-red-400 text-xs px-2">
                    <AlertCircle size={12} />
                    {error}
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Suggestion chips */}
              {messages.length === 1 && (
                <div className="px-4 pb-3 flex gap-2 flex-wrap">
                  {[
                    'Quelles sont vos destinations ?',
                    'Quels sont les prix ?',
                    'Comment ça marche ?',
                  ].map((suggestion) => (
                    <button
                      key={suggestion}
                      onClick={() => {
                        setInput(suggestion)
                        inputRef.current?.focus()
                      }}
                      className="text-xs px-3 py-1.5 rounded-full transition-all duration-200 text-gray-400 hover:text-gold"
                      style={{
                        background: 'rgba(212,168,87,0.08)',
                        border: '1px solid rgba(212,168,87,0.2)',
                      }}
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}

              {/* Input area */}
              <div
                className="px-4 py-3 flex-shrink-0"
                style={{
                  borderTop: '1px solid rgba(212,168,87,0.15)',
                  background: 'rgba(0,0,0,0.2)',
                }}
              >
                <div className="flex items-end gap-2">
                  <textarea
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Posez votre question..."
                    rows={1}
                    disabled={isLoading}
                    className="flex-1 resize-none rounded-xl px-3.5 py-2.5 text-sm text-gray-200 placeholder-gray-600 focus:outline-none focus:ring-1 disabled:opacity-50"
                    style={{
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      maxHeight: '100px',
                    }}
                    onInput={(e) => {
                      const target = e.target as HTMLTextAreaElement
                      target.style.height = 'auto'
                      target.style.height = `${Math.min(target.scrollHeight, 100)}px`
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = 'rgba(212,168,87,0.4)'
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'rgba(255,255,255,0.1)'
                    }}
                  />
                  <button
                    onClick={sendMessage}
                    disabled={!input.trim() || isLoading}
                    className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
                    style={{
                      background:
                        input.trim() && !isLoading
                          ? 'linear-gradient(135deg, #d4a857, #f0c879)'
                          : 'rgba(255,255,255,0.08)',
                    }}
                    aria-label="Envoyer"
                  >
                    <Send
                      size={15}
                      className={input.trim() && !isLoading ? 'text-dark' : 'text-gray-500'}
                    />
                  </button>
                </div>
                <p className="text-xs text-gray-700 mt-2 text-center">
                  Propulsé par Claude AI (Anthropic)
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  )
}
