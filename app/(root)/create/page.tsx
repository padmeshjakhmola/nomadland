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

const formSchema = z.object({
  username: z.string().min(2).max(50),
  title: z.string().min(2).max(50),
  description: z.string().min(2).max(100),
  link: z.string().min(2).max(50),
});

function ProfileForm() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      title: "",
      description: "",
      link: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={`${open_sans.className} space-y-8`}
      >
        <FormField
          control={form.control}
          name="title"
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

const page = () => {
  return (
    <div className="absolute mt-20 border-t-2 border-gray-300 w-full">
      <div className="py-6">
        <h1 className="text-2xl px-5">Create Post</h1>
      </div>
      <div className="mx-5 lg:mx-96">
        <ProfileForm />
      </div>
    </div>
  );
};

export default page;
