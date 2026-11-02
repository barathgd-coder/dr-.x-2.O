import { useState } from 'react'
import { CONDITIONS } from '../data/conditions.js'
import { DOCTORS } from '../data/doctors.js'
import { HOSPITALS } from '../data/hospitals.js'

export default function Home({ go, profile, appointments }) {
  const [text, setText] = useState('')
  const name = (profile.name || '').trim().split(' ')[0]
  const upcoming = appointments.filter((a) => a.status !== 'Cancelled').length
  const submit = (e) => { e.preventDefault(); go('check', { seed: text.trim() }) }

  return (
    <div className="home">
      <section className="hero">
        <img className="mark" src="logo-mark.png" alt="" aria-hidden="true" />
        <p className="hello">{name ? `Welcome back, ${name}.` : 'Welcome to dr.x.'}</p>
        <h1>What are you feeling right now?</h1>
        <form onSubmit={submit} className="ask">
          <label className="sr" htmlFor="ask">Describe your symptoms</label>
          <input id="ask" value={text} onChange={(e) => setText(e.target.value)} placeholder="For example: a headache since morning, and I feel dizzy" autoComplete="off" />
          <button type="submit">Check symptoms</button>
        </form>
        <p className="note">Works without internet once opened. For information only — not a diagnosis.</p>
      </section>

      <section className="paths stagger">
        <button onClick={() => go('conditions')}>
          <strong>{CONDITIONS.length} conditions</strong>
          <span>Look up symptoms and which specialist treats them.</span>
        </button>
        <button onClick={() => go('doctors', { condition: '' })}>
          <strong>{DOCTORS.length} doctors</strong>
          <span>Search by specialty and book a visit over WhatsApp.</span>
        </button>
        <button onClick={() => go('hospitals')}>
          <strong>{HOSPITALS.length} hospitals</strong>
          <span>Browse leading hospitals by state and city.</span>
        </button>
        <button onClick={() => go('device')}>
          <strong>RIY3.0 Hive</strong>
          <span>Explore the Dr. X health device in 3D, with live vitals.</span>
        </button>
        <button onClick={() => go('appointments')}>
          <strong>{upcoming ? `${upcoming} booked` : 'No visits yet'}</strong>
          <span>{upcoming ? 'Review or cancel your requests.' : 'Your booking requests will appear here.'}</span>
        </button>
      </section>

      <section className="emergency">
        <h2>In an emergency, do not wait for an app.</h2>
        <p>Call 108 (ambulance) or 112 right away for chest pain, trouble breathing, heavy bleeding, stroke signs or a seizure.</p>
      </section>
    </div>
  )
}
