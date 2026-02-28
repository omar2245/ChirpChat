"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/sign-up", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, username, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Sign up failed");
        return;
      }

      router.push("/onboarding");
      router.refresh();
    } catch {
      setError("Sign up failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="w-full max-w-md rounded-2xl bg-dark-2 p-8">
      <h1 className="head-text">Sign Up</h1>
      <p className="mt-2 text-small-regular text-light-3">
        Create your account
      </p>

      <form className="mt-8 flex flex-col gap-4" onSubmit={onSubmit}>
        <input
          className="account-form_input no-focus p-3"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          className="account-form_input no-focus p-3"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          className="account-form_input no-focus p-3"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error ? (
          <p className="text-subtle-medium text-red-500">{error}</p>
        ) : null}
        <button
          type="submit"
          disabled={isLoading}
          className="rounded-lg bg-primary-500 px-4 py-3 text-light-1 disabled:opacity-60"
        >
          {isLoading ? "Signing up..." : "Sign Up"}
        </button>
      </form>

      <p className="mt-6 text-small-regular text-light-3">
        Already have an account?{" "}
        <Link href="/sign-in" className="text-primary-500">
          Sign in
        </Link>
      </p>
    </section>
  );
}
