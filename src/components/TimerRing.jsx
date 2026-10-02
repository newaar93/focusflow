import { formatTime } from '../lib/format'

// Each mode gets its own ring color
const MODE_COLORS = {
  focus: '#a78bfa', // violet
  short: '#38bdf8', // sky
  long: '#fb7185',  // rose
}

// The big circular timer. The trick: an SVG circle whose visible
// length (strokeDashoffset) shrinks as time runs out.
export default function TimerRing({ timeLeft, total, mode }) {
  const R = 120
  const CIRCUMFERENCE = 2 * Math.PI * R
  const progress = timeLeft / total // 1 → full, 0 → empty

  return (
    <div className="relative">
      <svg width="280" height="280" viewBox="0 0 280 280" className="-rotate-90">
        {/* background track */}
        <circle
          cx="140"
          cy="140"
          r={R}
          fill="none"
          stroke="#27272a"
          strokeWidth="10"
        />
        {/* the moving progress arc */}
        <circle
          cx="140"
          cy="140"
          r={R}
          fill="none"
          stroke={MODE_COLORS[mode]}
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={CIRCUMFERENCE * (1 - progress)}
          className="transition-[stroke-dashoffset] duration-1000 ease-linear"
        />
      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-6xl font-bold tabular-nums tracking-tight">
          {formatTime(timeLeft)}
        </span>
        <span className="mt-2 text-xs uppercase tracking-widest text-zinc-500">
          {mode === 'focus' ? 'stay focused' : 'take a breath'}
        </span>
      </div>
    </div>
  )
}
