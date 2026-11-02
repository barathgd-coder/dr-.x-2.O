import { useState } from 'react'
import { PROFILE_FIELDS } from '../lib/store.js'

export default function Profile({ profile, setProfile }) {
  const [draft, setDraft] = useState(profile)
  const [saved, setSaved] = useState(false)
  const change = (k) => (e) => { setDraft({ ...draft, [k]: e.target.value }); setSaved(false) }
  const save = (e) => { e.preventDefault(); setProfile(draft); setSaved(true) }
  const clear = () => { if (confirm('Remove your profile from this device?')) { setProfile({}); setDraft({}) } }
  return (
    <div>
      <header className="pagehead"><h1>Profile</h1></header>
      <p className="muted">Saved only on this device. It pre-fills your booking details.</p>
      <form className="form" onSubmit={save}>
        {PROFILE_FIELDS.map((f) => (
          <label key={f.key}>{f.label}
            {f.type === 'select'
              ? <select value={draft[f.key] || ''} onChange={change(f.key)}><option value="">Select</option>{f.options.map((o) => <option key={o}>{o}</option>)}</select>
              : <input type={f.type} value={draft[f.key] || ''} onChange={change(f.key)} />}
          </label>
        ))}
        <div className="actions wide">
          <button className="primary" type="submit">Save profile</button>
          <button className="ghost" type="button" onClick={clear}>Remove profile</button>
          {saved && <span className="ok" role="status">Saved</span>}
        </div>
      </form>
    </div>
  )
}
