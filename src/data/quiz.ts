import type { QuizQuestion } from '../types'

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: 'Quel type d\'expérience recherchez-vous ?',
    options: [
      {
        id: 'a',
        label: '🎭 Culturelle et artistique',
        scores: { 'paris-1889': 2, 'cretaceous': 0, 'florence-1504': 3 },
      },
      {
        id: 'b',
        label: '🌿 Aventure et nature',
        scores: { 'paris-1889': 0, 'cretaceous': 3, 'florence-1504': 0 },
      },
      {
        id: 'c',
        label: '✨ Élégance et raffinement',
        scores: { 'paris-1889': 3, 'cretaceous': 0, 'florence-1504': 2 },
      },
    ],
  },
  {
    id: 2,
    question: 'Votre période préférée ?',
    options: [
      {
        id: 'a',
        label: '🏙️ Histoire moderne (XIXe-XXe siècle)',
        scores: { 'paris-1889': 3, 'cretaceous': 0, 'florence-1504': 0 },
      },
      {
        id: 'b',
        label: '🦴 Temps anciens et origines',
        scores: { 'paris-1889': 0, 'cretaceous': 3, 'florence-1504': 0 },
      },
      {
        id: 'c',
        label: '🏛️ Renaissance et classicisme',
        scores: { 'paris-1889': 0, 'cretaceous': 0, 'florence-1504': 3 },
      },
    ],
  },
  {
    id: 3,
    question: 'Votre environnement idéal ?',
    options: [
      {
        id: 'a',
        label: '🏙️ L\'effervescence urbaine',
        scores: { 'paris-1889': 3, 'cretaceous': 0, 'florence-1504': 1 },
      },
      {
        id: 'b',
        label: '🌴 La nature sauvage et vierge',
        scores: { 'paris-1889': 0, 'cretaceous': 3, 'florence-1504': 0 },
      },
      {
        id: 'c',
        label: '🖼️ L\'art et l\'architecture',
        scores: { 'paris-1889': 1, 'cretaceous': 0, 'florence-1504': 3 },
      },
    ],
  },
  {
    id: 4,
    question: 'Votre activité de rêve ?',
    options: [
      {
        id: 'a',
        label: '🗼 Assister à un événement historique majeur',
        scores: { 'paris-1889': 3, 'cretaceous': 1, 'florence-1504': 2 },
      },
      {
        id: 'b',
        label: '🦕 Observer des créatures extraordinaires',
        scores: { 'paris-1889': 0, 'cretaceous': 3, 'florence-1504': 0 },
      },
      {
        id: 'c',
        label: '🎨 Rencontrer un génie créatif',
        scores: { 'paris-1889': 1, 'cretaceous': 0, 'florence-1504': 3 },
      },
    ],
  },
]
