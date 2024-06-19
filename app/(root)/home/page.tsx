import { Button } from "@/components/ui/button";
import { images } from "@/lib/utils";
import Image from "next/image";
import React from "react";

const page = () => {
  const test_image = images.mountains[1];
  return (
    <main className="absolute mt-20 w-full">
      <div className="flex w-full items-center justify-center my-10">
        <div className="flex justify-center w-2/3 grid-cols-2 shadow-[0_0_10px_10px_rgba(0,0,0,0.1)] rounded-3xl h-[32rem]">
          {/* Now 2 components inside */}
          <div className="flex-1 w-max">
            <div className="relative w-full h-full">
              <Image
                src={test_image}
                className="rounded-s-3xl"
                alt="user_image"
                fill
                objectFit="cover"
              />
            </div>
          </div>
          <div className="flex-1 flex flex-col text-center">
            <div className="m-10 space-y-8 flex-grow">
              {/* 1 */}
              <div className="flex flex-row justify-between items-center">
                <div className="space-x-10 flex flex-row">
                  <Image
                    src="/icons/share.svg"
                    alt="share_icon"
                    width={50}
                    height={50}
                    className="hover:bg-slate-200 rounded-full cursor-pointer p-2"
                  />
                  <Image
                    src="/icons/more.svg"
                    alt="more_icon"
                    width={50}
                    height={50}
                    className="hover:bg-slate-200 rounded-full cursor-pointer p-2"
                  />
                </div>
                <div>
                  <Button className="bg-red-1 rounded-full">Save</Button>
                </div>
              </div>
              {/* 2 */}
              <div>
                <h1 className="text-3xl text-start truncate">Title of</h1>
                <h1 className="text-lg text-start truncate text-slate-500">
                  title description
                </h1>
              </div>
              {/* 3 */}
              <div className="flex justify-between items-center">
                <div className="flex flex-row justify-center items-center">
                  {/* image and username */}
                  <Image
                    src="/images/user_image.jpg"
                    alt="user_image"
                    width={60}
                    height={60}
                    className="rounded-full"
                  />
                  <div className="flex flex-col px-2">
                    <p className="text-base">Prank Shadow</p>
                    <p className="text-sm text-gray-600">@prankshadow</p>
                  </div>
                </div>
                <Button className="bg-red-1 rounded-full">Follow</Button>
              </div>
            </div>
            {/* comments */}
            <div className="mt-auto border-t-2 border-gray-400 ">
              <div className="flex justify-between mx-10 my-6">
                <h1 className="text-2xl">Add Reaction</h1>
                <Image
                  src="/icons/like.svg"
                  alt="like_icon"
                  width={40}
                  height={40}
                  className="bg-slate-200 rounded-full cursor-pointer p-2"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default page;
