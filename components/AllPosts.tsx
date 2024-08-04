"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { images } from "@/lib/utils";
import { Comment, CommentFormProps, Post, UserData } from "@/types";
import Image from "next/image";
import React, { useEffect, useState, useCallback } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast, useToast } from "@/components/ui/use-toast";
import { roboto } from "@/app/fonts";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";

import { fetchPosts } from "@/constants/server";
import NewPostButton from "./NewPostsButton";

const FormSchema = z.object({
  comment: z.string().min(2, {
    // message: "Comment can't be empty and of 2 characters",
  }),
});

const AllPosts = ({ userData }: { userData: UserData }) => {
  const test_image = images.mountains[2];
  const [posts, setPosts] = useState<Post[]>([]);
  const [fetchTrigger, setFetchTrigger] = useState(false);
  const [showButtonPosts, setShowButtonPosts] = useState(true);

  useEffect(() => {
    const getPosts = async () => {
      const result = await fetchPosts();
      setPosts(result);
      setFetchTrigger(false);
    };
    getPosts();
  }, [fetchTrigger]);

  // ! TODO: page becomes unresponsibe when delete the post...

  const handleDeletePost = async (postId: number) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL as string}/v1/posts/${postId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userData.id}`,
          },
        }
      );
      if (response.ok) {
        setPosts(posts.filter((post) => post.id !== postId));
        toast({
          description: "Post was deleted successfully",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Error deleting post",
        });
      }
    } catch (error) {
      console.error("Error deleting post:", error);
      toast({
        variant: "destructive",
        title: "Error deleting post",
      });
    }
  };

  const handleClick = async () => {
    setFetchTrigger(true);
    setShowButtonPosts(false);
  };

  return (
    <main>
      <NewPostButton handleClick={handleClick} showButtonPosts={showButtonPosts} />
      {posts.map((post, index) => (
        <div
          key={index}
          className="flex w-full items-center justify-center my-10"
        >
          <div className="grid grid-rows-2 lg:grid-cols-2 lg:grid-rows-1 md:w-2/3 w-full shadow-[0_0_10px_10px_rgba(0,0,0,0.1)] rounded-3xl lg:h-[36rem]">
            {/* Now 2 components inside */}
            <div className="flex-1">
              <div className="relative w-full h-full">
                <Image
                  src={`${post.link}`}
                  className="rounded-t-3xl md:rounded-3xl"
                  alt="user_image"
                  fill
                  objectFit="cover"
                  priority={true}
                />
              </div>
            </div>
            <div className="flex-1 flex flex-col text-center">
              <div className="m-10 space-y-8 flex-grow">
                {/* 1 */}
                <div className="flex flex-row justify-between items-center">
                  <div className="space-x-10 flex flex-row">
                    <Image
                      src="/icons/share.svg"
                      alt="share_icon"
                      width={50}
                      height={50}
                      className="hover:bg-slate-200 rounded-full cursor-pointer p-2"
                    />
                    {post.userId === userData.id && (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Image
                            src="/icons/more.svg"
                            alt="more_icon"
                            width={50}
                            height={50}
                            className="hover:bg-slate-200 rounded-full cursor-pointer p-2"
                          />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                className="rounded-full w-full"
                                variant="link"
                              >
                                Delete
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Are you absolutely sure?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  This action cannot be undone. This will
                                  permanently delete your post.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDeletePost(post.id)}
                                >
                                  Continue
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                  </div>
                  <div>
                    {/* <Button className="bg-red-1 hover:bg-red-2 rounded-full" disabled>
                      Save
                    </Button> */}
                  </div>
                </div>
                {/* 2 */}
                <div>
                  <h1 className="text-3xl text-start text-clip">
                    {post?.title}
                  </h1>
                  <h1 className="text-lg text-start text-clip overflow-hidden text-slate-500">
                    {post?.description}
                  </h1>
                </div>
                {/* 3 */}
                <div className="flex justify-between items-center">
                  <div className="flex flex-row justify-center items-center">
                    {/* image and username */}
                    <Image
                      src={
                        post?.User?.profile_picture
                          ? post.User.profile_picture
                          : "/images/user_image.jpg"
                      }
                      alt="user_image"
                      width={60}
                      height={60}
                      className="rounded-full"
                    />
                    <div className="flex flex-col px-2">
                      <p className="text-base">{post?.User?.name}</p>
                      <p className="text-sm text-gray-600 text-start">
                        {post?.User?.username ? `@${post.User.username}` : null}
                      </p>
                    </div>
                  </div>
                  <Button
                    className="bg-red-1 hover:bg-red-2 rounded-full"
                    disabled
                  >
                    Follow
                  </Button>
                </div>
              </div>
              <PostComments postId={post.id} userData={userData} />
            </div>
          </div>
        </div>
      ))}
    </main>
  );
};

const PostComments = ({
  postId,
  userData,
}: {
  postId: number;
  userData: UserData;
}) => {
  const [comments, setComments] = useState<Comment[]>([]);

  const fetchComments = useCallback(async () => {
    try {
      const response = await fetch(
        `${
          process.env.NEXT_PUBLIC_BACKEND_URL as string
        }/v1/comments/comments/${postId}`
      );
      const result = await response.json();
      setComments(result);
    } catch (error) {
      console.error(error);
    }
  }, [postId]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  return (
    <>
      <div className="overflow-y-auto max-h-96 px-8">
        <p className="text-base text-left mb-5 font-bold">Comments:</p>

        {comments.map((comment) => (
          <div key={comment.id} className="mb-4">
            <div className="flex flex-row gap-2">
              <Image
                src={comment?.User?.profile_picture || "/images/user_image.jpg"}
                width={30}
                height={30}
                alt="user-image"
                className="rounded-full"
              />
              <div className="flex flex-row justify-center items-center gap-2">
                <p className="text-base text-gray-800">
                  {comment?.User?.username}
                </p>
                <p className={`${roboto.className} text-base`}>
                  {comment.text}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-auto border-t-2 border-gray-400 space-y-3 py-5">
        <div className="flex justify-between mx-8">
          <h1 className="text-xl flex justify-center items-center">
            {comments.length} Comments
          </h1>
          {/* hidden the liked button */}
          <Image
            src="/icons/like.svg"
            alt="like_icon"
            width={40}
            height={40}
            className="bg-slate-200 rounded-full cursor-pointer p-2 invisible"
          />
        </div>
        <CommentForm
          postId={postId}
          userData={userData}
          onCommentAdded={() => fetchComments()}
        />
      </div>
    </>
  );
};

const CommentForm: React.FC<CommentFormProps> = ({
  postId,
  userData,
  onCommentAdded,
}) => {
  const { toast } = useToast();
  const [input, setInput] = useState("");

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      comment: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    form.reset();
    setInput("");

    const fetchPosts = async () => {
      const commentData = {
        text: data.comment,
        userId: userData.id,
        postId,
      };
      try {
        const response = await fetch(
          `${
            process.env.NEXT_PUBLIC_BACKEND_URL as string
          }/v1/comments/comments`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(commentData),
          }
        );
        const newComment = await response.json();

        const newCommentWithUser = {
          ...newComment,
          User: {
            name: userData.name,
            email: userData.email,
            username: userData.username,
            profile_picture: userData.profile_picture,
          },
        };

        onCommentAdded(newCommentWithUser);
        toast({
          description: "Comment was added successfully",
        });
      } catch (error) {
        console.error(error);
        toast({ variant: "destructive", title: "Unable to add comment" });
      }
    };

    fetchPosts();
  }

  return (
    <div className="mx-8">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-row gap-2 justify-between"
        >
          <FormField
            control={form.control}
            name="comment"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    placeholder="Add a comment"
                    {...field}
                    className="rounded-full"
                    value={input}
                    onChange={(e) => {
                      setInput(e.target.value);
                      field.onChange(e);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="rounded-full bg-red-1 hover:bg-red-2"
            disabled={!input}
          >
            <Image
              src="/icons/comment.svg"
              alt="comment"
              width={20}
              height={20}
            />
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default AllPosts;
