import { useEffect, useRef } from 'react'
import { useI18n } from '../hooks/useI18n.jsx'

export default function CvLangModal({ onClose }) {
  const { t } = useI18n()
  const closeRef = useRef(null)
  const modalRef = useRef(null)
  const openerRef = useRef(null)

  useEffect(() => {
    openerRef.current = document.activeElement
    closeRef.current?.focus()

    const onKey = (e) => {
      if (e.key === 'Escape') {
        onClose()
        return
      }
      if (e.key !== 'Tab' || !modalRef.current) return
      const nodes = [
        ...modalRef.current.querySelectorAll('a[href], button:not([disabled])'),
      ].filter((el) => el.offsetParent !== null)
      if (!nodes.length) return
      const first = nodes[0]
      const last = nodes[nodes.length - 1]
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

  const base = import.meta.env.BASE_URL

  return (
    <div
      className="modal-backdrop"
      role="presentation"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        ref={modalRef}
        className="modal glass cv-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cv-modal-title"
      >
        <header className="modal-header">
          <div>
            <h3 id="cv-modal-title" className="modal-title">
              {t('cvModal.title')}
            </h3>
            <p className="cv-modal-desc">{t('cvModal.desc')}</p>
          </div>
          <button
            ref={closeRef}
            type="button"
            className="modal-close"
            onClick={onClose}
            aria-label={t('cvModal.close')}
          >
            ✕
          </button>
        </header>
        <div className="cv-modal-options">
          <a
            className="cv-option"
            href={`${base}cv-carlos-gonzalez.pdf`}
            download="CV-Carlos-Gonzalez-ES.pdf"
            onClick={onClose}
          >
            <span className="cv-option-lang">Español</span>
            <span className="cv-option-file">CV-Carlos-Gonzalez-ES.pdf · 1 pág.</span>
          </a>
          <a
            className="cv-option"
            href={`${base}cv-carlos-gonzalez-en.pdf`}
            download="CV-Carlos-Gonzalez-EN.pdf"
            onClick={onClose}
          >
            <span className="cv-option-lang">English</span>
            <span className="cv-option-file">CV-Carlos-Gonzalez-EN.pdf · 1 page</span>
          </a>
        </div>
      </div>
    </div>
  )
}
