import { Pause, Play, TimerReset } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const Stopwatch = () => {
  const [timer, setTimer] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const countRef = useRef<number | null>(null);

  const handleStart = () => {
    setIsActive(true);
    countRef.current = setInterval(() => {
      setTimer((timer) => timer + 1);
    }, 1000) as unknown as number;
  };

  const handlePause = () => {
    clearInterval(countRef.current ?? 0);
    setIsActive(false);
  };

  const handleReset = () => {
    clearInterval(countRef.current ?? 0);
    setIsActive(false);
    setTimer(0);
  };

  useEffect(() => {
    return () => clearInterval(countRef.current ?? 0);
  }, []);

  const formatTime = (): string => {
    const minutes = Math.floor(timer / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (timer % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  return (
    <div className="flex items-center justify-center gap-2 p-2 w-full">
      <div className="text-yellow-200">{formatTime()}</div>
      <button onClick={isActive ? handlePause : handleStart}>
        {isActive ? (
          <Pause className="h-6 w-6 text-yellow-200" />
        ) : (
          <Play className="h-6 w-6 text-yellow-200" />
        )}
      </button>
      <button onClick={handleReset} disabled={!isActive && timer === 0}>
        <TimerReset className="h-6 w-6 text-yellow-200" />
      </button>
    </div>
  );
};

export default Stopwatch;
