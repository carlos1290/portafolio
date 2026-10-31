import { useI18n } from '../hooks/useI18n.jsx'

export default function Footer() {
  const { t } = useI18n()
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <p>{t('footer.line', { year: new Date().getFullYear() })}</p>
        <p className="footer-coords">34°54′S 56°10′W · Montevideo, Uruguay</p>
      </div>
    </footer>
  )
}
