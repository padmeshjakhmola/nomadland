import ProfileForm from "@/components/ProfileForm";
import { Toaster } from "@/components/ui/toaster";
import { fetchdata } from "@/constants/server";

const page = async () => {
  const userData = await fetchdata();

  return (
    <div className="absolute mt-20 border-t-2 border-gray-300 w-full">
      <div className="py-6">
        <h1 className="text-2xl px-5">Create Post</h1>
      </div>
      <div className="mx-5 lg:mx-96">
        <Toaster />
        <ProfileForm userData={userData} />
      </div>
    </div>
  );
};

export default page;
