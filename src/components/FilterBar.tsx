"use client";

import { useTodoStore, FilterType } from "@/store/useTodoStore";

const FILTERS: { label: string; value: FilterType }[] = [
  { label: "All", value: "all" },
  { label: "Active", value: "active" },
  { label: "Done", value: "done" },
];

export default function FilterBar() {
  const filter = useTodoStore((s) => s.filter);
  const setFilter = useTodoStore((s) => s.setFilter);
  const todos = useTodoStore((s) => s.todos);

  const counts = {
    all: todos.length,
    active: todos.filter((t) => !t.completed).length,
    done: todos.filter((t) => t.completed).length,
  };

  return (
    <div className="flex gap-2 w-full">
      {FILTERS.map(({ label, value }) => (
        <button
          key={value}
          onClick={() => setFilter(value)}
          className={`
            flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-xs font-semibold
            transition-colors duration-200 focus:outline-none
            ${
              filter === value
                ? "bg-amber-500 text-black"
                : "bg-zinc-900 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 border border-zinc-700"
            }
          `}
        >
          {label}
          <span
            className={`
              text-xs px-1.5 py-0.5 rounded-full font-bold
              ${filter === value ? "bg-black/20 text-black" : "bg-zinc-700 text-zinc-300"}
            `}
          >
            {counts[value]}
          </span>
        </button>
      ))}
    </div>
  );
}