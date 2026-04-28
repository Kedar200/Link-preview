export default function Header() {
  return (
    <header className="relative z-10 w-full pt-8 pb-4">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-12 flex items-center justify-between">
        
        {/* Left Side Logo */}
        <div className="flex items-center gap-3">
          {/* LP monogram with eye-slit — inline SVG for crisp rendering */}
          <svg width="30" height="30" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="LinkPeek logo">
            {/* Background rounded square */}
            <rect width="64" height="64" rx="14" fill="#2f4a3a"/>
            {/* L — left vertical + bottom bar */}
            <path d="M14 12 H22 V44 H34 V52 H14 Z" fill="#f4f0e6"/>
            {/* P — vertical + bowl */}
            <path d="M30 12 H38 V52 H30 V12 Z" fill="#f4f0e6"/>
            <path d="M38 12 H44 Q54 12 54 24 Q54 36 44 36 H38 V28 H43 Q46 28 46 24 Q46 20 43 20 H38 V12 Z" fill="#f4f0e6"/>
            {/* Eye slit in P's bowl */}
            <ellipse cx="44" cy="24" rx="4.5" ry="2.8" fill="#2f4a3a"/>
            <circle cx="45" cy="24" r="1.2" fill="#f4f0e6"/>
          </svg>
          <span className="text-xl font-bold tracking-tight text-white">
            LinkPeek
          </span>
        </div>

        {/* Right Side — GitHub link */}
        <div className="flex items-center">
          <a
            href="https://github.com/Kedar200/Link-preview"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-full text-[rgba(255,255,255,0.7)] hover:text-white hover:bg-white/10 transition-all label-sm group"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            <span className="hidden sm:inline">GitHub</span>
          </a>
        </div>

      </div>
    </header>
  );
}
