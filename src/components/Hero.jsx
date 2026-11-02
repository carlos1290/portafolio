import { useState } from 'react'
import { useI18n } from '../hooks/useI18n.jsx'
import { DownloadIcon } from './Icons.jsx'
import CvLangModal from './CvLangModal.jsx'

export default function Hero() {
  const { t } = useI18n()
  const [cvPicker, setCvPicker] = useState(false)

  return (
    <section className="hero" id="superficie">
      <div className="container hero-inner">
        <p className="hero-eyebrow" data-reveal>
          {t('hero.eyebrow')}
        </p>
        <h1 className="hero-title" data-reveal>
          Carlos <span>Gonzalez</span>
        </h1>
        <p className="hero-subtitle" data-reveal>
          {t('hero.subtitle')}
        </p>
        <div className="hero-actions" data-reveal>
          <a href="#bitacora" className="btn btn-dive">
            {t('hero.dive')}
          </a>
          <button type="button" className="btn btn-outline" onClick={() => setCvPicker(true)}>
            <DownloadIcon /> {t('hero.downloadCv')}
          </button>
          <a href="#contacto" className="btn btn-ghost">
            {t('hero.contact')}
          </a>
        </div>
      </div>
      <div className="scroll-hint" aria-hidden="true">
        <span className="scroll-hint__line" />
        {t('hero.scrollHint')}
      </div>
      {cvPicker && <CvLangModal onClose={() => setCvPicker(false)} />}
    </section>
  )
}
