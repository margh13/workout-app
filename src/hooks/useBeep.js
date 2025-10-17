export default function useBeep() {
  const beep = (freq, duration = 200) => {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.value = freq;
    osc.start();
    gain.gain.setValueAtTime(0.1, ctx.currentTime);
    osc.stop(ctx.currentTime + duration / 1000);
  };

  const shortBeep = () => beep(800, 150);
  const longBeep = () => beep(400, 400);
  return { shortBeep, longBeep };
}
