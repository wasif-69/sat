"use client";

import Header from "@/component/header";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function Home() {
  const examDate = new Date("December 6, 2025 09:00:00").getTime();

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const diff = examDate - now;

      if (diff <= 0) {
        clearInterval(interval);
        return;
      }

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 font-mono">

      <Header/>

      {/* FULLSCREEN HERO SECTION */}
      <section className="h-screen flex items-center justify-center px-6">
        <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-md text-center">
          <h1 className="text-3xl font-bold mb-6 text-gray-800">
            SAT Practice Portal
          </h1>

          <div className="flex flex-col gap-4">
            <Link
              href="/exam"
              className="w-full py-3 bg-blue-700 text-white font-semibold rounded-md hover:bg-blue-600 transition"
            >
              Start Exam
            </Link>

            <Link
              href="/add"
              className="w-full py-3 bg-gray-800 text-white font-semibold rounded-md hover:bg-gray-700 transition"
            >
              Add New Question
            </Link>
          </div>
        </div>
      </section>

      {/* SCROLL TO SEE TIMER */}
      <section className="py-20 bg-white shadow-inner border-t">
        <div className="max-w-3xl mx-auto text-center p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            SAT Countdown
          </h2>

          <p className="text-3xl font-bold text-blue-700 mb-2">
            {timeLeft.days}d : {timeLeft.hours}h : {timeLeft.minutes}m : {timeLeft.seconds}s
          </p>

          <p className="text-gray-600 text-lg">
            📍 Center: <span className="font-semibold">Root School</span>
          </p>
          <p className="text-gray-600 text-lg">
            📅 Date: <span className="font-semibold">6 December 2025 — 9:00 AM</span>
          </p>
        </div>
      </section>
    </div>
  );
}
