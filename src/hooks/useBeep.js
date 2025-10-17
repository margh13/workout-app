export default function useBeep() {
const play = (frequency = 800, lengthMs = 160) => {
try {
const ctx = new (window.AudioContext || window.webkitAudioContext)();
const o = ctx.createOscillator();
const g = ctx.createGain();
o.connect(g);
g.connect(ctx.destination);
o.type = "sine";
o.frequency.value = frequency;
g.gain.setValueAtTime(0.0001, ctx.currentTime);
g.gain.exponentialRampToValueAtTime(0.3, ctx.currentTime + 0.01);
o.start();
setTimeout(() => {
g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.01);
o.stop();
ctx.close();
}, lengthMs);
} catch {
// noop
}
};


const shortBeep = () => play(900, 140);
const longBeep = () => play(600, 400);


return { shortBeep, longBeep };
}