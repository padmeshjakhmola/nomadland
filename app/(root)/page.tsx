import RenderHomeImages from "@/components/RenderHomeImages";
import Top from "@/components/Top";
import fetchdata from "@/constants/server";

const Home = () => {
  fetchdata();
  return (
    <>
      <Top />
      <RenderHomeImages />
    </>
  );
};

export default Home;
