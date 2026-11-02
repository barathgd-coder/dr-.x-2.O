import { useEffect, useRef, useState } from 'react'
import { GREETING, QUESTION_BUDGET, newSession, isEmergency, detectTopics, nextFollowup, matchConditions, reasoning } from '../lib/symptom.js'

const OPENING = { role: 'ai', text: "Hello, I'm the dr.x assistant. Describe what you're feeling and I'll ask a few questions before suggesting what it could be." }

export default function Check({ go, seed, setSeed }) {
  const [msgs, setMsgs] = useState([OPENING])
  const [session, setSession] = useState(newSession())
  const [results, setResults] = useState([])
  const [emergency, setEmergency] = useState(false)
  const [typing, setTyping] = useState(false)
  const [input, setInput] = useState('')
  const end = useRef(null)
  const started = useRef(false)

  useEffect(() => { end.current?.scrollIntoView({ behavior: 'smooth', block: 'end' }) }, [msgs, typing])

  const reply = (text, delay = 650) => new Promise((res) => {
    setTyping(true)
    setTimeout(() => { setTyping(false); setMsgs((m) => [...m, { role: 'ai', text }]); res() }, delay)
  })

  const send = async (raw) => {
    const text = raw.trim()
    if (!text || typing) return
    setMsgs((m) => [...m, { role: 'user', text }])
    setInput('')

    if (!session.greeted && GREETING.test(text) && detectTopics(text).length === 0) {
      setSession({ ...session, greeted: true })
      return reply('Hello! How can I help today? Describe any symptoms you are having.', 450)
    }

    let s = { ...session, greeted: true, text: session.text + ' ' + text }
    if (isEmergency(text)) {
      setEmergency(true); setResults(matchConditions(s.text)); setSession({ ...s, done: true })
      return reply("That sounds serious. Please get emergency care or call 108 / 112 now — don't wait on this assessment.")
    }

    let q = null
    if (s.asked < QUESTION_BUDGET) { const r = nextFollowup(s); q = r[0]; s = r[1] }
    const found = matchConditions(s.text)
    setResults(found)
    if (q) {
      setSession({ ...s, asked: s.asked + 1 })
      return reply(q)
    }
    setSession({ ...s, done: true })
    return reply(found.length
      ? "Thanks. Here's what fits what you've told me — see the panel. This is information only, not a diagnosis. See the suggested specialist if symptoms persist or get worse."
      : "Thanks for telling me. I couldn't find a close match. If this continues or worsens, see a General Physician.")
  }

  useEffect(() => {
    if (seed && !started.current) { started.current = true; const s = seed; setSeed(''); send(s) }
  // eslint-disable-next-line
  }, [])

  const reset = () => { setMsgs([OPENING]); setSession(newSession()); setResults([]); setEmergency(false) }

  return (
    <div className="check">
      <header className="pagehead">
        <h1>Check symptoms</h1>
        <button className="ghost" onClick={reset}>Start over</button>
      </header>
      <div className="check-grid">
        <section className="chat" aria-label="Conversation">
          <div className="log" role="log" aria-live="polite">
            {msgs.map((m, i) => <p key={i} className={'bubble ' + m.role}>{m.text}</p>)}
            {typing && <p className="bubble ai typing" aria-label="Assistant is typing"><i /><i /><i /></p>}
            <div ref={end} />
          </div>
          <form className="compose" onSubmit={(e) => { e.preventDefault(); send(input) }}>
            <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type your symptoms…" aria-label="Your message" autoComplete="off" />
            <button type="submit" disabled={!input.trim() || typing}>Send</button>
          </form>
        </section>

        <aside className="assess" aria-label="Assessment">
          <h2>What it could be</h2>
          {emergency && <p className="alert">Possible emergency. Call 108 or 112 now.</p>}
          {!results.length && <p className="muted">Matches appear here as you describe how you feel.</p>}
          <ul>
            {results.map((r) => (
              <li key={r.condition.name}>
                <div className="rowtop"><strong>{r.condition.name}</strong><span className="pct">{r.pct}%</span></div>
                <div className="meter"><i style={{ width: Math.max(r.pct, 6) + '%' }} /></div>
                <p className="muted">{reasoning(r.pct)}</p>
                <p className="muted">Matched: {r.matchedSymptoms.join(', ')}</p>
                <button className="link" onClick={() => go('doctors', { condition: r.condition.name })}>See {r.condition.specialist.toLowerCase()}s</button>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </div>
  )
}
