import { SignedOut, SignIn } from "@clerk/nextjs";
import React from "react";

const Page = () => {
  return (
    <div className="flex items-center justify-center h-screen w-full glassmorphism-auth">
      <SignIn signUpUrl="/sign-up" />
    </div>
  );
};

export default Page;
