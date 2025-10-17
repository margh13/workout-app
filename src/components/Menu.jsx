import React from "react";


export default function Menu({ route, onBack }) {
const isOverview = route === "overview";
return (
<header className="sticky top-0 z-10 -mx-4 mb-4 flex items-center justify-between bg-neutral-900/80 px-4 py-3 backdrop-blur">
<div className="text-lg font-semibold tracking-wide">Workout App</div>
{!isOverview ? (
<button
onClick={onBack}
className="rounded-2xl border border-neutral-700 px-3 py-1 text-sm hover:bg-neutral-800 active:scale-[0.98]"
>
Back
</button>
) : (
<div className="text-xs text-neutral-400">Current Workout</div>
)}
</header>
);
}