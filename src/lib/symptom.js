import { CONDITIONS } from '../data/conditions.js'
import { EMERGENCY_KEYWORDS, SYMPTOM_TOPICS, GENERIC_FOLLOWUPS } from '../data/symptoms.js'

export const GREETING = /^(hi|hello|hey|hii+|hola|good\s?(morning|afternoon|evening))[\s!.,]*$/i
export const QUESTION_BUDGET = 3

export const newSession = () => ({
  text: '', greeted: false, seen: [], queue: [], asked: 0, done: false
})

export const isEmergency = (text) => {
  const t = text.toLowerCase()
  return EMERGENCY_KEYWORDS.some((k) => t.includes(k))
}

export const detectTopics = (text) => {
  const t = text.toLowerCase()
  return SYMPTOM_TOPICS.filter((topic) => topic.keywords.some((k) => t.includes(k)))
}

// Pure version of the original follow-up picker: returns [question, nextSession].
export function nextFollowup(session) {
  const seen = [...session.seen]
  const queue = [...session.queue]
  for (const topic of detectTopics(session.text)) {
    if (!seen.includes(topic.key)) {
      seen.push(topic.key)
      topic.followups.forEach((q) => { if (!queue.includes(q)) queue.push(q) })
    }
  }
  let q = null
  if (queue.length) q = queue.shift()
  else if (session.asked < GENERIC_FOLLOWUPS.length) q = GENERIC_FOLLOWUPS[session.asked]
  return [q, { ...session, seen, queue }]
}

export function matchConditions(text) {
  const t = text.toLowerCase()
  const scored = CONDITIONS.map((condition) => {
    const matchedSymptoms = condition.symptoms.filter((s) => {
      const words = s.toLowerCase().split(/[^a-z]+/).filter((w) => w.length >= 4)
      return words.some((w) => t.includes(w)) || t.includes(s.toLowerCase())
    })
    return {
      condition,
      matched: matchedSymptoms.length,
      matchedSymptoms,
      pct: Math.round((matchedSymptoms.length / condition.symptoms.length) * 100)
    }
  }).filter((r) => r.matched > 0)
  scored.sort((a, b) => b.matched - a.matched || b.pct - a.pct)
  return scored.slice(0, 5)
}

export const reasoning = (pct) =>
  pct >= 60 ? 'Matches several of the symptoms you described.'
  : pct >= 30 ? 'Some of your symptoms may fit this condition.'
  : 'Another possible explanation worth considering.'
