import ThreadCard from "@/components/cards/ThreadCard";
import Comment from "@/components/forms/Comment";
import { fetchThreadById } from "@/lib/actions/thread.action";
import { fetchUser } from "@/lib/actions/user.actions";
import { getCurrentUser } from "@/lib/auth";
import { notFound, redirect } from "next/navigation";
import React from "react";

const page = async ({
  params,
}: {
  params: Promise<{ id: string }> | { id: string };
}) => {
  const { id: threadId } = await params;
  if (!threadId) notFound();

  const user = await getCurrentUser();
  const authUserId = String(user?.id || user?._id || "");

  if (!user) redirect("/sign-in");
  if (!authUserId) redirect("/sign-in");

  const userInfo = await fetchUser(authUserId);
  if (!userInfo?.onBoarded) redirect("/onboarding");

  const thread = await fetchThreadById(threadId);
  if (!thread) {
    return <p>Post Doesn't Exist or deleted by User</p>;
  }

  return (
    <section className="relative">
      <div>
        <ThreadCard
          id={thread._id}
          currentUserId={authUserId}
          parentId={thread.parentId}
          content={thread.text}
          author={thread.author}
          community={thread.community}
          createdAt={thread.createdAt}
          comments={thread.children}
        />
      </div>

      <div className="mt-7">
        <Comment
          threadId={threadId}
          currentUserImage={userInfo.image}
          currentUserId={JSON.stringify(userInfo._id)}
        />
      </div>

      <div className="mt-10">
        {thread.children.map((childItem: any) => (
          <ThreadCard
            key={childItem._id}
            id={childItem._id}
            currentUserId={authUserId}
            parentId={childItem.parentId}
            content={childItem.text}
            author={childItem.author}
            community={childItem.community}
            createdAt={childItem.createdAt}
            comments={childItem.children}
            isComment
          />
        ))}
      </div>
    </section>
  );
};

export default page;
