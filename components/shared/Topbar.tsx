"use client";

import { SignedIn, SignOutButton, SignedOut } from "@clerk/nextjs";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

function Topbar() {
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
        <div className="md:hidden">
          <SignedIn>
            <SignOutButton signOutCallback={() => router.push("sign-in")}>
              <div className="flex cursor-pointer">
                <Image
                  src="/assets/logout.svg"
                  alt="logout"
                  width={24}
                  height={24}
                />
              </div>
            </SignOutButton>
          </SignedIn>
        </div>
        <SignedOut>
          <Button
            className="bg-primary-500"
            onClick={() => router.replace("sign-in")}
          >
            Login
          </Button>
        </SignedOut>
      </div>
    </nav>
  );
}

export default Topbar;
