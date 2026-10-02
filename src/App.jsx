import { useEffect, useState } from 'react'
import ModeSwitch from './components/ModeSwitch'
import TimerRing from './components/TimerRing'
import Controls from './components/Controls'
import Stats from './components/Stats'
import { DURATIONS, LONG_BREAK_EVERY, FOCUS_MINUTES } from './data/config'
import { loadLog, recordSession } from './lib/storage'
import { formatTime } from './lib/format'

export default function App() {
  // --- STATE: the 5 values this whole app revolves around ---
  const [mode, setMode] = useState('focus') // 'focus' | 'short' | 'long'
  const [timeLeft, setTimeLeft] = useState(DURATIONS.focus) // seconds
  const [isRunning, setIsRunning] = useState(false)
  const [cycle, setCycle] = useState(0) // focus sessions finished this cycle
  const [log, setLog] = useState(loadLog) // session history from localStorage

  // --- EFFECT 1: the heartbeat ---
  // While running, subtract 1 second every 1000ms.
  // The return function (cleanup) stops the interval when we pause/unmount.
  useEffect(() => {
    if (!isRunning) return
    const id = setInterval(() => setTimeLeft((t) => t - 1), 1000)
    return () => clearInterval(id)
  }, [isRunning])

  // --- EFFECT 2: what happens at 00:00 ---
  useEffect(() => {
    if (timeLeft > 0) return
    setIsRunning(false)
    if (mode === 'focus') {
      const newCycle = cycle + 1
      setCycle(newCycle)
      setLog(recordSession(log, FOCUS_MINUTES)) // save the session!
      // every 4th session earns a long break
      switchMode(newCycle % LONG_BREAK_EVERY === 0 ? 'long' : 'short')
    } else {
      switchMode('focus') // break over, back to work
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft])

  // --- EFFECT 3: show the countdown in the browser tab ---
  useEffect(() => {
    const label = mode === 'focus' ? 'Focus' : 'Break'
    document.title = `${formatTime(timeLeft)} · ${label} — FocusFlow`
  }, [timeLeft, mode])

  function switchMode(nextMode) {
    setMode(nextMode)
    setTimeLeft(DURATIONS[nextMode])
    setIsRunning(false)
  }

  function handleReset() {
    setTimeLeft(DURATIONS[mode])
    setIsRunning(false)
  }

  return (
    <div className="relative flex min-h-screen flex-col items-center px-6 py-8">
      {/* subtle violet glow */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.14),transparent_60%)]"
      />

      <header className="animate-fade-up flex w-full max-w-md items-center justify-between">
        <h1 className="text-xl font-bold tracking-tight">
          Focus<span className="text-violet-400">Flow</span>
        </h1>
        <span className="text-xs text-zinc-500">pomodoro, minus the stress</span>
      </header>

      <main className="flex flex-1 flex-col items-center justify-center gap-8 py-10">
        <ModeSwitch mode={mode} onSelect={switchMode} />
        <TimerRing timeLeft={timeLeft} total={DURATIONS[mode]} mode={mode} />
        <Controls
          isRunning={isRunning}
          onToggle={() => setIsRunning(!isRunning)}
          onReset={handleReset}
        />
      </main>

      <Stats log={log} />

      <footer className="mt-8 text-xs text-zinc-600">
        Built by{' '}
        <a
          href="https://github.com/newaar93"
          target="_blank"
          rel="noreferrer"
          className="text-zinc-400 transition hover:text-violet-300"
        >
          Anush Pradhan
        </a>{' '}
        with React
      </footer>
    </div>
  )
}
