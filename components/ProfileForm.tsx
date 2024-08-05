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
import { useState } from "react";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { useGlobalContext } from "@/context/GlobalProvider";

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const formSchema = z.object({
  image: z
    .any()
    .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    ),
  title: z.string().min(2).max(50),
  description: z.string().min(2).max(100),
});

// TODO: user is not creating for the first post time after click home back them comming back to create then it is created..

function ProfileForm({ userData }: { userData: UserData }) {
  const { toast } = useToast();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { setSharedDataButton } = useGlobalContext();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      image: null,
      title: "",
      description: "",
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    form.setValue("image", file);
  };

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const formData = new FormData();
    formData.append("image", values.image);
    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("userId", userData.id.toString());

    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL as string}/v1/posts`,
        {
          method: "POST",
          body: formData,
        }
      );
      const result = await response.json();
      toast({ title: "Post created successfully" });
      setLoading(false);
      router.push("/home");
      setSharedDataButton(false);
    } catch (error) {
      console.error(error);
      toast({ variant: "destructive", title: "Unable to create post" });
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={`${open_sans.className} space-y-8`}
      >
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="picture">Your Click</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  className="rounded-lg py-2"
                  onChange={handleFileChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
        {loading ? (
          <Button disabled>
            <Loader className="animate-spin" />
          </Button>
        ) : (
          <Button type="submit">Post</Button>
        )}
      </form>
    </Form>
  );
}

export default ProfileForm;
