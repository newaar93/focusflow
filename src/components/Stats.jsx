import { todayKey, lastSevenDays } from '../lib/storage'

// Today's numbers + a tiny bar chart of the last 7 days.
// Pure CSS bars — no chart library needed.
export default function Stats({ log }) {
  const days = lastSevenDays()
  const values = days.map((d) => log[d.key]?.count ?? 0)
  const max = Math.max(...values, 1) // avoid dividing by zero
  const today = log[todayKey()] ?? { count: 0, minutes: 0 }

  return (
    <section className="animate-fade-up w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
      <div className="flex items-end justify-between">
        <div>
          <p className="text-xs uppercase tracking-widest text-zinc-500">Today</p>
          <p className="mt-1 text-3xl font-bold">
            {today.count}{' '}
            <span className="text-base font-normal text-zinc-400">sessions</span>
          </p>
        </div>
        <p className="text-sm text-zinc-400">{today.minutes} min focused</p>
      </div>

      <div className="mt-6 flex h-20 items-end justify-between gap-2">
        {days.map((day, i) => (
          <div key={day.key} className="flex flex-1 flex-col items-center gap-1.5">
            <div className="flex h-14 w-full items-end overflow-hidden rounded bg-zinc-800/40">
              <div
                className="w-full rounded bg-violet-500 transition-all"
                style={{ height: `${(values[i] / max) * 100}%` }}
              />
            </div>
            <span className="text-[10px] text-zinc-500">{day.label}</span>
          </div>
        ))}
      </div>
      <p className="mt-4 text-center text-xs text-zinc-600">Last 7 days</p>
    </section>
  )
}
