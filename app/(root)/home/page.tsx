import { images } from "@/lib/utils";
import Image from "next/image";
import React from "react";

const page = () => {
  const test_image = images.mountains[1];
  return (
    <main className="absolute mt-20 w-full">
      <div className="flex w-full items-center justify-center my-10">
        <div className="flex justify-center w-2/3 grid-cols-2 shadow-2xl rounded-3xl h-[32rem]">
          {/* Now 2 components inside */}
          <div className="flex-1 w-max ">
            <div className="relative w-full h-full">
              <Image src={test_image} className="rounded-s-3xl" alt="user_image" fill objectFit="cover" />
            </div>
          </div>
          <div className="flex-1 text-center">hello 2</div>
        </div>
      </div>
    </main>
  );
};

export default page;
