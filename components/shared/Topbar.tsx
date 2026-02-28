"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import LogoutButton from "../auth/LogoutButton";

function Topbar({ isAuthenticated }: { isAuthenticated: boolean }) {
  const router = useRouter();
  return (
    <nav className="topbar">
      <Link href="/" className="flex items-center gap-4">
        <Image src="/assets/logo.svg" alt="logo" width={28} height={28} />
        <p className="text-heading3-bold text-light-1 max-xs:hidden">
          ChirpChat
        </p>
      </Link>

      <div className="flex items-center gap-1">
        {isAuthenticated ? (
          <div className="md:hidden">
            <LogoutButton />
          </div>
        ) : (
          <Button
            className="bg-primary-500"
            onClick={() => router.replace("/sign-in")}
          >
            Login
          </Button>
        )}
      </div>
    </nav>
  );
}

export default Topbar;
