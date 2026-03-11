import type { Destination } from '../types'

export const destinations: Destination[] = [
  {
    id: 'paris-1889',
    name: 'Paris 1889',
    era: 'Belle Époque',
    year: '1889',
    description:
      'Vivez l\'inauguration de la Tour Eiffel lors de l\'Exposition Universelle. Plongez dans la magie de la Belle Époque au cœur de Paris.',
    longDescription:
      'Rejoignez Paris au moment de son apogée artistique et culturelle. L\'Exposition Universelle bat son plein, la Tour Eiffel vient d\'être inaugurée et les cafés bruissent de l\'effervescence d\'une époque dorée. Côtoyez les impressionnistes, flânez sur les Grands Boulevards et découvrez une ville en pleine métamorphose.',
    price: 15000,
    duration: '7 jours',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&h=500&fit=crop&q=80',
    accentColor: '#c9a227',
    tags: ['Culture', 'Architecture', 'Gastronomie'],
    highlights: [
      'Cérémonie d\'inauguration de la Tour Eiffel',
      'Visite de l\'Exposition Universelle',
      'Dîner au Grand Café',
      'Atelier avec un maître impressionniste',
    ],
    emoji: '🗼',
  },
  {
    id: 'cretaceous',
    name: 'Crétacé −65M',
    era: 'Mésozoïque',
    year: '-65 000 000',
    description:
      'Observez les dinosaures dans leur habitat naturel depuis notre observatoire sécurisé. Une aventure préhistorique sans précédent.',
    longDescription:
      'Embarquez pour la plus grande aventure de l\'histoire de l\'humanité. Depuis nos observatoires blindés de dernière génération, contemplez les dinosaures évoluer dans un monde vierge de toute présence humaine. Tyrannosaurus Rex, Triceratops, Brachiosaurus... une faune spectaculaire vous attend dans des paysages à couper le souffle.',
    price: 25000,
    duration: '5 jours',
    image: 'https://images.unsplash.com/photo-1569380927756-59a8a7b2e6f4?w=800&h=500&fit=crop&q=80',
    accentColor: '#4a7c3f',
    tags: ['Nature', 'Aventure', 'Science'],
    highlights: [
      'Observation de T-Rex en liberté',
      'Safari crétacé en véhicule blindé',
      'Conférence avec nos paléontologues',
      'Collecte de fossiles supervisée',
    ],
    emoji: '🦕',
  },
  {
    id: 'florence-1504',
    name: 'Florence 1504',
    era: 'Renaissance',
    year: '1504',
    description:
      'Rencontrez Michel-Ange et Léonard de Vinci au cœur de la Florence médicéenne. Vivez la Renaissance dans toute sa splendeur.',
    longDescription:
      'La Florence des Médicis est à son zénith. Michel-Ange vient d\'achever son David, Léonard de Vinci peaufine ses inventions révolutionnaires, et Botticelli illumine les murs des palais. Assistez à la naissance de l\'art moderne, participez à des banquets médicéens et explorez les ateliers des plus grands génies que l\'humanité ait connus.',
    price: 18000,
    duration: '6 jours',
    image: 'https://images.unsplash.com/photo-1541370976299-4d24ebbc9077?w=800&h=500&fit=crop&q=80',
    accentColor: '#9b59b6',
    tags: ['Art', 'Histoire', 'Architecture'],
    highlights: [
      'Visite privée de l\'atelier de Michel-Ange',
      'Rencontre avec Léonard de Vinci',
      'Banquet dans un palais médicéen',
      'Cours de peinture à la fresque',
    ],
    emoji: '🎨',
  },
]
