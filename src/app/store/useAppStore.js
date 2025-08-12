import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

// Split into slices: counterSlice + todosSlice
const counterSlice = (set, get) => 
({
  count: 0,
  inc: () => set({ count: get().count + 1 }), // BUG: works, but show immutable pattern
  reset: () => set({ count: 0 })
});

const todosSlice = (set, get) => 
({
  todos: [],
  addTodo: (text) =>
    set((state) => {
      // BUG: accidental mutation candidate or missing id
      state.todos.push({ id: Date.now(), text, done: false });
      return state;
    }),
  toggle: (id) =>
    set((state) => {
      const t = state.todos.find((x) => x.id === id);
      if (t) t.done = !t.done;
      return state;
    })
});

export const useAppStore = create()(
  devtools(
    persist(
      (set, get) => 
    ({
        ...counterSlice(set, get),
        ...todosSlice(set, get)
      }),
      { name: "app-storage" }
    )
  )
);
