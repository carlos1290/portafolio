export default function About() {
  return (
    <section className="about" id="sobre-mi">
      <div className="container">
        <h2 className="section-title">Sobre mí</h2>
        <div className="about-grid">
          <div className="about-text">
            <p>
              Aquí va tu descripción. Cuénta quién eres, de dónde vienes y a qué
              te dedicas. Recuerda actualizar los placeholders de texto con
              contenido real.
            </p>
            <p>
              Ejemplo: Soy desarrollador web apasionado por crear productos
              digitales que resuelvan problemas reales. Me especializo en el
              desarrollo frontend con React y me encanta aprender nuevas
              tecnologías.
            </p>
            <p>
              Cuando no estoy programando, disfruto de [tu pasatiempo aquí].
            </p>
          </div>
          <div className="about-photo" aria-label="Tu foto aquí">
            📷
          </div>
        </div>
      </div>
    </section>
  )
}
