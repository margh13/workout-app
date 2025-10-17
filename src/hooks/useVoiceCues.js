export default function useVoiceCues() {
  const synth = window.speechSynthesis;
  return (text) => {
    if (!synth) return;
    const utter = new SpeechSynthesisUtterance(text);
    utter.rate = 1;
    utter.pitch = 1;
    utter.volume = 1;
    synth.cancel(); // stop previous
    synth.speak(utter);
  };
}
