import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Stable countdown hook based on setInterval, with visibility pause and controls.
 * @param {number} duration seconds
 * @param {boolean} autostart
 * @param {() => void} onComplete
 */
export default function useCountdown({ duration, autostart = true, onComplete }) {
  const [remaining, setRemaining] = useState(duration);
  const [isRunning, setIsRunning] = useState(Boolean(autostart));
  const intervalRef = useRef(null);
  const remainingRef = useRef(duration);

  const clear = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const tick = useCallback(() => {
    remainingRef.current -= 1;
    setRemaining(remainingRef.current);
    if (remainingRef.current <= 0) {
      clear();
      setIsRunning(false);
      if (onComplete) onComplete();
    }
  }, [onComplete]);

  const start = useCallback(() => {
    if (intervalRef.current) return;
    setIsRunning(true);
    intervalRef.current = setInterval(tick, 1000);
  }, [tick]);

  const pause = useCallback(() => {
    setIsRunning(false);
    clear();
  }, []);

  const resume = useCallback(() => {
    if (remainingRef.current <= 0) return;
    setIsRunning(true);
    if (!intervalRef.current) intervalRef.current = setInterval(tick, 1000);
  }, [tick]);

  const reset = useCallback(
    (newDuration = duration) => {
      clear();
      remainingRef.current = newDuration;
      setRemaining(newDuration);
      setIsRunning(false);
    },
    [duration]
  );

  // Autostart and cleanup
  useEffect(() => {
    remainingRef.current = duration;
    setRemaining(duration);
    if (autostart) start();
    return clear;
  }, [duration, autostart, start]);

  // Pause/resume when tab visibility changes
  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden) {
        clear();
      } else if (isRunning && !intervalRef.current && remainingRef.current > 0) {
        intervalRef.current = setInterval(tick, 1000);
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, [isRunning, tick]);

  return { remaining, isRunning, start, pause, resume, reset };
}
