import { useMemo, useState } from 'react'
import { DOCTORS } from '../data/doctors.js'
import Booking from './Booking.jsx'

const initials = (n) => n.replace(/^Dr\.\s*/, '').split(' ').filter(Boolean).slice(0, 2).map((p) => p[0].toUpperCase()).join('')
const SPECIALTIES = [...new Set(DOCTORS.map((d) => d.specialty))].sort()

export default function Doctors({ doctorFilter, setDoctorFilter, profile, setAppointments, go }) {
  const [q, setQ] = useState('')
  const [spec, setSpec] = useState('All')
  const [booking, setBooking] = useState(null)

  const list = useMemo(() => {
    const s = q.trim().toLowerCase()
    return DOCTORS.map((d, i) => ({ ...d, i })).filter((d) =>
      (!doctorFilter || d.condition === doctorFilter) &&
      (spec === 'All' || d.specialty === spec) &&
      (!s || [d.name, d.specialty, d.condition, d.location].some((v) => v.toLowerCase().includes(s))))
  }, [q, spec, doctorFilter])

  return (
    <div>
      <header className="pagehead"><h1>Find doctors</h1><span className="muted">{list.length} doctor{list.length === 1 ? '' : 's'}</span></header>
      {doctorFilter && (
        <p className="chip">For {doctorFilter} <button onClick={() => setDoctorFilter('')} aria-label="Clear condition filter">×</button></p>
      )}
      <div className="filters">
        <input className="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by name, city or condition" aria-label="Search doctors" />
        <select value={spec} onChange={(e) => setSpec(e.target.value)} aria-label="Specialty">
          <option value="All">All specialties</option>
          {SPECIALTIES.map((s) => <option key={s}>{s}</option>)}
        </select>
      </div>
      {!list.length && <p className="empty">No doctors match. Clear a filter or search for something broader.</p>}
      <ul className="cards doc stagger">
        {list.map((d) => (
          <li key={d.i} className="card static" style={{ '--i': Math.min(list.indexOf(d), 12) }}>
            <div className="avatar">{initials(d.name)}</div>
            <div className="grow">
              <strong>{d.name}</strong>
              <span className="tag">{d.specialty}</span>
              <p className="muted">{d.location}</p>
              <p className="muted">Treats {d.condition}</p>
              <div className="actions">
                <button className="primary" onClick={() => setBooking(d)}>Book visit</button>
                <a className="ghost" href={'tel:' + d.contact}>Call {d.contact}</a>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <p className="muted fine">Doctor listings are sample data for demonstration. Replace them with a verified directory before real use.</p>
      {booking && (
        <Booking doctor={booking} profile={profile} onClose={() => setBooking(null)}
          onDone={(appt) => { setAppointments((a) => [appt, ...a]); setBooking(null); go('appointments') }} />
      )}
    </div>
  )
}
