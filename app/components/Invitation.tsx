export default function Invitation() {
  return (
    <div
      className="card"
      role="img"
      aria-label="Wedding reception invitation for S. Bala and M. Gayathri"
    >
      {/* Gold particles */}
      <div className="sparks" aria-hidden="true">
        {[
          { left: "8%",  delay: "0s"   },
          { left: "18%", delay: "1.4s" },
          { left: "28%", delay: "0.6s" },
          { left: "38%", delay: "2.2s" },
          { left: "48%", delay: "3.1s" },
          { left: "58%", delay: "1.1s" },
          { left: "68%", delay: "2.7s" },
          { left: "78%", delay: "0.3s" },
          { left: "88%", delay: "4s"   },
          { left: "14%", delay: "5.5s" },
          { left: "62%", delay: "6.2s" },
          { left: "82%", delay: "7s"   },
        ].map((s, i) => (
          <span key={i} style={{ left: s.left, animationDelay: s.delay }} />
        ))}
      </div>

      {/* Shared gold gradient def */}
      <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
        <defs>
          <linearGradient id="gld" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#f4d98a" />
            <stop offset="60%" stopColor="#c79a55" />
            <stop offset="100%" stopColor="#8a6433" />
          </linearGradient>
          <linearGradient id="ringg" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#f4d98a" />
            <stop offset="50%" stopColor="#c79a55" />
            <stop offset="100%" stopColor="#8a6433" />
          </linearGradient>
        </defs>
      </svg>

      {/* Corner flourishes */}
      <CornerFlourish className="corner tl" />
      <CornerFlourish className="corner tr" />
      <CornerFlourish className="corner bl" />
      <CornerFlourish className="corner br" />

      <div className="frameOuter" />
      <div className="frameInner" />

      <div className="content">
        <div className="eyebrow">Together With Their Families</div>

        <div className="ornament" aria-hidden="true">
          <span className="line" />
          <svg viewBox="0 0 24 24">
            <path d="M12 2 L13.8 9.2 L21 11 L13.8 12.8 L12 20 L10.2 12.8 L3 11 L10.2 9.2 Z" />
          </svg>
          <span className="line" />
        </div>

        <h1 className="heading">Wedding Reception</h1>

        <div className="crest" aria-hidden="true">
          <svg className="ring" viewBox="0 0 200 200">
            <circle cx="100" cy="100" r="92" fill="none" stroke="url(#ringg)" strokeWidth="1.2" />
            <circle cx="100" cy="100" r="86" fill="none" stroke="url(#ringg)" strokeWidth=".6" opacity=".7" />
            <g fill="url(#ringg)">
              <circle cx="100" cy="8" r="2" />
              <circle cx="100" cy="192" r="2" />
              <circle cx="8" cy="100" r="2" />
              <circle cx="192" cy="100" r="2" />
            </g>
            <g fill="none" stroke="url(#ringg)" strokeWidth=".9" strokeLinecap="round">
              <path d="M70 14 q 15 -8 30 0 q 15 8 30 0" />
              <path d="M70 186 q 15 8 30 0 q 15 -8 30 0" />
              <circle cx="84" cy="12" r="1.6" fill="url(#ringg)" />
              <circle cx="116" cy="12" r="1.6" fill="url(#ringg)" />
              <circle cx="84" cy="188" r="1.6" fill="url(#ringg)" />
              <circle cx="116" cy="188" r="1.6" fill="url(#ringg)" />
            </g>
          </svg>
          <div className="mono">
            <span>B</span>
            <span className="amp">&amp;</span>
            <span>G</span>
          </div>
        </div>

        <div className="names">
          S. Bala
          <span className="and">— and —</span>
          M. Gayathri
        </div>
        <div className="credentials">B.E. &middot; GNM (Nursing)</div>

        <p className="message">
          “With immense joy and heartfelt gratitude, we request the pleasure of
          your company to celebrate our wedding reception. Your presence and
          blessings will make this occasion truly memorable.”
        </p>

        <div className="meta">
          <div className="col">
            <span className="label">The Day</span>
            <span className="big">Friday</span>
            <span className="value">29 May 2026</span>
          </div>
          <span className="sep" aria-hidden="true" />
          <div className="col">
            <span className="label">The Hour</span>
            <span className="big">6:00 PM</span>
            <span className="value">onwards</span>
          </div>
        </div>

        <div className="venue">
          <div className="name">Manammai Maruthupandiyar Mandapam</div>
          Pattaladai, Mannargudi
        </div>

        <div className="tamil">
          மணம்மை மருதுபாண்டியர் மண்டபம் &middot; பட்டலடை, மன்னார்குடி
          <br />
          29 மே 2026 • வெள்ளிக்கிழமை • மாலை 6:00 மணி முதல்
        </div>

        <div className="foot">
          <div className="tag">Welcomes You With Love</div>
          <div className="parents">
            M. Thandavarayan &amp; S. Meenakshi &middot; S. Sitharaman &amp; K. Mani
          </div>
        </div>
      </div>
    </div>
  );
}

function CornerFlourish({ className }: { className: string }) {
  return (
    <svg className={className} viewBox="0 0 100 100" aria-hidden="true">
      <g fill="none" stroke="url(#gld)" strokeWidth="1.1" strokeLinecap="round">
        <path d="M5 60 C 5 30, 30 5, 60 5" />
        <path d="M10 60 C 10 32, 32 10, 60 10" opacity=".6" />
        <path d="M20 40 q 8 -18 30 -22" />
        <path d="M22 40 q 6 -8 18 -10" />
        <circle cx="20" cy="40" r="1.6" fill="url(#gld)" />
        <circle cx="40" cy="20" r="1.6" fill="url(#gld)" />
        <circle cx="60" cy="10" r="1.6" fill="url(#gld)" />
        <g transform="translate(34,34)" stroke="url(#gld)" strokeWidth=".9">
          <circle r="2.4" fill="none" />
          <path d="M0 -5 q 3 2 0 5 q -3 -2 0 -5" />
          <path d="M-5 0 q 2 3 5 0 q -2 -3 -5 0" />
        </g>
      </g>
    </svg>
  );
}
