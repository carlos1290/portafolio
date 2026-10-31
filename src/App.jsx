import Navbar from './components/Navbar.jsx'
import Ocean from './components/Ocean.jsx'
import DepthGauge from './components/DepthGauge.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Skills from './components/Skills.jsx'
import Projects from './components/Projects.jsx'
import Experience from './components/Experience.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import { I18nProvider } from './hooks/useI18n.jsx'
import { useScrollDepth, useReveal } from './hooks/useScrollDepth.js'

export default function App() {
  useScrollDepth()
  useReveal()

  return (
    <I18nProvider>
      <Ocean />
      <DepthGauge />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </I18nProvider>
  )
}
