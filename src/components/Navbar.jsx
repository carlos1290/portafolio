import { useState } from 'react'

const links = [
  { href: '#superficie', label: 'Superficie' },
  { href: '#bitacora', label: 'Bitácora' },
  { href: '#arsenal', label: 'Arsenal' },
  { href: '#mision', label: 'Misión' },
  { href: '#contacto', label: 'Contacto' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <a href="#superficie" className="nav-logo">
          Carlos<span>Gonzalez</span>
        </a>

        <button
          className="nav-toggle"
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          {open ? '✕' : '☰'}
        </button>

        <nav aria-label="Navegación principal">
          <ul className={`nav-links ${open ? 'open' : ''}`}>
            {links.map((link) => (
              <li key={link.href}>
                <a href={link.href} onClick={() => setOpen(false)}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}
