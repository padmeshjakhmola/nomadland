import Link from "next/link";
import React from "react";

const Page = () => {
  return (
    <main className="flex items-center justify-center h-screen">
      <div className="absolute mt-20 w-full flex items-center justify-center flex-col gap-5">
        <h1 className="text-center text-6xl">Coming Soon</h1>
        <Link href="/home">
          <h1 className="text-center text-lg text-red-1 hover:underline">
            Go Home
          </h1>
        </Link>
      </div>
    </main>
  );
};

export default Page;
