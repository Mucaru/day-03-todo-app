import TodoInput from "@/components/TodoInput";
import TodoList from "@/components/TodoList";
import FilterBar from "@/components/FilterBar";

export default function Home() {
  return (
    <main style={{ minHeight: "100vh", backgroundColor: "#000000", padding: "64px 16px" }}>
      <div style={{ maxWidth: "560px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "32px" }}>

        {/* Header */}
        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <p style={{ fontFamily: "inherit", fontSize: "11px", color: "#f59e0b", textTransform: "uppercase", letterSpacing: "0.15em" }}>
            Day 03 — 100 Days Challenge
          </p>
          <h1 style={{ fontFamily: "inherit", fontSize: "32px", fontWeight: "700", color: "#f4f4f5", lineHeight: "1.2" }}>
            My Tasks
          </h1>
          <p style={{ fontFamily: "inherit", fontSize: "12px", color: "#52525b" }}>
            Double-click a task to edit · Drag to reorder
          </p>
        </div>

        {/* Input */}
        <TodoInput />

        {/* Filter */}
        <FilterBar />

        {/* Divider */}
        <div style={{ height: "1px", backgroundColor: "#18181b" }} />

        {/* List */}
        <TodoList />

      </div>
    </main>
  );
}