import { useEffect, useRef } from 'react'

export default function ProjectModal({ project, onClose }) {
  const closeRef = useRef(null)

  useEffect(() => {
    closeRef.current?.focus()
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [onClose])

  if (!project) return null

  return (
    <div
      className="modal-backdrop"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="modal glass"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-project-title"
      >
        <header className="modal-header">
          <div>
            <p className="project-role">{project.rol}</p>
            <h3 id="modal-project-title" className="modal-title">
              {project.titulo}
            </h3>
          </div>
          <button
            ref={closeRef}
            type="button"
            className="modal-close"
            onClick={onClose}
            aria-label="Cerrar ficha del proyecto"
          >
            ✕
          </button>
        </header>

        <div className="modal-body">
          <section>
            <h4 className="modal-section-title">Resumen</h4>
            <p>{project.descripcion}</p>
          </section>

          <section>
            <h4 className="modal-section-title">Arquitectura empleada</h4>
            <p>{project.arquitectura}</p>
          </section>

          {project.metricas?.length > 0 && (
            <section>
              <h4 className="modal-section-title">Métricas clave</h4>
              <ul className="modal-metrics">
                {project.metricas.map((m) => (
                  <li key={m.label}>
                    <strong>{m.valor}</strong>
                    <span>{m.label}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <section>
            <h4 className="modal-section-title">Habilidades técnicas</h4>
            <div className="project-tags">
              {project.habilidades_tecnicas.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
          </section>
        </div>

        <footer className="modal-footer">
          {project.enlaces?.demo && (
            <a className="btn btn-dive" href={project.enlaces.demo} target="_blank" rel="noreferrer">
              Ver demo en vivo ↗
            </a>
          )}
          {project.enlaces?.codigo && (
            <a className="btn btn-ghost" href={project.enlaces.codigo} target="_blank" rel="noreferrer">
              Código fuente / Caso de estudio ↗
            </a>
          )}
          {!project.enlaces?.demo && !project.enlaces?.codigo && (
            <p className="modal-private">
              Proyecto realizado en contexto laboral con datos confidenciales — demo
              disponible a pedido.
            </p>
          )}
        </footer>
      </div>
    </div>
  )
}
