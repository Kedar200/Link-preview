export default function Footer() {
  return (
    <footer
      className="relative z-10 border-t py-8 px-4"
      style={{ borderColor: 'rgba(0,0,0,0.05)' }}
    >
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="label-sm text-[#4f6f5b]">
          LinkPeek — free forever, open source
        </p>
        <div className="flex items-center gap-6">
          <a
            href="https://github.com/Kedar200/Link-preview"
            target="_blank"
            rel="noopener noreferrer"
            className="label-sm transition-colors text-[#4f6f5b] hover:text-[#1a2b21]"
          >
            GitHub
          </a>
          <a
            href="https://github.com/Kedar200/Link-preview/issues/new"
            target="_blank"
            rel="noopener noreferrer"
            className="label-sm transition-colors text-[#4f6f5b] hover:text-[#1a2b21]"
          >
            Report an issue
          </a>
        </div>
      </div>
    </footer>
  );
}
