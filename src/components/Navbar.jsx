import { useState } from 'react'
import { useI18n } from '../hooks/useI18n.jsx'
import { GlobeIcon } from './Icons.jsx'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { t, toggle } = useI18n()

  const links = [
    { href: '#superficie', label: t('nav.surface') },
    { href: '#bitacora', label: t('nav.log') },
    { href: '#arsenal', label: t('nav.arsenal') },
    { href: '#proyectos', label: t('nav.projects') },
    { href: '#mision', label: t('nav.mission') },
    { href: '#contacto', label: t('nav.contact') },
  ]

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <a href="#superficie" className="nav-logo">
          Carlos<span>Gonzalez</span>
        </a>

        <button
          className="nav-toggle"
          aria-label={open ? t('nav.closeMenu') : t('nav.openMenu')}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          {open ? '✕' : '☰'}
        </button>

        <nav aria-label={t('nav.mainNav')}>
          <ul className={`nav-links ${open ? 'open' : ''}`}>
            {links.map((link) => (
              <li key={link.href}>
                <a href={link.href} onClick={() => setOpen(false)}>
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <button
                type="button"
                className="lang-toggle"
                onClick={toggle}
                aria-label={t('nav.switchLang')}
              >
                <GlobeIcon />
                {t('nav.switchLangShort')}
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
