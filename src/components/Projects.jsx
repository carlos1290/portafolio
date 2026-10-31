import { useCallback, useEffect, useRef, useState } from 'react'
import projectsData from '../data/projects.json'
import ProjectCard from './ProjectCard.jsx'
import ProjectModal from './ProjectModal.jsx'
import { useI18n } from '../hooks/useI18n.jsx'

const AUTOPLAY_MS = 3500

export default function Projects() {
  const trackRef = useRef(null)
  const [selected, setSelected] = useState(null)
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const { t } = useI18n()
  const projects = projectsData.proyectos
  const n = projects.length
  const reduceMotion = useRef(false)

  const goTo = useCallback(
    (i) => {
      const el = trackRef.current
      if (!el) return
      const target = ((i % n) + n) % n
      const card = el.querySelector('.project-tile')
      const step = card ? card.getBoundingClientRect().width + 24 : el.clientWidth * 0.8
      el.scrollTo({ left: target * step, behavior: reduceMotion.current ? 'auto' : 'smooth' })
      setIndex(target)
    },
    [n]
  )

  useEffect(() => {
    reduceMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }, [])

  useEffect(() => {
    if (paused || reduceMotion.current) return
    const timer = setInterval(() => goTo(index + 1), AUTOPLAY_MS)
    return () => clearInterval(timer)
  }, [index, paused, goTo])

  useEffect(() => {
    const onVis = () => setPaused(document.hidden)
    document.addEventListener('visibilitychange', onVis)
    return () => document.removeEventListener('visibilitychange', onVis)
  }, [])

  return (
    <section className="zone" id="proyectos">
      <div className="container">
        <header className="zone-header" data-reveal>
          <span className="zone-marker">{t('projects.marker')}</span>
          <h2 className="section-title">{t('projects.title')}</h2>
          <p className="zone-lead" data-reveal>
            {t('projects.lead')}
          </p>
        </header>
      </div>

      <div
        className="gallery"
        data-reveal
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={() => setPaused(false)}
      >
        <button
          type="button"
          className="gallery-nav gallery-nav--prev"
          onClick={() => goTo(index - 1)}
          aria-label={t('projects.prev')}
        >
          ‹
        </button>

        <ul
          className="gallery-track"
          ref={trackRef}
          role="region"
          aria-label={t('projects.carouselLabel')}
          aria-roledescription={t('projects.carouselDesc')}
        >
          {projects.map((p, i) => (
            <li key={p.id} className={`gallery-slide ${i === index ? 'gallery-slide--on' : ''}`}>
              <ProjectCard project={p} onOpen={setSelected} revealIndex={i} />
            </li>
          ))}
        </ul>

        <button
          type="button"
          className="gallery-nav gallery-nav--next"
          onClick={() => goTo(index + 1)}
          aria-label={t('projects.next')}
        >
          ›
        </button>
      </div>

      <div className="container">
        <div className="gallery-dots">
          {projects.map((p, i) => (
            <button
              key={p.id}
              type="button"
              className={`gallery-dot ${i === index ? 'gallery-dot--on' : ''}`}
              aria-label={t('projects.goTo', { titulo: p.titulo })}
              aria-current={i === index ? 'true' : undefined}
              onClick={() => goTo(i)}
            />
          ))}
        </div>
      </div>

      {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
    </section>
  )
}
