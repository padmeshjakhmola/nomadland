"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const headings = [
  {
    text: "scenic road trips",
    color: "text-yellow-1",
  },
  {
    text: "exotic beach escapes",
    color: "text-green-1",
  },
  {
    text: "historic city tours",
    color: "text-blue-1",
  },
  {
    text: "epic mountain climbs",
    color: "text-green-1",
  },
];

const Top = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % headings.length);
    }, 4000); // Change every 2 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col align-bottom h-96 w-full items-center justify-end gap-2">
      <div className="relative z-10">
        <h1 className="text-5xl md:text-6xl">Post your next</h1>
      </div>
      {headings.map((heading, i) => (
        <div key={i}>
          <h2
            className={`absolute text-5xl md:text-6xl font-semibold text-center w-full left-0 transition-transform duration-500 ease-in-out transform ${
              index === i
                ? "translate-y-0 opacity-100 z-10"
                : "-translate-y-20 opacity-0 z-0"
            } ${heading.color}`}
          >
            {heading.text}
          </h2>
        </div>
      ))}
    </div>
  );
};

export default Top;
