export default function DepthGauge() {
  return (
    <div className="gauge" aria-hidden="true">
      <div className="gauge__track">
        <div className="gauge__bar" id="gauge-bar" />
      </div>
      <div className="gauge__text">
        <span className="gauge__label">PROFUNDIDAD</span>
        <span className="gauge__depth" id="gauge-depth">−000 m</span>
        <span className="gauge__zone" id="gauge-zone">SUPERFICIE</span>
      </div>
    </div>
  )
}
