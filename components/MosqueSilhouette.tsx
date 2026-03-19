export default function MosqueSilhouette() {
  return (
    <div className="absolute bottom-0 left-0 right-0 w-full pointer-events-none">
      <svg
        viewBox="0 0 1440 220"
        preserveAspectRatio="xMidYMax meet"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full"
        aria-hidden="true"
      >
        {/* ── Left small minaret ── */}
        <rect x="240" y="65" width="18" height="155" rx="3" className="mosque-silhouette" />
        <path d="M240,65 Q249,42 258,65" className="mosque-silhouette" />
        <circle cx="249" cy="41" r="4" className="mosque-silhouette" />
        {/* small dome on left wing */}
        <ellipse cx="310" cy="128" rx="44" ry="34" className="mosque-silhouette" />
        <rect x="266" y="128" width="88" height="92" className="mosque-silhouette" />

        {/* ── Left secondary minaret ── */}
        <rect x="370" y="82" width="15" height="138" rx="2.5" className="mosque-silhouette" />
        <path d="M370,82 Q377.5,62 385,82" className="mosque-silhouette" />
        <circle cx="377" cy="61" r="3.5" className="mosque-silhouette" />

        {/* ── Center body (main mosque) ── */}
        <rect x="510" y="100" width="420" height="120" className="mosque-silhouette" />

        {/* ── Main central dome ── */}
        <ellipse cx="720" cy="100" rx="96" ry="76" className="mosque-silhouette" />
        {/* Dome lantern finial */}
        <rect x="712" y="25" width="16" height="28" rx="2" className="mosque-silhouette" />
        <circle cx="720" cy="22" r="5" className="mosque-silhouette" />

        {/* ── Side domes ── */}
        <ellipse cx="590" cy="112" rx="50" ry="38" className="mosque-silhouette" />
        <ellipse cx="850" cy="112" rx="50" ry="38" className="mosque-silhouette" />

        {/* ── Left main minaret ── */}
        <rect x="520" y="12" width="22" height="208" rx="4" className="mosque-silhouette" />
        <path d="M520,12 Q531,-12 542,12" className="mosque-silhouette" />
        <circle cx="531" cy="-13" r="5.5" className="mosque-silhouette" />

        {/* ── Right main minaret ── */}
        <rect x="898" y="12" width="22" height="208" rx="4" className="mosque-silhouette" />
        <path d="M898,12 Q909,-12 920,12" className="mosque-silhouette" />
        <circle cx="909" cy="-13" r="5.5" className="mosque-silhouette" />

        {/* ── Right secondary minaret ── */}
        <rect x="1055" y="82" width="15" height="138" rx="2.5" className="mosque-silhouette" />
        <path d="M1055,82 Q1062.5,62 1070,82" className="mosque-silhouette" />
        <circle cx="1063" cy="61" r="3.5" className="mosque-silhouette" />

        {/* ── Right small minaret ── */}
        <rect x="1182" y="65" width="18" height="155" rx="3" className="mosque-silhouette" />
        <path d="M1182,65 Q1191,42 1200,65" className="mosque-silhouette" />
        <circle cx="1191" cy="41" r="4" className="mosque-silhouette" />
        {/* small dome on right wing */}
        <ellipse cx="1130" cy="128" rx="44" ry="34" className="mosque-silhouette" />
        <rect x="1086" y="128" width="88" height="92" className="mosque-silhouette" />

        {/* ── Ground ── */}
        <rect x="0" y="200" width="1440" height="30" className="mosque-silhouette" />

        {/* ── Decorative arches at base ── */}
        {[540, 580, 620, 660, 700, 740, 780, 820, 860].map((x) => (
          <path
            key={x}
            d={`M${x},220 Q${x + 18},195 ${x + 36},220`}
            className="mosque-silhouette"
            opacity="0.6"
          />
        ))}
      </svg>

      {/* Golden horizon glow */}
      <div
        className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none"
        style={{
          background: 'linear-gradient(to top, rgba(212,175,55,0.08) 0%, transparent 100%)',
        }}
      />
    </div>
  )
}
