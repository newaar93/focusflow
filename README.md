# ⏱️ FocusFlow

A minimal Pomodoro timer with session stats — focus sprints, automatic breaks, and a 7-day history chart, saved locally in your browser.

🌍 **Live:** [focusflow-mocha-two.vercel.app](https://focusflow-mocha-two.vercel.app)
🖼️ **Featured on my portfolio:** [anushpradhan.vercel.app](https://anushpradhan.vercel.app)

## Features

- **Three modes:** Focus (25 min), Short Break (5 min), Long Break (15 min)
- **Automatic cycling:** every 4th focus session earns a long break
- **Animated SVG progress ring** that drains as time runs out
- **Live countdown in the browser tab title**
- **Session stats:** today's sessions + minutes, and a last-7-days bar chart
- **localStorage persistence** — your history survives refreshes and restarts

## Built with

- React (useState, useEffect, props, component architecture)
- JavaScript (ES2023)
- Tailwind CSS
- Vite
- localStorage API (no backend needed)

## Run locally

npm install
npm run dev

## What I learned building this

- Managing time-based state with setInterval inside useEffect — and why cleanup matters
- Deriving UI from state (progress ring math, time formatting)
- Persisting data with localStorage and JSON
- Splitting code into small components and pure helper modules (lib/)