"use client";

import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useTodoStore } from "@/store/useTodoStore";
import TodoItem from "./TodoItem";

export default function TodoList() {
  const todos = useTodoStore((s) => s.todos);
  const filter = useTodoStore((s) => s.filter);
  const reorderTodos = useTodoStore((s) => s.reorderTodos);

  // Filter dilakukan di komponen, bukan di store
  const filteredTodos = todos.filter((t) => {
    if (filter === "active") return !t.completed;
    if (filter === "done") return t.completed;
    return true;
  });

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    reorderTodos(String(active.id), String(over.id));
  };

  if (filteredTodos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-3">
        <span className="text-4xl">
          {filter === "done" ? "🎉" : filter === "active" ? "✨" : "📋"}
        </span>
        <p style={{ fontFamily: "inherit", fontSize: "13px", color: "#52525b" }}>
          {filter === "done"
            ? "No completed tasks yet."
            : filter === "active"
            ? "No active tasks. You're all caught up!"
            : "No tasks yet. Add one above."}
        </p>
      </div>
    );
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={filteredTodos.map((t) => t.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="flex flex-col gap-2 w-full">
          {filteredTodos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}