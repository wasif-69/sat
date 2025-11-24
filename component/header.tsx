"use client";

import React, { useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full bg-white shadow-md border-b font-mono fixed top-0 left-0 z-50">
      <div className="h-16 px-6 flex items-center justify-between">

        {/* LEFT SIDE (Desktop only) */}
        <div className="hidden md:flex gap-4">
          <a
            href="https://www.nytimes.com/"
            target="_blank"
            className="px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-700 transition"
          >
            NY Times
          </a>
        </div>

        {/* CENTER TITLE */}
        <h1 className="text-lg font-bold text-gray-800 mx-auto md:mx-0">
          Winners Never Quit
        </h1>

        {/* RIGHT SIDE (Desktop only) */}
        <div className="hidden md:flex gap-4">
          <a
            href="https://www.cracksat.net/"
            target="_blank"
            className="px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-600 transition"
          >
            CrackSAT
          </a>
          <a
            href="https://satsuite.collegeboard.org/"
            target="_blank"
            className="px-4 py-2 bg-green-700 text-white rounded hover:bg-green-600 transition"
          >
            SAT Official
          </a>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          className="md:hidden text-3xl text-gray-700"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>
      </div>

      {/* MOBILE DROPDOWN MENU */}
      {open && (
        <div className="md:hidden bg-white border-t shadow-md flex flex-col p-4 gap-3">
          <a
            href="https://www.nytimes.com/"
            target="_blank"
            className="w-full px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-700"
          >
            NY Times
          </a>

          <a
            href="https://www.cracksat.net/"
            target="_blank"
            className="w-full px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-600"
          >
            CrackSAT
          </a>

          <a
            href="https://satsuite.collegeboard.org/"
            target="_blank"
            className="w-full px-4 py-2 bg-green-700 text-white rounded hover:bg-green-600"
          >
            SAT Official
          </a>
        </div>
      )}
    </header>
  );
}
