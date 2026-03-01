import AccountProfile from "@/components/forms/AccountProfile";
import { fetchUser } from "@/lib/actions/user.actions";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";

async function Page() {
  const user = await getCurrentUser();
  if (!user) redirect("/sign-in");
  const userIdentifier = String(user?.id || user?._id || "");

  const userInfo = await fetchUser(userIdentifier);
  if (userInfo?.onBoarded) redirect("/");

  const userData = {
    id: userIdentifier,
    objectId: String(userInfo?._id || ""),
    username: String(userInfo?.username || user?.username || ""),
    name: String(userInfo?.name || user?.name || ""),
    bio: String(userInfo?.bio || ""),
    image: String(userInfo?.image || user?.image || ""),
  };

  return (
    <main className="mx-auto flex max-w-3xl flex-col justify-start px-10 py-20">
      <h1 className="head-text">Onboarding</h1>

      <p className="mt-3 text-base-regular text-light-2">
        Complete your profile now, to use Chirp Chat.
      </p>

      <section className="mt-9 bg-dark-2 p-10">
        <AccountProfile user={userData} btnTitle="Continue" />
      </section>
    </main>
  );
}

export default Page;
