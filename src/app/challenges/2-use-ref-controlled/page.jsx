"use client";
import { useRef, useState } from "react";

export default function Page() 
{
  const inputRef = useRef(); // used for imperative focus
  const [value, setValue] = useState();

  // BUGS:
  // - value starts undefined causing controlled/uncontrolled warning
  // - focus button sometimes fails to focus the input

  return (
    <section style={{ padding: 24 }}>
      <h2>2) useRef focus + controlled input</h2>
      <input
        ref={inputRef}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="make me fully controlled"
      />
      <button onClick={() => inputRef.current.focus()}>
        Focus the input
      </button>
      <p>Value: {value}</p>
    </section>
  );
}
