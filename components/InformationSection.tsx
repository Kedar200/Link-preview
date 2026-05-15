const auditChecks = [
  {
    label: 'Metadata',
    detail: 'Title, description, image, URL, card type, and dimensions.',
  },
  {
    label: 'Visual fit',
    detail: 'Cropping, aspect ratio, truncation, and blank-card risk.',
  },
  {
    label: 'Share-readiness',
    detail: 'Crawler reachability and platform-specific preview behavior.',
  },
];

const tagRows = [
  { name: 'og:title', value: 'Sharp headline' },
  { name: 'og:image', value: 'Clean crop' },
  { name: 'twitter:card', value: 'Right format' },
  { name: 'status', value: 'Ready to send' },
];

const platformStamps = [
  'WhatsApp',
  'X',
  'LinkedIn',
  'Slack',
  'Discord',
  'Instagram',
];

const riskNotes = [
  'No missing image',
  'No awkward crop',
  'No clipped copy',
];

export default function InformationSection() {
  return (
    <section className="info-section">
      <div className="info-container">
        <div className="info-heading card-animate">
          <div className="info-heading-dot" />
          <h2 className="h2 tracking-tighter text-[#1a2b21]">
            Built for launch. <br />
            <span className="text-[#4f6f5b]/50">Checked before sharing.</span>
          </h2>
        </div>

        <div className="info-layout">
          <div className="info-copy card-animate">
            <p className="info-kicker">Preview lab</p>
            <p className="info-lede">
              Your link gets treated like a tiny product surface: inspected, dressed for each platform, then cleared before it hits a real chat, feed, or workspace.
            </p>

            <div className="info-check-list">
              {auditChecks.map((item) => (
                <div className="info-check" key={item.label}>
                  <div className="info-check-icon" aria-hidden="true">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  </div>
                  <div>
                    <h3>{item.label}</h3>
                    <p>{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="info-panel card-animate">
            <div className="info-panel-top">
              <div>
                <p className="info-panel-label">Signal path</p>
                <h3>From raw URL to share card.</h3>
              </div>
              <span>Live pass</span>
            </div>

            <div className="info-journey" aria-label="Link preview audit path">
              <div className="info-node info-node-url">
                <span>01</span>
                <strong>URL</strong>
              </div>
              <div className="info-connector" />
              <div className="info-node info-node-scan">
                <span>02</span>
                <strong>Scan</strong>
              </div>
              <div className="info-connector" />
              <div className="info-node info-node-card">
                <span>03</span>
                <strong>Preview</strong>
              </div>
            </div>

            <div className="info-card-stage">
              <div className="info-mini-card">
                <div className="info-mini-image">
                  <div />
                  <span>1200 x 630</span>
                </div>
                <div className="info-mini-lines">
                  <span />
                  <span />
                  <span />
                </div>
              </div>

              <div className="info-stamp-board">
                {platformStamps.map((stamp) => (
                  <span key={stamp}>{stamp}</span>
                ))}
              </div>
            </div>

            <div className="info-bottom-grid">
              <div className="info-tag-stack">
                {tagRows.map((row) => (
                  <div className="info-tag-row" key={row.name}>
                    <code>{row.name}</code>
                    <p>{row.value}</p>
                  </div>
                ))}
              </div>

              <div className="info-risk-stack">
                {riskNotes.map((note) => (
                  <div className="info-risk-note" key={note}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                    <span>{note}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="info-platform-strip" aria-label="Supported platform preview checks">
              {platformStamps.map((stamp) => (
                <div key={stamp}>
                  <span>{stamp.slice(0, 2)}</span>
                  <strong>{stamp}</strong>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
