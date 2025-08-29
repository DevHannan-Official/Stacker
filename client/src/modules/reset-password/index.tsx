"use client";
import Button from "@/components/shared/button";
import { checkResetPasswordLink, resetPassword } from "@/lib/fetchApi";
import { resetPasswordSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import z from "zod";

const InvalidLinkPage = () => {
  return <div>Invalid Link</div>;
};

const ResetPasswordPage = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [isCorrectLink, setIsCorrectLink] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const { mutate: resetPasswordFunc, isPending } = useMutation({
    mutationFn: resetPassword,
    onSuccess: () => {
      reset();
      toast.success("Password reset successfully");
      router.replace("/sign-in");
    },
    onError: (err: any) => {
      toast.error(
        err?.response.data.error || "An error occurred. Please try again."
      );
    },
  });

  function onSubmit(values: z.infer<typeof resetPasswordSchema>) {
    const data = {
      token: token!,
      password: values.newPassword,
    };
    resetPasswordFunc(data);
  }

  const { mutate: checkLink, isPending: isLinkChecking } = useMutation({
    mutationFn: checkResetPasswordLink,
    onSuccess: () => {
      setIsCorrectLink(true);
    },
    onError: () => {
      setIsCorrectLink(false);
    },
  });

  useEffect(() => {
    checkLink(token!);
  }, [checkLink, token]);

  if (!token || !isCorrectLink) {
    return <InvalidLinkPage />;
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
          <h1 className="text-2xl sm:text-3xl font-bold">Reset Password</h1>
          <p className="text-sm text-text-secondary font-medium">
            Enter your email to receive a reset link
          </p>
        </div>
        <div className="flex flex-col gap-2 w-full">
          <label
            htmlFor="password"
            className={errors.newPassword?.message ? "danger" : ""}
          >
            New Password
          </label>
          <input
            type="password"
            placeholder="********"
            id="password"
            className={`input ${errors.newPassword?.message ? "danger" : ""}`}
            {...register("newPassword")}
          />
          <p className="text-red-500 my-1 text-xs font-medium">
            {errors.newPassword?.message}
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
          {isPending ? "Signing In..." : "Sign In"}
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

export default ResetPasswordPage;
