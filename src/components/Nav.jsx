import { useState } from 'react'
import { COMPANY, NAV } from '../data.js'
import { Moon, Sun } from './Bits.jsx'

export default function Nav({ theme, toggleTheme }) {
  const [open, setOpen] = useState(false)
  return (
    <header className="nav">
      <a className="brand" href="#top" aria-label={COMPANY.name}>
        <span className="brand-mark" aria-hidden="true" />
        <span>M.Y. <b>Goods Elevators</b></span>
      </a>
      <nav className={open ? 'open' : ''} aria-label="Primary">
        {NAV.map(([label, href]) => (
          <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>
        ))}
      </nav>
      <div className="nav-actions">
        <button className="icon-btn" onClick={toggleTheme} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}>
          {theme === 'dark' ? <Sun /> : <Moon />}
        </button>
        <button className="icon-btn menu-btn" onClick={() => setOpen((o) => !o)} aria-label="Menu" aria-expanded={open}>
          <span /><span />
        </button>
      </div>
    </header>
  )
}
