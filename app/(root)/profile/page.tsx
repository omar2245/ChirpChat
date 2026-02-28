import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";

const page = async () => {
  const user = await getCurrentUser();

  if (!user) redirect("/sign-in");
  if (user) redirect(`/profile/${user.id}`);
  return <></>;
};

export default page;
