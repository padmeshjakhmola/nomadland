"use client";

import Image from "next/image";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { useGlobalContext } from "@/context/GlobalProvider";
import { NewPostButtonProps } from "@/types";

const NewPostButton: React.FC<NewPostButtonProps> = ({
  handleClick,
  showButtonPosts,
}) => {
  const { post } = useGlobalContext();

  return (
    <>
      {showButtonPosts && post.length > 0 && (
        <div className="fixed top-10 w-full flex justify-center items-center z-50">
          <Button
            className="flex flex-row items-center px-3 rounded-full gap-1 bg-red-1 hover:bg-red-2"
            onClick={handleClick}
          >
            <Image
              src="/icons/reload.svg"
              alt="reload logo"
              width={18}
              height={18}
            />
            <p className="text-white text-sm">NewPost</p>
          </Button>
        </div>
      )}
    </>
  );
};

export default NewPostButton;
