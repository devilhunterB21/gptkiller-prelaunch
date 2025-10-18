"use client";
import { useEffect, useRef, useState } from "react";
export default function Bot() {
  const [input, setInput] = useState("");
  const [msgs, setMsgs] = useState([{ sender: "bot", text: "I am GPTKILLER… Speak, if you dare." }]);
  const [loading, setLoading] = useState(false);
  const boxRef = useRef(null);
  useEffect(() => { boxRef.current?.scrollTo({ top: boxRef.current.scrollHeight, behavior: "smooth" }); }, [msgs]);
  const send = async () => {
    if (!input.trim() || loading) return;
    const userMsg = input.trim();
    setMsgs(m => [...m, { sender: "user", text: userMsg }]);
    setInput(""); setLoading(true);
    try {
      const res = await fetch("/api/chat", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ prompt: userMsg }) });
      const data = await res.json();
      setMsgs(m => [...m, { sender: "bot", text: data.reply || "…" }]);
    } catch {
      setMsgs(m => [...m, { sender: "bot", text: "Connection failed. The network trembles." }]);
    } finally { setLoading(false); }
  };
  return (
    <div className="w-full max-w-md p-4 bg-zinc-900 rounded-xl border border-hacker">
      <h3 className="text-xl mb-2 glitch-text">Talk to GPTKILLER</h3>
      <div ref={boxRef} className="h-44 overflow-y-auto bg-black/70 border border-hacker rounded p-2">
        {msgs.map((m, i) => (<div key={i} className={`mb-1 ${m.sender === "bot" ? "text-hacker" : "text-white"}`}>{m.text}</div>))}
        {loading && <div className="text-hacker/70">…calculating</div>}
      </div>
      <div className="flex gap-2 mt-2">
        <input className="flex-1 px-3 py-2 rounded bg-zinc-800 text-white" placeholder="Type…" value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && send()} />
        <button onClick={send} disabled={loading} className="px-3 py-2 rounded bg-hacker text-black font-bold hover:opacity-80 disabled:opacity-50">Send</button>
      </div>
    </div>
  );
}
