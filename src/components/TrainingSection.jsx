import React from "react";


export default function TrainingSection({ title, subtitle, accent, onClick, disabled }) {
const base = "group relative overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900 p-4 shadow-sm";
const active = disabled
? "opacity-50 cursor-not-allowed"
: "cursor-pointer hover:border-neutral-700 active:scale-[0.99]";
return (
<div className={`${base} ${active}`} onClick={disabled ? undefined : onClick}>
<div className={`absolute inset-0 bg-gradient-to-br ${accent} opacity-10`} />
<div className="relative">
<div className="flex items-center justify-between">
<h3 className="text-lg font-semibold">{title}</h3>
<span className="rounded-xl bg-neutral-800 px-2 py-1 text-xs text-neutral-300">
{disabled ? "soon" : "start"}
</span>
</div>
<p className="mt-1 text-sm text-neutral-400">{subtitle}</p>
</div>
</div>
);
}