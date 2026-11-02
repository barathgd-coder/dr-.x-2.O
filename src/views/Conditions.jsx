import { useMemo, useState } from 'react'
import { CONDITIONS } from '../data/conditions.js'

const LETTERS = ['All', ...'ABCDEFGHIJKLMNOPQRSTUVWXYZ']

export default function Conditions({ go }) {
  const [q, setQ] = useState('')
  const [letter, setLetter] = useState('All')
  const [open, setOpen] = useState(null)

  const list = useMemo(() => {
    const s = q.trim().toLowerCase()
    return CONDITIONS.filter((c) =>
      (letter === 'All' || c.name[0].toUpperCase() === letter) &&
      (!s || c.name.toLowerCase().includes(s) || c.category.toLowerCase().includes(s) ||
        c.specialist.toLowerCase().includes(s) || c.symptoms.some((x) => x.toLowerCase().includes(s))))
  }, [q, letter])

  return (
    <div>
      <header className="pagehead"><h1>Conditions</h1><span className="muted">{list.length} shown</span></header>
      <input className="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by condition, symptom or specialist" aria-label="Search conditions" />
      <div className="letters" role="group" aria-label="Filter by first letter">
        {LETTERS.map((l) => <button key={l} className={l === letter ? 'on' : ''} onClick={() => setLetter(l)}>{l}</button>)}
      </div>
      {!list.length && <p className="empty">No conditions match. Try a different word or letter.</p>}
      <ul className="cards">
        {list.map((c) => (
          <li key={c.name}>
            <button className="card" onClick={() => setOpen(c)}>
              <strong>{c.name}</strong>
              <span className="muted">{c.category}</span>
              <span className="tag">{c.specialist}</span>
            </button>
          </li>
        ))}
      </ul>

      {open && (
        <div className="overlay" onClick={(e) => e.target === e.currentTarget && setOpen(null)}>
          <div className="modal" role="dialog" aria-modal="true" aria-label={open.name}>
            <button className="x" onClick={() => setOpen(null)} aria-label="Close">×</button>
            <p className="muted">{open.category}</p>
            <h2>{open.name}</h2>
            <p className="tag">Treated by a {open.specialist}</p>
            <h3>Common symptoms</h3>
            <ul className="bul">{open.symptoms.map((s) => <li key={s}>{s}</li>)}</ul>
            <button className="primary" onClick={() => go('doctors', { condition: open.name })}>Find a {open.specialist.toLowerCase()}</button>
          </div>
        </div>
      )}
    </div>
  )
}
