import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";

const page = async () => {
  const user = await getCurrentUser();
  const userIdentifier = String(user?.id || user?._id || "");

  if (!user) redirect("/sign-in");
  if (!userIdentifier) redirect("/sign-in");

  redirect(`/profile/${userIdentifier}`);
  return <></>;
};

export default page;
