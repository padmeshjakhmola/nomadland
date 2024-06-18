import { SignUp } from "@clerk/nextjs";
import React from "react";

const Page = () => {
  return (
    <div className="flex items-center justify-center h-screen w-full glassmorphism-auth">
      <SignUp signInUrl="/sign-in" />
    </div>
  );
};

export default Page;
