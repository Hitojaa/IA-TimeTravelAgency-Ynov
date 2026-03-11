export interface Message {
  role: 'user' | 'assistant'
  content: string
}

export interface Destination {
  id: string
  name: string
  era: string
  year: string
  description: string
  longDescription: string
  price: number
  duration: string
  image: string
  accentColor: string
  tags: string[]
  highlights: string[]
  emoji: string
}

export interface QuizQuestion {
  id: number
  question: string
  options: {
    id: string
    label: string
    scores: Record<string, number>
  }[]
}
