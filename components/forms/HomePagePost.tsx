"use client";

import React from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ThreadValidation } from "@/lib/validations/thread";
import * as z from "zod";
import { createThread } from "@/lib/actions/thread.action";
import { usePathname, useRouter } from "next/navigation";
import { Input } from "../ui/input";

const HomePagePost = ({
  userId,
  userImg,
}: {
  userId: string;
  userImg: string;
}) => {
  const router = useRouter();
  const pathname = usePathname();

  const form = useForm({
    resolver: zodResolver(ThreadValidation),
    defaultValues: {
      thread: "",
      accountId: userId,
    },
  });

  const onSubmit = async (values: z.infer<typeof ThreadValidation>) => {
    await createThread({
      text: values.thread,
      author: userId,
      communityId: "",
      path: pathname,
    });

    form.reset();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-row justify-start gap-4 mt-10 comment-form"
      >
        <FormField
          control={form.control}
          name="thread"
          render={({ field }) => (
            <FormItem className="flex items-center gap-3 w-full">
              <FormLabel className="text-base-semibold text-gray-200">
                <div className="relative w-11 h-11">
                  <Image
                    src={userImg}
                    alt="User Image"
                    fill
                    className="rounded-full object-cover"
                  />
                </div>
              </FormLabel>
              <FormControl className="border-none bg-transparent">
                <Input
                  type="text"
                  placeholder="Create a post"
                  className="text-light-1 no-focus outline-none"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit" className="comment-form_btn">
          Post
        </Button>
      </form>
    </Form>
  );
};

export default HomePagePost;
