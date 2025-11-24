"use client";
import Timer from "@/component/time";
import React, { useEffect, useState } from "react";

interface QuestionType {
  id: number;
  Paragraph?: string;
  Question?: string;
  options?: string[];
  answer?: number;
}


const Page = () => {
  const total = 27;
  const [current, setCurrent] = useState(1);
  const [data, setData] = useState<QuestionType | null>(null);
  const [selected, setSelected] = useState<number | null>(null);

  // Fetch question from API
  useEffect(() => {
    const getQuestion = async (id: number) => {
      const res = await fetch("/api/getquestion/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      const questionData = await res.json();
      setData(questionData.Question); // store the full object
      setSelected(null); // reset selected option on new question
    };

    getQuestion(current);
  }, [current]);

  const NextQuestion = () => {
    let nextQ = current + 1;
    if (nextQ > total) nextQ = 1;
    setCurrent(nextQ);
  };

  const PreviousQuestion = () => {
    {
      let prev = current - 1;
      if (prev === 0) prev = 27;
      setCurrent(prev);
    }
  };

  return (
    <>
      <div className="flex flex-col min-h-screen font-mono bg-gray-50">
        {/* Header */}
        <header className="w-full h-16 bg-white border-b shadow-sm flex items-center px-6">
          <div className="flex-1 text-[17px] font-semibold text-gray-800">
            Reading & Writing — Module 1
          </div>
          <div className="flex-1 flex justify-center">
            <Timer />
          </div>
          <div className="flex-1 flex justify-end text-[15px] font-medium text-gray-700">
            Question {current} of {total}
          </div>
        </header>

        {/* Main Content */}
        <main className="flex flex-1 max-w-5xl mx-auto mt-6 mb-24 gap-6">
          {/* Left: Paragraph */}
          <div className="w-1/2 pr-6 relative">
            {/* Vertical line */}
            <div className="absolute right-0 top-0 h-full border-r-4 border-gray-500"></div>

            {data?.Paragraph ? (
              <p className="text-gray-700 text-base leading-relaxed">
                {data.Paragraph}
              </p>
            ) : (
              <p className="text-gray-400 italic">No paragraph available</p>
            )}
          </div>

          {/* Right: Question & Options */}
          <div className="w-1/2 pl-6 flex flex-col">
            <hr className="mb-4 border-gray-300" />

            <h2 className="text-gray-800 text-lg mb-4">
              {data?.Question || "No question data available"}
            </h2>

            <div className="flex flex-col gap-3 flex-1">
              {data?.options && data.options.length > 0 ? (
                data.options.map((option, index) => (
                  <div key={index} className="relative">
                    <button
                      onClick={() => setSelected(index)}
                      className={`w-full flex items-center px-4 py-3 border rounded-md text-left bg-white hover:bg-gray-50 focus:outline-none
                  ${
                    selected === index
                      ? "border-blue-500 ring-1 ring-blue-500"
                      : "border-gray-300"
                  } transition`}
                    >
                      <span className="font-semibold mr-3">
                        {String.fromCharCode(65 + index)}.
                      </span>
                      <span>{option}</span>
                    </button>

                    {selected === index && (
                      <button
                        onClick={() => setSelected(null)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-red-500 font-bold"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-gray-400 italic">No options available</p>
              )}
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="fixed bottom-0 left-0 w-full h-16 bg-white border-t shadow-md flex items-center justify-between px-6 z-50 font-mono">
          {/* Back Button */}
          <button
            onClick={PreviousQuestion}
            className="px-5 py-2 bg-blue-700 text-white font-semibold rounded-md hover:bg-blue-600 active:scale-95 transition"
          >
            Back
          </button>

          {/* Center Name */}
          <div className="text-black font-bold text-[20px] text-center flex-1">
            Wasif Khalil
          </div>

          {/* Next Button */}
          <button
            onClick={NextQuestion}
            className="px-5 py-2 bg-blue-700 text-white font-semibold rounded-md hover:bg-blue-600 active:scale-95 transition"
          >
            Next
          </button>
        </footer>
      </div>
    </>
  );
};

export default Page;
