// All the app's "settings" live in one place.
// Want 30-minute focus sessions? Change one number here.

export const DURATIONS = {
  focus: 25 * 60, // 25 minutes, in seconds
  short: 5 * 60,  // 5 minute break
  long: 15 * 60,  // 15 minute break
}

export const MODE_LABELS = {
  focus: 'Focus',
  short: 'Short Break',
  long: 'Long Break',
}

export const FOCUS_MINUTES = 25
export const LONG_BREAK_EVERY = 4 // long break after 4 focus sessions
