import { useCallback, useEffect, useRef, useState } from 'react'
import projectsData from '../data/projects.json'
import ProjectCard from './ProjectCard.jsx'
import ProjectModal from './ProjectModal.jsx'
import { useI18n } from '../hooks/useI18n.jsx'

const AUTOPLAY_MS = 3500

export default function Projects() {
  const trackRef = useRef(null)
  const galleryRef = useRef(null)
  const [selected, setSelected] = useState(null)
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [inView, setInView] = useState(true)
  const [activeIndex, setActiveIndex] = useState(0)
  const { t } = useI18n()
  const projects = projectsData.proyectos
  const n = projects.length
  const [reduceMotion] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )

  const goTo = useCallback(
    (i) => {
      const el = trackRef.current
      if (!el) return
      const target = ((i % n) + n) % n
      const card = el.querySelector('.project-tile')
      const step = card ? card.getBoundingClientRect().width + 24 : el.clientWidth * 0.8
      el.scrollTo({ left: target * step, behavior: reduceMotion ? 'auto' : 'smooth' })
      setIndex(target)
      setActiveIndex(target)
    },
    [n, reduceMotion]
  )

  useEffect(() => {
    const el = galleryRef.current
    if (!el) return
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0.25,
    })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const modalOpen = !!selected
  const autoplayPaused = paused || !inView || modalOpen || reduceMotion

  useEffect(() => {
    if (autoplayPaused) return
    const timer = setInterval(() => goTo(index + 1), AUTOPLAY_MS)
    return () => clearInterval(timer)
  }, [index, autoplayPaused, goTo])

  useEffect(() => {
    const onVis = () => setPaused(document.hidden)
    document.addEventListener('visibilitychange', onVis)
    return () => document.removeEventListener('visibilitychange', onVis)
  }, [])

  const openProject = useCallback((project, i) => {
    setActiveIndex(i)
    setSelected(project)
  }, [])

  const closeProject = useCallback(() => {
    const active = activeIndex
    setSelected(null)
    requestAnimationFrame(() => {
      const slide = trackRef.current?.children?.[active]
      const btn = slide?.querySelector('button.project-shot')
      btn?.focus()
    })
  }, [activeIndex])

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
        ref={galleryRef}
        role="region"
        aria-label={t('projects.carouselLabel')}
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
          aria-label={t('projects.carouselLabel')}
          aria-roledescription={t('projects.carouselDesc')}
        >
          {projects.map((p, i) => (
            <li
              key={p.id}
              className={`gallery-slide ${i === index ? 'gallery-slide--on' : ''}`}
              tabIndex={i === index ? 0 : -1}
              aria-hidden={i !== index}
            >
              <ProjectCard project={p} onOpen={() => openProject(p, i)} revealIndex={i} />
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
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            marginTop: '12px',
          }}
        >
          <button
            type="button"
            className="gallery-pause"
            onClick={() => setPaused((p) => !p)}
            aria-label={paused ? t('projects.play') : t('projects.pause')}
            aria-pressed={paused}
          >
            {paused ? '▶' : '⏸'}
          </button>
          <div className="gallery-dots" style={{ margin: 0 }}>
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
      </div>

      {selected && <ProjectModal project={selected} onClose={closeProject} />}
    </section>
  )
}
