"use client";

import Button from "@/components/shared/button";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Home = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  function navigateToSignIn(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!email.trim()) {
      setError("Email or Username is required");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(email)) {
      router.push(`/sign-in?email=${encodeURIComponent(email)}`);
    } else {
      router.push(`/sign-in?username=${encodeURIComponent(email)}`);
    }
  }

  return (
    <div className="min-h-svh w-full bg-background flex items-center justify-between p-2 md:px-4">
      <section className="flex-1 w-full px-4 flex flex-col items-center justify-start">
        <form
          className="flex flex-col gap-4 items-center w-full md:p-2 max-w-lg"
          onSubmit={navigateToSignIn}
        >
          <Image
            src={"/images/logo.png"}
            alt="Stacker"
            width={80}
            height={80}
          />
          <div className="text-center mb-5">
            <h1 className="text-3xl font-bold">Get Started</h1>
            <p className="text-sm text-text-secondary font-medium">
              Login to your account to start using Stacker
            </p>
          </div>
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="email" className={error ? "danger" : ""}>
              Email or Username
            </label>
            <input
              type="text"
              placeholder="yourname@example.com"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={error ? "input danger" : "input"}
            />
            {error && (
              <p className="text-red-500 font-medium text-sm">{error}</p>
            )}
          </div>
          <Button variant={"primary"} additionalClasses="w-full" type="submit">
            Continue
          </Button>
        </form>
        <div className="my-4 w-full relative max-w-md">
          <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-2 font-medium text-gray-500">
            OR
          </p>
          <hr className="divider" />
        </div>
        <div className="px-4 pt-6 pb-4 w-full flex flex-col gap-3 max-w-lg">
          <Button variant="secondary" additionalClasses="w-full">
            <Image
              src={"/vectors/google.svg"}
              alt="google"
              width={24}
              height={24}
            />
            <span className="hidden sm:block">Google</span>
          </Button>
          <Button variant="secondary" additionalClasses="w-full">
            <Image
              src={"/vectors/github.svg"}
              alt="google"
              width={24}
              height={24}
            />
            <span className="hidden sm:block">GitHub</span>
          </Button>
        </div>
        <div className="my-4 w-full relative max-w-md">
          <hr className="divider" />
        </div>
        <div className="flex items-center gap-1.5">
          <p className="text-sm text-text-primary">
            Don&apos;t have an account?
          </p>
          <Link className="link" href="/sign-up">
            Sign Up
          </Link>
        </div>
        <p className="mt-6 text-xs text-text-secondary text-center max-w-md">
          By continuing, you agree to our{" "}
          <Link className="link" href="#">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link className="link" href="#">
            Privacy Policy
          </Link>
        </p>
      </section>
      <section className="hidden lg:flex flex-2 items-center justify-end">
        <Image
          src="/images/auth-image.png"
          alt="logo"
          width={0}
          height={0}
          sizes="100%"
          className="w-[80%]"
        />
      </section>
    </div>
  );
};

export default Home;
