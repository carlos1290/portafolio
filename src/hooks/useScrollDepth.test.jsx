import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { zoneName, useScrollDepth } from './useScrollDepth.js'

describe('zoneName', () => {
  it('mapea metros a la zona correcta (es)', () => {
    expect(zoneName(0, 'es')).toBe('SUPERFICIE')
    expect(zoneName(12, 'es')).toBe('ZONA ILUMINADA')
    expect(zoneName(90, 'es')).toBe('ZONA CREPUSCULAR')
    expect(zoneName(300, 'es')).toBe('ZONA DE MEDIANOCHE')
    expect(zoneName(650, 'es')).toBe('EL ABISMO')
    expect(zoneName(900, 'es')).toBe('EL ABISMO')
  })

  it('traduce las zonas a inglés', () => {
    expect(zoneName(0, 'en')).toBe('SURFACE')
    expect(zoneName(50, 'en')).toBe('SUNLIGHT ZONE')
    expect(zoneName(900, 'en')).toBe('THE ABYSS')
  })

  it('cae a español con un idioma desconocido', () => {
    expect(zoneName(5, 'fr')).toBe('SUPERFICIE')
  })

  it('respeta los límites de zona (fronteras inclusivas por arriba)', () => {
    expect(zoneName(11, 'es')).toBe('SUPERFICIE')
    expect(zoneName(89, 'es')).toBe('ZONA ILUMINADA')
    expect(zoneName(299, 'es')).toBe('ZONA CREPUSCULAR')
    expect(zoneName(649, 'es')).toBe('ZONA DE MEDIANOCHE')
  })
})

describe('useScrollDepth', () => {
  const setScroll = (y) => {
    Object.defineProperty(window, 'scrollY', { value: y, writable: true })
    Object.defineProperty(window, 'innerHeight', { value: 900, writable: true })
    Object.defineProperty(document.documentElement, 'scrollHeight', {
      value: 5900,
      configurable: true,
    })
  }

  beforeEach(() => {
    document.body.innerHTML = `
      <div class="ocean"></div>
      <div id="gauge-depth"></div>
      <div id="gauge-zone"></div>
      <div id="gauge-bar"></div>
    `
    setScroll(0)
  })

  afterEach(() => {
    document.documentElement.removeAttribute('style')
  })

  it('en top=0 fija --p en 0 y el HUD en superficie', () => {
    renderHook(() => useScrollDepth())
    expect(document.documentElement.style.getPropertyValue('--p')).toBe('0.0000')
    expect(document.getElementById('gauge-depth').textContent).toBe('−000 m')
    expect(document.getElementById('gauge-zone').textContent).toBe('SUPERFICIE')
  })

  it('al 50% del scroll --p vale 0.5 y el HUD marca −450 m', () => {
    setScroll(2500) // 2500 / (5900-900) = 0.5
    renderHook(() => useScrollDepth())
    expect(document.documentElement.style.getPropertyValue('--p')).toBe('0.5000')
    expect(document.getElementById('gauge-depth').textContent).toBe('−450 m')
    expect(document.getElementById('gauge-zone').textContent).toBe('ZONA DE MEDIANOCHE')
  })

  it('en el fondo --p se limita a 1 → −900 m EL ABISMO', () => {
    setScroll(99999)
    renderHook(() => useScrollDepth())
    expect(document.documentElement.style.getPropertyValue('--p')).toBe('1.0000')
    expect(document.getElementById('gauge-depth').textContent).toBe('−900 m')
    expect(document.getElementById('gauge-zone').textContent).toBe('EL ABISMO')
  })

  it('reactualiza el HUD al recibir eventos de scroll', async () => {
    renderHook(() => useScrollDepth())
    setScroll(5000)
    act(() => {
      window.dispatchEvent(new Event('scroll'))
    })
    await new Promise((resolve) => requestAnimationFrame(resolve))
    expect(document.documentElement.style.getPropertyValue('--p')).toBe('1.0000')
    expect(document.getElementById('gauge-depth').textContent).toBe('−900 m')
  })
})
