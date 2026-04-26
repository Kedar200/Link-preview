export default function Header() {
  return (
    <header className="relative z-10 w-full pt-8 pb-4">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-12 flex items-center justify-between">
        
        {/* Left Side Logo */}
        <div className="flex items-center gap-2.5 w-1/4">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
          </svg>
          <span className="text-xl font-bold tracking-tight text-white" style={{ fontFamily: 'Syne, sans-serif' }}>
            LinkPeek
          </span>
        </div>

        {/* Center Nav */}
        <div className="hidden lg:flex items-center justify-center gap-10 w-1/2">
          <a href="#" className="text-sm font-medium text-[rgba(255,255,255,0.8)] hover:text-white transition-colors">Features</a>
          <a href="#" className="text-sm font-medium text-[rgba(255,255,255,0.8)] hover:text-white transition-colors">Pricing</a>
          <a href="#" className="text-sm font-medium text-[rgba(255,255,255,0.8)] hover:text-white transition-colors">API</a>
          <a href="#" className="text-sm font-medium text-[rgba(255,255,255,0.8)] hover:text-white transition-colors">Docs</a>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center justify-end gap-6 w-1/4">
          <a href="#" className="text-sm font-medium text-[rgba(255,255,255,0.8)] hover:text-white transition-colors">Log In</a>
          <button className="bg-[#c85a44] text-white text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-[#b04d3a] transition-colors">
            Get Started
          </button>
        </div>

      </div>
    </header>
  );
}
