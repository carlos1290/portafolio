const tasks = [
  {
    icon: '🗃',
    title: 'Procesamiento y depuración de datos',
    desc: 'Depuración, acumulación y sistematización de bases de datos de encuestas y marcos muestrales empresariales.',
    tags: ['Data', 'SPSS', 'Excel'],
  },
  {
    icon: '📊',
    title: 'Visualización y Business Intelligence',
    desc: 'Diseño y desarrollo de tableros de control interactivos en Power BI para la toma de decisiones.',
    tags: ['Power BI', 'Dashboards'],
  },
  {
    icon: '🗺',
    title: 'Análisis espacial y testing',
    desc: 'Control de calidad de encuestas mediante análisis de georreferenciación (Google Maps) y reportes detallados de testing/cuestionarios.',
    tags: ['QA', 'Google Maps', 'Testing'],
  },
]

export default function Experience() {
  return (
    <section className="zone" id="mision">
      <div className="container">
        <header className="zone-header" data-reveal>
          <span className="zone-marker">−450 m · zona de medianoche</span>
          <h2 className="section-title">Expedición: Equipos Consultores</h2>
          <p className="zone-lead" data-reveal>
            A esta profundidad la luz casi no llega — aquí es donde se hace el
            trabajo real.
          </p>
        </header>

        <div className="exp-role glass panel" data-reveal>
          <div>
            <h3 className="panel-title">Desarrollador Web Jr. / Practicante Técnico</h3>
            <p className="exp-meta">Equipos Consultores · 2023 — 2024</p>
          </div>
          <span className="exp-badge">en inmersión</span>
        </div>

        <div className="projects-grid">
          {tasks.map((t) => (
            <article key={t.title} className="glass panel project-card" data-reveal>
              <div className="project-img" aria-hidden="true">{t.icon}</div>
              <div className="project-body">
                <h3 className="project-title">{t.title}</h3>
                <p className="project-desc">{t.desc}</p>
                <div className="project-tags">
                  {t.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
