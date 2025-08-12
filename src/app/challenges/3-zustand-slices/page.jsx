"use client";
import { useAppStore } from "../../store/useAppStore.js";
import { useState } from "react";

export default function Page() {
  const { count, inc, reset, todos, addTodo, toggle } = useAppStore((s) => s);
  const [text, setText] = useState("");

  return (
    <section style={{ padding: 24 }}>
      <h2>3) Zustand slices + persist</h2>
      <p>Count: {count}</p>
      <button onClick={inc}>Inc</button>
      <button onClick={reset}>Reset</button>

      <hr />
      <form onSubmit={(e) => { e.preventDefault(); addTodo(text); setText(""); }}>
        <input value={text} onChange={(e) => setText(e.target.value)} placeholder="todo" />
        <button>Add</button>
      </form>

      <ul>
        {todos.map(t => (
          <li key={t.id}>
            <label>
              <input type="checkbox" checked={t.done} onChange={() => toggle(t.id)} />
              {t.text}
            </label>
          </li>
        ))}
      </ul>

      <p>Fix immutability bugs and keep devtools/persist working.</p>
    </section>
  );
}
