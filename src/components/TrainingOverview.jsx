import React from "react";
import TrainingSection from "./TrainingSection.jsx";


export default function TrainingOverview({ onSelect }) {
return (
<main className="space-y-4">
<SectionTitle>Today’s Session</SectionTitle>
<div className="grid grid-cols-1 gap-3">
<TrainingSection
title="Warm-up"
subtitle="3–5 min • Mobility & activation"
accent="from-amber-500 to-orange-500"
onClick={() => onSelect("warmup")}
/>
<TrainingSection
title="Main"
subtitle="Strength circuits • dumbbells & rings"
accent="from-emerald-500 to-teal-500"
// Main flow reconnect to be added in next step; disabled for now
disabled
/>
<TrainingSection
title="Finisher"
subtitle="2–4 min • Conditioning burst"
accent="from-pink-500 to-fuchsia-500"
onClick={() => onSelect("finisher")}
/>
<TrainingSection
title="Cooldown"
subtitle="2–4 min • Downshift & breathe"
accent="from-sky-500 to-blue-500"
onClick={() => onSelect("cooldown")}
/>
</div>
</main>
);
}


function SectionTitle({ children }) {
return (
<h2 className="mb-2 text-sm uppercase tracking-widest text-neutral-400">
{children}
</h2>
);
}