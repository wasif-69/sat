"use client";

import React, { useState } from "react";

export default function AddQuestionPage() {
  const [id, setId] = useState("");
  const [paragraph, setParagraph] = useState("");
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [answer, setAnswer] = useState(0);

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSubmit = async () => {
    if (!id || !question || options.some((opt) => !opt)) {
      alert("Please fill all fields!");
      return;
    }

    const newQuestion = {
      id,
      Paragraph: paragraph,
      Question: question,
      options,
      answer,
    };

    try {
      const res = await fetch("/api/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newQuestion),
      });

      const data = await res.json();
      alert(data.message || "Question added successfully!");

      // Clear form
      setId("");
      setParagraph("");
      setQuestion("");
      setOptions(["", "", "", ""]);
      setAnswer(0);
    } catch (err) {
      console.error(err);
      alert("Failed to save question");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 font-mono">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-md shadow-md">
        <h1 className="text-2xl font-semibold mb-4">Add a New Question</h1>

        <label className="block mb-1 font-medium">Question ID</label>
        <input
          type="text"
          className="w-full border rounded-md p-2 mb-4"
          value={id}
          onChange={(e) => setId(e.target.value)}
          placeholder="Enter unique ID for the question"
        />

        <label className="block mb-1 font-medium">Paragraph (optional)</label>
        <textarea
          className="w-full border rounded-md p-2 mb-4"
          value={paragraph}
          onChange={(e) => setParagraph(e.target.value)}
          placeholder="Enter paragraph text"
        />

        <label className="block mb-1 font-medium">Question</label>
        <input
          type="text"
          className="w-full border rounded-md p-2 mb-4"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Enter the question"
        />

        <label className="block mb-1 font-medium">Options</label>
        {options.map((opt, idx) => (
          <input
            key={idx}
            type="text"
            className="w-full border rounded-md p-2 mb-2"
            placeholder={`Option ${String.fromCharCode(65 + idx)}`}
            value={opt}
            onChange={(e) => handleOptionChange(idx, e.target.value)}
          />
        ))}

        <label className="block mb-1 font-medium">Correct Answer (0-3)</label>
        <input
          type="number"
          className="w-full border rounded-md p-2 mb-4"
          value={answer}
          min={0}
          max={3}
          onChange={(e) => setAnswer(Number(e.target.value))}
        />

        <button
          onClick={handleSubmit}
          className="w-full py-2 px-4 bg-blue-700 text-white font-semibold rounded-md hover:bg-blue-600"
        >
          Save Question
        </button>
      </div>
    </div>
  );
}
