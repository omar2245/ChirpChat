import Image from "next/image";
import ProfileHeader from "@/components/shared/ProfileHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { profileTabs } from "@/constants";
import { fetchUser } from "@/lib/actions/user.actions";
import { getCurrentUser } from "@/lib/auth";
import { notFound, redirect } from "next/navigation";
import ThreadsTab from "@/components/shared/ThreadsTab";

const page = async ({
  params,
}: {
  params: Promise<{ id: string }> | { id: string };
}) => {
  const { id: profileId } = await params;

  const user = await getCurrentUser();
  const authUserId = String(user?.id || user?._id || "");

  if (!user) redirect("/sign-in");
  if (!authUserId) redirect("/sign-in");

  const currentUserInfo = await fetchUser(authUserId);
  if (!currentUserInfo?.onBoarded) redirect("/onboarding");

  if (!profileId) notFound();

  const userInfo = await fetchUser(profileId);
  if (!userInfo) notFound();

  const accountId = String(userInfo?.id || userInfo?._id || "");

  return (
    <section>
      <ProfileHeader
        accountId={accountId}
        authUserId={authUserId}
        name={userInfo.name}
        username={userInfo.username}
        imgUrl={userInfo.image}
        bio={userInfo.bio}
      />

      <div className="mt-9">
        <Tabs defaultValue="posts" className="w-full">
          <TabsList className="tab">
            {profileTabs.map((tab) => (
              <TabsTrigger key={tab.label} value={tab.value} className="tab">
                <Image
                  src={tab.icon}
                  alt={tab.label}
                  width={24}
                  height={24}
                  className="object-contain"
                />
                <p className="max-sm:hidden">{tab.label}</p>

                {tab.label === "Posts" && (
                  <p className="ml-1 rounded-sm bg-light-4 px-2 py-1 !text-tiny-medium text-light-2">
                    {userInfo?.threads?.length}
                  </p>
                )}
              </TabsTrigger>
            ))}
          </TabsList>
          {profileTabs.map((tab) => (
            <TabsContent
              key={`content-${tab.label}`}
              value={tab.value}
              className="w-full text-light-1"
            >
              <ThreadsTab
                currentUserId={authUserId}
                accountId={accountId}
                accountType="User"
              />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

export default page;
