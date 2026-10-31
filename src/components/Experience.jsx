import { useI18n } from '../hooks/useI18n.jsx'
import { DatabaseIcon, ChartIcon, MapPinIcon } from './Icons.jsx'

const taskIcons = [DatabaseIcon, ChartIcon, MapPinIcon]

export default function Experience() {
  const { t } = useI18n()
  const tasks = t('experience.tasks')
  const tags = [
    ['Data', 'SPSS', 'Excel'],
    ['Power BI', 'Dashboards'],
    ['QA', 'Google Maps', 'Testing'],
  ]

  return (
    <section className="zone" id="mision">
      <div className="container">
        <header className="zone-header" data-reveal>
          <span className="zone-marker">{t('experience.marker')}</span>
          <h2 className="section-title">{t('experience.title')}</h2>
          <p className="zone-lead" data-reveal>
            {t('experience.lead')}
          </p>
        </header>

        <div className="exp-role glass panel" data-reveal>
          <div>
            <h3 className="panel-title">{t('experience.role')}</h3>
            <p className="exp-meta">{t('experience.meta')}</p>
          </div>
          <span className="exp-badge">{t('experience.badge')}</span>
        </div>

        <div className="projects-grid">
          {tasks.map((task, i) => {
            const Icon = taskIcons[i]
            return (
              <article key={task.title} className="glass panel project-card" data-reveal>
                <div className="project-img">
                  <Icon className="project-icon" />
                </div>
                <div className="project-body">
                  <h3 className="project-title">{task.title}</h3>
                  <p className="project-desc">{task.desc}</p>
                  <div className="project-tags">
                    {tags[i].map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
