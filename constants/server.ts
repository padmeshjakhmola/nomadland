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
    return result;
  } catch (error) {
    console.error("Unable to save user", error);
  }
};

const fetchComments = async (postId: number) => {
  try {
    const response = await fetch(
      `http://localhost:3001/v1/comments/${postId}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch comments: ${response.statusText}`);
    }

    const result = await response.json();
    console.log("Comments for post", postId, ":", result);
    // TODO: Update state with the fetched comments
  } catch (error) {
    console.error("Error fetching comments:", error);
    throw error;
  }
};

export { fetchdata, fetchComments };
