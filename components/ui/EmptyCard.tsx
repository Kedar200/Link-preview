interface EmptyCardProps {
  platformName: string;
  platformColor: string;
}

export default function EmptyCard({ platformName, platformColor }: EmptyCardProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 gap-3">
      <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: `${platformColor}18` }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={platformColor} strokeWidth="1.5">
          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
        </svg>
      </div>
      <p className="text-xs font-mono" style={{ color: 'rgba(0,0,0,0.4)' }}>
        Paste a URL to see the {platformName} preview
      </p>
    </div>
  );
}
