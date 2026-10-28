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

const soft = [
  'Comunicación asertiva',
  'Proactividad',
  'Liderazgo',
  'Resolución de problemas',
  'Elaboración de reportes',
  'Trabajo en equipo',
]

const courses = [
  {
    title: 'Introducción al Desarrollo de Apps Web',
    place: 'Senpai Academy · 9 hrs · Feb 2024',
    desc: 'Ecosistema web, React.js, HTML5, CSS3, JavaScript.',
  },
  {
    title: 'UX/UI y Quality Assurance — QA',
    place: 'Hattrick · 12 hrs · Feb 2024',
    desc: 'Proceso de testing, elaboración de Test Cases, detección, reproducción y reporte de bugs.',
  },
  {
    title: 'Metodologías Ágiles — Marco SCRUM',
    place: 'Evertec / ÁNMA · 12 hrs · Feb 2024',
    desc: 'Principios ágiles, roles de Scrum Master, gestión de Sprints, retrospectivas y mejora continua.',
  },
]

export default function Skills() {
  return (
    <section className="zone" id="arsenal">
      <div className="container">
        <header className="zone-header" data-reveal>
          <span className="zone-marker">−180 m · zona crepuscular</span>
          <h2 className="section-title">El arsenal bajo el agua</h2>
          <p className="zone-lead" data-reveal>
            La mayor parte de la masa no se ve desde la superficie. Estas son mis
            competencias técnicas, transversales y formaciones complementarias.
          </p>
        </header>

        <div className="skills-layout">
          <div className="glass panel" data-reveal>
            <h3 className="panel-title">Competencias técnicas</h3>
            <div className="skills-grid">
              {technical.map((s) => (
                <span key={s} className="skill-badge">{s}</span>
              ))}
            </div>
            <h3 className="panel-title panel-title--spaced">Competencias transversales</h3>
            <div className="skills-grid">
              {soft.map((s) => (
                <span key={s} className="skill-badge skill-badge--soft">{s}</span>
              ))}
            </div>
          </div>

          <div className="courses">
            {courses.map((c) => (
              <article key={c.title} className="glass panel course-card" data-reveal>
                <h3 className="panel-title">{c.title}</h3>
                <p className="course-place">{c.place}</p>
                <p className="course-desc">{c.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
