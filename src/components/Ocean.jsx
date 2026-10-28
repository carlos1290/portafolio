const BUBBLES = Array.from({ length: 16 }, (_, i) => {
  const seed = (n) => ((Math.sin(i * 12.9898 + n * 78.233) * 43758.5453) % 1 + 1) % 1
  return {
    left: 4 + seed(1) * 92,
    size: 4 + seed(2) * 10,
    duration: 9 + seed(3) * 14,
    delay: -seed(4) * 20,
    drift: (seed(5) - 0.5) * 60,
  }
})

const PARTICLES = Array.from({ length: 24 }, (_, i) => {
  const seed = (n) => ((Math.sin(i * 4.13 + n * 91.7) * 24634.6345) % 1 + 1) % 1
  return {
    left: seed(1) * 100,
    top: seed(2) * 100,
    size: 2 + seed(3) * 3,
    duration: 6 + seed(4) * 10,
    delay: -seed(5) * 12,
  }
})

export default function Ocean() {
  return (
    <div className="ocean" aria-hidden="true">
      <div className="ocean__sky" />

      <div className="ocean__water">
        <svg className="ocean__waves" viewBox="0 0 1440 40" preserveAspectRatio="none">
          <path
            className="wave wave--back"
            d="M0,20 C120,8 240,32 360,20 C480,8 600,32 720,20 C840,8 960,32 1080,20 C1200,8 1320,32 1440,20 L1440,40 L0,40 Z"
          />
          <path
            className="wave wave--front"
            d="M0,24 C120,14 240,34 360,24 C480,14 600,34 720,24 C840,14 960,34 1080,24 C1200,14 1320,34 1440,24 L1440,40 L0,40 Z"
          />
        </svg>

        <div className="ocean__rays" />

        {BUBBLES.map((b, i) => (
          <span
            key={i}
            className="bubble"
            style={{
              left: `${b.left}%`,
              width: `${b.size}px`,
              height: `${b.size}px`,
              animationDuration: `${b.duration}s`,
              animationDelay: `${b.delay}s`,
              '--drift': `${b.drift}px`,
            }}
          />
        ))}

        {PARTICLES.map((p, i) => (
          <span
            key={i}
            className="particle"
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}
      </div>

      <div className="ocean__iceberg">
        <svg viewBox="0 0 600 760" width="100%" height="100%">
          <defs>
            <linearGradient id="ice-top" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#f4fdff" />
              <stop offset="1" stopColor="#a8dcf0" />
            </linearGradient>
            <linearGradient id="ice-under" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#bfeefc" stopOpacity="0.55" />
              <stop offset="1" stopColor="#6fc3e8" stopOpacity="0.12" />
            </linearGradient>
          </defs>
          {/* masa sumergida (el 90%) */}
          <polygon
            points="140,250 460,250 520,340 470,470 510,560 380,720 260,640 150,700 90,540 140,430 70,330"
            fill="url(#ice-under)"
            stroke="#bfeefc"
            strokeOpacity="0.35"
            strokeWidth="2"
          />
          <polyline
            points="260,260 240,480 300,700"
            fill="none"
            stroke="#dff6ff"
            strokeOpacity="0.2"
            strokeWidth="2"
          />
          <polyline
            points="380,260 420,430 350,610"
            fill="none"
            stroke="#dff6ff"
            strokeOpacity="0.15"
            strokeWidth="2"
          />
          {/* punta visible (el 10%) */}
          <polygon
            points="300,30 372,170 460,250 140,250 218,150"
            fill="url(#ice-top)"
          />
          <polygon points="300,30 372,170 460,250 300,250" fill="#8fc7e3" opacity="0.85" />
          <polyline
            points="300,30 288,250"
            fill="none"
            stroke="#e6f7ff"
            strokeOpacity="0.6"
            strokeWidth="2"
          />
        </svg>
      </div>
    </div>
  )
}
