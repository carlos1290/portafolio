export default function Contact() {
  return (
    <section id="contacto">
      <div className="container">
        <h2 className="section-title">Contacto</h2>
        <div className="contact-grid">
          <div className="contact-info">
            <p>
              ¿Tienes un proyecto en mente o simplemente quieres saludar?
              Escríbeme y te responderé lo antes posible.
            </p>
            <div className="contact-socials">
              <a href="#" onClick={(e) => e.preventDefault()}>🐈 GitHub</a>
              <a href="#" onClick={(e) => e.preventDefault()}>💼 LinkedIn</a>
              <a href="mailto:tuemail@ejemplo.com">✉️ tuemail@ejemplo.com</a>
            </div>
          </div>

          <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
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
            <button type="submit" className="btn btn-primary">
              Enviar mensaje
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
