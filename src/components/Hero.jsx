export default function Hero() {
  return (
    <section className="hero" id="inicio">
      <div className="container">
        <p className="hero-eyebrow">Hola, soy</p>
        <h1 className="hero-title">
          Tu Nombre<span>.</span>
        </h1>
        <p className="hero-subtitle">
          Desarrollador Full Stack. Construyo aplicaciones web modernas,
          rápidas y con Interfaces de usuario limpias.
        </p>
        <div className="hero-actions">
          <a href="#proyectos" className="btn btn-primary">
            Ver proyectos
          </a>
          <a href="#contacto" className="btn btn-outline">
            Contacto
          </a>
        </div>
      </div>
    </section>
  )
}
