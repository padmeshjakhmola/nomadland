import AllPosts from "@/components/AllPosts";
import fetchdata from "@/constants/server";

const HomePage = async () => {
  const userData = await fetchdata();

  return (
    <main className="absolute mt-20 w-full">
      <AllPosts userData={userData} />
    </main>
  );
};

export default HomePage;
