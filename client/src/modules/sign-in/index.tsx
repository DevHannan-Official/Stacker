"use client";
import Button from "@/components/shared/button";
import { signinSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";

const SignInPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof signinSchema>>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      emailOrUsername: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof signinSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <div className="flex-1 w-full min-h-svh px-4 py-4 flex flex-col items-center justify-center bg-slack-purple">
      <form
        className="flex flex-col gap-4 items-center w-full p-4 md:p-6 shadow max-w-lg bg-white"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Image
          src={"/images/logo.png"}
          alt="Stacker"
          width={80}
          height={80}
          className="w-16 h-16 md:w-20 md:h-20"
        />
        <div className="text-center mb-5">
          <h1 className="text-2xl sm:text-3xl font-bold">Welcome Back</h1>
          <p className="text-sm text-text-secondary font-medium">
            Login your account to continue using Stacker
          </p>
        </div>
        <div className="flex flex-col gap-2 w-full">
          <label
            htmlFor="emailOrUsername"
            className={errors.emailOrUsername?.message ? "danger" : ""}
          >
            Email or Username
          </label>
          <input
            type="text"
            placeholder="yourname@example.com"
            id="emailOrUsername"
            className={`input ${
              errors.emailOrUsername?.message ? "danger" : ""
            }`}
            {...register("emailOrUsername")}
          />
          <p className="text-red-500 my-1 text-xs font-medium">
            {errors.emailOrUsername?.message}
          </p>
        </div>
        <div className="flex flex-col gap-2 w-full">
          <label
            htmlFor="password"
            className={errors.password?.message ? "danger" : ""}
          >
            Password
          </label>
          <input
            type="password"
            placeholder="********"
            id="password"
            className={`input ${errors.password?.message ? "danger" : ""}`}
            {...register("password")}
          />
          <p className="text-red-500 my-1 text-xs font-medium">
            {errors.password?.message}
          </p>
        </div>
        <Button variant={"primary"} additionalClasses="w-full" type="submit">
          Sign In
        </Button>

        <div className="w-full my-1 relative max-w-md">
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
        <p className="mt-2 text-xs text-text-secondary text-center max-w-md">
          By continuing, you agree to our{" "}
          <Link className="link" href="#">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link className="link" href="#">
            Privacy Policy
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignInPage;
