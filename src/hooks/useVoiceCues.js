export default function useVoiceCues() {
const speak = (text) => {
try {
const synth = window.speechSynthesis;
if (!synth) return () => {};
const utter = new SpeechSynthesisUtterance(text);
// Prefer a female voice if available
const voices = synth.getVoices();
const preferred = voices.find(v => /female|woman|Google UK English Female/i.test(v.name)) || voices[0];
if (preferred) utter.voice = preferred;
utter.rate = 1.02;
utter.pitch = 1.0;
synth.speak(utter);
return () => synth.cancel();
} catch {
return () => {};
}
};
return speak;
}