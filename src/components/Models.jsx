import { lazy, Suspense, useState } from 'react'
import { MODELS } from '../data.js'
import { useInView } from '../hooks.js'
import { SceneBoundary } from './Bits.jsx'

const ModelViewer = lazy(() => import('../three/ModelViewer.jsx'))

export default function Models({ theme }) {
  const [id, setId] = useState(MODELS[0].id)
  const [ref, inView] = useInView()
  const m = MODELS.find((x) => x.id === id)
  return (
    <section className="section" id="models">
      <div className="wrap">
        <p className="eyebrow reveal">Lift models</p>
        <h2 className="reveal">Explore our lifts in 3D</h2>
        <div className="models reveal">
          <div className="viewer" ref={ref}>
            <SceneBoundary>
              <Suspense fallback={<div className="scene-fallback">Loading 3D…</div>}>
                <ModelViewer model={id} theme={theme} active={inView} />
              </Suspense>
            </SceneBoundary>
            <span className="viewer-tip">Drag to rotate</span>
          </div>
          <div className="model-info">
            <div className="tabs" role="tablist">
              {MODELS.map((x) => (
                <button key={x.id} role="tab" aria-selected={x.id === id} className={x.id === id ? 'on' : ''} onClick={() => setId(x.id)}>
                  {x.name}
                </button>
              ))}
            </div>
            <h3>{m.name}</h3>
            <p className="muted">{m.blurb}</p>
            <dl className="specs">
              {m.specs.map(([k, v]) => (
                <div key={k}><dt>{k}</dt><dd>{v}</dd></div>
              ))}
            </dl>
            <p className="note">Illustrative models. Capacity, speed and cabin size are made to order — share your requirement and we will quote.</p>
            <a className="btn" href="#contact">Enquire about this lift</a>
          </div>
        </div>
      </div>
    </section>
  )
}
