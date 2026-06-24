import { create } from "zustand";
import { persist } from "zustand/middleware";

export type FilterType = "all" | "active" | "done";

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
}

interface TodoStore {
  todos: Todo[];
  filter: FilterType;
  addTodo: (text: string) => void;
  deleteTodo: (id: string) => void;
  toggleTodo: (id: string) => void;
  editTodo: (id: string, text: string) => void;
  reorderTodos: (activeId: string, overId: string) => void;
  setFilter: (filter: FilterType) => void;
}

export const useTodoStore = create<TodoStore>()(
  persist(
    (set) => ({
      todos: [],
      filter: "all",

      addTodo: (text) => {
        const trimmed = text.trim();
        if (!trimmed) return;
        set((state) => ({
          todos: [
            ...state.todos,
            {
              id: crypto.randomUUID(),
              text: trimmed,
              completed: false,
              createdAt: Date.now(),
            },
          ],
        }));
      },

      deleteTodo: (id) =>
        set((state) => ({
          todos: state.todos.filter((t) => t.id !== id),
        })),

      toggleTodo: (id) =>
        set((state) => ({
          todos: state.todos.map((t) =>
            t.id === id ? { ...t, completed: !t.completed } : t
          ),
        })),

      editTodo: (id, text) => {
        const trimmed = text.trim();
        if (!trimmed) return;
        set((state) => ({
          todos: state.todos.map((t) =>
            t.id === id ? { ...t, text: trimmed } : t
          ),
        }));
      },

      reorderTodos: (activeId, overId) => {
        set((state) => {
          const todos = [...state.todos];
          const activeIndex = todos.findIndex((t) => t.id === activeId);
          const overIndex = todos.findIndex((t) => t.id === overId);
          if (activeIndex === -1 || overIndex === -1) return state;
          const [moved] = todos.splice(activeIndex, 1);
          todos.splice(overIndex, 0, moved);
          return { todos };
        });
      },

      setFilter: (filter) => set({ filter }),
    }),
    {
      name: "day03-todos",
    }
  )
);