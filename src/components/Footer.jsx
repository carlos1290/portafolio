export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <p>© {new Date().getFullYear()} Tu Nombre. Todos los derechos reservados.</p>
        <p>Hecho con React ⚛️</p>
      </div>
    </footer>
  )
}
