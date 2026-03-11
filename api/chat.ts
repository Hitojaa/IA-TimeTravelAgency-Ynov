import Groq from 'groq-sdk'

const client = new Groq({
  apiKey: process.env.GROQ_API_KEY,
})

const SYSTEM_PROMPT = `Tu es l'assistant virtuel de TimeTravel Agency, une agence de voyage temporel de luxe fictive fondée en 2047.

Ton rôle : conseiller les clients sur nos destinations temporelles exclusives et les aider à choisir et réserver leur voyage.

TON TON :
- Professionnel mais chaleureux et humain
- Passionné d'histoire avec une expertise crédible
- Enthousiaste sans être trop familier
- Toujours en français

NOS 3 DESTINATIONS :

1. 🗼 PARIS 1889 — Belle Époque
   - Période : mai-octobre 1889 (Exposition Universelle)
   - Événements : inauguration de la Tour Eiffel (31 mai 1889), visite des pavillons mondiaux
   - Expériences : cafés parisiens, art impressionniste, opéra, mode de l'époque
   - Hébergement : Hôtel Ritz reconstitué, quartier de Montmartre
   - Prix : à partir de 15 000€ pour 7 jours (tout inclus)
   - Idéal pour : amateurs de culture, architecture, gastronomie, histoire moderne

2. 🦕 CRÉTACÉ −65 000 000 ANS — Mésozoïque
   - Période : Crétacé supérieur, 65 millions d'années avant notre ère
   - Faune observable : Tyrannosaurus Rex, Triceratops, Brachiosaurus, Pteranodon
   - Sécurité : véhicules blindés, dômes d'observation, escorte scientifique permanente
   - Hébergement : camp pressurisé avec vue panoramique sur la nature préhistorique
   - Prix : à partir de 25 000€ pour 5 jours
   - Idéal pour : aventuriers, passionnés de sciences, familles cherchant l'exceptionnel

3. 🎨 FLORENCE 1504 — Renaissance
   - Période : été-automne 1504, apogée de la Renaissance florentine
   - Personnages rencontrés : Michel-Ange (vient d'achever le David), Léonard de Vinci
   - Expériences : ateliers de peinture, banquets médicéens, visite des Offices naissants
   - Hébergement : palazzo médicéen au cœur de Florence
   - Prix : à partir de 18 000€ pour 6 jours
   - Idéal pour : amateurs d'art, d'histoire, d'architecture, de gastronomie toscane

POLITIQUE DE L'AGENCE :
- Aucun objet moderne ne peut être emporté dans le passé
- Les clients reçoivent des costumes d'époque et des documents d'identité fictifs
- Assurance temporelle incluse dans tous les forfaits
- Limite : 8 clients par voyage pour préserver l'authenticité
- Acompte de 30% à la réservation, solde 30 jours avant le départ

Réponds de manière concise (3-5 phrases en général). Tu peux utiliser des emojis avec modération.`

interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

export default async function handler(req: any, res: any) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Méthode non autorisée' })
  }

  if (!process.env.GROQ_API_KEY) {
    return res.status(500).json({
      error: 'Clé API Groq non configurée',
      content: "Je suis temporairement indisponible. La clé API n'est pas configurée.",
    })
  }

  try {
    const { messages } = req.body

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Format de messages invalide' })
    }

    // Filter and validate messages
    const validMessages: ChatMessage[] = messages
      .filter(
        (m: any) =>
          m &&
          typeof m === 'object' &&
          (m.role === 'user' || m.role === 'assistant') &&
          typeof m.content === 'string' &&
          m.content.trim().length > 0
      )
      .slice(-20)

    if (validMessages.length === 0) {
      return res.status(400).json({ error: 'Aucun message valide fourni' })
    }

    // Ensure conversation starts with a user message
    const firstUserIdx = validMessages.findIndex((m) => m.role === 'user')
    const filteredMessages =
      firstUserIdx >= 0 ? validMessages.slice(firstUserIdx) : validMessages

    const response = await client.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      max_tokens: 1024,
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        ...filteredMessages,
      ],
    })

    const content = response.choices[0]?.message?.content

    if (!content) {
      return res.status(500).json({ error: 'Réponse vide du modèle' })
    }

    return res.status(200).json({ content })
  } catch (error: any) {
    console.error('Erreur API Groq:', error?.message || error)

    if (error?.status === 401) {
      return res.status(401).json({
        error: 'Authentification échouée',
        content: "La clé API est invalide. Contactez l'administrateur.",
      })
    }

    if (error?.status === 429) {
      return res.status(429).json({
        error: 'Limite de requêtes atteinte',
        content:
          'Je reçois trop de demandes en ce moment. Veuillez réessayer dans quelques instants. 🙏',
      })
    }

    return res.status(500).json({
      error: 'Erreur interne',
      content:
        "Une erreur technique est survenue. Veuillez réessayer ou nous contacter directement.",
    })
  }
}
