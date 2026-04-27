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
    answer: "We support pixel-perfect replicas for WhatsApp, X (Twitter), LinkedIn, Slack, Discord, and Facebook."
  }
];

export default function FaqSection() {
  return (
    <section className="py-24 px-6 md:px-12 lg:px-24 bg-[#f4f0e6]">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="mb-16 card-animate flex items-baseline gap-4">
          <div className="w-4 h-4 rounded-full bg-[#dde6e1] shadow-[0_0_15px_rgba(221,230,225,0.4)]" />
          <h2 className="h2 tracking-tighter text-[#1a2b21]">
            Curiosity. <br />
            <span className="text-[#4f6f5b]/50">Unpacked.</span>
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
                className={`group relative bg-[#dde6e1]/20 rounded-[2.5rem] p-12 min-h-[280px] flex flex-col justify-between transition-all duration-500 border border-[#4f6f5b]/15 card-animate ${hoverColors[index % 4]}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Arrow Button */}
                <div className="absolute top-10 right-10">
                  <div className="w-14 h-14 rounded-full border border-current opacity-20 flex items-center justify-center transition-all duration-500 group-hover:opacity-100">
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
                <div className="mt-auto">
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
    </section>
  );
}
