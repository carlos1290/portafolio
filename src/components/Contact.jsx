import { useEffect, useRef, useState } from 'react'

const EMAIL = 'carlosdaniel.gonzalez390@gmail.com'
const GMAIL_COMPOSE = `https://mail.google.com/mail/?view=cm&fs=1&to=${EMAIL}`

export default function Contact() {
  const [toast, setToast] = useState('')
  const timer = useRef(0)

  useEffect(() => () => clearTimeout(timer.current), [])

  const showToast = (msg) => {
    setToast(msg)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setToast(''), 2600)
  }

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL)
      showToast('Correo copiado — Gmail se abre en otra pestaña ✉️')
    } catch {
      const ta = document.createElement('textarea')
      ta.value = EMAIL
      ta.setAttribute('readonly', '')
      ta.style.position = 'fixed'
      ta.style.opacity = '0'
      document.body.appendChild(ta)
      ta.select()
      const ok = document.execCommand('copy')
      document.body.removeChild(ta)
      showToast(ok ? 'Correo copiado — Gmail se abre en otra pestaña ✉️' : 'Gmail se abre en otra pestaña ✉️')
    }
  }

  return (
    <section className="zone" id="contacto">
      <div className="container">
        <header className="zone-header" data-reveal>
          <span className="zone-marker">−900 m · el abismo</span>
          <h2 className="section-title">Fondo del océano</h2>
          <p className="zone-lead" data-reveal>
            Llegaste hasta la base del iceberg. Si buscás un junior con curiosidad,
            responsabilidad y espíritu positivo — esta es la señal.
          </p>
        </header>

        <div className="contact-grid">
          <div className="contact-info" data-reveal>
            <div className="glass panel">
              <h3 className="panel-title">Canal de comunicación</h3>
              <div className="contact-socials">
                <a
                  href={GMAIL_COMPOSE}
                  target="_blank"
                  rel="noreferrer"
                  onClick={copyEmail}
                  title="Copia el correo y abre Gmail en una pestaña nueva"
                >
                  <span aria-hidden="true">✉️</span> {EMAIL}
                </a>
                <a href="tel:+59896293903">
                  <span aria-hidden="true">📞</span> +598 096 293 903
                </a>
                <a
                  href="https://www.linkedin.com/in/carlosgonzalez-webdev"
                  target="_blank"
                  rel="noreferrer"
                >
                  <span aria-hidden="true">💼</span> linkedin.com/in/carlosgonzalez-webdev
                </a>
              </div>
            </div>
            <div className="glass panel reference-card">
              <h3 className="panel-title">Referencia</h3>
              <p className="reference-name">Santiago Peyrou</p>
              <p className="reference-role">
                Director del Laboratorio de Metodología de Equipos Consultores.
                Tutor de Carlos (2023–2024).
              </p>
              <blockquote className="reference-quote">
                «Su curiosidad y reflexividad lo llevan a buscar comprender e ir
                más allá de las tareas concretas. Se desempeña con
                responsabilidad, siempre con espíritu positivo y alegre.»
              </blockquote>
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
                `${GMAIL_COMPOSE}&su=${encodeURIComponent('Hola Carlos — desde tu portafolio')}&body=${encodeURIComponent(body)}`,
                '_blank',
                'noopener'
              )
            }}
          >
            <div>
              <label htmlFor="name">Nombre</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Tu nombre"
                autoComplete="name"
                required
              />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="tucorreo@ejemplo.com"
                autoComplete="email"
                required
              />
            </div>
            <div>
              <label htmlFor="message">Mensaje</label>
              <textarea
                id="message"
                name="message"
                placeholder="Escribe tu mensaje..."
                required
              />
            </div>
            <button type="submit" className="btn btn-dive">
              Enviar señal al sonar
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
