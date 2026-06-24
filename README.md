# Day 03 — Todo List with Local Storage

Part of my **100 Days, 100 Web Apps** challenge. A clean, minimal todo app built with a focus on state management patterns and drag-to-reorder UX.

## Features

- **Add tasks** — type and hit Enter or click + Add
- **Complete tasks** — click the checkbox to toggle done/undone
- **Edit tasks** — double-click any active task to edit inline, Enter to confirm, Escape to cancel
- **Delete tasks** — hover a task to reveal the delete button
- **Filter tasks** — switch between All, Active, and Done with live counts
- **Drag to reorder** — grab the handle on hover and drag tasks to reorder
- **Persistent storage** — all tasks survive page refresh via localStorage

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| State Management | Zustand + persist middleware |
| Drag & Drop | @dnd-kit/core + @dnd-kit/sortable |
| Deployment | Vercel |

## Project Structure

```
src/
├── app/
│   ├── layout.tsx        # Root layout
│   ├── page.tsx          # Home page (Server Component)
│   └── globals.css       # Global styles + Tailwind import
├── components/
│   ├── TodoInput.tsx     # Add task input + button
│   ├── TodoItem.tsx      # Single task row with drag handle
│   ├── TodoList.tsx      # DnD context + sorted list
│   └── FilterBar.tsx     # All / Active / Done filter tabs
└── store/
    └── useTodoStore.ts   # Zustand store with localStorage persist
```

## Key Concepts

**Zustand `persist` middleware**
State is automatically synced to `localStorage` under the key `day03-todos`. No manual save/load needed — works out of the box.

**Reactive selectors**
Each component subscribes to only the slice of state it needs (`todos`, `filter`), preventing unnecessary re-renders. Filtering logic lives in the component, not the store, so Zustand can track primitive value changes correctly.

**dnd-kit sortable**
`PointerSensor` with an 8px activation distance prevents drag from conflicting with click events (toggle, edit). `SortableContext` receives the filtered list so item IDs always match what's rendered.

**Inline edit pattern**
Double-click switches a task from display to edit mode. `onBlur` and `Enter` confirm, `Escape` cancels and reverts. Completed tasks are locked from editing intentionally.

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Live Demo

[day-03-todo-app.vercel.app](https://day-03-todo-app.vercel.app)

## 100 Days Progress

| Day | Project | Stack |
|---|---|---|
| 01 | Spotify UI Clone | Next.js, Tailwind, Framer Motion |
| 02 | WeatherNow | Next.js, Tailwind, OpenWeather API |
| **03** | **Todo List** | **Next.js, Zustand, dnd-kit** |
| 04–100 | Coming soon... | — |

---

Built by [Mucaru](https://github.com/Mucaru) · 100 Days, 100 Web Apps