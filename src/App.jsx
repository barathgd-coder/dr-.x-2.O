import { useCallback, useEffect, useRef, useState } from 'react'
import { useStored } from './lib/store.js'
import Splash from './views/Splash.jsx'
import Home from './views/Home.jsx'
import Check from './views/Check.jsx'
import Conditions from './views/Conditions.jsx'
import Doctors from './views/Doctors.jsx'
import Hospitals from './views/Hospitals.jsx'
import Appointments from './views/Appointments.jsx'
import Profile from './views/Profile.jsx'
import Feedback from './views/Feedback.jsx'
import Device from './views/Device.jsx'

const I = (d) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{d}</svg>
)
// Feedback is intentionally the last item.
const NAV = [
  { id: 'device', label: 'RIY3.0 Hive', short: 'Hive', main: true, icon: I(<><rect x="5" y="5" width="14" height="14" rx="2" /><path d="M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3" /><rect x="9" y="9" width="6" height="6" /></>) },
  { id: 'home', label: 'Home', main: true, icon: I(<><path d="M3 11l9-8 9 8" /><path d="M5 10v10h14V10" /></>) },
  { id: 'check', label: 'Check symptoms', short: 'Check', main: true, icon: I(<><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z" /></>) },
  { id: 'conditions', label: 'Conditions', icon: I(<><path d="M2 4h7a3 3 0 0 1 3 3v13a2 2 0 0 0-2-2H2z" /><path d="M22 4h-7a3 3 0 0 0-3 3v13a2 2 0 0 1 2-2h8z" /></>) },
  { id: 'doctors', label: 'Find doctors', short: 'Doctors', main: true, icon: I(<><circle cx="12" cy="7" r="4" /><path d="M5 21v-2a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v2" /><path d="M12 14v3" /></>) },
  { id: 'hospitals', label: 'Hospitals', icon: I(<><path d="M4 21V5a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v16M15 11h4a1 1 0 0 1 1 1v9M2 21h20M9 8v4M7 10h4" /></>) },
  { id: 'appointments', label: 'Appointments', short: 'Visits', main: true, icon: I(<><rect x="3" y="4" width="18" height="17" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></>) },
  { id: 'profile', label: 'Profile', icon: I(<><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></>) },
  { id: 'feedback', label: 'Feedback', icon: I(<><path d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4 6.1 20.5l1.2-6.5L2.5 9.4l6.6-.9z" /></>) }
]
const MORE = NAV.filter((n) => !n.main)
const MORE_ICON = I(<><circle cx="5" cy="12" r="1.2" /><circle cx="12" cy="12" r="1.2" /><circle cx="19" cy="12" r="1.2" /></>)

export default function App() {
  const [splash, setSplash] = useState(true)
  const [view, setView] = useState('device')
  const [more, setMore] = useState(false)
  const [toastMsg, setToastMsg] = useState('')
  const toastTimer = useRef()
  const [profile, setProfile] = useStored('drx.profile', {})
  const [appointments, setAppointments] = useStored('drx.appointments', [])
  const [feedback, setFeedback] = useStored('drx.feedback', [])
  const [doctorFilter, setDoctorFilter] = useState('')
  const [seed, setSeed] = useState('')
  const [online, setOnline] = useState(navigator.onLine)

  useEffect(() => {
    const on = () => setOnline(true), off = () => setOnline(false)
    window.addEventListener('online', on); window.addEventListener('offline', off)
    return () => { window.removeEventListener('online', on); window.removeEventListener('offline', off) }
  }, [])

  const endSplash = useCallback(() => setSplash(false), [])
  const toast = useCallback((m) => {
    setToastMsg(m); clearTimeout(toastTimer.current)
    toastTimer.current = setTimeout(() => setToastMsg(''), 3200)
  }, [])

  const go = (v, opts = {}) => {
    if (opts.condition !== undefined) setDoctorFilter(opts.condition)
    if (opts.seed !== undefined) setSeed(opts.seed)
    setMore(false)
    setView(v)
    window.scrollTo(0, 0)
  }

  const props = { go, toast, profile, setProfile, appointments, setAppointments, doctorFilter, setDoctorFilter, seed, setSeed, feedback, setFeedback }
  const moreActive = MORE.some((n) => n.id === view)

  return (
    <>
      {splash && <Splash onDone={endSplash} />}
      <div className={'shell' + (splash ? ' hidden' : ' ready')}>
        <aside className="rail">
          <button className="brand" onClick={() => go('device')} aria-label="RIY3.0 Hive home">
            <img src="logo-mark.png" alt="" />
            <span><b>dr.x</b><small>Classic Health &amp; Healing</small></span>
          </button>
          <nav aria-label="Main" className="desk">
            {NAV.map((n) => (
              <button key={n.id} className={view === n.id ? 'on' : ''} onClick={() => go(n.id)} aria-current={view === n.id ? 'page' : undefined}>
                {n.icon}<span>{n.label}</span>
              </button>
            ))}
          </nav>
          <nav aria-label="Main" className="mob">
            {NAV.filter((n) => n.main).map((n) => (
              <button key={n.id} className={view === n.id ? 'on' : ''} onClick={() => go(n.id)} aria-current={view === n.id ? 'page' : undefined}>
                {n.icon}<span>{n.short || n.label}</span>
              </button>
            ))}
            <button className={moreActive || more ? 'on' : ''} onClick={() => setMore((m) => !m)} aria-expanded={more}>{MORE_ICON}<span>More</span></button>
          </nav>
          <p className={'net ' + (online ? '' : 'off')}><i />{online ? 'Online' : 'Offline — everything still works'}</p>
        </aside>

        {more && (
          <div className="sheet-wrap" onClick={() => setMore(false)}>
            <div className="sheet" role="menu" onClick={(e) => e.stopPropagation()}>
              {MORE.map((n) => (
                <button key={n.id} role="menuitem" className={view === n.id ? 'on' : ''} onClick={() => go(n.id)}>{n.icon}<span>{n.label}</span></button>
              ))}
            </div>
          </div>
        )}

        <main className={'stage' + (view === 'device' ? ' wide' : '')} key={view}>
          {view === 'home' && <Home {...props} />}
          {view === 'check' && <Check {...props} />}
          {view === 'conditions' && <Conditions {...props} />}
          {view === 'doctors' && <Doctors {...props} />}
          {view === 'hospitals' && <Hospitals {...props} />}
          {view === 'appointments' && <Appointments {...props} />}
          {view === 'profile' && <Profile {...props} />}
          {view === 'device' && <Device />}
          {view === 'feedback' && <Feedback {...props} />}
        </main>
      </div>
      <div className={'toast' + (toastMsg ? ' show' : '')} role="status" aria-live="polite">{toastMsg}</div>
    </>
  )
}
