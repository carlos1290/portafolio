import { useI18n } from '../hooks/useI18n.jsx'

export default function ProjectCard({ project, onOpen, revealIndex }) {
  const { t, lang } = useI18n()
  const en = lang === 'en'
  const titulo = en && project.titulo_en ? project.titulo_en : project.titulo
  const rol = en && project.rol_en ? project.rol_en : project.rol
  const descripcion = en && project.descripcion_en ? project.descripcion_en : project.descripcion
  const img = project.captura_o_demo
    ? `${import.meta.env.BASE_URL.replace(/\/$/, '')}/${project.captura_o_demo.replace(/^\//, '')}`
    : null

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
        aria-label={t('card.openTile', { titulo })}
      >
        {img ? (
          <img src={img} alt={`Captura de ${titulo}`} loading="lazy" />
        ) : (
          <span className="project-shot--placeholder" aria-hidden="true">
            {titulo
              .split(' ')
              .slice(0, 2)
              .map((w) => w[0])
              .join('')
              .toUpperCase()}
          </span>
        )}
        <span className="project-shot__zoom" aria-hidden="true">
          ⤢
        </span>
      </button>

      <p className="project-role">{rol}</p>
      <h3 className="project-title">{titulo}</h3>
      <p className="project-desc">{descripcion}</p>

      <div className="project-tags">
        {project.habilidades_tecnicas.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>

      <div className="project-actions">
        <button type="button" className="link-chip" onClick={() => onOpen(project)}>
          {t('card.fullTile')}
        </button>
        {project.enlaces?.demo && (
          <a
            className="link-chip link-chip--solid"
            href={project.enlaces.demo}
            target="_blank"
            rel="noreferrer"
          >
            {t('card.demo')}
          </a>
        )}
        {project.enlaces?.codigo && (
          <a className="link-chip" href={project.enlaces.codigo} target="_blank" rel="noreferrer">
            {t('card.code')}
          </a>
        )}
      </div>
    </article>
  )
}
