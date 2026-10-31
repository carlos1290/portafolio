import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import messages from '../data/i18n.json'

const Ctx = createContext(null)

function lookup(dict, key) {
  return key.split('.').reduce((o, k) => o?.[k], dict)
}

function readStored() {
  try {
    return localStorage.getItem('lang')
  } catch {
    return null
  }
}

export function I18nProvider({ children }) {
  const [lang, setLang] = useState(() => (readStored() === 'en' ? 'en' : 'es'))

  useEffect(() => {
    document.documentElement.lang = lang
    document.documentElement.dataset.lang = lang
    try {
      localStorage.setItem('lang', lang)
    } catch {
      /* modo privado sin storage: se ignora */
    }
  }, [lang])

  const toggle = useCallback(() => setLang((l) => (l === 'es' ? 'en' : 'es')), [])

  const t = useCallback(
    (key, params) => {
      let v = lookup(messages[lang], key)
      if (v === undefined) v = lookup(messages.es, key)
      if (typeof v !== 'string' || !params) return v
      return Object.entries(params).reduce((acc, [k, val]) => acc.replaceAll(`{${k}}`, val), v)
    },
    [lang]
  )

  return <Ctx.Provider value={{ lang, setLang, toggle, t }}>{children}</Ctx.Provider>
}

export function useI18n() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useI18n debe usarse dentro de <I18nProvider>')
  return ctx
}
