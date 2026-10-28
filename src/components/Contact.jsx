export default function Contact() {
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
                <a href="mailto:carlosdaniel.gonzalez390@gmail.com">
                  <span aria-hidden="true">✉️</span> carlosdaniel.gonzalez390@gmail.com
                </a>
                <a href="tel:+598097145143">
                  <span aria-hidden="true">📞</span> +598 097 145 143
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
            onSubmit={(e) => e.preventDefault()}
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
    </section>
  )
}
