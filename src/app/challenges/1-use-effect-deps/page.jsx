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
            if (query.length > 3) setCount((prev) => prev + 1);
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