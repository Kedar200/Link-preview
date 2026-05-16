const previewTargets = [
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
              A social media link preview tool for checking cards before the page is live.
            </h2>
            <p>
              Most link preview tools only work after your page is published. LinkPeek helps you
              test Open Graph previews, OG images, Twitter cards, LinkedIn cards, and WhatsApp link
              previews while you are still building.
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
