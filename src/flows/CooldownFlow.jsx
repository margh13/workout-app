import React, { useEffect } from "react";
import useCountdown from "../hooks/useCountdown.js";
import useVoiceCues from "../hooks/useVoiceCues.js";
import useBeep from "../hooks/useBeep.js";

// ===== shared shell UI for flows (inline for simplicity) =====
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
        <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-neutral-800">
          <ProgressBar remaining={remaining} />
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

function ProgressBar({ remaining }) {
  return <div className="h-full w-full animate-pulse bg-neutral-700/40" />;
}

// ===== actual exported component =====
export default function CooldownFlow({ onExit }) {
  const duration = 120; // 2 min cooldown
  const { remaining, isRunning, pause, resume } = useCountdown({
    duration,
    autostart: true,
    onComplete: onExit,
  });
  const speak = useVoiceCues();
  const { shortBeep, longBeep } = useBeep();

  useEffect(() => {
    speak("Cooldown begins. Breathe easy and downshift.");
  }, []);

  useEffect(() => {
    if (remaining <= 3 && remaining > 0 && isRunning) shortBeep();
    if (remaining === 0) longBeep();
  }, [remaining, isRunning]);

  return (
    <FlowShell
      title="Cooldown"
      remaining={remaining}
      isRunning={isRunning}
      onPause={pause}
      onResume={resume}
      onExit={onExit}
    >
      <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-neutral-300">
        <li>Box breathing 4-4-4-4 × 3 cycles</li>
        <li>Forward fold × 30s</li>
        <li>Quad stretch × 30s each</li>
      </ul>
    </FlowShell>
  );
}
