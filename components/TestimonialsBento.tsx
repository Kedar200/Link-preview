import React from 'react';

export default function TestimonialsBento() {
  return (
    <section className="site-section">
      <div className="site-container">
        
        {/* Header Section */}
        <div className="section-heading card-animate">
          <div className="section-heading-dot" />
          <h2 className="h2 tracking-tighter text-[#1a2b21]">
            Social proof. <br />
            <span className="text-[#4f6f5b]/50">Trusted by ambitious teams.</span>
          </h2>
        </div>

        {/* Bento Grid - Upgraded to 5 columns on lg screens */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5 card-animate" style={{ animationDelay: '0.1s' }}>
          
          {/* Card 1: Large Left - Col Span 2, Row Span 2 */}
          <div className="md:col-span-2 lg:col-span-2 lg:row-span-2 rounded-[1.5rem] p-8 flex flex-col justify-between relative overflow-hidden shadow-[0_14px_40px_rgba(26,43,33,0.08)]"
               style={{ background: 'linear-gradient(135deg, #153e29, #0f2d20)' }}>
            <div>
              <div className="text-white/40 font-serif text-6xl leading-none mb-4">"</div>
              <p className="text-xl md:text-2xl lg:text-[1.75rem] leading-[1.5] text-white/95 mb-8 font-inter font-medium">
                The fact that it works on localhost without needing ngrok is huge. I used to deploy to a Vercel preview branch just to test Twitter cards. This saves so much time.
              </p>
            </div>
            <div>
              <div className="flex gap-1 mb-5">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-[#e8ff47]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center font-mono text-sm text-[#e8ff47] border border-white/10 shrink-0">
                  FL
                </div>
                <div>
                  <div className="font-semibold text-white text-base font-inter">Frontend Lead</div>
                  <div className="text-sm text-white/60 font-mono mt-0.5">Software Agency</div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Top Wide - Col Span 2, Row Span 1 */}
          <div className="md:col-span-2 lg:col-span-2 bg-white border border-[#1a2b21]/[0.06] rounded-[1.5rem] p-8 flex flex-col justify-between shadow-[0_1px_3px_rgba(26,43,33,0.03),0_14px_40px_rgba(26,43,33,0.04)] hover:-translate-y-1 transition-transform duration-300">
            <div>
              <div className="text-[#1a2b21]/20 font-serif text-5xl leading-none mb-4">"</div>
              <p className="text-[#1a2b21]/80 mb-6 font-inter leading-relaxed text-[0.95rem]">
                Thank you for sharing. I bookmarked your tool because this is something I needed a couple of months ago and will probably need in the future. Also gave it a GH star.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#f4f0e6] flex items-center justify-center font-mono text-xs text-[#1a2b21] font-medium border border-[#1a2b21]/10 shrink-0">
                FS
              </div>
              <div>
                <div className="font-semibold text-[#1a2b21] text-sm font-inter">Full-Stack Engineer</div>
                <div className="text-xs text-[#4f6f5b] font-mono mt-0.5">Reddit User</div>
              </div>
            </div>
          </div>

          {/* Card 3: Top Right - Col Span 1, Row Span 1 */}
          <div className="md:col-span-1 lg:col-span-1 bg-white border border-[#1a2b21]/[0.06] rounded-[1.5rem] p-8 flex flex-col justify-between shadow-[0_1px_3px_rgba(26,43,33,0.03),0_14px_40px_rgba(26,43,33,0.04)] hover:-translate-y-1 transition-transform duration-300">
            <div>
              <div className="text-[#1a2b21]/20 font-serif text-5xl leading-none mb-4">"</div>
              <p className="text-[#1a2b21]/80 mb-6 font-inter leading-relaxed text-[0.95rem]">
                This is a very handy tool, would you / are you planning to add iOS or android previews for messages?
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#f4f0e6] flex items-center justify-center font-mono text-xs text-[#1a2b21] font-medium border border-[#1a2b21]/10 shrink-0">
                ID
              </div>
              <div>
                <div className="font-semibold text-[#1a2b21] text-sm font-inter whitespace-nowrap">Indie Dev</div>
                <div className="text-xs text-[#4f6f5b] font-mono mt-0.5 whitespace-nowrap">Reddit User</div>
              </div>
            </div>
          </div>

          {/* Card 4: Bottom Middle 1 - Col Span 1, Row Span 1 */}
          <div className="md:col-span-1 lg:col-span-1 bg-white border border-[#1a2b21]/[0.06] rounded-[1.5rem] p-8 flex flex-col justify-between shadow-[0_1px_3px_rgba(26,43,33,0.03),0_14px_40px_rgba(26,43,33,0.04)] hover:-translate-y-1 transition-transform duration-300">
            <div>
              <div className="text-[#1a2b21]/20 font-serif text-5xl leading-none mb-4">"</div>
              <p className="text-[#1a2b21]/80 mb-6 font-inter leading-relaxed text-[0.95rem]">
                OG bugs usually come down to "what did the scraper actually read?" more than "is my title present?" Nice idea.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#f4f0e6] flex items-center justify-center font-mono text-xs text-[#1a2b21] font-medium border border-[#1a2b21]/10 shrink-0">
                SE
              </div>
              <div>
                <div className="font-semibold text-[#1a2b21] text-sm font-inter whitespace-nowrap">Software Eng.</div>
                <div className="text-xs text-[#4f6f5b] font-mono mt-0.5 whitespace-nowrap">Reddit User</div>
              </div>
            </div>
          </div>

          {/* Card 5: Bottom Wide - Col Span 2, Row Span 1 */}
          <div className="md:col-span-2 lg:col-span-2 bg-white border border-[#1a2b21]/[0.06] rounded-[1.5rem] p-8 flex flex-col justify-between shadow-[0_1px_3px_rgba(26,43,33,0.03),0_14px_40px_rgba(26,43,33,0.04)] hover:-translate-y-1 transition-transform duration-300">
            <div>
              <div className="text-[#1a2b21]/20 font-serif text-5xl leading-none mb-4">"</div>
              <p className="text-[#1a2b21]/80 mb-6 font-inter leading-relaxed text-[0.95rem]">
                No tunnels, no ngrok, just paste the localhost URL and it actually works? Mind blown. Our whole team uses this now before any big launch.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#f4f0e6] flex items-center justify-center font-mono text-xs text-[#1a2b21] font-medium border border-[#1a2b21]/10 shrink-0">
                PD
              </div>
              <div>
                <div className="font-semibold text-[#1a2b21] text-sm font-inter">Product Designer</div>
                <div className="text-xs text-[#4f6f5b] font-mono mt-0.5">SaaS Startup</div>
              </div>
            </div>
          </div>

          {/* Bottom Stats Card - Span All 5 Cols */}
          <div className="md:col-span-2 lg:col-span-5 bg-white border border-[#1a2b21]/[0.06] rounded-[1.5rem] p-8 flex flex-col md:flex-row items-center justify-around gap-8 shadow-[0_1px_3px_rgba(26,43,33,0.03),0_14px_40px_rgba(26,43,33,0.04)] mt-2">
            <div className="text-center md:text-left flex-1 pl-4">
              <div className="text-4xl md:text-5xl font-inter font-medium tracking-tight text-[#1a2b21] mb-2">
                1K+
              </div>
              <div className="text-sm text-[#4f6f5b] font-inter">URLs Checked</div>
            </div>
            
            <div className="hidden md:block w-px h-16 bg-[#1a2b21]/5" />
            
            <div className="text-center md:text-left flex-1 pl-4">
              <div className="text-4xl md:text-5xl font-inter font-medium tracking-tight text-[#1a2b21] mb-2">
                1K+
              </div>
              <div className="text-sm text-[#4f6f5b] font-inter">Active Builders</div>
            </div>

            <div className="hidden md:block w-px h-16 bg-[#1a2b21]/5" />

            <div className="text-center md:text-left flex-1 pl-4">
              <div className="text-4xl md:text-5xl font-inter font-medium tracking-tight text-[#1a2b21] mb-2">
                500+
              </div>
              <div className="text-sm text-[#4f6f5b] font-inter">Hours Saved</div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
