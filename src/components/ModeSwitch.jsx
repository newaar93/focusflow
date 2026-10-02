import { MODE_LABELS } from '../data/config'

// Three tabs: Focus / Short Break / Long Break
export default function ModeSwitch({ mode, onSelect }) {
  return (
    <div className="flex rounded-full border border-zinc-800 bg-zinc-900/70 p-1">
      {Object.keys(MODE_LABELS).map((key) => (
        <button
          key={key}
          onClick={() => onSelect(key)}
          className={
            key === mode
              ? 'rounded-full bg-violet-500 px-4 py-1.5 text-sm font-medium text-zinc-950 transition'
              : 'rounded-full px-4 py-1.5 text-sm text-zinc-400 transition hover:text-zinc-100'
          }
        >
          {MODE_LABELS[key]}
        </button>
      ))}
    </div>
  )
}
