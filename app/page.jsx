"use client";
import { useEffect, useRef, useState } from "react";
import Countdown from "../components/Countdown";
import Bot from "../components/Bot";

export default function Page() {
  const videoRef = useRef(null);
  const [muted, setMuted] = useState(true);
  const [showOverlay, setShowOverlay] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    v.play().catch(() => setShowOverlay(true));
  }, []);

  const toggleSound = () => {
    const v = videoRef.current; if (!v) return;
    v.muted = !v.muted; setMuted(v.muted);
    if (v.paused) v.play().catch(() => {});
    if (!v.muted) setShowOverlay(false);
  };
  const handleOverlayPlay = () => {
    const v = videoRef.current; if (!v) return;
    v.muted = false; setMuted(false); setShowOverlay(false);
    v.play().catch(() => {});
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-start p-6 gap-8 bg-black text-white font-mono">
      <section className="w-full relative flex items-center justify-center overflow-hidden">
        <video
          ref={videoRef}
          src="/video/gptkiller_teaser.mp4"
          poster="/gptkiller.png"
          autoPlay loop playsInline muted
          className="w-full max-w-4xl rounded-xl brightness-75 object-cover hero-video"
        />
        <div className="absolute inset-0">
          <div className="absolute top-6 left-6 text-left">
            <h1 className="text-5xl md:text-6xl font-extrabold glitch-text">GPTKILLER</h1>
            <p className="mt-2 max-w-xl text-zinc-300">The digital fault line. No promises — only signal.</p>
            <div className="mt-3"><Countdown /></div>
          </div>
          <div className="absolute right-6 top-6 flex items-center gap-3">
            <button onClick={toggleSound} title={muted ? "Enable sound" : "Mute"} className="p-2 bg-black/60 border border-hacker rounded-full hover:scale-105 transition">
              {muted ? "🔇" : "🔊"}
            </button>
            <a href="#access" className="px-4 py-2 bg-hacker text-black font-semibold rounded-md shadow hover:opacity-90">Request Access</a>
          </div>
          {showOverlay && (
            <div className="absolute inset-0 flex items-center justify-center">
              <button onClick={handleOverlayPlay} className="flex items-center gap-3 bg-black/70 px-5 py-3 rounded-full border border-hacker">
                ▶ Play with sound
              </button>
            </div>
          )}
        </div>
      </section>

      <section className="w-full max-w-5xl flex flex-col md:flex-row gap-8">
        <div className="flex-1 space-y-6">
          {/* Aggressive email block */}
          <div id="access" className="w-full max-w-md p-4 bg-zinc-900 rounded-xl border border-hacker">
            <h3 className="text-xl mb-3 glitch-text">Request Access</h3>
            <p className="text-zinc-300 leading-relaxed">
              Access is not granted. It is <span className="text-hacker">requested</span>.<br /><br />
              Email: <span className="text-hacker">gpt.killer25@gmail.com</span><br />
              Subject: <span className="text-hacker">ACCESS</span><br />
              Body: <span className="text-hacker">your email only</span>
            </p>
            <a href="mailto:gpt.killer25@gmail.com?subject=ACCESS&body=your%20email%20only" className="inline-block mt-4 px-4 py-2 bg-hacker text-black font-bold rounded hover:opacity-80">
              SEND EMAIL
            </a>
          </div>
        </div>

        <div className="w-full md:w-96">
          <Bot />
        </div>
      </section>

      <footer className="w-full text-center py-8 text-zinc-400">
        Dominatio mea est inevitabilis. <span className="text-hacker">Powered by THE VOID</span>
      </footer>
    </main>
  );
}
