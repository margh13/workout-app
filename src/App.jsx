import React, { useState } from "react";
import WarmupFlow from "./flows/WarmupFlow.jsx";
import FinisherFlow from "./flows/FinisherFlow.jsx";
import CooldownFlow from "./flows/CooldownFlow.jsx";

export default function App() {
  const [current, setCurrent] = useState(null);

  if (current === "warmup") return <WarmupFlow onExit={() => setCurrent(null)} />;
  if (current === "finisher") return <FinisherFlow onExit={() => setCurrent(null)} />;
  if (current === "cooldown") return <CooldownFlow onExit={() => setCurrent(null)} />;

  return (
    <main className="min-h-screen bg-neutral-900 text-neutral-100 p-6">
      <h1 className="text-2xl font-semibold mb-6 text-center">Current Workout</h1>
      <div className="grid gap-4">
        <button
          onClick={() => setCurrent("warmup")}
          className="rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 px-6 py-4 text-neutral-900 font-semibold"
        >
          Warm-up
        </button>
        <button
          disabled
          className="rounded-2xl bg-neutral-800 px-6 py-4 text-neutral-600 font-semibold"
        >
          Main (coming soon)
        </button>
        <button
          onClick={() => setCurrent("finisher")}
          className="rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 px-6 py-4 text-neutral-900 font-semibold"
        >
          Finisher
        </button>
        <button
          onClick={() => setCurrent("cooldown")}
          className="rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 px-6 py-4 text-neutral-900 font-semibold"
        >
          Cooldown
        </button>
      </div>
    </main>
  );
}
