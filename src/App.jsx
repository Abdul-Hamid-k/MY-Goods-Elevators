import { useReveal, useTheme } from './hooks.js'
import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import Models from './components/Models.jsx'
import Work from './components/Work.jsx'
import { Clients, Contact, Floating, Footer, Process, Services } from './components/Sections.jsx'

export default function App() {
  const [theme, toggleTheme] = useTheme()
  useReveal()
  return (
    <>
      <Nav theme={theme} toggleTheme={toggleTheme} />
      <main>
        <Hero theme={theme} />
        <Services />
        <Models theme={theme} />
        <Work />
        <Process />
        <Clients />
        <Contact />
      </main>
      <Footer />
      <Floating />
    </>
  )
}
