"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { open_sans } from "@/app/fonts";
import { useToast } from "@/components/ui/use-toast";
import { UserData } from "@/types";

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const formSchema = z.object({
  // image: z
  //   .any()
  //   .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
  //   .refine(
  //     (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
  //     "Only .jpg, .jpeg, .png and .webp formats are supported."
  //   ),
  title: z.string().min(2).max(50),
  description: z.string().min(2).max(100),
  link: z.string().min(2).max(50),
});

// TODO: user is not creating for the first post time after click home back them comming back to create then it is created..

function ProfileForm({ userData }: { userData: UserData }) {
  const { toast } = useToast();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      // image: "",
      title: "",
      description: "",
      link: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const userPosts = {
      title: values.title,
      description: values.description,
      link: values.link,
      userId: userData.id,
    };

    try {
      const response = await fetch("http://localhost:3001/v1/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userPosts),
      });
      const result = await response.json();
      toast({ title: "Post created successfully" });
      console.log("User posts response:", result);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={`${open_sans.className} space-y-8`}
      >
        {/* <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <>
              <FormItem>
                <FormLabel htmlFor="picture">Your Click</FormLabel>
                <FormControl>
                  <Input id="picture" type="file" className="rounded-lg py-2" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </>
          )}
        /> */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <>
              <FormItem>
                <FormLabel className="font-semibold">Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Add a title"
                    {...field}
                    className="rounded-lg py-2"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            </>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <>
              <FormItem>
                <FormLabel className="font-semibold">Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Add a detailed description"
                    className="resize-none rounded-lg"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            </>
          )}
        />
        <FormField
          control={form.control}
          name="link"
          render={({ field }) => (
            <>
              <FormItem>
                <FormLabel className="font-semibold">Link</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Add a link"
                    {...field}
                    className="rounded-lg py-2"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            </>
          )}
        />
        <Button type="submit">Post</Button>
      </form>
    </Form>
  );
}

export default ProfileForm;
