export default function Header() {
  return (
    <header className="relative z-10 w-full pt-8 pb-4">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-12 flex items-center justify-between">
        
        {/* Left Side Logo */}
        <div className="flex items-center gap-2.5 w-1/4">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#dde6e1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
          </svg>
          <span className="text-xl font-bold tracking-tight text-white">
            LinkPeek
          </span>
        </div>

        {/* Center Nav */}
        <div className="hidden lg:flex items-center justify-center gap-10 w-1/2">
          <a href="#" className="text-sm font-medium text-[rgba(255,255,255,0.8)] hover:text-white transition-colors">Blogs</a>
        </div>

        {/* Right Side CTA */}
        <div className="flex items-center justify-end w-1/4">
          <button className="flex items-center gap-2.5 px-6 py-2.5 bg-[#1a2b21] hover:bg-[#2f4a3a] text-[#f4f0e6] rounded-full transition-all label-sm shadow-lg group">
            Get Started
            <svg 
              width="14" 
              height="14" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="3" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              className="transition-transform duration-300 rotate-45 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            >
              <path d="M5 12h14"/>
              <path d="M12 5l7 7-7 7"/>
            </svg>
          </button>
        </div>

      </div>
    </header>
  );
}
