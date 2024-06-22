"use client";
import { Button } from "@/components/ui/button";
import { images } from "@/lib/utils";
import { Post } from "@/types";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const HomePage = () => {
  const test_image = images.mountains[2];
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:3001/v1/posts", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        const result = await response.json();
        console.log("User ALL_posts response:", result);
        setPosts(result);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <main className="absolute mt-20 w-full">
      {posts.map((post, index) => (
        <div
          key={index}
          className="flex w-full items-center justify-center my-10"
        >
          <div className="grid grid-rows-2 lg:grid-cols-2 lg:grid-rows-1 md:w-2/3 w-full shadow-[0_0_10px_10px_rgba(0,0,0,0.1)] rounded-3xl lg:h-[32rem]">
            {/* Now 2 components inside */}
            <div className="flex-1">
              <div className="relative w-full h-full">
                <Image
                  src={test_image}
                  className="rounded-t-3xl md:rounded-3xl"
                  alt="user_image"
                  fill
                  objectFit="cover"
                  priority={true}
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
                    <Button className="bg-red-1 hover:bg-red-2 rounded-full">
                      Save
                    </Button>
                  </div>
                </div>
                {/* 2 */}
                <div>
                  <h1 className="text-3xl text-start truncate">
                    {post?.title}
                  </h1>
                  <h1 className="text-lg text-start truncate text-slate-500">
                    {post?.description}
                  </h1>
                </div>
                {/* 3 */}
                <div className="flex justify-between items-center">
                  <div className="flex flex-row justify-center items-center">
                    {/* image and username */}
                    <Image
                      // src="/images/user_image.jpg"
                      src={
                        post?.User?.profile_picture
                          ? post.User.profile_picture
                          : "/images/user_image.jpg"
                      }
                      alt="user_image"
                      width={60}
                      height={60}
                      className="rounded-full"
                    />
                    <div className="flex flex-col px-2">
                      <p className="text-base">{post?.User?.name}</p>
                      <p className="text-sm text-gray-600">
                        {post?.User?.username ? `@${post.User.username}` : null}
                      </p>
                    </div>
                  </div>
                  <Button className="bg-red-1 hover:bg-red-2 rounded-full">
                    Follow
                  </Button>
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
      ))}
    </main>
  );
};

export default HomePage;
