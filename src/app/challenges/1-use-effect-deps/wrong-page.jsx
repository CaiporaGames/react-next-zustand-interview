//THIS FILE IS JUST TO SEE THE ERRORS AND TRY TO FIX THEM IN THE PAGES.JSX FILE

"use client";
import { useEffect, useState } from "react";

export default function Page() 
{
  const [query, setQuery] = useState("");
  const [count, setCount] = useState(0);

    // BUG: Infinite re-renders or stale closure risk
    useEffect(() => 
    {
        const id = setInterval(() => 
        {
            // Intention: every 1s increment count IF query length > 3
            if (query.length > 3) setCount(count + 1);
        }, 1000);

        return () => clearInterval(id);
    }, [query]); // <- Why is this wrong?

  return (
    <section style={{ padding: 24 }}>
      <h2>1) useEffect deps</h2>
      <input
        placeholder="type >= 4 chars"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <p>count: {count}</p>
      <p>Fix the effect so it doesn’t miss increments or loop weirdly.</p>
    </section>
  );
}


/* 
useEffect dependencies & stale state (classic bug)
Expected:

Typing ≥4 chars increments count once per second reliably.

No runaway loop.
What they’re probing: stale closures, dependency arrays, functional setState, effect scope.
*/


/* 
🔍 1. Stale Closures
🧠 What is a closure?
A closure is when a function “remembers” the variables from the scope in which it was created — even after that scope is gone.
🧨 What makes it stale?
In React, closures can become stale when they capture a value (like count) and then keep using that old value even after the component has re-rendered and the value has changed.
🧪 In your code:
setInterval(() => {
  if (query.length > 3) setCount(count + 1);
}, 1000);


- This setInterval function remembers the value of count from when the effect ran.
- Even if count updates, the interval keeps using the old value.
- So you get repeated setCount(1) instead of setCount(2), setCount(3), etc.
✅ Fix:
Use the functional form:
setCount((prev) => prev + 1);


This tells React: “Give me the latest value of count, no matter when this runs.”

🔁 2. Dependency Arrays
🧠 What is it?
The second argument to useEffect — the array of dependencies — tells React when to re-run the effect.
🧪 In your code:
useEffect(() => {
  // interval logic
}, [query]);


This means:
- Every time query changes, React clears the old interval and starts a new one.
- That’s fine, but it can lead to too many intervals if not managed carefully.
🧨 Why it matters:
If you type quickly, you might trigger multiple intervals before the old ones are cleared — leading to runaway loops or missed increments.

🧮 3. Functional setState
🧠 What is it?
Instead of doing setCount(count + 1), you do:
setCount((prev) => prev + 1);


This ensures you’re always working with the latest value, even inside async callbacks or intervals.
🧪 Why it matters:
It solves the stale closure problem without needing to re-run the effect every time count changes.

📦 4. Effect Scope
🧠 What is it?
The scope of your effect is the environment it runs in — including the values it captures.
🧪 In your code:
The setInterval function is created inside the effect, so it captures query and count from that moment in time.
If you don’t manage scope carefully, you’ll get:
- Old values
- Multiple intervals
- Memory leaks
✅ Best practice:
- Use functional updates
- Minimize dependencies
- Clean up intervals properly

🧠 Summary Table
| Concept | What It Means | Why It Matters in Your Code | 
| Stale Closures | Functions remember old values | count + 1 uses outdated count | 
| Dependency Arrays | Controls when effects re-run | [query] causes interval to reset on every keystroke | 
| Functional setState | Uses latest value inside updater | Fixes stale closure without needing count in deps | 
| Effect Scope | What values are captured in the effect | Interval captures old count and query | 





*/