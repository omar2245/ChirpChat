import PostThread from "@/components/forms/PostThread";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";

async function Page() {
  const user = await getCurrentUser();

  if (!user) redirect("/sign-in");

  if (!user?.onBoarded) redirect("/onboarding");

  return (
    <>
      <h1 className="head-text">Create Post</h1>
      <PostThread userId={String(user._id)} />
    </>
  );
}

export default Page;
