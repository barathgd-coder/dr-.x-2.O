export default function Appointments({ appointments, setAppointments, go }) {
  const cancel = (id) => setAppointments((a) => a.map((x) => (x.id === id ? { ...x, status: 'Cancelled' } : x)))
  const remove = (id) => setAppointments((a) => a.filter((x) => x.id !== id))
  return (
    <div>
      <header className="pagehead"><h1>Appointments</h1></header>
      {!appointments.length && (
        <div className="empty big">
          <p>You haven't requested any visits yet.</p>
          <button className="primary" onClick={() => go('doctors', { condition: '' })}>Find a doctor</button>
        </div>
      )}
      <ul className="cards doc stagger">
        {appointments.map((a) => (
          <li key={a.id} className="card static">
            <div className="grow">
              <div className="rowtop"><strong>{a.doctorName}</strong><span className={'status ' + a.status.toLowerCase()}>{a.status}</span></div>
              <span className="tag">{a.specialty}</span>
              <p>{a.dateLabel} at {a.time}</p>
              <p className="muted">{a.location}</p>
              <p className="muted">Ref {a.id} · for {a.patient.name}</p>
              <div className="actions">
                {a.status !== 'Cancelled' && <button className="ghost" onClick={() => cancel(a.id)}>Cancel request</button>}
                <button className="ghost" onClick={() => remove(a.id)}>Remove</button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      {!!appointments.length && <p className="muted fine">Status changes only after the clinic replies on WhatsApp. Cancelling here does not notify them, so message the clinic too.</p>}
    </div>
  )
}
