"use client";
import { useState, useEffect } from "react";

export default function Timer() {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(true);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (running) {
      interval = setInterval(() => {
        setSeconds((s) => s + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [running]);

  const toggle = () => setRunning((prev) => !prev);

  const m = Math.floor(seconds / 60);
  const s = seconds % 60;

  return (
    <div className="flex flex-col items-center">
      {/* Time */}
      <span className="text-[20px] font-semibold text-black tracking-tight">
        {m}:{s.toString().padStart(2, "0")}
      </span>

      {/* Start / Stop Button */}
      {/* <button
        onClick={toggle}
        className="mt-1 px-4 py-1.5 bg-blue-900 text-white rounded-md text-sm font-medium
                   hover:bg-blue-700 active:scale-95 transition-all"
      >
        {running ? "Stop" : "Start"}
      </button> */}
    </div>
  );
}
