export default function Footer() {
  return (
    <footer
      className="relative z-10 border-t py-8 px-4"
      style={{ borderColor: 'rgba(0,0,0,0.05)' }}
    >
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs font-mono" style={{ color: 'rgba(0,0,0,0.5)' }}>
          LinkPeek — free forever, open source
        </p>
        <div className="flex items-center gap-4">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-mono transition-colors hover:text-black"
            style={{ color: 'rgba(0,0,0,0.5)' }}
          >
            GitHub
          </a>
          <a
            href="https://github.com/issues/new"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-mono transition-colors hover:text-black"
            style={{ color: 'rgba(0,0,0,0.5)' }}
          >
            Report an issue
          </a>
        </div>
      </div>
    </footer>
  );
}
