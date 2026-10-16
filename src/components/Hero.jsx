import { lazy, Suspense } from 'react'
import { useInView } from '../hooks.js'
import { COMPANY } from '../data.js'
import { Arrow, SceneBoundary } from './Bits.jsx'

const HeroScene = lazy(() => import('../three/HeroScene.jsx'))

export default function Hero({ theme }) {
  const [ref, inView] = useInView('0px')
  return (
    <section className="hero" id="top" ref={ref}>
      <div className="hero-canvas" aria-hidden="true">
        <SceneBoundary>
          <Suspense fallback={null}>
            <HeroScene theme={theme} active={inView} />
          </Suspense>
        </SceneBoundary>
      </div>
      <div className="hero-fade" />
      <div className="hero-copy">
        <p className="eyebrow">Lift manufacturer · Indore · Since {COMPANY.since}</p>
        <h1>
          Goods lifts,<br />
          built to <em>carry more</em>.
        </h1>
        <p className="lead">
          We manufacture, install and service goods lifts, hydraulic elevators and elevator panels for factories,
          warehouses, hotels and shops across Madhya Pradesh.
        </p>
        <div className="cta">
          <a className="btn" href="#contact">Get a free quote <Arrow /></a>
          <a className="btn ghost" href="#work">See our work</a>
        </div>
        <p className="hint">Drag the 3D models below to explore every lift.</p>
      </div>
    </section>
  )
}
