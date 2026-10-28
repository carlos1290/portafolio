import { useEffect } from 'react'

const ZONES = [
  { min: 0, max: 12, name: 'SUPERFICIE' },
  { min: 12, max: 90, name: 'ZONA ILUMINADA' },
  { min: 90, max: 300, name: 'ZONA CREPUSCULAR' },
  { min: 300, max: 650, name: 'ZONA DE MEDIANOCHE' },
  { min: 650, max: Infinity, name: 'EL ABISMO' },
]

export function zoneName(meters) {
  return ZONES.find((z) => meters >= z.min && meters <= z.max)?.name ?? ''
}

export function useScrollDepth() {
  useEffect(() => {
    const root = document.documentElement
    let raf = 0

    const update = () => {
      raf = 0
      const max = root.scrollHeight - window.innerHeight
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0
      root.style.setProperty('--p', p.toFixed(4))

      const meters = Math.round(p * 900)
      const readout = document.getElementById('gauge-depth')
      if (readout) readout.textContent = `−${String(meters).padStart(3, '0')} m`
      const zone = document.getElementById('gauge-zone')
      if (zone) zone.textContent = zoneName(meters)
      const bar = document.getElementById('gauge-bar')
      if (bar) bar.style.height = `${(p * 100).toFixed(1)}%`
      root.style.setProperty('--zone', meters >= 650 ? 'abyss' : meters >= 300 ? 'midnight' : 'shallow')
    }

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      if (raf) cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
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
