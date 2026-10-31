import { useEffect, useRef, useState } from 'react'
import { useI18n } from '../hooks/useI18n.jsx'
import { MailIcon, PhoneIcon, LinkedInIcon } from './Icons.jsx'

// PII ensamblada en tiempo de ejecución: el HTML fuente no contiene la
// dirección completa en texto plano (mitiga el scraping masivo de bots).
const EMAIL = `${'carlosdaniel.gonzalez' + '390'}@${'gmail'}.${'com'}`
const PHONE_DISPLAY = ['+598', '096', '293', '903'].join(' ')
const PHONE_HREF = `tel:${'+598' + '096293903'}`
const GMAIL_COMPOSE = `https://mail.google.com/mail/?view=cm&fs=1&to=${EMAIL}`

export default function Contact() {
  const [toast, setToast] = useState('')
  const timer = useRef(0)
  const { t } = useI18n()

  useEffect(() => () => clearTimeout(timer.current), [])

  const showToast = (msg) => {
    setToast(msg)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setToast(''), 2600)
  }

  // La página se sirve por HTTPS (GitHub Pages): Clipboard API sin fallback
  // obsoleto (WCAG 3.2 — execCommand eliminado).
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL)
      showToast(t('contact.copied'))
    } catch {
      showToast(t('contact.opened'))
    }
  }

  return (
    <section className="zone" id="contacto">
      <div className="container">
        <header className="zone-header" data-reveal>
          <span className="zone-marker">{t('contact.marker')}</span>
          <h2 className="section-title">{t('contact.title')}</h2>
          <p className="zone-lead" data-reveal>
            {t('contact.lead')}
          </p>
        </header>

        <div className="contact-grid">
          <div className="contact-info" data-reveal>
            <div className="glass panel">
              <h3 className="panel-title">{t('contact.channel')}</h3>
              <div className="contact-socials">
                <a
                  href={GMAIL_COMPOSE}
                  target="_blank"
                  rel="noreferrer"
                  onClick={copyEmail}
                  title={t('contact.emailTitle')}
                >
                  <MailIcon /> {EMAIL}
                </a>
                <a href={PHONE_HREF}>
                  <PhoneIcon /> {PHONE_DISPLAY}
                </a>
                <a
                  href="https://www.linkedin.com/in/carlosgonzalez-webdev"
                  target="_blank"
                  rel="noreferrer"
                >
                  <LinkedInIcon /> linkedin.com/in/carlosgonzalez-webdev
                </a>
              </div>
            </div>
            <div className="glass panel reference-card">
              <h3 className="panel-title">{t('contact.reference')}</h3>
              <p className="reference-name">Santiago Peyrou</p>
              <p className="reference-role">{t('contact.refRole')}</p>
              <blockquote className="reference-quote">{t('contact.refQuote')}</blockquote>
            </div>
          </div>

          <form
            className="contact-form glass panel"
            data-reveal
            onSubmit={(e) => {
              e.preventDefault()
              const data = new FormData(e.currentTarget)
              const body = `${data.get('message')}\n\n— ${data.get('name')} (${data.get('email')})`
              window.open(
                `${GMAIL_COMPOSE}&su=${encodeURIComponent(t('contact.subject'))}&body=${encodeURIComponent(body)}`,
                '_blank',
                'noopener'
              )
            }}
          >
            <div>
              <label htmlFor="name">{t('contact.name')}</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder={t('contact.namePh')}
                autoComplete="name"
                required
              />
            </div>
            <div>
              <label htmlFor="email">{t('contact.email')}</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder={t('contact.emailPh')}
                autoComplete="email"
                required
              />
            </div>
            <div>
              <label htmlFor="message">{t('contact.message')}</label>
              <textarea id="message" name="message" placeholder={t('contact.messagePh')} required />
            </div>
            <button type="submit" className="btn btn-dive">
              {t('contact.send')}
            </button>
          </form>
        </div>
      </div>

      <div className={`toast ${toast ? 'toast--show' : ''}`} role="status" aria-live="polite">
        {toast}
      </div>
    </section>
  )
}
