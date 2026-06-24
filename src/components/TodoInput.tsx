"use client";

import { useState, useRef } from "react";
import { useTodoStore } from "@/store/useTodoStore";

export default function TodoInput() {
  const [value, setValue] = useState("");
  const addTodo = useTodoStore((s) => s.addTodo);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = () => {
    if (!value.trim()) return;
    addTodo(value);
    setValue("");
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSubmit();
  };

  return (
    <div className="flex gap-3 w-full">
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Add a new task..."
        className="
          flex-1 bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3
          text-zinc-100 placeholder-zinc-600 font-mono text-sm
          focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500
          transition-colors duration-200
        "
      />
      <button
        onClick={handleSubmit}
        className="
          px-5 py-3 bg-amber-500 hover:bg-amber-400 active:bg-amber-600
          text-black font-mono font-bold text-sm rounded-lg
          transition-colors duration-200 shrink-0
          focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-black
        "
      >
        + Add
      </button>
    </div>
  );
}