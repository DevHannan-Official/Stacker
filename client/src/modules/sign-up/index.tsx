"use client";

import Button from "@/components/shared/button";
import { signUpUser } from "@/lib/fetchApi";
import { signupSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const SignUpPage = () => {
  const router = useRouter();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const {
    mutate: signUp,
    isPending,
    isError,
    error,
    isSuccess,
  } = useMutation({
    mutationFn: signUpUser,
    onSuccess: () => {
      reset();
      toast.success("Signed up successfully");
      router.replace("/web");
    },
  });

  function onSubmit(values: z.infer<typeof signupSchema>) {
    signUp(values);
  }

  return (
    <div className="flex-1 w-full min-h-svh px-4 py-4 flex flex-col items-center justify-center bg-slack-purple">
      <form
        className="flex flex-col gap-4 items-center w-full p-4 md:p-6 shadow max-w-lg bg-white"
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="off"
      >
        <Image
          src={"/images/logo.png"}
          alt="Stacker"
          width={80}
          height={80}
          className="w-16 h-16 md:w-20 md:h-20"
        />
        <div className="text-center mb-5">
          <h1 className="text-2xl sm:text-3xl font-bold">Get Started</h1>
          <p className="text-sm text-text-secondary font-medium">
            Create your account to start using Stacker
          </p>
        </div>
        <div className="flex flex-col gap-2 w-full">
          <label
            htmlFor="name"
            className={errors.name?.message ? "danger" : ""}
          >
            Full Name
          </label>
          <input
            type="text"
            placeholder="John Doe"
            id="name"
            className={`input ${errors.name?.message ? "danger" : ""}`}
            {...register("name")}
          />
          <p className="text-red-500 my-1 text-xs font-medium">
            {errors.name?.message}
          </p>
        </div>
        <div className="flex flex-col gap-2 w-full">
          <label
            htmlFor="email"
            className={errors.email?.message ? "danger" : ""}
          >
            Email
          </label>
          <input
            type="email"
            placeholder="yourname@example.com"
            id="email"
            className={`input ${errors.email?.message ? "danger" : ""}`}
            {...register("email")}
          />
          <p className="text-red-500 my-1 text-xs font-medium">
            {errors.email?.message}
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
        <div className="flex flex-col gap-2 w-full">
          <label
            htmlFor="confirmPassword"
            className={errors.confirmPassword?.message ? "danger" : ""}
          >
            Confirm Password
          </label>
          <input
            type="password"
            placeholder="********"
            id="confirmPassword"
            className={`input ${
              errors.confirmPassword?.message ? "danger" : ""
            }`}
            {...register("confirmPassword")}
          />
          <p className="text-red-500 my-1 text-xs font-medium">
            {errors.confirmPassword?.message}
          </p>
        </div>
        <Button
          variant={"primary"}
          additionalClasses="w-full"
          type="submit"
          disabled={isPending}
        >
          {isPending ? "Signing Up..." : "Sign Up"}
        </Button>

        <div className="w-full my-1 relative max-w-md">
          <hr className="divider" />
        </div>
        <div className="flex items-center gap-1.5">
          <p className="text-sm text-text-primary">Already have an account?</p>
          <Link className="link" href="/sign-in">
            Sign In
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

export default SignUpPage;
