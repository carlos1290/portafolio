import { useCallback, useEffect, useRef, useState } from 'react'
import projectsData from '../data/projects.json'
import ProjectCard from './ProjectCard.jsx'
import ProjectModal from './ProjectModal.jsx'

export default function Projects() {
  const trackRef = useRef(null)
  const [selected, setSelected] = useState(null)
  const [edges, setEdges] = useState({ start: true, end: false })
  const projects = projectsData.proyectos

  const measure = useCallback(() => {
    const el = trackRef.current
    if (!el) return
    setEdges({
      start: el.scrollLeft <= 4,
      end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4,
    })
  }, [])

  const scrollByCard = (dir) => {
    const el = trackRef.current
    if (!el) return
    const card = el.querySelector('.project-tile')
    const gap = 24
    const step = card ? card.getBoundingClientRect().width + gap : el.clientWidth * 0.8
    el.scrollBy({ left: dir * step, behavior: 'smooth' })
  }

  useEffect(() => {
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [measure])

  return (
    <section className="zone" id="proyectos">
      <div className="container">
        <header className="zone-header" data-reveal>
          <span className="zone-marker">−280 m · zona de penumbra</span>
          <h2 className="section-title">Pasarela de proyectos</h2>
          <p className="zone-lead" data-reveal>
            Reliquias recuperadas de inmersiones anteriores. Deslizá para
            recorrerlas o abrí la ficha completa.
          </p>
        </header>
      </div>

      <div className="gallery" data-reveal>
        <button
          type="button"
          className="gallery-nav gallery-nav--prev"
          onClick={() => scrollByCard(-1)}
          disabled={edges.start}
          aria-label="Proyecto anterior"
        >
          ‹
        </button>

        <ul
          className="gallery-track"
          ref={trackRef}
          onScroll={measure}
          tabIndex={0}
          role="region"
          aria-label="Carrusel de proyectos, desplazamiento horizontal"
        >
          {projects.map((p, i) => (
            <li key={p.id} className="gallery-slide">
              <ProjectCard project={p} onOpen={setSelected} revealIndex={i} />
            </li>
          ))}
        </ul>

        <button
          type="button"
          className="gallery-nav gallery-nav--next"
          onClick={() => scrollByCard(1)}
          disabled={edges.end}
          aria-label="Proyecto siguiente"
        >
          ›
        </button>
      </div>

      <div className="container">
        <p className="gallery-hint">← deslizá o usá las flechas →</p>
      </div>

      {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
    </section>
  )
}
