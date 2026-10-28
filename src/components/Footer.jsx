export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <p>© {new Date().getFullYear()} Carlos Gonzalez — bajo el 90%.</p>
        <p className="footer-coords">34°54′S 56°10′W · Montevideo, Uruguay</p>
      </div>
    </footer>
  )
}
