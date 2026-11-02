import { useEffect, useState } from 'react'

// Layered logo reveal. Each layer is the same size and position, cut from the real logo,
// so stacking them rebuilds the original mark exactly while each piece animates on its own.
const LAYERS = ['anim-mark', 'anim-l0', 'anim-l1', 'anim-l2', 'anim-rule', 'anim-tag']
const reduce = () => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

export default function Splash({ onDone }) {
  const [leaving, setLeaving] = useState(false)
  const short = reduce()

  useEffect(() => {
    const t1 = setTimeout(() => setLeaving(true), short ? 700 : 3300)
    const t2 = setTimeout(onDone, short ? 1000 : 3900)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [onDone, short])

  const skip = () => { setLeaving(true); setTimeout(onDone, 350) }

  return (
    <div className={'splash' + (leaving ? ' leaving' : '')} role="status" aria-label="Loading dr.x" onClick={skip}>
      <div className="splash-glow" aria-hidden="true" />
      <div className="splash-rings" aria-hidden="true"><i /><i /><i /></div>
      <div className="splash-logo" aria-hidden="true">
        {LAYERS.map((l) => (
          <img key={l} className={'sl ' + l} src={`${l}.png`} alt="" draggable="false" />
        ))}
        <span className="sweep" />
      </div>
      <div className="splash-load" aria-hidden="true"><i /></div>
      <button className="splash-skip" onClick={(e) => { e.stopPropagation(); skip() }}>Skip</button>
    </div>
  )
}
