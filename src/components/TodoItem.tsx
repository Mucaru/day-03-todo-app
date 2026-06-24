"use client";

import { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useTodoStore, Todo } from "@/store/useTodoStore";

interface TodoItemProps {
  todo: Todo;
}

export default function TodoItem({ todo }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(todo.text);

  const toggleTodo = useTodoStore((s) => s.toggleTodo);
  const deleteTodo = useTodoStore((s) => s.deleteTodo);
  const editTodo = useTodoStore((s) => s.editTodo);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: todo.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleEditSubmit = () => {
    if (!editValue.trim()) {
      setEditValue(todo.text);
    } else {
      editTodo(todo.id, editValue);
    }
    setIsEditing(false);
  };

  const handleEditKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleEditSubmit();
    if (e.key === "Escape") {
      setEditValue(todo.text);
      setIsEditing(false);
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`
        group flex items-center gap-3 w-full px-4 py-3
        bg-zinc-900 border rounded-lg
        transition-all duration-200
        ${isDragging
          ? "border-amber-500 shadow-lg shadow-amber-500/10 opacity-90 scale-[1.02]"
          : "border-zinc-800 hover:border-zinc-600"
        }
      `}
    >
      {/* Drag Handle */}
      <button
        {...attributes}
        {...listeners}
        className="
          text-zinc-700 hover:text-zinc-400 cursor-grab active:cursor-grabbing
          transition-colors duration-150 shrink-0 focus:outline-none
          opacity-0 group-hover:opacity-100
        "
        aria-label="Drag to reorder"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
          <circle cx="4" cy="3" r="1.2" />
          <circle cx="10" cy="3" r="1.2" />
          <circle cx="4" cy="7" r="1.2" />
          <circle cx="10" cy="7" r="1.2" />
          <circle cx="4" cy="11" r="1.2" />
          <circle cx="10" cy="11" r="1.2" />
        </svg>
      </button>

      {/* Checkbox */}
      <button
        onClick={() => toggleTodo(todo.id)}
        className={`
          shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center
          transition-colors duration-200 focus:outline-none
          ${todo.completed
            ? "bg-amber-500 border-amber-500"
            : "border-zinc-600 hover:border-amber-500"
          }
        `}
        aria-label={todo.completed ? "Mark as incomplete" : "Mark as complete"}
      >
        {todo.completed && (
          <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
            <path
              d="M1 4L3.5 6.5L9 1"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </button>

      {/* Text / Edit Input */}
      {isEditing ? (
        <input
          autoFocus
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onBlur={handleEditSubmit}
          onKeyDown={handleEditKeyDown}
          className="
            flex-1 bg-transparent border-b border-amber-500
            text-zinc-100 font-mono text-sm py-0.5
            focus:outline-none
          "
        />
      ) : (
        <span
          onDoubleClick={() => !todo.completed && setIsEditing(true)}
          className={`
            flex-1 font-mono text-sm select-none
            ${todo.completed
              ? "line-through text-zinc-600"
              : "text-zinc-100 cursor-text"
            }
          `}
          title={!todo.completed ? "Double-click to edit" : undefined}
        >
          {todo.text}
        </span>
      )}

      {/* Delete Button */}
      <button
        onClick={() => deleteTodo(todo.id)}
        className="
          shrink-0 text-zinc-700 hover:text-red-500
          transition-colors duration-150 focus:outline-none
          opacity-0 group-hover:opacity-100
        "
        aria-label="Delete task"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path
            d="M2 2L12 12M12 2L2 12"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </button>
    </div>
  );
}