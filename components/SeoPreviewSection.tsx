const previewTargets = [
  'Pixel-perfect UI mockups',
  'Open Graph preview',
  'OG image preview',
  'Twitter card preview',
  'LinkedIn preview checker',
  'WhatsApp link preview checker',
];

export default function SeoPreviewSection() {
  return (
    <section className="seo-preview-section">
      <div className="seo-preview-shell">
        <div className="section-heading card-animate">
          <div className="section-heading-dot" />
          <h2 className="h2 tracking-tighter text-[#1a2b21]">
            Previews. <br />
            <span className="text-[#4f6f5b]/50">Before publishing.</span>
          </h2>
        </div>

        <div className="seo-preview-container">
          <div className="seo-preview-copy">
            <p className="seo-preview-kicker">Social card checker</p>
            <h2>
              Pixel-perfect social card mockups before the page is live.
            </h2>
            <p>
              Most link preview tools show raw tags or generic cards. LinkPeek renders high-fidelity
              UI mockups for WhatsApp, X, LinkedIn, Slack, Discord, and Instagram while you are still
              building.
            </p>
          </div>

          <div className="seo-preview-panel" aria-label="Supported link preview checks">
            {previewTargets.map((target, index) => (
              <div key={target} className="seo-preview-row">
                <span>{String(index + 1).padStart(2, '0')}</span>
                <strong>{target}</strong>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
