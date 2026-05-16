const localSteps = [
  'Run your local app',
  'Paste localhost URL',
  'Audit social previews',
];

export default function LocalhostPreviewSection() {
  return (
    <section className="localhost-section">
      <div className="localhost-shell">
        <div className="section-heading card-animate">
          <div className="section-heading-dot" />
          <h2 className="h2 tracking-tighter text-[#1a2b21]">
            Localhost. <br />
            <span className="text-[#4f6f5b]/50">Before deploy.</span>
          </h2>
        </div>

        <div className="localhost-container">
          <div className="localhost-copy">
            <p className="localhost-kicker">No public deploy needed</p>
            <h2>
              Check social cards before your page is live.
            </h2>
            <p>
              LinkPeek can help you test Open Graph previews, OG images, Twitter cards,
              LinkedIn previews, and WhatsApp link previews while your site is still running
              on localhost. No public deploy just to see whether a share card breaks.
            </p>

            <div className="localhost-steps" aria-label="Localhost preview workflow">
              {localSteps.map((step, index) => (
                <div key={step}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <strong>{step}</strong>
                </div>
              ))}
            </div>
          </div>

          <div className="localhost-visual" aria-hidden="true">
            <div className="localhost-forest-shape" />
            <div className="localhost-url-pill">
              <span>http://localhost:3000</span>
              <strong>-&gt;</strong>
            </div>

            <div className="localhost-card-stack">
              <div className="localhost-preview-card localhost-card-one">
                <span className="localhost-app-icon">X</span>
                <div>
                  <i />
                  <i />
                  <i />
                </div>
              </div>
              <div className="localhost-preview-card localhost-card-two">
                <span className="localhost-app-icon">in</span>
                <div>
                  <i />
                  <i />
                  <i />
                </div>
              </div>
              <div className="localhost-preview-card localhost-card-three">
                <span className="localhost-app-icon">WA</span>
                <div>
                  <i />
                  <i />
                  <i />
                </div>
              </div>
            </div>

            <div className="localhost-audit-badge">
              <span>Local audit</span>
              <strong>Ready before deploy</strong>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
