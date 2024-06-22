import { auth, currentUser } from "@clerk/nextjs/server";

const fetchdata = async () => {
  const { userId } = auth();

  if (!userId) {
    console.warn("User not logged in");
  }

  const user = await currentUser();

  const userData = {
    name: `${user?.firstName ?? ""} ${user?.lastName ?? ""}`,
    email: user?.emailAddresses?.[0].emailAddress ?? "no_email",
    profile_picture: user?.imageUrl ?? "no_profile_image",
    clerk_userId: user?.id,
    username: user?.username,
  };

  try {
    const response = await fetch("http://localhost:3001/v1/users/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    const result = await response.json();
    console.log("User registered response:", result);
  } catch (error) {
    console.error("Unable to save user", error);
  }
};

export default fetchdata;
