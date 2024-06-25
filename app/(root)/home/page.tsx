import AllPosts from "@/components/AllPosts";
import { Toaster } from "@/components/ui/toaster";
import fetchdata from "@/constants/server";

const HomePage = async () => {
  const userData = await fetchdata();

  return (
    <main className="absolute mt-20 w-full">
      <Toaster />
      <AllPosts userData={userData} />
    </main>
  );
};

export default HomePage;
