import { useState } from 'react'
import { CLIENTS, COMPANY, CONTACT, CREDENTIALS, SERVICES, STEPS, STRENGTHS, WHY } from '../data.js'
import { Arrow } from './Bits.jsx'

export function Services() {
  return (
    <section className="section" id="services">
      <div className="wrap">
        <p className="eyebrow reveal">What we make</p>
        <h2 className="reveal">Lifts and machinery, made in Indore.</h2>
        <div className="cards">
          {SERVICES.map((s, i) => (
            <article key={s.t} className="card reveal" style={{ transitionDelay: `${(i % 4) * 60}ms` }}>
              <span className="num">{String(i + 1).padStart(2, '0')}</span>
              <h3>{s.t}</h3>
              <p>{s.d}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export function Process() {
  return (
    <section className="section" id="process">
      <div className="wrap">
        <p className="eyebrow reveal">How we work</p>
        <h2 className="reveal">From site visit to service.</h2>
        <ol className="steps">
          {STEPS.map(([n, t, d]) => (
            <li key={n} className="reveal">
              <span className="num">{n}</span>
              <h3>{t}</h3>
              <p>{d}</p>
            </li>
          ))}
        </ol>
        <ul className="why reveal">
          {[...WHY, ...STRENGTHS].map((w) => <li key={w}>{w}</li>)}
        </ul>
      </div>
    </section>
  )
}

export function Clients() {
  return (
    <section className="section alt" id="clients">
      <div className="wrap">
        <p className="eyebrow reveal">Trusted by</p>
        <h2 className="reveal">Hospitals, factories, kitchens and shops.</h2>
        <div className="clients">
          {CLIENTS.map(([group, names]) => (
            <div key={group} className="reveal">
              <h3>{group}</h3>
              <ul>{names.map((n) => <li key={n}>{n}</li>)}</ul>
            </div>
          ))}
        </div>
        <ul className="why reveal">
          {CREDENTIALS.map((c) => <li key={c}>{c}</li>)}
        </ul>
      </div>
    </section>
  )
}

export function Contact() {
  const [form, setForm] = useState({ name: '', phone: '', need: '' })
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))
  const send = (e) => {
    e.preventDefault()
    const text = `Hello, I am ${form.name} (${form.phone}). ${form.need}`
    window.open(`https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(text)}`, '_blank', 'noopener')
  }
  return (
    <section className="section" id="contact">
      <div className="wrap contact">
        <div>
          <p className="eyebrow reveal">Contact</p>
          <h2 className="reveal">Tell us what you need to lift.</h2>
          <p className="muted reveal">Share the load, floors and site details. We will visit, advise and send a quotation.</p>
          <ul className="contact-list reveal">
            <li><b>{CONTACT.person}</b> · {CONTACT.role}</li>
            <li><a href={`tel:${CONTACT.tel}`}>{CONTACT.phoneLabel}</a></li>
            <li><a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a></li>
            <li>{COMPANY.address}</li>
          </ul>
        </div>
        <form className="form reveal" onSubmit={send}>
          <label>Your name<input required value={form.name} onChange={set('name')} autoComplete="name" /></label>
          <label>Phone<input required type="tel" value={form.phone} onChange={set('phone')} autoComplete="tel" /></label>
          <label>What do you need?<textarea rows="4" required value={form.need} onChange={set('need')} placeholder="e.g. Goods lift, 1 ton, 3 floors, factory in Indore" /></label>
          <button className="btn" type="submit">Send on WhatsApp <Arrow /></button>
        </form>
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <span>© {COMPANY.name}</span>
        <span>{COMPANY.city} · Est. {COMPANY.since}</span>
      </div>
    </footer>
  )
}

export function Floating() {
  return (
    <div className="floating">
      <a href={`https://wa.me/${CONTACT.whatsapp}`} target="_blank" rel="noopener" className="btn">WhatsApp</a>
      <a href={`tel:${CONTACT.tel}`} className="btn ghost">Call</a>
    </div>
  )
}
