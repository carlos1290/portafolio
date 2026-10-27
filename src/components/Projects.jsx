const projects = [
  {
    id: 1,
    title: 'Nombre del proyecto',
    desc: 'Breve descripción del proyecto: qué hace, qué problema resuelve y qué tecnologías utiliza.',
    tags: ['React', 'Node.js', 'MongoDB'],
  },
  {
    id: 2,
    title: 'Nombre del proyecto',
    desc: 'Breve descripción del proyecto: qué hace, qué problema resuelve y qué tecnologías utiliza.',
    tags: ['Vue', 'Firebase'],
  },
  {
    id: 3,
    title: 'Nombre del proyecto',
    desc: 'Breve descripción del proyecto: qué hace, qué problema resuelve y qué tecnologías utiliza.',
    tags: ['Python', 'Flask', 'PostgreSQL'],
  },
  {
    id: 4,
    title: 'Nombre del proyecto',
    desc: 'Breve descripción del proyecto: qué hace, qué problema resuelve y qué tecnologías utiliza.',
    tags: ['TypeScript', 'Next.js'],
  },
]

export default function Projects() {
  return (
    <section id="proyectos">
      <div className="container">
        <h2 className="section-title">Proyectos</h2>
        <div className="projects-grid">
          {projects.map((p) => (
            <article key={p.id} className="project-card">
              <div className="project-img">🖼️</div>
              <div className="project-body">
                <h3 className="project-title">{p.title}</h3>
                <p className="project-desc">{p.desc}</p>
                <div className="project-tags">
                  {p.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
                <div className="project-links">
                  <a href="#" onClick={(e) => e.preventDefault()}>
                    Demo →
                  </a>
                  <a href="#" onClick={(e) => e.preventDefault()}>
                    Código →
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
