import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'framer-motion'
import { ChevronRight, RotateCcw, Loader2, Sparkles } from 'lucide-react'
import { quizQuestions } from '../data/quiz'
import { destinations } from '../data/destinations'
import type { Message } from '../types'

type QuizState = 'intro' | 'questions' | 'loading' | 'result'

export default function Quiz() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const [state, setState] = useState<QuizState>('intro')
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [scores, setScores] = useState<Record<string, number>>({
    'paris-1889': 0,
    cretaceous: 0,
    'florence-1504': 0,
  })
  const [answers, setAnswers] = useState<string[]>([])
  const [recommendedDest, setRecommendedDest] = useState<string | null>(null)
  const [aiDescription, setAiDescription] = useState<string>('')
  const [loadingAi, setLoadingAi] = useState(false)

  const progress = ((currentQuestion) / quizQuestions.length) * 100

  const handleAnswer = async (optionId: string, optionScores: Record<string, number>) => {
    const question = quizQuestions[currentQuestion]
    const option = question.options.find((o) => o.id === optionId)!

    const newScores = { ...scores }
    Object.entries(optionScores).forEach(([dest, score]) => {
      newScores[dest] = (newScores[dest] || 0) + score
    })
    setScores(newScores)
    setAnswers([...answers, `Q${currentQuestion + 1}: ${option.label}`])

    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion((q) => q + 1)
    } else {
      // Find winner
      const winner = Object.entries(newScores).reduce((a, b) =>
        a[1] >= b[1] ? a : b
      )[0]
      setRecommendedDest(winner)
      setState('loading')

      // Call AI for personalized description
      await getAiRecommendation(winner, [...answers, `Q${currentQuestion + 1}: ${option.label}`])
    }
  }

  const getAiRecommendation = async (destId: string, allAnswers: string[]) => {
    setLoadingAi(true)
    const dest = destinations.find((d) => d.id === destId)!

    const prompt = `Un client vient de répondre à notre quiz de voyage temporel avec ces réponses :
${allAnswers.join('\n')}

Notre algorithme recommande : ${dest.name} (${dest.era})

En tant qu'expert de TimeTravel Agency, rédige un message personnalisé de 2-3 phrases maximum qui :
1. Confirme avec enthousiasme que ${dest.name} est parfait pour ce client
2. Explique brièvement pourquoi, en lien avec ses réponses
3. Termine par un appel à l'action pour réserver

Ton : chaleureux, enthousiaste, professionnel. Réponds en français.`

    const messages: Message[] = [{ role: 'user', content: prompt }]

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages }),
      })

      if (response.ok) {
        const data = await response.json()
        setAiDescription(data.content)
      } else {
        setAiDescription(
          `${dest.name} est la destination idéale pour vous ! ${dest.longDescription} Contactez-nous dès maintenant pour réserver votre voyage.`
        )
      }
    } catch {
      setAiDescription(
        `${dest.name} est la destination idéale pour vous ! ${dest.description} Réservez maintenant pour vivre cette expérience unique.`
      )
    } finally {
      setLoadingAi(false)
      setState('result')
    }
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setScores({ 'paris-1889': 0, cretaceous: 0, 'florence-1504': 0 })
    setAnswers([])
    setRecommendedDest(null)
    setAiDescription('')
    setState('intro')
  }

  const recommended = recommendedDest
    ? destinations.find((d) => d.id === recommendedDest)
    : null

  return (
    <section id="quiz" className="py-24 px-4 sm:px-6 relative">
      <div className="max-w-3xl mx-auto" ref={ref}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <p className="text-gold text-sm uppercase tracking-widest mb-4 font-medium">
            Personnalisation
          </p>
          <h2 className="section-title">
            Quelle époque{' '}
            <span className="italic text-gradient-gold">vous attend ?</span>
          </h2>
          <p className="section-subtitle mt-4">
            Notre quiz alimenté par IA analyse vos préférences pour vous
            recommander la destination idéale.
          </p>
        </motion.div>

        {/* Quiz card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="card-glass rounded-2xl p-8"
        >
          <AnimatePresence mode="wait">
            {/* Intro state */}
            {state === 'intro' && (
              <motion.div
                key="intro"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center py-8"
              >
                <div className="text-6xl mb-6">🕰️</div>
                <h3 className="font-serif text-2xl font-bold text-white mb-4">
                  Découvrez votre époque
                </h3>
                <p className="text-gray-400 mb-8 max-w-sm mx-auto">
                  4 questions pour que notre IA vous recommande la destination
                  temporelle parfaite.
                </p>
                <button
                  onClick={() => setState('questions')}
                  className="btn-gold flex items-center gap-2 mx-auto"
                >
                  Commencer le quiz
                  <ChevronRight size={18} />
                </button>
              </motion.div>
            )}

            {/* Questions state */}
            {state === 'questions' && (
              <motion.div
                key={`question-${currentQuestion}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {/* Progress */}
                <div className="mb-8">
                  <div className="flex justify-between text-xs text-gray-500 mb-2">
                    <span>Question {currentQuestion + 1} / {quizQuestions.length}</span>
                    <span>{Math.round(progress)}%</span>
                  </div>
                  <div className="h-1.5 bg-dark-border rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: 'linear-gradient(90deg, #d4a857, #f0c879)' }}
                      initial={{ width: `${progress}%` }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>

                {/* Question */}
                <h3 className="font-serif text-xl font-bold text-white mb-6">
                  {quizQuestions[currentQuestion].question}
                </h3>

                {/* Options */}
                <div className="space-y-3">
                  {quizQuestions[currentQuestion].options.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => handleAnswer(option.id, option.scores)}
                      className="w-full text-left px-5 py-4 rounded-xl text-gray-300 text-sm font-medium transition-all duration-200 group"
                      style={{
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(255,255,255,0.08)',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(212,168,87,0.1)'
                        e.currentTarget.style.borderColor = 'rgba(212,168,87,0.4)'
                        e.currentTarget.style.color = '#f0c879'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
                        e.currentTarget.style.color = '#d1d5db'
                      }}
                    >
                      <span className="flex items-center justify-between">
                        {option.label}
                        <ChevronRight
                          size={16}
                          className="opacity-0 group-hover:opacity-100 transition-opacity text-gold"
                        />
                      </span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Loading state */}
            {state === 'loading' && (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-12"
              >
                <Loader2 size={40} className="text-gold animate-spin mx-auto mb-4" />
                <p className="text-gray-400 text-sm">
                  Notre IA analyse vos réponses...
                </p>
              </motion.div>
            )}

            {/* Result state */}
            {state === 'result' && recommended && (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                {/* Result header */}
                <div className="text-center mb-6">
                  <div className="text-5xl mb-3">{recommended.emoji}</div>
                  <p className="text-gold text-xs uppercase tracking-widest mb-2 flex items-center justify-center gap-1.5">
                    <Sparkles size={12} />
                    Votre destination idéale
                    <Sparkles size={12} />
                  </p>
                  <h3 className="font-serif text-3xl font-bold text-white">
                    {recommended.name}
                  </h3>
                  <p className="text-gray-500 text-sm mt-1">{recommended.era}</p>
                </div>

                {/* Destination image */}
                <div className="rounded-xl overflow-hidden mb-6 aspect-video">
                  <img
                    src={recommended.image}
                    alt={recommended.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* AI Description */}
                {loadingAi ? (
                  <div className="flex items-center gap-2 text-gray-400 text-sm mb-6">
                    <Loader2 size={14} className="animate-spin" />
                    Génération de votre recommandation personnalisée...
                  </div>
                ) : (
                  <div
                    className="p-4 rounded-xl mb-6 text-gray-300 text-sm leading-relaxed italic"
                    style={{
                      background: 'rgba(212, 168, 87, 0.08)',
                      border: '1px solid rgba(212, 168, 87, 0.2)',
                    }}
                  >
                    "{aiDescription}"
                  </div>
                )}

                {/* Scores breakdown */}
                <div className="mb-6">
                  <p className="text-xs text-gray-600 uppercase tracking-widest mb-3">
                    Compatibilité
                  </p>
                  <div className="space-y-2">
                    {destinations.map((dest) => {
                      const totalPossible =
                        quizQuestions.reduce(
                          (acc) => acc + 3,
                          0
                        )
                      const percentage = Math.round(
                        ((scores[dest.id] || 0) / totalPossible) * 100
                      )
                      return (
                        <div key={dest.id} className="flex items-center gap-3">
                          <span className="text-xs text-gray-400 w-28 flex-shrink-0">
                            {dest.emoji} {dest.name}
                          </span>
                          <div className="flex-1 h-1.5 bg-dark-border rounded-full overflow-hidden">
                            <motion.div
                              className="h-full rounded-full"
                              style={{
                                background:
                                  dest.id === recommendedDest
                                    ? 'linear-gradient(90deg, #d4a857, #f0c879)'
                                    : 'rgba(255,255,255,0.15)',
                              }}
                              initial={{ width: 0 }}
                              animate={{ width: `${percentage}%` }}
                              transition={{ duration: 0.8, delay: 0.3 }}
                            />
                          </div>
                          <span className="text-xs text-gray-500 w-8 text-right">
                            {percentage}%
                          </span>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      document.dispatchEvent(
                        new CustomEvent('open-chatbot', {
                          detail: {
                            message: `Je viens de faire le quiz et ${recommended.name} a été recommandé pour moi. Pouvez-vous m'en dire plus sur ce voyage ?`,
                          },
                        })
                      )
                    }}
                    className="flex-1 btn-gold py-3 text-sm"
                  >
                    Réserver maintenant
                  </button>
                  <button
                    onClick={resetQuiz}
                    className="btn-outline p-3"
                    title="Recommencer"
                  >
                    <RotateCcw size={16} />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
