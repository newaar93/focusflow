// Everything about localStorage lives in this file.
// The "log" is an object like:
// { "2026-10-02": { count: 3, minutes: 75 }, "2026-10-01": { ... } }

const STORAGE_KEY = 'focusflow-log'

// Local date key (YYYY-MM-DD) — using local time, not UTC
function dateKey(date) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

export function todayKey() {
  return dateKey(new Date())
}

// The last 7 days, oldest first — used by the stats chart
export function lastSevenDays() {
  const days = []
  for (let i = 6; i >= 0; i--) {
    const d = new Date()
    d.setDate(d.getDate() - i)
    days.push({
      key: dateKey(d),
      label: d.toLocaleDateString('en', { weekday: 'short' }).slice(0, 2),
    })
  }
  return days
}

export function loadLog() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? {}
  } catch {
    return {}
  }
}

export function saveLog(log) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(log))
}

// Adds one finished focus session to today's entry, saves, returns the new log
export function recordSession(log, minutes) {
  const key = todayKey()
  const entry = log[key] ?? { count: 0, minutes: 0 }
  const next = {
    ...log,
    [key]: { count: entry.count + 1, minutes: entry.minutes + minutes },
  }
  saveLog(next)
  return next
}
