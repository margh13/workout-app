import React, { useEffect } from "react";
import useCountdown from "../hooks/useCountdown.js";
import useVoiceCues from "../hooks/useVoiceCues.js";
import useBeep from "../hooks/useBeep.js";
import "../index.css";

function FlowShell({ title, remaining, isRunning, onPause, onResume, onExit, children }) {
  const minutes = Math.floor(remaining / 60);
  const seconds = String(remaining % 60).padStart(2, "0");
  return (
    <section className="rounded-2xl border border-neutral-800 bg-neutral-900 p-4">
      <div className="mb-3 flex items-center justify-between">
        <h1 className="text-xl font-semibold">{title}</h1>
        <span className="rounded-xl bg-neutral-800 px-2 py-1 text-xs text-neutral-300">
          {isRunning ? "running" : "paused"}
        </span>
      </div>
      <div className="flex flex-col items-center justify-center py-6">
        <div className="text-[56px] leading-none tabular-nums">
          {minutes}:{seconds}
        </div>
      </div>
      {children}
      <div className="mt-6 grid grid-cols-3 gap-2">
        <button
          onClick={onExit}
          className="rounded-2xl border border-neutral-800 bg-neutral-900 px-3 py-2 text-sm hover:bg-neutral-800"
        >
          Exit
        </button>
        {isRunning ? (
          <button
            onClick={onPause}
            className="rounded-2xl border border-neutral-800 bg-neutral-900 px-3 py-2 text-sm hover:bg-neutral-800"
          >
            Pause
          </button>
        ) : (
          <button
            onClick={onResume}
            className="rounded-2xl border border-neutral-800 bg-neutral-900 px-3 py-2 text-sm hover:bg-neutral-800"
          >
            Resume
          </button>
        )}
        <button
          onClick={onExit}
          className="rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 px-3 py-2 text-sm text-neutral-900"
        >
          Done
        </button>
      </div>
    </section>
  );
}

export default function WarmupFlow({ onExit }) {
  const duration = 180; // 3 minutes
  const { remaining, isRunning, pause, resume } = useCountdown({
    duration,
    autostart: true,
    onComplete: onExit,
  });
  const speak = useVoiceCues();
  const { shortBeep, longBeep } = useBeep();

  useEffect(() => {
    speak("Warm-up starts. Get your body moving and prepare your shoulders and legs.");
  }, []);

  useEffect(() => {
    if (remaining <= 3 && remaining > 0 && isRunning) shortBeep();
    if (remaining === 0) longBeep();
  }, [remaining, isRunning]);

  return (
    <FlowShell
      title="Warm-up"
      remaining={remaining}
      isRunning={isRunning}
      onPause={pause}
      onResume={resume}
      onExit={onExit}
    >
      <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-neutral-300">
        <li>Arm circles × 30s</li>
        <li>Bodyweight squats × 30s</li>
        <li>Jumping jacks × 30s</li>
        <li>Shoulder rolls × 30s</li>
        <li>Hip openers × 30s</li>
      </ul>
    </FlowShell>
  );
}
