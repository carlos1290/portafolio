import { useI18n } from '../hooks/useI18n.jsx'

const technical = [
  'JavaScript',
  'HTML5',
  'CSS3',
  'React.js',
  'Power BI',
  'SPSS',
  'Excel',
  'Google Sheets',
  'Depuración de Datos',
  'QA',
  'Test Cases',
  'Reporte de Bugs',
]

const technicalEn = [
  'JavaScript',
  'HTML5',
  'CSS3',
  'React.js',
  'Power BI',
  'SPSS',
  'Excel',
  'Google Sheets',
  'Data Cleansing',
  'QA',
  'Test Cases',
  'Bug Reporting',
]

const courses = [
  { place: 'Senpai Academy · 9 hrs · Feb 2024' },
  { place: 'Hattrick · 12 hrs · Feb 2024' },
  { place: 'Evertec / ÁNMA · 12 hrs · Feb 2024' },
]

export default function Skills() {
  const { t, lang } = useI18n()
  const courseTexts = t('skills.courses')
  const soft = t('skills.soft')

  return (
    <section className="zone" id="arsenal">
      <div className="container">
        <header className="zone-header" data-reveal>
          <span className="zone-marker">{t('skills.marker')}</span>
          <h2 className="section-title">{t('skills.title')}</h2>
          <p className="zone-lead" data-reveal>
            {t('skills.lead')}
          </p>
        </header>

        <div className="skills-layout">
          <div className="glass panel" data-reveal>
            <h3 className="panel-title">{t('skills.technical')}</h3>
            <div className="skills-grid">
              {(lang === 'en' ? technicalEn : technical).map((s) => (
                <span key={s} className="skill-badge">
                  {s}
                </span>
              ))}
            </div>
            <h3 className="panel-title panel-title--spaced">{t('skills.soft')}</h3>
            <div className="skills-grid">
              {soft.map((s) => (
                <span key={s} className="skill-badge skill-badge--soft">
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div className="courses">
            {courses.map((c, i) => (
              <article key={c.place} className="glass panel course-card" data-reveal>
                <h3 className="panel-title">{courseTexts[i].title}</h3>
                <p className="course-place">{c.place}</p>
                <p className="course-desc">{courseTexts[i].desc}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
