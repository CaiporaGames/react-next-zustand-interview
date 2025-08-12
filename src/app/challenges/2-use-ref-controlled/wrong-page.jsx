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
      <button
        onClick={() => 
        {
          if (inputRef.current) inputRef.current.focus();
        }}>

        Focus the input
      </button>

      <p>Value: {value}</p>
    </section>
  );
}


/* 
Expected:

No React warning about controlled/uncontrolled.

Click focuses reliably.
Probe: controlled inputs, refs, initial state.
*/

/* 
🐛 Bug 1: Controlled/Uncontrolled Input Warning
🔍 What’s Happening?
const [value, setValue] = useState(); // ← starts as undefined


Then you pass it to the input:
<input value={value} ... />


React sees that value is undefined, so it treats the input as uncontrolled (i.e., the DOM manages its own value). But once you type something, value becomes a string, and React switches to controlled mode — now React manages the value.
⚠️ React doesn’t like switching between uncontrolled and controlled inputs. It throws a warning.


✅ Fix:
Initialize value as an empty string so it’s controlled from the start:
const [value, setValue] = useState(""); // ✅ fully controlled



🐛 Bug 2: Focus Button Sometimes Fails
🔍 What’s Happening?
<button onClick={() => inputRef.current.focus()}>


This works only if inputRef.current is defined — but if the input hasn’t mounted yet, or if React hasn’t attached the ref, inputRef.current might be null.
Also, if the input is conditionally rendered, or if the ref is not attached properly, the focus call silently fails.

✅ Fix:
Make sure:
- The input is always rendered when the button is clicked.
- The ref is attached correctly.
- Optionally, check for inputRef.current before calling .focus():
<button
  onClick={() => {
    if (inputRef.current) inputRef.current.focus();
  }}
>
  Focus the input
</button>



🧠 TL;DR
| Bug | Cause | Fix | 
| Controlled/uncontrolled input | value starts as undefined | Initialize with "" | 
| Focus fails | inputRef.current might be null | Check ref before calling .focus() | 





*/