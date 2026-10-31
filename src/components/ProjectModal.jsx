import { useEffect, useRef } from 'react'
import { useI18n } from '../hooks/useI18n.jsx'

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'

export default function ProjectModal({ project, onClose }) {
  const { t, lang } = useI18n()
  const closeRef = useRef(null)
  const modalRef = useRef(null)
  const openerRef = useRef(null)

  useEffect(() => {
    // WCAG 2.4.3: recordar qué elemento abrió el modal para devolverle el foco
    openerRef.current = document.activeElement
    closeRef.current?.focus()

    const onKey = (e) => {
      if (e.key === 'Escape') {
        onClose()
        return
      }
      if (e.key !== 'Tab' || !modalRef.current) return
      const nodes = [...modalRef.current.querySelectorAll(FOCUSABLE)].filter(
        (el) => el.offsetParent !== null
      )
      if (!nodes.length) return
      const first = nodes[0]
      const last = nodes[nodes.length - 1]
      // focus trap: el Tab no puede escapar del diálogo
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      } else if (!modalRef.current.contains(document.activeElement)) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
      openerRef.current?.focus?.()
    }
  }, [onClose])

  if (!project) return null

  return (
    <div
      className="modal-backdrop"
      role="presentation"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        ref={modalRef}
        className="modal glass"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-project-title"
      >
        <header className="modal-header">
          <div>
            <p className="project-role">{(lang === 'en' && project.rol_en) || project.rol}</p>
            <h3 id="modal-project-title" className="modal-title">
              {(lang === 'en' && project.titulo_en) || project.titulo}
            </h3>
          </div>
          <button
            ref={closeRef}
            type="button"
            className="modal-close"
            onClick={onClose}
            aria-label={t('modal.close')}
          >
            ✕
          </button>
        </header>

        <div className="modal-body">
          <section>
            <h4 className="modal-section-title">{t('modal.summary')}</h4>
            <p>{(lang === 'en' && project.descripcion_en) || project.descripcion}</p>
          </section>

          <section>
            <h4 className="modal-section-title">{t('modal.architecture')}</h4>
            <p>{(lang === 'en' && project.arquitectura_en) || project.arquitectura}</p>
          </section>

          {project.metricas?.length > 0 && (
            <section>
              <h4 className="modal-section-title">{t('modal.metrics')}</h4>
              <ul className="modal-metrics">
                {project.metricas.map((m, i) => (
                  <li
                    key={
                      lang === 'en' && project.metricas_en ? project.metricas_en[i].label : m.label
                    }
                  >
                    <strong>{m.valor}</strong>
                    <span>
                      {lang === 'en' && project.metricas_en
                        ? project.metricas_en[i].label
                        : m.label}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <section>
            <h4 className="modal-section-title">{t('modal.skills')}</h4>
            <div className="project-tags">
              {project.habilidades_tecnicas.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
          </section>
        </div>

        <footer className="modal-footer">
          {project.enlaces?.demo && (
            <a
              className="btn btn-dive"
              href={project.enlaces.demo}
              target="_blank"
              rel="noreferrer"
            >
              {t('modal.liveDemo')}
            </a>
          )}
          {project.enlaces?.codigo && (
            <a
              className="btn btn-ghost"
              href={project.enlaces.codigo}
              target="_blank"
              rel="noreferrer"
            >
              {t('modal.caseStudy')}
            </a>
          )}
          {!project.enlaces?.demo && !project.enlaces?.codigo && (
            <p className="modal-private">{t('modal.private')}</p>
          )}
        </footer>
      </div>
    </div>
  )
}
