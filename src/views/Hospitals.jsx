import { useMemo, useState } from 'react'
import { HOSPITALS } from '../data/hospitals.js'
import Booking from './Booking.jsx'

const STATES = [...new Set(HOSPITALS.map((h) => h.state))].sort()

export default function Hospitals({ profile, setAppointments, go, toast }) {
  const [q, setQ] = useState('')
  const [state, setState] = useState('All')
  const [booking, setBooking] = useState(null)

  const list = useMemo(() => {
    const s = q.trim().toLowerCase()
    return HOSPITALS.filter((h) =>
      (state === 'All' || h.state === state) &&
      (!s || [h.name, h.city, h.state].some((v) => v.toLowerCase().includes(s))))
  }, [q, state])

  const mapLink = (h) => 'https://www.google.com/maps/search/' + encodeURIComponent(`${h.name} ${h.city}`)

  return (
    <div>
      <header className="pagehead">
        <div><h1>Hospitals</h1><p className="muted sub">Leading hospitals across India</p></div>
        <span className="count">{list.length} of {HOSPITALS.length}</span>
      </header>
      <div className="filters">
        <input className="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search hospital, city or state" aria-label="Search hospitals" />
        <select value={state} onChange={(e) => setState(e.target.value)} aria-label="State">
          <option value="All">All states</option>
          {STATES.map((s) => <option key={s}>{s}</option>)}
        </select>
      </div>
      {!list.length && (
        <div className="empty big">
          <p>No hospitals match that search.</p>
          <button className="ghost" onClick={() => { setQ(''); setState('All') }}>Clear filters</button>
        </div>
      )}
      <ul className="cards doc stagger">
        {list.map((h, i) => (
          <li key={h.name} className="card static" style={{ '--i': Math.min(i, 12) }}>
            <div className="avatar hosp" aria-hidden="true">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 21V5a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v16M15 11h4a1 1 0 0 1 1 1v9M2 21h20M9 8v4M7 10h4"/></svg>
            </div>
            <div className="grow">
              <strong>{h.name}</strong>
              <p className="muted">{h.city}, {h.state}</p>
              <div className="actions">
                <button className="primary sm" onClick={() => setBooking({ name: 'Next available specialist', specialty: 'Hospital visit', location: `${h.name}, ${h.city}` })}>Request visit</button>
                <a className="ghost sm" href={mapLink(h)} target="_blank" rel="noopener noreferrer">Directions</a>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <p className="muted fine">Hospital names, cities and states come from your research workbook. Doctor names, phone numbers and addresses are not filled in yet, so none are shown. Add them to the workbook and they can be shown here.</p>
      {booking && (
        <Booking doctor={booking} profile={profile} onClose={() => setBooking(null)}
          onDone={(appt) => { setAppointments((a) => [appt, ...a]); setBooking(null); toast('Request prepared. Send it on WhatsApp to finish.'); go('appointments') }} />
      )}
    </div>
  )
}
