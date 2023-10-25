import ThreadCard from "@/components/cards/ThreadCard";
import HomePagePost from "@/components/forms/HomePagePost";
import { fetchThreads } from "@/lib/actions/thread.action";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function Home() {
  const result = await fetchThreads(1, 30);
  const user = await currentUser();
  if (!user) {
    return (
      <>
        <h1 className="head-text text-left">Home</h1>
        <AllPosts result={result} userId={""} />
      </>
    );
  }

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onBoarded) redirect("/onboarding");

  return (
    <>
      <h1 className="head-text text-left">Home</h1>
      <HomePagePost userId={userInfo._id} userImg={userInfo.image} />
      <section className="flex flex-col gap-4">
        {result.posts.length === 0 ? (
          <p className="no-result">No Posts found</p>
        ) : (
          <AllPosts result={result} userId={user?.id ?? ""} />
        )}
      </section>
    </>
  );
}

const AllPosts = ({ result, userId }: { result: any; userId: string }) => {
  return (
    <section className="mt-9 flex flex-col gap-4">
      {result.posts.length === 0 ? (
        <p className="no-result">No Posts found</p>
      ) : (
        <>
          {result.posts.map((post: any) => (
            <ThreadCard
              key={post._id}
              id={post._id}
              currentUserId={userId}
              parentId={post.parentId}
              children={post.children}
              content={post.text}
              author={post.author}
              community={post.community}
              createdAt={post.createdAt}
              comments={post.children}
            />
          ))}
        </>
      )}
    </section>
  );
};
