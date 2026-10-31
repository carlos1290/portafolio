import { useI18n } from '../hooks/useI18n.jsx'

export default function About() {
  const { t } = useI18n()

  const education = [
    { period: t('about.edu1period'), title: t('about.edu1title'), place: 'UDELAR' },
    { period: t('about.edu2period'), title: t('about.edu2title'), place: 'ÁNMA TEC' },
  ]

  return (
    <section className="zone" id="bitacora">
      <div className="container">
        <header className="zone-header" data-reveal>
          <span className="zone-marker">{t('about.marker')}</span>
          <h2 className="section-title">{t('about.title')}</h2>
        </header>
        <div className="about-grid">
          <div className="glass panel" data-reveal>
            <h3 className="panel-title">{t('about.whoIAm')}</h3>
            <p dangerouslySetInnerHTML={{ __html: t('about.p1') }} />
            <p>{t('about.p2')}</p>
          </div>
          <div className="about-side">
            <div className="about-photo" data-reveal aria-label={t('about.photoLabel')}>
              CG
            </div>
            <div className="glass panel" data-reveal>
              <h3 className="panel-title">{t('about.education')}</h3>
              <ul className="edu-list">
                {education.map((e) => (
                  <li key={e.title}>
                    <span className="edu-period">{e.period}</span>
                    <strong>{e.title}</strong>
                    <span className="edu-place">{e.place}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
