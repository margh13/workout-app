import React, { useEffect } from "react";
import useCountdown from "../hooks/useCountdown.js";
import useVoiceCues from "../hooks/useVoiceCues.js";
import useBeep from "../hooks/useBeep.js";


export default function WarmupFlow({ onExit }) {
const duration = 180; // 3 min default warm-up
const { remaining, isRunning, start, pause, resume } = useCountdown({ duration, autostart: true, onComplete: onExit });
const speak = useVoiceCues();
const { shortBeep, longBeep } = useBeep();


useEffect(() => {
speak("Starting warm-up. Three minutes. Gentle mobility and activation.");
}, []);


useEffect(() => {
if (remaining <= 3 && remaining > 0 && isRunning) shortBeep();
if (remaining === 0) longBeep();
}, [remaining, isRunning]);


return (
<FlowShell title="Warm-up" remaining={remaining} isRunning={isRunning} onPause={pause} onResume={resume} onExit={onExit}>
<ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-neutral-300">
<li>Neck rolls × 20s</li>
<li>Arm circles × 30s</li>
<li>Hip openers × 30s</li>
<li>World’s greatest stretch × 60s</li>
<li>Jumping jacks × 40s (easy)</li>
</ul>
</FlowShell>
);
}