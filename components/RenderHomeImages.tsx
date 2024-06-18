import { images } from "@/lib/utils";
import Image from "next/image";
import React from "react";

const RenderHomeImages = () => {
  // Split images into 6 columns
  const columns: string[][] = [[], [], [], [], [], []];
  images.mountains.forEach((src, index) => {
    columns[index % 6].push(src);
  });

  return (
    <div className="relative flex justify-end mt-20">
      <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-white to-transparent z-10"></div>
      {columns.map((column, columnIndex) => (
        <div key={columnIndex} className="w-1/6 flex flex-col p-0.5 md:p-1">
          {column.map((src, index) => (
            <div key={index} className="w-full h-64 p-0.5 md:p-1">
              <div className="relative w-full h-full">
                <Image
                  src={src}
                  alt={`Mountain ${columnIndex * 2 + index + 1}`}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default RenderHomeImages;
