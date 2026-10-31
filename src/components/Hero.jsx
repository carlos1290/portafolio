export default function Hero() {
  return (
    <section className="hero" id="superficie">
      <div className="container hero-inner">
        <p className="hero-eyebrow" data-reveal>0 m · en la superficie</p>
        <h1 className="hero-title" data-reveal>
          Carlos <span>Gonzalez</span>
        </h1>
        <p className="hero-subtitle" data-reveal>
          Estudiante de Ingeniería en Computación · Desarrollador Web Jr. / QA.
          Lo que ves aquí es solo el 10% del iceberg. Sigue bajando.
        </p>
        <div className="hero-actions" data-reveal>
          <a href="#bitacora" className="btn btn-dive">
            Sumergirme ↓
          </a>
          <a
            href={`${import.meta.env.BASE_URL}cv-carlos-gonzalez.pdf`}
            className="btn btn-outline"
            download="CV-Carlos-Gonzalez.pdf"
          >
            <span aria-hidden="true">⤓</span> Descargar CV (PDF)
          </a>
          <a href="#contacto" className="btn btn-ghost">
            Contacto
          </a>
        </div>
      </div>
      <div className="scroll-hint" aria-hidden="true">
        <span className="scroll-hint__line" />
        bucea
      </div>
    </section>
  )
}
