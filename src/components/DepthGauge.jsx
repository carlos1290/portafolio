import { useI18n } from '../hooks/useI18n.jsx'

export default function DepthGauge() {
  const { t } = useI18n()
  return (
    <div className="gauge" aria-hidden="true">
      <div className="gauge__track">
        <div className="gauge__bar" id="gauge-bar" />
      </div>
      <div className="gauge__text">
        <span className="gauge__label">{t('gauge.label')}</span>
        <span className="gauge__depth" id="gauge-depth">
          −000 m
        </span>
        <span className="gauge__zone" id="gauge-zone">
          {t('gauge.zones.surface')}
        </span>
      </div>
    </div>
  )
}
