import { useMemo, useState } from 'react'
import { CLINIC_WHATSAPP, TIME_SLOTS } from '../lib/store.js'

const STEPS = ['Your details', 'Date', 'Time', 'Confirm']
const fmt = (d) => d.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })

export default function Booking({ doctor, profile, onClose, onDone }) {
  const [step, setStep] = useState(0)
  const [p, setP] = useState({ name: profile.name || '', age: profile.age || '', gender: profile.gender || '', phone: profile.phone || '', email: profile.email || '', address: profile.address || '' })
  const [date, setDate] = useState(null)
  const [time, setTime] = useState(null)
  const [err, setErr] = useState('')

  const days = useMemo(() => {
    const out = []; const d = new Date(); d.setHours(0, 0, 0, 0)
    for (let i = 0; out.length < 21; i++) {
      const x = new Date(d); x.setDate(d.getDate() + i + (new Date().getHours() >= 17 ? 1 : 0))
      if (x.getDay() !== 0) out.push(x)   // no Sunday visits
    }
    return out
  }, [])

  const set = (k) => (e) => setP({ ...p, [k]: e.target.value })
  const next = () => {
    setErr('')
    if (step === 0) {
      if (!p.name.trim() || !p.age || !p.gender || !p.phone.trim()) return setErr('Fill in name, age, gender and phone to continue.')
      if (!/^[+\d][\d\s-]{7,}$/.test(p.phone.trim())) return setErr('Enter a valid phone number.')
    }
    if (step === 1 && !date) return setErr('Pick a date.')
    if (step === 2 && !time) return setErr('Pick a time.')
    setStep(step + 1)
  }

  const confirm = () => {
    const appt = {
      id: 'DRX-' + Date.now().toString(36).toUpperCase().slice(-6),
      doctorName: doctor.name, specialty: doctor.specialty, location: doctor.location,
      patient: p, dateLabel: fmt(date), time, status: 'Pending', createdAt: new Date().toISOString()
    }
    const msg = [
      'New appointment request — Doctor X', 'Appointment ID: ' + appt.id, '',
      'Patient: ' + p.name, `Age / Gender: ${p.age} / ${p.gender}`, 'Phone: ' + p.phone,
      'Email: ' + (p.email || '-'), 'Address: ' + (p.address || '-'), '',
      'Doctor: ' + doctor.name, 'Specialty: ' + doctor.specialty, 'Date: ' + appt.dateLabel, 'Time: ' + time, '',
      'Please reply to confirm or reschedule this appointment.'
    ].join('\n')
    window.open(`https://wa.me/${CLINIC_WHATSAPP}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener')
    onDone(appt)
  }

  return (
    <div className="overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal wide" role="dialog" aria-modal="true" aria-label="Book a visit">
        <button className="x" onClick={onClose} aria-label="Close">×</button>
        <h2>Book with {doctor.name}</h2>
        <p className="muted">{doctor.specialty} · {doctor.location}</p>
        <ol className="steps">{STEPS.map((s, i) => <li key={s} className={i === step ? 'on' : i < step ? 'done' : ''}>{s}</li>)}</ol>

        {step === 0 && (
          <div className="form">
            <label>Full name<input value={p.name} onChange={set('name')} /></label>
            <label>Age<input type="number" min="0" max="120" value={p.age} onChange={set('age')} /></label>
            <label>Gender<select value={p.gender} onChange={set('gender')}><option value="">Select</option>{['Female', 'Male', 'Other', 'Prefer not to say'].map((g) => <option key={g}>{g}</option>)}</select></label>
            <label>Phone<input type="tel" value={p.phone} onChange={set('phone')} /></label>
            <label>Email (optional)<input type="email" value={p.email} onChange={set('email')} /></label>
            <label>Address (optional)<input value={p.address} onChange={set('address')} /></label>
          </div>
        )}
        {step === 1 && (
          <div className="dates" role="radiogroup" aria-label="Choose a date">
            {days.map((d) => (
              <button key={d.toISOString()} role="radio" aria-checked={date?.getTime() === d.getTime()} className={date?.getTime() === d.getTime() ? 'on' : ''} onClick={() => setDate(d)}>
                <small>{d.toLocaleDateString('en-IN', { weekday: 'short' })}</small><b>{d.getDate()}</b><small>{d.toLocaleDateString('en-IN', { month: 'short' })}</small>
              </button>
            ))}
          </div>
        )}
        {step === 2 && (
          <div className="slots" role="radiogroup" aria-label="Choose a time">
            {TIME_SLOTS.map((t) => <button key={t} role="radio" aria-checked={time === t} className={time === t ? 'on' : ''} onClick={() => setTime(t)}>{t}</button>)}
          </div>
        )}
        {step === 3 && (
          <dl className="review">
            <dt>Patient</dt><dd>{p.name}, {p.age}, {p.gender}</dd>
            <dt>Phone</dt><dd>{p.phone}</dd>
            <dt>Doctor</dt><dd>{doctor.name} ({doctor.specialty})</dd>
            <dt>When</dt><dd>{fmt(date)} at {time}</dd>
            <dd className="muted wide">Confirming opens WhatsApp with this request pre-written. Send it to finish booking.</dd>
          </dl>
        )}

        {err && <p className="alert" role="alert">{err}</p>}
        <div className="actions end">
          {step > 0 && <button className="ghost" onClick={() => setStep(step - 1)}>Back</button>}
          {step < 3 ? <button className="primary" onClick={next}>Continue</button> : <button className="primary" onClick={confirm}>Send on WhatsApp</button>}
        </div>
      </div>
    </div>
  )
}
