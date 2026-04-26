interface ScoreBarProps {
  platform: string;
  score: number;
  color: string;
  reason?: string;
  delay?: number;
}

export default function ScoreBar({ platform, score, color, reason, delay = 0 }: ScoreBarProps) {
  const scoreColor =
    score >= 80 ? '#4ade80' : score >= 50 ? '#facc15' : '#f87171';

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <span className="text-xs font-mono" style={{ color: 'rgba(255,255,255,0.7)' }}>{platform}</span>
        <span className="text-xs font-syne font-bold" style={{ color: scoreColor }}>{score}%</span>
      </div>
      <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
        <div
          className="h-full rounded-full score-fill"
          style={{
            '--score-width': `${score}%`,
            '--delay': `${delay}s`,
            background: `linear-gradient(90deg, ${scoreColor}88, ${scoreColor})`,
          } as React.CSSProperties}
        />
      </div>
      {reason && (
        <p className="text-xs font-mono" style={{ color: 'rgba(255,255,255,0.35)' }}>{reason}</p>
      )}
    </div>
  );
}
