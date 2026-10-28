const education = [
  {
    period: '2025 — actualidad',
    title: 'Ingeniería en Computación',
    place: 'UDELAR',
  },
  {
    period: '2022 — 2025',
    title: 'Bachillerato Tecnológico — TIC',
    place: 'ÁNMA TEC',
  },
]

export default function About() {
  return (
    <section className="zone" id="bitacora">
      <div className="container">
        <header className="zone-header" data-reveal>
          <span className="zone-marker">−040 m · zona iluminada</span>
          <h2 className="section-title">Bitácora de buceo</h2>
        </header>
        <div className="about-grid">
          <div className="glass panel" data-reveal>
            <h3 className="panel-title">Quién soy</h3>
            <p>
              Soy un estudiante de ingeniería en computación con especial interés
              en la <strong>optimización de sistemas</strong>. Me caracterizo por
              mi adaptabilidad y mi capacidad de aprendizaje, con una actitud
              proactiva y orientada al aprendizaje continuo.
            </p>
            <p>
              Busco una oportunidad como junior donde pueda aplicar y desarrollar
              mis conocimientos, adquirir experiencia profesional y seguir
              creciendo en el área.
            </p>
          </div>
          <div className="about-side">
            <div className="about-photo" data-reveal aria-label="Foto de Carlos Gonzalez">
              CG
            </div>
            <div className="glass panel" data-reveal>
              <h3 className="panel-title">Educación</h3>
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
