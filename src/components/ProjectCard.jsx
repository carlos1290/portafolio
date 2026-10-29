export default function ProjectCard({ project, onOpen, revealIndex }) {
  return (
    <article
      className="glass panel project-tile"
      data-reveal
      style={{ transitionDelay: `${revealIndex * 90}ms` }}
    >
      <button
        type="button"
        className="project-shot"
        onClick={() => onOpen(project)}
        aria-label={`Abrir ficha completa de ${project.titulo}`}
      >
        {project.captura_o_demo ? (
          <img src={project.captura_o_demo} alt={`Captura de ${project.titulo}`} loading="lazy" />
        ) : (
          <span className="project-shot--placeholder" aria-hidden="true">
            {project.titulo
              .split(' ')
              .slice(0, 2)
              .map((w) => w[0])
              .join('')
              .toUpperCase()}
          </span>
        )}
        <span className="project-shot__zoom" aria-hidden="true">⤢</span>
      </button>

      <p className="project-role">{project.rol}</p>
      <h3 className="project-title">{project.titulo}</h3>
      <p className="project-desc">{project.descripcion}</p>

      <div className="project-tags">
        {project.habilidades_tecnicas.map((t) => (
          <span key={t}>{t}</span>
        ))}
      </div>

      <div className="project-actions">
        <button type="button" className="link-chip" onClick={() => onOpen(project)}>
          Ficha completa
        </button>
        {project.enlaces?.demo && (
          <a className="link-chip link-chip--solid" href={project.enlaces.demo} target="_blank" rel="noreferrer">
            Ver demo ↗
          </a>
        )}
        {project.enlaces?.codigo && (
          <a className="link-chip" href={project.enlaces.codigo} target="_blank" rel="noreferrer">
            Código ↗
          </a>
        )}
      </div>
    </article>
  )
}
