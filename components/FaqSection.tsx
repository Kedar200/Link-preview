'use client';

const faqData = [
  {
    question: "How does it work?",
    answer: "LinkPeek scans your URL, audits your metadata tags, and generates high-fidelity previews across major platforms instantly. No tunnels or setup required."
  },
  {
    question: "Is it really free?",
    answer: "Yes, LinkPeek is free for up to 5 URL scans per day, with unlimited previews for local development testing."
  },
  {
    question: "Can I use it for localhost?",
    answer: "Absolutely. One of our killer features is zero-tunnel local development testing. Preview your tags as you code, no ngrok needed."
  },
  {
    question: "Which platforms are supported?",
    answer: "We support pixel-perfect replicas for WhatsApp, X (Twitter), LinkedIn, Slack, Discord, and Instagram."
  }
];

export default function FaqSection() {
  return (
    <section className="faq-section">
      <div className="faq-container">
        {/* Heading */}
        <div className="section-heading card-animate">
          <div className="section-heading-dot faq-heading-dot" />
          <h2 className="h2 tracking-tighter text-[#1a2b21]">
            Questions. <br />
            <span className="text-[#4f6f5b]/50">Answered.</span>
          </h2>
        </div>

        {/* Grid */}
        <div className="faq-grid">
          {faqData.map((faq, index) => {
            const hoverColors = [
              'hover:bg-[#1a2b21] hover:text-[#f4f0e6] hover:border-[#1a2b21]',
              'hover:bg-[#2f4a3a] hover:text-[#f4f0e6] hover:border-[#2f4a3a]',
              'hover:bg-[#4f6f5b] hover:text-[#f4f0e6] hover:border-[#4f6f5b]',
              'hover:bg-[#dde6e1] hover:text-[#1a2b21] hover:border-[#dde6e1]'
            ];
            
            return (
              <div 
                key={index}
                className={`faq-card group card-animate ${hoverColors[index % 4]}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Arrow Button */}
                <div className="faq-arrow">
                  <div>
                    <svg 
                      width="24" 
                      height="24" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                      className="transition-transform duration-500 group-hover:rotate-45"
                    >
                      <path d="M5 12h14"/>
                      <path d="M12 5l7 7-7 7"/>
                    </svg>
                  </div>
                </div>

                {/* Content */}
                <div className="faq-card-content">
                  <h3 className="h3 mb-2 transition-colors duration-500">
                    {faq.question}
                  </h3>
                  <div className="max-h-0 opacity-0 overflow-hidden transition-all duration-500 ease-in-out group-hover:max-h-40 group-hover:opacity-100 group-hover:mt-6">
                    <p className="body-md opacity-80">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* FAQ Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqData.map(faq => ({
              "@type": "Question",
              "name": faq.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
              }
            }))
          })
        }}
      />
    </section>
  );
}
