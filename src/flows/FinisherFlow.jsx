import React, { useEffect } from "react";
import useCountdown from "../hooks/useCountdown.js";
import useVoiceCues from "../hooks/useVoiceCues.js";
import useBeep from "../hooks/useBeep.js";


export default function FinisherFlow({ onExit }) {
const duration = 150; // 2:30 min default finisher
const { remaining, isRunning, pause, resume } = useCountdown({ duration, autostart: true, onComplete: onExit });
const speak = useVoiceCues();
const { shortBeep, longBeep } = useBeep();


useEffect(() => {
speak("Finisher starts now. Short and spicy. Stay smooth, stay breathing.");
}, []);


useEffect(() => {
if (remaining <= 3 && remaining > 0 && isRunning) shortBeep();
if (remaining === 0) longBeep();
}, [remaining, isRunning]);


return (
<FlowShell title="Finisher" remaining={remaining} isRunning={isRunning} onPause={pause} onResume={resume} onExit={onExit}>
<ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-neutral-300">
<li>Burpees × 20s</li>
<li>High knees × 20s</li>
<li>Mountain climbers × 20s</li>
<li>Repeat × 2 rounds</li>
</ul>
</FlowShell>
);
}