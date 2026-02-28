import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import Topbar from "@/components/shared/Topbar";
import LeftSidebar from "@/components/shared/LeftSidebar";
import Bottombar from "@/components/shared/Bottombar";
import { getCurrentUser } from "@/lib/auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ChirpChat",
  description: "A Next.js 13 Meta ChirpChat application",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  return (
    <html lang="en">
      <body className={inter.className}>
        <Topbar isAuthenticated={Boolean(user)} />
        <main className="flex flex-row">
          <LeftSidebar isAuthenticated={Boolean(user)} />

          <section className="main-container">
            <div className="w-full max-w-4xl">{children}</div>
          </section>
        </main>

        <Bottombar />
      </body>
    </html>
  );
}
