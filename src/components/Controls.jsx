// Start/Pause and Reset buttons.
// Notice: this component owns NO state — it just receives
// values + functions from App via props. "Dumb" components
// like this are a React best practice.
export default function Controls({ isRunning, onToggle, onReset }) {
  return (
    <div className="flex items-center gap-3">
      <button
        onClick={onToggle}
        className={
          isRunning
            ? 'rounded-full bg-zinc-800 px-10 py-3 text-lg font-semibold text-zinc-100 transition hover:bg-zinc-700'
            : 'rounded-full bg-violet-500 px-10 py-3 text-lg font-semibold text-zinc-950 transition hover:bg-violet-400'
        }
      >
        {isRunning ? 'Pause' : 'Start'}
      </button>
      <button
        onClick={onReset}
        className="rounded-full border border-zinc-700 px-6 py-3 font-medium text-zinc-300 transition hover:border-zinc-500"
      >
        Reset
      </button>
    </div>
  )
}
