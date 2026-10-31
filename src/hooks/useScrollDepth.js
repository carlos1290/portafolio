import { useEffect } from 'react'
import messages from '../data/i18n.json'

const ZONES = [
  { min: 0, max: 12, key: 'surface' },
  { min: 12, max: 90, key: 'sunlight' },
  { min: 90, max: 300, key: 'twilight' },
  { min: 300, max: 650, key: 'midnight' },
  { min: 650, max: Infinity, key: 'abyss' },
]

export function zoneName(meters, lang = 'es') {
  const key = ZONES.find((z) => meters >= z.min && meters < z.max)?.key
  if (!key) return ''
  return messages[lang]?.gauge?.zones?.[key] ?? messages.es.gauge.zones[key]
}

export function useScrollDepth() {
  useEffect(() => {
    const root = document.documentElement
    let raf = 0

    // Pausa de animaciones: pestaña oculta o escena fuera del viewport.
    // (3.1) Ahorro de GPU: burbujas/partículas/olas no consumen ciclos
    // cuando nadie las ve.
    const io = new IntersectionObserver(
      ([entry]) => {
        root.classList.toggle('scene-offscreen', !entry.isIntersecting)
      },
      { threshold: 0 }
    )
    const scene = document.querySelector('.ocean')
    if (scene) io.observe(scene)
    const onVis = () => root.classList.toggle('scene-offscreen', document.hidden)
    document.addEventListener('visibilitychange', onVis)

    const update = () => {
      raf = 0
      const max = root.scrollHeight - window.innerHeight
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0
      root.style.setProperty('--p', p.toFixed(4))

      const meters = Math.round(p * 900)
      const readout = document.getElementById('gauge-depth')
      if (readout) readout.textContent = `−${String(meters).padStart(3, '0')} m`
      const zone = document.getElementById('gauge-zone')
      if (zone) zone.textContent = zoneName(meters, root.lang || 'es')
      const bar = document.getElementById('gauge-bar')
      if (bar) bar.style.height = `${(p * 100).toFixed(1)}%`
      root.style.setProperty(
        '--zone',
        meters >= 650 ? 'abyss' : meters >= 300 ? 'midnight' : 'shallow'
      )
    }

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }

    update()
    // Si cambia el idioma (atributo lang), refrescar el HUD sin esperar scroll
    const langObs = new MutationObserver(update)
    langObs.observe(root, { attributes: true, attributeFilter: ['lang'] })
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      if (raf) cancelAnimationFrame(raf)
      langObs.disconnect()
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      document.removeEventListener('visibilitychange', onVis)
      io.disconnect()
    }
  }, [])
}

export function useReveal() {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const els = document.querySelectorAll('[data-reveal]')
    if (reduce) {
      els.forEach((el) => el.classList.add('is-visible'))
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible')
            io.unobserve(e.target)
          }
        })
      },
      { threshold: 0.15 }
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}
