"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

type Props = {
  showLabel?: boolean;
};

export default function LogoutButton({ showLabel = false }: Props) {
  const router = useRouter();

  const onLogout = async () => {
    await fetch("/api/auth/sign-out", { method: "POST" });
    router.push("/sign-in");
    router.refresh();
  };

  return (
    <button
      type="button"
      onClick={onLogout}
      className="flex cursor-pointer gap-4 p-4"
    >
      <Image src="/assets/logout.svg" alt="logout" width={24} height={24} />
      {showLabel ? <p className="text-light-2 max-lg:hidden">Logout</p> : null}
    </button>
  );
}
