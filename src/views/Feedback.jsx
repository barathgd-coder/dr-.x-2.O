import { useState } from 'react'
import { CLINIC_WHATSAPP } from '../lib/store.js'

const TOPICS = ['Symptom checker', 'Doctors & hospitals', 'Booking', 'Design & ease of use', 'Something else']
const LABELS = ['', 'Poor', 'Fair', 'Good', 'Very good', 'Excellent']

export default function Feedback({ profile, feedback, setFeedback, toast }) {
  const [rating, setRating] = useState(0)
  const [hover, setHover] = useState(0)
  const [topic, setTopic] = useState(TOPICS[0])
  const [msg, setMsg] = useState('')
  const [contact, setContact] = useState(profile.email || profile.phone || '')
  const [err, setErr] = useState('')
  const [sent, setSent] = useState(false)

  const submit = (e) => {
    e.preventDefault()
    if (!rating) return setErr('Please choose a star rating.')
    setErr('')
    const entry = { id: Date.now(), rating, topic, msg: msg.trim(), contact: contact.trim(), at: new Date().toISOString() }
    setFeedback((f) => [entry, ...f])
    const text = ['Feedback — Doctor X', `Rating: ${rating}/5 (${LABELS[rating]})`, 'Topic: ' + topic, 'Message: ' + (entry.msg || '-'), 'Contact: ' + (entry.contact || '-')].join('\n')
    window.open(`https://wa.me/${CLINIC_WHATSAPP}?text=${encodeURIComponent(text)}`, '_blank', 'noopener')
    setSent(true); toast('Thank you for your feedback')
  }

  if (sent) return (
    <div className="thanks">
      <svg className="tick" viewBox="0 0 52 52" aria-hidden="true"><circle cx="26" cy="26" r="24" /><path d="M15 27l8 8 14-16" /></svg>
      <h1>Thank you</h1>
      <p className="muted">Your feedback was saved on this device and opened in WhatsApp. Send the message there if it has not gone yet.</p>
      <button className="ghost" onClick={() => { setSent(false); setRating(0); setMsg('') }}>Send more feedback</button>
    </div>
  )

  const shown = hover || rating
  return (
    <div>
      <header className="pagehead"><div><h1>Feedback</h1><p className="muted sub">Tell us how dr.x worked for you</p></div></header>
      <form className="fb" onSubmit={submit} noValidate>
        <fieldset>
          <legend>How was your experience?</legend>
          <div className="stars" onMouseLeave={() => setHover(0)}>
            {[1, 2, 3, 4, 5].map((n) => (
              <button type="button" key={n} className={n <= shown ? 'on' : ''} aria-label={`${n} star${n > 1 ? 's' : ''}`} aria-pressed={rating === n}
                onMouseEnter={() => setHover(n)} onClick={() => { setRating(n); setErr('') }}>
                <svg viewBox="0 0 24 24" width="34" height="34"><path d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4 6.1 20.5l1.2-6.5L2.5 9.4l6.6-.9z" /></svg>
              </button>
            ))}
            <span className="rate-label" aria-live="polite">{LABELS[shown]}</span>
          </div>
        </fieldset>
        <fieldset>
          <legend>What is it about?</legend>
          <div className="pills">
            {TOPICS.map((t) => <button type="button" key={t} className={t === topic ? 'on' : ''} aria-pressed={t === topic} onClick={() => setTopic(t)}>{t}</button>)}
          </div>
        </fieldset>
        <label>Your message (optional)
          <textarea rows="4" maxLength="600" value={msg} onChange={(e) => setMsg(e.target.value)} placeholder="What worked well? What should we improve?" />
          <small className="muted">{msg.length}/600</small>
        </label>
        <label>Email or phone (optional, if you want a reply)
          <input value={contact} onChange={(e) => setContact(e.target.value)} autoComplete="off" />
        </label>
        {err && <p className="alert" role="alert">{err}</p>}
        <div className="actions"><button className="primary" type="submit">Send feedback</button></div>
        <p className="muted fine">Do not include medical details. Feedback is for improving the app only.</p>
      </form>
      {!!feedback.length && <p className="muted">You have sent {feedback.length} feedback message{feedback.length > 1 ? 's' : ''} from this device.</p>}
    </div>
  )
}
